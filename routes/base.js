let mongoose = require('mongoose');
module.exports=function(app){

    mongoose.connect('mongodb://localhost/alone', function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("^_^数据库已连接...请开始你的表演^_^")
        }
    });
    //首页
    app.use('/',require(CONTROLLERS+'/main'));

};