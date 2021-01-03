<template>
    <v-container class="konkoor-view" :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }" v-resize="updateWindowSize">
        <v-row :style="{ 'min-height': '100%' }">
            <v-col :md="5" class="questions" :style="{ height: windowSize.y }">
                <div v-for="item in quiz.questions.list" :key="item.id" class="question" v-intersect="onIntersect" :id="item.id">
                    <p class="question-body renderedPanel" v-html="convertToMarkDown((item.order + 1) + ' - ' + item.body)" />
                    <v-row class="choices">
                        <v-col
                                :md="choiceClass(item)"
                                :class="{ choice: true, renderedPanel: true, active: choice.active }"
                                v-for="(choice, index) in item.choices.list"
                                :key="choice.id"
                                v-html="convertToMarkDown((index + 1) + ' ) ' + choice.body)"
                                @click="choiceClicked(item.id, choice.id)"
                        />
                    </v-row>
                </div>
            </v-col>
            <v-col :md="7" class="left-side-list">
                <v-row>
                    <v-col class="px-10 py-0 d-flex justify-space-between" dir="ltr">
                        <div class="rounded-b-xl rounded-r-xl">
                            <v-menu
                                    bottom
                                    :offset-y="true"
                                    class="rounded-b-xl rounded-r-xl"
                            >
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
                                            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                                            height="300px"
                                            dark
                                    >
                                        <v-row class="fill-height">
                                            <v-card-title>
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

                                            <v-card-title class="white--text pl-12 pt-12">
                                                <div class="display-1 pl-12 pt-12">
                                                    Ali Conners
                                                </div>
                                            </v-card-title>
                                        </v-row>
                                    </v-img>

                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-phone
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>(650) 555-1234</v-list-item-title>
                                                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-icon>
                                                <v-icon>mdi-message-text</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>

                                        <v-list-item>
                                            <v-list-item-action></v-list-item-action>

                                            <v-list-item-content>
                                                <v-list-item-title>(323) 555-6789</v-list-item-title>
                                                <v-list-item-subtitle>Work</v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-icon>
                                                <v-icon>mdi-message-text</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>

                                        <v-divider inset></v-divider>

                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-email
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>aliconnors@example.com</v-list-item-title>
                                                <v-list-item-subtitle>Personal</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item>
                                            <v-list-item-action></v-list-item-action>

                                            <v-list-item-content>
                                                <v-list-item-title>ali_connors@example.com</v-list-item-title>
                                                <v-list-item-subtitle>Work</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider inset></v-divider>

                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-map-marker
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>1400 Main Street</v-list-item-title>
                                                <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="questions-list">
                        <div v-for="(group, index) in questionsInGroups" :key="index" class="question-group">
                            <div v-for="question in group" :key="question.id" class="question-in-list">
                                <div :style="{ width: '24%', cursor: 'pointer' }" v-scroll-to="'.question:nth-child('+(quiz.questions.getQuestionIndexById(question.id) + 1)+')'">{{ question.order + 1 }}</div>
                                <div
                                        v-for="choice in question.choices.list"
                                        :key="choice.id"
                                        :class="{ 'choice-in-list': true, active: choice.active }"
                                        @click="choiceClicked(question.id, choice.id)"
                                        v-scroll-to="'.question:nth-child('+(quiz.questions.getQuestionIndexById(question.id) + 1)+')'"
                                />
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FakeQuizData from '@/plugins/fakeQuizData'
import 'github-markdown-css/github-markdown.css'
import $ from 'jquery'
import '@/assets/scss/markdownKatex.scss'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
var md = require('markdown-it')(),
    mk = require('markdown-it-katex')
