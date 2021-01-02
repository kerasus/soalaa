<template>
    <v-container :fluid="true" :style="{ height: '100%', background: 'rgb(244, 244, 244)' }" v-resize="updateWindowSize" v-intersect="onIntersect($entries, 'test')">
        <v-row :style="{ 'min-height': '100%' }">
            <v-col :md="5" class="questions" :style="{ height: windowSize.y }">
                <div v-for="item in quiz.questions.list" :key="item.id" class="question" v-intersect="item.isInView">
                    <p class="question-body renderedPanel" v-html="convertToMarkDown((item.order + 1) + ' - ' + item.body)" />
                    <v-row class="choices">
                        <v-col
                                :md="choiceClass(item)"
                                class="choice renderedPanel"
                                v-for="(choice, index) in item.choices.list"
                                :key="choice.id"
                                v-html="convertToMarkDown((index + 1) + ' ) ' + choice.body)"
                                @click="choiceClicked(item.id, choice.id)"
                        />
                    </v-row>
                </div>
            </v-col>
            <v-col :md="7" class="questions-list">
                <div v-for="(group, index) in questionsInGroups" :key="index" class="question-group">
                    <div v-for="question in group" :key="question.id" class="question-in-list">
                        <div :style="{ width: '24%' }">{{ question.order + 1 }}</div>
                        <div
                                v-for="choice in question.choices.list"
                                :key="choice.id"
                                :class="{ 'choice-in-list': true, active: choice.active }"
                                @click="choiceClicked(question.id, choice.id)"
                        />
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FakeQuizData from '@/plugins/fakeQuizData'
import 'github-markdown-css/github-markdown.css'
import $ from 'jquery'
import '@/assets/scss/markdownKatex.scss'
var md = require('markdown-it')(),
    mk = require('markdown-it-katex')
md.use(mk);
import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
// import {Question} from '@/models/Question'
import {Quiz} from '@/models/Quiz'
// import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'

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
            height: 1000,
            test: false
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
            this.addIsInViewBoolean()
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
            this.test = entries[0].isIntersecting
        },
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
        $('.questions').height(this.windowSize.y - 96)
    },
    created () {
        this.loadQuiz()
    },
    watch: {
        'windowSize.y': function () {
            $('.questions').height(this.windowSize.y - 96)
        },
        'windowSize.x': function () {
            console.log(this.questionListPadding())
            $('.questions-list').height(this.questionListHeight())
        }
    }
}
</script>

<style scoped>
.question-body {
    margin-bottom: 20px;
}

.questions {
    background: #fff;
    overflow-y: auto;
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
</style>

<style>
    .v-application p {
        margin-bottom: 4px;
    }
</style>