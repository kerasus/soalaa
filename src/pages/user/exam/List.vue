<template>
    <v-container>
        <v-row>
            <v-col>
                <v-progress-linear
                        color="#ffc107"
                        absolute
                        top
                        :active="loadingList"
                        indeterminate
                        rounded
                        height="6"
                ></v-progress-linear>
                <v-alert v-if="user.exams.list.length === 0 && !loadingList" type="info">
                    آزمونی وجود ندارد
                </v-alert>
                <v-row v-if="user.exams.list.length > 0 && !loadingList">
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
                                            v-if="item.user_exam_status === 'has participated and finished' || item.user_exam_status === 'registered but participation time passed'"
                                            text
                                            color="#ffc107"
                                    >
                                        مشاهده نتایج
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'has participated but not finished'"
                                            :to="{ name: 'onlineQuiz.alaaView', params: { quizId: item.id, questNumber: 1 } }"
                                            text
                                            color="purple"
                                    >
                                        ادامه آزمون
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'registered but did not participate'"
                                            :to="{ name: 'onlineQuiz.alaaView', params: { quizId: item.id, questNumber: 1 } }"
                                            text
                                            color="#00b5e6"
                                    >
                                        شروع آزمون
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'not registered'"
                                            href="https://alaatv.com/landing/19"
                                            text
                                            color="#00c753"
                                    >
                                        ثبت نام
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'not registered and registration time passed'"
                                            text
                                            color="#00c753"
                                            disabled
                                    >
                                        اتمام مهلت ثبت نام
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'registered but not reached participation time'"
                                            text
                                            color="#00c753"
                                            disabled
                                    >
                                        زمان آزمون فرا نرسیده
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
    import { mixinQuiz } from '@/mixin/Mixins'

    export default {
        name: 'list',
        data: () => ({
            examItem: new Exam(),
            loadingList: false
        }),
        mixins: [mixinQuiz],
        created() {
            this.getExams()
        },
        methods: {
            getExams () {

                // this.registerExam('5ffdcc5b5590063ba07fad36')
                // this.participateExam('5ffdcc5b5590063ba07fad36')

                this.loadingList = true
                this.user.getUserExams()
                    .then(() => {
                        this.loadingList = false
                    })
                    .catch(() => {
                        this.loadingList = false
                    })
            },
            registerExam (examId) {
                this.user.registerExam(examId)
                    .then((response) => {
                        this.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'ثبت نام در آزمون با موفقیت انجام شد',
                            type: 'success'
                        })
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
