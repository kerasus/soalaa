<template>
  <div class="exam mb-2" >
    <p class="font-weight-medium">آزمون ها</p>

    <v-row class="exam-section">
      <v-col class="choose-exam" cols="5">
        <v-select
            :items="examList.list"
            item-text="title"
            item-value="id"
            v-model="chooseExam"
            label="انتخاب آزمون"
            dense
            solo
        ></v-select>
      </v-col>
      <v-col class="choose-lesson" cols="4">
        <v-select
            :items="subCategories.list"
            v-model="chooseLesson"
            item-text="title"
            item-value="id"
            label="انتخاب درس"
            dense
            solo
        ></v-select>
      </v-col>
      <v-col class="exam-order" cols="2">
        <v-text-field
            height="36"
            v-model="examOrder"
            :rules="numberRules"
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
                @click="attach"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-for="(item, index) in exams" :key="index" class="exam-section">
      <v-col class="choose-exam" cols="5">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ item.exam.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="choose-lesson" cols="4">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ item.sub_category.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="exam-order" cols="2">
        <v-card flat height="36">
          <v-card-text class=text-center>
            {{ item.order }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="attach-or-detach" cols="1">
        <v-card flat height="36">
          <v-card-text class=text-center>
            <v-btn
                small
                text
                @click="detach(item)"

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
        return []
      },
      type: Array
    },
    examList: {
      default: () => {
        return []
      },
      type: Array
    },
    subCategories: {
      default: () => {
        return []
      },
      type: Array
    }

  },
  data() {
    return {
      chooseExam: '',
      chooseLesson: '',
      examOrder: '',
      numberRules: [
        v => v.length > 0 || 'پر کردن این فیلد الزامی است.',
        v => Number.isInteger(Number(v)) || 'یک عدد وارد کنید.'
      ]
    }
  },
  created() {
    console.log('exams', this.exams)
    console.log('examList', this.examList)
    console.log('subCategories', this.subCategories)
  }
  ,
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
    },
    detach(item) {

      const emitData = {
        exam: item.exam,
        subCategory: item.sub_category,
        order: item.order
      }
      this.$emit('detach', emitData)
    },
    attach() {
      // const exam = this.examList.find( examItem => examItem.id === item.exam.id )
      const emitData = {
        exam: this.chooseExam,
        subCategory: this.chooseLesson,
        order: this.examOrder
      }
      this.$emit('attach', emitData)
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
