<template>
    <v-container fluid>
        <v-row class="d-flex justify-center">
            <v-col>
                <info/>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col>
                <v-card elevation="0" class="infoCard align-content-center">
                    <v-row style="height: 50% ;margin: inherit;">
                        <v-col xl="3" sm="6" cols="12" class="exam-title">
                            نتیجه
                            {{ quiz.title }}
                            سه آ
                        </v-col>
                        <v-col v-if="report" xl="1" sm='3' cols="6">
                            شهر:
                            {{ report.location.city }}
                        </v-col>
                        <v-col v-if="report" xl="1" sm='3' cols="6">
                            استان:
                            {{ report.location.province }}
                        </v-col>
                        <v-col xl="7" cols="12" :style="{ padding: '0 12px' }">
                            <v-tabs v-model="tab" color="#ffc107" center-active show-arrows>
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                                <v-tab>کارنامه</v-tab>
                                <v-tab>تخمین رتبه</v-tab>
                                <v-tab>ریزدرس ها</v-tab>
                                <v-tab>پاسخبرگ کلیدی</v-tab>
                                <v-tab>پاسخ نامه تشریحی</v-tab>
                                <v-tab>تحلیل ویدیویی</v-tab>
                            </v-tabs>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <PersonalResult :report="report"/>
                    </v-tab-item>
                    <v-tab-item>
                        <takhmin-rotbe :report="report" />
                    </v-tab-item>
                    <v-tab-item>
                        <StatisticResult :report="report"/>
                    </v-tab-item>
                    <v-tab-item>
                        <BubbleSheet :info="{ type: 'pasokh-nameh' }" delay-time="0" />
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <p class="tab-title pt-5 pr-5">
                                دانلود پاسخنامه تشریحی
                            </p>
                            <v-row v-if="report" class="download-row">
                                <v-col md="6">
                                    <div class="download-box">
                                        <p class="download-title">دانلود پاسخنامه تشریحی {{ report.exams_booklet[0].title }}</p>
                                        <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[0].descriptive_answers_url"  target="_blank">
                                            دانلود فایل PDF
                                            <v-icon class="donwload-icon">mdi-download</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col md="6">
                                    <div class="download-box">
                                        <p class="download-title">دانلود {{ report.exams_booklet[0].title }}</p>
                                        <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[0].questions_url" target="_blank">
                                            دانلود فایل PDF
                                            <v-icon class="donwload-icon">mdi-download</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col v-if="report.exams_booklet[1]" md="6">
                                    <div class="download-box">
                                        <p class="download-title">دانلود پاسخنامه تشریحی {{ report.exams_booklet[1].title }}</p>
                                        <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[1].descriptive_answers_url"  target="_blank">
                                            دانلود فایل PDF
                                            <v-icon class="donwload-icon">mdi-download</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col v-if="report.exams_booklet[1]" md="6">
                                    <div class="download-box">
                                        <p class="download-title">دانلود {{ report.exams_booklet[1].title }}</p>
                                        <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[1].questions_url" target="_blank">
                                            دانلود فایل PDF
                                            <v-icon class="donwload-icon">mdi-download</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item class="video-tab">
                        <v-tabs v-if="report" color="#ffc107" :vertical="windowSize.x > 960" center-active show-arrows grow @change="onVideoTabChange">
                            <v-tabs-slider :color="windowSize.x > 960 ? 'transparent' : 'yellow'"></v-tabs-slider>
                            <v-tab v-for="(item, index) in report.sub_category" :key="index">
                                {{ item.sub_category }}
                            </v-tab>
                            <v-tab-item v-for="(item, index) in report.sub_category" :key="item.sub_category" class="pt-5">
                                <v-alert
                                        v-if="!currentVideo"
                                        dense
                                        outlined
                                        text
                                        type="info"
                                >
                                    منتشر نشده
                                </v-alert>
                                <v-alert v-if="currentVideo" class="text-center">
                                    {{ currentVideo.title }}
                                </v-alert>
