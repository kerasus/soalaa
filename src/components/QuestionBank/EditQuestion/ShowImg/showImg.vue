<template>
  <v-card
    flat
    height="1856"
  >
    <div class="pa-6">
      <v-row justify="space-between">
        <v-col>
          <span> فایل های بارگزاری شده</span>
        </v-col>
        <v-col class="text-left">
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
      height="1099"
      color="#f5f5f5"
      flat
      class="ma-7"
    />
  </v-card>
</template>

<script>
export default {
  name: "ShowImg",
  data(){
    return{
      imgSrc:''
    }
  },
methods:{
  closeImgPanel (){

  }
}
}
</script>

<style scoped>

</style>