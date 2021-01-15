<template>
    <v-container>
        <v-row>
            <v-col>
                <v-progress-linear
                        color="#ffc107"
                        absolute
                        top
                        :active="user.exams.loading"
                        indeterminate
                        rounded
                        height="6"
                ></v-progress-linear>
                <v-alert v-if="user.exams.list.length === 0 && !user.exams.loading" type="info">
                    آزمونی وجود ندارد
                </v-alert>
                <v-row v-if="user.exams.list.length > 0 && !user.exams.loading">
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
                                v-for="item in user.exams.list"
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
                                            color="#ffc107"
                                    >
                                        مشاهده نتایج
                                    </v-btn>
                                    <v-btn
                                            text
                                            color="#00b5e6"
                                    >
                                        شروع آزمون
                                    </v-btn>
                                    <v-btn
                                            text
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
    import {Exam} from "@/models/exam";
    import {User} from "@/models/User";
    // import Assistant from "@/plugins/assistant";

    export default {
        name: 'list',
        data: () => ({
            user: new User(),
            examItem: new Exam()
        }),
        created() {
            this.getExams()
        },
        methods: {
            getExams () {

                this.registerExam('5ffdcc5b5590063ba07fad36')
                this.user.exams.loading = true
                this.user.getUserExams()
                    .then(() => {
                        this.user.exams.loading = false
                    })
                    .catch(() => {
                        this.user.exams.loading = false
                    })
            },
            registerExam (examId) {
                this.user.registerExam(examId)
                    .then((response) => {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
