<template>
  <div class="exam">
    <p class="font-weight-medium">آزمون ها</p>

    <v-row class="exam-section">
      <v-col class="choose-exam" cols="5">
        <v-select
            items="items"
            label="انتخاب آزمون"
            dense
            solo
        ></v-select>
      </v-col>
      <v-col class="choose-listen" cols="4">
        <v-select
            items="items"
            label="انتخاب درس"
            dense
            solo
        ></v-select>
      </v-col>
      <v-col class="exam-order" cols="2">
        <v-text-field
            height="36"
            label="ترتیب"
            solo
            dense
        ></v-text-field>
      </v-col>
      <v-col class="attach-or-dettach" cols="1">
        <v-card flat height="36">
          <v-card-text class=text-center>
            <v-btn
                small
                text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-for="(exam, index) in exams" :key="index" class="exam-section">
      <v-col class="choose-exam" cols="5">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ exam.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="choose-listen" cols="4">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ exam.sub_category.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="exam-order" cols="2">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ exam.order }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="attach-or-dettach" cols="1">
        <v-card flat height="36">
          <v-card-text class=text-center>
            <v-btn
                small
                text
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from '@/api/Addresses'

export default {
  name: 'exams',
  props: {
    exams: {
      default: () => {
        return [
          {
            "sub_category": {
              "id": "60b7875428f350277f04c5e4",
              "title": "عربی عمومی",
              "category_id": "60b7858d743940688b23c7f3"
            },
            "title": "60924621ade9711661048075",
            "exam_id": "60924621ade9711661048075",
            "order": 26
          },
          {
            "sub_category": {
              "id": "60b7875428f350277f04c5e4",
              "title": "عربی عمومی",
              "category_id": "60b7858d743940688b23c7f3"
            },
            "title": "60924621ade9711661048075",
            "exam_id": "60924621ade9711661048075",
            "order": 26
          },
          {
            "sub_category": {
              "id": "60b7875428f350277f04c5e4",
              "title": "عربی عمومی",
              "category_id": "60b7858d743940688b23c7f3"
            },
            "title": "60924621ade9711661048075",
            "exam_id": "60924621ade9711661048075",
            "order": 26
          },
        ]
      },
      type: Array
    }
  },
  created() {
    console.log('exams', this.exams)
  },
  methods: {
    attachQuestionOnEditMode() {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: this.attachOrder,
        exam_id: this.attachExamID,
        question_id: this.$route.params.id,
        sub_category_id: this.attachSubcategoryID
      })
          .then(response => {
            this.updateAttachList(response.data.data.exams)
            console.log('response', response)
            this.attachLoading = false
            this.dialog = false
          })
          .catch(() => {
            this.attachLoading = false
            this.dialog = false
          })
    }
  }
}
</script>

<style scoped>
.v-text-field.v-text-field--enclosed {
  height: 40px;
}

.row + .row {
  margin-top: 0px;
}

.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 7px;
}

.v-btn:not(.v-btn--round).v-size--small {
  height: 24px;
  min-width: 0px;
  padding: 0 0px;
}
</style>
