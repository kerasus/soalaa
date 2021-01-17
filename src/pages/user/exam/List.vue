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
                        <v-row class="table-header">
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
                                v-for="item in exams.list"
                                :key="item.id"
                                class="mb-5 d-flex"
                                color="white"
                                elevation="0"
                                outlined
                                rounded
                                shaped
                        >
                            <v-row class="table-row justify-center">
                                <v-col cols="12" md="3" class="pr-7 justify-center">
                                    {{ item.title }}
                                </v-col>
                                <v-col cols="12" md="3">
                                    <span class="d-inline-block-md d-none">
                                        زمان شروع آزمون:
                                    </span>
                                    {{ item.shamsiDate('start_at').dateTime }}
                                </v-col>
                                <v-col cols="12" md="3">
                                    <span class="d-inline-block-md d-none">
                                        زمان پایان آزمون:
                                    </span>
                                    {{ item.shamsiDate('finish_at').dateTime }}
                                </v-col>
                                <v-col cols="12" md="1">
                                    <span class="d-inline-block-md d-none">
                                        میزان تاخیر مجاز:
                                    </span>
                                    {{ item.delay_time }}
                                    دقیقه
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn
                                            v-if="item.user_exam_status === 'has participated and finished' || item.user_exam_status === 'registered but participation time passed'"
                                            color="#ffc107"
                                            text
                                    >
                                        مشاهده نتایج
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'has participated and finished'"
                                            @click="sendAnswersAndFinishExam(item)"
                                            color="#ffc107"
                                            text
                                    >
                                        ثبت پاسخنامه ذخیره شده در سیستم
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'has participated but not finished' || item.user_exam_status === 'has participated and finished'"
                                            :to="{ name: 'onlineQuiz.alaaView', params: { quizId: item.id, questNumber: 1 } }"
                                            color="purple"
                                            text
                                    >
                                        ادامه آزمون
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'registered but did not participate'"
                                            :to="{ name: 'onlineQuiz.alaaView', params: { quizId: item.id, questNumber: 1 } }"
                                            color="#00b5e6"
                                            text
                                    >
                                        شروع آزمون
                                    </v-btn>
<!--                                    href="https://alaatv.com/landing/19"-->
                                    <v-btn
                                            v-if="item.user_exam_status === 'not registered'"
                                            @click="registerExam(item.id)"
                                            color="#00c753"
                                            text
                                    >
                                        ثبت نام
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'not registered and registration time passed'"
                                            color="#00c753"
                                            disabled
                                            text
                                    >
                                        اتمام مهلت ثبت نام
                                    </v-btn>
                                    <v-btn
                                            v-if="item.user_exam_status === 'registered but not reached participation time'"
                                            color="#00c753"
                                            disabled
                                            text
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
    import {Exam, ExamList} from "@/models/exam";
    import { mixinQuiz } from '@/mixin/Mixins'

    export default {
        name: 'list',
        data: () => ({
            examItem: new Exam(),
            exams: new ExamList(),
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

                let that = this
                this.loadingList = true
                this.user.getUserExams()
                    .then((exams) => {
                        that.exams = exams
                        that.loadingList = false
                    })
                    .catch(() => {
                        that.loadingList = false
                    })
            },
            registerExam (examId) {
                this.user.registerExam(examId)
                    .then( () => {
                        this.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'ثبت نام در آزمون با موفقیت انجام شد',
                            type: 'success'
                        })
                        this.getExams()
                    })
            },
            sendAnswersAndFinishExam (exam) {
                exam.sendAnswersAndFinishExam()
                    .then( () => {
                        this.$store.commit('clearExamData', exam.id)
                        this.$notify({
                            group: 'notifs',
                            text: 'اطلاعات آزمون شما ثبت شد.',
                            type: 'success'
                        })
                        this.getExams()
                    })
                    .catch( () => {
                        this.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
                            type: 'warn',
                            duration: 30000,
                        })
                        this.getExams()
                    })
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 960px) {
        .table-header {
            display: none;
        }
        .table-row {
            padding-right: 10px;
        }
    }
</style>