<!--                                <p v-if="!currentVideo" class="coming-soon" :style="{ 'margin-top': '50px'}">منتشر نشده</p>-->
<!--                                <p v-if="currentVideo" class="video-title">{{ currentVideo.title }}</p>-->
                                <v-row v-if="currentVideo">
                                    <v-col>
                                        <v-row no-gutters>
                                            <v-col md="3" class="vjs-playlist" :style="{ height: timepointsHeights+'px'}">
                                                <v-card
                                                        class="mx-auto"
                                                        tile
                                                >
                                                    <v-list dense shaped>
                                                        <v-subheader>زمان کوب ها</v-subheader>
                                                        <v-list-item-group
                                                                v-model="selectedTimepoint"
                                                                color="primary"
                                                        >
                                                            <v-list-item
                                                                    v-for="(item, i) in currentVideo.timepoints"
                                                                    :key="i"
                                                            >
                                                                <v-list-item-content>
                                                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                                                </v-list-item-content>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                </v-card>
                                            </v-col>
                                            <v-col md="9">
                                                <video :ref="'videoPlayer'+index" class="video-js vjs-default-skin vjs-16-9 vjs-fluid" />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row v-if="currentVideo">
                                    <v-col>
                                        <div class="d-flex flex-row justify-center" dir="ltr">
                                            <v-btn outlined v-for="(video, index) in alaaVideos" :key="index" @click="getContent(video.id)" icon :style="{ margin: '0 5px' }">
                                                {{ index + 1 }}
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>

