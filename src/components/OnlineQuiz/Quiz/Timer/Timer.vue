<template>
    <div class="wrapper" >
        <mobile-timer v-if="windowSize.x < 960"  :passed-time="passedTime" :remaining-time="remainTime" :current-cat="currentCat"/>
        <pc-timer @timerOpen="passEvent" v-else :passed-time="passedTime" :remaining-time="remainTime" :current-cat="currentCat"/>
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
        data: () => ({
            currentCat: null,
            interval: null,
            passedTime: '00:00:00',
            remainTime: false,
        }),
        mixins: [mixinWindowSize, mixinQuiz],
        components: {
            MobileTimer,
            PcTimer
        },
        mounted() {
            let that = this
            this.interval = setInterval(() => {
                const newCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
                that.calcRemainAndPassedTime(newCat)
                that.doActionsOnChangeCategory(newCat)
            }, 1000)
            // requestAnimationFrame(this.timer.updateTimer) // webpack-internal:///./src/models/Timer.js:58 Uncaught TypeError: Cannot read property 'updateDiffs' of undefined
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
                    this.$store.commit('setActiveStateOfExamCategories')
                    if (this.currentCat) {
                        this.goToCategory(this.currentCat.id)
                        this.$store.commit('setActiveStateOfQuestionsBasedOnActiveCategory')
                    }
                    this.setExamAcceptAtIsPassedWhenAllCategoryIsPassed()
                }
            },
            setExamAcceptAtIsPassedWhenAllCategoryIsPassed () {
                const newCat = Time.getCurrentCategoryAcceptAt(this.quiz.categories)
                if (!newCat && this.quiz.categories.length > 0) {
                    this.$store.commit('setExamAcceptAtIsPassed')
                }
            }
        },
        destroyed() {
            clearInterval(this.interval)
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
