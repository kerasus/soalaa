<template>
  <div
    class="userExamList"
    style="font-size: 16px;"
  >
    <!--    ToDo : add confirm-dialog-->
    <!--    <vue-confirm-dialog />-->
    <div class="fit row wrap justify-center items-start content-start"
    >
      <div class="col col-12 examList-container">
        <!-- TODO:
          - slider load data
          - tab & tab panel
          - load tab panels data
          - paginator for tab panels
        -->
        <div class="slider-row">
          <future-quizzes-carousel />
        </div>
        <div class="row">
          <div class="col-12">
            <div class="test-list-title">
              آزمون ها
            </div>
            <q-tabs
              v-model="tab"
              color="light1"
              class="test-tabs"
              active-color="secondary"
              align="left"
            >
              <q-tab name="test"
                     label="آزمون ها" />
              <q-tab name="myTest"
                     label="آزمون های من" />
            </q-tabs>
            <q-tab-panels v-model="tab"
                          class="quiz-panels"
                          animated>
              <q-tab-panel name="test">
                <quiz-list :quizType="'test'" />
              </q-tab-panel>
              <q-tab-panel name="myTest">
                <quiz-list :quizType="'myTest'" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FutureQuizzesCarousel from 'src/components/Quiz/FutureQuizzesCarousel'
import QuizList from 'src/components/Quiz/QuizList'

export default defineComponent({
  name: 'List',
  //       ToDo : ProgressLinear
  components: {
    FutureQuizzesCarousel,
    QuizList
  },
  setup() {
    const tab = ref('test')

    return {
      tab
    }
  }

})
</script>

<style lang="scss">
.test-tabs {
  color: #8A8CA6;

  &:deep(.q-tab__indicator) {
    width: 100%;
    height: 6px;
    border-radius: 6px 6px 0 0;
  }

  &:deep(.q-tab) {
    color: var(--3a-TextSecondary);
    padding: 0;
  }

  &:deep(.q-tab__content) {
    padding: 0 24px;
  }

  &:deep(.q-tab__label) {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.03em;
    color: #FFA117;

  }
}
.test-list-title {
  margin: 20px 0 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  color: #434765;
}
.q-tab-panels {
    background: transparent;
    border-top: 2px solid #E4E8EF;

    .q-tab-panel {
      padding: 16px 0;
    }
}
</style>
