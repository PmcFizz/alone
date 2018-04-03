/***
 * 获取所有leetcode问题 保存到数据库
 */
let superagent = require("superagent");
let cheerio = require("cheerio");
let async = require("async");
let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;
let fs = require('fs')
var key = fs.readFileSync('key.pem'),
    cert = fs.readFileSync('cert.pem');


var res = []
let baseUrl = 'https://leetcode.com/problems'

const setData = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
    'Referrer': 'https://leetcode.com/problems/two-sum/description/',
    'Content-Type': 'application/json',
    'x-csrftoken': 'MZRaE7gxi7SmbYlqEfW9Gf4W4KOMLMP8dKx3IMUgQYAjzJtleh3ZyBQyjyGYGkbB'
};

//筛选简单题
// var easyArr = res.stat_status_pairs.map(function (item) {
//     return item.difficulty.level === 1
// })


let mainFun = () => {
    for (let i = 0; i < easyArr.length; i++) {
        var item = easyArr[i]

        superagent.get(`${baseUrl}/${item.question__title_slug}/description/`)
            .set(setData)
            .end((err, res) => {
                let $ = cheerio.load(res.text);
                let qesDesc = $('.question-description');
            })
    }

}

superagent.post('https://leetcode.com/graphql')
    .send({
        "operationName": "getQuestionDetail",
        "variables": {"titleSlug": "two-sum"},
        "query": "query getQuestionDetail($titleSlug: String!) {\n  isCurrentUserAuthenticated\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    questionTitle\n    questionTitleSlug\n    content\n    difficulty\n    stats\n    contributors\n    companyTags\n    topicTags\n    similarQuestions\n    discussUrl\n    mysqlSchemas\n    randomQuestionUrl\n    sessionId\n    categoryTitle\n    submitUrl\n    interpretUrl\n    codeDefinition\n    sampleTestCase\n    enableTestMode\n    metaData\n    enableRunCode\n    enableSubmit\n    judgerAvailable\n    infoVerified\n    envInfo\n    urlManager\n    article\n    questionDetailUrl\n    discussCategoryId\n    discussSolutionCategoryId\n    libraryUrl\n  }\n  interviewed {\n    interviewedUrl\n    companies {\n      id\n      name\n    }\n    timeOptions {\n      id\n      name\n    }\n    stageOptions {\n      id\n      name\n    }\n  }\n  subscribeUrl\n  isPremium\n  loginUrl\n}\n"
    })
    // .set('accept', 'json')
    .set(setData)
    .key(key)
    .cert(cert)
    .end((err, res) => {
        // let $ = cheerio.load(res.text);
        console.log(res.text)
        // let qesDesc = $('.question-description');
        // if(qesDesc.length>0){
        //     consoel.log($(qesDesc[0]).text())
        // }
    })

