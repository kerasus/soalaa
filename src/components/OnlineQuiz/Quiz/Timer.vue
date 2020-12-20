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
                    <svg v-if="show" @click="changeCss" class="timerRight" viewBox="0 0.373 28.632 33.403" >
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
                <v-col cols="1"/>


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
            oldStyle: 'width: 130px'


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
                this.oldStyle = ' width:60px'
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

        height: 103px;
        width: 130px;
        border-radius: 20px;
        transition: 0.5s;
        fill: rgba(255,255,255,1);
    }

    .timeCArd:hover {
        cursor: pointer;
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

    .timer {
        width: 28.632px;
        height: 33.403px;
        margin-top: 38px;
        margin-right: 50px;
        transform: matrix(1, 0, 0, 1, 0, 0);
        fill: rgba(136, 136, 136, 1);

    }
    .timerRight {
        width: 28.632px;
        height: 33.403px;
        margin-top: 25px;
        margin-right: 50px;
        transform: matrix(1, 0, 0, 1, 0, 0);
        fill: rgba(255,193,7,1);

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

</style>
