<template>
  <v-card
    flat
    class="rounded-card"
    height="700"
    style="overflow: scroll;"
  >
    <div class="pa-6">
      <v-row justify="space-between">
        <v-col>
          <span> فایل های بارگزاری شده</span>
        </v-col>
        <v-col class="text-left">
          <v-btn
            depressed
            rounded
            color="primary"
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
      <!--      FOR TEST -->
      <!--      <br>-->
      <!--      <v-img-->
      <!--          :src="test"-->
      <!--      />-->
      <!--      <v-img-->
      <!--          :src="test"-->
      <!--      />-->
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

</style>
