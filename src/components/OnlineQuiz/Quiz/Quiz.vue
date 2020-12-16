<template>
    <v-container :fluid="true" class="quiz-page">
        <v-row :style="{ height: '100%' }">
            <v-col :md="2" class="map-of-questions-container">
                <map-of-questions :questions="questions" :current-question="currentQuestionId" @changeQuestion="changeQuestion($event)" />
            </v-col>
            <v-col :md="10" class="question-container">
                <v-sheet width="100%" color="#f4f4f4">
                    <v-row>
                        <v-col :md="1" />
                        <v-col :md="10" class="d-flex justify-end my-9">
                            <p class="user-name">سید مصطفی کاظمی</p>
                            <v-icon :size="40">mdi-account-circle</v-icon>
                        </v-col>
                        <v-col :md="1" />
                    </v-row>
                    <v-row>
                        <v-col :md="1" class="d-flex justify-center align-center">
                            <v-btn :min-width="64" class="px-0" :height="64" @click="changeQuestion(null, -1)" icon>
                                <v-icon :size="40">mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col :md="10">
                            <v-row class="question-header">
                                <div class="question-number">
                                    <p>{{ currentQuestion.title }}</p>
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
                            <v-btn :min-width="64" class="px-0" :height="64" @click="changeQuestion(null, 1)" icon>
                                <v-icon :size="40">mdi-chevron-left</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col :md="12" class="clock">
                <Timer :daftarche="'عمومی'" :quiz-started-at="1607963897" :daftarche-end-time="1607963897" :height="100"></Timer>
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
                        title: 'ادبیات فارسی - سوال شماره 1',
                        body: 'کدام دو کلمه متضاد هستند؟',
                        choices: [
                            {
                                id: 0,
                                body: 'آلاباما و قالی باف',
                                active: false,
                                order: 0
                            },
                            {
                                id: 1,
                                body: 'شهر و جوراب ',
                                active: false,
                                order: 1
                            },
                            {
                                id: 2,
                                body: 'عرفان و انسان',
                                active: false,
                                order: 2
                            },
                            {
                                id: 3,
                                body: 'آبی و انار',
                                active: false,
                                order: 3
                            }
                        ],
                        order: 1,
                        lesson: 'فارسی'
                    },
                    {
                        id: 1,
                        title: 'ادبیات فارسی - سوال شماره 2',
                        body: 'این بیت به چه معناست؟ "الا یا ایها الساقی ادر کاسا و ناولها که عشق اسان نمود اول ولی افتاد مشکل ها',
                        choices: [
                            {
                                id: 0,
                                body: 'خیلی معنی خوبی میده',
                                active: false,
                                order: 0
                            },
                            {
                                id: 1,
                                body: 'خیلی معنی بدی میده',
                                active: false,
                                order: 1
                            },
                            {
                                id: 2,
                                body: 'نمیدونم',
                                active: false,
                                order: 2
                            },
                            {
                                id: 3,
                                body: 'هر چهار گزینه',
                                active: false,
                                order: 3
                            }
                        ],
                        order: 2,
                        lesson: 'فارسی'
                    },
                    {
                        id: 2,
                        title: 'ادبیات فارسی - سوال شماره 3',
                        body: 'اگر آن ترک شیرازی بدست آرد دل مارا به خال هندویش بخشم',
                        choices: [
                            {
                                id: 0,
                                body: 'سمرقند و بخارا را',
                                active: false,
                                order: 0
                            },
                            {
                                id: 1,
                                body: 'سر و دست و تن و پارا',
                                active: false,
                                order: 1
                            },
                            {
                                id: 2,
                                body: 'تمام روح و اجزا را',
                                active: false,
                                order: 2
                            },
                            {
                                id: 3,
                                body: 'هیچی بهش نمیدم',
                                active: false,
                                order: 3
                            }
                        ],
                        order: 3,
                        lesson: 'فارسی'
                    },
                    {
                        id: 3,
                        title: 'زبان انگلیسی - سوال شماره 1',
                        body: 'Compressi key shen board?',
                        choices: [
                            {
                                id: 0,
                                body: 'Northern Arizona',
                                active: false,
                                order: 0
                            },
                            {
                                id: 1,
                                body: 'Requiem for a Dream',
                                active: false,
                                order: 1
                            },
                            {
                                id: 2,
                                body: 'Eternal Sunshine of the Spotless Mind',
                                active: false,
                                order: 2
                            },
                            {
                                id: 3,
                                body: 'on the nature of daylight',
                                active: false,
                                order: 3
                            }
                        ],
                        order: 4,
                        lesson: 'زبان انگلیسی'
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
        margin-top: 50px;
    }

    .answer-box {
        display: flex;
        justify-content: center;
        height: 135px;
        align-items: center;
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
        height: 100%;
        width: 100px;
    }

    .clock {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 0;
        height: 100px;
        display: flex;
        justify-content: center;
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
</style>
