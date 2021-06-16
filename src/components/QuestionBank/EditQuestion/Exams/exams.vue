<template>
  <div class="exam">
    <p class="font-weight-medium">
      آزمون ها
    </p>

    <v-row class="exam-section  mb-1">
      <v-col
        class="choose-exam"
        cols="5"
      >
        <v-select
          v-model="chooseExam"
          :items="examList.list"
          item-text="title"
          item-value="id"
          label="انتخاب آزمون"
          dense
          solo
        />
      </v-col>
      <v-col
        class="choose-lesson"
        cols="4"
      >
        <v-select
          v-model="chooseLesson"
          :items="subCategories.list"
          item-text="title"
          item-value="id"
          label="انتخاب درس"
          dense
          solo
        />
      </v-col>

      <v-col
        class="exam-order"
        cols="2"
      >
        <v-text-field
          v-model="examOrder"
          height="36"
          :rules="numberRules"
          label="ترتیب"
          solo
          dense
        />
      </v-col>
      <v-col
        class="attach-or-dettach"
        cols="1"
      >
        <v-card
          flat
          height="36"
        >
          <v-card-text class="text-center">
            <v-btn
              small
              text
              @click="attach"
              :loading="loading"
              :disabled="loading"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      v-for="(item, index) in exams"
      :key="index"
      class="exam-section"
    >
      <v-col
        class="choose-exam"
        cols="5"
      >
        <v-card
          flat
          height="36"
        >
          <v-card-text class="text-center">
            {{ item.exam.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="choose-lesson"
        cols="4"
      >
        <v-card
          flat
          height="36"
        >
          <v-card-text class="text-center">
            {{ item.sub_category.title }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="exam-order"
        cols="2"
      >
        <v-card
          flat
          height="36"
        >
          <v-card-text class="text-center">
            {{ item.order }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="attach-or-detach"
        cols="1"
      >
        <v-card
          flat
          height="36"
        >
          <v-card-text class="text-center">
            <v-btn
              small
              text
              @click="detach(item)"
              :loading="loading"
              :disabled="loading"
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
  name: 'Exams',
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
    },
    loading: {
      default: () => {
        return false
      },
      type: Boolean
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
      this.$emit('detach', item)
    },
    attach() {
      const exam = this.examList.list.find(examItem => examItem.id === this.chooseExam)
      const sub_category = this.subCategories.list.find(subCategoryItem => subCategoryItem.id === this.chooseLesson)
      const emitData = {
        exam,
        sub_category,
        order: this.examOrder
      }
      this.$emit('attach', emitData)
    }
  }
}
</script>

<style>
.exam .exam-order .v-input__control .v-text-field__details {
  position: relative;
  top: -62px;
  left: 9px;
}
</style>
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
