<template>
  <div>
    <div class="drawer"
         :dir="directionBasedOnSideSelection()"
         :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <!--  "we don't use drawer__overlay"  -->
      <!--      <div-->
      <!--        class="drawer__overlay"-->
      <!--        :style="{-->
      <!--          maxWidth: maxWidth,-->
      <!--          transitionDuration: `${speed}ms`-->
      <!--        }"-->
      <!--      ></div>-->
      <div
        class="drawer__content"
        :dir="directionBasedOnSideSelection('content')"
        :style="{
          transform: `translateX(${transformValue})`,
          maxWidth: maxWidth,
          transitionDuration: `${speed}ms`,
          background: backgroundColor,
        }"
      >
        <!--v-click-away="closeDrawer"-->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import { directive } from 'vue3-click-away'

export default {
  name: 'CustomDrawer',

  // directives: {
  //   ClickAway: directive
  // },

  props: {
    side: {
      type: String,
      default: 'right'
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },

    isExpanded: {
      type: Boolean,
      required: false,
      default: false
    },

    maxWidth: {
      type: String,
      required: false,
      default: '400px'
    },

    expansionValue: {
      type: String,
      required: false,
      default: undefined
    },

    // Transition Speed in Milliseconds
    speed: {
      type: Number,
      required: false,
      default: 300
    },

    backgroundColor: {
      type: String,
      required: false,
      default: '#fafafa'
    }
  },

  data () {
    return {
      isVisible: false,
      isTransitioning: false,
      transformValue: '100%'
    }
  },

  watch: {
    isExpanded() {
      this.transformValue = this.changeDrawerTransition(this.expansionValue)
    },

    isOpen (val) {
      this.isTransitioning = true

      if (val) {
        this.toggleBackgroundScrolling(true)
        this.transformValue = this.changeDrawerTransition(0)
        this.isVisible = true
      } else {
        this.toggleBackgroundScrolling(false)
        this.transformValue = this.changeDrawerTransition('100%')
        setTimeout(() => {
          this.isVisible = false
        }, this.speed)
      }

      setTimeout(() => (this.isTransitioning = false), this.speed)
    }
  },

  methods: {
    toggleBackgroundScrolling (enable) {
      const body = document.querySelector('body')

      body.style.overflow = enable ? 'hidden' : null
    },

    changeDrawerTransition(value) {
      if (this.side === 'right') {
        return '-' + value
      }
      return value
    },

    directionBasedOnSideSelection (mode) {
      if (mode === 'content') {
        return 'rtl'
      }
      if (this.side === 'right') {
        return 'rtl'
      }
      return 'ltr'
    }

    // closeDrawer() {
    //   console.log('closeDrawer')
    //   if (!this.isTransitioning) {
    //     this.$emit('close')
    //   }
    // }
  },
  computed: {
  },

  mounted () {
    this.transformValue = this.changeDrawerTransition(this.transformValue)
    this.isVisible = this.isOpen
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }

  &.is-open {
    //.drawer__overlay {
    //  opacity: 0.5;
    //}

    .drawer__content {
      //transform: translateX(0);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0;
    transition-property: opacity;
    //background-color: #000000;
    user-select: none;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 2000;
    overflow: auto;
    transition-property: transform;
    display: flex;
    flex-direction: column;
    //transform: translateX(100%);
    box-shadow: 0 2px 6px #777;
  }
}
</style>
