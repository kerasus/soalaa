<template>
    <v-container class="konkoor-view" :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }" v-resize="updateWindowSize">

        <div @mousemove="resizing" @mouseup="endResize">
            <div class="ghostbar" ref="ghostbar" v-show="dragging">
            </div>
            <div class="sidebar" ref="sidebar">
                <span></span>
                <div class="dragbar" ref="dragbar" @mousedown="startResize">
                    <v-icon>mdi-drag-vertical-variant</v-icon>
                </div>
<!--                <v-col   :md="7" class="left-side-list" ref="leftSideList">-->
                <v-col >
                    <BubbleSheet ref="bubbleSheetC"  :style="{ height: 3740 }"  :info="{ type: 'pasokh-barg' }" @clickChoice="choiceClicked" @scrollTo="scrollTo" :delay-time="0" />
                </v-col>
<!--                </v-col>-->
            </div>
            <div class="main" ref="main">
                <div  :cols="8" class="questions" ref="questionsColumn" id="questions" >
                    <DynamicScroller
                            :items="quizData.questions.list"
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
                                <Item :source="item"
                                      :consider-active-category="false"
                                      :questions-column="$refs.questionsColumn"
                                      @inView="test"
                                      :exam-id="$route.params.quizId"
                                      :sub-category="quizData.sub_categories"
                                />
                            </DynamicScrollerItem>
                        </template>
                    </DynamicScroller>
                </div>
            </div>
        </div>
        <v-row  :style="{ 'min-height': '100%' }">
        </v-row>
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
    import { mixinAuth, mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet"
    import API_ADDRESS from "@/api/Addresses";
    import {QuestionList} from "@/models/Question";
    import axios from "axios";
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
    // import Item from '@/components/OnlineQuiz/Quiz/ViewTypes/components/question'
    import Item from '@/components/QuizEditor/Question'
    import {Exam} from "@/models/Exam";
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";





    export default {
        name: "lessonDetails",
        mixins: [mixinAuth, mixinQuiz, mixinWindowSize],
        // components: {ExamQuestionsWithBubbleSheet},
        components: {
            BubbleSheet,
            DynamicScroller,
            DynamicScrollerItem,
            Item
        },
        data: () => ({
            bubbleSheet:800,
            dragging: false,
            quizData: new Exam(),
            subCategoriesList: new QuestSubcategoryList(),
            item: Item,
            lastTimeScrollRange: { start: 0, end: 29 },
            scrollState: 'not scrolling',
            timePassedSinceLastScroll: 0,
            setIntervalCallback: null,
            renderedQuestions: { startIndex: 0, endIndex: 0 },
            dialog: false,
            items: [
                'خارج از بودجه بندی آزمون ',
                'خارج از چارچوب کتاب درسی',
                'دارای غلط تایپی'
            ],
            inView: [],
            windowVisible: true
        }),
        methods: {
            questionListHeight() {
                // box is a col-7 with 12px padding
                const boxSize = this.$refs.bubbleSheet.clientWidth - 24
                // each group width is 140px
                const horizontalGroupAmounts = Math.floor(boxSize / 140)
                const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
                return verticalGroupAmount * 182 + 20
            },
            startResize(e) {
                e.preventDefault();
                this.dragging = true;
            },
            resizing(e) {
                e.preventDefault();

                if (this.dragging){
                    this.$refs.ghostbar.style.left = (e.pageX + 2) + 'px'
                }
            },
            endResize(e) {
                if (!this.dragging) {
                    return
                }

                this.$refs.sidebar.style.width = (e.pageX + 2) + 'px'

                this.$refs.main.style.left = (e.pageX + 2) + 'px'

                // document.getElementById(document).unbind('mousemove');
                this.dragging = false;
                this.$store.commit('AppLayout/updateBubbleSize', e.pageX + 2)
                this.$refs.bubbleSheetC.changeWidth()



                // this.bubbleSheet  = (e.pageX + 2)
                console.log('p',this.bubbleSheet)

            },
            updateWindowSize() {
                this.$store.commit('AppLayout/updateWindowSize', { x: window.innerWidth, y: window.innerHeight })
                // this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            },
            updateLeftColumnSize(){

            },
            updateRightColumnSize(){

            },
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
            changeCurrentQuestionToFirstQuestionInView () {
                // const firstInViewQuestion = this.getFirstInViewQuestionNumber()
                // if (firstInViewQuestion.id === this.currentQuestion.id) {
                //     return
                // }
                // this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
            },
            scrollTo (questionId) {
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
            getFirstInViewQuestionNumber () {
                // console.log(this.renderedQuestions.startIndex, this.renderedQuestions.endIndex, 'haha2')
                // let firstQuestionInView
                // for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
                //     // console.log(i, ': ', this.quizData.questions.list[i].isInView)
                //     if (this.quizData.questions.list[i].isInView === true) {
                //         firstQuestionInView = this.quizData.questions.list[i]
                //         break
                //     }
                // }
                // if (firstQuestionInView && firstQuestionInView.id !== null) {
                //     return firstQuestionInView
                // } else {
                //     return false
                // }
            },
            choiceClicked (questionId) {
                this.scrollTo(questionId)
                // this.changeQuestion(questionId)
            },
            setHeights() {
                this.$refs.questionsColumn.style.height =( this.windowSize.y - 24 )+'px'
                if (this.$refs.scroller && this.$refs.scroller.$el) {
                    this.$refs.scroller.$el.style.height = ( this.windowSize.y - 24 ) +'px'
                }
                if (this.$refs.leftSideList) {
                    this.$refs.leftSideList.style.height = (this.windowSize.y - 24)+'px'
                }
            },
            test (payload) {
                console.log(payload.number)
                // if (payload.isInView) {
                //     for (let i = 0; i < this.inView.length; i++) {
                //         if (this.inView[i] === payload.number) {
                //             return
                //         }
                //     }
                //     this.inView.push(payload.number)
                // }
                // else {
                //     for (let i = 0; i < this.inView.length; i++) {
                //         if (this.inView[i] === payload.number) {
                //             this.inView.splice(i, 1)
                //         }
                //     }
                // }
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
                axios.post(API_ADDRESS.exam.examQuestion(this.$route.params.quizId), {
                    sub_categories: [this.$route.params.lessonId]
                })
                .then((response) => {
                    if (response.data.data.length) {
                        that.loadSubCategories(response)
                    } else {
                        this.$router.push({ name: 'onlineQuiz.exams' })
                    }

                })

            },
        },
        created() {
            this.loadQuizDataAndSubCategories()
            // axios.get(API_ADDRESS.exam.examQuestion(this.$route.params.quizId))
            //     .then((response) => {
            //         this.saveCurrentExamQuestions(new QuestionList(response.data.data).list)
            //         this.quizData.questions = this.getCurrentExamQuestionsInArray()
            //         console.log(this.quizData.questions.list[0])
            //     })
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
        mounted () {
            this.setHeights()
            // if (this.currentQuestion.id === null) {
            //     this.loadFirstQuestion()
            // }
            this.scrollTo(this.currentQuestion.id)
            this.changeAppBarAndDrawer(false)
        },
    }
</script>

<style scoped>
    .resizable-content {
        background-position: top left;
        width: 150px;
        height: 150px;
        padding: 0;
        border: 1px solid #003eff;
        background: #007fff;
        font-weight: normal;
        color: #ffffff;
        position: relative;
    }


    body, html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .main {
        margin-left: 15px;
        float: right;
        position: absolute;
        height: 200px;
        right: 0;
        left: 850px;
        margin-top: 10px;

    }

    .sidebar {
        margin-top: 10px;
        width: 800px;
        float: left;
        height: 1200px;
        display: flex;
    }

    .dragbar {
        background-color: #d6d6d6;
        height: 100%;
        float: right;
        width: 20px;
        cursor: col-resize;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ghostbar {
        margin-top: 10px;
        width: 3px;
        background-color: #000;
        opacity: 0.5;
        cursor: col-resize;
        z-index: 999;
        position: absolute;
        height: 100%;
    }
</style>
