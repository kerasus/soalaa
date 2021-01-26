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
                        style="height:60px; width: 100%">
                    <v-row style="height: 50%;margin: inherit;
     ">
                        <v-col md="4">
                            نتایج آزمون اول سه‌آ -
                            {{ exam.title }}
                        </v-col>
                        <v-col>
                            <v-tabs v-model="tab" color="#ffc107" center-active>
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                                <v-tab>ریزدرس ها</v-tab>
                                <v-tab>پاسخبرگ کلیدی</v-tab>
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
                        <PersonalResult/>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <BubbleSheet :info="{ type: 'pasokh-nameh' }" />
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <top-score-result/>
                    </v-tab-item>
                    <v-tab-item class="video-tab">
                        <v-tabs v-model="videoLesson" color="#ffc107" :vertical="windowSize.x > 960" center-active show-arrows grow>
                            <v-tabs-slider color="yellow"></v-tabs-slider>
                            <v-tab>
                                ادبیات فارسی
                            </v-tab>
                            <v-tab>
                                عربی
                            </v-tab>
                            <v-tab>
                                دین و زندگی
                            </v-tab>
                            <v-tab>
                                زبان انگلیسی
                            </v-tab>
                            <v-tab>
                                ریاضی
                            </v-tab>
                            <v-tab>
                                زیست شناسی
                            </v-tab>
                            <v-tab>
                                فیزیک
                            </v-tab>
                            <v-tab>
                                شیمی
                            </v-tab>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                            <v-tab-item>
                                <video/>
                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {Exam} from "@/models/Exam";
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";
    import TopScoreResult from "@/components/OnlineQuiz/Quiz/resultTables/topScoreResult";
    import PersonalResult from "@/components/OnlineQuiz/Quiz/resultTables/personalResult";
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import Assistant from "@/plugins/assistant";
    import {mixinQuiz, mixinWindowSize} from "@/mixin/Mixins";

    export default {
        name: 'Result',
        components: { BubbleSheet, TopScoreResult, Info, PersonalResult},
        mixins: [mixinQuiz, mixinWindowSize],
        data: () => ({
            tab: null,
            videoLesson: null,
            exam: new Exam(),
        }),
        created() {
            // this.exam.user_exam_id = this.$route.params.user_exam_id
            // this.exam.getAnswerOfUserInResultPage()
            // .then( () => {
            //     this.$store.commit('setQuiz', this.exam)
            // })
            // .catch( () => {
            //     this.$router.push({ name: 'user.exam.list'})
            // })

            let that = this
            this.user.loadExamDataForShowResult(this.$route.params.user_exam_id)
                .then(({userExamForParticipate}) => {
                    that.loadExam(userExamForParticipate, 'results', that.$route.params.exam_id)
                        .then(() => {
                            that.quiz.id = that.$route.params.exam_id
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

        },
        methods: {
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
            height: 54px !important;
        }
    }
</style>
