<template>
    <div style="margin-bottom: 0px;width: 100%">
        <!--        <v-btn style="float: left" @click="drawerVisible = true">show</v-btn>-->
        <div v-if="mob" class="timeCArdMob" @click="drawerUp" id="clockBtn">
            <svg class="timerMob" viewBox="0 0.175 13.474 15.719">
                <path id="timer"
                      d="M 8.982000350952148 0.1749999970197678 L 8.982000350952148 1.6839998960495 L 4.491000175476074 1.6839998960495 L 4.491000175476074 0.1749999970197678 L 8.982000350952148 0.1749999970197678 Z M 6 9.928999900817871 L 6 5.439000129699707 L 7.473999977111816 5.439000129699707 L 7.473999977111816 9.930000305175781 L 6 9.930000305175781 Z M 12 4.98199987411499 C 12.98266696929932 6.198666572570801 13.47399997711182 7.590332984924316 13.47399997711182 9.156999588012695 C 13.47399997711182 11.02833271026611 12.81900024414063 12.61899948120117 11.50899982452393 13.92899894714355 C 10.19899940490723 15.23899841308594 8.608333587646484 15.89399814605713 6.736999988555908 15.89399909973145 C 4.86566686630249 15.89400005340576 3.275000333786011 15.23899936676025 1.965000152587891 13.92899894714355 C 0.6549999713897705 12.61899852752686 0 11.03433227539063 0 9.175000190734863 C 0 7.315668106079102 0.6549999713897705 5.725001811981201 1.965000033378601 4.403000354766846 C 3.275000095367432 3.08099889755249 4.865666389465332 2.420332193374634 6.736999988555908 2.421000003814697 C 8.304333686828613 2.421000003814697 9.708000183105469 2.923999786376953 10.94799995422363 3.929999828338623 L 12.00099945068359 2.841999769210815 C 12.37499904632568 3.145999908447266 12.725998878479 3.496999740600586 13.05399894714355 3.894999742507935 L 12 4.98199987411499 Z M 6.736999988555908 14.42099952697754 C 8.187000274658203 14.42099952697754 9.420999526977539 13.90633296966553 10.43900012969971 12.8769998550415 C 11.45700073242188 11.84766674041748 11.96566677093506 10.60799980163574 11.96500015258789 9.157999992370605 C 11.96433353424072 7.707999706268311 11.45566654205322 6.473999977111816 10.43900012969971 5.456000328063965 C 9.422333717346191 4.438000679016113 8.188333511352539 3.929333925247192 6.736999988555908 3.930000066757202 C 5.285666465759277 3.930666208267212 4.051666259765625 4.439332962036133 3.035000085830688 5.455999851226807 C 2.018333911895752 6.47266674041748 1.509667158126831 7.706666946411133 1.508999943733215 9.157999992370605 C 1.5083327293396 10.60933303833008 2.016999244689941 11.8489990234375 3.034999847412109 12.8769998550415 C 4.053000450134277 13.90500068664551 5.287000179290771 14.41966724395752 6.736999988555908 14.42099952697754 Z">
                </path>
            </svg>

        </div>
        <div v-if="mob" class="sideBtns ml-5">

                    <v-icon style="margin-right: 40px;margin-top: 10px">
                        mdi-chevron-right
                    </v-icon>

                    <span style="margin-right: 50px;height:40px">
                        |</span>

                    <v-icon style="margin-right: 50px;margin-top: 10px">
                        mdi-chevron-left
                    </v-icon>

        </div>
        <div v-if="mob"
             class="right-drawer"
             :style="{
        height: drawerVisible ? '90px' : '0',
      }"
        >

            <v-icon @click="drawerVisible = false" style="float: left;
                background-color: rgba(255, 255, 255, 1);margin-left: 10px;margin-top: 30px;font-size: 1.5em;margin-right: 0">
                mdi-close
            </v-icon>

            <div style="padding-top: 10px;padding-bottom: 10px;width: 200px">


                <p style="font-size: 0.6em;margin-right: 10px;width: 60%;margin-left: 10px">
                    زمان گذشته


                    {{ seconds}} : {{ minutes}} : {{hours}}

                </p>


                <p style="font-size: 0.5em;margin-right: 10px">
                    دقیقه تا پایان مهلت پاسخگویی دفترچه عمومی
                    {{ seconds2}} : {{ minutes2}}
                </p>


            </div>
        </div>


        <div v-if="!mob" class="timeCArd " id="test">

            <svg v-if="!show" @click="changeCss" class="timer" viewBox="0 0.373 28.632 33.403">
                <path id="timer"
                      d="M 19.08799934387207 0.3729999959468842 L 19.08799934387207 3.578999996185303 L 9.543999671936035 3.578999996185303 L 9.543999671936035 0.3729999959468842 L 19.08799934387207 0.3729999959468842 Z M 12.75 21.10099983215332 L 12.75 11.55700016021729 L 15.88199996948242 11.55700016021729 L 15.88199996948242 21.10099983215332 L 12.75 21.10099983215332 Z M 25.5 10.58800029754639 C 27.58799934387207 13.17266654968262 28.63199996948242 16.13033294677734 28.63199996948242 19.46100044250488 C 28.63199996948242 23.43766784667969 27.24033355712891 26.81766700744629 24.45700073242188 29.60100173950195 C 21.67366790771484 32.38433456420898 18.29366683959961 33.7760009765625 14.31700038909912 33.7760009765625 C 10.34033298492432 33.7760009765625 6.960332870483398 32.38433456420898 4.177000045776367 29.60100173950195 C 1.393667221069336 26.81766891479492 0.001333872554823756 23.45000076293945 0 19.49799919128418 C -0.001333872554823756 15.54599666595459 1.390332698822021 12.16599655151367 4.175000190734863 9.357998847961426 C 6.959667682647705 6.550000667572021 10.34000015258789 5.145668029785156 14.31599998474121 5.144999980926514 C 17.64666748046875 5.144999980926514 20.62899971008301 6.213666439056396 23.26300048828125 8.35099983215332 L 25.5 6.039999961853027 C 26.29533386230469 6.685999870300293 27.04100036621094 7.431666851043701 27.73699951171875 8.277000427246094 L 25.5 10.58800029754639 Z M 14.31599998474121 30.64500045776367 C 17.39799880981445 30.64500045776367 20.01999855041504 29.55133438110352 22.18199920654297 27.36400032043457 C 24.3439998626709 25.17666625976563 25.42499923706055 22.54233360290527 25.42499923706055 19.46100044250488 C 25.42499923706055 16.37966728210449 24.3439998626709 13.75766754150391 22.18199920654297 11.59500026702881 C 20.01999855041504 9.432332992553711 17.39799880981445 8.35099983215332 14.31599998474121 8.35099983215332 C 11.23400020599365 8.35099983215332 8.612000465393066 9.431999206542969 6.449999809265137 11.5939998626709 C 4.287999153137207 13.75600051879883 3.206665992736816 16.37833404541016 3.206000089645386 19.46100044250488 C 3.205334186553955 22.54366683959961 4.286334037780762 25.1783332824707 6.449000358581543 27.36499977111816 C 8.611665725708008 29.55166625976563 11.23399925231934 30.64499855041504 14.31599998474121 30.64500045776367 Z">
                </path>
            </svg>
            <v-icon v-if="show" @click="changeCss" class="closeIcon">
                mdi-close
            </v-icon>


            <v-row>
                <v-col cols="2">
                    <svg v-if="show" @click="changeCss" class="timerRight" viewBox="0 0.373 28.632 33.403">
                        <path id="timer"
                              d="M 19.08799934387207 0.3729999959468842 L 19.08799934387207 3.578999996185303 L 9.543999671936035 3.578999996185303 L 9.543999671936035 0.3729999959468842 L 19.08799934387207 0.3729999959468842 Z M 12.75 21.10099983215332 L 12.75 11.55700016021729 L 15.88199996948242 11.55700016021729 L 15.88199996948242 21.10099983215332 L 12.75 21.10099983215332 Z M 25.5 10.58800029754639 C 27.58799934387207 13.17266654968262 28.63199996948242 16.13033294677734 28.63199996948242 19.46100044250488 C 28.63199996948242 23.43766784667969 27.24033355712891 26.81766700744629 24.45700073242188 29.60100173950195 C 21.67366790771484 32.38433456420898 18.29366683959961 33.7760009765625 14.31700038909912 33.7760009765625 C 10.34033298492432 33.7760009765625 6.960332870483398 32.38433456420898 4.177000045776367 29.60100173950195 C 1.393667221069336 26.81766891479492 0.001333872554823756 23.45000076293945 0 19.49799919128418 C -0.001333872554823756 15.54599666595459 1.390332698822021 12.16599655151367 4.175000190734863 9.357998847961426 C 6.959667682647705 6.550000667572021 10.34000015258789 5.145668029785156 14.31599998474121 5.144999980926514 C 17.64666748046875 5.144999980926514 20.62899971008301 6.213666439056396 23.26300048828125 8.35099983215332 L 25.5 6.039999961853027 C 26.29533386230469 6.685999870300293 27.04100036621094 7.431666851043701 27.73699951171875 8.277000427246094 L 25.5 10.58800029754639 Z M 14.31599998474121 30.64500045776367 C 17.39799880981445 30.64500045776367 20.01999855041504 29.55133438110352 22.18199920654297 27.36400032043457 C 24.3439998626709 25.17666625976563 25.42499923706055 22.54233360290527 25.42499923706055 19.46100044250488 C 25.42499923706055 16.37966728210449 24.3439998626709 13.75766754150391 22.18199920654297 11.59500026702881 C 20.01999855041504 9.432332992553711 17.39799880981445 8.35099983215332 14.31599998474121 8.35099983215332 C 11.23400020599365 8.35099983215332 8.612000465393066 9.431999206542969 6.449999809265137 11.5939998626709 C 4.287999153137207 13.75600051879883 3.206665992736816 16.37833404541016 3.206000089645386 19.46100044250488 C 3.205334186553955 22.54366683959961 4.286334037780762 25.1783332824707 6.449000358581543 27.36499977111816 C 8.611665725708008 29.55166625976563 11.23399925231934 30.64499855041504 14.31599998474121 30.64500045776367 Z">
                        </path>
                    </svg>
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
            drawerVisible: false,
            visible: false,
            openState: false,
            close: true,
            open: false,
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
            newStyle: 'width: 90%',
            oldStyle: 'width: 130px',
            showModes: ['push', 'shrink', 'overlap'],
            positionModes: ['top', 'bottom'],
            showSubmenuModes: ['slide', 'expand'],
            selectedOpenMode: 'shrink',
            selectedPosition: 'top',
            selectedRevealMode: 'expand',


        }),
        created() {

            this.today = new Date()
            this.start.setHours(this.today.getHours() - 1)
            this.end.setMinutes(this.today.getMinutes() + 1)
            this.currentTime = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

            let event = new Date()
            event.setHours(this.today.getHours() - 1)
            this.quizStartedAt = event.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds()

        },
        mounted() {
            if (window.screen.height < 800) {
                this.mob = true
                // let cardWidth = window.screen.width - 90
                this.newStyle = 'height:80px'
                this.oldStyle = ' height:0px'
            }


            this.interval = setInterval(() => {
                this.updateDiffs();
            }, 1000);

            requestAnimationFrame(this.updateDiffs)

            // this.updateDiffs();
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods: {
            drawerUp() {
                this.drawerVisible = true
            },

            changeCss() {
                if (this.show === false) {
                    if (window.screen.height < 800) {
                        document.getElementById('test').style.cssText = 'height:80px; z-index: 200'
                        document.getElementById('clockBtn').style.cssText = 'z-index: -200;'
                    } else {
                        // let w = window.screen.width -400
                        document.getElementById('test').style.cssText = 'width:100%'
                    }


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
        }


    }
</script>

<style scoped>
    .timeCArd {

        height: 103px;
        width: 130px;
        border-radius: 20px;
        transition: 0.5s;
        background-color: white;
        justify-self: end;
        margin-left: 0;
        float: left;
    }

    .timeCArd:hover {
        cursor: pointer;
    }

    .timeCArdMob {

        float: left;
        background-color: white;
        width: 73px;
        height: 44px;
        border-radius: 15px;

    }

    .timeCArdMobOpened {

        /*fill: rgba(255,255,255,1);*/
        background-color: white;
        width: 300px;
        height: 0px;
        border-radius: 15px;
        transition: 0.5s;
        margin-left: 0;
        padding-left: 0;
        position: relative;


    }

    .timer {
        width: 28.632px;
        height: 33.403px;
        margin-top: 38px;
        margin-right: 50px;
        transform: matrix(1, 0, 0, 1, 0, 0);
        fill: rgba(136, 136, 136, 1);

    }

    .timerMob {
        fill: rgba(136, 136, 136, 1);
        width: 13.474px;
        height: 15.719px;
        margin-right: 30px;
        margin-top: 15px;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }

    .timerRight {
        width: 28.632px;
        height: 33.403px;
        margin-top: 25px;
        margin-right: 50px;
        transform: matrix(1, 0, 0, 1, 0, 0);
        fill: rgba(255, 193, 7, 1);

    }

    .closeIcon {
        float: left;
        height: 30px;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 42px;
        margin-left: 50px;
        color: rgba(136, 136, 136, 1);
        width: 30px;
        font-size: 2.5em;
    }

    .wrapper {
        position: relative;
        width: 300px;
    }

    .dx-overlay-content {
        background-color: lightgray;
    }

    #view {
        margin-left: 10px;
        margin-top: 10px;
    }

    .right-drawer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 300px; /* initially */
        overflow: hidden;
        height: 0;
        padding-bottom: 0; /* initially */
        z-index: 200;
        transition: all 0.2s;
        margin-left: 40px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 1)
    }

    .sideBtns {
        width: 239px;
        height: 44px;
        float: left;
        background-color: white;
        border-radius: 15px;
    }

    .chevron-right {
        overflow: visible;
        position: absolute;
        width: 6.583px;
        height: 10.666px;
        left: 285px;
        top: 640px;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }

    .chevron-left {
        overflow: visible;
        position: absolute;
        width: 6.583px;
        height: 10.666px;
        left: 166px;
        top: 640px;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    .Path_14 {
        overflow: visible;
        position: absolute;
        width: 0.2px;
        height: 20px;
        left: 228.5px;
        top: 635.403px;
        transform: matrix(1,0,0,1,0,0);
    }


</style>
