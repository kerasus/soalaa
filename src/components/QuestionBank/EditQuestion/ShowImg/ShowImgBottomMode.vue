<template>
  <div
    v-if="true"
    class="showImg-bottomMode"
  >
    <v-bottom-navigation
      color="indigo"
      fixed
      min-height="450"
    >
      <div class="showImg-bottom-navigation-container">
        <div class="switch-button">
          <v-btn
            depressed
            rounded
            color="#44a3ff"
            @click="switchToSideMode"
          >
            تغییر حالت
          </v-btn>
          <div
            class="switch-button-close"
            style="right: 50px;"
          >
            <v-icon
              @click="closeImgNavigation"
            >
              mdi-close
            </v-icon>
          </div>
        </div>
        <div>
          <v-card
            color="#f5f5f5"
            flat
            class="mb-6 rounded-card"
          >
            <v-img
              :src="imgSrc"
            />
          </v-card>
        </div>
      </div>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: 'ShowImgBottomMode',
  props:{
    imgSrc:{
      default: '',
      type: String
    },
  },
  data(){
    return{
      image:'',

    }
  },
  methods : {
    switchToSideMode(){
      this.$emit('sideMode');
    },
    closeImgNavigation (){
      this.$emit('closeBottomNav');
    },
  }
}
</script>
<style lang="scss">
.showImg-bottomMode {
  .v-item-group.v-bottom-navigation--fixed {
    position: fixed;
    overflow: scroll;
  }
  .showImg-bottom-navigation-container {
    padding-top: 10px;
    width: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    .switch-button {
      margin-bottom: 10px;
      position: relative;
      right: 40%;
      display: flex;
      align-items: center;
      .switch-button-close{
        position: relative;
        right: 50px;
      }
    }
  }
}
</style>
<style scoped>
.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: rgb(255, 255, 255) !important;
  font-size: 0.875rem;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  border-radius: 28px;
}
.v-item-group.v-bottom-navigation .v-btn.v-btn--active {
  color: rgb(255, 255, 255) !important;
  font-size: 0.875rem;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  border-radius: 28px;
}
</style>
