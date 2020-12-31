<template>
    <div class="wrapper" >
    <mobile-timer v-if="windowSize.x < 700"  :passed-time="passedTime" :remaining-time="remainingTime"/>


        <pc-timer  v-else :passed-time="passedTime" :remaining-time="remainingTime"/>
    </div>
</template>
<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import {mixinWindowSize} from '@/mixin/Mixins'

    export default {
        name: "Timer",
        data: () => ({
            start: new Date(),
            end: new Date(),
            interval: null,
            passedTime: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                intervals: {
                    second: 1000,
                    minute: 1000 * 60,
                    hour: 1000 * 60 * 60,
                    day: 1000 * 60 * 60 * 24
                }
            },
            remainingTime: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                intervals: {
                    second: 1000,
                    minute: 1000 * 60,
                    hour: 1000 * 60 * 60,
                    day: 1000 * 60 * 60 * 24
                }
            }
        }),
        mixins: [mixinWindowSize],
        components: {
            MobileTimer,
            PcTimer
        },
        methods: {

            updateDiffs(upperTime, lowerTime, targetTime) {

                let diff = Math.abs(upperTime - lowerTime);
                targetTime.days = Math.floor(diff / targetTime.intervals.day);
                diff -= targetTime.days * targetTime.intervals.day;
                targetTime.hours = Math.floor(diff / targetTime.intervals.hour);
                diff -= targetTime.hours * targetTime.intervals.hour;
                targetTime.minutes = Math.floor(diff / targetTime.intervals.minute);
                diff -= targetTime.minutes * targetTime.intervals.minute;
                targetTime.seconds = Math.floor(diff / targetTime.intervals.second);
            },
            updateTimer() {
                this.updateDiffs(Date.now(), this.start.getTime(), this.passedTime)
                if (this.end.getTime() > Date.now()) {
                    this.updateDiffs(this.end.getTime(), Date.now(), this.remainingTime)

                } else {
                    this.remainingTime.days = 0
                    this.remainingTime.hours = 0
                    this.remainingTime.minutes = 0
                    this.remainingTime.seconds = 0
                }
            }
        },
        mounted() {
            this.interval = setInterval(() => {
                this.updateTimer();
            }, 1000);
            requestAnimationFrame(this.updateTimer)
        },
        destroyed() {
            clearInterval(this.interval);
        },
        created() {
            // let quizStartedAt = null

            // let currentTime = null

            let today = new Date()
            this.start.setMinutes(today.getMinutes() - 20)
            this.end.setMinutes(today.getMinutes() + 1)
            // currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            let event = new Date()
            event.setHours(today.getHours() - 1)
            // quizStartedAt = event.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        },

    }
</script>

<style scoped>
    .wrapper {
        margin-bottom: 0px;
        width: 100%
    }
</style>
