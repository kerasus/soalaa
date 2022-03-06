<template>
  <div
    v-if="initialData"
    class="question-bank"
  >
    <q-infinite-scroll
      v-if="filteredQuestions"
      @load="onload"
      :offset="250"
      :disable="disableScroll"
    >
      <div
        v-for="item in filteredQuestions"
        :key="item.id"
      >
        <question-card :questionData="item"/>
      </div>
      <template
        v-if="nextPage"
        v-slot:loading
      >
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky expand position="top">
      <q-toolbar class="text-white shadow-3 question-bank-toolbar">
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
              placeholder="رشته"
              bg-color="white"
              rounded
              :options="initialData.major"
              option-label="name"
              option-value="id"
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
              placeholder="مقطع"
              bg-color="white"
              rounded
              :options="initialData.level"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.gradeId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="پایه"
              bg-color="white"
              rounded
              :options="initialData.grade"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.majorGroupId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="گروه آموزشی"
              bg-color="white"
              rounded
              :options="initialData.major"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.moduleGroupId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="گروه درسی"
              bg-color="white"
              rounded
              :options="initialData.moduleGroup"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.moduleId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="درس"
              bg-color="white"
              rounded
              :options="initialData.module"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.difficultyLevelId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="سختی"
              bg-color="white"
              rounded
              :options="initialData.difficultyLevels"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.originId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="منبع"
              bg-color="white"
              rounded
              :options="initialData.origins"
              option-label="name"
              option-value="id"
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
              v-model="filterQuestions.publishYearId"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="سال انتشار"
              bg-color="white"
              rounded
              :options="initialData.publishYears"
              option-label="name"
              option-value="id"
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
                  @click="sortQuestions"
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
    </q-page-sticky>
  </div>
</template>

<script>
import QuestionCard from 'src/components/Question/QuestionBank/QuestionCard'
import API_ADDRESS from 'src/api/Addresses'
import axios from 'axios'

export default {
  name: 'QuestionBank',
  components: {
    QuestionCard
  },
  data () {
    return {
      initialData: null,
      totalFilteredQuestions: '...',
      lastPage: 0,
      nextPage: '',
      filteredQuestions: null,
      orderedQuestions: false,
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
      params: {},
      loading: false,
      disableScroll: false
    }
  },
  created () {
    this.getData()
  },
  watch: {
    loading () {
      if (this.loading) {
        this.$store.dispatch('loading/overlayLoading', true)
      } else {
        this.$store.dispatch('loading/overlayLoading', false)
      }
    }
  },
  methods: {
    getData () {
      const that = this
      that.loading = true
      axios.get('https://cdn.alaatv.com/upload/knowledgeTree.json', {
        transformRequest: (data, headers) => {
          delete headers.common.Authorization
          return data
        }
      })
        .then(response => {
          that.initialData = response.data
          that.loading = false
        })
        .catch(() => {
          that.loading = false
          this.$q.notify({
            message: 'فیلتر مورد نظر شما یافت نشد!',
            position: top,
            type: 'negative'
          })
        })
      // $.ajax({
      //   type: 'GET',
      //   url: 'https://cdn.alaatv.com/upload/knowledgeTree.json',
      //   accept: 'application/json; charset=utf-8',
      //   dataType: 'json',
      //   success (response) {
      //     that.initialData = response
      //     that.loading = false
      //   },
      //   error () {
      //     that.loading = false
      //     this.$q.notify({
      //       message: 'فیلتر مورد نظر شما یافت نشد!',
      //       position: top,
      //       type: 'negative'
      //     })
      //   }
      // })
      // this.$axios.get('/cdn/upload/knowledgeTree.json', {
      //   headers: {
      //     accept: 'application/json; charset=utf-8',
      //     dataType: 'json'
      //   },
      //   transformRequest (data, headers) {
      //     delete headers.common.Authorization
      //     return data
      //   }
      // })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.log('error', err)
      //   })
    },
    onload (index, done) {
      let next = this.nextPage.replace('?page=', '')
      next = parseInt(next)
      this.getQuestions()
      setTimeout(() => {
        done()
      }, 6000)
      if (isNaN(next)) {
        stop()
        this.disableScroll = true
      }
    },
    getQuestions (clear) {
      this.disableScroll = false
      if (clear) {
        this.loading = true
        this.nextPage = ''
        this.totalFilteredQuestions = '...'
      }
      this.$axios.get(API_ADDRESS.question.indexMonta + this.nextPage, {
        params: this.filterQuestions
      })
        .then(response => {
          this.loading = false
          if (clear) {
            this.filteredQuestions = response.data.data
          } else {
            this.filteredQuestions = this.filteredQuestions.concat(response.data.data)
          }
          this.totalFilteredQuestions = response.data.meta.total
          this.lastPage = response.data.meta.last_page
          if (typeof response.data.links === 'undefined' || response.data.links.next === null) {
            this.nextPage = ''
            return
          }
          this.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        })
        .catch(() => {
          this.loading = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.question-bank {
  padding-top: 110px;

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
          align-items: center;
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
