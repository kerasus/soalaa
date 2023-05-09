<template>
  <div class="editQ-text-container">
    <q-linear-progress
      v-if="loadingState"
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
        :class="{ 'row reverse': (isPanelOpened && !imgFloatMode) }"
      >
        <div
          v-if="isPanelOpened"
          class="image-panel"
          :class="{ 'col-5 image-panel-side-mode': !imgFloatMode , 'image-panel-float-mode' : imgFloatMode }"
        >
          <image-panel
            :editable="true"
            :mode="'edit'"
            @closePanelBtnClicked="openCloseImgPanel"
            @deleteImage="deleteImage"
            @uploadStatement="updateStatementPhoto(question)"
            @uploadAnswer="updateAnswerPhoto(question)"
            @imgPanelModeChanged="changeImagePAnelMode"
          />
        </div>
        <component
          :is="getComponent"
          v-if="question.type"
          v-bind="allProps"
          ref="currentEditComponent"
          :key="editComponentKey"
          :class="{ 'col-7': !imgFloatMode}"
        />
      </div>
    </div>
    <div class="relative-position">
      <div class="attach-btn row">
        <question-identifier
          ref="questionIdentifier"
          class="col-12"
          editable
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
          @gradeSelected="getLessonsList"
          @groupSelected="getLessonsList"
          @attach="attachExam"
          @detach="detachExam"
          @tags-collected="setTags"
        />
      </div>
      <question-video-answer :contentId="question.content_id"
                             :timePointId="question.time_point_id"
                             @update-value="updateQuestionContent($event)" />
      <btn-box
        class="col-12"
        editeQuestion
        @saveQuestion="saveQuestion"
        @deletefromDb="deleteQuestion"
      />
      <status-change
        :statuses="questionStatuses"
        @update="changeStatus"
      />
    </div>
    <div v-if="question.logs && question.logs.list && question.logs.list.length > 0">
      <log-list-component :logs="question.logs"
                          :loading="loadingState"
                          :mode="'edit'"
                          @addComment="addComment"
                          @restoreQuestion="restoreQuestion"
      />
    </div>
    <div class="q-mt-md">
      <entity-index ref="reportIndex"
                    v-model:value="logIndexInputs"
                    title="لیست خطا های گزارش شده"
                    :api="logIndexApi"
                    :table="logIndexTable"
                    :table-keys="logIndexTableKeys"
                    :create-route-name="false"
                    :show-search-button="false"
      >
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'status'">
            <template v-if="!questionReportStatusesLoading">
              <q-select v-model="inputData.col.value.title"
                        borderless
                        option-value="title"
                        option-label="description"
                        :map-options="true"
                        :options="questionReportStatuses"
                        @update:model-value="onChangeReportStatus($event, inputData.props.row)"
              />
            </template>
            <div v-else>
              ...
            </div>
          </template>
        </template>
      </entity-index>
    </div>
  </div>
</template>

