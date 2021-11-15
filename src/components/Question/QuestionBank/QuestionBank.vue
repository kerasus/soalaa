<template>
  <div
    v-if="initialData"
    class="question-bank"
  >
    <q-toolbar class="text-white question-bank-toolbar">
      <div class="row toolbar-selections">
        <div class="col">
          <q-select
            filled
            v-model="filterQuestions.majorId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="رشته"
            bg-color="white"
            rounded
            :options="initialData.major"
            :option-label="(item) => item === null ? 'Null value' : item.name"
            :option-value="(item) => item === null ? null : item.id"
            emit-value
            map-options
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
            v-model="filterQuestions.levelId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="مقطع"
            bg-color="white"
            rounded
            :options="initialData.level"
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
            v-model="filterQuestions.gradeId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="پایه"
            bg-color="white"
            rounded
            :options="initialData.grade"
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
            v-model="filterQuestions.majorGroupId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="گروه آموزشی"
            bg-color="white"
            rounded
            :options="initialData.major"
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
            v-model="filterQuestions.moduleGroupId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="گروه درسی"
            bg-color="white"
            rounded
            :options="initialData.moduleGroup"
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
            v-model="filterQuestions.moduleId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="درس"
            bg-color="white"
            rounded
            :options="initialData.module"
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
            v-model="filterQuestions.difficultyLevelId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="سختی"
            bg-color="white"
            rounded
            :options="initialData.difficultyLevels"
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
            v-model="filterQuestions.originId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="منبع"
            bg-color="white"
            rounded
            :options="initialData.origins"
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
            v-model="filterQuestions.publishYearId"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="سال انتشار"
            bg-color="white"
            rounded
            :options="initialData.publishYears"
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
      <div class="row toolbar-card-parent">
        <q-card class="toolbar-card">
          <div class="row toolbar-card-child" no-gutters>
            <div class="col">
              <q-chip
                dark
                class="ma-2"
                color="deep-purple-14 toolbar-button"
              >
                {{ totalFilteredQuestions }}
              </q-chip>
            </div>
            <div class="col">
              <q-btn
                class="toolbar-button"
                color="light-blue"
                fab-mini
                icon="mdi-sort-ascending"
              />
            </div>
            <div class="col">
              <q-btn
                class="toolbar-button"
                color="light-blue"
                fab-mini
                icon="mdi-database-search"
                @click="getQuestions(true)"
              />
            </div>
          </div>
        </q-card>
      </div>
    </q-toolbar>
    <q-infinite-scroll @load="getQuestions (false)" :offset="250">
      <div
        v-for="item in filteredQuestions"
        :key="item.id"
      >
        <question-card :questionData="item"/>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
// import topic from 'src/components/Question/topic'
import QuestionCard from 'src/components/Question/QuestionBank/QuestionCard'
import API_ADDRESS from 'src/api/Addresses'
import $ from 'jquery'

export default {
  name: 'QuestionBank',
  components: {
    QuestionCard
    // topic
  },
  data () {
    return {
      initialData: {},
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
      expanModel: 0,
      fillMonta: false,
      loading: false
    }
  },
  created () {
  },
  methods: {
    getData () {
      $.ajax({
        type: 'GET',
        url: 'https://cdn.alaatv.com/upload/knowledgeTree.json',
        accept: 'application/json; charset=utf-8',
        dataType: 'json',
        success (response) {
          console.log('response', response)
          this.initialData = response
          console.log(this.initialData)
        },
        error (err) {
          console.log(err)
        }
      })
      // this.$axios.get('https://cdn.alaatv.com/upload/knowledgeTree.json', {
      // })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.log('error', err)
      //   })
    },
    getQuestions (clear) {
      if (clear) {
        this.nextPage = ''
        this.totalFilteredQuestions = '...'
      }
      this.$axios.get(API_ADDRESS.question.indexMonta + this.nextPage, {
        params: this.filterQuestions
      })
        .then(response => {
          console.log('res', response)
          console.log('filter', this.filteredQuestions)
          if (clear) {
            this.filteredQuestions = response.data.data
            console.log('fil true:', this.filteredQuestions)
          } else {
            this.filteredQuestions = this.filteredQuestions.concat(response.data.data)
            console.log('fil false:', this.filteredQuestions)
          }

          this.totalFilteredQuestions = response.data.meta.total
          this.lastLoadTime = Date.now()
          if (typeof response.data.links === 'undefined' || response.data.links.next === null) {
            this.nextPage = ''
            this.disableLoadingList = true
            return
          }
          this.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        })
        .catch((error) => {
          console.log(error)
          this.lastLoadTime = Date.now()
        })
    }
    //   sortQuestions () {
    //     function hasQuestionOrder (question, index) {
    //       if (typeof index === 'undefined') {
    //         index = 0
    //       }
    //       return (
    //         question.source_data.origins &&
    //         question.source_data.origins.questionOriginList &&
    //         question.source_data.origins.questionOriginList[index] &&
    //         question.source_data.origins.questionOriginList[index].questionOrder
    //       )
    //     }
    //     function getQuestionOrder (question, index) {
    //       if (typeof index === 'undefined') {
    //         index = 0
    //       }
    //       if (hasQuestionOrder(question, index)) {
    //         return question.source_data.origins.questionOriginList[index].questionOrder
    //       } else {
    //         return null
    //       }
    //     }
    //     const sortList = Array.prototype.sort.bind(this.filteredQuestions)
    //     sortList(function (a, b) {
    //       if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) < getQuestionOrder(b)) {
    //         return -1
    //       } else if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) > getQuestionOrder(b)) {
    //         return 1
    //       } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) < getQuestionOrder(b, 1)) {
    //         return -1
    //       } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) > getQuestionOrder(b, 1)) {
    //         return 1
    //       } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) < getQuestionOrder(b, 2)) {
    //         return -1
    //       } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) > getQuestionOrder(b, 2)) {
    //         return 1
    //       } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) < getQuestionOrder(b, 3)) {
    //         return -1
    //       } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) > getQuestionOrder(b, 3)) {
    //         return 1
    //       } else {
    //         return 1
    //       }
    //     })
    //     this.lastLoadTime = Date.now()
    //   }
  }
}
</script>

<style lang="scss" scoped>
.question-bank {
  .question-bank-toolbar {
    background-image: url("https://picsum.photos/1920/1080?random") !important;
    background-color: #ffeb3b;
    height: 110px;
    display: flex;
    flex-direction: column;
    padding: 8px;

    .toolbar-selections {
      margin-bottom: 4px;
    }

    .toolbar-card-parent {
      width: 378px !important;

      .toolbar-card {
        height: 48px;
        width: 100%;

        .toolbar-card-child {
          align-items: center;
          align-content: center;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.question-bank {
  .question-bank-toolbar {
    .q-field--filled {
      &.q-field--rounded {
        .q-field__control {
          border-radius: 28px;
          padding: 0 24px;
        }

        .q-field__marginal {
          height: 40px;
        }
      }
    }

    .q-select--with-input .q-field__control {
      max-height: 40px !important;
      min-height: 0;
    }
  }
}

</style>
