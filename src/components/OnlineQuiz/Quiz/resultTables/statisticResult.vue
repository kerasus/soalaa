<template>
    <div>
        <div class="d-flex justify-center">
            <info/>
        </div>
        <div class="d-flex justify-center">
            <v-card elevation="3" class="infoCard d-flex justify-center">
                <v-col>
                    <v-row class=" d-flex justify-center">
                        <v-data-table
                                style="width: 80%"
                                :headers="headers"
                                :items="item"
                                :items-per-page="5"
                                class="elevation-1 dataTable"
                        ></v-data-table>
                    </v-row>
                </v-col>
            </v-card>
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
                        align: 'start',
                        sortable: false,
                        value: 'row',
                    },
                    {text: 'درس', value: 'course'},
                    {text: 'درصد', value: 'percentage'},
                    {text: ' تراز', value: 'level'},
                    {text: ' شهر', value: 'city'},
                    {text: 'استان', value: 'state'},
                    {text: 'کشور', value: 'country'},
                    {text: 'میانگین درصد', value: 'percentageMean'},
                    {text: 'میانگین تراز', value: 'levelMean'},

                ],
                item: [
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
    }
</style>
