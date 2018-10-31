import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    dialogFormVisible: false, // 登录框的弹出状态
    dialogTetch: false // 用户技术类型框的弹出状态
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
