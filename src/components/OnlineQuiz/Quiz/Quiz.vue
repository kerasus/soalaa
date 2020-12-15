<template>
    <v-container :fluid="true">
        <v-row>
            <v-col :md="2">
                <map-of-questions :questions="questions" :current-question="currentQuestionId" @changeQuestion="changeQuestion($event)" />
            </v-col>
            <v-col :md="10" class="question-container">
                <v-sheet width="100%">
                    <v-row>
                        <v-col :md="1" class="d-flex justify-center align-center">
                            <v-btn :min-width="32" class="px-0" :height="64" @click="changeQuestion(null, -1)" icon>
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
                                <choice @answerClicked="answerClicked($event)" v-for="item in currentQuestion.choices.list" :key="item.id" :choice="item"/>
                            </v-row>
                        </v-col>
                        <v-col :md="1" class="d-flex justify-center align-center">
                            <v-btn :min-width="32" class="px-0" :height="64" @click="changeQuestion(null, 1)" icon>
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
    import {Question, QuestionList} from '../../../../models/Question'
    import Timer from './Timer'

    export default {
        name: "Quiz",
        components: {
            Choice,
            MapOfQuestions,
            Timer
        },
        data () {
            return {
                questions: [
                    {
                        id: 0,
                        title: 'ادبیات فارسی - سوال شماره 9',
                        body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                            'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
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
                        body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                            'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
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
                        body: 'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
                            'متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال ' +
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
                currentQuestionId: 0,
                testQuestion: new Question()
            }
        },
        methods: {
            answerClicked (id) {
                this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choiceClicked(id)
            },
            changeQuestion (id, count) {
                if (id !== null) {
                    this.currentQuestionId = id
                } else if (count !== null) {
                    this.currentQuestionId = this.questions.list[this.getQuestionIndexById(this.currentQuestionId) + count].id
                }
            },
            getQuestionIndexById (id) {
                for (let i = 0; i < this.questions.list.length; i++) {
                    if (this.questions.list[i].id === id) {
                        return i
                    }
                }
                return 0
            },
            bookmark () {
                this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].bookmark()
            },
            changeState (newState) {
                this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].changeState(newState)
            }
        },
        computed: {
            currentQuestion () {
                for (let i = 0; i < this.questions.list.length; i++) {
                    if (this.questions.list[i].id === this.currentQuestionId) {
                        return this.questions.list[i]
                    }
                }
                return {}
            }
        },
        created() {
            this.questions = new QuestionList(this.questions)
            console.log(this.lessons)
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
