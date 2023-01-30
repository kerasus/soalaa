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
      fontFamily: '',
      color: '',
      fontSize: '',
      fontWeight: '',
      fontStyle: '',
      lgFontSize: '',
      lgFontWeight: '',
      lgFontStyle: '',
      mdFontSize: '',
      mdFontWeight: '',
      mdFontStyle: '',
      smFontSize: '',
      smFontWeight: '',
      smFontStyle: '',
      xsFontSize: '',
      xsFontWeight: '',
      xsFontStyle: ''
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    this.color = this.options.color
    this.fontFamily = this.options.fontFamily
    this.fontSize = this.options.xl.fontSize
    this.fontWeight = this.options.xl.fontWeight
    this.fontStyle = this.options.xl.fontStyle

    this.lgFontSize = this.options.lg.fontSize
    this.lgFontWeight = this.options.lg.fontWeight
    this.lgFontStyle = this.options.lg.fontStyle

    this.mdFontSize = this.options.md.fontSize
    this.mdFontWeight = this.options.md.fontWeight
    this.mdFontStyle = this.options.md.fontStyle

    this.smFontSize = this.options.sm.fontSize
    this.smFontWeight = this.options.sm.fontWeight
    this.smFontStyle = this.options.sm.fontStyle

    this.xsFontSize = this.options.xs.fontSize
    this.xsFontWeight = this.options.xs.fontWeight
    this.xsFontStyle = this.options.xs.fontStyle
  }
}
</script>

<style scoped lang="scss">
/*:root{--xs-fontSize: v-bind(size)}*/
/*:root{--xs-fontWeight: v-bind(weight)}*/
/*:root{--xs-fontStyle: v-bind(responsive.xs.fontStyle)}*/
/*:root{--color: v-bind(options.color)}*/
/*:root{--fontFamily: v-bind(options.fontFamily)}*/

.text {
  color: v-bind(color);
  font-size: v-bind(fontSize);
  font-weight: v-bind(fontWeight);
  font-family: v-bind(fontFamily);
  font-style: v-bind(fontStyle);

  @media screen and (max-width: 1920px) {
    font-size: v-bind(lgFontSize);
    font-weight: v-bind(lgFontWeight);
    font-style: v-bind(lgFontStyle);
  }

  @media screen and (max-width: 1440px) {
    font-size: v-bind(lgFontSize);
    font-weight: v-bind(lgFontWeight);
    font-style: v-bind(lgFontStyle);
  }

  @media screen and (max-width: 1024px) {
    font-size: v-bind(smFontSize);
    font-weight: v-bind(smFontWeight);
    font-style: v-bind(smFontStyle);
  }

  @media screen and (max-width: 600px) {
    font-size: v-bind(xsFontSize);
    font-weight: v-bind(xsFontWeight);
    font-style: v-bind(xsFontStyle);
  }
}
</style>
