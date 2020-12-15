<template>
    <v-container :fluid="true">
        <v-row>
            <v-col :md="2">
                <map-of-questions />
            </v-col>
            <v-col :md="10">
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
                                    <v-btn icon>
                                        <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-bookmark-outline</v-icon>
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
    import { QuestionList } from '../../../../models/Question'

    export default {
        name: "Quiz",
        components: {
            Choice,
            MapOfQuestions
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
                    }
                ],
                currentQuestionId: 0
            }
        },
        methods: {
            answerClicked (id) {
                for (let i = 0; i < this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list.length; i++) {
                    if (this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list[i].id !== id) {
                        this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list[i].active = false
                    } else if (this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list[i].active) {
                        this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list[i].active = false
                    } else {
                        this.questions.list[this.getQuestionIndexById(this.currentQuestionId)].choices.list[i].active = true
                    }
                }
            },
            changeQuestion (id, count) {
                if (id !== null) {
                    console.log('nothing')
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
        }
    }
</script>

<style scoped>
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
</style>
