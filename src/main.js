import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router/index'
import store from '@/store/store'
import Axios from '@/plugins/axios'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueNotification from 'vue-notification'
import VueGtag from 'vue-gtag'
import './registerServiceWorker'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

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
Axios.synchronizeTimeAfterResponse()

window.VueApp = new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
