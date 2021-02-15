<template>
    <div >
        <div class="d-flex justify-center">
            <v-col>
                <v-row class=" d-flex justify-center">
                    <v-data-table
                            hide-default-footer
                            :headers="headers"
                            :items="dataTable"
                            :items-per-page="15"
                            class="elevation-1 dataTable"
                    ></v-data-table>
                </v-row>
            </v-col>
        </div>
    </div>
</template>

<script>
    // import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";

    export default {
        name: "statisticResult",
        props: ['report'],
        components: {},
        // components: {Info},
        data() {
            return {
                dataTable: [],
                headers: [
                    {
                        text: 'ردیف',
                        align: 'center',
                        sortable: false,
                        value: 'index',
                    },
                    {text: 'درس', value: 'sub_category',align: 'center',sortable: true,},
                    {text: 'درصد', value: 'percent',align: 'center',sortable: true,},
                    {text: ' تراز', value: 'taraaz',align: 'center',sortable: true,},
                    {text: ' شهر', value: 'rank_city',align: 'center',sortable: false,},
                    {text: 'استان', value: 'rank_province',align: 'center',sortable: false,},
                    {text: 'رتبه در کشور', value: 'rank_country',align: 'center',sortable: true,},
                    {text: 'میانگین درصد', value: 'average',align: 'center',sortable: true,},
                    {text: 'میانگین تراز', value: 'taraaz_average',align: 'center',sortable: true,},

                ]
            }
        },
        created() {
            if (this.report && this.report.best) {
                this.loadDataTable()
            }
        },
        methods: {
            loadDataTable () {
                this.loadUserDataOfDataTable()
                this.loadBestAndAverageDataOfDataTable()
            },
            loadUserDataOfDataTable () {
                let that = this
                this.report.sub_category.forEach( (item) => {
                    that.dataTable.push({
                        index: item.index,
                        sub_category: item.sub_category,
                        percent: item.percent,
                        taraaz: item.taraaz,
                        rank_country: item.rank_country,
                        rank_province: item.rank_province,
                        rank_city: item.rank_city
                    })
                })
            },
            loadBestAndAverageDataOfDataTable () {
                let that = this
                this.report.best.sub_category.forEach( (item) => {
                    let targetIndex = that.dataTable.findIndex( (dataTableItem) => {
                        return dataTableItem.sub_category === item.sub_category
                    })
                    if (that.dataTable[targetIndex]) {
                        that.dataTable[targetIndex].average = parseFloat(item.mean).toFixed(1)
                        that.dataTable[targetIndex].taraaz_average = parseFloat(item.taraaz_mean).toFixed(0)
                    }
                })
            }
        }
    }
</script>

<style scoped>
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
        border-radius: 15px
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
    .v-data-table >>> thead tr th {
        width: 125px!important;
        text-align: center!important;
    }
</style>
