<template>
  <div class="text"
       :style="options.style"
       :class="options.customClass">
    <span>
      {{ options.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextWidget',
  data() {
    return {
      fontSize: '200px',
      fontWeight: null,
      fontFamily: null,
      color: 'red'
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.text {
  color: v-bind(options.color);
  font-size: v-bind(options.fontSize);
  font-weight: v-bind(options.fontWeight);
  font-family: v-bind(options.fontFamily);
  font-style: v-bind(options.fontStyle);
}
</style>
