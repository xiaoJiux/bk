import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    //登陆成功后,改变vuex的登录信息
    login(state,userInfo){
      state.userInfo = userInfo
    },
    logout(state){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
