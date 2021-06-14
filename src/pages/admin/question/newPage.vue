<template>
  <div id="app">
    <v-container class="pa-6">
      <v-row>
        <v-col :cols="questionColsNumber">
          <navBar :status="urlPathName" />
          <QuestionAnswer
            :status="edit_status"
            :question_data="question"
          />
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
          <!-- -------------------------- status --------------------------->
          <div
            v-if="urlPathName == 'question.edit' || urlPathName == 'question.show' "
            class="my-10"
          >
            <StatusComponent />
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
  </div>
</template>
<script>
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import QuestionAnswer from '@/components/QuestionBank/EditQuestion/QuestionAnswer/questionField';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import StatusComponent from '@/components/QuestionBank/EditQuestion/StatusComponent/stsatus';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import SaveChange from '@/components/QuestionBank/EditQuestion/SaveChange/saveChange'
import Log from '@/components/QuestionBank/EditQuestion/Log/Log';
import { Question } from '@/models/Question'

export default {
  name: "NewPage",
  components: {
    navBar,
    QuestionAnswer ,
    UploadImg,
    Exams,
    ShowImg,
    StatusComponent,
    Log,
    SaveChange
  },
  data() {
    return {
      fakeData: {
        "id": "60a5fa0af55154475e630b95",
        "statement": "In free writing, you should not worry about spelling or punctuating correctly, about erasing mistakes, about organizing material, or .................. exact words.",
        "choices": [
          {
            "id": 1,
            "title": "finding",
            "order": 1,
            "answer": false
          },
          {
            "id": 2,
            "title": "how to find",
            "order": 2,
            "answer": false
          },
          {
            "id": 3,
            "title": "about finding",
            "order": 3,
            "answer": true
          },
          {
            "id": 4,
            "title": "the finding of",
            "order": 4,
            "answer": false
          }
        ],
        "exams": [
          {
            "sub_category": {
              "id": "60b7875428f350277f04c5e5",
              "title": "زبان انگلیسی",
              "category_id": "60b7858d743940688b23c7f3"
            },
            "exam_id": "60ad57d5446d341648416363",
            "order": 76
          }
        ],
        "level": 1,
        "photos": [],
        "author": [],
        "confirmers": [
          {
            "first_name": "هانیه",
            "last_name": "نوروزی",
            "photo": "https://cdn.alaatv.com/upload/images/profile/default_avatar.jpg?w=100&h=100"
          }
        ],
        "confirmed": false,
        "source_data": {
          "resultText": "Done",
          "totalUsageCount": 415,
          "answerId": "1356276",
          "rowNo": 1477,
          "choice1selectedCounts": 585,
          "correctCounts": 486,
          "choiceId3": "1356276",
          "hasHint": false,
          "discriminationIndex": 0.19,
          "choiceId2": "1356275",
          "choiceId1": "1356274",
          "resultCode": 1,
          "overallQuestionCount": "15149",
          "choiceId4": "1356277",
          "questionTypeId": "10",
          "noAnswerCounts": 648,
          "choiceDescription2": "<div class=\"choice\" dir=\"ltr\">how to find</div>",
          "createdAt": "1598960249083",
          "choiceDescription1": "<div class=\"choice\" dir=\"ltr\">finding</div>",
          "incorrectCounts": 869,
          "choice3selectedCounts": 486,
          "unVerifiedCommentNo": 0,
          "popularity": 12,
          "origins": {
            "questionOriginList": [
              {
                "originId": 20,
                "publishYear": {
                  "id": 21,
                  "name": "1399",
                  "title": "99 - 98"
                },
                "examNo": 99,
                "majorId": 60,
                "pageNo": null,
                "publisherBookId": null,
                "imageExtension": null,
                "publisherBookImage": null,
                "publisherBookName": null,
                "questionOrder": 76,
                "origin": {
                  "id": 20,
                  "name": "سراسری",
                  "pic": "https://www.monta.ir/client_resources/images/img/source-domestic-color.svg"
                }
              }
            ]
          },
          "id": "577414",
          "mediaRequestCount": 3,
          "choiceDescription4": "<div class=\"choice\" dir=\"ltr\">the finding of</div>",
          "choiceDescription3": "<div class=\"choice\" dir=\"ltr\">about finding</div>",
          "answerAuthorInfo": "{\"personInfoList\":[{\"id\":15063,\"imageId\":570126,\"name\":\"سعید ابراهیمی\"}]}",
          "commentNo": 0,
          "question": "<div class=\"question\" dir=\"ltr\">In free writing, you should not worry about spelling or punctuating correctly, about erasing mistakes, about organizing material, or&nbsp;<span class=\"vacancy\">..................</span>&nbsp;exact words.</div>",
          "like": false,
          "entryDate": "1601467432507",
          "mediaHasRequested": false,
          "topics": "{\"idList\":[{\"id\":23499}]}",
          "cnt": "15149",
          "hasNote": false,
          "bookmark": false,
          "choicesColumnNo": 4,
          "numberOfChildren": 0,
          "choice4selectedCounts": 80,
          "answer": "<div class=\"answer\" dir=\"rtl\"><div>در سبک نوشتاری آزاد، شما نباید دربارۀ املا و نقطه‌گذاری درست، دربارۀ پاک کردن اشتباهات، دربارۀ مرتب کردن موضوعات، یا دربارۀ پیدا کردن کلمه‌های دقیق نگران باشید.&nbsp;</div><div>اگر به قبل از جای خالی نگاه کنیم متوجه می شویم که از یک ساختار یکسان استفاده شده است و همۀ عبارت‌ها با حرف اضافه مربوط به فعل worry آمده‌اند، درنتیجه همۀ گزینه‌های دیگر رد می‌شوند و در جای خالی یک ساختار مشابه مانند about spelling و about erasing تکرار می‌شود. پس about finding گزینۀ درست است.</div><div></div></div>",
          "countQuestionTypeId": "15074",
          "disable": false,
          "bookmarkCount": 0,
          "difficultyLevelId": "20",
          "choice2selectedCounts": 204,
          "creatorsLastUsageDate": "1601982253360",
          "topicList": [
            {
              "id": 23499,
              "name": "گرامر",
              "deph": 0,
              "moduleId": 413,
              "parentTopicId": 23490,
              "order": 20,
              "isDisabled": false,
              "parentTopic": {
                "id": 23490,
                "name": "درس اول",
                "deph": 0,
                "moduleId": 413,
                "order": 5,
                "isDisabled": false
              },
              "module": {
                "id": 413,
                "name": "انگلیسی 3",
                "moduleGroupId": 5,
                "isCommon": true,
                "isDisabled": false,
                "hasOnlineContents": true,
                "moduleGroup": {
                  "id": 5,
                  "name": "زبان انگلیسی"
                },
                "majors": [
                  {
                    "id": 60,
                    "name": "رياضي"
                  },
                  {
                    "id": 61,
                    "name": "تجربي"
                  },
                  {
                    "id": 62,
                    "name": "انساني"
                  }
                ],
                "grade": {
                  "id": 12,
                  "name": "دوازدهم",
                  "levelId": 60,
                  "level": {
                    "id": 60,
                    "name": "دبیرستان دوره دوم"
                  }
                }
              }
            }
          ],
          "difficultyLevel": {
            "id": 20,
            "value": 3,
            "name": "متوسط"
          }
        },
        "descriptive_answer": null,
        "statement_photo": null,
        "answer_photos": [],
        "status": {
          "id": "60c6e233fa6da442c2244123",
          "title": "draft",
          "display_title": "پیش نویس",
          "updated_at": "2021-06-14 09:29:31",
          "created_at": "2021-06-14 09:29:31"
        },
        "updated_at": "2021-05-26 12:26:48",
        "created_at": "2020-09-01 16:07:29"
      },
      imgSrc:'',
      urlPathName:'',
      edit_status:true,
      questionColsNumber: 12,
      uploadImgColsNumber: 0,
      displayEditQuestion: false,
      question: new Question()
    }
  },
  created() {
    this.getUrl()
    this.checkUrl()
    this.question = new Question(this.fakeData)
    console.log(this.question)
  },
  methods: {
    getUrl (){
      this.urlPathName=this.$route.name
    },
    checkUrl(){
      if (this.urlPathName == 'question.create' || this.urlPathName == 'question.edit'){
        this.edit_status = true
      }else {
        this.edit_status = false
      }
      console.log('url path name :'+this.edit_status)
    },
   openShowImgPanel(src) {
     if(this.edit_status){
       this.imgSrc=src;
       this.displayEditQuestion = true
       this.questionColsNumber = 7;
       this.uploadImgColsNumber = 5;
       this.$store.commit('AppLayout/updateDrawer', false)
     }
    },
    closeShowImgPanel() {
      if(this.edit_status){
        this.displayEditQuestion = false
        this.$store.commit('AppLayout/updateDrawer', true)
        this.questionColsNumber = 12;
        this.uploadImgColsNumber = 0;
      }
    }
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius: 10px;
}
</style>
