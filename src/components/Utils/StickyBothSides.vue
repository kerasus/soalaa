<template>
  <div
    ref="shadow"
    class="parent-fix"
    :top-gap="topGap"
    :bottom-gap="bottomGap"
  >
    <div ref="sticky"
         class="position-fix">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StickyBothSides',
  props: {
    maxWidth: {
      type: Number,
      default: 0
    },
    topGap: {
      type: Number,
      default: 85
    },
    bottomGap: {
      type: Number,
      default: 15
    }
  },
  inject: {
    scrollInfo: {
      from: 'scrollInfo',
      default: {}
    }
  },
  data() {
    return {
      disableSticky: false,
      right: 0,
      windowWidth: 0,
      stickyElementWidth: 0,
      start: 0,
      previousPosition: 0
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.onResize)
    this.getStartFixElementPosition()
    this.stickyElementWidth = this.shadowElement.offsetWidth
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    stickyElement() {
      return this.$refs.sticky
    },
    shadowElement() {
      return this.$refs.shadow
    }
  },
  watch: {
    scrollInfo(newValue) {
      if (newValue.position.top === 0) {
        this.stickyElement.style.position = 'static'
      }
      if (!this.disableSticky) {
        this.updateScroll(newValue)
      } else {
        this.stickyElement.style.position = 'static'
      }
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.disableSticky = this.windowWidth < this.maxWidth
      this.stickyElement.style.width = this.shadowElement.offsetWidth + 'px'
      this.stickyElementWidth = this.shadowElement.offsetWidth
    },
    getStartFixElementPosition() {
      this.start = this.$refs.sticky.getBoundingClientRect().top - this.topGap
    },
    getScrollY() {
      return window.scrollY
    },
    stickyElementToTop(stickyElementTop) {
      if (this.stickyElement.offsetHeight <= window.innerHeight) {
        if (this.getScrollY() <= this.start) {
          this.stickyElement.style.position = 'static'
        }
      } else {
        if (this.stickyElement.getBoundingClientRect().top <= this.topGap) {
          stickyElementTop += this.previousPosition - this.getScrollY()
          this.stickyElement.style.top = stickyElementTop + 'px'
        } else if (this.getScrollY() <= this.start) {
          this.stickyElement.style.position = 'static'
        }
      }
    },
    stickyElementToBottom(stickyElementTop) {
      if (this.stickyElement.offsetHeight <= window.innerHeight) {
        if (this.getScrollY() >= this.start) {
          this.stickyElement.style.position = 'fixed'
          this.stickyElement.style.top = this.topGap + 'px'
          this.stickyElement.style.width = this.stickyElementWidth + 'px'
        }
      } else {
        if (this.stickyElement.getBoundingClientRect().bottom + this.bottomGap <= window.innerHeight) {
          this.stickyElement.style.position = 'fixed'
          this.stickyElement.style.top = window.innerHeight - this.stickyElement.offsetHeight + 'px'
          this.stickyElement.style.width = this.stickyElementWidth + 'px'
        } else if (stickyElementTop > window.innerHeight - this.stickyElement.offsetHeight) {
          stickyElementTop = stickyElementTop - (this.getScrollY() - this.previousPosition)
          this.stickyElement.style.top = stickyElementTop + 'px'
        }
      }
    },
    updateScroll(info) {
      const stickyElementTop = parseInt(this.stickyElement.style.top.replace('px', ''))
      if (info.direction === 'up') {
        this.stickyElementToTop(stickyElementTop)
      } else if (info.direction === 'down') {
        this.stickyElementToBottom(stickyElementTop)
      }
      this.previousPosition = this.getScrollY()
    }
  }
}
</script>

<style lang="scss" scoped>
.position-fix {
  position: static;
  //left: 100px;
  //width: 340px
}

</style>
