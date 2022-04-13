<template>
  <image-side-panel
    :mode="mode"
    @closePanelBtnClicked="closePanelBtnClicked"
  />
</template>

<script>
import ImageSidePanel from 'components/Question/QuestionPage/ImageSidePanel'
export default {
  name: 'ImagePanel',
  components: {
    ImageSidePanel
  },
  props: {
    mode: {
      type: String,
      default () {
        return 'show'
      }
    }
  },
  methods: {
    closePanelBtnClicked () {
      this.$emit('closePanelBtnClicked')
    },
    imgPanelModeChanged () {
      this.floatMode = !this.floatMode
      this.$emit('imgPanelModeChanged')
      // this.$q.notify({
      //   message: 'این قابلیت بزودی اضافه خواهد شد...',
      //   color: 'primary'
      // })
    }
  }
}
</script>

<style lang="scss">

</style>
