<template>
  <div class="exam-card">
    <entity-crud-form-builder
      ref="EntityCrudFormBuilder"
      v-model:value="inputs"
    />
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
      model: 'one',
      expanded: true,
      api: API_ADDRESS.exam.base(),
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      inputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12',
          value: [
            { type: 'separator', label: 'نوع آزمون', separatorType: 'none', col: 'exam-type-separator' },
            {
              type: 'toggleButton',
              name: 'exam_type',
              responseKey: 'data.exam_type',
              col: 'exam-type-toggle-button',
              ripple: false,
              value: '6225f4828044517f52500c03',
              color: 'white',
              toggleColor: 'primary',
              toggleTextColor: 'white',
              textColor: 'black',
              options: [{ label: 'عادی', value: '6225f4828044517f52500c02' }, { label: 'جامع', value: '6225f4828044517f52500c03' }]
            },
            { type: 'hidden', name: 'space', col: 'col-md-9 col-sm-6' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'عنوان آزمون', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'title', responseKey: 'data.title', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'نوع سوالات', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'question_type', responseKey: 'data.question_type', options: [{ label: 'konkur', value: '6225f4828044517f52500c04' }, { label: 'psychometric', value: '6225f4828044517f52500c05' }, { label: 'descriptive', value: '6225f4828044517f52500c06' }], col: 'col-12', icon: 'isax:arrow-right-3' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'رشته تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'zirgorooh_type', responseKey: 'data.zirgorooh_type', options: [{ label: 'زیرگروه1', value: '6225f4828044517f52500c07' }, { label: 'زیرگروه2', value: '6225f4828044517f52500c08' }], col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'پایه تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'booklet_type', responseKey: 'data.booklet_type', options: [{ label: '1', value: '6225f4828044517f52500c0d' }, { label: '2', value: '6225f4828044517f52500c0c' }], col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'زمان شروع آزمون', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: '', col: 'col-12', calendarIcon: 'isax:calendar-1', placeholder: 'زمان شروع آزمون' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'زمان تاخیر(دقیقه)', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'dateTime', name: 'finish_at', responseKey: 'data.finish_at', label: '', col: 'col-12', placeholder: 'زمان تاخیر' }

          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'زمان تاخیر(دقیقه)', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'delay_time', responseKey: 'data.delay_time', label: '', col: 'col-12', value: 0, placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'مدت زمان آزمون(دقیقه)', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'exam_time', responseKey: 'data.time', label: '', col: 'col-12', value: 0, placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-6 editor-section',
          value: [
            { type: 'separator', label: 'توضیحات آزمون', size: '0', col: 'col-12', separatorType: 'none' },
            {
              type: 'tiptapEditor',
              name: 'inputEditor',
              col: 'col-12 editor-box',
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
            },
            { type: 'separator', label: 'توضیحات شما، قبل از شروع آزمون برای کاربران به نمایش در می آید', col: 'col-12', separatorType: 'none' }
          ]
        },

        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-6 setting-box',
          value: [
            { type: 'separator', label: 'تنظیمات آزمون', col: 'col-12 title', separatorType: 'none' },
            {
              type: 'formBuilder',
              name: 'formBuilderColSetting',
              col: 'col-12',
              value: [
                {
                  type: 'Checkbox',
                  name: 'enable',
                  responseKey: 'data.enable',
                  label: 'آزمون فعال شود',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_free',
                  responseKey: 'data.is_free',
                  label: 'آزمون رایگان شود',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'generate_questions_automatically',
                  responseKey: 'data.generate_questions_automatically',
                  label: 'تولید اتوماتیک سوال',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'confirm',
                  responseKey: 'data.confirm',
                  label: 'تولید اتوماتیک کارنامه',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_register_open',
                  responseKey: 'data.is_register_open',
                  label: 'ثبت نام آزمون باز است.',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'is_open',
                  responseKey: 'data.is_open',
                  label: 'شرکت در آزمون باز است',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'remember_exam',
                  responseKey: 'data.remember_exam',
                  label: 'پیامک یادآوری آزمون برای مخاطبین',
                  col: 'col-12 col-sm-6',
                  value: false
                },
                {
                  type: 'Checkbox',
                  name: 'sms-link',
                  responseKey: 'data.sms-link',
                  label: 'پیامک لینک آزمون برای مخاطبین',
                  col: 'col-12 col-sm-6',
                  value: false
                }
              ]
            }
          ]
        },
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
  mounted () {
    // const element = document.getElementsByClassName('')
    // console.log(element)
    // element.classList.remove('.col')
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

.exam-card {
  &:deep(.setting-box) {
   padding: 8px 0 0 12px;
    .title {
      padding-bottom: 8px;
    }
  }
  &:deep(.editor-box div p) {
   margin-bottom: 0;
  }
  &:deep(.editor-section .row) {
    height: 100%;
  }
  &:deep(.form-builder .form-builder-col) {
    background: var(--3a-Neutral3);
    border-radius: 20px;
    padding: 0;
  }
  &:deep(.form-builder-tiptapEditor-col div) {
    &:first-child {
      height: 100%;
    }
  }
  &:deep(.exam-type-toggle-button) {
    padding-bottom: 0 !important;
  }

}

</style>