md.use(mk);
import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
// import {Question} from '@/models/Question'
import {Quiz} from '@/models/Quiz'
// import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'
Vue.use(VueScrollTo, {
    container: "div.questions",
    duration: 500,
    easing: "ease",
    offset: -20,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

export default {
    name: 'KonkoorView',
    mixins: [mixinQuiz, mixinWindowSize],
    // components: {
    //     Timer
    // },
    data () {
        return {
            quizData: FakeQuizData,
            options: [
                {left: "$$", right: "$$", display: true}
            ],
            height: 1000
        }
    },
    methods: {
        addIsInViewBoolean () {
            for (let i = 0; i < this.quiz.questions.list.length; i++) {
                this.quiz.questions.list[i].isInView = false
            }
        },
        loadQuiz () {
            this.quiz = new Quiz(this.quizData)
        },
        convertToMarkDown (body) {
            return md.render(body)
        },
        removeErab (string) {
            let temp = string
            temp = temp.split('َ').join('')
            temp = temp.split('ُ').join('')
            temp = temp.split('ِ').join('')
            temp = temp.split('ّ').join('')
            temp = temp.split('ً').join('')
            temp = temp.split('ٌ').join('')
            temp = temp.split('ٍ').join('')
            return temp
        },
        choiceClass (question) {
            let largestChoice = 0
            for (let i = 0; i < question.choices.list.length; i++) {
                if (question.choices.list[i].body.length > largestChoice) {
                    largestChoice = this.removeErab(question.choices.list[i].body).length
                }
            }
            if (this.windowSize.x * 0.4 / largestChoice > 48) {
                return 3
            }
            if (this.windowSize.x * 0.4 / largestChoice > 24) {
                return 6
            }
            if (this.windowSize.x * 0.4 / largestChoice > 12) {
                return 12
            }
            return 12
        },
        choiceClicked (questionId, choiceId) {
            this.changeQuestion(questionId)
            this.answerClicked(choiceId)
        },
        questionListHeight () {
            // box is a col-7 with 12px padding
            const boxSize = $('.questions-list').width() - 24
            // each group width is 140px
            const horizontalGroupAmounts = Math.floor(boxSize / 140)
            const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
            return verticalGroupAmount * 202 + 24
        },
        questionListPadding () {
            const boxSize = $('.questions-list').width() - 24
            const horizontalGroupAmounts = Math.floor(boxSize / 140)
            return (boxSize - (horizontalGroupAmounts * 140)) / 2 - 10
        },
        onIntersect (entries) {
            this.quiz.questions.getQuestionById(entries[0].target.id).isInView = entries[0].isIntersecting
        }
    },
    computed: {
        questionsInGroups () {
            const groups = []
            let group = []
            for (let i = 0; i < this.quiz.questions.list.length; i++) {
                group.push(this.quiz.questions.list[i])
                if (group.length === 10) {
                    groups.push(group)
                    group = []
                }
            }
            return groups
        }
    },
    mounted () {
        $('.questions-list').height(this.questionListHeight())
        $('.questions').height(this.windowSize.y - 24)
        $('.left-side-list').height(this.windowSize.y - 24)
    },
    created () {
        this.loadQuiz()
        this.$store.commit('updateAppbar', false)
        this.$store.commit('updateDrawer', false)
    },
    watch: {
        'windowSize.y': function () {
            $('.questions').height(this.windowSize.y - 24)
            $('.left-side-list').height(this.windowSize.y - 24)
        },
        'windowSize.x': function () {
            $('.questions-list').height(this.questionListHeight())
            this.$store.commit('updateDrawer', false)
        }
    }
}
</script>

<style scoped>
.left-side-list {
    overflow-y: auto;
}

.question-body {
    margin-bottom: 20px;
}

.questions {
    background: #fff;
    overflow-y: auto;
    position: relative;
    padding-right: 25px;
}

.question {
    margin-bottom: 50px;
}

.choices {
    display: flex;
    flex-direction: row;
}

.choice {
    cursor: pointer;
    transition: all ease-in-out 0.3s;
}

.choice:hover {
    background: #e1e1e1;
}

.questions-list {
    direction: ltr;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}

.question-group {
    background: #fff;
    border-radius: 10px;
    margin: 5px;
    padding: 5px 10px;
    width: 130px;
    font-size: 11px;
}

.question-in-list {
    margin: 2px 0;
    display: flex;
    flex-direction: row;
}

.choice-in-list {
    width: 19%;
    margin: 2px;
    border-radius: 6px;
    border: 1px solid #ffda6a;
    cursor: pointer;
}

.choice-in-list.active {
    background: #ffda6a;
}

.konkoor-view {
    padding: 0;
}
</style>

<style>
    .v-application p {
        margin-bottom: 4px;
    }

    html {
        overflow-y: auto;
    }
</style>