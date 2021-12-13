<template>
  <v-card
    flat
    class="rounded-card"
    height="700"
    style="overflow: scroll;"
  >
    <div class="pa-6 showImg-navbar">
      <v-row justify="space-between align-center">
        <v-col>
          <div> فایل های بارگزاری شده</div>
        </v-col>
        <v-col class="text-left">
          <v-btn
            dark
            depressed
            rounded
            color="#44a3ff"
            style="margin-left: 40px;"
            @click="switchToBottomMode"
          >
            تغییر حالت
          </v-btn>

          <v-icon
            class="ml-4"
            @click="closeImgPanel"
          >
            mdi-close
          </v-icon>
        </v-col>
      </v-row>
    </div>
    <v-card
      color="#f5f5f5"
      flat
      class="ma-7 rounded-card"
    >
      <v-img
        :src="test"
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ShowImg",
  props:{
    test:{
      default: '',
      type: String
    },
  },
  data(){
    return{
      image:'',

    }
  },
methods:{
  closeImgPanel (){
    this.$emit("closePanel");
  },
  switchToBottomMode(){
    this.$emit('bottomMode');
  }
}
}
</script>

<style scoped>
.showImg-navbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #ffffff;
}
</style>
