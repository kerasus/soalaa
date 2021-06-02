<template>
  <v-col
    :md="6"
    :cols="12"
    class="answer-box"
    @click="answerClicked"
  >
    <v-sheet :class="{ 'answer-sheet': true, active: isSelected, ltr: isRtl }">
      <div
        class="answer-text renderedPanel"
        v-html="choice.rendered_title"
      />
      <div class="answer-checkbox">
        <v-checkbox
          v-model="isSelected"
          disabled
        />
      </div>
    </v-sheet>
  </v-col>
</template>

<script>
    import { mixinQuiz } from '@/mixin/Mixins'
    import '@/assets/scss/markdownKatex.scss'


    export default {
        name: 'Choice',
        mixins: [mixinQuiz],
        props: ['choice', 'questionId', 'isRtl'],
        computed: {
            isSelected () {
                return this.getUserQuestionData(this.quiz.id, this.questionId) && this.choice.id === this.getUserQuestionData(this.quiz.id, this.questionId).answered_choice_id
            }
        },
        methods: {
            answerClicked () {
                this.$emit('answerClicked', { questionId: this.questionId, choiceId: this.choice.id })
            },
        }
    }
</script>

<style>
    .answer-box .mdi-checkbox-marked::before,
    .answer-box .mdi-checkbox-blank-outline {
        size: 40px;
        font-size: 40px;
    }
    .answer-sheet.active .theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon {
        color: #fbc10c !important;
    }
    .answer-sheet.active {
        box-shadow: 0 3px 5px -1px rgba(255, 191, 7, 0.10), 0 5px 8px 0 rgba(255, 191, 7, 0.06), 0 1px 14px 0 rgba(255, 191, 7, 0.02) !important;
    }

    .answer-sheet p {
        margin-bottom: 0;
    }
</style>

<style scoped>


    .answer-box {
        display: flex;
        justify-content: center;
        min-height: 135px;
        align-items: center;
    }

    .answer-sheet {
        background: #fff;
        width: 100%;
        min-height: 100px;
        height: max-content;
        padding: 2% 3%;
        border-radius: 20px;
        cursor: pointer;
        transition: all ease 0.3s;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
    }



    .answer-text {
        height: max-content;
        width: 100%;
        color: #777;
        padding-right: 30px;
        display: block;
    }

    .answer-sheet.active {
        background: #fffaee;
    }

    .answer-text {
        height: max-content;
        width: 100%;
    }

    .answer-checkbox {
        height: 74px;
        width: 85px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }
</style>
