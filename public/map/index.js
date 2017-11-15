/**
 * Created by Administrator on 2017/11/5.
 */

(function () {
    var map = new AMap.Map("container", {
        resizeEnable: true,
        // center: [116.397428, 39.90923],
        // zoom: 5
    });
    var dataList = [];
    var clickEventListener = map.on('click', function (e) {
        new AMap.Marker({
            map: map,
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [e.lnglat.getLng(), e.lnglat.getLat()],
            //offset: new AMap.Pixel(-12, -36)
        });
        dataList.push({
            lan: e.lnglat.getLng(),
            lat: e.lnglat.getLat()
        });
        document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        // savePosition({lng: e.lnglat.getLng(), lat: e.lnglat.getLat()})
    });
    var auto = new AMap.Autocomplete({
        input: "tipinput"
    });
    AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    }

    // 保存标记的点
    function savePosition(data) {
        $.ajax({
            type: "post",
            url: '/save-position',
            data: data,
            dataType: "json",
            success: function (res) {

            }
        })
    }

    // 实例化点标记
    function addMarker(markerArr) {
        markerArr.forEach(function (item) {
            new AMap.Marker({
                map: map,
                position: item.lan_lat,
                offset: new AMap.Pixel(-12, -36)
            })
        })
    }

    function getData(cb) {
        $.ajax({
            type: "post",
            url: '/get-my-ways',
            dataType: "json",
            success: function (res) {
                cb(res.data);
            }
        })
    }

    // add Toolbar
    function addToolBar() {
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        if (location.href.indexOf('&guide=1') !== -1) {
            map.setStatus({scrollWheel: false})
        }
    }

    //  draw way
    function drawWay(lng, lat) {

        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {

            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }

            var emptyLineStyle = {
                lineWidth: 0,
                fillStyle: null,
                strokeStyle: null,
                borderStyle: null
            };

            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                map: map, //所属的地图实例
                getPath: function (pathData, pathIndex) {
                    return pathData.path;
                },
                getHoverTitle: function (pathData, pathIndex, pointIndex) {
                    return null;
                },
                renderOptions: {
                    //将点、线相关的style全部置emptyLineStyle
                    pathLineStyle: emptyLineStyle,
                    pathLineSelectedStyle: emptyLineStyle,
                    pathLineHoverStyle: emptyLineStyle,
                    keyPointStyle: emptyLineStyle,
                    startPointStyle: emptyLineStyle,
                    endPointStyle: emptyLineStyle,
                    keyPointHoverStyle: emptyLineStyle,
                    keyPointOnSelectedPathLineStyle: emptyLineStyle
                }
            });

            window.pathSimplifierIns = pathSimplifierIns;
            var pathArr = [];
            // var item = []
            // item.push(lng, lat);
            pathArr.push([lng,lat]);

            pathSimplifierIns.setData([{
                name: '测试',
                path: pathArr
            }]);

            //initRoutesContainer(d);

            function onload() {
                pathSimplifierIns.renderLater();
            }

            function onerror(e) {
                // alert('图片加载失败！');
            }

            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true,
                speed: 1000000,
                pathNavigatorStyle: {
                    width: 24,
                    height: 24,
                    //使用图片
                    // content: PathSimplifier.Render.Canvas.getImageContent('./imgs/plane.png', onload, onerror),
                    // strokeStyle: null,
                    // fillStyle: null,
                    //经过路径的样式
                    pathLinePassedStyle: {
                        lineWidth: 6,
                        strokeStyle: 'black',
                        dirArrowStyle: {
                            stepSpace: 15,
                            strokeStyle: 'red'
                        }
                    }
                }
            });
            navg1.start();
        });
    }

    // get current position
    function getCurrentPosition() {
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            var str = ['定位成功'];
            alert(JSON.stringify(data));
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            // 渲染路线 保存数据

            var lng = data.position.getLng();
            var lat = data.position.getLat();
            //     start: [data.position.getLng(), data.position.getLat()],
            //     end: [116.434366, 39.862504]
            // }
            drawWay(lng, lat);
            saveAutoPosition(lng, lat);
            // if (data.accuracy) {
            //     str.push('精度：' + data.accuracy + ' 米');
            // }//如为IP精确定位结果则没有精度信息
            // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            // document.getElementById('tip').innerHTML = str.join('<br>');
        }

        //解析定位错误信息
        function onError(data) {
            document.getElementById('tip').innerHTML = '定位失败';
        }
    }

    function saveAutoPosition(lng, lat) {
        $.ajax({
            type: "json",
            url: '/save-position',
            data: {
                lng,
                lat
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
            }
        })
    }

    // 调用获取数据渲染页面
    getData(addMarker);
    addToolBar()
    // drawWay()
    getCurrentPosition()

    var i = 0;
    var j = 0
    setInterval(function () {
        i++;
        j++;
        drawWay(i, j);
        // getCurrentPosition()
    }, 3000)

})();
