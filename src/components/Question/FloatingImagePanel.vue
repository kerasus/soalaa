<template>
  <div class="main">
    <div class="popup">
      <div class="popup-header">Clickطظز ظسز here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>
    <div class="popup">
      <div class="popup-header noselect">Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
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
  }
}
</script>
<style>
.main {
  direction: rtl !important;
}
.popup {
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  min-height: 150px;
  min-width: 300px;
}

/*Drgable */

.popup {
  position: absolute;
  /*resize: both; !*enable this to css resize*! */
  overflow: auto;
}

.popup-header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196f3;
  color: #fff;
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
