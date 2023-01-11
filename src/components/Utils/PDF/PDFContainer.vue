<template>
  <div
    id="questions"
    ref="questionsColumn"
    class="col-md-5 right-side"
  >
    <q-virtual-scroll
      ref="scroller"
      class="konkoor-view-scroll"
      :items="questions"
      :virtual-scroll-item-size="450"
      :virtual-scroll-slice-size="5"
      @virtual-scroll="onScroll"
    >
      <template v-slot="{ item, index }">
        <q-item
          :key="index"
          class="question-field"
          dense
        >

          <q-item-section>
            <pdf-question-field
              :source="item"
              :index="index"
              :questions-column="$refs.questionsColumn"
              @inView="isInView"
            />

          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import PdfQuestionField from 'components/Utils/PDF/PdfQuestionField'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'
export default {
  name: 'PDFContainer',
  components: { PdfQuestionField },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
  props: {
    questions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      inView: []
    }
  },
  methods: {
    onScroll (details) {
      if (!this.questions[details.index]) {
        return
      }
      this.changeQuestion(this.questions[details.index].id, this.$route.name)

    // startIndex, endIndex
    // this.updateLtr()
    // this.renderedQuestions = { startIndex, endIndex }
    // if (this.scrollState === 'not scrolling') {
    //   this.setIntervalCallback = setInterval(() => {
    //     this.changeCurrentQuestionIfScrollingIsDone()
    //   }, 250)
    //   this.scrollState = 'scrolling'
    // }
    // this.timePassedSinceLastScroll = 0
    },
    isInView (payload) {
      if (payload.isInView) {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            return
          }
        }
        this.inView.push(payload.number)
      } else {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            this.inView.splice(i, 1)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
