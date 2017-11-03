var express = require('express');
var router = express.Router();

// 项目首页
router.get('/', function (req, res, next) {
    res.render('menu/index');
});

// 聊天室
router.get('/', function (req, res, next) {
    res.render('chat/index');
});


// 抓包
router.get('/', function (req, res, next) {
    res.render('book/index');
});


// 列表分页
router.get('/', function (req, res, next) {
    res.render('list/index');
});


// 地图
router.get('/', function (req, res, next) {
    res.render('map/index');
});


// echart
router.get('/', function (req, res, next) {
    res.render('echart/index');
});


// canvase
router.get('/', function (req, res, next) {
    res.render('canvas/index');
});


// mongodb
router.get('/', function (req, res, next) {
    res.render('mongodb/index');
});


// 游戏
router.get('/', function (req, res, next) {
    res.render('game/index');
});


// 数据结构
router.get('/', function (req, res, next) {
    res.render('data-structure/index');
});


// 算法题
router.get('/', function (req, res, next) {
    res.render('algorithm/index');
});


// 设计模式
router.get('/', function (req, res, next) {
    res.render('design-pattern/index');
});


// ES6
router.get('/', function (req, res, next) {
    res.render('es6/index');
});


// VUE
router.get('/', function (req, res, next) {
    res.render('vue/index');
});


// Music
router.get('/', function (req, res, next) {
    res.render('music/index');
});


module.exports = router;
