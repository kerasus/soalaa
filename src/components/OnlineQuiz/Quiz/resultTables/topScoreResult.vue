<template>
    <div >
        <coming-soon/>
        <div class="d-flex justify-center">
            <v-col>
                <v-row class=" d-flex justify-center">
                    <v-data-table
                            hide-default-footer
                            :headers="headers"
                            :items="report.best.sub_category"
                            :items-per-page="15"
                            class="elevation-1 dataTable"
                    >
                        <template v-slot:top>
                            <br>
                            <span class="tableTitle">
                                جدول نتایج نفرات برتر
                            </span>
                            <br>
                            <br>
                        </template>
                    </v-data-table>
                </v-row>
                <v-row>
                    <v-col>
                        <div :style="{ 'max-width': '100%'}">
                            <highcharts :options="chartOptions"></highcharts>

                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </div>
    </div>
</template>

<script>
    // import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";
    import {Chart} from 'highcharts-vue'
    import ComingSoon from "@/components/ComingSoon";
    export default {
        name: "topScoreResult",
        components: {ComingSoon, highcharts: Chart},
        // components: {Info},
        data() {
            return {
                test: 'test',

                headers: [
                    {
                        text: 'ردیف',
                        align: 'center',
                        sortable: true,
                        value: 'index',
                    },
                    {text: 'درس', value: 'sub_category',align: 'center',sortable: false,},
                    {text: 'درصد', value: 'top_ranks_percent_mean',align: 'center',sortable: true,},
                    {text: ' تراز', value: 'top_ranks_taraaz_mean',align: 'center',sortable: true,},
                ],
                item: [
                    {
                        row: '1',
                        course: 'ریاضی',
                        percentage: 90,
                        level: 5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                    },

                ],
                chartOptions: {
                    tooltip: {
                        backgroundColor: '#FCFFC5',
                        padding:0,

                        style: {
                        direction: 'ltr',
                        },
                        formatter: function () {
                            return   '  <span>30 % </span>' ;
                        }
                    },
                    series: [],
                    // plotOptions: {
                    //     series: {
                    //         events: {
                    //             legendItemClick: function(event) {
                    //                 console.log(event.target.index)
                    //                 console.log(this)
                    //                 // this.chartSeriesVisibility[event.target.index].visibility = !this.chartSeriesVisibility[event.target.index].visibility
                    //             },
                    //         }
                    //     }
                    // },



                    chart: {
                        type: 'column',
                        height: 700,
                        style: {
                            fontFamily: 'IranSans'
                        }
                    },
                    title: {
                        text: 'نمودار مقایسه عملکرد'
                    },
                    subtitle: {
                        // text: 'Source: thesolarfoundation.com'
                    },
                    credits: {
                        text: '3a.alaatv.com',
                        href: 'https://www.3a.alaatv.com'
                    },
                    yAxis: {
                        title: {
                            text: 'درصد'
                        },
                        max: 100
                    },
                    xAxis: {
                        categories: []
                    },
                },
                chartSeriesVisibility: [
                    {name:'topScores', visibility:true},
                    {name:'me', visibility:true},
                    {name:'all', visibility:true}
                    ]
            }
        },
        methods: {
            getPercentDataForChart () {
                let data = []
                this.report.best.sub_category.forEach((item) => {
                    data.push(parseInt(item.top_ranks_percent_mean))
                })
                this.chartOptions.series.push({
                    name: 'نفرات برتر',
                    color: 'green',
                    visible: true,
                    data
                })
                data = []
                this.report.sub_category.forEach((item) => {
                    data.push(parseInt(item.percent))
                })
                this.chartOptions.series.push({
                    name: 'من',
                    color: 'red',
                    visible: true,
                    data
                })
                data = []
                this.report.best.sub_category.forEach((item) => {
                    data.push(parseInt(item.mean))
                })
                this.chartOptions.series.push({
                    name: 'همه',
                    color: 'blue',
                    visible: true,
                    data
                })
            },
            getTaraazDataForChart () {

            }
        },
        props: ['report'],
        created() {
            this.getPercentDataForChart()
            this.report.sub_category.forEach((item) => {
                this.chartOptions.xAxis.categories.push(item.sub_category)
            })
        }
    }
</script>

<style scoped>
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

    .dataTable {
        margin-top: 20px;
        height: 100%;
        width: 90%;
        border-radius: 15px;
    }
    .v-data-table >>> thead {
        background-color: rgba(255, 193, 7, 0.3)!important;
    }


    .v-data-table >>> thead th:first-child {
        border-radius: 0 20px 0 0 !important;
    }
    .v-data-table >>> thead th:last-child {
        border-radius: 20px 0 0 0 !important;
    }


    .v-data-table >>> tbody tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0,0.04)!important;
    }
    .v-data-table >>> .v-data-table__wrapper > table {
        width: 96%;
        border-spacing: 0;
        margin: auto;
    }
    .v-data-table >>> thead tr th {
        width: 125px!important;
        text-align: center!important;
    }
</style>
