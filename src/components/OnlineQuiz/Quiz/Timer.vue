<template>
    <div style="margin-bottom: 0px">


        <div v-if="mob " id="test" class="timeCArd1">


            <v-icon v-if="show" @click="changeCss" style="float: left;
        background-color: #e1e1e1;margin-left: 10px;margin-top: 30px;font-size: 0.8em;margin-right: 0">
            mdi-close
        </v-icon>

            <div v-if="show" style="padding-top: 10px;padding-bottom: 10px;width: 200px">


                <p style="font-size: 0.6em;margin-right: 10px;width: 60%;margin-left: 10px">
                    زمان گذشته


                    {{ seconds}} : {{ minutes}} : {{hours}}

                </p>



                <p style="font-size: 0.6em;margin-right: 10px">
                    دقیقه تا پایان مهلت پاسخگویی دفترچه عمومی
                    {{ seconds2}} : {{ minutes2}}
                </p>


            </div>



            <v-icon v-if="!show" @click="changeCss" style="float: left;
        background-color: #e1e1e1;margin-top: 15px;margin-left: 18px">
                mdi-clock
            </v-icon>


        </div>


        <div class="timeCArd" id="test" v-if="!mob">

            <v-icon v-if="!show" @click="changeCss" style="float: left;
        height: 10px;background-color: #e1e1e1;margin-top: 47px;margin-left: 30px">
                mdi-clock
            </v-icon>
            <v-icon v-if="show" @click="changeCss" style="float: left;
        height: 10px;background-color: #e1e1e1;margin-top: 47px;margin-left: 30px">
                mdi-close
            </v-icon>


            <v-row>
                <v-col cols="2">
                    <v-icon v-if="show" style="color: darkgoldenrod;margin-top: 30px;margin-right: 30px">
                        mdi-clock
                    </v-icon>
                </v-col>
                <v-col v-if="show" style="margin-top: 30px">

                    زمان گذشته

                    <span style="margin-right: 10px">
                         {{ seconds}} : {{ minutes}} : {{hours}}

                        </span>


                </v-col>
                <v-col v-if="show" style="margin-top: 30px">
                    دقیقه تا پایان مهلت پاسخگویی دفترچه عمومی
                    <span style="margin-right: 10px">
                        {{ seconds2}} : {{ minutes2}} : {{hours2}}

                        </span>


                </v-col>


            </v-row>


        </div>
    </div>
</template>
<!--height is 100px-->
<script>
    export default {
        name: "Timer",
        data: () => ({
            mob: false,
            show: false,
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
            end: new Date(),
            newStyle: 'width: 1200px',
            oldStyle: 'width: 100px'


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
            if (window.screen.height < 800) {
                this.mob = true
                let cardWidth = window.screen.width - 90
                this.newStyle = ' width:' + cardWidth + 'px;height:80px'
                this.oldStyle= ' width:60px'
            }


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
                if (this.show === false) {
                    document.getElementById('test').style.cssText = this.newStyle
                    setTimeout(() => this.show = true, 200)

                } else {
                    document.getElementById('test').style.cssText = this.oldStyle
                    this.show = false
                }

            },

            updateDiffs() {
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
        width: 100px;
        border-radius: 15px;
        transition: 0.5s;

    }

    .timeCArd1 {

        background-color: #e1e1e1;
        height: 60px;
        width: 60px;
        border-radius: 15px;
        transition: 0.5s;
        margin-left: 0;
        padding-left: 0;

    }

</style>
