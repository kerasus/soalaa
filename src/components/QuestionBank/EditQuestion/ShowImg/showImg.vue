<template>
  <v-card
    flat
    height="1856"
    class="rounded-card"
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
  }
}
}
</script>

<style scoped>

</style>