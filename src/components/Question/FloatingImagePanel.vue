<template>
  <div class="main">
    <div class="popup">
      <div class="popup-header">
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
    </div>
  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
import { initDragElement, initResizeElement } from 'src/assets/js/DragAndResize.js'

export default {
  data: () => ({
    name: ''
  }),
  created () {
  },
  computed: {
  },
  mounted () {
    initDragElement()
    initResizeElement()
  },
  methods: {
    closePanelBtnClicked () {
      // this.$emit('closePanelBtnClicked')
    },
    imgPanelModeChanged () {
      this.$emit('imgPanelModeChanged')
    }
  }
}
</script>
<style>
.main {
  direction: rtl !important;
}
.popup {
  z-index: 9999;
  text-align: center;
  min-height: 100px;
  min-width: 300px;
}

/*Drgable */

.popup {
  position: absolute;
  /*resize: both; !*enable this to css resize*! */
  overflow: auto;
}

.popup-header {
  cursor: move;
  z-index: 10000;
  height: 100%;
  width: 100%;
}

/*Resizeable*/

.popup .resizer-right {
  width: 5px;
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: e-resize;
}

.popup .resizer-bottom {
  width: 100%;
  height: 5px;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: n-resize;
}

.popup .resizer-both {
  width: 5px;
  height: 5px;
  background: transparent;
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nw-resize;
}

/*NOSELECT*/

.popup * {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

</style>
