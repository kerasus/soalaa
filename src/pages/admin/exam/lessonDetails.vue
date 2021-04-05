<template>


    <v-container class="konkoor-view" :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }"
                 v-resize="updateWindowSize">
        <v-row :style="{ 'min-height': '100%' }">
            <v-col :md="5" class="questions" ref="questionsColumn" id="questions" :style="{ height: windowSize.y }">
                <DynamicScroller
                        v-if="true"
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
                            <Item :source="item" :questions-column="$refs.questionsColumn" @inView="test"/>
                        </DynamicScrollerItem>
                    </template>
                </DynamicScroller>

            </v-col>
                        <v-col :md="7" class="left-side-list" ref="leftSideList">
                            <v-row>
                                <v-col class="px-10 py-0 d-flex justify-space-between" dir="ltr">
                                    <div class="rounded-b-xl rounded-r-xl">
                                        <v-menu bottom :offset-y="true" class="rounded-b-xl rounded-r-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn large tile v-bind="attrs" v-on="on" elevation="0" class="pl-3">
                                                    <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                                                    <span v-if="user.last_name">
                                                        {{ user.last_name }}
                                                    </span>
                                                    <span v-if="user.first_name">
                                                        {{ user.first_name }}
                                                    </span>
                                                </v-btn>
                                            </template>
                                            <v-card v-if="false" max-width="375" class="mx-auto" rounded="b-xl r-xl">
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
                                <v-col v-if="false">
                                    <BubbleSheet :info="{ type: 'pasokh-barg' }" @clickChoice="choiceClicked" @scrollTo="scrollTo"
                                                 :delay-time="0"/>
                                </v-col>
                            </v-row>
                        </v-col>
        </v-row>
        <!--        <v-row class="timer-row">-->
        <!--            <v-col>-->
        <!--                <Timer :daftarche="'عمومی'" :quiz-started-at="1607963897" :daftarche-end-time="1607999897"-->
        <!--                       :height="100"></Timer>-->
        <!--            </v-col>-->
        <!--        </v-row>-->
    </v-container>

    <!--    <exam-questions-with-bubble-sheet :questions="questions"/>-->


    <!--        <v-dialog-->
    <!--                v-model="dialog"-->
    <!--                width="500"-->
    <!--        >-->
    <!--            <template v-slot:activator="{ on, attrs }">-->
    <!--                <v-btn-->
    <!--                        color="red lighten-2"-->
    <!--                        dark-->
    <!--                        fab-->
    <!--                        v-bind="attrs"-->
    <!--                        v-on="on"-->
    <!--                >-->
    <!--                    <v-icon>-->
    <!--                        mdi-alert-circle-->
    <!--                    </v-icon>-->
    <!--                </v-btn>-->
    <!--            </template>-->

    <!--            <v-card>-->
    <!--                <v-card-title class="headline grey lighten-2">-->
    <!--                    ثبت خطا-->
    <!--                </v-card-title>-->

    <!--                <v-card-text>-->
    <!--                    <error-report @clicked="onClickErrorSend" :items="items"/>-->
    <!--                </v-card-text>-->

    <!--                <v-divider></v-divider>-->

    <!--                <v-card-actions>-->
    <!--                    <v-spacer></v-spacer>-->
    <!--                    <v-btn-->
    <!--                            color="primary"-->
    <!--                            text-->
    <!--                            @click="dialog = false"-->
    <!--                    >-->
    <!--                        انصراف-->
    <!--                    </v-btn>-->
    <!--                </v-card-actions>-->
    <!--            </v-card>-->
    <!--        </v-dialog>-->

    <!--        <v-btn @click="generateReport">دانلود pdf</v-btn>-->
    <!--        <vue-html2pdf-->
    <!--                :show-layout="false"-->
    <!--                :float-layout="true"-->
    <!--                :enable-download="true"-->
    <!--                :preview-modal="true"-->
    <!--                :paginate-elements-by-height="1400"-->
    <!--                :pdf-quality="2"-->
    <!--                :manual-pagination="false"-->
    <!--                pdf-format="a4"-->
    <!--                pdf-orientation="landscape"-->
    <!--                pdf-content-width="800px"-->
    <!--                ref="html2Pdf"-->
    <!--        >-->
    <!--            <section slot="pdf-content">-->
    <!--test-->
    <!--            </section>-->
    <!--        </vue-html2pdf>-->


</template>

