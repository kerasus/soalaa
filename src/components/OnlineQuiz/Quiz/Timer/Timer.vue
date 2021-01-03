<template>
    <div class="wrapper" >
    <mobile-timer v-if="windowSize.x < 700"  :passed-time="timer.passedTime" :remaining-time="timer.remainingTime"/>


        <pc-timer  v-else :passed-time="timer.passedTime" :remaining-time="timer.remainingTime"/>
    </div>
</template>
<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import {mixinWindowSize} from '@/mixin/Mixins'
    import {Timer} from "@/models/Timer";

    export default {
        name: "Timer",
        data: () => ({

            interval: null,
            timer: new Timer()

        }),
        mixins: [mixinWindowSize],
        components: {
            MobileTimer,
            PcTimer
        },

        mounted() {
            this.interval = setInterval(() => {
                this.timer.updateTimer();
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
