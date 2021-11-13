<template>
<div class="question-card">
  <q-card>
    <q-card-section>
      <q-card
        v-if="false"
        class="title-card"
      >
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-10">
          <q-list
            dense
            padding
            class="rounded-borders"
          >
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <div
                  class="renderedText"
                  v-html="'<span>1)</span>'"
                />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <div
                  class="renderedText"
                  v-html="'<span>2)</span>'"
                />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <div
                  class="renderedText"
                  v-html="'<span>3)</span>'"
                />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <div
                  class="renderedText"
                  v-html="'<span>4)</span>'"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-2">
          <q-list
            dense
            padding
            class="rounded-borders"
          >
            <q-item
              clickable
              v-ripple
            >
              <q-item-section side>
               <div  class="question-avatar">
                 <q-avatar>
                   <img src="https://cdn.quasar.dev/img/avatar.png">
                 </q-avatar>
                 <span>
                  فلان فلانیان
                </span>
               </div>
                <q-item-label
                  caption
                >
                  Caption
                </q-item-label>
                <q-item-label caption>
                  شماره:
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <q-rating
                    v-model="ratingValue"
                    size="25px"
                    color="green"
                    icon="star_border"
                    icon-selected="star"
                    readonly
                  >
                  <q-badge label="آسان"/>
                </q-rating>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
            >
              <q-item-section>
                <q-btn>
                  مشاهده
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-expansion-item
        expand-separator
        label="پاسخ"
      >
        <q-card>
          <q-card-section>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    questionData: {
      type: Object
    }
  },
  data () {
    return {
      ratingValue: 3
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.question-card{
  padding: 8px;
  .question-avatar{
    display: flex;
    flex-direction: row;
  }
}
</style>
// {
//   "resultText"
//   "correctCounts"
//   "choiceId3"
//   "discriminationIndex
//   "choiceId2"
//   "choiceId1"
//   "overallQuestionCount"
//   "choiceId4"
//   "choiceDescription2"
//   "createdAt"
//   "choiceDescription1"
//   "choice3selectedCounts"
//   "id": "608429",
//   "choiceDescription4"
//   "choiceDescription3"
//   "like"
//   "entryDate"
//   "authorInfo"
//   "hasNote"
//   "bookmark"
//   "choicesColumnNo"
//   "numberOfChildren"
//   "countQuestionTypeId"
//   "difficultyLevelId"
//   "choice2selectedCounts"
//   "totalUsageCount"
//   "answerId"
//   "rowNo"
//   "choice1selectedCounts"
//   "hasHint"
//   "resultCode"
//   "questionTypeId"
//   "noAnswerCounts"
//   "incorrectCounts"
//   "unVerifiedCommentNo"
//   "popularity"
//   "origins": {
  //   "questionOriginList": [
//        {
//          "originId"
//          "examNo"
//          "majorId"
//          "pageNo"
//          "publisherBookId"
//          "imageExtension"
//          "publisherBookImage"
//          "publisherBookName"
//          "questionOrder"
//          "origin": {
//            "id"
//            "name"
//            "pic"
//       }
//     }
//   ]
// },
//    "mediaRequestCount"
//    "answerAuthorInfo"
//    "commentNo"
//    "question"
//    "mediaHasRequested"
//    "topics"
//   "cnt"
//   "authorId"
//   "choice4selectedCounts"
//   "answer"
//   "disable"
//   "bookmarkCount"
//   "topicList": [
//   {
//     "id"
//     "name"
//     "deph"
//     "moduleId"
//     "parentTopicId"
//     "order"
//     "isDisabled"
//     "parentTopic"
//       "id"
//       "name"
//       "deph"
//       "moduleId"
//       "order"
//       "isDisabled"
//     },
//     "module": {
//       "id"
//       "name"
//       "moduleGroupId"
//       "isCommon"
//       "isDisabled"
//       "hasOnlineContents"
//       "moduleGroup": {
//         "id"
//         "name"
//       },
//       "majors": [
//         {
//           "id"
//           "name"
//         },
//         {
//           "id"
//           "name"
//         }
//       ],
//       "grade": {
//         "id"
//         "name"
//         "levelId"
//         "level"
//           "id"
//           "name"
//         }
//       }
//     }
//   }
// ],
//   "difficultyLevel": {
//   "id"
//     "value"
//     "name"
// }
// }
