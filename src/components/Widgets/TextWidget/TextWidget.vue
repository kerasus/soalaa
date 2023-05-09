<template>
  <div class="text-widget-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <span class="text"
          v-html="localOptions.text" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TextWidget',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.text-widget-container {
  @media screen and(max-width: 599px) {
    //display: flex;
    //width: 100%;
  }
}

.text {
  color: v-bind('localOptions.color');
  font-size: v-bind('localOptions.xl.fontSize');
  font-weight: v-bind('localOptions.xl.fontWeight');
  font-family: v-bind('localOptions.fontFamily');
  font-style: v-bind('localOptions.xl.fontStyle');

  @media screen and (max-width: 1920px) {
    font-size: v-bind('localOptions.lg.fontSize');
    font-weight: v-bind('localOptions.lg.fontWeight');
    font-style: v-bind('localOptions.lg.fontStyle');
  }

  @media screen and (max-width: 1440px) {
    font-size: v-bind('localOptions.md.fontSize');
    font-weight: v-bind('localOptions.md.fontWeight');
    font-style: v-bind('localOptions.md.fontStyle');
  }

  @media screen and (max-width: 1024px) {
    font-size: v-bind('localOptions.sm.fontSize');
    font-weight: v-bind('localOptions.sm.fontWeight');
    font-style: v-bind('localOptions.sm.fontStyle');
  }

  @media screen and (max-width: 600px) {
    font-size: v-bind('localOptions.xs.fontSize');
    font-weight: v-bind('localOptions.xs.fontWeight');
    font-style: v-bind('localOptions.xs.fontStyle');
  }
}
</style>
