<template>
  <div :class="customClass">
    <q-resize-observer @resize="onresize" />
    <q-img v-if="width && height"
           ref="LazyImage"
           :src="lazyImageSrc"
           :width="computedWidth+'px'"
           :height="computedHeight+'px'"
           :ratio="ratio"
           fit="contain"
           class="full-width"
           position="0 0"
    />
    <q-img v-else
           :src="src"
    />
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      lazyImageSrc: '',
      computedWidth: 0,
      computedHeight: 0
    }
  },
  computed: {
    customClass () {
      return this.class
    },
    normalizedSizeWithPx () {
      return {
        w: this.normalizedSizeInNumber.w + 'px',
        h: this.normalizedSizeInNumber.h + 'px'
      }
    },
    normalizedSizeInNumber () {
      if (!this.width || !this.width) {
        return {
          w: 0,
          h: 0
        }
      }

      const wContain = this.width.search('px') !== -1 ? 'px' : this.width.search('%') ? '%' : ''
      const HContain = this.height.search('px') !== -1 ? 'px' : this.height.search('%') ? '%' : ''

      return {
        w: this.width.replace(wContain, ''),
        h: this.height.replace(HContain, '')
      }
    },
    ratio () {
      return this.normalizedSizeInNumber.w + '/' + this.normalizedSizeInNumber.h
    }
  },
  mounted() {
    this.updateLazyImageSrc()
  },
  watch: {
    src () {
      this.updateLazyImageSrc()
    }
  },
  methods: {
    onresize () {
      this.updateLazyImageSrc()
    },
    updateLazyImageSrc () {
      this.computedWidth = Math.floor(this.getOffsetWidth())
      this.computedHeight = Math.floor(this.getOffsetHeight())

      if (this.normalizedSizeInNumber.w !== null && this.normalizedSizeInNumber.h !== null && !isNaN(parseInt(this.normalizedSizeInNumber.w)) && !isNaN(parseInt(this.normalizedSizeInNumber.h))) {
        this.computedHeight = Math.floor((parseInt(this.normalizedSizeInNumber.h) * this.computedWidth) / parseInt(this.normalizedSizeInNumber.w))
      }
      this.lazyImageSrc = this.src

      if (!isNaN(this.computedWidth) && this.computedWidth > 0 && !isNaN(this.computedHeight) && this.computedHeight > 0) {
        this.lazyImageSrc += '?w=' + this.computedWidth + '&h=' + this.computedHeight
      }
    },
    getImageElement () {
      if (!this.$refs.LazyImage) {
        return {
          offsetWidth: null,
          offsetHeight: null
        }
      }
      return this.$refs.LazyImage.$el
    },
    getOffsetWidth () {
      return this.getImageElement().offsetWidth
    },
    getOffsetHeight () {
      return this.getImageElement().offsetHeight
    }
  }
}
</script>

<style scoped>

</style>
