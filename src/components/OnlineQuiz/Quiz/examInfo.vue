<template>
    <div class="d-flex justify-center">
        <v-progress-linear
                color="deep-purple accent-4"
                absolute
                top
                :active="exam.loading"
                indeterminate
                rounded
                height="6"
        ></v-progress-linear>
        <v-col cols="8">
            <v-row>
                <v-text-field label="عنوان" v-model="exam.title">
                    {{exam.title}}
                </v-text-field>
            </v-row>
            <v-row>
                <v-col cols="12">
                    زمان شروع
                </v-col>
                <v-col cols="12">
                    <date-picker
                            v-model="exam.start_at"
                            type="datetime"
                            :editable="true"
                            format="YYYY-MM-DD HH:mm:ss"
                            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    زمان پایان
                </v-col>
                <v-col cols="12">
                    <date-picker
                            v-model="exam.finish_at"
                            type="datetime"
                            :editable="true"
                            format="YYYY-MM-DD HH:mm:ss"
                            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm" />
                </v-col>
            </v-row>
            <v-row>
                <v-text-field label="قیمت" v-model="exam.price">
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="زمان تاخیر (دقیقه)" v-model="exam.delay_time">
                </v-text-field>
            </v-row>
            <v-row>
                <v-col>
                    <div class="text-center">
                        <v-btn :disabled="exam.loading" :loading="exam.loading" elevation="2" @click="create">
                            ثبت
                        </v-btn>
                        <v-btn :disabled="exam.loading" :loading="exam.loading" elevation="2">
                            حذف
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
    import {Exam} from "@/models/exam";
    import Assistant from "@/plugins/assistant";
    Vue.component('date-picker', VuePersianDatetimePicker)

    export default {
        name: 'examInfo',
        props:[ 'exam' ],
        data: () => ({
            examItem: new Exam()
        }),
        methods: {
            create () {
                this.examItem = this.exam
                this.examItem.loading = true
                this.examItem.holding_status = 1
                this.examItem.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
                this.examItem.create()
                    .then(() => {
                        this.examItem.loading = false
                        this.$toasted.show('ثبت با موفقیت انجام شد', {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 2000
                        })
                        this.refreshExamList()
                        // this.examList = new ExamList(response.data.data, {meta: response.data.meta, links: response.data.links})
                    })
                    .catch((error) => {
                        console.log('error', error)
                        Assistant.handleAxiosError(error)
                        this.examItem.loading = false
                        this.examItem = new Exam()
                        this.refreshExamList()
                    })
            },
            refreshExamList () {
                this.$emit('refresh-exam-list')
                console.log('rereshExamList0')
            }
        }
    }
</script>

<style>
    .vpd-input-group input {
        width: 100%;
    }
</style>
