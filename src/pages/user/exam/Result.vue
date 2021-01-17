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
                        <v-col>
                            <v-tabs v-model="tab" :style="{width: 'maxContent', margin: 'auto'}">
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                                <v-tab>نتایج آزمون اول سه‌آ - 1399/10/24 - رشته تجربی</v-tab>
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
                        <v-card flat>
                            <top-score-result/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <statistic-result/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            پاسخبرگ کلیدی
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <top-score-result/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            wwww
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <v-col cols="2" style="padding-right: 0px; height: fit-content; margin-top: 50px;">
                                <v-card class="examItems" elevation="0" @click="loadLessons(0)">
                                    <p style="    padding-top: 18px;">
                                        ادبیات فارسی
                                    </p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(1)">
                                    <p style="    padding-top: 18px;">
                                        عربی</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(2)">
                                    <p style="    padding-top: 18px;">
                                        دین و زندگی</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(3)">
                                    <p style="    padding-top: 18px;">
                                        زبان انگلیسی</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(4)">
                                    <p style="    padding-top: 18px;">
                                        ریاضی</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(5)">
                                    <p style="    padding-top: 18px;">
                                        زیست شناسی</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(6)">
                                    <p style="    padding-top: 18px;">
                                        فیزیک</p>
                                </v-card>
                                <v-card class="examItems" elevation="0" @click="loadLessons(7)">
                                    <p style="    padding-top: 18px;">
                                        شیمی</p>
                                </v-card>

                            </v-col>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {Exam} from "@/models/exam";
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";
    import TopScoreResult from "@/components/OnlineQuiz/Quiz/resultTables/topScoreResult";
    import StatisticResult from "@/components/OnlineQuiz/Quiz/resultTables/statisticResult";

    export default {
        name: "Result",
        components: {StatisticResult, TopScoreResult, Info},
        data: () => ({
            tab: null,
            exam: new Exam(),
            video_analyze: true,
            top_score_result: false,
            key_answers: false,
            sub_lessons: false,
            adabiat: false,
            arabi: false,
            lessons: [
                {name: 'literature', isShown: false},
                {name: 'arabic', isShown: false},
                {name: 'english', isShown: false},
                {name: 'religious', isShown: false},
                {name: 'math', isShown: false},
                {name: 'bio', isShown: false},
                {name: 'physics', isShown: false},
                {name: 'chemistry', isShown: false}
                ]
        }),
        created() {
            this.exam.user_exam_id = this.$route.params.user_exam_id
            this.exam.getAnswerOfUserInResultPage()
            .then( (response) => {
                console.log('response', response)
            })
            .catch( () => {
                this.$router.push({ name: 'user.exam.list'})
            })
        },
        methods: {
            loadLessons(index) {
                for (let i = 0; i < 8; i++) {
                    if (i !== index)
                    {
                        this.lessons[i].isShown = false
                    }
                }
                this.lessons[index].isShown = true
            },
            loadVideoAnalyze() {
                this.video_analyze = true
                this.top_score_result = false
                this.key_answers = false
                this.sub_lessons = false
            },
            loadTopScores() {
                this.video_analyze = false
                this.top_score_result = true
                this.key_answers = false
                this.sub_lessons = false
            },
            loadKeyAnswers() {
                this.video_analyze = false
                this.top_score_result = false
                this.key_answers = true
                this.sub_lessons = false
            },
            loadSubLessons() {
                this.video_analyze = false
                this.top_score_result = false
                this.key_answers = false
                this.sub_lessons = true
            }
        }
    }
</script>

<style scoped>
    .v-tabs >>> .v-tabs-bar >>> {
        height: 50px;
    }

    .dot {
        height: 50px;
        width: 50px;
        background-color: rgba(241, 241, 241, 1);;
        border-radius: 50%;
        display: inline-block;
    }

    .examItems {
        background-color: rgba(241, 241, 241, 1);
        height: 60px;
        white-space: nowrap;
        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(68, 68, 68, 1);
        margin-top: 10px;
        border-radius: 15px;
    }

    .menuInfoText {
        white-space: nowrap;

        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
    }

    .v-tabs >>> .v-tabs-bar {
        align-items: self-end !important;
        margin-top: 10px !important;
        height: 20px !important;
    }

    .v-tabs >>> .v-slide-group__wrapper {
        color: rgba(255, 193, 7, 1) !important;
    }

    .tableTitle {
        margin-right: 30px;
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
    }

    .infoCard {
        margin-top: 10px;
        border-radius: 15px;
    }


    .v-card > *:last-child:not(.v-btn):not(.v-chip) {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;


    }

    .v-card > *:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }


</style>
