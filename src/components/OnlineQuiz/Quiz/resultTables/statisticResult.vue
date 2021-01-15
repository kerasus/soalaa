<template>
    <div >
<!--        <div class="d-flex justify-center">-->
<!--            <info/>-->
<!--        </div>-->
        <div class="d-flex justify-center">
            <v-col>
                <v-row class=" d-flex justify-center">
                    <v-data-table
                            hide-default-footer
                            :headers="headers"
                            :items="item"
                            :items-per-page="5"
                            class="elevation-1 dataTable"
                    ></v-data-table>
                </v-row>
            </v-col>
        </div>
    </div>
</template>

<script>
    import Info from "@/components/OnlineQuiz/Quiz/resultTables/info";

    export default {
        name: "statisticResult",
        components: {Info},
        data() {
            return {
                headers: [
                    {
                        text: 'ردیف',
                        align: 'center',
                        sortable: false,
                        value: 'row',
                    },
                    {text: 'درس', value: 'course',align: 'center',sortable: false,},
                    {text: 'درصد', value: 'percentage',align: 'center',sortable: false,},
                    {text: ' تراز', value: 'level',align: 'center',sortable: false,},
                    {text: ' شهر', value: 'city',align: 'center',sortable: false,},
                    {text: 'استان', value: 'state',align: 'center',sortable: false,},
                    {text: 'کشور', value: 'country',align: 'center',sortable: false,},
                    {text: 'میانگین درصد', value: 'percentageMean',align: 'center',sortable: false,},
                    {text: 'میانگین تراز', value: 'levelMean',align: 'center',sortable: false,},

                ],
                item: [
                    {
                        row: '1',
                        course: 'ریاضی',
                        percentage: 90,
                        level: 5000,
                        city: 'تهران',
                        state: 'تهران',
                        country: 'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },
                    {
                        row:'1',
                        course:'ریاضی',
                        percentage:90,
                        level:5000,
                        city:'تهران',
                        state:'تهران',
                        country:'ایران',
                        percentageMean: 80,
                        levelMean: 4000,
                    },

                ],
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
