<template>
    <div class="d-flex justify-center">
        <div  class="sideBtns ml-5 ">
            <v-row>
                <v-col cols="1"/>
                <v-col class="d-flex justify-center">
                    <v-icon class="sideBtnIcons ">
                        mdi-chevron-right
                    </v-icon>
                </v-col>
                <v-col class="d-flex justify-center">
                    <span class="sideBtnIcons  ">|</span>
                </v-col>
                <v-col class="d-flex justify-center">
                    <v-icon class="sideBtnIcons  ">
                        mdi-chevron-left
                    </v-icon>
                </v-col>
                <v-col cols="1"/>
            </v-row>
        </div>
        <div
             class="right-drawer"
             :style="{height: drawerVisible ? '80px' : '0'}"
        >
            <v-icon @click="drawerVisible = false" class="closeIcon">
                mdi-close
            </v-icon>
            <div class="timerInfo">
                <p class="passedTimeText">
                    زمان گذشته
                    {{ seconds}} : {{ minutes}} : {{hours}}
                </p>
                <p class="remainingTimeText">
                    دقیقه تا پایان مهلت پاسخگویی دفترچه عمومی
                    {{ seconds2}} : {{ minutes2}}
                </p>
            </div>
        </div>
        <div  class="timeCArdMob d-flex justify-center elevation-3" @click="drawerUp" id="clockBtn">
            <svg class="timerMob  justify-center" viewBox="0 0.175 13.474 15.719" >
                <path id="timer"
                      d="M 8.982000350952148 0.1749999970197678 L 8.982000350952148 1.6839998960495 L 4.491000175476074 1.6839998960495 L 4.491000175476074 0.1749999970197678 L 8.982000350952148 0.1749999970197678 Z M 6 9.928999900817871 L 6 5.439000129699707 L 7.473999977111816 5.439000129699707 L 7.473999977111816 9.930000305175781 L 6 9.930000305175781 Z M 12 4.98199987411499 C 12.98266696929932 6.198666572570801 13.47399997711182 7.590332984924316 13.47399997711182 9.156999588012695 C 13.47399997711182 11.02833271026611 12.81900024414063 12.61899948120117 11.50899982452393 13.92899894714355 C 10.19899940490723 15.23899841308594 8.608333587646484 15.89399814605713 6.736999988555908 15.89399909973145 C 4.86566686630249 15.89400005340576 3.275000333786011 15.23899936676025 1.965000152587891 13.92899894714355 C 0.6549999713897705 12.61899852752686 0 11.03433227539063 0 9.175000190734863 C 0 7.315668106079102 0.6549999713897705 5.725001811981201 1.965000033378601 4.403000354766846 C 3.275000095367432 3.08099889755249 4.865666389465332 2.420332193374634 6.736999988555908 2.421000003814697 C 8.304333686828613 2.421000003814697 9.708000183105469 2.923999786376953 10.94799995422363 3.929999828338623 L 12.00099945068359 2.841999769210815 C 12.37499904632568 3.145999908447266 12.725998878479 3.496999740600586 13.05399894714355 3.894999742507935 L 12 4.98199987411499 Z M 6.736999988555908 14.42099952697754 C 8.187000274658203 14.42099952697754 9.420999526977539 13.90633296966553 10.43900012969971 12.8769998550415 C 11.45700073242188 11.84766674041748 11.96566677093506 10.60799980163574 11.96500015258789 9.157999992370605 C 11.96433353424072 7.707999706268311 11.45566654205322 6.473999977111816 10.43900012969971 5.456000328063965 C 9.422333717346191 4.438000679016113 8.188333511352539 3.929333925247192 6.736999988555908 3.930000066757202 C 5.285666465759277 3.930666208267212 4.051666259765625 4.439332962036133 3.035000085830688 5.455999851226807 C 2.018333911895752 6.47266674041748 1.509667158126831 7.706666946411133 1.508999943733215 9.157999992370605 C 1.5083327293396 10.60933303833008 2.016999244689941 11.8489990234375 3.034999847412109 12.8769998550415 C 4.053000450134277 13.90500068664551 5.287000179290771 14.41966724395752 6.736999988555908 14.42099952697754 Z">
                </path>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MobileTimer',
        data: () => ({
            drawerVisible: false,
        quizStartedAt: null,
        today: null,
        currentTime: null,
        start: new Date(),
        end: new Date(),
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
        days2: 0,
        hours2: 0,
        minutes2: 0,
        seconds2: 0,
        intervals2: {
            second: 1000,
            minute: 1000 * 60,
            hour: 1000 * 60 * 60,
            day: 1000 * 60 * 60 * 24
        }
        }),
        methods: {
            drawerUp() {
                this.drawerVisible = true
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


                if (this.end.getTime() > Date.now()) {
                    let diff2 = Math.abs(this.end.getTime() - Date.now());
                    this.days2 = Math.floor(diff2 / this.intervals2.day);
                    diff2 -= this.days2 * this.intervals2.day;
                    this.hours2 = Math.floor(diff2 / this.intervals2.hour);
                    diff2 -= this.hours2 * this.intervals2.hour;
                    this.minutes2 = Math.floor(diff2 / this.intervals2.minute);
                    diff2 -= this.minutes2 * this.intervals2.minute;
                    this.seconds2 = Math.floor(diff2 / this.intervals2.second);
                } else {
                    this.days2 = 0
                    this.hours2 = 0
                    this.minutes2 = 0
                    this.seconds2 = 0
                }
            }


        },
        destroyed() {
            clearInterval(this.interval);
        },
        created() {
            this.today = new Date()
            this.start.setMinutes(this.today.getMinutes() - 20)
            this.end.setMinutes(this.today.getMinutes() + 90)
            this.currentTime = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()
            let event = new Date()
            event.setHours(this.today.getHours() - 1)
            this.quizStartedAt = event.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()
        },
        mounted() {
            this.interval = setInterval(() => {
                this.updateDiffs();
            }, 1000);
            requestAnimationFrame(this.updateDiffs)
        }

    }
</script>

<style scoped>
    .remainingTimeText{
        font-size: 2.1vw;margin-right: 10px
    }
    .passedTimeText{
        font-size: 2.1vw;margin-right: 10px;margin-left: 10px
    }
    .timerInfo{
        padding-top: 10px;padding-bottom: 10px;width: 80%
    }
    .closeIcon{
        float: left;
        background-color: rgba(255, 255, 255, 1);margin-left: 10px;margin-top: 30px;font-size: 1.5em;margin-right: 0
    }
    .sideBtnIcons{
        margin: auto;
    }
    .sideBtns {
        width: 239px;
        height: 44px;
        float: left;
        background-color: white;
        border-radius: 15px;
    }
    .timeCArdMob {
        float: left;
        background-color: white;
        width: 15vw;
        height: 44px;
        border-radius: 15px;

    }
    .timerMob {
        fill: rgba(136, 136, 136, 1);
        width: 13.474px;
        height: 15.719px;
        margin: auto;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }

    .right-drawer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 85%; /* initially */
        overflow: hidden;
        height: 0;
        padding-bottom: 0; /* initially */
        z-index: 200;
        transition: all 0.2s;
        margin-left: 40px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 1)
    }
</style>
