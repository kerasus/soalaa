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
                                :headers="headers1"
                                :items="item1"
                                :items-per-page="5"
                                class="elevation-1 dataTable"
                        ></v-data-table>
                    </v-row>
                    <v-row class=" d-flex justify-center">
                        <v-data-table
                                style="width: 80%"
                                :headers="headers2"
                                :items="item2"
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
                ],
                item1: [
                    {
                        row: '1',
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
