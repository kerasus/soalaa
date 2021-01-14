<template>
    <div style="background-color: rgba(248,248,248,1)">
        <div class="d-flex justify-center">
            <info/>
        </div>
        <div class="d-flex justify-center">
            <v-card elevation="0" class="infoCard   align-content-center" style="height:60px;direction: ltr;white-space: nowrap;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);">
                <v-row style="height: 50%;margin: inherit;
     ">
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="underline1 = !underline1">
                        تحلیل ویدیویی <hr v-if="underline1" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>

                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="underline2 = !underline2">
                        نتایج نفرات برتر<hr v-if="underline2" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="underline3 = !underline3">
                        پاسخبرگ کلیدی<hr v-if="underline3" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center;cursor: pointer" cols="2" @click="underline4 = !underline4">
                        ریزدرس ها<hr v-if="underline4" style="    margin: auto auto 0px;
    border: 2px solid rgb(255, 193, 7);
    width: 50%;
    margin-top: 10px;">
                    </v-col>
                    <v-col style="text-align: center" >
                        نتایج آزمون اول سه‌آ - 1399/10/24 - رشته تجربی
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <div class="d-flex justify-center">
                <v-col cols="2" style="padding-right: 0px;
    height: fit-content;
    margin-top: 50px;">
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            ادبیات فارسی
                        </p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            عربی</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            دین و زندگی</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            زبان انگلیسی</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            ریاضی</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            زیست شناسی</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            فیزیک</p>
                    </v-card>
                    <v-card class="examItems" elevation="0">
                        <p style="    padding-top: 18px;">
                            شیمی</p>
                    </v-card>

                </v-col>
                <v-col cols="9" style="    padding-right: 0;" >
                    <v-card elevation="0" class="   align-content-center" style="height:746px;direction: ltr;white-space: nowrap;border-radius: 15px;margin: auto;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);">
                    </v-card>

                </v-col>

        </div>
    </div>
</template>

<script>
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";

    export default {
        name: "AnalyzeByVideo",
        components: {Info},
        data() {
            return {

                underline1: true,
                underline2: false,
                underline3: false,
                underline4: false
            }}

    }
</script>

<style scoped>
    .dot {
        height: 50px;
        width: 50px;
        background-color: rgba(241,241,241,1);;
        border-radius: 50%;
        display: inline-block;
    }
    .examItems{
        background-color: rgba(241,241,241,1);height: 60px;    white-space: nowrap;
        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(68,68,68,1);
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
