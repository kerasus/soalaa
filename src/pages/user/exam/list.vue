<template>
    <v-container>
        <v-row>
            <v-col>

                <v-alert v-if="examList.list.length === 0" type="info">
                    آزمونی وجود ندارد
                </v-alert>

                <v-row v-if="examList.list.length > 0">
                    <v-col>
                        <v-row>
                            <v-col cols="3" class="pr-7">
                                عنوان
                            </v-col>
                            <v-col cols="3">
                                زمان شروع آزمون
                            </v-col>
                            <v-col cols="3">
                                زمان پایان آزمون
                            </v-col>
                            <v-col cols="1">
                                میزان تاخیر مجاز
                            </v-col>
                            <v-col cols="2">
                                عملیات
                            </v-col>
                        </v-row>
                        <v-sheet
                                v-for="item in examList.list"
                                :key="item.id"
                                class="mb-5"
                                color="white"
                                elevation="0"
                                outlined
                                rounded
                                shaped
                        >
                            <v-row>
                                <v-col cols="3" class="pr-7">
                                    {{ item.title }}
                                </v-col>
                                <v-col cols="3">
                                    {{ item.shamsiDate('start_at').dateTime }}
                                </v-col>
                                <v-col cols="3">
                                    {{ item.shamsiDate('finish_at').dateTime }}
                                </v-col>
                                <v-col cols="1">
                                    {{ item.delay_time }}
                                    دقیقه
                                </v-col>
                                <v-col cols="2">
                                    <v-btn
                                            class="mx-2"
                                            dark
                                            x-small
                                            color="green"
                                    >
                                        شرکت در آزمون
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {Exam, ExamList} from "@/models/exam";

    export default {
        name: 'list',
        data: () => ({
            examList: new ExamList(),
            examItem: new Exam()
        }),
        mounted() {
            this.getExams()
        },
        methods: {
            getExams () {
                this.examList.loading = true
                this.examList.fetch()
                    .then((response) => {
                        this.examList.loading = false
                        this.examList = new ExamList(response.data.data, {meta: response.data.meta, links: response.data.links})
                    })
                    .catch(() => {
                        this.examList.loading = false
                        this.examList = new ExamList()
                    })
            },
        }
    }
</script>

<style scoped>

</style>
