<template>
  <div
    class="question-image-panel"
  >
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
  components: {},
  data () {
    return {}
  },
  methods: {
    closePanelBtnClicked () {
      this.$emit('closePanelBtnClicked')
    },
    imgPanelModeChanged () {
      this.$emit('imgPanelModeChanged')
      this.$q.notify({
        message: 'این قابلیت بزودی اضافه خواهد شد...',
        color: 'primary'
      })
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
