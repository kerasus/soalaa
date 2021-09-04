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
      <v-row no-gutters>
        <v-col :cols="12">
          <v-text-field
            v-model="reportOptions.maximum_question_answered"
            type="number"
            label="maximum_question_answered"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.include_abnormal"
            label="include_abnormal"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.include_unranked"
            label="include_unranked"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.make_report_for_before_delay"
            label="make_report_for_before_delay"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.make_report_for_remaining_only"
            label="make_report_for_remaining_only"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.temp_exams_in_exam_interval"
            label="temp_exams_in_exam_interval"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.consider_negative_point"
            label="consider_negative_point"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="reportOptions.populate_school_ranking"
            label="populate_school_ranking"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              :disabled="exam.loading"
              :loading="exam.loading"
              elevation="2"
              @click="save"
            >
              ثبت
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="white"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script>
    import {Exam} from "@/models/Exam";
    import axios from "axios";
    import Assistant from "@/plugins/assistant";
    import API_ADDRESS from "@/api/Addresses";

    export default {
        name: "ExamReportInfo",
        props: ['exam'],
        data: () => ({
          items: [],
          loading:true,
          examItem: new Exam(),
          reportOptions: {
            "maximum_question_answered" : 5,
            "include_abnormal" : false,
            "include_unranked" : false,
            "make_report_for_before_delay" : false,
            "make_report_for_remaining_only" : false,
            "temp_exams_in_exam_interval" : false,
            "consider_negative_point" : false,
            "populate_school_ranking" : false
          }

        }),
        created() {
          let that = this
          axios.get(API_ADDRESS.option.base)
                  .then(function (response) {
                    const optionQuestion = response.data.data.find(item => (item.value === 'psychometric' && item.type === 'exam_type'))
                    if (!optionQuestion) {
                      // beterek
                      return this.$notify({
                        group: 'notifs',
                        text: ' API با مشکل مواجه شد!',
                        type: 'error'
                      })
                    }

                    that.optionQuestionId = optionQuestion.id
                    const itemstype = response.data.data.filter(data => data.type === 'question_type')
                    that.items = itemstype
                    that.loading = false
                  })
          this.examItem = this.exam
        },
        methods: {
          save() {
            axios.post(API_ADDRESS.exam.report.updateReportOptions(this.exam.id), this.reportOptions)
            .then(() => {
              this.refreshExamList()
            })
          },
          refreshExamList() {
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