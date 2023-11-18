<template>
  <div class="d-flex justify-center">
    <div class="row justify-center q-mt-lg">
      <div class="col-6">
        <div class="row">
          <!--          <div class="col-12">-->
          <!--            <div class="row justify-end">-->
          <!--              <q-btn-->
          <!--                class="q-mx-sm float-right"-->
          <!--                round-->
          <!--                dark-percentage-->
          <!--                color="primary"-->
          <!--                @click= this.$router.go(-1)-->
          <!--                icon="isax:arrow-left-2"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="col-12">
            <q-input v-model="exam.report_config.maximum_question_answered"
                     type="number"
                     label="maximum_question_answered" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.include_abnormal"
                        label="include_abnormal" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.include_unranked"
                        label="include_unranked" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.make_report_for_before_delay"
                        label="make_report_for_before_delay" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.make_report_for_remaining_only"
                        label="make_report_for_remaining_only" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.temp_exams_in_exam_interval"
                        label="temp_exams_in_exam_interval" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.consider_negative_point"
                        label="consider_negative_point" />
          </div>
          <div class="col-12">
            <q-checkbox v-model="exam.report_config.populate_school_ranking"
                        label="populate_school_ranking" />
          </div>
          <div class="col-12">
            <q-input v-model="exam.report_config.right_answer_weight"
                     type="number"
                     label="right_answer_weight" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-center">
              <q-btn :disabled="exam.loading"
                     :loading="exam.loading"
                     elevation="2"
                     @click="save">
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
import { Exam, ExamList } from 'src/models/Exam.js'

export default {
  name: 'ExamReportInfo',
  data: () => ({
    exam: new Exam(),
    examList: new ExamList(),
    items: [],
    loading: true,
    examItem: new Exam(),
    examId: null,
    examTitle: null + 'ویرایش'
  }),
  mounted () {
    this.$store.commit('AppLayout/updateLastBreadcrumb', {
      loading: true
    })
    this.examId = this.$route.params.id
    const that = this
    this.$apiGateway.option.getUserOptions('exam_type')
      .then(function (options) {
        const optionQuestion = options.find(item => (item.value === 'psychometric'))
        if (!optionQuestion) {
          return this.$q.notify({
            message: ' API با مشکل مواجه شد!',
            type: 'error'
          })
        }
        that.optionQuestionId = optionQuestion.id
        const itemstype = options.filter(data => data.type === 'question_type')
        that.items = itemstype
        that.loading = false
      })
    this.getExam(this.examId)
    this.overlayLoading()
  },
  methods: {
    overlayLoading () {
      if (this.exam.loading) {
        this.$store.dispatch('loading/overlayLoading', true)
      }
    },
    addBreadcrumb () {
      this.$store.commit('AppLayout/updateLastBreadcrumb', {
        loading: false,
        title: 'ویرایش ' + this.examTitle
      })
    },
    getExam (id) {
      this.$store.dispatch('loading/linearLoading', true)
      const that = this
      this.$apiGateway.exam.showExam(id)
        .then(function (exam) {
          that.exam = new Exam(exam)
          that.examItem = that.exam
          that.$store.dispatch('loading/linearLoading', false)
          that.examTitle = that.exam.title
          that.addBreadcrumb()
        })
    },
    save () {
      const that = this
      this.$apiGateway.exam.updateReportOptions({
        examId: this.exam.id,
        data: this.exam.report_config
      })
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
