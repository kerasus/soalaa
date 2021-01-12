<template>
    <v-container class="quiz-editor" :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }" v-resize="updateWindowSize">
        <v-row :style="{ 'min-height': '100%' }">
            <v-col :md="5" class="questions" :style="{ height: windowSize.y }">
                <virtual-list style="overflow-y: auto;"
                              :data-key="'id'"
                              :data-sources="quiz.questions.list"
                              :data-component="item"
                              class="questions"
                              ref="scroller"
                />
            </v-col>
            <v-col :md="7" class="left-side-list">
                <v-row>
                    <v-col class="px-10 py-0 d-flex justify-space-between" dir="ltr">
                        <div class="rounded-b-xl rounded-r-xl">
                            <v-menu bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        large
                                        tile
                                        v-bind="attrs"
                                        v-on="on"
                                        elevation="0"
                                    >
                                        <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
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

                                                <v-spacer></v-spacer>

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

                                            <v-spacer></v-spacer>

                                            <v-card-title v-if="false" class="white--text pl-12 pt-12">
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
                                        ثبت و پایان آزمون
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <BubbleSheet :info="{ type: 'pasokh-barg' }" @clickChoice="choiceClicked" @scrollTo="scrollTo"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    // import FakeQuizData from "@/plugins/fakeQuizData";
    import 'github-markdown-css/github-markdown.css'
    import $ from 'jquery'
    import '@/assets/scss/markdownKatex.scss'
    import Vue from 'vue'
    import VirtualList from 'vue-virtual-scroll-list'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import Item from './Question'
    import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import BubbleSheet from "./BubbleSheet";
    import {Quiz, QuizList} from "@/models/Quiz";
    import {QuestionList} from "@/models/Question";
    Vue.component('DynamicScroller', DynamicScroller)
    Vue.component('DynamicScrollerItem', DynamicScrollerItem)
    var md = require('markdown-it')(),
        mk = require('markdown-it-katex')
    md.use(mk);

    export default {
        name: 'KonkoorView',
        mixins: [mixinQuiz, mixinWindowSize],
        components: {
            'virtual-list': VirtualList,
            BubbleSheet
        },
        data () {
            return {
                quizData: new Quiz(),
                item: Item,
                lastTimeScrollRange: { start: 0, end: 29 },
                quizList: []
            }
        },
        methods: {
            scrollTo (questionId) {
                const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
                this.$refs.scroller.scrollToIndex(questionIndex)
                for (let i = 1; i <= Math.ceil(this.quiz.questions.list.length / 100); i++) {
                    setTimeout(() => {
                            this.$refs.scroller.scrollToIndex(questionIndex)

                        },
                        500 / Math.ceil(this.quiz.questions.list.length / 100) * i)
                }
            },
            onIntersect (entries) {
                this.quiz.questions.getQuestionById(entries[0].target.id).isInView = (entries[0].intersectionRatio >= 0.5)
            },
            // ToDo: check for removal
            // getFirstInViewQuestionNumber () {
            //     let firstQuestionInView = this.quiz.questions.list.find( (item)=> {
            //         return item.isInView === true
            //     })
            //     if (firstQuestionInView) {
            //         return firstQuestionInView.order + 1
            //     } else {
            //         return false
            //     }
            // },
            // isThisFirstQuestionInView (questionId) {
            //     if (this.getFirstInViewQuestionNumber().id === questionId) {
            //         return true
            //     }
            //     return false
            // },
            getQuestionNumber (question) {
                if (question.isInView === false) {
                    return '.question:nth-child('+(this.quiz.questions.getQuestionIndexById(question.id) + 2)+')'
                }
                return ''
            },
            choiceClicked (questionId) {
                this.scrollTo(questionId)
            },
            changeCurrentQuestion (question) {
                if (question.id !== this.currentQuestion.id) {
                    this.currentQuestion = question
                }
            }
        },
        mounted () {
            $('.questions').height(this.windowSize.y)
            $('.left-side-list').height(this.windowSize.y - 24)
            this.scrollTo(this.currentQuestion.id)
        },
        created () {
            this.$store.commit('updateAppbar', false)
            this.$store.commit('updateDrawer', false)
            const that = this
            this.quizData.show(this.$route.params.quizId, '/api/3a/exam-question/attach/show').then((response) => {
                $.getJSON(response.data.data.questions_file_url, function(data) {
                    that.quizData = response.data.data
                    console.log(response.data.data)
                    that.quizData.questions = new QuestionList(data)
                    that.loadQuiz()
                })
                new QuizList().fetch().then((response) => {
                    this.quizList = response.data.data
                    console.log(response.data.data)
                })
            }).catch((error) => {
                console.log(error)
            })




            // this.renderQuestionBody()
        },
        watch: {
            'windowSize.y': function () {
                $('.questions').height(this.windowSize.y)
                $('.left-side-list').height(this.windowSize.y - 24)
            },
            'windowSize.x': function () {
                // const padding = this.questionListPadding()
                // $('.questions-list').css({ 'padding-right': padding })
                // $('.questions-list').css({ 'padding-left': padding })
                $('.questions-list').height(this.questionListHeight())
                this.$store.commit('updateDrawer', false)
            }
        }
    }
</script>

<style scoped>
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

    .question-body p {
        display: inline;
    }

    .katex-display {
        margin: 0;
    }
</style>
