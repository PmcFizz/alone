/**
 * 需要保存数据的走此路由 链接数据库
 * Created by Administrator on 2017/11/3.
 */
module.exports=function(app){

    //爬虫模块
    app.use('/crawler',require(global.CONTROLLERS+'/crawler'));

}
