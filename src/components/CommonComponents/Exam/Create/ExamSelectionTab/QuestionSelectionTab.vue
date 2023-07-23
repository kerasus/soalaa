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
            v-model:show-filters="showFilters"
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
          :availableSearchSingleNode="false"
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
        <sticky-both-sides class="sticky-component"
                           :topGap="72"
                           :max-width="1024">
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

              <q-card-section class="filter-section q-mb-md">
                <q-btn icon="isax:setting-4"
                       class="filter-btn q-mt-md"
                       flat
                       @click="showFilters = true" />
              <!--              <q-select-->
              <!--                v-model="searchSelector"-->
              <!--                filled-->
              <!--                dropdown-icon="isax:arrow-down-1"-->
              <!--                option-value="value"-->
              <!--                option-label="title"-->
              <!--                :options="searchInputOptions"-->
              <!--                class="backGround-gray-input filter-input"-->
              <!--                @update:model-value="sortByCreatedAt"-->
              <!--              >-->
              <!--              </q-select>-->
              </q-card-section>
            </q-card>
          </div>
        </sticky-both-sides>

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
  <div v-if="isTreeLayerConfigReady">
    <tree-modal
      ref="questionTreeModal"
      :key="treeKey"
      v-model:dialogValue="treeModalValue"
      v-model:selected-nodes="selectedNodes"
      :initial-node="treeModalNodeId"
      :tree-type="'test'"
      :no-nodes-label="'لطفا یک درس انتخاب کنید'"
      exchange-last-layer-only
      :persistent="!doesExamHaveLesson"
      :layers-config="treeLayersConfig"
      @layerSelected="onLessonChanged"
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
    </tree-modal>
  </div>

  <q-dialog v-model="showFilters"
            class="dialog-container">
    <div class="dialog-filter q-pa-md row justify-between">
      <div class="col-12">
        <div class="row header-buttons justify-between">
          <div class="title">
            فیلتر سوالات
          </div>
          <q-btn icon-right="isax:arrow-left"
                 flat
                 label="بازگشت"
                 @click="showFilters = false" />
        </div>
        <div class="full-width">
          <question-filter
            ref="filter2"
            :show-major-list="false"
            :mobile-mode="true"
            :availableSearchSingleNode="false"
            :filterQuestions="filterQuestions"
            :root-node-id-to-load="rootNodeIdInFilter"
            :node-ids-to-tick="selectedNodesIds"
            @tagsChanged="setSelectedTags"
            @onFilter="onFilter"
            @delete-filter="deleteFilterItem"
            @update-selected-filters="updateSelectedFilters"
          />
        </div>
      </div>
      <div class="action-buttons col-12">
        <div class="row justify-around">
          <div class="action-btn remove-all-button col-5"
               @click="deleteAllFilters"
          >
            حذف همه
          </div>
          <div class="action-btn register-button col-5"
               @click="showFilters = false"
          >
            اعمال فیلتر
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import pagination from 'components/Question/QuestionBank/Pagination'
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/CommonComponents/Exam/Create/QuestionTemplate/QuestionItem.vue'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionsGeneralInfo from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionsGeneralInfo'
import TreeModal from 'components/Question/QuestionPage/TreeModal'
import mixinTree from 'src/mixin/Tree'
import { TreeNode } from 'src/models/TreeNode'
import StickyBothSides from 'components/Utils/StickyBothSides'

