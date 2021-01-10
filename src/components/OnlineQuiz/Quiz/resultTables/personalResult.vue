<template>
    <div style="background-color: rgb(244, 244, 244)">
        <div class="d-flex justify-center">
            <info/>
        </div>
        <div class="d-flex justify-center wrapper" >
            <v-row>
                <v-col cols="8">


                    <v-data-table
                            hide-default-footer
                            :headers="headers1"
                            :items="item1"
                            :items-per-page="5"
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
                <v-col>
                    <v-data-table
                            hide-default-footer
                            :headers="headers2"
                            :items="item2"
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
                        <v-col>
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">ماکزمیم تراز کل زیر گروه</v-card-title>

                                <span class="cardContent">
                                    7210
                                </span>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="subCards">
                                <v-card-title class="cardTitle">رتبه کل کشوری</v-card-title>

                                <span class="cardContent">
                                    24000
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
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";

    export default {
        name: "personalResult",
        components: {Info},
        data() {
            return {
                headers1: [
                    {
                        text: 'ردیف',
                        align: 'start',
                        sortable: false,
                        value: 'row',
                    },
                    {text: 'درس', value: 'course'},
                    {text: ' تعداد کل', value: 'total'},
                    {text: ' تعداد درست', value: 'correct'},
                    {text: ' تعداد غلط', value: 'wrong'},
                    {text: ' تعداد نزده', value: 'empty'},
                    {text: ' درصد', value: 'percentage'},
                ],
                item1: [
                    {
                        row: 1,
                        course: 'ریاضی',
                        total: 6.0,
                        correct: 10,
                        wrong: 4.0,
                        empty: 1,
                    },
                    {
                        row: 2,
                        course: 'ریاضی',
                        total: 6.0,
                        correct: 10,
                        wrong: 4.0,
                        empty: 1,
                    },

                ],
                headers2: [
                    {
                        text: 'زیر گروه',
                        align: 'start',
                        sortable: false,
                        value: 'subGroup',
                    },
                    {text: 'درصد خام', value: 'rawPercentage'},
                    {text: 'تراز', value: 'level'},
                    {text: ' رتبه شهر', value: 'rankInCity'},
                    {text: ' رتبه استان', value: 'rankInState'},
                    {text: ' رتبه کشور', value: 'rankInCountry'},
                ],
                item2: [
                    {
                        subGroup: '1',
                        rawPercentage: 90,
                        level: 5000,
                        rankInCity: 20,
                        rankInState: 200,
                        rankInCountry: 2000
                    },

                ],
            }
        },

    }
</script>

<style scoped>
    .wrapper{
        width: 90%;margin: auto;height: 600px
    }
    .subRowHeight{
        height: 30%
    }
    .subCards{
        border-radius: 15px;height: 100%;margin-top: 10px;
    }
    .cardContent{
        white-space: nowrap;
        text-align: center;
        font-family: IRANSans(FaNum);
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        color: rgba(51,51,51,1);display: flow-root;
    }
    .cardTitle{
        background-color: rgba(255, 193, 7, 0.3);  border-radius: 15px;  white-space: nowrap;
        line-height: 34px;
        margin-top: -8px;
        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        color: rgba(0,0,0,1);    place-content: space-evenly;
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

    .dataTableHeight2 {
        height: 70%;
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

    .v-data-table >>> .v-data-table__wrapper > table {
        width: 96%;
        border-spacing: 0;
        margin: auto;
    }
    .v-card > *[data-v-338241d2]:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *[data-v-338241d2]:not(.v-btn):not(.v-chip) {
         border-top-left-radius: 15px !important;
         border-top-right-radius: 15px !important;
    }
</style>
