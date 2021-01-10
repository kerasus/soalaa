<template>
    <div :class=" { 'bubble-sheet': true, 'questions-list': true, 'pasokh-nameh': info.type === 'pasokh-nameh', 'pasokh-barg': info.type === 'pasokh-barg' }">
        <div v-for="(group, index) in questionsInGroups" :key="index" class="question-group">
            <div v-for="question in group" :key="question.id" class="question-in-list">
                <div
                        :class="{ 'question-number-in-list': true, circle: question.state === 'circle', cross: question.state === 'cross' }"
                        :style="{ width: '24%', cursor: 'pointer' }"
                        @click="clickQuestionNumber(question.id)"
                >
                    {{ getQuestionNumberFromId(question.id) }}
                </div>
                <div
                        v-for="choice in question.choices.list"
                        :key="choice.id"
                        :class="{ 'choice-in-list': true, active: choice.active }"
                        @click="clickChoice(question.id, choice.id)"
                />
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
                if (this.info.type === 'pasokh-barg') {
                    this.$emit('scrollTo', questionId)
                }
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

    .questions-list {
        direction: ltr;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 80px;
    }
</style>