export default {
  name: 'QuestionSelectionTab',
  components: { StickyBothSides, TreeModal, QuestionsGeneralInfo, QuestionFilter, QuestionItem, pagination },
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
      showFilters: false,
      treeKey: 0,
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
      treeModalValue: false,
      allSubjects: {},
      treeModalLessonsList: [],
      rootNodeIdInFilter: '',
      groupsList: [],
      treeLayersConfig: [
        {
          name: 'lesson',
          selectedValue: new TreeNode(),
          nodeList: [],
          disable: false,
          label: 'نام درس',
          className: 'col-12'
        }
      ],
      examGradeSetValue: '',
      selectedNodesIds: [],
      lessonsTitles: [],
      filterData: null,
      checkBox: false,
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: [],
        level_type: [],
        tags_with_childrens: 1
      },
      selectedNodes: [],
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
      reportTypeList: [],
      treeModalNodeId: null
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
    this.getLevelsFilterData()
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
    isTreeLayerConfigReady() {
      return this.providedExam.temp.grade && this.treeModalNodeId
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
    updateSelectedFilters(key, value) {
      this.$refs.filter.changeFilterData(key, value)
    },
    deleteAllFilters() {
      this.$refs.filter.deleteAllFilters()
      this.$refs.filter2.deleteAllFilters()
    },
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
      this.$refs.questionTreeModal.finalizeOutputData()
      const foundedLesson = this.treeModalLessonsList.find(item => item.id === this.providedExam.temp.lesson)
      const tagsToFilter = this.selectedNodes.length > 0 ? this.selectedNodes : [foundedLesson]
      this.selectedNodesIds = this.selectedNodes.map(node => node.id)
      this.$refs.filter.changeFilterData('tags', tagsToFilter)
    },
    async setupTreeModal() {
      if (this.providedExam.temp.tags && this.providedExam.temp.tags[0]) {
        this.fillAllTagsFromResponse()
      }
      await this.setupTreeLayer()
      this.$nextTick(() => {
        this.treeKey++
        this.toggleTreeModal()
      })
    },
    setupTreeLayer() {
      return new Promise((resolve, reject) => {
        this.showLoading()
        this.getLessonsList(new TreeNode({
          id: this.providedExam.temp.grade
        }))
          .then(response => {
            this.hideLoading()
            this.treeModalNodeId = response.data.data.id
            this.treeModalLessonsList = response.data.data.children
            if (this.treeModalLessonsList.length === 0) {
              this.$q.notify({
                message: 'پایه تحصیلی انتخاب شده درس ندارد',
                type: 'negative'
              })
            }
            this.setInitialTreeLayer(this.treeModalLessonsList)
            if (this.providedExam.temp.lesson) {
              this.setInitialLesson(this.providedExam.temp.lesson)
            }
            resolve()
          })
          .catch(() => {
            this.hideLoading()
            reject()
          })
      })
    },
    setInitialTreeLayer (nodeList) {
      this.treeLayersConfig[0].nodeList = nodeList
    },
    setInitialLesson(lesson) {
      const foundedLesson = this.treeModalLessonsList.find(item => item.id === lesson)
      if (!foundedLesson?.id) {
        return
      }
      this.treeLayersConfig[0].selectedValue = foundedLesson
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
    getLevelsFilterData() {
      this.$axios.get(API_ADDRESS.question.levels)
        .then(response => {
          this.filterQuestions.level_type = response.data.data
        })
        .catch()
    },
    goToPrevStep() {
      this.$emit('lastTab')
    },
    goToNextStep() {
      this.$emit('nextTab')
    },
    SyncTreeSelectedNodesWithFilters(filterData) {
      this.selectedNodes = filterData.tags
      this.selectedNodesIds = this.selectedNodes.map(node => node.id)
    },
    onFilter(filterData) {
      // this.$emit('onFilter', filterData)
      this.SyncTreeSelectedNodesWithFilters(filterData)
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
        tags: filterData.tags.map(item => item.id),
        level: filterData.level_type.map(item => item.key),
        years: filterData.years.map(item => item.id),
        majors: filterData.majors.map(item => item.id),
        reference: filterData.reference.map(item => item.id),
        statement: (filterData.statement) ? filterData.statement[0] : '',
        sort_by: (this.searchSelector.value) ? 'created_at' : '',
        sort_type: (filterData.sort_type) ? filterData.sort_type[0] : this.searchSelector.value,
        ...(typeof filterData.tags_with_childrens && { tags_with_childrens: filterData.tags_with_childrens })
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
          this.setExamTags(this.selectedNodes)
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
    onLessonChanged(lessonObj) {
      if (this.isSelectedLessonNew(lessonObj.layer?.selectedValue)) {
        this.providedExam.temp.lesson = lessonObj.layer.selectedValue.id
        this.$emit('update:exam', this.providedExam)
        if (this.providedExam.questions.list.length > 0) {
          this.detachAllQuestionsFromExam()
        }
      }
      this.setFilterTreeLesson(lessonObj.layer.selectedValue)
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
    fillAllTagsFromResponse() {
      this.selectedNodes = this.providedExam.temp.tags
    },
    setSelectedTags(allTags) {
      this.selectedNodes = allTags
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
.dialog-container {

  .dialog-filter {
    //display: flex;
    //flex-direction: column;
    background-color: #E5E5E5;
    height: 100%;
    .header-buttons {
      align-items: center;
      margin-bottom: 31px;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #3F456F;
      }
    }
    .action-buttons {
      align-self: flex-end;
      .action-btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        height: 40px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        cursor: pointer;
        z-index: 2;

        &.remove-all-button {
          border: 1px solid #E86562;
          background: #F4F5F6;
          color: #E86562;
          //margin-right: 30px;
        }

        &.register-button {
          background: #9690E4;
          color: #FFFFFF;
        }
      }
    }
  }
}

.filter-card-container {
  padding-bottom: 24px;
  background: #F4F6F9;
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

      .filter-btn {
        display: none;
        background-color: white;
        @media only screen and (max-width: 599px) {
          margin-right: 8px;
          width: 40px;
          height: 40px;
          display: block;
        }
        }

      .filter-input {
        width: 160px;
        @media only screen and (max-width: 1023px) {
          width: 164px;
        }
        @media only screen and (max-width: 599px) {
          width: 100%;
          margin-left: 8px;
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

  .question-list {
    margin-left: 30px;

    @media only screen and (max-width: 1023px) {
      margin-left: 0;
    }

    .sticky-component {
      position: relative;
      z-index: 9;
    }

    .question-bank-toolbar {
      padding-bottom: 24px;
      background: #F4F6F9;
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

  .pagination {
    @media only screen and (max-width: 600px) {
      margin-bottom: 150px;
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
