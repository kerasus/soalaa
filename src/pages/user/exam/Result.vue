<template>
    <v-container fluid>
        <v-row class="d-flex justify-center">
            <v-col>
                <info/>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col>
                <v-card elevation="0" class="infoCard align-content-center"
                        >
                    <v-row style="height: 50%;margin: inherit;">
                        <v-col sm="4" class="exam-title">
                            نتایج آزمون اول سه‌آ -
                            {{ quiz.title }}
                        </v-col>
                        <v-col :style="{ padding: '0 12px' }">
                            <v-tabs v-model="tab" color="#ffc107" center-active show-arrows>
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                                <v-tab>کارنامه</v-tab>
                                <v-tab>ریزدرس ها</v-tab>
                                <v-tab>پاسخبرگ کلیدی</v-tab>
                                <v-tab>پاسخ نامه تشریحی</v-tab>
                                <v-tab>نتایج نفرات برتر</v-tab>
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
                        <StatisticResult :report="report"/>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <BubbleSheet :info="{ type: 'pasokh-nameh' }" delay-time="0" />
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <p class="tab-title">
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
                            <v-col md="6">
                                <div class="download-box">
                                    <p class="download-title">دانلود پاسخنامه تشریحی {{ report.exams_booklet[1].title }}</p>
                                    <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[0].descriptive_answers_url"  target="_blank">
                                        دانلود فایل PDF
                                        <v-icon class="donwload-icon">mdi-download</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col md="6">
                                <div class="download-box">
                                    <p class="download-title">دانلود {{ report.exams_booklet[1].title }}</p>
                                    <v-btn outlined color="--primary-2" height="75px" width="250px" :href="report.exams_booklet[0].questions_url" target="_blank">
                                        دانلود فایل PDF
                                        <v-icon class="donwload-icon">mdi-download</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <top-score-result :report="report"/>
                    </v-tab-item>
                    <v-tab-item class="video-tab">
                        <v-tabs v-if="report" color="#ffc107" :vertical="windowSize.x > 960" center-active show-arrows grow @change="onVideoTabChange">
                            <v-tabs-slider :color="windowSize.x > 960 ? 'transparent' : 'yellow'"></v-tabs-slider>
                            <v-tab v-for="(item, index) in report.sub_category" :key="index">
                                {{ item.sub_category }}
                            </v-tab>
                            <v-tab-item v-for="item in report.sub_category" :key="item.sub_category">
                                <p v-if="!currentVideo" class="coming-soon" :style="{ 'margin-top': '50px'}">به زودی</p>
                                <p v-if="currentVideo" class="video-title">{{ currentVideo.title }}</p>
                                <video v-if="currentVideo" :src="currentVideo.file.video[1].link" type="video/mp4" controls :poster="currentVideo.photo" :width="'60%'" class="video-player" :title="currentVideo.title"/>
                                <div v-if="currentVideo" class="d-flex flex-row" dir="ltr">
                                    <v-btn outlined v-for="(video, index) in alaaVideos" :key="index" @click="getContent(video.id)" icon :style="{ margin: '0 5px' }">
                                        {{ index + 1 }}
                                    </v-btn>
                                </div>
                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";
    import TopScoreResult from "@/components/OnlineQuiz/Quiz/resultTables/topScoreResult";
    import PersonalResult from "@/components/OnlineQuiz/Quiz/resultTables/personalResult";
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import Assistant from "@/plugins/assistant";
    import {AlaaSet} from "@/models/AlaaSet";
    import {mixinAuth, mixinQuiz, mixinWindowSize} from "@/mixin/Mixins";
    import {AlaaContent} from "@/models/AlaaContent";
    import StatisticResult from "@/components/OnlineQuiz/Quiz/resultTables/statisticResult";
    import API_ADDRESS from "@/api/Addresses";

    export default {
        name: 'Result',
        components: { StatisticResult, BubbleSheet, TopScoreResult, Info, PersonalResult},
        mixins: [mixinAuth, mixinQuiz, mixinWindowSize],
        data: () => ({
            tab: null,
            videoLesson: null,
            alaaSet: new AlaaSet(),
            alaaContent: new AlaaContent(),
            alaaVideos: null,
            currentVideo: null,
            report: null
        }),
        created() {

            let that = this
            let user_exam_id = this.$route.params.user_exam_id
            let exam_id = this.$route.params.exam_id
            this.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})
            this.user.loadExamDataForShowResult(user_exam_id)
                .then(({userExamForParticipate}) => {
                    that.loadExam(userExamForParticipate, 'results', exam_id)
                        .then(() => {
                            that.quiz.id = exam_id
                            that.quiz.show(exam_id, API_ADDRESS.exam.report.getReport(exam_id))
                            .then((response) => {
                                this.report = response.data.data
                                this.loadKarname(this.report)
                                this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                            })
                        })
                        .catch( () => {
                            Assistant.reportErrors({location: 'pages/user/exam/Result.vue -> loadExam()'})
                            that.$router.push({ name: 'user.exam.list' })
                        })
                })
                .catch( () => {
                    that.$router.push({ name: 'user.exam.list' })
                    Assistant.reportErrors({location: 'pages/user/exam/Result.vue -> created()'})
                })

            this.getAlaaSet(1017)
            // 24670
        },
        methods: {
            getReportFromQuiz () {

            },
            loadKarname (report) {
                this.loadSubCategory(report.sub_category)
                this.loadZirGrooh(report.zirgorooh)
                this.loadBest(report.best)
            },
            loadBest (best) {
                best.sub_category.forEach((item, index) => {
                    item.top_ranks_taraaz_mean = parseFloat(item.top_ranks_taraaz_mean).toFixed(0)
                    item.mean = parseFloat(item.mean).toFixed(1)
                    item.top_ranks_percent_mean = parseFloat(item.top_ranks_percent_mean).toFixed(1)
                    item.index = index + 1
                })
            },
            loadSubCategory (sub_category) {
                sub_category.forEach((item, index) => {
                    item.percent = parseFloat(item.percent).toFixed(1)
                    item.taraaz = parseFloat(item.taraaz).toFixed(0)
                    item.empty = item.total_answer - item.right_answer - item.wrong_answer
                    item.index = index + 1
                })
            },
            loadZirGrooh (zirgorooh) {
                zirgorooh.sort((first, second) => {
                    return first.title.localeCompare(second.title)
                })
                zirgorooh.forEach((item) => {
                    item.percent = parseFloat(item.percent).toFixed(1)
                })
            },
            getContent (contentId) {
                this.alaaContent.show(contentId)
                .then((response) => {
                    this.currentVideo = response.data.data
                })
                .catch(() => {
                    this.currentVideo = null
                })
            },
            getAlaaSet (setId) {
                this.alaaSet.loading = true
                this.alaaSet.show(setId)
                .then( (response) => {
                    this.alaaSet.loading = false
                    this.alaaSet = new AlaaSet(response.data.data)
                    this.alaaVideos = this.alaaSet.contents.getVideos()
                    this.getContent(this.alaaVideos[0].id)
                })
                .catch( () => {
                    this.alaaSet.loading = false
                })
            },
            onVideoTabChange (tabIndex) {
                if (this.report && this.report.sub_category[tabIndex].video_url) {
                    const parsed = this.report.sub_category[tabIndex].video_url.split('/')
                    let setId = parsed[parsed.length - 1]
                    if(setId === '') {
                        setId = parsed[parsed.length - 2]
                    }
                    this.getAlaaSet(setId)
                } else {
                    this.currentVideo = null
                }
            }
        }
    }
</script>

<style>
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

    .video-tab .v-window.v-item-group.theme--light.v-tabs-items .v-window__container .v-window-item {
        display: flex;
        flex-direction: column;
        align-items: center;
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