<!--                                <video v-if="currentVideo"-->
<!--                                       :src="currentVideo.file.video[1].link"-->
<!--                                       type="video/mp4"-->
<!--                                       controls-->
<!--                                       :poster="currentVideo.photo"-->
<!--                                       :width="'60%'"-->
<!--                                       class="video-player"-->
<!--                                       :title="currentVideo.title"-->
<!--                                />-->

                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  // import $ from 'jquery'
  // import axios from 'axios'
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css'
    // The following registers the plugin with `videojs`
    require('@silvermine/videojs-quality-selector')(videojs)

    import Info from '@/components/OnlineQuiz/Quiz/resultTables/info'
    import PersonalResult from '@/components/OnlineQuiz/Quiz/resultTables/personalResult'
    import BubbleSheet from '@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
    import Assistant from '@/plugins/assistant'
    import {AlaaSet} from '@/models/AlaaSet'
    import {mixinAuth, mixinQuiz, mixinWindowSize} from '@/mixin/Mixins'
    import {AlaaContent} from '@/models/AlaaContent'
    import StatisticResult from '@/components/OnlineQuiz/Quiz/resultTables/statisticResult'
    import API_ADDRESS from '@/api/Addresses'
    import TakhminRotbe from "@/components/OnlineQuiz/Quiz/TakhminRotbe";
  import {QuestionList} from "@/models/Question";
  import {Exam} from "@/models/Exam";

  // class ExamData {
  //
  //   constructor() {
  //     this.rollbacks = []
  //     this.commands = []
  //     this.status = true
  //     this.questions = []
  //     this.questionsFileUrl = null
  //     this.axiosError = null
  //
  //   }
  //
  //   run() {
  //     this.commands.reduce(function (prev, curr) {
  //       return prev.promise.then((result) => {
  //         prev.then(result)
  //         curr.promise
  //       });
  //     })
  //             .then(function (result) {
  //               console.log('RESULT is ' + result);  // prints "RESULT is 7"
  //             });
  //
  //     // this.setPromisesResolveAndReject()
  //     // this.commands[0].promise()
  //     // return new Promise(function (resolve, reject) {
  //     //   Promise.all(this.promises)
  //     //           .then((values) => {
  //     //             resolve(values)
  //     //           })
  //     //           .catch(error => {
  //     //             reject(error)
  //     //           })
  //     // })
  //   }
  //
  //   setPromiseResolveAndReject (command, nextCommand) {
  //     command.promise
  //             .then( response => {
  //               command.then(response)
  //               if (nextCommand) {
  //                 return nextCommand.promise
  //               }
  //             })
  //             .catch( error => {
  //               command.catch(error)
  //             })
  //   }
  //
  //   setPromisesResolveAndReject () {
  //     let that = this
  //     this.commands.forEach( (command, index) => {
  //       let nextCommand = null
  //       if (typeof that.commands[index + 1] !== 'undefined') {
  //         nextCommand = that.commands[index + 1]
  //       }
  //       that.setPromiseResolveAndReject(command, nextCommand)
  //     })
  //   }
  //
  //   loadQuestionsFromFile () {
  //     let that = this
  //     this.commands.push({
  //       promise: axios.get(that.questionsFileUrl),
  //       //         new Promise(function(resolve, reject) {
  //       //   if (!that.questionsFileUrl) {
  //       //     Assistant.handleAxiosError("exam file url is not set")
  //       //     reject("exam file url is not set")
  //       //   }
  //       //
  //       //   $.ajax({
  //       //             type: 'GET',
  //       //             url: that.questionsFileUrl,
  //       //             accept: "application/json; charset=utf-8",
  //       //             dataType: "json",
  //       //             success: function (data) {
  //       //               that.questions = new QuestionList(data)
  //       //               resolve(data)
  //       //             },
  //       //             error: function (jqXHR, textStatus, errorThrown) {
  //       //               reject({jqXHR, textStatus, errorThrown})
  //       //             }
  //       //           }
  //       //   );
  //       // }),
  //       then: (data) => {
  //         that.questions = new QuestionList(data)
  //       },
  //       catch: (error) => error,
  //       name: 'loadQuestionsFromFile'
  //     })
  //
  //     return this
  //     // https://node3.alaatv.com/aaa/questionFiles/3a_1400_ensani_final_202104150852_withAnswer.json
  //   }
  //
  //   getUserAnswersAndExamFileWithAnswerUrl(user_exam_id) {
  //     let that = this
  //     this.commands.push({
  //       promise: axios.get(API_ADDRESS.exam.getAnswerOfUserWithCorrect(user_exam_id)),
  //       then: (response) => {
  //         let userExamForParticipate = new Exam()
  //         userExamForParticipate.user_exam_id = Assistant.getId(user_exam_id)
  //         userExamForParticipate.title = response.data.data.exam.title
  //         userExamForParticipate.questions_file_url = response.data.data.exam.questions_file_url
  //         that.questionsFileUrl = response.data.data.exam.questions_file_url
  //       },
  //       catch: (error) => error,
  //       name: 'getUserAnswersAndExamFileWithAnswerUrl'
  //     })
  //
  //     return this
  //   }
  //
  // }


    export default {
        name: 'Result',
        components: {TakhminRotbe, StatisticResult, BubbleSheet, Info, PersonalResult},
        mixins: [mixinAuth, mixinQuiz, mixinWindowSize],
        watch: {
            selectedTimepoint () {
                this.playTimePoint()
            },
            tab () {
                if (!this.player) {
                    return
                }
                this.player.pause()
            }
        },
        data: () => ({
            tab: null,
            selectedTimepoint: null,
            timepointsHeights: 0,
            videoLesson: null,
            alaaSet: new AlaaSet(),
            alaaContent: new AlaaContent(),
            alaaVideos: null,
            currentVideo: null,
            report: null,
            player: null
        }),
        created() {
            this.getUserData()
            window.currentExamQuestions = null
            window.currentExamQuestionIndexes = null
        },
        mounted() {
            let that = this
            let user_exam_id = this.$route.params.user_exam_id
            let exam_id = this.$route.params.exam_id

          // let examData = new ExamData()
          // examData.getUserAnswersAndExamFileWithAnswerUrl(user_exam_id).loadQuestionsFromFile().run()

            this.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})
            this.user.loadExamDataForShowResult(user_exam_id)
                .then(({userExamForParticipate}) => {
                    that.loadExam(userExamForParticipate, 'results', exam_id)
                        .then(() => {
                            that.quiz.id = exam_id
                            that.quiz.show(exam_id, API_ADDRESS.exam.report.getReport(user_exam_id))
                            .then((response) => {
                                that.report = response.data.data
                                that.loadKarname(that.report)
                                that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                            })
                            .catch( () => {
                                that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                                that.goToExamList()
                                that.$notify({
                                    group: 'notifs',
                                    title: 'توجه!',
                                    text: 'مشکلی در بارگزاری اطلاعات آزمون رخ داده است.',
                                    type: 'error'
                                })
                                Assistant.reportErrors({location: 'pages/user/exam/Result.vue -> loadExam()'})
                            })
                        })
                        .catch( () => {
                            that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                            that.goToExamList()
                            that.$notify({
                                group: 'notifs',
                                title: 'توجه!',
                                text: 'مشکلی در دریافت اطلاعات آزمون رخ داده است.',
                                type: 'error'
                            })
                            Assistant.reportErrors({location: 'pages/user/exam/Result.vue -> loadExam()'})
                        })
                })
                .catch( () => {
                    that.goToExamList()
                    this.$notify({
                        group: 'notifs',
                        title: 'توجه!',
                        text: 'مشکلی در دریافت اطلاعات نتایج آزمون رخ داده است.',
                        type: 'error',
                        duration: 30000,
                    })
                    Assistant.reportErrors({location: 'pages/user/exam/Result.vue -> created()'})
                    this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                })

            // this.getAlaaSet(1017)
            // 24670
        },
        methods: {
            initVideoJs (srcs, sub_categoryIndex) {
                if (!this.$refs['videoPlayer'+sub_categoryIndex]) {
                    return
                }
                let that = this
                this.player = videojs(that.$refs['videoPlayer'+sub_categoryIndex][0], {
                        language: 'fa',
                        controls: true
                    },
                    function onPlayerReady() {
                        console.log('onPlayerReady', this)
                    })
                this.player.controlBar.addChild('QualitySelector')
                this.updateTimepointsHeights(sub_categoryIndex)
                this.updateVideoSrc(srcs)
            },
            updateVideoSrc (srcs) {
                let updatedSrcs = this.getVideoSrcs(srcs)
                this.player.pause()
                this.player.src(updatedSrcs)
                this.player.load()
            },
            updateTimepointsHeights (sub_categoryIndex) {
                this.timepointsHeights = this.$refs['videoPlayer'+sub_categoryIndex][0].clientHeight
            },
            playTimePoint () {
                this.player.pause()
                this.player.currentTime(this.currentVideo.timepoints[this.selectedTimepoint].time)
                this.player.play()
            },
            getVideoSrcs (srcs) {
                let updatedSrcs = []
                srcs.forEach( video => {
                    updatedSrcs.push({
                        src: video.link,
                        type: 'video/'+video.ext,
                        res: video.res,
                        default: (video.res === '240p'),
                        label: video.caption
                    })
                })

                return updatedSrcs
            },
            goToExamList () {
                if (this.$route.name !== 'user.exam.list') {
                    this.$router.push({ name: 'user.exam.list' })
                }
            },
            loadKarname (report) {
                this.loadSubCategory(report)
                this.loadZirGrooh(report.zirgorooh)
                this.loadBest(report.best)
                this.loadFirstVideoTab()
                report.main.taraaz = parseFloat(report.main.taraaz).toFixed(0)
            },
            loadBest (best) {
                best.sub_category.forEach((item, index) => {
                    item.top_ranks_taraaz_mean = parseFloat(item.top_ranks_taraaz_mean).toFixed(0)
                    item.mean = parseFloat(item.mean).toFixed(1)
                    item.top_ranks_percent_mean = parseFloat(item.top_ranks_percent_mean).toFixed(1)
                    item.index = index + 1
                })
            },
            loadSubCategory (report) {
                report.sub_category.forEach((item, index) => {
                    let targetBest = report.best.sub_category.find( sub_categoryItem => sub_categoryItem.sub_category ===  item.sub_category)
                    item.percent = parseFloat(item.percent).toFixed(1)
                    item.taraaz = parseFloat(item.taraaz).toFixed(0)
                    item.empty = item.total_answer - item.right_answer - item.wrong_answer
                    item.index = index + 1
                    if (targetBest) {
                        item.top_ranks_taraaz_mean = parseFloat(targetBest.top_ranks_taraaz_mean).toFixed(0)
                        item.top_ranks_percent_mean = parseFloat(targetBest.top_ranks_percent_mean).toFixed(1)
                        item.average = parseFloat(targetBest.mean).toFixed(1)
                        item.taraaz_average = parseFloat(targetBest.taraaz_mean).toFixed(1)
                    }
                })
            },
            loadZirGrooh (zirgorooh) {
                zirgorooh.sort((first, second) => {
                    return first.title.localeCompare(second.title)
                })
                zirgorooh.forEach((item) => {
                    item.percent = parseFloat(item.percent).toFixed(1)
                    item.taraaz = parseFloat(item.taraaz).toFixed(0)
                })
            },
            getContent (contentId, sub_categoryIndex) {
                let that = this
                this.alaaContent.show(contentId)
                .then((response) => {
                    that.currentVideo = response.data.data
                    that.initVideoJs(that.currentVideo.file.video, sub_categoryIndex)
                })
                .catch((error) => {
                    Assistant.reportErrors(error)
                    that.currentVideo = null
                })
            },
            getAlaaSet (setId, sub_categoryIndex) {
                let that = this
                this.alaaSet.loading = true
                this.alaaSet.show(setId)
                .then( (response) => {
                    that.alaaSet.loading = false
                    that.alaaSet = new AlaaSet(response.data.data)
                    that.alaaVideos = that.alaaSet.contents.getVideos()
                    that.getContent(that.alaaVideos[0].id, sub_categoryIndex)
                })
                .catch( () => {
                    that.alaaSet.loading = false
                })
            },
            loadFirstVideoTab () {
                this.onVideoTabChange(0)
            },
            onVideoTabChange (tabIndex) {
                if (this.player) {
                    this.player.pause()
                }

                if (this.report && this.report.sub_category[tabIndex].video_url) {
                    const parsed = this.report.sub_category[tabIndex].video_url.split('/')
                    let setId = parsed[parsed.length - 1]
                    if(setId === '') {
                        setId = parsed[parsed.length - 2]
                    }
                    this.getAlaaSet(setId, tabIndex)
                } else {
                    this.currentVideo = null
                }
            }
        }
    }
