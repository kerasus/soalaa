<template>
    <div>
        <v-container :fluid="true" class="quiz-page" :style="{ height: '100%' }">
            <v-row :style="{ 'min-height': '100%' }">
                <v-col :md="12" class="question-container" :style="{ 'min-height': '100%' }">
                    <v-sheet class="d-flex align-stretch" width="100%" color="#f4f4f4" :style="{ 'min-height': '100%' }">
                        <v-row>
                            <v-col :md="1" class="d-md-flex justify-center align-center d-none">
                                <v-btn :min-width="64" class="px-0" :height="64" @click="goToPrevQuestion" icon>
                                    <v-icon :size="40">mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col :md="10" class="px-md-0 px-10">
                                <v-row class="question-header">
                                    <div class="question-number">
                                        <p>
                                            {{ currentLessons.title }}
                                            -
                                            سوال شماره
                                            {{ getQuestionNumberFromId(currentQuestion.id) }}
                                        </p>
                                    </div>
                                    <div class="question-buttons">
                                        <v-btn icon @click="changeState('circle')">
                                            <v-icon v-if="currentQuestion.state !== 'circle'" color="#888" size="30">mdi-checkbox-blank-circle-outline</v-icon>
                                            <v-icon v-if="currentQuestion.state === 'circle'" color="yellow" :size="30">mdi-checkbox-blank-circle</v-icon>
                                        </v-btn>
                                        <v-btn icon @click="changeState('cross')">
                                            <v-icon :color="currentQuestion.state === 'cross' ? 'red' : '#888'" :size="30">mdi-close</v-icon>
                                        </v-btn>
                                        <v-btn icon @click="bookmark">
                                            <v-icon v-if="!currentQuestion.bookmarked" :size="30" color="#888">mdi-bookmark-outline</v-icon>
                                            <v-icon v-if="currentQuestion.bookmarked" color="blue" :size="30">mdi-bookmark</v-icon>
                                        </v-btn>
                                    </div>
                                </v-row>
                                <v-row class="question-body">
                                    <v-col>
                                        <div class="renderedPanel" v-html="currentQuestionBody"></div>
                                    </v-col>
                                </v-row>
                                <v-row class="question-answers">
                                    <choice v-for="item in currentQuestion.choices.list"
                                            :key="item.id"
                                            :choice="item"
                                            @answerClicked="answerClicked($event)"
                                    />
                                </v-row>
                            </v-col>
                            <v-col :md="1" class="d-md-flex justify-center align-center d-none">
                                <v-btn :min-width="64" class="px-0" :height="64" @click="goToNextQuestion" icon>
                                    <v-icon :size="40">mdi-chevron-left</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>

            </v-row>

            <v-footer class="justify-center pl-0"
                      color="transparent"
                      elevation="0"
                      padless
                      inset
                      app>
                <v-container fluid class="py-0">
                    <v-row class="timer-row justify-center">
                        <v-col :md="10" class="d-flex justify-center timer-container py-0">
                            <Timer :daftarche="'عمومی'" :quiz-started-at="1607963897" :daftarche-end-time="1607963897" :height="100"></Timer>
                        </v-col>
                    </v-row>
                </v-container>
            </v-footer>
        </v-container>
    </div>

</template>

