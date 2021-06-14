<template>
  <div id="app">
    <v-app
      id="inspire"
      class="transparent"
    >
      <v-container class="pa-6">
        <v-row>
          <v-col :cols="questionColsNumber">
            <navBar :status="urlPathName" />
            <QuestionAnswer :status="urlPathName" />
            <!-- -------------------------- upload file ---------------------->
            <div>
              <v-row>
                <v-col cols="5">
                  <UploadImg @imgClicked="openShowImgPanel" />
                </v-col>
                <!-- -------------------------- show exams  ---------------------->
                <v-col cols="7">
                  <Exams />
                </v-col>
              </v-row>
            </div>
            <!-- -------------------------- save change--------------------------->
            <SaveChange />
          </v-col>
          <v-card
            flat
            height="1856"
            class="rounded-card"
          >
            <div v-if="false">
              <Log />
            </div>
          </v-card>
          <!-- -------------------------- show img---------------------------->
          <v-col

            :cols="uploadImgColsNumber"
            :class="displayEditQuestion ? '' : 'd-none'"
          >
            <ShowImg
              :test="imgSrc"
              @closePanel="closeShowImgPanel"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import QuestionAnswer from '@/components/QuestionBank/EditQuestion/QuestionAnswer/questions';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import Status from '@/components/QuestionBank/EditQuestion/Status/stsatus';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import SaveChange from '@/components/QuestionBank/EditQuestion/SaveChange/saveChange'
import Log from '@/components/QuestionBank/EditQuestion/Log/Log';

export default {
  name: "NewPage",
  components: {
    navBar,
    QuestionAnswer ,
    UploadImg,
    Exams,
    ShowImg,
    Status,
    Log,
    SaveChange
  },
  data() {
    return {
      imgSrc:'',
      urlPathName:'',
      questionColsNumber: 12,
      uploadImgColsNumber: 0,
      displayEditQuestion: false,
    }
  },
  created() {
  this.getUrl()
  },
  methods: {
    getUrl (){
      this.urlPathName=this.$route.name
      console.log('url path name :'+this.urlPathName)
    },
   openShowImgPanel(src) {

      this.imgSrc=src;
      this.displayEditQuestion = true
      this.questionColsNumber = 7;
      this.uploadImgColsNumber = 5;
      this.$store.commit('AppLayout/updateDrawer', false)
    },
    closeShowImgPanel() {
      console.log('close click')
      this.displayEditQuestion = false
      this.$store.commit('AppLayout/updateDrawer', true)
      this.questionColsNumber = 12;
      this.uploadImgColsNumber = 0;
    }
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius: 10px;
}
</style>
