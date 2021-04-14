<template>
    <div :class="{ 'current-question': this.currentQuestion.id === source.id, question: true, ltr: source.ltr}"
         v-intersect="test">
        <div>
            <v-sheet
                    v-if="considerActiveCategory && !source.in_active_category"
                    rounded
                    dark
                    height="200"
                    elevation="1"
                    class="d-flex align-center justify-center"
                    :color="currentQuestion.id === source.id ? '--error-1' : '#fff'"
            >
                (
                سوال شماره
                {{ getQuestionNumberFromId(source.id) }}
                )
                <br>
                در حال حاضر امکان مشاهده سوالات این دفترچه امکان پذیر نمی باشد
            </v-sheet>
        </div>
        <div v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory"
             class="buttons-group">
            <v-btn icon @click="changeStatus(source.id, 'o')">
                <v-icon v-if="getChoiceStatus() === 'o'" color="yellow" :size="24">mdi-checkbox-blank-circle</v-icon>
                <v-icon v-if="getChoiceStatus() !== 'o'" color="#888" :size="24">mdi-checkbox-blank-circle-outline
                </v-icon>
            </v-btn>
            <v-btn icon @click="changeStatus(source.id ,'x')">
                <v-icon :color="getChoiceStatus() === 'x' ? 'red' : '#888'" :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="changeBookmark(source.id)">
                <v-icon v-if="getChoiceBookmark()" color="blue" :size="24">mdi-bookmark</v-icon>
                <v-icon v-else :size="24" color="#888">mdi-bookmark-outline</v-icon>
            </v-btn>
        </div>
        <span v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory"
              class="question-body renderedPanel"
              :class="{ ltr: isRtl }"
              :id="'question' + source.id"
              v-html="(getQuestionNumberFromId(source.id)) + '- ' + source.rendered_statement"
        />
        <v-row v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory" class="choices">
            <v-col
                    v-for="(choice, index) in source.choices.list"
                    :key="choice.id"
                    v-html="(choiceNumber[index]) + choice.rendered_title"
                    :md="choiceClass(source)"
                    ref="choices"
                    class="choice renderedPanel"
                    :class="{ active: getAnsweredChoiceId() === choice.id, ltr: isRtl }"
                    @click="answerClickedd({ questionId: source.id, choiceId: choice.id})"
            />
        </v-row>
    </div>
</template>

<script>
    import '@/assets/scss/markdownKatex.scss'
    import {mixinQuiz, mixinUserActionOnQuestion} from '@/mixin/Mixins'

    export default {
        mixins: [mixinQuiz, mixinUserActionOnQuestion],
        data() {
            return {
                isRtl: false,
                widestChoiceWidth: 0,
                observer: null,
                choiceNumber: {
                    0: '1) ',
                    1: '2) ',
                    2: '3) ',
                    3: '4) '
                }
            }
        },
        props: {
            index: { // index of current source
                type: Number
            },
            considerActiveCategory: { // index of current source
                type: Boolean,
                default: true
            },
            questionsColumn: { // here is: {uid: 'unique_1', text: 'abc'}
                default() {
                    return null
                }
            },
            source: { // here is: {uid: 'unique_1', text: 'abc'}
                default() {
                    return {}
                }
            }
        },
        mounted() {
            this.observer = new IntersectionObserver(this.intersectionObserver, {threshold: [0.7, 0.75, 0.8]})
            this.observer.observe(this.$el)
            this.isRtl = this.isLtrString(this.source.rendered_statement)
        },
        methods: {
            getChoiceStatus() {
                if (
                    !this.userQuizListData ||
                    !this.userQuizListData[this.quiz.id] ||
                    !this.userQuizListData[this.quiz.id][this.source.id]
                ) {
                    return false
                }

                return this.userQuizListData[this.quiz.id][this.source.id].status
            },
            getChoiceBookmark() {
                if (
                    !this.userQuizListData ||
                    !this.userQuizListData[this.quiz.id] ||
                    !this.userQuizListData[this.quiz.id][this.source.id]
                ) {
                    return false
                }

                return this.userQuizListData[this.quiz.id][this.source.id].bookmarked
            },
            getAnsweredChoiceId() {
                if (
                    !this.userQuizListData ||
                    !this.userQuizListData[this.quiz.id] ||
                    !this.userQuizListData[this.quiz.id][this.source.id]
                ) {
                    return false
                }

                return this.userQuizListData[this.quiz.id][this.source.id].answered_choice_id
            },
            test(payload) {
                this.$emit('inView', {
                    isInView: payload.isIntersecting,
                    number: this.getQuestionNumberFromId(this.source.id)
                })
            },
            answerClickedd(payload) {
                this.answerClicked(payload)
            },
            intersectionObserver(entries) {
                this.source.isInView = entries[0].intersectionRatio >= 0.75
            },
            onIntersect(entries) {
                this.source.isInView = entries[0].intersectionRatio >= 0.75
            },
            choiceClicked(questionId, choiceId) {
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
            },
            choiceClass(question) {
                let largestChoice = this.getLargestChoice(question.choices)
                let largestChoiceWidth = this.questionsColumn.clientWidth / largestChoice
                if (largestChoiceWidth > 48) {
                    return 3
                }
                if (largestChoiceWidth > 24) {
                    return 6
                }
                if (largestChoiceWidth > 12) {
                    return 12
                }
                return 12
            },
            removeErab(string) {
                if (!string || string.length === 0) {
                    return ''
                }

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
            getLargestChoice(choices) {
                let largestChoice = 0
                choices.list.forEach((source) => {
                    if (source.title.length > largestChoice) {
                        largestChoice = this.removeErab(source.title).length
                    }
                })
                return largestChoice
            },
        },
        destroyed() {
            this.observer.disconnect();
        }
    }
</script>

<style scoped>
    .ltr.question {
        padding: 10px 20px 10px 20px;
    }

    .ltr {
        direction: ltr;
    }

    .ltr .choice {
        direction: ltr;
        text-align: left;
    }

    .ltr .buttons-group {
        float: right;
    }

    .current-question {
        background-color: #fffaee;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    .choice {
        cursor: pointer;
        transition: all ease-in-out 0.3s;
    }

    .buttons-group {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .choice.active::before {
        content: "\F012C";
        display: inline-block;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 10px;
        color: #4caf50;
        font-size: 20px;
    }

    .choice:hover {
        background: #e1e1e1;
    }


    .question-body {
        margin-bottom: 20px;
        line-height: 40px;
    }

    .questions {
        background: #fff;
        overflow-y: auto;
        position: relative;
        /*padding-right: 25px;*/
        padding: 0;
    }

    .question {
        padding: 10px 30px 10px 0;
    }
</style>

<style>
    .ltr .choice p {
        margin-left: 5px;
        margin-right: 0;
    }
</style>
