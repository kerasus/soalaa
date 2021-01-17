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
                            <v-tabs v-model="tab" color="#ffc107" center-active>
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
                            <v-row>
                                <v-col>
                                    <v-tabs color="#ffc107" vertical show-arrows grow>
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
                                </v-col>
                            </v-row>
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
            videoAnalyzeTab: null,
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
<style>
    /* Helper classes */
    .basil--text {
        color: #356859 !important;
    }
</style>
