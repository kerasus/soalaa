
<template>
    <v-container class="konkoor-view" :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }" v-resize="updateWindowSize">
        <v-row :style="{ 'min-height': '100%' }">
            <v-col :md="5" class="questions" id="questions" :style="{ height: windowSize.y }">
                <!--                <div class="lesson">{{ currentLesson.title }}</div>-->
                <!--                <virtual-list style="overflow-y: auto;"-->
                <!--                              :data-key="'id'"-->
                <!--                              :data-sources="quiz.questions.list"-->
                <!--                              :data-component="item"-->
                <!--                              :keep="20"-->
                <!--                              :estimate-size="100"-->
                <!--                              ref="scroller"-->
                <!--                              class="questionss"-->
                <!--                />-->
                <DynamicScroller
                        :items="questions"
                        :min-item-size="70"
                        class="scroller questionss"
                        ref="scroller"
                        :emitUpdate="true"
                        @update="onScroll"
                >
                    <template v-slot="{ item, index, active }">
                        <DynamicScrollerItem
                                :item="item"
                                :active="active"
                                :data-index="index"
                        >
                            <Item :source="item" />
                        </DynamicScrollerItem>
                    </template>
                </DynamicScroller>
            </v-col>
            <v-col :md="7" class="left-side-list">
                <v-row>
                    <v-col class="px-10 py-0 d-flex justify-space-between" dir="ltr">
                        <div class="rounded-b-xl rounded-r-xl">
                            <v-menu bottom :offset-y="true" class="rounded-b-xl rounded-r-xl">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn large tile v-bind="attrs" v-on="on" elevation="0" class="pl-3" >
                                        <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                                        <span v-if="user.last_name">
                                            {{ user.last_name }}
                                        </span>
                                        <span v-if="user.first_name">
                                            {{ user.first_name }}
                                        </span>
                                    </v-btn>
                                </template>
                                <v-card max-width="375" class="mx-auto" rounded="b-xl r-xl">
                                    <TopMenu_OnlineQuiz/>
                                </v-card>
                            </v-menu>
                        </div>
                        <v-btn icon @click="changeView('alaa')">
                            <v-icon>mdi-table-split-cell</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <BubbleSheet :info="{ type: 'pasokh-barg' }" @clickChoice="choiceClicked" @scrollTo="scrollTo" :delay-time="0" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="timer-row">
            <v-col>
                <Timer :daftarche="'عمومی'" :quiz-started-at="1607963897" :daftarche-end-time="1607999897" :height="100"></Timer>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import $ from 'jquery'
    import '@/assets/scss/markdownKatex.scss'
    // import Vue from 'vue'
    // import VirtualList from 'vue-virtual-scroll-list'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import Item from '@/components/OnlineQuiz/Quiz/ViewTypes/components/question'
    import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize } from '@/mixin/Mixins'
    import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import {Exam} from "@/models/Exam";
    import Assistant from "@/plugins/assistant";
    import { TopMenu_OnlineQuiz } from '@/components/Menu/Menus'
    // Vue.component('DynamicScroller', DynamicScroller)
    // Vue.component('DynamicScrollerItem', DynamicScrollerItem)

    export default {
        name: 'KonkoorView',
        mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize],
        components: {
            Timer,
            TopMenu_OnlineQuiz,
            // 'virtual-list': VirtualList,
            BubbleSheet,
            DynamicScroller,
            DynamicScrollerItem,
            Item
        },
        data () {
            return {
                quizData: new Exam(),
                item: Item,
                lastTimeScrollRange: { start: 0, end: 29 },
                scrollState: 'not scrolling',
                timePassedSinceLastScroll: 0,
                setIntervalCallback: null,
                renderedQuestions: { startIndex: 0, endIndex: 0 },
                questions: []
            }
        },
        methods: {
            changeAppBarAndDrawer (state) {
                this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
            },
            changeCurrentQuestionIfScrollingIsDone () {
                // console.log('time since last: ', this.timePassedSinceLastScroll)
                // if (startIndex !== this.lastTimeScrollRange.start || endIndex !== this.lastTimeScrollRange.end) {
                //     this.lastTimeScrollRange.start = startIndex
                //     this.lastTimeScrollRange.end = endIndex
                // }
                if (this.timePassedSinceLastScroll >= 1000) {
                    this.changeCurrentQuestionToFirstQuestionInView()
                    this.timePassedSinceLastScroll = 0
                    this.scrollState = 'not scrolling'
                    clearInterval(this.setIntervalCallback)
                    this.setIntervalCallback = null
                }
                this.timePassedSinceLastScroll += 250
            },
            onScroll (startIndex, endIndex) {

                this.renderedQuestions = { startIndex, endIndex }
                if (this.scrollState === 'not scrolling') {
                    this.setIntervalCallback = setInterval(() => {
                        this.changeCurrentQuestionIfScrollingIsDone()
                    }, 250)
                    this.scrollState = 'scrolling'
                }
                this.timePassedSinceLastScroll = 0
            },
            changeCurrentQuestionToFirstQuestionInView () {
                const firstInViewQuestion = this.getFirstInViewQuestionNumber()
                if (firstInViewQuestion.id === this.currentQuestion.id) {
                    return
                }
                this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
            },
            // scrollTo (questionId) {
            //     if (this.quiz.questions.getQuestionById(questionId).isInView === false) {
            //         const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
            //         this.$refs.scroller.scrollToIndex(questionIndex)
            //         for (let i = 1; i < 4; i++) {
            //             setTimeout(() => {
            //                 this.$refs.scroller.scrollToIndex(questionIndex)
            //             },
            //             500 / Math.ceil(this.quiz.questions.list.length / 100) * i)
            //         }
            //     }
            // },
            scrollTo (questionId) {
                const questionIndex = this.getQuestionIndexById(questionId)
                this.$refs.scroller.scrollToItem(questionIndex)
                for (let i = 1; i < 4; i++) {
                    setTimeout(() => {
                            this.$refs.scroller.scrollToItem(questionIndex)
                        },
                        333 * i)
                }
            },
            // onIntersect (entries) {
            //     this.quiz.questions.getQuestionById(entries[0].target.id).isInView = (entries[0].intersectionRatio >= 0.5)
            // },
            // ToDo: check for removal
            getFirstInViewQuestionNumber () {
                // console.log(this.renderedQuestions.startIndex, this.renderedQuestions.endIndex, 'haha2')
                let firstQuestionInView
                for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
                    // console.log(i, ': ', this.questions[i].isInView)
                    if (this.questions[i].isInView === true) {
                        firstQuestionInView = this.questions[i]
                        break
                    }
                }
                if (firstQuestionInView && firstQuestionInView.id !== null) {
                    return firstQuestionInView
                } else {
                    return false
                }
            },
            // isThisFirstQuestionInView (questionId) {
            //     if (this.getFirstInViewQuestionNumber().id === questionId) {
            //         return true
            //     }
            //     return false
            // },
            // getQuestionNumber (question) {
            //     if (question.isInView === false) {
            //         return '.question:nth-child('+(this.quiz.questions.getQuestionIndexById(question.id) + 2)+')'
            //     }
            //     return ''
            // },
            choiceClicked (questionId, choiceId) {
                // console.log('loadFirstActiveQuestionIfNeed->choiceClicked')
                this.scrollTo(questionId)
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
            },
            // changeCurrentQuestion (question) {
            //     if (question.id !== this.currentQuestion.id) {
            //         this.currentQuestion = question
            //     }
            // }
        },
        mounted () {
            $('.questions').height(this.windowSize.y)
            $('.questionss').height(this.windowSize.y)
            $('.left-side-list').height(this.windowSize.y - 24)
            if (this.currentQuestion.id === null) {
                this.loadFirstQuestion()
            }
            this.scrollTo(this.currentQuestion.id)
            this.changeAppBarAndDrawer(false)
        },
        created () {

            // this.quizData.show(this.$route.params.quizId).then((response) => {
            // }).catch((error) => {
            // })
            let that = this
            this.startExam(this.$route.params.quizId)
                .then(() => {
                    that.loadFirstActiveQuestionIfNeed()
                    that.$store.commit('AppLayout/updateOverlay', false)
                })
                .catch( (error) => {
                    Assistant.reportErrors(error)
                    that.$notify({
                        group: 'notifs',
                        title: 'توجه!',
                        text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
                        type: 'error'
                    })
                    // ToDo: uncomment
                    // that.$router.push({ name: 'user.exam.list'})
                })
            if (this.windowSize.x > 959) {
                this.changeAppBarAndDrawer(false)
            } else {
                this.$router.push({ name: 'onlineQuiz.alaaView', params: { quizId: 313, questNumber: this.$route.params.quizId } })
            }
            this.questions = this.getCurrentExamQuestionsInArray()

            // this.renderQuestionBody()
        },
        destroyed() {
            this.changeAppBarAndDrawer(true)
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
        }
    }
</script>

<style scoped>
    .lesson {
        height: 50px;
        border-bottom: 1px solid #ececec;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .questionss {
        overflow: hidden;
    }

    .scroller {
        height: 100%;
    }

    .timer-row {
        width: calc(58% - 150px);
        position: absolute;
        bottom: 1px;
        left: 100px;
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
        overflow-y: hidden;
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
        color: var(--success-1);
        font-size: 20px;
    }

    .choice:hover {
        background: #e1e1e1;
    }

    .konkoor-view {
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

    .konkoor-view strong em strong {
        display: none;
        font-weight: normal;
        font-style: normal;
        text-decoration: none !important;
    }

    .timer-row .col {
        padding: 0;
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
