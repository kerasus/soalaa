<template>
  <div class="main-container">
    <div class="row">
      <div ref="header"
           class="col-12 question-bank-header">
        <QuestionBankHeader />
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <sticky-both-sides :max-width="1024"
                           :top-gap="130">
          <question-filter
            ref="filter"
            :loadings="loadings"
            :filterQuestions="filterQuestions"
            @onFilter="onFilter"
            @delete-filter="deleteFilterItem"
          />
        </sticky-both-sides>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div class="question-bank-toolbar">
          <QuestionToolBar
            :key="questionListKey"
            :check-box="checkBox"
            :selectedQuestions="selectedQuestions"
            @remove="RemoveChoice"
            @deleteAllQuestions="deleteAllQuestions"
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
          <question-item v-if="questions.loading"
                         :question="loadingQuestion"
          />
          <template v-else>
            <question-item
              v-for="question in questions.list"
              :key="question.id"
              :question="question"
              :listOptions="questionsOptions"
              pageStrategy="question-bank"
              :report-options="reportIssuesList"
              @deleteFromDb="deleteQuestionFromDataBase"
              @checkSelect="onClickedCheckQuestionBtn"
            />
          </template>
        </div>

        <q-banner v-if="showSearchResultReport && !questions.loading"
                  inline-actions
                  rounded
                  class="bg-orange text-white">
          تعداد سوالات حاصل سرچ شما:
          <span class="text-bold text-h6">
            {{ paginationMeta.total }}
          </span>
          <template v-slot:action>
            <q-btn flat
                   label="بستن"
                   @click="showSearchResultReport = false"
            />
          </template>
        </q-banner>
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
</template>

<script>
import pagination from 'components/Question/QuestionBank/Pagination'
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionToolBar from 'components/Question/QuestionBank/QuestionToolBar'
import QuestionBankHeader from 'components/Question/QuestionBank/components/QuestionBankHeader'
import StickyBothSides from 'components/Utils/StickyBothSides'

