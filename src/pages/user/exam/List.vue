<template>
    <v-container>
        <vue-confirm-dialog />
        <v-row>
            <v-col>
                <progress-linear :active="loadingList" />
                <v-alert v-if="exams.list.length === 0 && !loadingList" type="info">
                    آزمونی وجود ندارد
                </v-alert>
                <v-row v-if="exams.list.length > 0 && !loadingList">
                    <v-col>
                        <v-row class="table-header">
                            <v-col cols="3" class="pr-7">
                                عنوان
                            </v-col>
                            <v-col cols="2">
                                زمان شروع آزمون
                            </v-col>
                            <v-col cols="2">
                                زمان پایان آزمون
                            </v-col>
                            <v-col cols="1">
                                میزان تاخیر مجاز
                            </v-col>
                            <v-col cols="4">
                                عملیات
                            </v-col>
                        </v-row>
                        <v-row v-for="item in exams.list" :key="item.id" >
                            <v-col>
                                <v-sheet
                                        class="mb-5 d-flex exam-list-sheet"
                                        elevation="0"
                                        outlined
                                        rounded
                                        shaped
                                >
                                    <v-row class="table-row justify-center">
                                        <v-col cols="12" md="3" class="pr-7 justify-center">
                                            {{ item.title }}
                                        </v-col>
                                        <v-col cols="12" md="2">
                                            <span class="d-inline-block-md d-none">
                                                زمان شروع آزمون:
                                            </span>
                                            {{ item.shamsiDate('start_at').dateTime }}
                                        </v-col>
                                        <v-col cols="12" md="2">
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
                                        <v-col cols="12" md="4">
                                            <v-btn
                                                    v-if="item.holding_status === 'not_started'"
                                                    color="#00c753"
                                                    disabled
                                                    text
                                            >
                                                زمان آزمون فرا نرسیده
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.exam_actions.can_register"
                                                    @click="registerExam(item)"
                                                    color="#00c753"
                                                    text
                                            >
                                                ثبت نام
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.exam_actions.can_start"
                                                    :to="{ name: 'onlineQuiz.alaaView', params: { quizId: item.id, questNumber: 1 } }"
                                                    color="#ffc107"
                                                    text
                                            >
                                                شروع آزمون
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.exam_actions.can_continue"
                                                    @click="continueExam(item.id)"
                                                    color="purple"
                                                    text
                                            >
                                                ادامه آزمون
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.exam_actions.can_submit_answer"
                                                    @click="getConfirmation"
                                                    color="#ffc107"
                                                    text
                                            >
                                                ثبت پاسخنامه ذخیره شده در سیستم
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.exam_actions.can_see_report"
                                                    color="#00b5e6"
                                                    text
                                                    :to="{ name: 'user.exam.results', params: { user_exam_id: item.user_exam_id, exam_id: item.id } }"
                                            >
                                                مشاهده نتایج
                                            </v-btn>
                                            <v-btn
                                                    v-if="item.holding_status === 'finished'"
                                                    color="#ffc107"
                                                    text
                                                    disabled
                                            >
                                                آزمون به پایان رسید
                                            </v-btn>
                                            <v-btn
                                                    v-if="!item.exam_actions.is_registered"
                                                    color="#ffc107"
                                                    text
                                                    disabled
                                            >
                                                ثبت نام انجام نشده
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {Exam, ExamList} from "@/models/Exam";
    import { mixinAuth, mixinQuiz } from '@/mixin/Mixins'
    import ProgressLinear from "@/components/ProgressLinear";
    import VueConfirmDialog from 'vue-confirm-dialog'
    import Vue from 'vue'

    Vue.use(VueConfirmDialog)
    Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

    export default {
        name: 'list',
        components: {ProgressLinear},
        data: () => ({
            preventStartExam: false,
            examItem: new Exam(),
            exams: new ExamList(),
            loadingList: false
        }),
        mixins: [mixinAuth, mixinQuiz],
        created() {
            this.getExams()
        },
        methods: {
            getConfirmation(){
                this.$confirm(
                    {
                        message: `مطمئنی؟ نتیجه شما پس از تایید، ثبت و رتبه شما محاسبه خواهد شد و به اندازه میانگین درصدهای شما، کد تخفیف همه محصولات آلاء برای شما ارسال خواهد شد. مثلا اگر میانگین درصدهای شما 60% باشد یک کد تخفیف 60% دریافت خواهید کرد`,
                        button: {
                            no: 'ادامه میدم',
                            yes: 'ثبت میکنم'
                        },
                        callback: confirm => {
                            if (confirm) {
                                this.sendAnswersAndFinishExam()
                            }
                        }
                    }
                )
            },
            continueExam (examId) {
                this.startExam(examId)
            },
            getExams () {
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
            registerExam (exam) {
                window.location.href = exam.alaa_product_link
                // this.user.registerExam(exam.id())
                //     .then( () => {
                //         this.$notify({
                //             group: 'notifs',
                //             title: 'توجه!',
                //             text: 'ثبت نام در آزمون با موفقیت انجام شد',
                //             type: 'success'
                //         })
                //         this.getExams()
                //     })
            },
            sendAnswersAndFinishExam (examId, examUserId) {
                if (!this.hasExamDataOnThisDeviseStorage(examId)) {
                    this.$notify({
                        group: 'notifs',
                        title: 'توجه!',
                        text: 'در این سیستم پاسخنامه شما ثبت نشده است. لطفا از سیستمی که با آن در آزمون شرکت کرده اید استفاده کنید و این دکمه را بزنید.',
                        type: 'error',
                        duration: 30000,
                    })
                    return
                }
                let that = this
                this.sendUserQuestionsDataToServerAndFinishExam(examId, examUserId)
                    .then( () => {
                        that.$notify({
                            group: 'notifs',
                            text: 'اطلاعات آزمون شما ثبت شد.',
                            type: 'success'
                        })
                        that.$store.commit('clearExamData', examId)
                        that.$router.push({ name: 'user.exam.list'})
                    })
                    .catch( () => {
                        that.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
                            type: 'error',
                            duration: 30000,
                        })
                        this.getExams()
                    })
            }
        },
        mounted() {
            this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
        }
    }
</script>

<style scoped>
    .exam-list-sheet {
        background: var(--surface-1);;
    }

    .appDarkMode .exam-list-sheet {
        background: #1c1c21;
    }

    @media only screen and (max-width: 960px) {
        .table-header {
            display: none;
        }
        .table-row {
            padding-right: 10px;
        }
    }
</style>

<style>
    .appDarkMode .exam-list-sheet .v-btn--disabled span {
        color: #bfbfbf !important;
        opacity: 0.6;
    }
</style>
