<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <exam-list
          ref="examList"
          @update-exam-id="updateExamId"
          @update-exam-report-id="updateReportExamId"
        />
      </v-col>
      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <v-sheet>
          <v-row>
            <v-btn
              icon
              :style="{ margin: '20px' }"
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <exam-info
                col-lg="5"
                cols="12"
                :exam="exam"
                @refresh-exam-list="rereshExamList"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-dialog>
      <v-dialog
        v-model="reportDialog"
        max-width="600px"
      >
        <v-sheet>
          <v-row>
            <v-btn
              icon
              :style="{ margin: '20px' }"
              @click="reportDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <exam-report-info
                col-lg="5"
                cols="12"
                :exam="exam"
                @refresh-exam-list="rereshExamList"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
import ExamReportInfo from "@/components/OnlineQuiz/Quiz/examReportInfo";
import ExamList from "@/components/OnlineQuiz/Quiz/examList";
import {Exam} from "@/models/Exam";
import axios from "axios";

export default {
  name: 'Manage',
  components: {ExamList, ExamInfo, ExamReportInfo},
  data: () => ({
    exam: new Exam(),
    dialog: false,
    reportDialog: false,
  }),
  methods: {
    rereshExamList() {
      this.$refs.examList.getExams()
    },
    updateExamId(e) {
      this.exam = new Exam(e)
      this.dialog = true
    },
    updateReportExamId(e) {
      this.exam = new Exam(e)
      this.reportDialog = true
    }
  }
}
</script>

<style scoped>

</style>
