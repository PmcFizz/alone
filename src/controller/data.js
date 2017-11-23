/**
 * Created by Administrator on 2017/11/3.
 * 获取文心雕龙 保存到数据库
 */

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

/**
 *诗 表
 */
const Poetry = mongoose.model('poetry', new Schema({
    title: String,    //诗的标题
    author: String,    //作者
    href: String,    //链接
    content: String,    //诗的内容
    dynasty: String,    //朝代
    tag: Array      //标签
}))

mongoose.connect('mongodb://localhost/alone', function (err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("^_^数据库已连接...请开始你的表演^_^")
    }
});

//获取文心雕龙内容
function getWXDLSContent(href, title) {
    superagent.get(href)
        .set(setData)
        .end((err, res) => {
            let $ = cheerio.load(res.text);
            let obj = {
                href,
                title,
                author: '刘勰',
                tag: ['文心雕龙'],
                dynasty: '南朝'
            }
            obj.content = $(".contson").html();
            let new_poetry = new Poetry(obj)
            new_poetry.save();
            // return content;
        })
}

//获取唐诗三百首
function getTS3HundredContent(href) {
    superagent.get(href)
        .set(setData)
        .end((err, res) => {
            let $ = cheerio.load(res.text);
            if(!$($(".contson")[0]).text()){
                return
            }
            let obj = {
                href,
                title:$(".cont h1").text(),
                author: $($(".cont .source a")[1]).text(),
                tag: ['唐诗三百首'],
                dynasty: '唐诗',
                content:$($(".contson")[0]).text()
            }
            obj.content = $(".contson").html();
            let new_poetry = new Poetry(obj)
            new_poetry.save();
            console.log("已保存到数据库^_^");
        })
}

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
                if (href.indexOf('http://') !== 0) {
                    href = 'http://so.gushiwen.org' + href;
                }
                // getWXDLSContent(href, title);
                getTS3HundredContent(href);

            }
        })
};

 mainFun('http://so.gushiwen.org/gushi/tangshi.aspx', '.sons a'); //获取唐诗三百
// mainFun('http://www.gushiwen.org/guwen/wenxin.aspx', '.bookcont a'); //获取文心雕龙
