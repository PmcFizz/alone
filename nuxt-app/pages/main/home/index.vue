<template>
  <div class="container">
    <div class="main">
      <nav class="nav">
        <ul>
          <li><a href="#">推荐</a></li>
          <li><a href="#">最新文章</a></li>
          <li><a href="#">关注</a></li>
          <li><a href="#">资讯</a></li>
          <li><a href="#">人工智能</a></li>
          <li><a href="#">云计算/大数据</a></li>
          <li><a href="#">区块链</a></li>
          <li><a href="#">数据库</a></li>
          <li><a href="#">程序人生</a></li>
          <li><a href="#">游戏开发</a></li>
          <li><a href="#">研发管理</a></li>
          <li><a href="#">前端</a></li>
          <li><a href="#">移动开发</a></li>
          <li><a href="#">物联网</a></li>
          <li><a href="#">运维</a></li>
          <li><a href="#">计算机基础</a></li>
          <li><a href="#">编程语言</a></li>
          <li><a href="#">架构</a></li>
          <li><a href="#">音视频开发</a></li>
          <li><a href="#">安全</a></li>
          <li><a href="#">其它</a></li>
        </ul>
      </nav>
      <section>
        <div class="content_title">
          <div class="content_title_left">
            <img class="hotCourse" src="../../../assets/home/201810181802171206.png">
          </div>
          <div class="content_title_right">
            <img class="hotCourse" src="../../../assets/home/201810101529364395.gif">
          </div>
        </div>
        <div class="content">
          <div class="content_left">
            <div class="content_left_news">
              <div class="content_left_news_left">
                <img src="../../../assets/home/c46eb786739fe627aa1f6d706fd56939.png" alt="">
              </div>
              <div class="content_left_news_right">
                <img src="../../../assets/home/3c0b1596dbd5ce05be1c14b74f8b6765.png" alt="">
                <img src="../../../assets/home/3c0b1596dbd5ce05be1c14b74f8b6765.png" alt="">
              </div>
            </div>
            <div class="content_list">
              <ul>
                <li>机器学习大神迈克尔 · 乔丹：我讨厌将机器学习称为AI</li>
                <li>好书推荐计划：Keras之父作品《Python 深度学习》</li>
                <li>InnoDB，select为啥会阻塞insert？</li>
                <li>吐血推荐珍藏的Flask资源</li>
                <li>十年一剑，阿里推荐与搜索引擎平台AI·OS首次公开！</li>
                <li>《深度学习500问》，川大优秀毕业生的诚意之作</li>
              </ul>
            </div>
          </div>
          <div class="content_right">
            <img src="../../../assets/home/201807131813446684.png" alt="">
            <div>
              <img src="../../../assets/home/20181028003756.png" alt="">
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  // import pngsrc from '~/assets/201807131813446684.png'
  // import { } from './components'

  export default {
    name: 'post',
    components: {},
    data () {
      return {

      }
    },
    method: {}
  }
</script>

<style scoped>
  .container {
    width: 100%;
    background-color: #f5f6f7;
  }

  .main {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 550px;
  }

  .nav {
    width: 10%;
    background-color: #FFFFFF;
  }

  .nav li {
    text-align: center;
    font-size: 14px;
  }

  .nav li a {
    display: block;
    line-height: 32px;
  }

  .nav li a:hover {
    /*鼠标悬浮在p标签上时，大小20，颜色红色*/
    color: #FFFFFF;
    font-size: 15px;
    background-color: red;
  }

  .main section {
    width: 90%;
  }

  .content_title {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .content_title_left {
    width: 65%;
  }

  .content_title_left img {
    width: 100%;
    height: 90px;
  }

  .content_title_right {
    width: 32%;
  }

  .content_title_right img {
    width: 100%;
    height: 90px;
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .content_left {
    width: 66%;
  }

  .content_left_news {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .content_left_news_left {
    width: 66%;
  }

  .content_left_news_left img {
    width: 100%;
  }

  .content_left_news_right {
    width: 32%;
  }

  .content_left_news_right img {
    width: 100%;
  }

  .content_right {
    width: 33%;
  }

  .content_right img {
    width: 100%;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .content_list li {
    width: 100%;
    padding: 18px 24px;
    border-bottom: 1px solid #f4f4f4;
  }

</style>
