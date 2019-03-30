import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入路由
import router from './router.js'

new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  router
}).$mount('#app')
