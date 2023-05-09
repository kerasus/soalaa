<template>
  <q-btn :color="localOptions.color"
         :label="localOptions.label"
         :flat="localOptions.flat"
         :class="localOptions.className"
         :style="localOptions.style"
         class="action-btn"
         @click="takeAction">
    <q-icon v-if="localOptions.icon"
            :name="localOptions.icon" />
    <img v-if="localOptions.imageSource"
         :src="localOptions.imageSource"
         alt="actionBtn">
  </q-btn>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ActionButton',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        color: null,
        icon: null,
        label: null,
        flat: false,
        callBack: null,
        imageSource: null,
        className: null,
        fixed: false,
        fixedPosition: null,
        action: null,
        scrollTo: null,
        route: null,
        eventName: null,
        eventArgs: null
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      if (this.localOptions.imageSource) {
        this.localOptions.flat = true
        this.localOptions.className = this.localOptions.className + ' img-btn'
      }
      if (this.localOptions.fixed) {
        this.localOptions.className = this.localOptions.className + ' fixed-btn' + ` ${this.localOptions.fixedPosition}`
      }
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    takeAction() {
      if (this.callBack) {
        this.callBack()
      } else if (this.options.action && this.options.action === 'scroll') {
        this.scrollToElement(this.options.scrollTo)
      } else if (this.options.action && this.options.action === 'link') {
        this.router.push(this.options.route)
      } else if (this.options.action && this.options.action === 'event') {
        this.$bus.emit(this.options.eventName, this.eventArgs)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn {

  &.fixed-btn {
    position: fixed;
    z-index: 1;

    &.top-right {
      top: 0;
      right: 0;
    }
    &.top-left {
      top: 0;
      left: 0;
    }
    &.bottom-right {
      bottom: 0;
      right: 0;
    }
    &.bottom-left {
      bottom: 0;
      left: 0;
    }
  }
  &.img-btn{
    &:deep(.q-btn__content){
      margin: 0;
    }
    &:deep(.q-focus-helper) {
      display: none;
    }
  }
}
</style>
