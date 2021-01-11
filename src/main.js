import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index';
import store from "./store/store";
import axios from 'axios'
Vue.config.productionTip = false


const accessToken = process.env.VUE_APP_ACCESS_TOKEN
localStorage.setItem('access_token', accessToken)
const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}


new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
