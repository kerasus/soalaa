<template>
    <div style="margin-bottom: 30px">

        <v-speed-dial
                v-model="fab"
                class="mr-8 mt-10"
                :top="top"
                :bottom="bottom"
                :right="right"
                :left="left"
                :direction="direction"
                :open-on-hover="hover"
                :transition="transition"
        >
            <template v-slot:activator>
                <v-btn
                        v-model="fab"
                        color="blue darken-2"
                        dark
                        fab
                >
                    <v-icon v-if="fab">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-clock
                    </v-icon>
                </v-btn>
            </template>
            <div class="timeCArd">
                <v-row>
                    <v-col cols="1"/>
                    <v-col >

                            {{ seconds}} : {{ minutes}} : {{hours}}

                        <span style="margin-right: 10px">
                            زمان گذشته
                        </span>


                    </v-col>
                    <v-col >
                        {{ seconds2}} : {{ minutes2}} : {{hours2}}
                        <span style="margin-right: 10px">
                            دقیقه تا پایان مهلت پاسخگویی دفترچه عمومی
                        </span>


                    </v-col>

                </v-row>





            </div>

        </v-speed-dial>


    </div>
</template>
<!--height is 100px-->
<script>
    export default {
        name: "Timer",
        data: () => ({
            direction: 'right',
            fab: false,
            fling: false,
            hover: false,
            tabs: null,
            top: false,
            right: true,
            bottom: true,
            left: false,
            transition: 'slide-x-transition',
            mini: true,
            drawer: true,
            expand: false,
            quizStartedAt: null,
            today: null,
            currentTime: null,
            daftarcheEndTime: null,
            interval: null,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            intervals: {
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            },
            start: new Date(),
            interval2: null,
            days2: 0,
            hours2: 0,
            minutes2: 0,
            seconds2: 0,
            intervals2: {
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            },
            end: new Date()


        }),
        created() {

            this.today = new Date()
            this.start.setHours(this.today.getHours() - 1)
            this.end.setHours(this.today.getHours() + 1)
            this.currentTime = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

            let event = new Date()
            event.setHours(this.today.getHours() - 1)
            this.quizStartedAt = event.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

        },
        mounted() {
            this.interval = setInterval(() => {
                this.updateDiffs();
            }, 1000);

            this.updateDiffs();
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods: {
            changeCss() {
                document.getElementById('test').style.cssText = 'width: 1000px;transition:50s'
            },

            updateDiffs() {
                //lets figure out our diffs
                let diff = Math.abs(Date.now() - this.start.getTime());
                this.days = Math.floor(diff / this.intervals.day);
                diff -= this.days * this.intervals.day;
                this.hours = Math.floor(diff / this.intervals.hour);
                diff -= this.hours * this.intervals.hour;
                this.minutes = Math.floor(diff / this.intervals.minute);
                diff -= this.minutes * this.intervals.minute;
                this.seconds = Math.floor(diff / this.intervals.second);


                let diff2 = Math.abs(this.end.getTime() - Date.now());
                this.days2 = Math.floor(diff2 / this.intervals2.day);
                diff2 -= this.days2 * this.intervals2.day;
                this.hours2 = Math.floor(diff2 / this.intervals2.hour);
                diff2 -= this.hours2 * this.intervals2.hour;
                this.minutes2 = Math.floor(diff2 / this.intervals2.minute);
                diff2 -= this.minutes2 * this.intervals2.minute;
                this.seconds2 = Math.floor(diff2 / this.intervals2.second);
            }
        }


    }
</script>

<style scoped>
    .timeCArd {

        background-color: #e1e1e1;
        height: 100px;
        width: 1200px;
        border-radius: 15px;

    }

    /*div {*/
    /*    width: 30px;*/
    /*    transition: width 1s;*/
    /*}*/
    /*div:hover {*/
    /*    width: 1000px;*/
    /*}*/
    .timer {
        height: 100px;
        border-radius: 55px;
        background-color: darkgray;
    }

</style>