export default {
  name: 'QuestionBank',
  components: {
    StickyBothSides,
    QuestionBankHeader,
    QuestionToolBar,
    QuestionFilter,
    QuestionItem,
    pagination
  },
  data() {
    return {
      reportIssuesList: [],
      loadings: {
        optionsLoading: false,
        levelTypeLoading: false,
        statusLoading: false,
        reportStatusLoading: false
      },
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
      showSearchResultReport: true,
      filterData: null,
      checkBox: false,
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: [],
        statuses: [],
        level_type: [],
        types: [],
        report_type: [],
        report_status: []
      },
      questionListKey: Date.now(),
      selectedQuestions: [],
      questionId: [],
      loadingQuestion: new Question(),
      questions: new QuestionList(),
      questionsOptions: {
        copy: true,
        detachQuestion: true,
        deleteQuestionFromDb: true,
        deleteQuestionFromExam: false,
        editQuestion: true,
        switch: true
      },
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
      }
    }
  },
  inject: {
    exam: {
      from: 'providedExam',
      default: new Exam()
    }
  },
  watch: {
    'selectedQuestions.length': {
      handler(newValue, oldValue) {
        this.exam.questions.list = []
        this.exam.questions.list = this.selectedQuestions
        this.questionListKey = Date.now()
      }
    }
  },
  created() {
    this.getQuestionData()
    this.getFilterOptions()
  },
  emits: ['onFilter'],
  methods: {
    onFilter(filterData) {
      // this.$emit('onFilter', filterData)
      this.filterData = this.getFiltersForRequest(filterData)
      this.getQuestionData(1, this.filterData)
    },
    RemoveChoice(title) {
      const target = this.selectedQuestions.filter(question => question.tags.list.find(tag => tag.type === 'lesson' && tag.title === title))
      if (target.length) {
        target.forEach(question => {
          question.selected = !question.selected
          this.selectedQuestions.splice(question.index - 1, 1)
          this.deleteQuestionFromExam(question)
          this.questionListKey = Date.now()
        })
      }
    },
    toggleQuestionSelected(question) {
      question.selected = !question.selected
    },
    questionHandle(question) {
      if (question.selected) {
        this.addQuestionToSelectedList(question)
        // this.addQuestionToExam(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
        // this.deleteQuestionFromExam(question)
      }
    },
    onClickedCheckQuestionBtn(question) {
      this.toggleQuestionSelected(question)
      this.questionHandle(question)
    },
    addQuestionToExam(question) {
      this.$emit('addQuestionToExam', question)
      this.questionListKey = Date.now()
    },
    deleteQuestionFromExam(question) {
      this.$emit('deleteQuestionFromExam', question)
      this.questionListKey = Date.now()
    },
    addQuestionToSelectedList(question) {
      this.selectedQuestions.push(question)
      if (this.selectedQuestions.length === this.questions.list.length) {
        this.checkBox = true
      } else {
        this.checkBox = 'maybe'
      }
      this.questionListKey = Date.now()
    },
    deleteQuestionFromSelectedList(question) {
      if (this.checkBox) {
        this.checkBox = false
      }
      const target = this.selectedQuestions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.selectedQuestions.splice(target, 1)
      this.deleteQuestionFromExam(question)
      this.questionListKey = Date.now()
    },
    async deleteQuestion() {
      try {
        await this.callDeleteQuestion()
      } catch (e) {

      }
    },
    deleteQuestionReq (questionId) {
      return this.$axios.delete(API_ADDRESS.question.delete(questionId))
    },
    closeConfirmModal () {
      this.$store.commit('AppLayout/showConfirmDialog', {
        show: false
      })
    },
    async deleteQuestionFromDataBase(question) {
      await this.$store.dispatch('AppLayout/showConfirmDialog', {
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
            await this.deleteQuestionReq(question.id)
            this.$q.notify({
              message: 'سوال از پایگاه داده حذف شد.',
              type: 'positive'
            })
            this.getQuestionData()
            // this.$router.go(-1)
          } catch (e) {
            this.closeConfirmModal()
          }
        }
      })
    },
    callDeleteQuestion() {

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
        type_id: filterData.type_id ? filterData.type_id.id : '',
        reference: filterData.reference.map(item => item.id),
        statement: (filterData.statement) ? filterData.statement[0] : '',
        sort_by: (this.searchSelector.value) ? 'created_at' : '',
        sort_type: (filterData.sort_type) ? filterData.sort_type[0] : this.searchSelector.value,
        statuses: filterData.statuses.map(item => item.id),
        question_report_type: filterData.question_report_type.map(item => item.id),
        report_status: (filterData.report_status.title) ? filterData.report_status.title : '',
        ...(typeof filterData.tags_with_childrens && { tags_with_childrens: filterData.tags_with_childrens })
      }
    },

    getQuestionData(page, filters) {
      if (!page) {
        page = 1
      }
      if (!filters) {
        filters = {
          sort_by: 'created_at',
          sort_type: this.searchSelector.value,
          // statement: '',
          tags_with_childrens: 1,
          report_status: ''
        }
      }
      this.loadingQuestion.loading = true
      this.questions.loading = true
      this.$axios.get(API_ADDRESS.question.index(filters, page, true))
        .then((response) => {
          this.questions = new QuestionList(response.data.data)
          this.paginationMeta = response.data.meta
          this.loadingQuestion.loading = false
          this.questions.loading = false
          this.showSearchResultReport = true
        })
        .catch(function (error) {
          console.error(error)
          this.loadingQuestion.loading = false
          this.questions.loading = false
        })
    },
    getFilterOptions() {
      this.loadings.optionsLoading = true
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          this.loadings.optionsLoading = false
          response.data.data.forEach(option => {
            if (option.type === 'reference_type') {
              this.filterQuestions.reference_type.push(option)
            } else if (option.type === 'year_type') {
              this.filterQuestions.year_type.push(option)
            } else if (option.type === 'major_type') {
              this.filterQuestions.major_type.push(option)
            } else if (option.type === 'question_type') {
              this.filterQuestions.types.push(option)
            } else if (option.type === 'question_report_type') {
              this.filterQuestions.report_type.push(option)
              this.reportIssuesList.push(option)
            }
          })
        })
        .catch(() => {
          this.loadings.optionsLoading = false
        })
      this.getQuestionStatuses()
      this.getQuestionReportStatuses()
      this.getLevelsFilterData()
    },
    getLevelsFilterData() {
      this.loadings.levelTypeLoading = true
      this.$axios.get(API_ADDRESS.question.levels)
        .then(response => {
          this.filterQuestions.level_type = response.data.data
          this.loadings.levelTypeLoading = false
        })
        .catch(() => {
          this.loadings.levelTypeLoading = false
        })
    },
    getQuestionStatuses () {
      this.loadings.statusLoading = true
      this.$axios.get(API_ADDRESS.question.status.base)
        .then(response => {
          this.filterQuestions.statuses = response.data.data
          this.loadings.statusLoading = false
        })
        .catch(() => {
          this.loadings.statusLoading = true
        })
    },
    getQuestionReportStatuses() {
      this.loadings.reportStatusLoading = true
      this.$axios.get(API_ADDRESS.question.reportStatuses)
        .then(response => {
          this.loadings.reportStatusLoading = false
          this.filterQuestions.report_status = response.data.data
        })
        .catch(() => {
          this.loadings.reportStatusLoading = false
        })
    },
    filterByStatement() {
      this.$refs.filter.changeFilterData('statement', [this.searchInput])
    },
    sortByCreatedAt() {
      this.$refs.filter.changeFilterData('sort_type', [this.searchSelector.value])
    },
    selectAllQuestions() {
      this.checkBox = !this.checkBox
      if (this.selectedQuestions.length) {
        this.questions.list.forEach(question => {
          question.selected = false
          this.selectedQuestions.splice(question)
        })
      }
      if (this.checkBox) {
        this.questions.list.forEach(question => {
          question.selected = true
          this.selectedQuestions.push(question)
        })
      } else {
        this.questions.list.forEach(question => {
          question.selected = false
          this.selectedQuestions.splice(question)
        })
      }
    },
    deleteAllQuestions() {
      if (this.checkBox) {
        this.checkBox = false
      }
      this.questions.list.forEach(question => {
        question.selected = false
        this.selectedQuestions.splice(question)
      })
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

    @media only screen and (max-width: 600px) {
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

  @media only screen and (max-width: 1919px) {
    padding-left: 0;
    padding-right: 24px;
  }

  @media only screen and (max-width: 1439px) {
    padding-left: 30px;
  }

  @media only screen and (max-width: 599px) {
    padding-left: 1px;
    padding-right: 0px;
  }

  .question-bank-header {
    padding-bottom: 30px;
  }

  .question-bank-filter {
    padding-right: 24px;
  }

  .question-bank-toolbar {
    padding-bottom: 24px;
  }

  .question-bank-content {
    margin-bottom: 16px;

    :deep(.question-card) {
      margin-bottom: 16px;
    }
  }
}

@media only screen and (max-width: 1919px) {
  .question-bank-filter {
    padding-right: 20px;
  }
}

@media only screen and (max-width: 1439px) {
  .question-bank-header {
    padding-bottom: 20px;
  }

  .question-bank-filter {
    padding-right: 20px;
  }

  .question-bank-toolbar {
    padding-bottom: 20px;
  }
}

@media only screen and (max-width: 1023px) {
  .question-bank-filter {
    padding-right: 0px;
  }
}

@media only screen and (max-width: 599px) {
  .question-bank-toolbar {
    padding-bottom: 0;
  }
}
</style>
