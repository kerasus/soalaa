<template>
  <div class="row main-container">
    <div
      class="col-xs-12"
      :hidden="$q.screen.gt.sm"
    >
      <div class="question-list">
        <div class="question-bank-toolbar">
          <questions-general-info
            v-model:check-box="checkBox"
            :loading="questionLoading"
            :check-box="checkBox"
            :selectedQuestions="providedExam.questions.list"
            @remove="RemoveChoice"
            @nextTab="goToNextStep"
            @lastTab="goToPrevStep"
            @deselectAllQuestions="deleteAllQuestions"
            @selectAllQuestions="selectAllQuestions"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 col-xs-12 question-bank-filter">
      <sticky-both-sides :max-width="1024">
        <question-filter
          ref="filter"
          :show-major-list="false"
          :filterQuestions="filterQuestions"
          :root-node-id-to-load="rootNodeIdInFilter"
          :node-ids-to-tick="selectedNodesIds"
          :initial-load-mode="false"
          @tagsChanged="setSelectedTags"
          @onFilter="onFilter"
          @delete-filter="deleteFilterItem"
        />
      </sticky-both-sides>
    </div>

    <div
      class="col-md-9 col-xs-12"
    >
      <div class="question-list">
        <div
          class="question-bank-toolbar"
          :hidden="$q.screen.lt.md"
        >
          <questions-general-info
            v-model:check-box="checkBox"
            :loading="questionLoading"
            :check-box="checkBox"
            :selectedQuestions="providedExam.questions.list"
            @remove="RemoveChoice"
            @nextTab="goToNextStep"
            @lastTab="goToPrevStep"
            @deselectAllQuestions="deleteAllQuestions"
            @selectAllQuestions="selectAllQuestions"
          />
        </div>
        <div class="col-12 filter-card-container">
          <q-card
            class="filter-card"
            flat
          >
            <q-card-section class="search-section">
              <q-input
                v-model="searchInput"
                filled
                class="bg-white search-input"
                placeholder="جستجو در سوالات..."
              >
                <template v-slot:append>
                  <q-btn
                    flat
                    rounded
                    icon="isax:search-normal-1"
                    class="search"
                    @click="filterByStatement"
                  />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section class="filter-section">
              <q-select
                v-model="searchSelector"
                filled
                dropdown-icon="isax:arrow-down-1"
                option-value="value"
                option-label="title"
                :options="searchInputOptions"
                class="backGround-gray-input filter-input"
                @update:model-value="sortByCreatedAt"
              >
              </q-select>
            </q-card-section>
          </q-card>
        </div>
        <div class="question-bank-content">
          <question-item
            v-if="questions.loading"
            :question="loadingQuestion"
          />
          <template v-else>
            <question-item
              v-for="question in questions.list"
              :key="question.id"
              :question="question"
              :selected="isQuestionSelected(question.id)"
              :report-options="reportTypeList"
              pageStrategy="question-bank"
              @checkSelect="onClickedCheckQuestionBtn"
            />
          </template>
        </div>

        <div class="pagination">
          <pagination
            :meta="paginationMeta"
            :disable="disablePagination"
            @updateCurrentPage="updatePage"
          />
        </div>
      </div>
    </div>

  </div>
  <question-tree-modal
    ref="questionTreeModal"
    v-model:dialogValue="treeModalValue"
    v-model:subjectsField="allSubjects"
    :lessons-list="treeModalLessonsList"
    :persistent="!doesExamHaveLesson"
    single-list-choice-mode
    :initial-lesson="initialLesson"
    @lessonSelected="onLessonChanged"
  >
    <template v-slot:tree-dialog-action-box>
      <q-btn
        unelevated
        label="بازگشت"
        class="go-back-tree-tab"
        @click="goToPrevStep"
      />
      <q-btn
        v-close-popup
        unelevated
        class="close-tree-tab"
        label="تایید"
      />
    </template>
  </question-tree-modal>
</template>

<script>
import pagination from 'components/Question/QuestionBank/Pagination'
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/CommonComponents/Exam/Create/QuestionTemplate/QuestionItem.vue'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionsGeneralInfo from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionsGeneralInfo'
import QuestionTreeModal from 'components/Question/QuestionPage/QuestionTreeModal'
import mixinTree from 'src/mixin/Tree'
import { TreeNode } from 'src/models/TreeNode'
import StickyBothSides from 'components/Utils/StickyBothSides'