<script>
    // const inputText;
    // document.getElementById('textfield').addEventListener('change', handler())
    // function handler() {
    //     inputText = document.getElementById('textfield').innerText
    // }

    // import Vue from 'vue'
    import Choice from './Choice'
    import {Question} from '@/models/Question'
    import {Quiz} from '@/models/Quiz'
    import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'
    import FakeQuizData from '@/plugins/fakeQuizData'
    import { mixinQuiz, mixinDrawer } from '@/mixin/Mixins'

    // import VueKatex from 'vue-katex'
    // import 'katex/dist/katex.min.css'
    //
    // Vue.use(VueKatex, {
    //     globalOptions: {
    //         //... Define globally applied KaTeX options here
    //     }
    // })


    // import 'katex/dist/katex.min.css';
    import 'github-markdown-css/github-markdown.css';
    import '@/assets/scss/markdownKatex.scss';
    var md = require('markdown-it')(),
        mk = require('markdown-it-katex');
    md.use(mk);

    export default {
        name: "Quiz",
        components: {
            Choice,
            Timer
        },
        computed: {
            currentQuestionBody() {
                return md.render(this.currentQuestion.body)
            }
        },
        mixins: [mixinQuiz, mixinDrawer],
        data () {
            return {
                quizData: FakeQuizData,
                options: [
                    {left: "$$", right: "$$", display: true}
                ],
                currentQuestionId: 0,
                testQuestion: new Question(),
            }
        },
        methods: {
            loadFirstQuestion () {
                this.loadQuestionByNumber(1)
            },
            loadQuestionByNumber (number) {
                let questionIndex = this.getQuestionIndexFromNumber(number)
                this.changeQuestion(this.quiz.questions.list[questionIndex].id)
            },
            loadQuiz () {
                this.quiz = new Quiz(this.quizData)
                this.quiz.loadSubcategoriesOfCategories()
            },
            answerClicked (id) {
                this.quiz.questions.getQuestionById(this.currentQuestion.id).choiceClicked(id)
            },
            goToNextQuestion () {
                let question = this.quiz.questions.getNextQuestion(this.currentQuestion.id)
                if (!question) {
                    return
                }
                this.changeQuestion(question.id)
            },
            goToPrevQuestion () {
                let question = this.quiz.questions.getPrevQuestion(this.currentQuestion.id)
                if (!question) {
                    return
                }
                this.changeQuestion(question.id)
            },
            bookmark () {
                this.quiz.questions.getQuestionById(this.currentQuestion.id).bookmark()
            },
            changeState (newState) {
                this.quiz.questions.getQuestionById(this.currentQuestion.id).changeState(newState)
            }
        },
        created() {
            if (!this.quiz.id || parseInt(this.$route.params.quizId) !== parseInt(this.quiz.id)) {
                this.loadQuiz()
            }

            if (this.$route.params.questNumber) {
                this.loadQuestionByNumber(this.$route.params.questNumber)
            } else {
                this.loadFirstQuestion()
            }

            if (window.innerWidth > 1263) {
                this.$store.commit('updateDrawer', true)
            }
        },
        destroyed() {
            // this.$store.commit('updateDrawer', false)
        }
    }
</script>

<style>
.quiz-page .katex-display {
    display: inline-block;
    direction: ltr;
}

.v-main {
    background: #f4f4f4;
}
</style>

<style scoped>
    .question-buttons button {
        margin-right: 20px;
    }

    .timer-row {
        /*position: fixed;*/
        /*bottom: 0;*/
        /*justify-content: center;*/
        /*width: 100%;*/
    }

    /*.timer-container {*/
    /*    background: #f4f4f4;*/
    /*}*/

    .question-number p {
        margin-bottom: 0;
        line-height: 40px;
    }
    .question-header {
        display: flex;
        color: #666;
        flex-direction: row;
        justify-content: space-between;
    }

    .question-body {
        margin-top: 50px;
        line-height: 35px;
        color: #777;
    }

    .question-answers {
        margin-top: 90px;
    }

    .answer-sheet {
        background: #fff;
        width: 90%;
        height: 100px;
        padding: 2% 3%;
        border-radius: 10px;
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .answer-sheet:hover {
        background: #e1e1e1;
    }

    .answer-text {
        height: 100%;
        width: 100%;
        display: flex;
        align-content: center;
    }

    .answer-checkbox {
        height: 100px;
        width: 100px;
    }

    .quiz-page {
        background: #f4f4f4;
        height: 100%;
    }

    .user-name {
        margin-bottom: 0;
        align-self: center;
        margin-left: 10px;
        color: #777;
    }

    .map-of-questions-container {
        background: #fff;
        margin: -12px 0;
        padding: 20px 0;
    }

    @media only screen and (max-width: 960px) {
        .question-body {
            margin-top: 20px;
        }
    }

    @media only screen and (max-width: 400px) {
        .question-header {
            justify-content: center;
        }
    }
</style>
