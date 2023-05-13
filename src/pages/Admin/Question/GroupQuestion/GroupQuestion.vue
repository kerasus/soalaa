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

export default {
  name: 'MultipleChoiceQ',
  components: {
    QuestionIdentifier,
    QuestionField,
    BtnBox
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
      currentQuestionIdToAdd: '',
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
      that.domKey++
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
        subject_tags: this.question.subject_tags.list.map(item => item.id),
        majors: this.question.majors,
        group: [],
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
