<template>
  <div class="wrapper">
    <mobile-timer
      v-if="windowSize.x < 960"
      :passed-time="passedTime"
      :remaining-time="remainTime"
      :current-cat="currentCat"
    />
    <pc-timer
      v-else
      :passed-time="passedTime"
      :remaining-time="remainTime"
      :current-cat="currentCat"
      @timerOpen="passEvent"
    />
  </div>
</template>

<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import {mixinWindowSize, mixinQuiz} from '@/mixin/Mixins'
    import Time from "@/plugins/time";
    import Assistant from "@/plugins/assistant";

    export default {
        name: "Timer",
        components: {
            MobileTimer,
            PcTimer
        },
        mixins: [mixinWindowSize, mixinQuiz],
        data: () => ({
            currentCat: null,
            interval: null,
            passedTime: '00:00:00',
            remainTime: false,
        }),
        mounted() {
            let that = this
            this.interval = setInterval(() => {
                const newCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
                that.calcRemainAndPassedTime(newCat)
                that.doActionsOnChangeCategory(newCat)
                that.checkExamAcceptAt()
            }, 1000)
            // requestAnimationFrame(this.timer.updateTimer) // webpack-internal:///./src/models/Timer.js:58 Uncaught TypeError: Cannot read property 'updateDiffs' of undefined
        },
        destroyed() {
            clearInterval(this.interval)
        },
        methods: {
            passEvent (value) {
                this.$emit('timerOpen', value)
            },
            calcRemainAndPassedTime (newCat) {
                this.passedTime = Time.getPassedTime(this.quiz.created_at)
                this.calcRemainTime(newCat)
            },
            calcRemainTime (newCat) {
                if (newCat) {
                    this.remainTime = Time.getRemainTime(newCat.accept_at)
                } else {
                    this.remainTime = false
                }
            },
            doActionsOnChangeCategory (newCat) {
                if (!newCat || !this.currentCat || Assistant.getId(newCat.id) !== Assistant.getId(this.currentCat.id)) {
                    this.currentCat = newCat
                    // this.$store.commit('setActiveStateOfExamCategories', !this.considerActiveCategoryAndSubcategory)
                  const VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM = process.env.VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM === 'true'
                    this.$store.commit('setActiveStateOfExamCategories', VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM)
                    if (this.currentCat) {
                        this.goToCategory(this.currentCat.id)
                        Time.setStateOfQuestionsBasedOnActiveCategory(this.quiz, this.getCurrentExamQuestions())
                        // this.$store.commit('setActiveStateOfQuestionsBasedOnActiveCategory')
                    }
                    this.setExamAcceptAtIsPassedWhenAllCategoryIsPassed()
                }
            },
            checkExamAcceptAt () {
              const remainTime = Time.getRemainTime(this.quiz.accept_at, false)
              if (remainTime < 0) {
                this.exitFromExamPageWhenExamIsFinished()
              }
            },
            exitFromExamPageWhenExamIsFinished () {
              if (process.env.VUE_APP_CLOSE_EXAM_AFTER_FINISH !== 'true') {
                return
              }
              this.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: 'زمان آزمون شما به اتمام رسیده است.',
                type: 'error'
              })
              this.$router.push({name: 'user.exam.list'})
            },
            setExamAcceptAtIsPassedWhenAllCategoryIsPassed () {
                const newCat = Time.getCurrentCategoryAcceptAt(this.quiz.categories)
                if (!newCat && this.quiz.categories.length > 0) {
                    this.$store.commit('setExamAcceptAtIsPassed')
                    this.exitFromExamPageWhenExamIsFinished()
                }
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        margin-bottom: 0px;
        padding-bottom: 0;
        width: 100%;
        bottom: 0;
    }
</style>
