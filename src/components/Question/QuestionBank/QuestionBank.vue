<template>
  <div class="question-bank">
    <q-toolbar class="text-white question-bank-toolbar">
      <div class="row">
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="رشته"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="مقطع"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="پایه"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="گروه آموزشی"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="گروه درسی"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="درس"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="سختی"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="منبع"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="model"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="سال انتشار"
            bg-color="white"
            rounded
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row">
        <q-card class="toolbar-card">
          <div class="row" no-gutters>
            <div class="col">
              <q-chip
                dark
                class="ma-2"
                color="deep-purple accent-4 toolbar-button"
              >
                {{ totalFilteredQuestions }}
              </q-chip>
            </div>
            <div class="col">
              <q-btn
                class="toolbar-button"
                color="light-blue"
                fab
                icon="mdi-sort-ascending"
                @click="sortQuestions"
              />
            </div>
            <div class="col">
              <q-btn
                class="toolbar-button"
                color="light-blue"
                fab
                icon="mdi-database-search"
                @click="getQuestions(true)"
             />
            </div>
          </div>
        </q-card>
      </div>
    </q-toolbar>
    <div>
      <question-card/>
    </div>
  </div>
</template>

<script>
// import topic from 'src/components/Question/topic'
import QuestionCard from 'src/components/Question/QuestionBank/QuestionCard'
import Assistant from 'src/plugins/assistant'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'QuestionBank',
  components: {
    QuestionCard
    // topic
  },
  data () {
    return {
      option: '',
      montaTree: null,
      disableLoadingList: false,
      totalFilteredQuestions: '...',
      lastLoadTime: Date.now(),
      nextPage: '',
      filteredQuestions: [],
      orderedQuestions: false,
      loadingPage: false,
      filterQuestions: {
        majorId: null,
        levelId: null,
        gradeId: null,
        moduleGroupId: null,
        majorGroupId: null,
        moduleId: null,
        originId: null,
        publishYearId: null,
        difficultyLevelId: null
      },
      expanModel: 0
    }
  },
  computed: {

  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('https://cdn.alaatv.com/upload/knowledgeTree.json', {
        // headers: {
        //   Accept: 'application/json;'
        // }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    sortQuestions () {
      function hasQuestionOrder (question, index) {
        if (typeof index === 'undefined') {
          index = 0
        }
        return (
          question.source_data.origins &&
          question.source_data.origins.questionOriginList &&
          question.source_data.origins.questionOriginList[index] &&
          question.source_data.origins.questionOriginList[index].questionOrder
        )
      }
      function getQuestionOrder (question, index) {
        if (typeof index === 'undefined') {
          index = 0
        }
        if (hasQuestionOrder(question, index)) {
          return question.source_data.origins.questionOriginList[index].questionOrder
        } else {
          return null
        }
      }
      const sortList = Array.prototype.sort.bind(this.filteredQuestions)
      sortList(function (a, b) {
        if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) < getQuestionOrder(b)) {
          return -1
        } else if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) > getQuestionOrder(b)) {
          return 1
        } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) < getQuestionOrder(b, 1)) {
          return -1
        } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) > getQuestionOrder(b, 1)) {
          return 1
        } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) < getQuestionOrder(b, 2)) {
          return -1
        } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) > getQuestionOrder(b, 2)) {
          return 1
        } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) < getQuestionOrder(b, 3)) {
          return -1
        } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) > getQuestionOrder(b, 3)) {
          return 1
        } else {
          return 1
        }
      })
      this.lastLoadTime = Date.now()
    },
    showLoading () {
      this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...' })
    },
    hideLoading () {
      this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
    },
    getQuestions (clear) {
      const that = this
      if (clear === true) {
        that.disableLoadingList = false
        that.nextPage = ''
        that.totalFilteredQuestions = '...'
      }
      that.showLoading()
      this.$axios.get(API_ADDRESS.question.indexMonta + that.nextPage, {
        params: this.filterQuestions
      })
        .then(response => {
          if (clear === true) {
            that.filteredQuestions = response.data.data
          } else {
            that.filteredQuestions = that.filteredQuestions.concat(response.data.data)
          }

          that.totalFilteredQuestions = response.data.meta.total
          that.hideLoading()
          that.lastLoadTime = Date.now()
          if (typeof response.data.links === 'undefined' || response.data.links.next === null) {
            that.nextPage = ''
            that.disableLoadingList = true
            return
          }
          that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        })
        .catch((error) => {
          Assistant.handleAxiosError(this.$toasted, error)
          that.hideLoading()
          that.lastLoadTime = Date.now()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.question-bank{
  .question-bank-toolbar{
    background-image: url("https://picsum.photos/1920/1080?random") !important;
    background-color: #ffeb3b;
    height: 110px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    .toolbar-card{
      margin-top: 8px;
      max-height: 48px;
      max-width: 378px;
      .toolbar-button{
        min-height: 40px !important;
        min-width: 40px;
      }
    }
  }
}
</style>
<style lang="scss">
.question-bank {
  .question-bank-toolbar {
    .q-field--filled{
      &.q-field--rounded {
        .q-field__control{
          border-radius: 28px;
        }
      }
    }
    .q-select--with-input .q-field__control{
      max-height: 40px!important;
      min-height: 0;
    }
  }
}

</style>
