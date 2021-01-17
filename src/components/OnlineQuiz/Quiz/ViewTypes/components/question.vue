<template>
    <div :class="{ 'current-question': this.currentQuestion.id === source.id, question: true, ltr: source.ltr }">
        <div class="buttons-group">
            <v-btn icon @click="changeState(source, 'o')">
                <v-icon v-if="source.state !== 'o'" color="#888" :size="24">mdi-checkbox-blank-circle-outline</v-icon>
                <v-icon v-if="source.state === 'o'" color="yellow" :size="24">mdi-checkbox-blank-circle</v-icon>
            </v-btn>
            <v-btn icon @click="changeState(source ,'x')">
                <v-icon :color="source.state === 'x' ? 'red' : '#888'" :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="bookmark(source)">
                <v-icon v-if="!source.bookmarked" :size="24" color="#888">mdi-bookmark-outline</v-icon>
                <v-icon v-if="source.bookmarked" color="blue" :size="24">mdi-bookmark</v-icon>
            </v-btn>
        </div>
        <span class="question-body renderedPanel" :id="'question' + source.id" v-html="(getQuestionNumberFromId(source.id)) + '- ' + source.rendered_statement"  />
        <v-row class="choices">
            <v-col
                    v-for="(choice, index) in source.choices.list"
                    :key="choice.id"
                    v-html="(choiceNumber[index]) + choice.rendered_title"
                    :md="choiceClass(source)"
                    :class="{ choice: true, renderedPanel: true, active: choice.active }"
                    @click="choiceClicked(source.id, choice.id)"
            />
        </v-row>
    </div>
</template>

<script>
    import '@/assets/scss/markdownKatex.scss'
    import { mixinQuiz } from '@/mixin/Mixins'
    import $ from "jquery";
    // var md = require('markdown-it')(),
    //     mk = require('markdown-it-katex')
    // md.use(mk);

    export default {
        name: 'item',
        mixins: [ mixinQuiz ],
        data () {
            return {
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
            source: { // here is: {uid: 'unique_1', text: 'abc'}
                default () {
                    return {}
                }
            }
        },
        methods: {
            onIntersect(entries) {
                this.source.onIntersect(entries)
            },
            choiceClicked (questionId, choiceId) {
                console.log('choiceClicked: ', choiceId)
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
            },
            choiceClass (question) {
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
                    if (source.title.length > largestChoice) {
                        largestChoice = this.removeErab(source.title).length
                    }
                })
                return largestChoice
            },
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

    /*.current-question {*/
    /*    background-color: #fffaee;*/
    /*}*/

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
