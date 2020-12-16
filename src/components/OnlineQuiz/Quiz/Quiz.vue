<template>
    <v-container :fluid="true">
        <v-row>
            <v-col :md="2">
                <map-of-questions :questions="quiz.questions" :current-question="currentQuestion.id" @changeQuestion="changeQuestion" />
            </v-col>
            <v-col :md="10" class="question-container">
                <v-sheet width="100%">
                    <v-row>
                        <v-col :md="1" class="d-flex justify-center align-center">
                            <v-btn :min-width="32" class="px-0" :height="64" @click="goToPrevQuestion" icon>
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col :md="10">
                            <v-row class="question-header">
                                <div class="question-number">
                                    <p>{{ currentQuestion.title }}</p>
                                </div>
                                <div class="question-buttons">
                                    <v-btn icon @click="changeState('circle')">
                                        <v-icon v-if="currentQuestion.state !== 'circle'">mdi-checkbox-blank-circle-outline</v-icon>
                                        <v-icon v-if="currentQuestion.state === 'circle'" color="yellow">mdi-checkbox-blank-circle</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="changeState('cross')">
                                        <v-icon :color="currentQuestion.state === 'cross' ? 'red' : ''">mdi-close</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="bookmark">
                                        <v-icon v-if="!currentQuestion.bookmarked">mdi-bookmark-outline</v-icon>
                                        <v-icon v-if="currentQuestion.bookmarked" color="blue">mdi-bookmark</v-icon>
                                    </v-btn>
                                </div>
                            </v-row>
                            <v-row class="question-body">
                                <v-col>
                                    <p>
                                        {{ currentQuestion.body }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="question-answers">
                                <choice @answerClicked="answerClicked" v-for="item in currentQuestion.choices.list" :key="item.id" :choice="item"/>
                            </v-row>
                        </v-col>
                        <v-col :md="1" class="d-flex justify-center align-center">
                            <v-btn :min-width="32" class="px-0" :height="64" @click="goToNextQuestion" icon>
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>

        </v-row>
        <Timer class="clock" :daftarche="'عمومی'" :quiz-started-at="1607963897" :daftarche-end-time="1607963897"></Timer>
    </v-container>
</template>

<script>
    // const inputText;
    // document.getElementById('textfield').addEventListener('change', handler())
    // function handler() {
    //     inputText = document.getElementById('textfield').innerText
    // }
    import Choice from "./Choice";
    import MapOfQuestions from "./MapOfQuestions";
    import {Question} from '../../../../models/Question'
    import Timer from './Timer'
    import {Quiz} from "../../../../models/Quiz";

    export default {
        name: "Quiz",
        components: {
            Choice,
            MapOfQuestions,
            Timer
        },
        data () {
            return {
                quizData: {
                    title: 'آزمون آزمایشی',
                    begin_datetime: '2021-01-23 08:00:00',
                    finish_datetime: '2021-01-23 08:00:00',
                    total_question_number: 3,
                    questions: [
                        {
                            id: 0,
                            title: 'ادبیات فارسی - سوال شماره 9',
                            body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سواsssss سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سواddddن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ',
                            choices: [
                                {
                                    id: 0,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 0
                                },
                                {
                                    id: 1,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 1
                                },
                                {
                                    id: 2,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 2
                                },
                                {
                                    id: 3,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 3
                                }
                            ],
                            order: 0,
                            lesson: 'فارسی'
                        },
                        {
                            id: 1,
                            title: 'ادبیات فارسی - سوال شماره 10',
                            body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن gggggن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال مhhhhhتن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ',
                            choices: [
                                {
                                    id: 0,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 0
                                },
                                {
                                    id: 1,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 1
                                },
                                {
                                    id: 2,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 2
                                },
                                {
                                    id: 3,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 3
                                }
                            ],
                            order: 1,
                            lesson: 'ریاضی'
                        },
                        {
                            id: 2,
                            title: 'ادبیات فارسی - سوال شماره 11',
                            body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوالkkkkkkkتن سوال متن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سواllllll سوال متن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                                'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ',
                            choices: [
                                {
                                    id: 0,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 0
                                },
                                {
                                    id: 1,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 1
                                },
                                {
                                    id: 2,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 2
                                },
                                {
                                    id: 3,
                                    body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                                    active: false,
                                    order: 3
                                }
                            ],
                            order: 2,
                            lesson: 'ریاضی'
                        }
                    ],
                },
                currentQuestionId: 0,
                quiz: new Quiz(),
                testQuestion: new Question(),
                currentQuestion: new Question(),
            }
        },
        methods: {
            loadFirstQuestion () {
                this.changeQuestion(this.quiz.questions.list[0].id)
            },
            loadQuiz () {
                this.quiz = new Quiz(this.quizData)
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
            changeQuestion (id) {
                this.currentQuestion = this.quiz.questions.getQuestionById(id)
            },
            bookmark () {
                this.quiz.questions.getQuestionById(this.currentQuestion.id).bookmark()
            },
            changeState (newState) {
                this.quiz.questions.getQuestionById(this.currentQuestion.id).changeState(newState)
            }
        },
        created() {
            this.loadQuiz()
            this.loadFirstQuestion()
        }
    }
</script>

<style scoped>
    .question-container {
        padding-bottom: 100px;
    }

    .question-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .question-body {
        margin-top: 50px;
        line-height: 35px;
    }

    .question-answers {
        margin-top: 50px;
    }

    .answer-box {
        display: flex;
        justify-content: center;
        height: 135px;
        align-items: center;
    }

    .answer-sheet {
        background: #f1f1f1;
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
        height: 100%;
        width: 100px;
    }

    .clock {
        float: left;
        margin-left: 5px;
        margin-bottom: 0;
        margin-top: 200px;

    }
</style>
