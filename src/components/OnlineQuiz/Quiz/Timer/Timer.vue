<template>
    <div class="wrapper" >
        <mobile-timer v-if="windowSize.x < 960"  :passed-time="passedTime" :remaining-time="remainTime" :current-cat="currentCat"/>
        <pc-timer v-else :passed-time="passedTime" :remaining-time="remainTime" :current-cat="currentCat"/>
    </div>
</template>
<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import {mixinWindowSize, mixinQuiz} from '@/mixin/Mixins'
    import {Timer} from "@/models/Timer";
    import Time from "@/plugins/time";
    import Assistant from "@/plugins/assistant";

    export default {
        name: "Timer",
        data: () => ({
            currentCat: null,
            interval: null,
            passedTime: '00:00:00',
            remainTime: false,
            timer: new Timer()
        }),
        mixins: [mixinWindowSize, mixinQuiz],
        components: {
            MobileTimer,
            PcTimer
        },
        mounted() {
            let that = this
            this.interval = setInterval(() => {
                Time.setStateOfExamCategories(that.quiz.categories)
                that.passedTime = Time.getPassedTime(that.quiz.created_at)
                const newCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)

                if (newCat) {
                    that.remainTime = Time.getRemainTime(newCat.accept_at)
                } else {
                    that.remainTime = false
                }

                if (!newCat || !that.currentCat || Assistant.getId(newCat.id) !== Assistant.getId(that.currentCat.id)) {
                    that.currentCat = newCat
                    if (that.currentCat) {
                        that.goToCategory(that.currentCat.id)
                        Time.setStateOfQuestionsBasedOnActiveCategory(this.quiz)
                    }
                    that.setExamAcceptAtIsPassedField()
                    that.$store.commit('updateQuiz', that.quiz)
                }
            }, 1000)
            // requestAnimationFrame(this.timer.updateTimer) // webpack-internal:///./src/models/Timer.js:58 Uncaught TypeError: Cannot read property 'updateDiffs' of undefined
        },
        methods: {
            setExamAcceptAtIsPassedField () {
                const newCat = Time.getCurrentCategoryAcceptAt(this.quiz.categories)
                if (!newCat && this.quiz.categories.length > 0) {
                    this.quiz.accept_at_is_passed = true
                }
            }
        },
        destroyed() {
            clearInterval(this.interval);
        },
        created() {
            let today = new Date()
            this.timer.start.setMinutes(today.getMinutes() - 20)
            this.timer.end.setMinutes(today.getMinutes() + 20)
        },

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
