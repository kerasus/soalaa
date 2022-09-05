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
          @click="ChangeImgPanelMode"
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
  name: 'ImageSidePanel',
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
    return {
      floatMode: false
    }
  },
  methods: {
    closePanelBtnClicked () {
      this.$emit('closePanelBtnClicked')
    },
    ChangeImgPanelMode () {
      this.$emit('imgPanelModeChanged')
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
