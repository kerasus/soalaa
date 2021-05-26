<template>
    <div style="background-color: rgb(244, 244, 244)">
        <div class="d-flex justify-center wrapper">
            <v-row v-if="report">
                <v-col md="7" cols="12" class="mb-2">
                    <v-data-table
                            hide-default-footer
                            :headers="headers1"
                            :header-props="{sortByText: 'ترتیب'}"
                            :items="report.sub_category"
                            :items-per-page="15"
                            class="elevation-1 dataTable dataTableHeight1"
                    >
                        <template v-slot:top>
                            <br>
                            <span class="tableTitle">
                                    جدول عملکرد دروس
                                </span>
                            <br>
                            <br>
                        </template>
                    </v-data-table>
                </v-col>
                <v-col md="5" cols="12" class="firstColPadding">
                    <v-data-table
                            hide-default-footer
                            :headers="headers2"
                            :header-props="{sortByText: 'ترتیب'}"
                            :items="report.zirgorooh"
                            :items-per-page="5"
                            class="elevation-1 dataTable dataTableHeight2"
                    >
                        <template v-slot:top>
                            <br>
                            <span class="tableTitle ">
                                    نتیجه در زیر گروه ها
                            </span>
                            <br>
                            <br>
                        </template>

                    </v-data-table>
                    <v-row class="subRowHeight final-report-scoreboard">
                        <v-col class="subColsPaddingBottom" cols="12">
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">
                                    <v-row>
                                        <v-col>
                                            تعداد کل شرکت کنندگان
                                        </v-col>
                                        <v-col>
                                            ماکزمیم تراز کل زیر گروه
                                        </v-col>
                                    </v-row>
                                </v-card-title>

                                <span class="cardContent">
                                    <v-row>
                                        <v-col>
                                            {{ report.n_normal_participants }}
                                        </v-col>
                                        <v-col>
                                            {{ report.main.taraaz }}
                                        </v-col>
                                    </v-row>
                                </span>
                            </v-card>
                        </v-col>
                        <v-col class="subColsPaddingBottom subColsPaddingRight" cols="12">
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">
                                    <v-row>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">رتبه کل کشوری</v-col>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">رتبه در استان</v-col>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">رتبه در شهر</v-col>
                                        <v-col v-if="report.main.rank_school" cols="3">رتبه در مدرسه</v-col>
                                    </v-row>
                                </v-card-title>

                                <span class="cardContent">
                                    <v-row>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_country }}</v-col>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_province }}</v-col>
                                        <v-col :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_city }}</v-col>
                                        <v-col v-if="report.main.rank_school" cols="3">{{ report.main.rank_school }}</v-col>
                                    </v-row>
                                </span>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

  export default {
    name : 'PersonalResult',
    data() {
      return {
        headers1: [
          {
            text    : 'ردیف',
            align   : 'center',
            sortable: true,
            value   : 'index',
          },
          {text: 'درس', value: 'sub_category', align: 'center', sortable: false},
          {text: ' تعداد کل', value: 'total_answer', align: 'center', sortable: false},
          {text: ' تعداد درست', value: 'right_answer', align: 'center', sortable: false},
          {text: ' تعداد غلط', value: 'wrong_answer', align: 'center', sortable: false},
          {text: ' تعداد نزده', value: 'empty', align: 'center', sortable: true},
          {text: ' درصد', value: 'percent', align: 'center', sortable: true},
          {text: ' تراز', value: 'taraaz', align: 'center', sortable: true},
        ],
        headers2: [
          {
            text    : 'زیر گروه',
            align   : 'center',
            sortable: true,
            value   : 'title'
          },
          {text: 'درصد خام', value: 'percent', align: 'center', sortable: true,},
          {text: 'تراز', value: 'taraaz', align: 'center', sortable: true,},
          {text: ' رتبه شهر', value: 'rank_city', align: 'center', sortable: true,},
          {text: ' رتبه استان', value: 'rank_province', align: 'center', sortable: true,},
          {text: ' رتبه کشور', value: 'rank_country', align: 'center', sortable: true,},
        ],
      }
    },
    props: ['report']
  }
</script>

<style scoped>
    .subColsPaddingRight {
        padding-right: 5px;
        margin-bottom: 20px;
    }

    .subColsPaddingBottom {
        padding-bottom: 3px;
        margin-top: 10px;
    }

    .firstColPadding {
        padding-right: 5px;
    }

    .wrapper {
        width: 97%;
        margin: auto;
    }

    .subRowHeight {
        height: 33%
    }

    .subCards {
        border-radius: 15px;
        margin-top: 10px;
    }

    .cardContent {
        white-space: nowrap;
        text-align: center;
        font-family: IRANSans(FaNum);
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        color: rgba(51, 51, 51, 1);
        display: flow-root;
        height: 50px;
        margin-top: 15px;
    }

    .cardTitle {

        height: 50px;
        background-color: rgba(255, 193, 7, 0.3);
        border-radius: 15px;
        white-space: nowrap;
        line-height: 34px;
        margin-top: -8px;
        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        color: rgba(0, 0, 0, 1);
        place-content: space-evenly;
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
        width: 100%;

    }

    .dataTableHeight1 {
        height: 100%;
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

    .dataTable {
        margin-top: 20px;
        width: 100%;
        border-radius: 15px;
        margin: auto;
    }

    .v-data-table >>> thead {
        background-color: rgba(255, 193, 7, 0.3) !important;
    }


    .v-data-table >>> thead th:first-child {
        border-radius: 0 20px 0 0 !important;
    }

    .v-data-table >>> thead th:last-child {
        border-radius: 20px 0 0 0 !important;
    }


    .v-data-table >>> tbody tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.04) !important;
    }


    .v-data-table >>> thead tr th {
        width: 125px !important;
        text-align: center !important;
    }


    .v-data-table >>> .v-data-table__wrapper > table {
        width: 96%;
        border-spacing: 0;
        margin: auto;
    }

    .v-card > *[data-v-338241d2]:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *[data-v-338241d2]:not(.v-btn):not(.v-chip) {
        border-top-left-radius: 15px !important;
        border-top-right-radius: 15px !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
</style>

<style>
    .final-report-scoreboard .v-card__title.cardTitle {
        padding: 0 10px;
        font-size: 14px;
    }

    .final-report-scoreboard .cardContent {
        font-size: 22px;
    }

    .final-report-scoreboard {
        display: block;
    }
</style>
