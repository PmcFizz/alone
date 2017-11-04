/**
 * Created by Administrator on 2017/11/4.
 */
var express = require('express');
var router = express.Router();
let superagent = require("superagent");
let cheerio = require("cheerio");
let async = require("async");
let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;


const setData = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Referrer': 'www.baidu.com',
    'Content-Type': 'text/plain; charset=UTF-8'
};

//诗 表
const Poetry = mongoose.model('poetry', new Schema({
    title: String,    //诗的标题
    author: String,    //作者
    href: String,    //链接
    content: String,    //诗的内容
    dynasty: String,    //朝代
    tag: Array      //标签
}))


// 项目目录
router.get('/', function (req, res, next) {
    res.render('index');
});


// 项目首页
router.get('/menu', function (req, res, next) {
    res.render('menu/index');
});

// 聊天室
router.get('/chat', function (req, res, next) {
    res.render('chat/index');
});


// 抓包
router.get('/crawler', function (req, res, next) {
    res.render('crawler/index');
});


// 列表分页
router.get('/list', function (req, res, next) {
    res.render('list/index');
});


// 地图
router.get('/map', function (req, res, next) {
    res.render('map/index');
});


// echart
router.get('/echart', function (req, res, next) {
    res.render('echart/index');
});


// canvase
router.get('/canvas', function (req, res, next) {
    res.render('canvas/index');
});


// mongodb
router.get('/mongodb', function (req, res, next) {
    res.render('mongodb/index');
});


// 游戏
router.get('/game', function (req, res, next) {
    res.render('game/index');
});


// 数据结构
router.get('/data-structure', function (req, res, next) {
    res.render('data-structure/index');
});


// 算法题
router.get('/algorithm', function (req, res, next) {
    res.render('algorithm/index');
});


// 设计模式
router.get('/design-pattern', function (req, res, next) {
    res.render('design-pattern/index');
});


// ES6
router.get('/es6', function (req, res, next) {
    res.render('es6/index');
});


// VUE
router.get('/vue', function (req, res, next) {
    res.render('vue/index');
});


// Music
router.get('/music', function (req, res, next) {
    res.render('music/index');
});


//程序主入口
let mainFun = (target_url, selector) => {
    superagent.get(target_url)
        .set(setData)
        .end((err, res) => {
            let $ = cheerio.load(res.text);
            let selectorArr = $(selector);
            let poetryArr = [];
            for (let i = 0; i < selectorArr.length; i++) {
                let item = $(selectorArr[i]);
                let href = item.attr('href');
                let title = item.text();
                let author = item.parent().text();
                let tag = ['唐朝', '唐诗三百首', '唐代'];
                let dynasty = '唐朝';
                if (href.indexOf('http://') !== 0) {
                    href = 'http://so.gushiwen.org' + href;
                }
                poetryArr.push(href, title, author);

                console.log("已保存到数据库^_^");
            }

            async.mapLimit(poetryArr, 5, 10, function (item, topCb) {
                let tag = ['唐朝', '唐诗三百首', '唐代'];
                let dynasty = '唐朝';
                let title = item.title;
                let href = item.href;
                let author = item.author;
                let new_poetry = new Poetry({
                    title,
                    href,
                    author,
                    dynasty,
                    tag
                })
                new_poetry.save();
                topCb(null)
            }, function (err, res) {
                if (err) {
                    return {err: err}
                } else {
                    return
                }
            })
        })
};

//开始抓取数据
router.post('/start-get', function (req, res) {
    var target_href = req.body.target_href;
    var selector = req.body.selector;
    var obj = mainFun(target_href, selector);
    if (obj.err) {
        return returnFAIL(res, err);
    } else {
        return returnSUCCESS(res, {errmsg: ok})
    }
});

//分页获取用户
router.post('/user/queryByDataTable', function (req, res) {
    // var params = req.body;
    // var query = {};
    // var opt = {};
    // var resData = {};
    // if (params.name) {
    //     query.name = params.name;
    // }
    // opt.limit = parseInt(params.length, 10);
    // opt.skip = parseInt(params.start, 10);
    //
    // async.parallel([
    //     function (cb) {
    //         user.countUserData(query, function (error, returnData) {
    //             if (error) {
    //                 cb(error);
    //             } else {
    //                 cb(null, returnData);
    //             }
    //         });
    //     },
    //     function (cb) {
    //         user.queryUserByPage(query, opt, function (error, returnData) {
    //             if (error) {
    //                 cb(error);
    //             } else {
    //                 cb(null, returnData);
    //             }
    //         })
    //     }
    //
    // ], function (err, result) {
    var list = [{_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
        {_id: 1, name: '李白', gender: '男', lastLoginData: '2017-11-04 13:26:00'},
    ];
    var dataTableModel = {
        recordsFiltered: 200,
        recordsTotal: 200,
        data: list
    };
    return res.json(dataTableModel);
    // });

});


module.exports = router;
