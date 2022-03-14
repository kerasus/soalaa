<template>
  <div class="d-flex justify-center">
    <div class="row justify-center q-mt-lg">
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <div class="row justify-end">
              <q-btn
                round
                color="primary"
                unelevated
                @click="goBack"
              >
                <i class="fi-rr-angle-left row" />
              </q-btn>
            </div>
          </div>
          <div class="col-12">
            <q-input
              v-model="exam.report_config.maximum_question_answered"
              type="number"
              label="maximum_question_answered"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.include_abnormal"
              label="include_abnormal"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.include_unranked"
              label="include_unranked"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.make_report_for_before_delay"
              label="make_report_for_before_delay"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.make_report_for_remaining_only"
              label="make_report_for_remaining_only"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.temp_exams_in_exam_interval"
              label="temp_exams_in_exam_interval"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.consider_negative_point"
              label="consider_negative_point"
            />
          </div>
          <div class="col-12">
            <q-checkbox
              v-model="exam.report_config.populate_school_ranking"
              label="populate_school_ranking"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-center">
              <q-btn
                :disabled="exam.loading"
                :loading="exam.loading"
                elevation="2"
                @click="save"
              >
                ثبت
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <v-overlay :value="loading">-->
    <!--      <v-circular-progress-->
    <!--        :size="70"-->
    <!--        :width="7"-->
    <!--        color="white"-->
    <!--        indeterminate-->
    <!--      />-->
    <!--    </v-overlay>-->
  </div>
</template>

<script>
import { Exam, ExamList } from 'src/models/Exam'
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ExamReportInfo',
  data: () => ({
    exam: new Exam(),
    examList: new ExamList(),
    items: [],
    loading: true,
    examItem: new Exam(),
    examId: null
  }),
  created () {
    const path = this.$store.getters['AppLayout/breadcrumbs'].path[1].loading
    console.log(path)
    this.examId = this.$route.params.idd
    const that = this
    axios.get(API_ADDRESS.option.base + '?type=exam_type')
      .then(function (response) {
        const optionQuestion = response.data.data.find(item => (item.value === 'psychometric'))
        if (!optionQuestion) {
          // beterek
          return this.$q.notify({
            message: ' API با مشکل مواجه شد!',
            type: 'error'
          })
        }
        that.optionQuestionId = optionQuestion.id
        const itemstype = response.data.data.filter(data => data.type === 'question_type')
        that.items = itemstype
        that.loading = false
      })
    this.examItem = this.exam
    this.getExam(this.examId)
    this.overlayLoading()
  },
  methods: {
    goBack () {
      this.$router.push('/admin/exam')
    },
    overlayLoading () {
      if (this.exam.loading) {
        this.$store.dispatch('loading/overlayLoading', true)
      }
    },

    getExam (id) {
      this.$store.dispatch('loading/linearLoading', true)
      const that = this
      axios.get(API_ADDRESS.exam.base())
        .then(function (response) {
          that.examList = new ExamList(response.data.data)
          that.exam = new Exam(that.examList.list.find(item => item.id === id))
          that.$store.dispatch('loading/linearLoading', false)
        })
    },
    save () {
      const that = this
      axios.post(API_ADDRESS.exam.report.updateReportOptions(this.exam.id), this.exam.report_config)
        .then(() => {
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'active'
          })
          this.refreshExamList()
        })
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
