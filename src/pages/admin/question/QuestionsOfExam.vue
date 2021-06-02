<template>
  <v-container
    v-resize="updateWindowSize"
    class="quiz-editor"
    :fluid="true"
    :style="{ height: '100%', background: 'rgb(244, 244, 244)' }"
  >
    <v-row :style="{ 'min-height': '100%' }">
      <!--            <v-col v-if="quiz.questions.list.length > 40" :md="5" class="questions" :style="{ height: windowSize.y }">-->
      <!--                <virtual-list style="overflow-y: auto;"-->
      <!--                              :data-key="'id'"-->
      <!--                              :data-sources="quiz.questions.list"-->
      <!--                              :data-component="item"-->
      <!--                              class="questions"-->
      <!--                              ref="scroller"-->
      <!--                />-->
      <!--            </v-col>-->
      <v-col
        ref="questionsColumn"
        :md="11"
        class="questions"
      >
        <!--                <virtual-list style="overflow-y: auto;"-->
        <!--                              :data-key="'id'"-->
        <!--                              :data-sources="quiz.questions.list"-->
        <!--                              :data-component="item"-->
        <!--                              ref="scroller"-->
        <!--                              class="questionss"-->
        <!--                />-->

        <!--                <item v-for="itemm in quizData.questions.list" :key="itemm.id" :source="itemm" :exam-id="$route.params.quizId" :sub-category="quizData.sub_categories" />-->

        <DynamicScroller
          ref="scroller"
          :items="quizData.questions.list"
          :min-item-size="70"
          class="scroller questionss"
          :emit-update="true"
          @update="onScroll"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
            >
              <Item
                :source="item"
                :consider-active-category="false"
                :questions-column="$refs.questionsColumn"
                :exam-id="$route.params.quizId"
                :sub-category="quizData.sub_categories"
                @inView="test"
              />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </v-col>
      <v-col
        v-if="false"
        :md="7"
        class="left-side-list"
      >
        <v-row>
          <v-col
            class="px-10 py-0 d-flex justify-space-between"
            dir="ltr"
          >
            <div class="rounded-b-xl rounded-r-xl">
              <v-menu bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    large
                    tile
                    v-bind="attrs"
                    elevation="0"
                    v-on="on"
                  >
                    <v-icon
                      class="mr-2"
                      :size="30"
                      color="#666"
                    >
                      mdi-account-circle
                    </v-icon>
                    سید مصطفی
                    کاظمی
                  </v-btn>
                </template>
                <v-card
                  max-width="375"
                  class="mx-auto"
                  rounded="b-xl r-xl"
                >
                  <v-img
                    style="background-color: #e8e8e8;"
                    src="/img/account-circle.svg"
                    width="300px"
                    height="300px"
                    dark
                  >
                    <v-row class="fill-height">
                      <v-card-title v-if="false">
                        <v-btn
                          dark
                          icon
                          :to="{ name: 'dashboard'}"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>

                        <v-spacer />

                        <v-btn
                          dark
                          icon
                          class="mr-4"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn
                          dark
                          icon
                        >
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-card-title>

                      <v-spacer />

                      <v-card-title
                        v-if="false"
                        class="white--text pl-12 pt-12"
                      >
                        <div class="display-1 pl-12 pt-12">
                          Ali Conners
                        </div>
                      </v-card-title>
                    </v-row>
                  </v-img>
                  <v-btn
                    style="width: 100%;background: #5cbf60;color: white;letter-spacing: inherit;"
                    large
                    tile
                    elevation="0"
                  >
                    ارسال پاسخنامه
                  </v-btn>
                </v-card>
              </v-menu>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <BubbleSheet
              :qui-z="quizData.questions.list"
              :info="{ type: 'pasokh-nameh' }"
              @scrollTo="scrollTo"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import $ from 'jquery'
    import axios from 'axios'
    import Item from '@/components/QuizEditor/Question'
    // import VirtualList from 'vue-virtual-scroll-list'
    import '@/assets/scss/markdownKatex.scss'
    import Vue from 'vue'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import {Exam} from '@/models/Exam'
    import {QuestionList} from "@/models/Question";
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";
    import API_ADDRESS from "@/api/Addresses";

    Vue.component('DynamicScroller', DynamicScroller)
    Vue.component('DynamicScrollerItem', DynamicScrollerItem)

    export default {
        name: 'QuestionsOfExam',
        components: {
            Item,
            // 'virtual-list': VirtualList,
            BubbleSheet
        },
        mixins: [mixinQuiz, mixinWindowSize],

        data () {
            return {
                quizData: new Exam(),
                item: Item,
                lastTimeScrollRange: { start: 0, end: 29 },
                quizList: [],
                subCategoriesList: new QuestSubcategoryList(),

                inView: [],
                scrollState: 'not scrolling',
                setIntervalCallback: null,
                timePassedSinceLastScroll: 0,
                renderedQuestions: { startIndex: 0, endIndex: 0 },
            }
        },
        watch: {
            'windowSize.y': function () {
                $('.questions').height(this.windowSize.y)
                $('.questionss').height(this.windowSize.y)
                $('.left-side-list').height(this.windowSize.y - 24)
            },
            'windowSize.x': function () {
                // const padding = this.questionListPadding()
                // $('.questions-list').css({ 'padding-right': padding })
                // $('.questions-list').css({ 'padding-left': padding })
                $('.questions-list').height(this.questionListHeight())
                this.$store.commit('AppLayout/updateDrawer', false)
            }
        },
        mounted () {
            $('.questions').height(this.windowSize.y)
            $('.left-side-list').height(this.windowSize.y - 24)
            $('.questionss').height(this.windowSize.y)
        },
        created () {
            this.changeAppBarAndDrawer(false)
            this.loadQuizDataAndSubCategories()
        },
        destroyed() {
            this.changeAppBarAndDrawer(true)
        },
        methods: {
            onScroll (startIndex, endIndex) {
                this.renderedQuestions = { startIndex, endIndex }
                if (this.scrollState === 'not scrolling') {
                    this.setIntervalCallback = setInterval(() => {
                        // this.changeCurrentQuestionIfScrollingIsDone()
                    }, 250)
                    this.scrollState = 'scrolling'
                }
                this.timePassedSinceLastScroll = 0
            },
            test (payload) {
                if (payload.isInView) {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            return
                        }
                    }
                    this.inView.push(payload.number)
                }
                else {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            this.inView.splice(i, 1)
                        }
                    }
                }
            },

            loadSubCategories (quizResponse) {
                const that = this
                this.subCategoriesList.fetch().then((response) => {
                    // that.quiz.sub_categories = new QuestSubcategoryList(response.data)
                    that.quizData.sub_categories = new QuestSubcategoryList(response.data)
                    let questions = quizResponse.data.data
                    that.sortQuestions (questions)
                    that.quizData.questions = new QuestionList(questions)
                    // that.quiz = new Exam(that.quizData)
                    that.QuIzDaTa = new Exam(that.quizData)
                })
            },
            loadQuizDataAndSubCategories () {
                const that = this
                axios.post(API_ADDRESS.exam.examQuestion(this.$route.params.quizId))
                    .then((response) => {
                        that.loadSubCategories(response)
                    })
            },
            changeAppBarAndDrawer (state) {
                this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
            },
            getQuestionNumber (question) {
                if (question.isInView === false) {
                    return '.question:nth-child('+(this.quiz.questions.getQuestionIndexById(question.id) + 2)+')'
                }
                return ''
            },
            scrollTo (questionId) {
                if (this.quiz.questions.getQuestionById(questionId).isInView === false) {
                    const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
                    this.$refs.scroller.scrollToIndex(questionIndex)
                    for (let i = 1; i < 4; i++) {
                        setTimeout(() => {
                                this.$refs.scroller.scrollToIndex(questionIndex)
                            },
                            500 / Math.ceil(this.quiz.questions.list.length / 100) * i)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .questionss {
        overflow-x: hidden
    }

    .scroller {
        height: 100%;
    }

    .buttons-group {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .left-side-list {
        overflow-y: auto;
    }

    .question-body {
        margin-bottom: 20px;
        line-height: 40px;
    }

    .questions {
        background: #fff;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        /*padding-right: 25px;*/
        padding: 0;
    }

    .question {
        padding: 10px 30px 10px 0;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    .choice {
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        display: flex;
        align-items: flex-start;
    }

    .choice.active::before {
        content: "\F012C";
        display: inline-block;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 10px;
        color: #4caf50;
        font-size: 20px;
    }

    .choice:hover {
        background: #e1e1e1;
    }

    .quiz-editor {
        padding: 0;
    }

    .test {
        margin: 20px;
        border-bottom: 1px solid;
    }
</style>

<style>
    .base.textstyle.uncramped {
        display: flex;
        flex-wrap: wrap;
    }

    .v-application p {
        margin-bottom: 4px;
    }

    html {
        overflow-y: auto;
    }

    .choice p {
        display: inline-block;
        margin-right: 5px;
    }

    .question-body p:first-child {
        display: inline;
    }

    .katex-display {
        margin: 0;
    }
</style>
