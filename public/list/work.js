/**
 * Created by Administrator on 2017/11/16.
 */
var dataArr = [{
    companyName: '蜘蛛旅游',
    createDate: '2014-08-04',
    team: '中档,已实现自动化',
    freamwork: 'vue',
    industry: '旅游',
    formalMoney: '15K',
    shiyongDate: '3个月/13k',
    distance: '6.7公里'
}, {
    companyName: '知云',
    createDate: '2017-07-19',
    team: '初检,没有实现自动化',
    freamwork: 'vue',
    industry: '知识产权',
    formalMoney: '15k',
    shiyongDate: '3个月/15k',
    distance: '9.5公里'
}];

var vue = new Vue({
    el: '#tbody',
    data: dataArr,
})