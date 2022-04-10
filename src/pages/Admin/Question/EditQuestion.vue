<template>
  <div class="editQ-text-container">
    <q-linear-progress
      v-if="this.question.loading"
      size="md"
      indeterminate
      rounded
      color="primary"
    />
    <navbar
      :mode="'edit'"
      @panelClicked="openCloseImgPanel"
    />
    <div class="relative-position">
      <div
        :class="{ 'row': isPanelOpened }"
      >
        <component
          v-if="question.type"
          :is="getComponent"
          v-bind="allProps"
          :class="{ 'col-7': isPanelOpened }"
          ref="currentEditComponent"
        />
        <div
          v-if="isPanelOpened"
          class="col-5"
          style="padding-right: 24px;padding-top: 30px;"
        >
          <image-panel
            :mode="'edit'"
            @closePanelBtnClicked="openCloseImgPanel"
          />
        </div>
      </div>
    </div>
    <div class="relative-position">
      <attach-exam
        :exams="examList"
        :lessons="subCategoriesList"
        @attach="attachExam"
        @detach="detachExam"
      />
      <div class="attach-btn row">
        <question-details class="col-9"/>
        <btn-box
          class="col-3"
          @saveQuestion="saveQuestion"
        />
      </div>
      <status-change
        :statuses="questionStatuses"
        @update="changeStatus"
      />
      <q-inner-loading
        :showing="question.exams.loading"
        color="primary"
        class="QComponents-inner-loading"
        label-style="font-size: 1.1em"
      />
    </div>
    <div
      v-if="question.logs && question.logs.list && question.logs.list.length > 0"
    >
      <log-list-component
        :logs="question.logs"
        @addComment="addComment"
      />
    </div>
  </div>
</template>

<script>
// detachUnsavedExam
/* eslint-disable no-var */
import { computed, defineAsyncComponent } from 'vue'
import { Question } from 'src/models/Question'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam'
import StatusChange from 'components/Question/QuestionPage/StatusChange'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import ImagePanel from 'components/Question/QuestionPage/ImagePanel'
import LogListComponent from 'components/QuestionBank/EditQuestion/Log/LogList'
export default {
  name: 'EditQuestion',
  components: {
    ImagePanel,
    Navbar,
    DescriptiveQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/DescriptiveQ/DescriptiveQ')),
    MultipleChoiceQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/MultipleChoiceQ/MultipleChoiceQ')),
    MBTIQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/MBTIQ/MBTIQ')),
    BtnBox,
    StatusChange,
    AttachExam,
    QuestionDetails,
    LogListComponent
  },
  mixins: [
    AdminActionOnQuestion
  ],
  props: {},
  data () {
    return {
      questionType: new QuestionType(),
      componentTabs: new TypeList(),
      question: new Question(),
      allProps: {},
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      questionStatuses: new QuestionStatusList(),
      isPanelOpened: false,
      allTypes: new TypeList()
    }
  },
  created () {
    this.enableLoading()
    // this.getPageReady()
    this.getQuestionTypeForTypeId(this.question)
    this.loadExamList()
    this.loadSubcategories()
    this.getQuestionStatus()
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.disableLoading()
    })
  },
  methods: {
    chosenComponent () {
      const cName = this.question.type.componentName
      if (cName === 'MultipleChoiceQ') {
        return 'multiple-choice-q'
      }
      if (cName === 'DescriptiveQ') {
        return 'descriptive-q'
      }
      if (cName === 'MBTIQ') {
        return 'm-b-t-i-q'
      }
    },
    setQuestionContents () {
      this.allProps.setContentToQuestion = true
    },
    saveQuestion () {
      this.$refs.currentEditComponent.saveQuestion()
    },
    enableLoading () {
      this.question.loading = true
    },
    disableLoading () {
      this.question.loading = false
    },
    openCloseImgPanel () {
      this.isPanelOpened = !this.isPanelOpened
    }
  },
  computed: {
    getComponent () {
      // updates even if properties inside are updated
      return this.chosenComponent(this.question.type)
    }
  },
  watch: {
    question: {
      handler (newValue, oldValue) {
        // console.log('question', newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.editQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss">
// USED IN MANY OTHER COMPONENTS
.default-questions-card {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
  border-radius: 30px;
  .q-card__section {
    padding: 15px 20px !important;
  }
  .default-Qcard-title {
    font-size: 14px;
    line-height: 24px;
  }
  .default-Qcard-box {
    align-items: last baseline;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    .default-Qcard-img {
      text-align: left #{"/* rtl:ignore */"};
      .q-img {
        border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
        padding: 0 !important;
        .q-img__image {
          padding: 0 !important;
        }
      }
    }
  }
}
.multiple-choice-Answer {
  .answer-box {
    .q-radio__inner {
      margin-left: 7px #{"/* rtl:ignore */"} !important;
    }
  }
  .default-Qcard-title{
    justify-content: space-between;
    display: flex;
    .q-btn {
      padding: 4px 16px !important;
    }
  }
}
</style>
