<template>
  <div :class="{ question: true, ltr: source.ltr }">
    <div class="buttons-group">
      <v-btn
        icon
        @click="bookmark(source)"
      >
        <v-icon
          v-if="!source.bookmarked"
          :size="24"
          color="#888"
        >
          mdi-bookmark-outline
        </v-icon>
        <v-icon
          v-if="source.bookmarked"
          color="blue"
          :size="24"
        >
          mdi-bookmark
        </v-icon>
      </v-btn>
    </div>
    <span
      :id="'question' + source.id"
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
        }
      }"
      class="question-body renderedPanel"
      v-html="(getQuestionNumberFromId(source.id)) + '- ' + source.rendered_statement"
    />
    <v-row class="choices">
      <v-col
        v-for="(choice, index) in source.choices.list"
        :key="choice.id"
        :md="choiceClass(source)"
        :class="{ choice: true, renderedPanel: true, active: choice.active, answer: choice.answer }"
        v-html="(choiceNumber[index]) + choice.rendered_title"
      />
    </v-row>
  </div>
</template>

<script>
    import '@/assets/scss/markdownKatex.scss'
    import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import $ from "jquery";

    export default {
        name: 'Item',
        mixins: [ mixinQuiz, mixinWindowSize ],
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
        methods: {
            onIntersect(entries) {
                this.source.onIntersect(entries)
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

    .current-question {
        background-color: #fffaee;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    .choice {
        transition: all ease-in-out 0.3s;
        display: flex;
        align-items: flex-start;
    }

    .buttons-group {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .choice.active::before {
        content: "\F0156";
        display: inline-block;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 10px;
        color: red;
        font-size: 20px;
    }

    .choice.answer::before {
        content: "\F05E1";
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

    .choice.answer.active::before {
        content: "\F05E0";
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
