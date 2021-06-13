<template>
  <div id="app">
    <v-app
      id="inspire"
      class="transparent"
    >
      <v-container>
        <v-row>
          <v-col cols="9">
            <navBar />
            <Question
              v-model="value"
              :color="color"
              :title="'پاسخ تشریحی'"
              :edit-status="editStatus"
            />
            <Question
              v-model="value2"
              :color="color"
              :title="'پيوندهايى كه منشأ تشكيل ساختار دوم در پروتئین هموگلوبین هستند، ممكن  ..................'"
            />
            <Question
              v-model="value"
              :color="color"
              :title="'پاسخ تشریحی'"
            />
            <div>
              test
            </div>
            <Question
              v-model="fakeData[0].value"
              :title="'1-'"
              :title-top-position="false"
              :line="fakeData[0].line"
            />
            <Question
              v-model="value"
              :title="'2-'"
              :title-top-position="false"
            />
            <v-row>
              <v-col cols="5">
               <div>
                 <p class="font-weight-medium mb-10">
                   فایل های آپلود شده:
                 </p>
                 <v-card
                     height="138"
                     flat
                 >
                   <v-row justify="space-between">
                     <v-col>
                       <p>صورت سوال</p>
                       <v-img
                           src="https://picsum.photos/id/11/500/300"
                           width="60"
                           height="60"
                           rounded="lg"
                           @click="closeDrawer"
                       />
                     </v-col>
                     <v-col>
                       <p>جواب سوال</p>
                       <v-row>
                         <v-col>
                           <v-img
                               src="https://picsum.photos/id/11/500/300"
                               width="60"
                               height="60"
                               rounded="lg"
                               @click="closeDrawer"
                           />
                         </v-col>
                         <v-col>
                           <v-img
                               src="https://picsum.photos/id/11/500/300"
                               width="60"
                               height="60"
                               rounded="lg"
                               @click="closeDrawer"
                           />
                         </v-col>
                       </v-row>
                     </v-col>
                   </v-row>
                 </v-card>
               </div>
              </v-col>
              <v-col cols="7">
                <Exams />
              </v-col>
            </v-row>
          </v-col>
          <v-card
              flat
              height="1856"
              class="rounded-card"
          >
            <Log></Log>
          </v-card>

          <v-col cols="3"
          >
            <v-card
                v-if="false"
                height="1099"
                color="#f5f5f5"
                flat
                class="ma-7"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import Question from '@/components/Question/questionField';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import Status from '@/components/QuestionBank/EditQuestion/Status/stsatus';
import Log from '@/components/QuestionBank/EditQuestion/Log/Log';
export default {
  name: "NewPage",
  components:{
  navBar,
  Question,
  UploadImg,
  Exams,
  Status,
  Log
  },
  data (){
    return {
      value2:'',
      value:'  هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شونداست بین زیرواحد‌های سازندۀ',
      editStatus:true,
      line:5,
      color:'',
      fakeData:[
        {
          value:'  هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شونداست بین زیرواحد‌های سازندۀ',
          editStatus:true,
          line:5,
          color:'',
        },
      ],








      questionColsNumber:12,
      uploadImgColsNumber:0,
      displayEditQuestion:false,

    }

  },
  methods: {
    closeDrawer (){
      console.log('save click')
      this.displayEditQuestion=true
      this.questionColsNumber=7;
      this.uploadImgColsNumber=5;
      this.$store.commit('AppLayout/updateDrawer', false)
    },
    openDrawer(){
      console.log('close click')
      this.displayEditQuestion=false
      this.$store.commit('AppLayout/updateDrawer', true)
      this.questionColsNumber=12;
      this.uploadImgColsNumber=0;
    }
  },
}
</script>

<style scoped>
.rounded-card{
  border-radius: 10px;
}
</style>
