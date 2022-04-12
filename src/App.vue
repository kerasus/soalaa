<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import 'src/assets/scss/IranyekanFont.scss'
import 'src/css/customThem.scss'
import 'src/css/Theme/theme.scss'

// import '../public/fonts/iranyekan/css/style.css'

import { mixinSetIcons } from './mixin/Mixins.js'
// import 'material-icons/material-icons.css'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  mixins: [mixinSetIcons],
  created () {
    this.setIcons()
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
