import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router/index'
import store from '@/store/store'
import Axios from '@/plugins/axios'
import VueNotification from 'vue-notification'

Vue.use(VueNotification)

Vue.config.productionTip = false
Axios.handleError()

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
