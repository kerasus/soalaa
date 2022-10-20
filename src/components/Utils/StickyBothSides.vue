<template>
  <div
    ref="sticky"
    class="position-fix"
    :top-gap="topGap"
    :bottom-gap="bottomGap"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StickyBothSides',
  props: {
    scrollInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: Number,
      default: 0
    },
    topGap: {
      type: Number,
      default: 85
    },
    bottomGap: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      start: 0,
      currentPosition: 0
    }
  },
  mounted() {
    this.getStartFixElementPosition()
  },
  computed: {
    stickyElement() {
      return this.$refs.sticky
    }
  },
  watch: {
    scrollInfo(newValue) {
      this.updateScroll(newValue)
    }
  },
  methods: {
    getStartFixElementPosition() {
      this.start = this.$refs.sticky.getBoundingClientRect().top - this.topGap
    },
    getScrollY() {
      return window.scrollY
    },
    stickyElementToTop(stickyElementTop) {
      if (this.getScrollY() < this.start) {
        this.stickyElement.style.position = 'static'
      }
    },
    stickyElementToBottom(stickyElementTop) {
      this.stickyElement.style.position = 'fixed'
      this.stickyElement.style.top = this.topGap + 'px'
      this.stickyElement.style.right = 85 + 'px'
      this.stickyElement.style.width = this.width + 'px'
    },
    updateScroll(info) {
      const stickyElementTop = parseInt(this.stickyElement.style.top.replace('px', ''))
      if (info.direction === 'up') {
        this.stickyElementToTop(stickyElementTop)
      } else if (info.direction === 'down' && this.getScrollY() >= this.start) {
        this.stickyElementToBottom(stickyElementTop)
      }
      this.currentPosition = this.getScrollY()
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
