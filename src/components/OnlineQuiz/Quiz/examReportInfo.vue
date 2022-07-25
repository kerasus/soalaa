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
            v-model="exam.report_config.maximum_question_answered"
            type="number"
            label="maximum_question_answered"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.include_abnormal"
            label="include_abnormal"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.include_unranked"
            label="include_unranked"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.make_report_for_before_delay"
            label="make_report_for_before_delay"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.make_report_for_remaining_only"
            label="make_report_for_remaining_only"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.temp_exams_in_exam_interval"
            label="temp_exams_in_exam_interval"
          />
        </v-col>
        <v-col :cols="12">
          <v-text-field
            v-model="exam.report_config.right_answer_weight"
            label="right_answer_weight"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.report_config.populate_school_ranking"
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
    import API_ADDRESS from "@/api/Addresses";

    export default {
        name: "ExamReportInfo",
        props: ['exam'],
        data: () => ({
          items: [],
          loading:true,
          examItem: new Exam(),
        }),
        created() {
          let that = this
          axios.get(API_ADDRESS.option.base + '?type=exam_type')
                  .then(function (response) {
                    const optionQuestion = response.data.data.find(item => (item.value === 'psychometric'))
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
            let that = this
            axios.post(API_ADDRESS.exam.report.updateReportOptions(this.exam.id), this.exam.report_config)
            .then(() => {
              that.$notify({
                group: 'notifs',
                text: 'اطلاعات آزمون شما ثبت شد.',
                type: 'success'
              })
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
