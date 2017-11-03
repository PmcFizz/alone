/**
 * Created by Administrator on 2017/11/3.
 */
var router = require('express').Router();
// var book = require(PROXY).book;
var async = require('async');

/**
 * to add book page
 */
router.get('/add', function (req, res) {
    res.render('book/add');
});

/**
 * add one book api
 */
router.post('/add-post', function (req, res) {
    var params = req.body;
    // book.addOneBook(params, function (error, returnData) {
    //     if (error) {
    //         return returnFAIL(res, error.message);
    //     } else {
    //         return returnSUCCESS(res, returnData);
    //     }
    // });
});