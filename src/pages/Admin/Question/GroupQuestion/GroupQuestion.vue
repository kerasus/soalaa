<template>
  <q-card class="create-question-main-card custom-card">
    <q-card-section class="main-card-section question">
      <div class="card-section-header">
        <span>صورت سوال</span>
      </div>
      <div class="question-box">
        <QuestionField
          ref="tiptapQuestionStatement"
          :key="'statement' + domKey"
        />
      </div>
    </q-card-section>
    <q-card-section class="row main-card-section">
      <div class="col-12">
        <entity-index
          v-model:value="tableInputs"
          v-model:table-selected-values="selectedQuestions"
          title="لیست سوالات"
          :api="questionIndexApi"
          :table="questionTable"
          table-selection-mode="multiple"
          :table-keys="questionTableKeys"
          :item-indicator-key="'code'"
        >
          <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
            <template v-if="inputData.col.name === 'tags'">
              <q-chip
                v-for="item in inputData.props.row.tags"
                :key="item"
              >
                {{ item.title }}
              </q-chip>
            </template>
            <template v-if="inputData.col.name === 'actions'">
              <q-btn round
                     flat
                     dense
                     size="md"
                     color="info"
                     icon="info"
                     :to="{name:'Admin.Ticket.Show', params: {id: inputData.props.row.id}}">
                <q-tooltip>
                  مشاهده
                </q-tooltip>
              </q-btn>
              <q-btn round
                     flat
                     dense
                     size="md"
                     color="negative"
                     icon="delete"
                     class="q-ml-md"
                     @click="showConfirmRemoveDialog(inputData.props.row, 'id', 'آیا از حذف تیکت اطمینان دارید ؟')">
                <q-tooltip>
                  حذف
                </q-tooltip>
              </q-btn>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>
      </div>
    </q-card-section>
    <q-card-section class="main-card-section long-answer">
      <div class="card-section-header">پاسخ تشریحی</div>
      <div class="answer-box">
        <QuestionField
          ref="tiptapDescriptiveAnswer"
          :key="'descriptive_answer' + domKey"
        />
      </div>
    </q-card-section>
  </q-card>
  <div class="relative-position">
    <div class="attach-btn row">
      <question-identifier
        ref="questionIdentifier"
        editable
        class="col-12"
        :exams="examList"
        :lessons="subCategoriesList"
        :categories="categoryList"
        :gradesList="gradesList"
        :groups-list="lessonGroupList"
        :lessons-list="lessonsList"
        :major-list="majorList"
        :authorship-dates-list="authorshipDatesList"
        :question-authors-list="questionAuthorsList"
        :question-target-list="questionTargetList"
        buffer
        @gradeSelected="getLessonsList"
        @groupSelected="getLessonsList"
        @attach="attachExam"
        @detach="detachExam"
        @tags-collected="setTagsOnCreate"
      />
    </div>
    <btn-box
      class="col-12"
      @saveQuestion="saveQuestion"
    />
  </div>
</template>

<script>
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { computed } from 'vue'
import { QuestCategoryList } from 'src/models/QuestCategory'
import QuestionIdentifier from 'components/Question/QuestionPage/QuestionIdentifier'
import mixinTree from 'src/mixin/Tree'
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

// import moment from 'moment-jalaali'
export default {
  name: 'MultipleChoiceQ',
  components: {
    QuestionIdentifier,
    QuestionField,
    BtnBox,
    EntityIndex
  },
  mixins: [
    AdminActionOnQuestion,
    mixinTree
  ],
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      domKey: Date.now(),
      choice: '',
      defaultRefName: 'tiptap',
      dynamicMassage: '',
      question: new Question(),
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      categoryList: new QuestCategoryList(),
      allProps: {
        loading: false
      },
      selectedQuestions: [],
      questionIndexApi: API_ADDRESS.question.index({}, undefined, true),
      tableInputs: [
        { type: 'hidden', name: 'question_id', col: 'col-md-12', value: null }
      ],
      questionTable: {
        columns: [
          {
            name: 'id',
            label: 'شناسه سوال',
            align: 'center',
            field: row => row.id
          },
          {
            name: 'code',
            label: 'شماره سوال',
            align: 'left',
            field: row => row.code
          },
          {
            name: 'tags',
            label: 'شماره سوال',
            align: 'left'
            // field: row => row.tags.map(item => item.title)
          }
        ]
      },
      questionTableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      }
    }
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = 'Date.now()'
    }, 100)
    this.getPageReady()
    this.getGradesList()
    this.loadQuestionAuthors()
    this.loadQuestionTargets()
    this.loadAuthorshipDates()
    this.loadMajorList()
  },
  methods: {
    saveQuestion () {
      this.getContent()
      const exams = []
      this.question.exams.list.forEach(item => {
        exams.push({
          id: item.exam_id,
          exam_id: item.exam_id,
          sub_category_id: item.sub_category_id,
          order: item.order
        })
      })
      this.$refs.questionIdentifier.getIdentifierData(false)
      this.question.author.push({ full_name: this.$store.getters['Auth/user'].full_name, id: this.$store.getters['Auth/user'].id })
      const question = {
        author: this.question.author,
        exams,
        descriptive_answer: this.question.descriptive_answer,
        statement: this.question.statement,
        level: (this.question.level) ? this.question.level : 1,
        reference: this.question.reference,
        years: this.question.years,
        tags: this.question.tags.list.map(item => item.id),
        // subject_tags: this.question.subject_tags.list.map(item => item.id),
        subject_tags: ['644ffb2e39cc8bdaec08def2'],
        majors: this.question.majors,
        group: this.selectedQuestions.map(item => item.id),
        sub_category_id: 1,
        recommended_time: 0,
        type_id: this.question.type_id
      }
      this.createQuestion(question)
    },
    getContent () {
      this.question.statement = this.getContentOfQuestionParts('QuestionStatement')
      this.question.descriptive_answer = this.getContentOfQuestionParts('DescriptiveAnswer')
    },
    getContentOfQuestionParts (name) {
      return this.$refs[this.defaultRefName + name].getContent()
    }
  }
}
</script>

