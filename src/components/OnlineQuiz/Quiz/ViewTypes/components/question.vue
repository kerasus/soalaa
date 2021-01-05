<template>
    <div>
        <div class="buttons-group">-->
            <v-btn icon @click="changeState(source, 'circle')">
                <v-icon v-if="source.state !== 'circle'" color="#888" :size="24">mdi-checkbox-blank-circle-outline</v-icon>
                <v-icon v-if="source.state === 'circle'" color="yellow" :size="24">mdi-checkbox-blank-circle</v-icon>
            </v-btn>
            <v-btn icon @click="changeState(source ,'cross')">
                <v-icon :color="source.state === 'cross' ? 'red' : '#888'" :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="bookmark(source)">
                <v-icon v-if="!source.bookmarked" :size="24" color="#888">mdi-bookmark-outline</v-icon>
                <v-icon v-if="source.bookmarked" color="blue" :size="24">mdi-bookmark</v-icon>
            </v-btn>
        </div>
        <span class="question-body renderedPanel" v-html="(source.order + 1) + '- ' + source.rendered_body" v-intersect="source.onIntersect" />
        <v-row class="choices">
            <v-col
                    v-for="(choice, index) in source.choices.list"
                    :key="choice.id"
                    v-html="(choiceNumber[index]) + choice.rendered_body"
                    :md="choiceClass(source)"
                    :class="{ choice: true, renderedPanel: true, active: choice.active }"
                    @click="choiceClicked(source.id, choice.id, false)"
            />
        </v-row>
    </div>
</template>

<script>
    import 'github-markdown-css/github-markdown.css'
    import '@/assets/scss/markdownKatex.scss'
    import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import $ from "jquery";
    var md = require('markdown-it')(),
        mk = require('markdown-it-katex')
    md.use(mk);

    export default {
        name: 'item',
        mixins: [ mixinQuiz, mixinWindowSize ],
        data () {
            return {
                choiceNumber: {
                    0: 'الف) ',
                    1: 'ب) ',
                    2: 'ج) ',
                    3: 'د) '
                }
            }
        },
        props: {
            index: { // index of current source
                type: Number
            },
            source: { // here is: {uid: 'unique_1', text: 'abc'}
                default () {
                    return {}
                }
            }
        },
        methods: {
            onIntersect(entries) {
                console.log('test')
                this.source.test = entries[0].isIntersecting
            },
            choiceClicked (questionId, choiceId, scroll) {
                // if (scroll) {
                //     const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
                //     this.$refs.scroller.scrollTosource(questionIndex)
                //     setTimeout(() => { this.$refs.scroller.scrollTosource(questionIndex) }, 200)
                // }
                console.log(scroll)
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
            },
            choiceClass (question) {
                // let QuestionWidthRatio = 0.4
                // let largestChoiceWidth = this.windowSize.x * QuestionWidthRatio / largestChoice
                let largestChoice = this.getLargestChoice(question.choices)
                let largestChoiceWidth = $('.questions').width() / largestChoice
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
            removeErab (string) {
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
            getLargestChoice (choices) {
                let largestChoice = 0
                choices.list.forEach((source)=> {
                    if (source.body.length > largestChoice) {
                        largestChoice = this.removeErab(source.body).length
                    }
                })

                return largestChoice
            },
        }
    }
</script>