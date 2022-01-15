<template>
  <entity-create
    v-model:value="inputs"
    title="ساخت آزمون"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
  <portlet>
    <template #title>
      اضافه کردن دفترچه
    </template>
    <template #toolbar>
      <q-btn flat round icon="add" >
        <q-tooltip>
          اضافه کردن
        </q-tooltip>
      </q-btn>
    </template>
    <template #content>
      <q-card class="category-card">
        <form-builder v-model:value="categoryOptions"/>
        <form-builder v-model:value="categoryList"/>
      </q-card>
    </template>
  </portlet>
</template>

<script>
import { EntityCreate, Portlet } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
// import { QuestCategory, QuestCategoryList } from 'src/models/QuestCategory'
import { FormBuilder } from 'quasar-form-builder'

export default {
  name: 'Create',
  components: { EntityCreate, FormBuilder, Portlet },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.exam.base(),
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' },
        {
          type: 'Select',
          name: 'type',
          responseKey: 'data.type.value',
          label: ' انتخاب نوع آزمون',
          col: 'col-md-6',
          options: [{ id: '6141a799f044ab21205450b2', type: 'exam_type', value: 'konkur', updated_at: '2021-09-15 12:28:17', created_at: '2021-09-15 12:28:17' },
            { id: '6141a799f044ab21205450b3', type: 'exam_type', value: 'psychometric', updated_at: '2021-09-15 12:28:17', created_at: '2021-09-15 12:28:17' }],
          optionValue: 'value',
          optionLabel: 'value'
        },
        { type: 'dateTime', name: 'start-at', responseKey: 'data.start_at', label: ' زمان شروع', col: 'col-md-4', range: false, multiple: false, time: false },
        { type: 'dateTime', name: 'finish-at', responseKey: 'data.finish_at', label: ' زمان پایان', col: 'col-md-4', range: true, multiple: true, time: true },
        { type: 'input', name: 'delay-time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-4', value: 0 },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is-free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is-register-open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is-open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'generate-questions-automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4', value: false }
      ],
      categoryOptions: [
        {
          type: 'Select',
          name: 'category',
          responseKey: 'data.type',
          label: 'category',
          col: 'col-md-4',
          options: [
            { id: '60b7858d743940688b23c7f3', title: 'دفترچه سؤالات عمومی' },
            { id: '60b7858d743940688b23c7f4', title: 'دفترچه سؤالات اختصاصی' }
          ],
          optionValue: 'id',
          optionLabel: 'title'
        },
        { type: 'input', name: 'time', responseKey: 'data.delay_time', label: 'زمان', col: 'col-md-4' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'ترتیب', col: 'col-md-4', value: 0 }
      ],
      categoryList: []
    }
  },
  created () {
    // this.getCategories()
  },
  methods: {
    // getCategories () {
    //   this.$axios.get(API_ADDRESS.questionCategory.base)
    //     .then((response) => {
    //       this.$store.dispatch('loading/linearLoading', false)
    //       this.categoryList = new QuestCategoryList(response.data.data)
    //       this.categoryList.list.forEach(category => {
    //         // this.categoryTitles.push(category.title)
    //       })
    //       console.log(this.categoryList)
    //     })
    //     .catch(() => {
    //       this.$store.dispatch('loading/linearLoading', false)
    //     })
    // },
    // addCategory () {
    //   const category = this.categoryList.list.find(item => item.title === this.categoryOptions.options.title)
    //   console.log(category)
    //   this.examInfo.categories.list.push(new QuestCategory({
    //     id: category.id,
    //     time: this.selectedCategoryTime,
    //     order: this.selectedCategoryOrder,
    //     title: this.selectedCategory
    //   }))
    // }
  }
}
</script>

<style lang="scss" scoped>
.category-card{
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  .add-btn{
    float: right;
  }
}
</style>
