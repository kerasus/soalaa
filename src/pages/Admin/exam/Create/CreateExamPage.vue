<template>
  <div class="exam-card">
    <entity-crud-form-builder
      v-model:value="inputs"
      ref="EntityCrudFormBuilder"
    />
    <q-card class="category-card">
      <q-card-section>
        <h6 class="category-header q-ma-md">لیست دفترچه ها</h6>
      </q-card-section>
      <q-separator/>
      <q-card-section class="flex">
        <div class="row bg-grey-3 add-category-box">
          <q-select
            class="q-pa-md col-md-4"
            v-model="category"
            :value="category"
            label="دفترچه"
            :options="categoryOptions"
            option-value="categoryOptions"
            option-label="title"
            emit-value
            map-options
            :disable="totalCategory"
          />
          <q-input
            class="q-pa-md col-md-3"
            v-model="category.order"
            label="ترتیب"
            :disable="totalCategory"
          />
          <q-input
            class="q-pa-md col-md-3"
            v-model="category.time"
            label="زمان"
            :disable="totalCategory"
          />
          <div class="q-pa-md col-md-2 flex">
            <q-btn
              class="q-ma-md"
              icon="add"
              color="green"
              flat
              dense
              fab-mini
              :disable="totalCategory"
              @click="addCategory"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div
          class="category-list"
          v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length === 0">
          <p class="bg-red-2 alert">در حال حاضر دفترچه ای به آزمون اضافه نشده است !</p>
        </div>
        <div
          v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length > 0"
          class="row category-list-row"
        >
          <div
            v-for="(category , index) in inputs[examCategoriesIndex].value"
            :key="index"
            class="row col-md-12"
          >
            <q-select
              class="q-pa-md col-md-4"
              v-model="category.title"
              :value="category.id"
              label="دفترچه"
              :options="categoryOptions"
              option-value="categoryOptions"
              option-label="title"
              emit-value
              map-options
            />
            <q-input
              class="q-pa-md col-md-3"
              v-model="category.order"
              label="ترتیب"
            />
            <q-input
              class="q-pa-md col-md-3"
              v-model="category.time"
              label="زمان"
            />
            <div class="q-pa-md col-md-2 flex">
              <q-btn
                class="q-ma-md"
                icon="close"
                color="red"
                flat
                dense
                fab-mini
                @click="deleteCategory(category.id)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { EntityCrudFormBuilder } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
