<template>
    <div :class=" { 'bubble-sheet': true, 'questions-list': true, 'pasokh-nameh': info.type === 'pasokh-nameh', 'pasokh-barg': info.type === 'pasokh-barg' }">
        <div v-for="(group, index) in questionsInGroups" :key="index" class="question-group">
            <div v-for="question in group" :key="question.id" class="question-in-list">
                <div
                        :class="{ 'question-number-in-list': true, circle: question.state === 'o', cross: question.state === 'cross', bookmark: question.bookmarked }"
                        :style="{ width: '24%', cursor: 'pointer' }"
                        @click="clickQuestionNumber(question.id)"
                >
                    {{ getQuestionNumberFromId(question.id) }}
                </div>
                <div
                        v-for="choice in question.choices.list"
                        :key="choice.id"
                        :class="{ 'choice-in-list': true, active: choice.active, answer: choice.answer }"
                        @click="clickChoice(question.id, choice.id)"
                >
                    <v-icon v-if="info.type === 'pasokh-nameh' && choice.answer" size="12" :color="choice.answer === choice.active ? '#fff' : '#00c753'">
                        mdi-check
                    </v-icon>
                    <v-icon v-if="info.type === 'pasokh-nameh' && choice.active && !choice.answer" size="12" color="#fff">
                        mdi-close
                    </v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import { mixinQuiz } from "@/mixin/Mixins";

    export default {
        name: 'BubbleSheet',
        mixins: [mixinQuiz],
        computed: {
            questionsInGroups () {
                let groups = [],
                    chunk = 10,
                    array = this.quiz.questions.list
                for (let i=0,j=array.length; i<j; i+=chunk) {
                    groups.push(array.slice(i,i+chunk))
                }
                return groups
            }
        },
        props: ['info'],
        methods: {
            clickChoice (questionId, choiceId) {
                this.$emit('clickChoice', questionId, choiceId)
            },
            clickQuestionNumber (questionId) {
                console.log('scroLLL')
                this.$emit('scrollTo', questionId)
            },
            questionListHeight () {
                // box is a col-7 with 12px padding
                const boxSize = $('.questions-list').width() - 24
                // each group width is 140px
                const horizontalGroupAmounts = Math.floor(boxSize / 140)
                const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
                return verticalGroupAmount * 182 + 20
            },
            questionListPadding () {
                const boxSize = $('.questions-list').width() - 24
                const horizontalGroupAmounts = ($('.questions-list').height() - 8) / 182
                const verticalGroupAmounts = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
                return (boxSize - (verticalGroupAmounts * 140)) / 2 + 5
            }
        },
        mounted () {
            $('.questions-list').height(this.questionListHeight())
            $('.questions-list').css({ 'padding-top': '20px' })
            this.$nextTick(() => {
                const padding = this.questionListPadding()
                $('.questions-list').css({ 'padding-right': padding })
                $('.questions-list').css({ 'padding-left': padding })
            });
        }
    }
</script>

<style scoped>
    .pasokh-nameh .choice-in-list {
        position: relative;
        cursor: auto;
    }

    .pasokh-nameh .choice-in-list.answer {
        border: solid 1px #00c753;
    }

    .pasokh-nameh .choice-in-list.active {
        border: solid 1px #ff4243;
        background-color: #ff4243;
    }

    .pasokh-nameh .choice-in-list.active.answer {
        border: solid 1px #00c753;
        background-color: #00c753;
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
        height: 14px;
    }

    .choice-in-list {
        width: 19%;
        margin: 2px;
        border-radius: 6px;
        border: 1px solid #ffda6a;
        cursor: pointer;
    }

    .choice-in-list.active {
        background: #888;
    }

    .question-number-in-list {
        position: relative;
    }

    .question-number-in-list.circle::after {
        content: "\F0130";
        position: absolute;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #ffda6a;
        left: -5px;
        font-size: 16px;
        top: -5px;
    }

    .question-number-in-list.cross::after {
        content: "\F0156";
        position: absolute;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: red;
        left: -6px;
        font-size: 16px;
        top: -5px;
    }

    .pasokh-nameh .question-number-in-list.bookmark::after {
        content: "\F00C3";
        position: absolute;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2196F3;
        left: -6px;
        font-size: 16px;
        top: -5px;
    }

    .questions-list {
        direction: ltr;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 80px;
    }
</style>

<style>
    .pasokh-nameh .v-icon.mdi-check,
    .pasokh-nameh .v-icon.mdi-close {
        top: -2px;
        left: 2px;
    }
</style>
