let mongoose = require('mongoose');
module.exports = function (app) {

    var promise = mongoose.connect('mongodb://127.0.0.1/alone', {
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
    });
    promise.then(function (db) {
        if(db){
            console.log("服务器已链接")
        }else{
            console.log("数据库链接错误")
        }

    })
    //首页
    app.use('/', require(CONTROLLERS + '/main'));

};