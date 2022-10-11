<template>
  <div
    ref="sticky"
    class="sticky"
    data-top-gap="100"
    data-bottom-gap="30"
  >
    <q-scroll-observer @scroll="positionStickySidebar" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StickyBothSides',
  data() {
    return {
      stickyElement: null,
      startPosition: 0,
      endScroll: 0,
      currPos: 0,
      topGap: 0,
      bottomGap: 0
    }
  },
  mounted() {
    this.stickyElement = this.$refs.sticky
    this.startPosition = this.stickyElement.getBoundingClientRect().top
    this.currPos = window.scrollY
    if (this.stickyElement.hasAttribute('data-top-gap')) {
      const dataTopGap = this.stickyElement.getAttribute('data-top-gap')
      this.topGap = String(dataTopGap) === 'auto' ? this.startPosition : parseInt(dataTopGap)
    }
    if (this.stickyElement.hasAttribute('data-bottom-gap')) {
      this.bottomGap = parseInt(this.stickyElement.getAttribute('data-bottom-gap'))
    }
    this.stickyElement.style.top = this.topGap + 'px'
  },
  methods: {
    positionStickySidebar(info) {
      this.endScroll = window.innerHeight - this.stickyElement.offsetHeight - this.bottomGap
      const stickyElementTop = parseInt(this.stickyElement.style.top.replace('px;', ''))
      if (this.stickyElement.offsetHeight + this.topGap + this.bottomGap > window.innerHeight) {
        if (info.direction === 'up') {
          // Scroll up
          if (stickyElementTop < this.topGap) {
            this.stickyElement.style.top = (stickyElementTop + this.currPos - window.scrollY) + 'px'
          } else if (stickyElementTop > this.topGap && stickyElementTop !== this.topGap) {
            this.stickyElement.style.top = this.topGap + 'px'
          }
        } else {
          // Scroll down
          if (stickyElementTop > this.endScroll) {
            this.stickyElement.style.top = (stickyElementTop + this.currPos - window.scrollY) + 'px'
          } else if (stickyElementTop < (this.endScroll) && stickyElementTop !== this.endScroll) {
            this.stickyElement.style.top = this.endScroll + 'px'
          }
        }
      } else {
        this.stickyElement.style.top = this.topGap + 'px'
      }
      this.currPos = window.scrollY
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  height: fit-content;
}
</style>