export default {
  name: 'CreateExamPage',
  components: { EntityCrudFormBuilder },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.exam.base(),
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      inputs: [
        {
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: ' نوع آزمون',
          col: 'col-md-3',
          options: [],
          optionValue: 'value',
          optionLabel: 'value'
        },
        { type: 'hidden', name: 'space', col: 'col-md-9' },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-3' },
        {
          type: 'input',
          name: 'questionType',
          responseKey: 'data.questionType',
          label: 'نوع سوالات',
          col: 'col-md-3',
          icon: 'isax:arrow-right-3'
        },
        { type: 'input', name: 'major', responseKey: 'data.major', label: 'رشته تحصیلی', col: 'col-md-3' },
        { type: 'input', name: 'grade', responseKey: 'data.grade', label: 'پایه تحصیلی', col: 'col-md-3' },
        { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: ' زمان شروع آزمون', col: 'col-md-3' },
        {
          type: 'dateTime',
          name: 'finish_at',
          responseKey: 'data.finish_at',
          label: ' زمان پایان آزمون',
          col: 'col-md-3'
        },
        {
          type: 'input',
          name: 'delay_time',
          responseKey: 'data.delay_time',
          label: 'زمان تاخیر(دقیقه)',
          col: 'col-md-3',
          value: 0
        },
        {
          type: 'input',
          name: 'exam_time',
          responseKey: 'data.time',
          label: 'مدت زمان آزمون(دقیقه)',
          col: 'col-md-3',
          value: 0
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            { type: 'separator', label: 'توضیحات آزمون' },
            {
              type: 'tiptapEditor',
              name: 'inputEditor',
              col: 'col-md-12',
              options: {
                bubbleMenu: false,
                floatingMenu: false,
                poem: false,
                reading: false,
                persianKeyboard: true,
                mathliveOptions: { smartFence: false },
                uploadServer: {
                  url: '/3a/api/v1/question/upload/620e09bd2079aa7c1b00cf8d',
                  instantUpload: false,
                  headers: { Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs' }
                }
              }
            }

          ]

        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            { type: 'separator', label: 'تنظیمات آزمون' },
            {
              type: 'formBuilder',
              name: 'formBuilderColSetting',
              col: 'col-md-12',
              value: [
                {
                  type: 'Checkbox',
                  name: 'enable',
                  responseKey: 'data.enable',
                  label: 'آزمون فعال شود',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_free',
                  responseKey: 'data.is_free',
                  label: 'آزمون رایگان شود',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'generate_questions_automatically',
                  responseKey: 'data.generate_questions_automatically',
                  label: 'تولید اتوماتیک سوال',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'confirm',
                  responseKey: 'data.confirm',
                  label: 'تولید اتوماتیک کارنامه',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_register_open',
                  responseKey: 'data.is_register_open',
                  label: 'ثبت نام آزمون باز است.',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_open',
                  responseKey: 'data.is_open',
                  label: 'شرکت در آزمون باز است',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'remember_exam',
                  responseKey: 'data.remember_exam',
                  label: 'پیامک یادآوری آزمون برای مخاطبین',
                  col: 'col-md-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'sms-link',
                  responseKey: 'data.sms-link',
                  label: 'پیامک لینک آزمون برای مخاطبین',
                  col: 'col-md-6',
                  value: false
                }
              ]
            }
          ]
        },
        { type: 'separator', label: 'توضیحات شما، قبل از شروع آزمون برای کاربران به نمایش در می آید', col: 'col-md-12' },
        { type: 'hidden', name: 'categories', responseKey: 'data.categories', value: [] },
        {
          type: 'hidden',
          name: 'photo',
          responseKey: 'data.photo',
          value: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
        }
      ],
      categoryOptions: [
        { title: 'دفترچه سؤالات عمومی', id: '60b7858d743940688b23c7f3' },
        { title: 'دفترچه سؤالات اختصاصی', id: '60b7858d743940688b23c7f4' }
      ],
      typeOptions: [],
      category: { title: '', id: '', order: 0, time: 0 }
    }
  },
  inject: {
    exam: {
      from: 'providedExam', // this is optional if using the same key for injection
      default: new Exam()
    }
  },
  created () {
    this.getType()
  },
  computed: {
    examCategoriesIndex () {
      return this.inputs.findIndex(item => item.name === 'categories')
    },
    totalCategory () {
      return this.inputs[this.examCategoriesIndex].value && this.inputs[this.examCategoriesIndex].value.length >= 2
    }
  },
  methods: {
    getType () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          this.typeOptions = response.data.data.filter(data => data.type === 'exam_type')
          this.inputs.forEach(input => {
            if (input.name === 'type_id') {
              this.typeOptions.forEach(type => {
                input.options.push(type)
              })
            }
          })
        })
        .catch(() => {})
    },
    deleteCategory (id) {
      const index = this.inputs[this.examCategoriesIndex].value.findIndex(item => item.id === id)
      this.inputs[this.examCategoriesIndex].value.splice(index, 1)
    },
    addCategory () {
      if (this.totalCategory) {
        return
      }
      this.inputs[this.examCategoriesIndex].value = this.inputs[this.examCategoriesIndex].value.concat(this.category)
      this.category = { title: '', id: '', order: 0, time: 0 }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.form-builder .form-builder-col) {
  background: #FFFFFF;
  border-radius: 20px;
}

.exam-card {
}

.category-card {
  display: flex;
  flex-direction: column;

  .category-header {
    margin: auto;
  }

  .add-btn {
    float: right;
  }

  .category-list {
    display: flex;
    padding: 20px;
    width: 60%;
    margin: auto;

    .alert {
      height: 40px;
      margin: auto;
      text-align: center;
      padding: 10px;
    }
  }

  .add-category-box {
    width: 70%;
    margin: auto;
  }
}

.btn-box {
  margin-bottom: 30px;
}
</style>
