<template>
    <div class="wrapper" >
        <mobile-timer v-if="windowSize.x < 960"  :passed-time="passedTime" :remaining-time="remainTime"/>
        <pc-timer v-else :passed-time="passedTime" :remaining-time="remainTime"/>
    </div>
</template>
<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import {mixinWindowSize, mixinQuiz} from '@/mixin/Mixins'
    import {Timer} from "@/models/Timer";
    import Time from "@/plugins/time";

    export default {
        name: "Timer",
        data: () => ({
            interval: null,
            passedTime: '00:00:00',
            remainTime: '00:00:00',
            timer: new Timer()
        }),
        mixins: [mixinWindowSize, mixinQuiz],
        components: {
            MobileTimer,
            PcTimer
        },
        mounted() {
            this.interval = setInterval(() => {
                Time.setStateOfExamCategories(this.quiz.categories)
                this.passedTime = Time.getPassedTime(this.quiz.created_at)
                this.remainTime = Time.getRemainTime('2021-01-13 08:44:00')
                // this.timer.updateTimer();
            }, 1000);
            // requestAnimationFrame(this.timer.updateTimer) // webpack-internal:///./src/models/Timer.js:58 Uncaught TypeError: Cannot read property 'updateDiffs' of undefined
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