<script>
    // import ErrorReport from "@/components/errorReport";
    // import VueHtml2pdf from 'vue-html2pdf'
    // import ExamQuestionsWithBubbleSheet from "@/components/OnlineQuiz/Quiz/examQuestionsWithBubbleSheet";
    import {mixinQuiz, mixinWindowSize,mixinAuth} from '@/mixin/Mixins'
    import API_ADDRESS from "@/api/Addresses";
    import {QuestionList} from "@/models/Question";
    import axios from "axios";
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
    import Item from '@/components/OnlineQuiz/Quiz/ViewTypes/components/question'
    import {Exam} from "@/models/Exam";
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import { TopMenu_OnlineQuiz } from '@/components/Menu/Menus'


    // import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'


    export default {
        name: "lessonDetails",
        mixins: [mixinQuiz, mixinWindowSize,mixinAuth],
        // components: {ExamQuestionsWithBubbleSheet},
        components: {
            DynamicScroller,
            DynamicScrollerItem,
            Item,BubbleSheet,
            TopMenu_OnlineQuiz
            // Timer
        },

        data: () => ({
            quizData: new Exam(),
            item: Item,
            lastTimeScrollRange: {start: 0, end: 29},
            scrollState: 'not scrolling',
            timePassedSinceLastScroll: 0,
            setIntervalCallback: null,
            renderedQuestions: {startIndex: 0, endIndex: 0},
            dialog: false,
            items: [
                'خارج از بودجه بندی آزمون ',
                'خارج از چارچوب کتاب درسی',
                'دارای غلط تایپی'
            ],
            questions: [],
            inView: []
        }),
        methods: {
            updateWindowSize() {
                this.$store.commit('AppLayout/updateWindowSize', {x: window.innerWidth, y: window.innerHeight})
            },
            changeAppBarAndDrawer(state) {
                this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
            },
            changeCurrentQuestionIfScrollingIsDone() {
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
            changeCurrentQuestionToFirstQuestionInView() {
                const firstInViewQuestion = this.getFirstInViewQuestionNumber()
                if (firstInViewQuestion.id === this.currentQuestion.id) {
                    return
                }
                // this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
            },
            scrollTo(questionId) {
                const questionIndex = this.getQuestionIndexById(questionId)
                console.log(questionIndex)
                this.$refs.scroller.scrollToItem(questionIndex)
                for (let i = 1; i < 4; i++) {
                    setTimeout(() => {
                            this.$refs.scroller.scrollToItem(questionIndex)
                        },
                        333 * i)
                }
            },
            getFirstInViewQuestionNumber() {
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
            choiceClicked(questionId) {
                this.scrollTo(questionId)
                // this.changeQuestion(questionId)
            },
            setHeights() {
                this.$refs.questionsColumn.style.height = this.windowSize.y + 'px'
                if (this.$refs.scroller.$el) {
                    this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
                }
                // this.$refs.leftSideList.style.height = (this.windowSize.y - 24) + 'px'
            },
            test(payload) {
                console.log(payload.number)
                if (payload.isInView) {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            return
                        }
                    }
                    this.inView.push(payload.number)
                } else {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            this.inView.splice(i, 1)
                        }
                    }
                }
            },
            onScroll(startIndex, endIndex) {
                this.renderedQuestions = {startIndex, endIndex}
                if (this.scrollState === 'not scrolling') {
                    this.setIntervalCallback = setInterval(() => {
                        this.changeCurrentQuestionIfScrollingIsDone()
                    }, 250)
                    this.scrollState = 'scrolling'
                }
                this.timePassedSinceLastScroll = 0
            },
            onClickErrorSend(value) {
                console.log(value)
            },
            generateReport() {
                this.$refs.html2Pdf.generatePdf()
            }
        },
        created() {
            const url = API_ADDRESS.exam.examQuestion(this.$route.params.quizId)
            axios.get(url)
                .then((response) => {
                    console.log(response)

                    this.quizData.questions = new QuestionList(response.data.data).list
                    this.saveCurrentExamQuestions(this.quizData.questions)
                    // this.quiz = new Exam(this.quizData)


                    this.questions = this.getCurrentExamQuestionsInArray()


                    console.log(this.quizData.questions)

                })

        },
        watch: {
            'windowSize.y': function () {
                this.setHeights()
                // $('.questions').height(this.windowSize.y)
                // $('.questionss').height(this.windowSize.y)
                // $('.left-side-list').height(this.windowSize.y - 24)
            },
            'windowSize.x': function () {
                // const padding = this.questionListPadding()
                // $('.questions-list').css({ 'padding-right': padding })
                // $('.questions-list').css({ 'padding-left': padding })
                // $('.questions-list').height(this.questionListHeight())
                this.$store.commit('AppLayout/updateDrawer', false)
            }
        },
        mounted() {
            this.setHeights()
            if (this.currentQuestion.id === null) {
                // this.loadFirstQuestion()
            }
            this.scrollTo(this.currentQuestion.id)
            this.changeAppBarAndDrawer(false)
        },
    }
</script>

<style scoped>

</style>
