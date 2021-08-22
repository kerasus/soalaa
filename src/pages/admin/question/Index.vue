<template>
  <v-row>
    <v-col v-if="montaTree">
      <v-toolbar
        class="fixed-bar"
        src="https://picsum.photos/1920/1080?random"
        color="yellow"
        height="110"
        elevate-on-scroll
      >
        <v-row
          no-gutters
          class="justify-center"
        >
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.majorId"
                  dense
                  :items="montaTree.major"
                  item-value="id"
                  item-text="name"
                  label="رشته"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.levelId"
                  dense
                  :items="montaTree.level"
                  item-value="id"
                  item-text="name"
                  label="مقطع"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.gradeId"
                  dense
                  :items="montaTree.grade"
                  item-value="id"
                  item-text="name"
                  label="پایه"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.majorGroupId"
                  dense
                  :items="montaTree.major"
                  item-value="id"
                  item-text="name"
                  label="گروه آموزشی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.moduleGroupId"
                  dense
                  :items="montaTree.moduleGroup"
                  item-value="id"
                  item-text="name"
                  label="گروه درسی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.moduleId"
                  dense
                  :items="montaTree.module"
                  item-value="id"
                  item-text="name"
                  label="درس"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.difficultyLevelId"
                  dense
                  :items="montaTree.difficultyLevels"
                  item-value="id"
                  item-text="name"
                  label="سختی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.originId"
                  dense
                  :items="montaTree.origins"
                  item-value="id"
                  item-text="name"
                  label="منبع"
                  clearable
                  rounded
                  solo
                >
                  <template v-slot:selection="data">
                    <v-chip>
                      <v-avatar left>
                        <v-img :src="data.item.pic" />
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item" />
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.pic">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <!-- eslint-disable vue/no-v-html -->
                        <v-list-item-title v-html="data.item.name" />
                        <!--eslint-enable-->
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.publishYearId"
                  dense
                  :items="montaTree.publishYears"
                  item-value="id"
                  item-text="name"
                  label="سال انتشار"
                  clearable
                  rounded
                  solo
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            md="3"
            class="pt-1"
          >
            <v-card>
              <v-row no-gutters>
                <v-col>
                  <v-chip
                    dark
                    class="ma-2"
                    color="deep-purple accent-4"
                  >
                    {{ totalFilteredQuestions }}
                  </v-chip>
                </v-col>
                <v-col class="d-flex align-center">
                  <v-btn
                    color="light-blue"
                    fab
                    small
                    dark
                    @click="sortQuestions"
                  >
                    <v-icon>mdi-sort-ascending</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="d-flex align-center">
                  <v-btn
                    color="light-blue"
                    fab
                    small
                    dark
                    @click="getQuestions(true)"
                  >
                    <v-icon>mdi-database-search</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-toolbar>

      <div :key="'questions-list-'+lastLoadTime">
        <v-card
          v-for="item in filteredQuestions"
          :key="item.id"
          elevation="3"
          class="mr-2 ml-2 mt-2 renderedPanel"
        >
          <v-card-text v-if="item">
            <v-card v-if="item.source_data.question">
              <v-card-text v-html="item.source_data.question" />
            </v-card>
            <v-row>
              <v-col md="10">
                <v-list dense>
                  <v-list-item-group color="primary">
                    <v-list-item v-if="item.source_data.choiceDescription1">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>1)</span>' + item.source_data.choiceDescription1"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription2">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>2)</span>' + item.source_data.choiceDescription2"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription3">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>3)</span>' + item.source_data.choiceDescription3"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription4">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>4)</span>' + item.source_data.choiceDescription4"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col md="2">
                <v-list dense>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(originItem, originIndex) in item.source_data.origins.questionOriginList"
                      :key="'originIndex_'+originIndex"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-if="originItem.origin">
                          <v-avatar>
                            <img
                              :src="originItem.origin.pic"
                              alt="origin.pic"
                            >
                          </v-avatar>
                          {{ originItem.origin.name }}
                        </v-list-item-title>
                        <v-list-item-content
                          v-if="originItem.publishYear"
                          v-html="originItem.publishYear.title"
                        />
                        <v-list-item-subtitle v-if="originItem.questionOrder">
                          شماره:
                          {{ originItem.questionOrder }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.difficultyLevel">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-badge :content="item.source_data.difficultyLevel.name">
                            <v-rating
                              background-color="green lighten-2"
                              color="green"
                              length="6"
                              readonly
                              size="25"
                              :value="item.source_data.difficultyLevel.value"
                            />
                          </v-badge>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-btn :to="{name: 'question.edit', params: { question_id: (item.id) ? item.id : item._id }}">
                          مشاهده
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
            <v-expansion-panels
              v-if="true"
              v-model="expanModel"
            >
              <v-expansion-panel v-if="item.source_data.answer">
                <v-expansion-panel-header>
                  پاسخ
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-html="item.source_data.answer" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-card-actions
            v-if="item"
            color="deep-purple darken-1"
          >
            <v-list dense>
              <v-list-item
                v-for="(topic, i) in item.source_data.topicList"
                :key="i"
              >
                <v-list-item-content>
                  <span>
                    <v-chip
                      v-if="topic.module && topic.module.grade && topic.module.grade.level"
                      dark
                      color="purple darken-4"
                    >
                      {{ topic.module.grade.level.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.grade"
                      dark
                      color="purple darken-4"
                    >
                      {{ topic.module.grade.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.majors"
                      dark
                      color="purple darken-3"
                    >
                      <span
                        v-for="(major, j) in topic.module.majors"
                        :key="'item_'+item.id+'major_'+j"
                      >{{ major.name }}</span>
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.moduleGroup"
                      dark
                      color="purple darken-2"
                    >
                      {{ topic.module.moduleGroup.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module"
                      dark
                      color="purple darken-1"
                    >
                      {{ topic.module.name }}
                    </v-chip>
                    <topic :topic="topic" />
                  </span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-actions>
        </v-card>
      </div>


      <scroll-loader
        :key="lastLoadTime"
        :loader-method="getQuestions"
        :loader-disable="disableLoadingList"
      >
        کمی صبر کنید...
      </scroll-loader>
      <v-overlay :value="loadingPage">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
    </v-col>
  </v-row>
</template>

<script>
  import Vue from 'vue'
  import ScrollLoader from 'vue-scroll-loader'
  import axios from 'axios'
  import TurndownService from 'turndown/lib/turndown.browser.umd'
  import topic from '@/components/Question/topic'
  import Assistant from "@/plugins/assistant";
  import API_ADDRESS from "@/api/Addresses";
  import $ from "jquery";
  Vue.use(ScrollLoader);

  export default {
    name: 'Index',
    components: {
      // InfiniteLoading,
      topic
    },
    data() {
      return {
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
        expanModel: 0,
      }
    },
    computed: {

    },
      created() {
      let that = this
          // axios.get('https://cdn.alaatv.com/upload/knowledgeTree.json')
          // .then((response) => {
          //     console.Log(response.data, 'respones')
          //     this.montaTree = response.data
          // })

          $.ajax({
                  type: 'GET',
                  url: 'https://cdn.alaatv.com/upload/knowledgeTree.json',
                  accept: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (response) {
                        console.log('respones', response)
                    that.montaTree = response
                  },
                  error: function () {
                      // Assistant.reportErrors({location: 'GetQuestionsOfExam', message: "can't get exam file", data: {jqXHR, textStatus, errorThrown}})
                      // Assistant.handleAxiosError("can't get exam file")
                      // reject({jqXHR, textStatus, errorThrown})
                  }
              }
          );
      },
    methods: {
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
        let sortList = Array.prototype.sort.bind(this.filteredQuestions)
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
        this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...'})
      },
      hideLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: ''})
      },
      getQuestions (clear) {
        let that = this
        if (clear === true) {
          that.disableLoadingList = false
          that.nextPage = ''
          that.totalFilteredQuestions = '...'
        }
        that.showLoading()
        axios.get(API_ADDRESS.question.indexMonta + that.nextPage, {
          params: this.filterQuestions
        })
        .then( (response => {
          if (clear === true) {
            that.filteredQuestions = response.data.data
          } else {
            that.filteredQuestions = that.filteredQuestions.concat(response.data.data)
          }

          that.totalFilteredQuestions = response.data.meta.total
          that.hideLoading()
          that.lastLoadTime = Date.now()
          if(typeof response.data.links === 'undefined' || response.data.links.next === null) {
            that.nextPage = ''
            that.disableLoadingList = true
            return
          }
          that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        }))
        .catch((error) => {
          Assistant.handleAxiosError(this.$toasted, error)
          that.hideLoading()
          that.lastLoadTime = Date.now()
        })
      },
    }
  }
</script>

<style scoped>
    .fixed-bar {
        position: sticky;
        position: -webkit-sticky; /* for Safari */
        top: 64px;
        z-index: 2;
    }
</style>

<style>
    .v-toolbar .v-text-field__details {
        display: none;
    }
    .v-toolbar .v-select .v-input__slot {
        margin-bottom: 0;
    }
</style>
