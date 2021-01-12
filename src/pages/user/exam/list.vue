<template>
    <v-container>
        <v-row>
            <v-col>

                <v-progress-linear
                        color="#ffc107"
                        absolute
                        top
                        :active="examList.loading"
                        indeterminate
                        rounded
                        height="6"
                ></v-progress-linear>

                <v-alert v-if="examList.list.length === 0 && !examList.loading" type="info">
                    آزمونی وجود ندارد
                </v-alert>

                <v-row v-if="examList.list.length > 0 && !examList.loading">
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
                                class="mb-5 d-flex"
                                color="white"
                                elevation="0"
                                height="70"
                                outlined
                                rounded
                                shaped
                        >
                            <v-row class="justify-center">
                                <v-col cols="3" class="pr-7 justify-center">
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
                                            text
                                            x-small
                                            color="#ffc107"
                                    >
                                        شرکت در آزمون
                                    </v-btn>
                                    <v-btn
                                            text
                                            x-small
                                            color="#00b5e6"
                                    >
                                        شروع آزمون
                                    </v-btn>
                                    <v-btn
                                            text
                                            x-small
                                            color="#00c753"
                                    >
                                        ثبت نام
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
        created() {
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
