let superagent = require('superagent')
let cheerio = require('cheerio')

let baseUrl = 'https://blog.csdn.net/github_35631540/article/list/1'
// https://blog.csdn.net/github_35631540/article/list/1?t=1&
// https://blog.csdn.net/github_35631540/article/list/2?t=1&
// https://blog.csdn.net/github_35631540/article/list/3?t=1&
let blogHrefArr = []
let totalPage = 4

const setData = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
  'Referrer': 'https://blog.csdn.net/github_35631540?t=1',
  'Content-Type': 'text/html; charset=UTF-8',
}

let mainFun = () => {
  superagent
    .get(`${baseUrl}`)
    .set(setData)
    .end((err, res) => {
      let $ = cheerio.load(res.text)
      let len = $('.article-list .content a').length
      if (len > 0) {
        console.log(`获取到${len}条博客记录`)
        console.log(`开始爬取博客记录....`)
        for (let i = 0; i < $('.article-list .content a').length; i++) {
          let blogItem = {
            name: $('.article-list h4').eq(i).text().replace(/\s+/g, ''),
            href: $('.article-list .content a').eq(i).attr('href'),
          }
          getBlogDetail(blogItem)
          blogHrefArr.push(blogItem)
        }
        // console.log(blogHrefArr)
      }
  })
}

let getBlogDetail = (blogItem) => {
  superagent
  .get(`${blogItem.href}`)
  .set(setData)
  .end((err, res) => {
    if(res.statusCode === 200) {
      console.log(`爬取成功:__${blogItem.name}`)
    }
  })
}

// 使用递归获取所有页的博客链接
let getAllBlogHreef = (n) => {
  superagent
    .get(`https://blog.csdn.net/github_35631540/article/list/${n+1}?t=1&`)
    .set(setData)
    .end((err,res) => {
      let $ = cheerio.load(res.text)
      let len = $('.article-list .content a').length
      if (len > 0) {
        console.log(`获取到${len}条博客记录`)
        console.log(`开始获取博客地址....`)
        for (let i = 0; i < $('.article-list .content a').length; i++) {
          let blogItem = {
            name: $('.article-list h4').eq(i).text().replace(/\s+/g, ''),
            href: $('.article-list .content a').eq(i).attr('href'),
          }
          getBlogDetail(blogItem)
          // blogHrefArr.push(blogItem)
        }
        n++
        if(n<totalPage){
          getAllBlogHreef(n)
        }else{
          return blogHrefArr
        }
      }
  })
}

console.log(getAllBlogHreef(0))