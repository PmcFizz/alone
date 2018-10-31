<template>
  <div class="container">
    <el-menu class="navbar" mode="horizontal">
      <div class="left-menu">
        <a href="/#/ask">
          <img width="70%" style="background-color:#F5F6F7;" src="../../assets/main.png" alt="noodv">
        </a>
      </div>
      <div class="right-menu">
        <div class="right-menu-item">
          <a style="color: #000000; margin-right: 10px;" href="#">
            <router-link to="/home">首页</router-link>
          </a>
          <a style="color: #000000; margin-right: 10px;" href="#">
            <router-link to="/ask">问答</router-link>
          </a>
          <a style="color: #000000; margin-right: 10px;" href="#">
            <router-link to="/blogindex">博客</router-link>
          </a>
          <a style="color: #000000; margin-right: 10px;" href="#">
            <router-link to="/videolist">视频</router-link>
          </a>
          <a style="color: #000000; margin-right: 10px;" href="#">
            <router-link to="/videolist">招聘</router-link>
          </a>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="color: #FFFFFF">
              <a style="color: #000000" href="#">其它</a>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/forum">论坛</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/videolist">视频</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-input class="input-with-select" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <span v-if="loginStatus">
          <div class="right-menu-item">
            <font color="#000000">
              <a href="#" @click="$store.state.dialogFormVisible = true">登录</a>
              <a style="margin: 15px;" href="#" @click="registerDialog = true">注册</a>
            </font>
          </div>
        </span>
        <span v-else>
          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
              <img @dblclick="myInfo" class="user-avatar"
                   style="background-size: 40px;background-image: url(https://sfault-avatar.b0.upaiyun.com/761/136/761136322-5b2e841f0ea8d_big64);">
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  {{$t('navbar.dashboard')}}
                </el-dropdown-item>
              </router-link>
              <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
                <el-dropdown-item>
                  {{$t('navbar.github')}}
                </el-dropdown-item>
              </a>
              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </el-menu>
    <el-dialog title="登录" :visible.sync="$store.state.dialogFormVisible">
      <el-form :model="form" :rules="rules1" labelPosition="top" style="padding: 0 125px;">
        <el-form-item label="Email" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="padding: 0 125px;" class="dialog-footer">
        <el-button type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleLogin">登录
        </el-button>
        <br>
        <el-button type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="$store.state.dialogFormVisible = false;registerDialog = true;">注册
        </el-button>
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="registerDialog">
      <el-form :model="registerform" ref="registerform" :rules="rules2" labelPosition="top" style="padding: 0 125px;">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="registerform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="registerform.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="padding: 0 125px;" class="dialog-footer">
        <el-button type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="register">注册</el-button>
        <br>
        <el-button type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="$store.state.dialogFormVisible = true;registerDialog = false;">已有帐号登录
        </el-button>
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="请激活帐号" :visible.sync="active">
      <el-alert
        title="为了正常使用投票、评论、关注等功能，请激活你的账号"
        type="warning">
      </el-alert>
      <div class="">
        <div class="activate__step activate__step--mail">
          <div class="mt20 mb10">
            <span class="text-muted activate-label pull-left">你的 Email：</span>
            <span class="activate-showmail">
                <strong class="h4 session-mail">noodv@sina.com</strong>
                <a href="javascript:void(0);" class="ml10 activate-change">不正确？</a>
            </span>
            <form method="post" class="activate-form inline-block" style="display:none;width:400px;">
              <div class="form-group col-sm-7 mb0">
                <input type="text" class="form-control change-mail" data-mail="noodv@sina.com" name="mail"
                       value="noodv@sina.com" placeholder="hello@segmentfault.com">
              </div>
              <div class="form-group col-sm-5 mb0">
                <button class="btn btn-primary mr10" type="button">保存</button>
              </div>
            </form>
          </div>
          <p class="text-muted">
            激活邮件已发送，请注意查收（注意检查回收站、垃圾箱中是否有激活邮件）
            <br>如果仍未收到，请尝试 <a class="activate__step-reactivate-btn btn btn-link p0"
                              href="javascript:void(0);">重新发送激活邮件</a>
            ，如有困难请 <a class="activate__step-contact"
                      href="mailto:pr@segmentfault.com?subject=邮箱 noodv@sina.com 无法激活&amp;body=请描述具体内容">联系我们</a>
          </p>
          <div class="text-right mt20">
            <a class="btn btn-default activate_step-mail-goto" target="_blank" :href="emailaddress">前往邮箱查收</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { removeToken, getToken, setToken, setUser } from '@/utils/auth' // getToken from cookie
  import common from '@/utils/common'

  export default {
    name: 'Navbar',
    components: {},
    computed: {
      ...mapGetters(['sidebar', 'name', 'avatar'])
    },
    created () {
      this.init()
    },
    mounted () {
      this.list = this.states.map(item => {
        return { value: item, label: item }
      })
    },
    data () {
      return {
        navs: [''],
        activeDisplay: 'none',
        loginStatus: true,
        dialogFormVisible: false,
        registerDialog: false,
        active: false,
        emailaddress: '',
        formLabelWidth: '80px',
        activeIndex: '1',
        activeIndex2: '1',
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: ['@qq.com', '@163.com', '@sina.com',
          '@sohu.com', '@yahoo.com', '@gmail.com', '@hotmail.com'],
        form: {
          username: '',
          password: ''
        },
        registerform: {
          name: '',
          username: '',
          password: ''
        },
        rules1: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ]
        },
        rules2: {
          name: [
            { required: true, message: '请输入姓中', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: this.validateUserExsit, trigger: ['blur', 'change'] },
            { validator: this.checkEmailPhone, trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init () {
        // 判断是否登录,如果登录显示头像
        if (getToken()) {
          this.$data.loginStatus = false
        }
        // 初始化菜单
        axios.post('/api/admin/navs/read', this.form).then((response) => {
          if (response.data.code == 200 && response.data.data !== '' && response.data.data != null) {
            this.$data.navs = response.data.data
          }
        }).catch(function(error) {
          console.log(error)
        })
        // 将弹出登录框设置开放出云
        common.$on('LoginDialog', () => {
          // this.$data.dialogFormVisible = true
          this.$store.state.dialogFormVisible = true
        })
      },
      async validateUserExsit (rule, value, callback) {
        let flag = false  // 帐号已存在
        await axios.get('/api/admin/users/findMemberByUsername?username=' + this.$data.registerform.username).then((response) => {
          flag = response.data
        }).catch(function(error) {
          console.log(error)
        })
        if (!flag) {
          callback(new Error('帐号已存在'))
        } else {
          if (this.form.username !== '') {
            this.$refs.registerform.validateField('username')
          }
          callback()
        }
      },
      checkEmailPhone (rule, value, callback) {
        var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        if (!reg.test(value)) {
          callback(new Error('邮箱或号码不正确'))
        } else {
          if (this.form.username !== '') {
            this.$refs.registerform.validateField('username')
          }
          callback()
        }
      },
      toggleSideBar () {
        this.$store.dispatch('toggleSideBar')
      },
      myInfo () {
        this.$router.push({ path: '/user' })
      },
      logout () {
        // this.$store.dispatch('LogOut').then(() => {
        //   location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        // })
        removeToken()
        this.$data.loginStatus = true
        history.go(0)
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleLogin () {
        // this.loading = true
        axios.post('/api/admin/base/login', this.form).then((response) => {
          if (response.data.code == 200) {
            // 本地存储token
            setToken(response.data.data.jwt)
            setUser(response.data.data.userInfo)
            // localStorage.setItem('jwt', response.data.jwt);
            axios.defaults.headers.common['X-token'] = response.data.data.jwt
            this.$data.dialogFormVisible = false
            //刷新当前页
            this.$router.go(0)
            // axios.get('user.php').then(function(response) {
            //     if (response.data.result === 'success') {
            //         document.querySelector('#showpage').style.display = 'none';
            //         document.querySelector('#user').style.display = 'block';
            //         document.querySelector('#uname').innerHTML = response.data.info.data.username;
            //     } else {
            //     }
            // });
          } else {
            console.log(response.data.msg)
          }
          this.$router.push({ path: '/' })
          // this.loading = false
        }).catch(function(error) {
          console.log(error)
        })
      },
      async register () {
        await axios.post('/api/admin/users/save', this.$data.form).then(response => {
          if (response.data.code == 400) {
            this.$data.activeDisplay = 'inline'
          } else if (response.data.code == 200) {
            if (this.$data.form.username.indexOf('@sina.com') != -1) {
              this.$data.emailaddress = 'https://mail.sina.com.cn/'
            } else if (this.$data.form.username.indexOf('@163.com')) {
              this.$data.emailaddress = 'https://mail.163.com/'
            } else if (this.$data.form.username.indexOf('@sina.com')) {
              this.$data.emailaddress = 'https://mail.qq.com/'
            }
            this.$data.registerDialog = false
            this.$data.active = true
          }
        }).catch(error => {
          console.log(error)
        })
      },
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options4 = this.states.map(item => {
              return { value: query + item, label: query + item }
            })
          }, 200)
        } else {
          this.form.username = ''
          this.options4 = []
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    max-width: 1920px;
  }

  .navbar {
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-radius: 0px !important;
    border-bottom: 1px solid #D5D5D5;
    background-color: #f5f6f7;
    display: flex;
    .left-menu {
      width: 12%;
      margin: 8px 0px 10px 30px;
      .right-menu-item {
        display: inline-block;
        vertical-align: middle;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
          }
        }
      }
    }
    .right-menu {
      width: 85%;
      display: flex;
      justify-content: space-around;
      .right-menu-item {
        vertical-align: middle;
        margin-right: 20px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
          }
        }
      }
    }
  }

  .input-with-select {
    width: 500px;
    margin: auto 0;
    margin-right: 20px;
    background-color: #fff;
  }

  .hidden {
    display: none !important;
    visibility: hidden !important;
  }

  .cust-el-dropdown-link {
    color: #fafafa;
    font-size: 16px;
  }
</style>
