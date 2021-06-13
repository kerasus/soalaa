<template>
  <div id="app">
    <v-app
      id="inspire"
      class="transparent"
    >
      <v-container class="pa-6">
        <v-row>
          <v-col :cols="questionColsNumber">
            <navBar />
            <QuestionAnswer />
            <!-- -------------------------- upload file ---------------------->
            <div>
              <v-row>
                <v-col cols="5">
                  <UploadImg />
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
            <Log></Log>
          </v-card>
          <!-- -------------------------- show img---------------------------->
          <v-col
            :cols="uploadImgColsNumber"
            :class="displayEditQuestion ? '' : 'd-none'"
          >
            <ShowImg />
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
      statusType:'',
      questionColsNumber: 12,
      uploadImgColsNumber: 0,
      displayEditQuestion: false,
    }
  },
  created() {
    this.statusType=this.$route.name
    console.log( this.$route.name)
  },
  methods: {
    closeDrawer() {
      console.log('save click')
      this.displayEditQuestion = true
      this.questionColsNumber = 7;
      this.uploadImgColsNumber = 5;
      this.$store.commit('AppLayout/updateDrawer', false)
    },
    openDrawer() {
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
