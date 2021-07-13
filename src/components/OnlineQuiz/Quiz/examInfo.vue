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
    />
    <v-col cols="8">
      <v-row>
        <v-text-field
          v-model="exam.title"
          label="عنوان"
        >
          {{ exam.title }}
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
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
          />
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
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-text-field
          v-model="exam.delay_time"
          label="زمان تاخیر (دقیقه)"
        />
      </v-row>
      <v-row no-gutters>
        <v-col :cols="6">
          <v-checkbox label="فعال" v-model="exam.enable" />
        </v-col>
        <v-col :cols="6">
          <v-checkbox label="رایگان" v-model="exam.is_free" />
        </v-col>
        <v-col :cols="12">
          <v-checkbox label="ثبت نام باز است" v-model="exam.is_register_open" />
        </v-col>
        <v-col :cols="12">
          <v-checkbox label="شرکت در آزمون باز است" v-model="exam.is_open" />
        </v-col>
        <v-col :cols="12">
          <v-checkbox label="تولید اتوماتیک کارنامه" v-model="exam.generate_automatic_report" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              :disabled="exam.loading"
              :loading="exam.loading"
              elevation="2"
              @click="create"
            >
              ثبت
            </v-btn>
            <v-btn
              :disabled="exam.loading"
              :loading="exam.loading"
              elevation="2"
            >
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
    import {Exam} from "@/models/Exam";
    import Assistant from "@/plugins/assistant";
    Vue.component('date-picker', VuePersianDatetimePicker)

    export default {
        name: 'ExamInfo',
        props:[ 'exam' ],
        data: () => ({
            examItem: new Exam()
        }),
        methods: {
            create () {
                this.examItem = this.exam
                this.examItem.loading = true
                this.examItem.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
                if (this.examItem.id) {
                    this.examItem.update()
                        .then(() => {
                            this.examItem.loading = false
                            this.$toasted.show('ثبت با موفقیت انجام شد', {
                                theme: "toasted-primary",
                                position: "top-right",
                                duration : 2000
                            })
                            this.refreshExamList()
                        })
                        .catch((error) => {
                            Assistant.handleAxiosError(this.$toasted, error)
                            this.examItem.loading = false
                            this.refreshExamList()
                        })
                } else {
                    this.examItem.create()
                        .then(() => {
                            this.examItem.loading = false
                            this.$toasted.show('ثبت با موفقیت انجام شد', {
                                theme: "toasted-primary",
                                position: "top-right",
                                duration : 2000
                            })
                            this.refreshExamList()
                        })
                        .catch((error) => {
                            Assistant.handleAxiosError(this.$toasted, error)
                            this.examItem.loading = false
                            this.examItem = new Exam()
                            this.refreshExamList()
                        })
                }

            },
            refreshExamList () {
                this.$emit('refresh-exam-list')
            }
        }
    }
</script>

<style>
    .vpd-input-group input {
        width: 100%;
    }
</style>
