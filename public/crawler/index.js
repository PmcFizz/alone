/**
 * Created by Administrator on 2017/11/4.
 */
(function () {
    function startGetData() {
        var targetHref = $("#target_href").val();
        var selector = $("#selector").val();
        $.ajax({
            type: "post",
            url: '/start-get',
            data: {
                target_href:targetHref,
                selector:selector
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
            }
        })
    };
    $("#start").click(startGetData)
})()