export default {
  name: 'QuestionSelectionTab',
  components: { StickyBothSides, QuestionTreeModal, QuestionsGeneralInfo, QuestionFilter, QuestionItem, pagination },
  mixins: [
    mixinTree
  ],
  emits: [
    'onFilter',
    'lastTab',
    'nextTab',
    'addQuestionToExam',
    'deleteQuestionFromExam',
    'update:exam'
  ],
  props: {
    questionLoading: {
      type: Boolean,
      default: false
    },
    lesson: {
      type: String,
      default() {
        return ''
      }
    },
    exam: {
      type: Exam,
      default() {
        return new Exam()
      }
    }
  },

  data() {
    return {
      searchInput: '',
      searchSelector: {
        title: 'جدید ترین',
        value: 'ASC'
      },
      searchInputOptions: [
        {
          title: 'جدید ترین',
          value: 'ASC'
        },
        {
          title: 'قدیمی ترین',
          value: 'DESC'
        }
      ],
      selectedTags: [],
      initialLesson: new TreeNode(),
      treeModalValue: false,
      allSubjects: {},
      treeModalLessonsList: [],
      rootNodeIdInFilter: '',
      groupsList: [],
      allSubjectsFlat: [],
      lastSelectedNodes: [],
      examGradeSetValue: '',
      selectedNodesIds: [],
      lessonsTitles: [],
      filterData: null,
      checkBox: false,
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: [],
        levels: [
          {
            value: 1,
            label: 'آسان'
          },
          {
            value: 2,
            label: 'متوسط'
          },
          {
            value: 3,
            label: 'سخت'
          }
        ]
      },
      selectedQuestions: [],
      questionId: [],
      loadingQuestion: new Question(),
      questions: new QuestionList(),
      disablePagination: false,
      paginationMeta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: '',
        per_page: 0,
        to: 0,
        total: 0
      },
      reportTypeList: []
    }
  },
  watch: {
    'providedExam.loading': {
      handler(newValue) {
        if (newValue) {
          this.showLoading()
          return
        }
        this.hideLoading()
      }
    },
    allSubjects: {
      handler() {
        this.updateLessonsTitles()
        this.getTheLastSelectedNode()
      },
      deep: true
    },
    treeModalValue(newVal) {
      if (!newVal) {
        this.updateTreeFilter()
      }
    },
    getSelectedQuestionIds: {
      handler(newVal) {
        this.setQuestionsInfoCheckBoxStatus()
      }
    }
  },
  created() {
    // this.getQuestionData()
    this.getFilterOptions()
    this.getReportOptions()
    this.setSelectedQuestionOfCurrentMetaPage()
  },
  mounted() {
    let rootToLoad = {
      id: this.providedExam.temp.grade
    }
    if (this.providedExam.temp.lesson) {
      rootToLoad = {
        id: this.providedExam.temp.lesson
      }
    }
    this.setFilterTreeLesson(rootToLoad)
    this.setupTreeModal()
  },
  computed: {
    providedExam: {
      get() {
        return this.exam
      },
      set(value) {
        this.$emit('update:exam', value)
      }
    },
    isQuestionSelected() {
      return (id) => {
        return !!(this.providedExam.questions.list.find(question => question.id === id))
      }
    },
    doesExamHaveLesson() {
      return !!this.providedExam.temp.lesson
    },
    getSelectedQuestionIds() {
      return this.providedExam.questions.list.map(question => question.id)
    },
    selectedQuestionInCurrentMetaPage: {
      get() {
        return this.selectedQuestions
      },
      set(value) {
        const questionListIds = this.questions.list.map(question => question.id)
        this.selectedQuestions = this.providedExam.questions.list.filter(question => questionListIds.includes(question.id))
      }
    }
  },
  methods: {
    showLoading() {
      this.$q.loading.show()
    },
    hideLoading() {
      this.$q.loading.hide()
    },
    getSelectedOfQuestion(question) {
      return !!(this.providedExam.questions.list.find(item => item.id === question.id))
    },
    setSelectedOfQuestion(value, questionId) {
      const questionIndex = this.providedExam.questions.list.indexOf(question => question.id === questionId)
      this.providedExam.questions.list[questionIndex].selected = value
    },
    updateTreeFilter() {
      const foundedLesson = this.treeModalLessonsList.find(item => item.id === this.providedExam.temp.lesson)
      const tagsToFilter = this.lastSelectedNodes.length > 0 ? this.lastSelectedNodes : [foundedLesson]
      this.selectedNodesIds = this.lastSelectedNodes.map(node => node.id)
      this.$refs.filter.changeFilterData('tags', tagsToFilter)
    },
    setupTreeModal() {
      if (this.providedExam.temp.tags && this.providedExam.temp.tags[0]) {
        this.fillAllSubjectsFromResponse()
      }
      this.toggleTreeModal()
      this.showLoading()
      this.getLessonsList(new TreeNode({
        id: this.providedExam.temp.grade
      }))
        .then(response => {
          this.hideLoading()
          this.treeModalLessonsList = response.data.data.children
          if (this.treeModalLessonsList.length === 0) {
            this.$q.notify({
              message: 'پایه تحصیلی انتخاب شده درس ندارد',
              type: 'negative'
            })
          }
          if (this.providedExam.temp.lesson) {
            this.setInitialLesson(this.providedExam.temp.lesson)
          }
        })
    },
    setInitialLesson(lesson) {
      const foundedLesson = this.treeModalLessonsList.find(item => item.id === lesson)
      if (!foundedLesson.id) {
        return
      }
      this.initialLesson = foundedLesson
    },
    toggleTreeModal() {
      this.treeModalValue = !this.treeModalValue
    },
    getReportOptions() {
      this.$axios.get(API_ADDRESS.exam.user.reportType)
        .then((response) => {
          this.reportTypeList = response.data.data
        })
    },
    goToPrevStep() {
      this.$emit('lastTab')
    },
    goToNextStep() {
      this.$emit('nextTab')
    },
    onFilter(filterData) {
      this.$emit('onFilter', filterData)
      this.filterData = this.getFiltersForRequest(filterData)
      this.getQuestionData(1, this.filterData)
    },
    filterByStatement() {
      this.$refs.filter.changeFilterData('statement', [this.searchInput])
    },
    sortByCreatedAt() {
      this.$refs.filter.changeFilterData('sort_type', [this.searchSelector.value])
    },
    RemoveChoice(title) {
      const target = this.selectedQuestions.filter(question => question.tags.list.find(tag => tag.type === 'lesson' && tag.title === title))
      if (target.length) {
        target.forEach(question => {
          // question.selected = !question.selected
          this.selectedQuestions.splice(question.index - 1, 1)
          this.deleteQuestionFromExam(question)
        })
      }
    },
    toggleQuestionSelected(question) {
      question.selected = !question.selected
    },
    questionHandle(question) {
      if (!this.providedExam.questions.list.find(item => item.id === question.id)) {
        this.addQuestionToSelectedList(question)
        this.addQuestionToExam(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
        this.deleteQuestionFromExam(question)
      }
    },
    onClickedCheckQuestionBtn(question) {
      this.questionHandle(question)
    },
    addQuestionToExam(question) {
      const arrayOfQuestion = []
      arrayOfQuestion.push(question)
      this.$emit('addQuestionToExam', arrayOfQuestion)
    },
    deleteQuestionFromExam(question) {
      const arrayOfQuestion = []
      arrayOfQuestion.push(question)
      this.$emit('deleteQuestionFromExam', arrayOfQuestion)
    },
    addQuestionToSelectedList(question) {
      this.selectedQuestions.push(question)
    },
    deleteQuestionFromSelectedList(question) {
      const target = this.selectedQuestions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.selectedQuestions.splice(target, 1)
      this.deleteQuestionFromExam(question)
    },
    updatePage(page) {
      this.getQuestionData(page, this.filterData)
    },
    deleteFilterItem(filter) {
      // this.$refs.filter.setTicked('tree', filter.id, false)
    },
    getFiltersForRequest(filterData) {
      return {
        tags: (filterData.tags) ? filterData.tags.map(item => item.id) : [],
        level: (filterData.level) ? filterData.level.map(item => item.value) : [],
        years: (filterData.years) ? filterData.years.map(item => item.id) : [],
        majors: (filterData.majors) ? filterData.majors.map(item => item.id) : [],
        reference: (filterData.reference) ? filterData.reference.map(item => item.id) : [],
        statement: (filterData.statement) ? filterData.statement[0] : '',
        sort_by: (this.searchSelector.value) ? 'created_at' : '',
        sort_type: (filterData.sort_type) ? filterData.sort_type[0] : this.searchSelector.value
      }
    },
    getQuestionData(page, filters) {
      if (!page) {
        page = 1
      }
      this.loadingQuestion.loading = true
      this.questions.loading = true
      if (filters.tags.length === 0) {
        filters.tags.push(this.providedExam.temp.lesson)
      }
      this.showLoading()
      this.$axios.get(API_ADDRESS.question.index(filters, page))
        .then((response) => {
          this.questions = new QuestionList(response.data.data)
          this.paginationMeta = response.data.meta
          this.loadingQuestion.loading = false
          this.questions.loading = false
          this.setSelectedQuestionOfCurrentMetaPage()
          this.setQuestionsInfoCheckBoxStatus()
          this.setExamTags(this.selectedTags)
          this.hideLoading()
        })
        .catch((err) => {
          console.error(err)
          this.loadingQuestion.loading = false
          this.questions.loading = false
          this.hideLoading()
        })
    },
    getFilterOptions() {
      this.$axios.get(API_ADDRESS.option.userIndex)
        .then((response) => {
          response.data.data.forEach(option => {
            if (option.type === 'reference_type') {
              this.filterQuestions.reference_type.push(option)
            } else if (option.type === 'year_type') {
              this.filterQuestions.year_type.push(option)
            } else if (option.type === 'major_type') {
              this.filterQuestions.major_type.push(option)
            }
          })
        })
    },
    selectAllQuestions() {
      this.selectedQuestions = []
      this.questions.list.forEach(question => {
        this.selectedQuestions.push(question)
      })
      this.$emit('addQuestionToExam', this.selectedQuestions)
    },
    deleteAllQuestions() {
      this.$emit('deleteQuestionFromExam', this.selectedQuestions)
      this.questions.list.forEach(question => {
        this.selectedQuestions.splice(question)
      })
    },
    onLessonChanged(item) {
      if (this.isSelectedLessonNew(item)) {
        this.providedExam.temp.lesson = item.id
        this.$emit('update:exam', this.providedExam)
        if (this.providedExam.questions.list.length > 0) {
          this.detachAllQuestionsFromExam()
        }
      }
      this.setFilterTreeLesson(item)
    },
    isSelectedLessonNew(lesson) {
      return this.providedExam.temp.lesson !== lesson.id
    },
    detachAllQuestionsFromExam() {
      this.$emit('deleteQuestionFromExam', this.providedExam.questions.list)
    },
    setFilterTreeLesson(item) {
      this.rootNodeIdInFilter = item.id
    },
    getLessonsList(item) {
      return this.getNode(item.id)
    },
    updateLessonsTitles() {
      const fieldText = []
      const flatSelectedNodes = []
      if (Object.keys(this.allSubjects).length !== 0) {
        for (const key in this.allSubjects) {
          if (this.allSubjects[key].nodes && this.allSubjects[key].nodes.length > 0) {
            this.allSubjects[key].nodes.forEach(val => {
              fieldText.push(val.title)
              flatSelectedNodes.push(val)
            })
          }
        }
      }
      this.allSubjectsFlat = flatSelectedNodes
      this.lessonsTitles = fieldText
    },
    getTheLastSelectedNode() {
      const foundedNodes = []
      let cleaned = []
      this.allSubjectsFlat.forEach((selectedNode) => {
        selectedNode.ancestors.forEach((parentNode) => {
          if (this.allSubjectsFlat.find(item => item.id === parentNode.id)) {
            foundedNodes.push(parentNode)
          }
        })
      })
      cleaned = this.getUniqueListBy(foundedNodes, 'id')
      this.lastSelectedNodes = this.allSubjectsFlat.filter((selectedNode) => {
        return !(cleaned.find(item => item.id === selectedNode.id))
      })
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    },
    AreAllQuestionsSelected() {
      const questionListIds = this.questions.list.map(question => question.id)
      return this.doesFirstArrayIncludeTheSecondOne(this.getSelectedQuestionIds, questionListIds)
    },
    setQuestionsInfoCheckBoxStatus() {
      if (this.AreAllQuestionsSelected()) {
        this.checkBox = true
        return
      }
      this.checkBox = false
    },
    doesFirstArrayIncludeTheSecondOne(parentArray, childArray) {
      return childArray.every(element => {
        return parentArray.includes(element)
      }) &&
        parentArray.length >= childArray.length
    },
    setSelectedQuestionOfCurrentMetaPage() {
      const questionListIds = this.questions.list.map(question => question.id)
      this.selectedQuestions = this.providedExam.questions.list.filter(question => questionListIds.includes(question.id))
    },
    fillAllSubjectsFromResponse() {
      this.providedExam.temp.tags.forEach((tag, index) => {
        const lastAncestors = tag.ancestors[tag.ancestors.length - 1]
        if (!this.allSubjects[lastAncestors.id]) {
          this.allSubjects[lastAncestors.id] = {
            nodes: []
          }
        }
        Object.assign(this.allSubjects[lastAncestors.id].nodes, { [index]: { ...tag } })
      })
    },
    setSelectedTags(allTags) {
      this.selectedTags = allTags
    },
    setExamTags(selectedTags) {
      this.providedExam.temp.tags = selectedTags.map(node => ({
        ancestors: node.ancestors,
        id: node.id,
        title: node.title
      }))
      this.$emit('update:exam', this.providedExam)
    },
    isValid() {
      let error = false
      const messages = []
      if (this.providedExam.questions.list.length === 0) {
        error = true
        messages.push('هیچ سوالی انتخاب نشده است.')
      }

      return { error, messages }
    }
  }
}

