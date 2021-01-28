<template>
    <div style="background-color: rgb(244, 244, 244)">
        <div class="d-flex justify-center wrapper">
            <v-row v-if="report">
                <v-col md="7">
                    <v-data-table
                            hide-default-footer
                            :headers="headers1"
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
                <v-col md="5" class="firstColPadding">
                    <v-data-table
                            hide-default-footer
                            :headers="headers2"
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
                    <v-row class="subRowHeight">
                        <v-col class="subColsPaddingBottom ">
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">ماکزمیم تراز کل زیر گروه</v-card-title>

                                <span class="cardContent">
                                    {{ report.main.taraaz }}
                                </span>
                            </v-card>
                        </v-col>
                        <v-col class="subColsPaddingBottom subColsPaddingRight">
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">رتبه کل کشوری</v-card-title>

                                <span class="cardContent">
                                    {{ report.main.rank_country }}
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
        name: 'PersonalResult',
        data() {
            return {
                headers1: [
                    {
                        text: 'ردیف',
                        align: 'center',
                        sortable: false,
                        value: 'index',
                    },
                    {text: 'درس', value: 'sub_category', align: 'center', sortable: false},
                    {text: ' تعداد کل', value: 'total_answer', align: 'center', sortable: false},
                    {text: ' تعداد درست', value: 'right_answer', align: 'center', sortable: false},
                    {text: ' تعداد غلط', value: 'wrong_answer', align: 'center', sortable: false},
                    {text: ' تعداد نزده', value: 'empty', align: 'center', sortable: false},
                    {text: ' درصد', value: 'percent', align: 'center', sortable: false},
                    {text: ' تراز', value: 'taraaz', align: 'center', sortable: false},
                ],
                headers2: [
                    {
                        text: 'زیر گروه',
                        align: 'center',
                        sortable: false,
                        value: 'title'
                    },
                    {text: 'درصد خام', value: 'percent', align: 'center', sortable: false,},
                    {text: 'تراز', value: 'taraaz', align: 'center', sortable: false,},
                    // {text: ' رتبه شهر', value: 'rankInCity', align: 'center', sortable: false,},
                    // {text: ' رتبه استان', value: 'rankInState', align: 'center', sortable: false,},
                    {text: ' رتبه کشور', value: 'rank_country', align: 'center', sortable: false,},
                ],

            }
        },
        props: ['report']
    }
</script>

<style scoped>
    .subColsPaddingRight {
        padding-right: 5px;
    }

    .subColsPaddingBottom {
        padding-bottom: 3px
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
        height: 100%;
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
    }

    .cardTitle {
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