<script>
import BtnBox from 'components/Question/QuestionPage/BtnBox.vue'
import LogListComponent from 'components/QuestionBank/EditQuestion/Log/LogList.vue'
// detachUnsavedExam
/* eslint-disable no-var */
import { computed, defineAsyncComponent } from 'vue'
import { Question } from 'src/models/Question.js'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar.vue'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion.js'
import { QuestionType, TypeList } from 'src/models/QuestionType.js'
import AttachExam from 'components/Question/QuestionPage/AttachExam/AttachExam.vue'
import StatusChange from 'components/Question/QuestionPage/StatusChange.vue'
import { ExamList } from 'src/models/Exam.js'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory.js'
import { QuestionStatusList } from 'src/models/QuestionStatus.js'
import { QuestCategoryList } from 'src/models/QuestCategory.js'
import ImagePanel from 'components/Question/QuestionPage/ImagePanel.vue'
import QuestionIdentifier from 'components/Question/QuestionPage/QuestionIdentifier.vue'
import mixinTree from 'src/mixin/Tree.js'
import moment from 'moment-jalaali'
import QuestionVideoAnswer from 'components/Question/QuestionPage/QuestionVideoAnswer.vue'
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
export default {
  name: 'EditQuestion',
  components: {
    QuestionField,
    QuestionIdentifier,
    ImagePanel,
    Navbar,
    DescriptiveEditQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/DescriptiveQuestion/DescriptiveEditQuestion')),
    MultipleChoiceEditQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/MultipleChoiceQuestion/MultipleChoiceEditQuestion')),
    MBTIEditQuestion: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/MBTIQuestion/MBTIEditQuestion')),
    GroupQuestionEdit: defineAsyncComponent(() => import('components/Question/QuestionPage/Edit/questionTypes/GroupQuestion/GroupQuestionEdit')),
    BtnBox,
    EntityIndex,
    StatusChange,
    AttachExam,
    LogListComponent,
    QuestionVideoAnswer
  },
  mixins: [
    AdminActionOnQuestion,
    mixinTree
  ],
  props: {},
  data () {
    return {
      logIndexInputs: [
        { type: 'hidden', name: 'question_id', col: 'col-md-12', value: null }
      ],
      questionReportStatuses: [],
      questionReportStatusesLoading: true,
      logIndexTable: {
        columns: [
          {
            name: 'type',
            label: 'نوع خطا',
            align: 'left',
            field: row => row.type.value
          },
          {
            name: 'body',
            label: 'متن خطا',
            align: 'left',
            field: row => row.body
          },
          {
            name: 'created_at',
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => moment(row.created_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          },
          {
            name: 'status',
            label: 'وضعیت',
            align: 'left',
            field: row => row.status
          }
        ]
      },
      logIndexTableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      logIndexApi: null,
      questionType: new QuestionType(),
      componentTabs: new TypeList(),
      question: new Question(),
      allProps: {},
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      questionStatuses: new QuestionStatusList(),
      categoryList: new QuestCategoryList(),
      isPanelOpened: false,
      imgFloatMode: false,
      editComponentKey: 0
    }
  },
  created () {
    this.logIndexApi = API_ADDRESS.question.reportLog(this.$route.params.question_id)
    this.getQuestionReportStatuses()
    this.enableLoading()
    this.getQuestionTypeForTypeId(this.question)
    this.loadExamList()
    this.loadSubcategories()
    this.loadCategories()
    this.getQuestionStatus()
    this.getGradesList()
    this.loadQuestionAuthors()
    this.loadQuestionTargets()
    this.loadAuthorshipDates()
    this.loadMajorList()
    this.setlogIndexInputsValues()
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  mounted () {},
  methods: {
    updateQuestionReportStatus (reportId, newStatus) {
      this.questionReportStatusesLoading = true
      this.$axios.put(this.logIndexApi, {
        id: reportId,
        status: newStatus
      })
        .then(() => {
          this.questionReportStatusesLoading = false
          this.$refs.reportIndex.reload()
        })
        .catch(() => {
          this.questionReportStatusesLoading = false
          this.$refs.reportIndex.reload()
        })
    },
    onChangeReportStatus (event, reportItem) {
      this.updateQuestionReportStatus(reportItem.id, event.title)
    },
    getQuestionReportStatuses() {
      this.questionReportStatusesLoading = true
      this.$axios.get(API_ADDRESS.question.reportStatuses)
        .then(response => {
          this.questionReportStatusesLoading = false
          this.questionReportStatuses = response.data.data
        })
        .catch(() => {
          this.questionReportStatusesLoading = false
        })
    },
    setlogIndexInputsValues () {
      const questionIdIndex = this.logIndexInputs.findIndex(item => item.name === 'question_id')
      if (questionIdIndex !== -1) {
        this.logIndexInputs[questionIdIndex].value = this.question.id
      }
    },
    changeImagePAnelMode () {
      this.imgFloatMode = !this.imgFloatMode
    },
    deleteImage (image) {
      this.$axios.delete(API_ADDRESS.question.photo(image.type, this.question.id), {
        data: {
          url: image.src
        }
      }).then(response => {
        this.question = new Question(response.data.data)
        this.question.type_id = response.data.data.type?.id
      })
    },
    chosenComponent () {
      const cName = this.question.type.componentName
      if (cName === 'MultipleChoiceQ') {
        return 'multiple-choice-edit-question'
      }
      if (cName === 'DescriptiveQ') {
        return 'descriptive-edit-question'
      }
      if (cName === 'MBTIQ') {
        return 'm-b-t-i-edit-question'
      }
      if (cName === 'GroupQuestion') {
        return 'group-question-edit'
      }
    },
    setQuestionContents () {
      this.allProps.setContentToQuestion = true
    },
    saveQuestion () {
      this.setQuestionIdentifierData()
      this.$refs.currentEditComponent.saveQuestion()
    },
    enableLoading () {
      this.question.loading = true
    },
    disableLoading () {
      this.question.loading = false
    },
    restoreQuestion(eventData) {
      if (eventData.statement) {
        this.question.statement = eventData.statement
      }
      if (eventData.descriptive_answer) {
        this.question.descriptive_answer = eventData.descriptive_answer
      }
      this.editComponentKey++
      this.$q.notify({
        type: 'positive',
        message: 'سوال به تغییرات انتخاب شده بازگردانی شد',
        position: 'top'
      })
      // eslint-disable-next-line
      console.warn('question statement', this.question.statement)
      // eslint-disable-next-line
      console.warn('question descriptive_answer', this.question.descriptive_answer)
    },
    deleteQuestion () {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'از حذف کامل سوال از پایگاه داد و حذف از تمامی آزمون ها اطمینان دارید؟',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: async (confirm) => {
          if (!confirm) {
            this.closeConfirmModal()
            return
          }
          try {
            this.closeConfirmModal()
            await this.deleteQuestionReq(this.question.id)
            this.$q.notify({
              message: 'سوال از پایگاه داده حذف شد.',
              type: 'positive'
            })
            this.$router.go(-1)
          } catch (e) {
            this.closeConfirmModal()
          }
        }
      })
    },
    deleteQuestionReq (questionId) {
      return this.$axios.delete(API_ADDRESS.question.delete(questionId))
    },
    closeConfirmModal () {
      this.$store.commit('AppLayout/showConfirmDialog', {
        show: false
      })
    },
    updateQuestionContent(data) {
      this.question.content_id = data.content_id
      this.question.time_point_id = data.time_point_id
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
.image-panel-side-mode {
  position: static;
  padding-left: 24px;
}
.image-panel-float-mode {
  position: sticky;
  top: 0;
  z-index: 9999;
}
.image-panel {
  padding-top: 30px;
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
