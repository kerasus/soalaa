<template>
    <div>


        <v-expansion-panels >
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <v-icon>
                        mdi-clock
                    </v-icon>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col>
                            {{ seconds}}  : {{ minutes}} : {{hours}}
                        </v-col>
                        <v-col>
                            زمان گذشته از شروع آزمون
                        </v-col>
                        <v-col/>
                        <v-col>
                            {{ seconds2}}  : {{ minutes2}} : {{hours2}}
                        </v-col>
                        <v-col>
                            زمان تا پایان دفترچه عمومی
                        </v-col>
                    </v-row>                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>





    </div>
</template>
<!--height is 100px-->
<script>
    export default {
        name: "Timer",
        data: () => ({
            expand: false,
            quizStartedAt : null,
            today:null,
            currentTime : null,
            daftarcheEndTime : null,
            interval:null,
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
            intervals:{
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            },
            start:new Date(),
            interval2:null,
            days2:0,
            hours2:0,
            minutes2:0,
            seconds2:0,
            intervals2:{
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            },
            end:new Date()


        }),
        created() {

            this.today = new Date()
            this.start.setHours(this.today.getHours() - 1)
            this.end.setHours(this.today.getHours() +1 )
            this.currentTime = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

            let event = new Date()
            event.setHours(this.today.getHours() - 1 )
            this.quizStartedAt = event.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

        },
        mounted() {
            this.interval = setInterval(() => {
                this.updateDiffs();
            },1000);

            this.updateDiffs();
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods:{
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

</style>
