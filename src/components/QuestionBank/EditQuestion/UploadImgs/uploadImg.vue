<template>
  <div class="mb-10">
    <p class="font-weight-medium mb-11">
      فایل های آپلود شده:
    </p>
    <v-card
      flat
      height="138"
      class="rounded"
    >
      <v-row justify="space-between">
        <v-col class="mr-3">
          <p>صورت سوال</p>
          <v-img
            :src="srcImg1"
            width="60"
            height="60"
            rounded="lg"
            @click="showImgPanel(srcImg1)"
          />
        </v-col>
        <v-col>
          <p>جواب سوال</p>
          <v-row
            no-gutters
            justify="end"
          >
            <v-col cols="5">
              <v-img
                :src="srcImg1"
                width="60"
                height="60"
                rounded="lg"
                class="mx-2"
                @click="showImgPanel(srcImg1)"
              />
            </v-col>
            <v-col cols="5">
              <v-img
                :src="srcImg2"
                width="60"
                height="60"
                rounded="lg"
                @click="showImgPanel(srcImg2)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "UploadImg",
  data(){
    return {
      srcImg1:'https://picsum.photos/id/11/500/300',
      srcImg2:'https://picsum.photos/500/300'
    }
  },
  methods :{
    showImgPanel(src){
      this.$emit("imgClicked",src);

    }
  }
}
</script>

<style scoped>

</style>