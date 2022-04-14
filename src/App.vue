<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import 'src/assets/scss/IranyekanFont.scss'
import 'src/css/customTheme.scss'
import 'src/css/Theme/theme.scss'

import { mixinSetIcons } from './mixin/Mixins.js'
// import 'material-icons/material-icons.css'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  mixins: [mixinSetIcons],
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  created () {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    if (navigator && navigator.serviceWorker) {
      // Prevent multiple refreshes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        // Here the actual reload of the page occurs
        // window.location.reload()
      })
    }

    this.setIcons()
  },
  methods: {
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    }
  }
})
</script>
<style>
#F4F5F6
  :root {

  }
  * {
    /*font-family: 'iranyekan', 'Arial', '-apple-system', 'Helvetica Neue', Helvetica, sans-serif ;*/
    font-family: iranyekan , 'Arial', '-apple-system', 'Helvetica Neue', Helvetica, sans-serif ;
  }
  body.body--light {
    background: #f1f1f1
  }
  .default-notify-class {
    font-size: 18px;
    /*width: 30%;*/
    text-align: center;
    padding: 10px 16PX;
  }
  /*body.body--dark {*/
  /*  background: #000*/
  /*}*/
</style>