</script>

<style lang="scss" scoped>
.filter-card-container {
  padding-bottom: 24px;
  @media only screen and (max-width: 1439px) {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: 1023px) {
    padding-bottom: 16px;
  }

  .filter-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f4f6f9;
    @media only screen and (max-width: 599px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &:deep(.q-card__section) {
      padding: 0;

      .q-field--filled .q-field__inner .q-field__control {
        background: #FFFFFF;
      }

      .q-field--filled .q-field__inner .q-field__control .q-field__append, .q-field--filled .q-field__inner .q-field__control .q-field__prepend {
        padding-right: 16px;
        padding-left: 12px;
      }

      @media only screen and (max-width: 599px) {
        width: 100%;
      }
    }

    .search-section {
      .search-input {
        width: 300px;
        background-color: white;

        &:deep(.q-field__append) {
          padding-right: 8px !important;

          .q-icon {
            color: #6D708B;
            cursor: pointer;
          }
        }

        &:deep(.q-field__control) {
          background-color: white;
        }

        //&:deep(.q-field--filled .q-field__inner .q-field__control .q-field__append, .q-field--filled .q-field__inner .q-field__control .q-field__prepend ){
        //
        //}
        @media only screen and (max-width: 1023px) {
          width: 352px;
        }
        @media only screen and (max-width: 599px) {
          width: 100%;
        }

        .search {
          color: #6D708B;

          :deep(.q-field__inner .q-field__control .q-field__append .q-icon) {
            color: #6D708B;
          }
        }
      }
    }

    .filter-section {
      display: flex;
      flex-direction: row;

      :deep(.q-field--filled .q-field__inner .q-field__control .q-field__label) {
        margin-top: -10px;
      }

      :deep(.q-field--filled .q-field__inner .q-field__control .q-field__native, .q-field--filled .q-field__inner .q-field__control .q-field__prefix, .q-field--filled .q-field__inner .q-field__control .q-field__suffix, .q-field--filled .q-field__inner .q-field__control .q-field__input) {
        padding-left: 16px;
        padding-right: 0;
        min-height: 40px;
      }

      .filter-input {
        width: 160px;
        @media only screen and (max-width: 1023px) {
          width: 164px;
        }
        @media only screen and (max-width: 599px) {
          width: 100%;
          padding-top: 16px;
        }
      }

    }
  }
}

.q-checkbox__bg {
  border: 1px solid #65677F;
  box-sizing: border-box;
  border-radius: 5px;
}

.main-container {
  .question-bank-filter {
  }

  .question-list {
    margin-left: 30px;

    @media only screen and (max-width: 1023px) {
      margin-left: 0;
    }

    .question-bank-toolbar {
      padding-bottom: 24px;
      @media only screen and (max-width: 600px) {
        padding-bottom: 0;
      }
    }

    .question-bank-content {
      margin-bottom: 16px;

      :deep(.question-card) {
        margin-bottom: 16px;
      }
    }
  }

}

@media only screen and (max-width: 1919px) {
}

@media only screen and (max-width: 1439px) {
  .question-bank-toolbar {
    padding-bottom: 20px;
  }
}

@media only screen and (max-width: 1023px) {
}

@media only screen and (max-width: 599px) {
}

.go-back-tree-tab {
  width: 144px;
  height: 40px;
  background: var(--Neutral-2);
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.03em;
  color: #6D708B;
  margin-right: 10px;
}

.close-tree-tab {
  width: 144px;
  height: 40px;
  background: var(--Primary-main);
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}
</style>