<style scoped lang="scss">
.create-question-main-card {
  margin-top: 43px;
  margin-bottom: 40px;
  .main-card-section {
    .card-section-header {
      display: flex;
      font-size: 16px;
      color: black;
      margin: 8px 18px 0;
      @media screen and (max-width: 1024px) {
        margin: 8px 0;
      }

    }
    .question-box , .answer-box, .multiple-answer-box {
      margin: 16px 8px;
      @media screen and (max-width: 1024px) {
        margin: 16px 0;
      }
    }
  }
}
</style>
<style lang="scss">
[dir="rtl"] .filepond--root {
  text-align: left #{"/* rtl:ignore */"} !important ;
  direction: ltr #{"/* rtl:ignore */"} !important;
}
.filepond--file-info {
  transform: none !important;
  margin-left: 2.5em #{"/* rtl:ignore */"} !important;
  margin-right: 0.5em #{"/* rtl:ignore */"} !important;
}
</style>

<!--<style scoped lang="scss">-->
<!--.create-question-main-card {-->
<!--  margin-top: 43px;-->
<!--  margin-bottom: 40px;-->
<!--  .main-card-section {-->
<!--    .card-section-header{-->
<!--      font-size: 16px;-->
<!--      color: black;-->
<!--      margin: 8px 18px 0;-->
<!--      @media screen and (max-width: 1024px) {-->
<!--        margin: 8px 0;-->
<!--      }-->

<!--    }-->
<!--    .question-box{-->
<!--      background-color: var(&#45;&#45;3a-Neutral2);-->
<!--      margin: 16px 8px;-->
<!--      border: 1px solid var(&#45;&#45;3a-Neutral1);-->
<!--      border-radius: 16px;-->
<!--      @media screen and (max-width: 1024px) {-->
<!--        margin: 16px 0;-->
<!--      }-->
<!--      .tiptap-header{-->
<!--        border-radius: 16px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.custom-card{-->
<!--  padding-bottom: 100px;-->
<!--}-->
<!--.multiple-choice-Q {-->
<!--  padding-top: 35px;-->
<!--  font-style: normal;-->
<!--  font-weight: 500;-->
<!--  font-size: 16px;-->
<!--  line-height: 28px;-->
<!--  color: #23263B;-->
<!--  text-align: right #{"/* rtl:ignore */"};-->
<!--  .removeAllChoice-btn {-->
<!--    color: #FFFFFF;-->
<!--    background: #9690E4;-->
<!--    border-radius: 10px;-->
<!--  }-->
<!--  .multiple-choice-A {-->
<!--    padding-top: 12px;-->
<!--    padding-bottom: 12px;-->
<!--  }-->
<!--  .question-card {-->
<!--    .question {-->
<!--      font-size: 14px;-->
<!--      line-height: 24px;-->
<!--      padding: 15px 20px;-->
<!--    }-->
<!--    .question-box {-->
<!--      align-items: last baseline;-->
<!--      font-weight: normal;-->
<!--      font-size: 14px;-->
<!--      line-height: 24px;-->
<!--      .question-img {-->
<!--        text-align: left #{"/* rtl:ignore */"};-->
<!--        .q-img {-->
<!--          border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};-->
<!--          padding: 0;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.multiple-choice-Answer {-->
<!--  :nth-child(2n){-->
<!--    padding-right: 12px #{"/* rtl:ignore */"};-->
<!--  }-->
<!--  :nth-child(2n+1){-->
<!--    padding-left: 12px #{"/* rtl:ignore */"};-->
<!--  }-->
<!--  .answer-box {-->
<!--    padding-top: 12px;-->
<!--    padding-bottom: 12px;-->
<!--    :nth-child(2n){-->
<!--      padding-right: 0px #{"/* rtl:ignore */"};-->
<!--    }-->
<!--    :nth-child(2n+1){-->
<!--      padding-left: 0px #{"/* rtl:ignore */"};-->
<!--    }-->
<!--    .q-separator&#45;&#45;horizontal-inset {-->
<!--      margin-right: 16px #{"/* rtl:ignore */"} !important ;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--<style lang="scss">-->
<!--// USED IN MANY OTHER COMPONENTS-->
<!--.default-questions-card {-->
<!--  background: #FFFFFF;-->
<!--  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};-->
<!--  border-radius: 30px;-->
<!--  .q-card__section {-->
<!--    padding: 15px 20px !important;-->
<!--  }-->
<!--  .default-Qcard-title {-->
<!--    font-size: 14px;-->
<!--    line-height: 24px;-->
<!--  }-->
<!--  .default-Qcard-box {-->
<!--    align-items: last baseline;-->
<!--    font-weight: normal;-->
<!--    font-size: 14px;-->
<!--    line-height: 24px;-->
<!--    .default-Qcard-img {-->
<!--      text-align: left #{"/* rtl:ignore */"};-->
<!--      .q-img {-->
<!--        border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};-->
<!--        padding: 0 !important;-->
<!--        .q-img__image {-->
<!--          padding: 0 !important;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.multiple-choice-Answer {-->
<!--  .answer-box {-->
<!--    .q-radio__inner {-->
<!--      margin-left: 7px #{"/* rtl:ignore */"} !important;-->
<!--    }-->
<!--  }-->
<!--  .default-Qcard-title{-->
<!--    justify-content: space-between;-->
<!--    display: flex;-->
<!--    .q-btn {-->
<!--      padding: 4px 16px !important;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