</script>

<style>
    .vjs-menu-button-popup .vjs-menu {
        left: auto;
        right: 0;
    }
    .vjs-player {
    }
    .vjs-playlist {
        overflow: auto;
    }

    @media only screen and (min-width: 960px) {
        .video-tab,
        .video-tab .v-tabs .v-slide-group__wrapper {
            background-color: #f4f4f4 !important;
        }

        .video-tab .v-tabs .v-slide-group__wrapper {
            padding: 25px 0;
        }

        .video-tab .v-window.v-item-group.theme--light.v-tabs-items {
            border-radius: 25px;
        }

        .video-tab .v-tab {
            width: 200px;
            background: #ebeaea;
            margin: 5px 0 5px 20px;
            height: 48px !important;
            border-radius: 10px;
        }

        .video-tab .v-tab.v-tab--active {
            background-color: #fff;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            margin-left: 0 !important;
            box-sizing: content-box;
            border-right: 10px solid rgb(255, 193, 7);
            padding-right: 0;
        }
    }

    .text-center {
        direction: ltr;
    }

    .tab-title {
        margin: 16px;
    }

    .download-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px 0;
    }

    .video-player {
        border-radius: 25px;
        margin: 20px 0;
    }

    .download-row .v-btn__content {
        color: #666;
    }

    .download-row .v-btn--outlined {
        border: 5px solid currentColor;
        border-radius: 30px;
    }
</style>

<style scoped>
    .theme--light.v-tabs-items {
        background-color: transparent;
    }
    .exam-title {
        display: flex;
        align-items: center;
    }

    .download-row {
        margin: 0 10%;
    }



    .video-title {
        margin-top: 20px;
    }
</style>
