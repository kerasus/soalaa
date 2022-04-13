<template>
  <div class="showQ-text-container">
    <q-linear-progress
      v-if="loadingState"
      size="md"
      indeterminate
      rounded
      color="primary"
    />
    <navbar
      :mode="'show'"
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
        />
        <div
          v-if="isPanelOpened"
          class="col-5"
          style="padding-right: 24px;padding-top: 30px;"
        >
          <image-panel
            :mode="'show'"
            @closePanelBtnClicked="openCloseImgPanel"
          />
        </div>
      </div>
    </div>
    <div class="relative-position">
<!--      <question-details class="col-9"/>-->
      <attach-exam
        :exams="examList"
        :lessons="subCategoriesList"
        :categories="categoryList"
        @attach="attachExam"
        @detach="detachExam"
      />
      <div
        v-if="question.logs && question.logs.list && question.logs.list.length > 0"
      >
        <log-list-component
          :logs="question.logs"
          @addComment="addComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-var */
import { computed, defineAsyncComponent } from 'vue'
import { Question } from 'src/models/Question'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
// import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam/AttachExam'
import CommentBox from 'components/Question/QuestionPage/StatusChange'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import ImagePanel from 'components/Question/QuestionPage/ImageSidePanel'
import LogListComponent from 'components/QuestionBank/EditQuestion/Log/LogList'
import { QuestCategoryList } from 'src/models/QuestCategory'
import FloatingImagePanel from 'components/Question/FloatingImagePanel'
// import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'ShowQuestion',
  components: {
    FloatingImagePanel,
    ImagePanel,
    Navbar,
    DescriptiveShowQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/DescriptiveQuestion/DescriptiveShowQuestion')),
    MultipleChoiceShowQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/MultipleChoiceQuestion/MultipleChoiceShowQuestion')),
    MBTIShowQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/MBTIQuestion/MBTIShowQuestion')),
    BtnBox,
    CommentBox,
    AttachExam,
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
      categoryList: new QuestCategoryList(),
      isPanelOpened: false,
      allTypes: new TypeList(),
      totalLoading: false
    }
  },
  created () {
    this.enableLoading()
    // this.getPageReady()
    this.getQuestionTypeForTypeId(this.question)
    // this.setAllQuestionLoadings()
    this.loadSubcategories()
    this.loadCategories()
    // this.getQuestionById(this.getCurrentQuestionId())
    this.loadExamList()
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.disableLoading()
    })
  },
  methods: {
    chosenComponent () {
      const cName = this.question.type.componentName
      if (cName === 'MultipleChoiceQ') {
        return 'multiple-choice-show-question'
      }
      if (cName === 'DescriptiveQ') {
        return 'descriptive-show-question'
      }
      if (cName === 'MBTIQ') {
        return 'm-b-t-i-show-question'
      }
    },
    setQuestionContents () {
      this.allProps.setContentToQuestion = true
    },
    enableLoading () {
      this.question.loading = true
    },
    disableLoading () {
      this.question.loading = false
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
.showQ-text-container {
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
