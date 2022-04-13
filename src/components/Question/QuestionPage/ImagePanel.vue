<template>
  <div
    class="question-image-panel"
  >
    <floating-image-panel
      @imgPanelModeChanged="imgPanelModeChanged"
      :class="{ 'floatMode': floatMode }"
    />
    <q-card
      class="question-card default-questions-card image-panel-box"
    >
      <q-card-section class="image-panel-header default-Qcard-title row justify-between">
        <q-btn
          class="close-panel-btn"
          icon="isax:close-circle"
          color="white"
          text-color="accent"
          dense
          unelevated
          rounded
          @click="closePanelBtnClicked"
        />
        <q-btn
          class="change-mode-btn"
          color="white"
          text-color="accent"
          label="تغییر حالت"
          flat
          rounded
          unelevated
          @click="imgPanelModeChanged"
        />
      </q-card-section>
      <div>
        <q-card-section>
          ***********IMAGES*******
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import FloatingImagePanel from 'components/Question/FloatingImagePanel'
export default {
  name: 'ImagePanel',
  props: {
    mode: {
      type: String,
      default () {
        return 'show'
      }
    }
  },
  components: {
    FloatingImagePanel
  },
  data () {
    return {
      floatMode: false
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
.question-image-panel {
  .image-panel-box {
    height: 600px;
    overflow-x: scroll;
  }
  .change-mode-btn {
    margin-right: 60px;
  }
}
</style>
<style scoped>
.floatMode {
  visibility: hidden;
}
</style>
