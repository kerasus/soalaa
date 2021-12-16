import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router/index'
import store from '@/store/store'
import Axios from '@/plugins/axios'
import VueNotification from 'vue-notification'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: 'UA-43695756-1'
  },
  appName: '3a',
  pageTrackerScreenviewEnabled: true
}, router)

Vue.use(VueNotification)

Vue.config.productionTip = false
Axios.handleError()

window.VueApp = new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
