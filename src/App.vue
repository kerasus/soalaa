<template>
  <router-view />
</template>
<script>
import 'src/assets/scss/IranyekanFont.scss'
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
  :root {
    --background-1: #fff;
    --background-2: #f5f5f5;
    --background-3: red;
    --surface-1: #fff;
    --surface-2: #f1f1f1;
    --surface-3: #f1f1f1;
    --primary-1: #ffc107;
    --primary-2: #fbcf4b;
    --primary-3: #ffc107;
    --text-1: #000;
    --text-2: #666;
    --text-3: #fff;
    --accent-1: #2196F3;
    --accent-2: #2196F3;
    --accent-3: #2196F3;
    --success-1: #4caf50;
    --success-2: #4caf50;
    --success-3: #4caf50;
    --error-1: #f44336;
    --error-2: #f44336;
    --error-3: #f44336;
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
