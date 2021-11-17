<template>
  <div class="exam mb-10">
    <p
      v-if="status"
      class="font-weight-medium"
    >
      آزمون ها
    </p>
    <q-form>
      <div v-if="status" class="row q-col-gutter-md attach-exams-box">
        <div class="col-5">
        <q-select
          :model-value="chooseExam"
          :rules="selectorRules"
          borderless
          dense
          bg-color="white"
          class="select-style"
          label="انتخاب آزمون "
          option-value="id"
          :options="examList.list"
          option-label="title" />
        </div>
        <div class="col-4">
          <q-select
            v-model="chooseLesson"
            :rules="selectorRules"
            :options="subCategories.list"
            borderless
            dense
            class="select-style"
            bg-color="white"
            option-label="title"
            option-value="id"
            label="انتخاب درس"/>
        </div>
        <div class="col-2">
          <q-input
            v-model="examOrder"
            height="36"
            :rules="numberRules"
            class="select-style"
            rounded
            borderless
            dense
            bg-color="white"
            label="ترتیب"/>
        </div>
        <div class="col-1">
          <q-btn
            unelevated
            color="white"
            padding="5px 20px"
            text-color="black"
            class="custom-btn-radius"
            icon="add"
            @click="attach"

          />
        </div>

      </div>
      <div class="row q-mb-md q-col-gutter-md"
        v-if="!status && attaches.length>0"
      >
        <div class="col-5">
          <span class="attached-exams-title">
            آزمون
          </span>
        </div>
        <div class="col-4">
          <span class="attached-exams-title">
            درس
          </span>
        </div>
        <div class="col-2">
          <span class="attached-exams-title">
            ترتیب
          </span>
        </div>
      </div>
      <div
        v-for="(item, index) in attaches"
        :key="index"
        class="exam-section row q-col-gutter-md"
      >
        <div class="col-5">
          <q-card
          flat
          class="custom-card-style"
          >
           <q-card-section
           class="text-center"
           >
             {{ item.exam.title }}
           </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card
            flat
            class="custom-card-style"
          >
            <q-card-section
              class="text-center"
            >
              {{ item.sub_category.title }}
            </q-card-section>

          </q-card>
        </div>
        <div class="col-2">
          <q-card
            flat
            class="custom-card-style"
          >
            <q-card-section
              class="text-center"
            >
              {{ item.order }}
            </q-card-section>
          </q-card>
        </div>
        <div
           v-if="status"
        >
          <q-btn
            unelevated
            color="white"
            padding="5px 20px"
            text-color="black"
            class="custom-btn-radius"
            :loading="loading"
            :disabled="loading"
            @click="detach(item)"
            icon="mdi-trash-can-outline"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'

export default {
  name: 'Exams',
  props: {
    attaches: {
      default: () => [],
      type: Array
    },
    examList: {
      type: Object,
      default: () => new ExamList()
    },
    subCategories: {
      default: () => new QuestSubcategoryList(),
      type: Object
    },
    loading: {
      default: () => false,
      type: Boolean
    },
    status: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      chooseExam: '',
      chooseLesson: '',
      examOrder: '',
      numberRules: [
        v => v.length > 0 || 'پر کردن این فیلد الزامی است.',
        v => Number.isInteger(Number(v)) || 'یک عدد وارد کنید.'
      ],
      selectorRules: [
        v => v.length > 0 || 'پر کردن این فیلد الزامی است.'
      ]
    }
  },
  created () {
    console.log('examList :', this.examList)
    console.log('status : ', this.status)
  },
  methods: {
    attachQuestionOnEditMode () {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        // order: this.attachOrder,
        // exam_id: this.attachExamID,
        question_id: this.$route.params.id
        // sub_category_id: this.attachSubcategoryID
      })
        .then(response => {
          this.updateAttachList(response.data.data.exams)
          // console.log('response', response)
          this.attachLoading = false
          this.dialog = false
        })
        .catch(() => {
          this.attachLoading = false
          this.dialog = false
        })
    },
    detach (item) {
      this.$emit('detach', item)
    },
    attach () {
      if (this.$refs.form.validate()) {
        const exam = this.examList.list.find(examItem => examItem.id === this.chooseExam)
        // eslint-disable-next-line camelcase
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
}
</script>

<style lang="scss">
.custom-btn-radius{
  border-radius: 5px;
}
.exam-section{
  .q-card{
    .q-card__section{
      padding: 8px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.attach-exams-box {
  .select-style{
    .q-field__inner{
      .q-field__control{
        border-radius: 10px;
        .q-field__control-container {
          .q-field__label{
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
.attached-exams-title{
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  font-size: 16px;
}
.custom-card-style{
}
</style>
