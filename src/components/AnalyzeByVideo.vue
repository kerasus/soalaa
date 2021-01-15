<template>
    <div style="background-color: rgba(248,248,248,1)">
        <div class="d-flex justify-center">
            <info/>
        </div>
        <div class="d-flex justify-center" style="height: 100px">


            <v-card elevation="0" class="infoCard   align-content-center"
                    style="height:60px;direction: ltr;white-space: nowrap;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);">
                <v-row style="height: 50%;margin: inherit;
     ">
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="loadVideoAnalyze">
                        تحلیل ویدیویی
                        <hr v-if="video_analyze" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>

                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="loadTopScores">
                        نتایج نفرات برتر
                        <hr v-if="top_score_result" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="loadKeyAnswers">
                        پاسخبرگ کلیدی
                        <hr v-if="key_answers" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="loadSubLessons">
                        ریزدرس ها
                        <hr v-if="sub_lessons" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center">
                        نتایج آزمون اول سه‌آ - 1399/10/24 - رشته تجربی
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <div class="d-flex justify-center">
            <v-col cols="2" style="padding-right: 0px;
    height: fit-content;
    margin-top: 50px;">
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
            <v-col cols="9" style="    padding-right: 0;">
                <v-card elevation="0" class="   align-content-center" style="height:746px;direction: rtl;white-space: nowrap;border-radius: 15px;margin: auto;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);">
                    <div v-if="video_analyze && lessons[0].isShown">تحلیل ویدیویی ادبیات</div>
                    <div v-if="video_analyze && lessons[1].isShown">تحلیل ویدیویی عربی</div>
                    <div v-if="video_analyze && lessons[2].isShown">تحلیل ویدیویی دینی</div>
                    <div v-if="video_analyze && lessons[3].isShown">تحلیل ویدیویی زبان انگلیسی</div>
                    <div v-if="video_analyze && lessons[4].isShown">تحلیل ویدیویی ریاضی</div>
                    <div v-if="video_analyze && lessons[5].isShown">تحلیل ویدیویی زیست شناسی</div>
                    <div v-if="video_analyze && lessons[6].isShown">تحلیل ویدیویی فیزیک</div>
                    <div v-if="video_analyze && lessons[7].isShown">تحلیل ویدیویی شیمی</div>

                    <div v-if="top_score_result">
                        <top-score-result/>
                    </div>
                    <div v-if="key_answers">پاسخبرگ کلیدی</div>
                    <div v-if="sub_lessons">
                        <statistic-result/>
                    </div>
                </v-card>

            </v-col>

        </div>
    </div>
</template>

<script>
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";
    import TopScoreResult from "@/components/OnlineQuiz/Quiz/resultTables/topScoreResult";
    import StatisticResult from "@/components/OnlineQuiz/Quiz/resultTables/statisticResult";

    export default {
        name: "AnalyzeByVideo",
        components: {StatisticResult, TopScoreResult, Info},
        data() {
            return {

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
                    {name: 'chemistry', isShown: false}]

            }
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
        width: 90%;
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
