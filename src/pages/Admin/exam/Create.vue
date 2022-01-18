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
      <q-btn flat round icon="add" @click="addCategory">
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
      indexRouteName: 'Admin.Exam.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' },
        {
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: ' انتخاب نوع آزمون',
          col: 'col-md-6',
          options: [],
          optionValue: 'value',
          optionLabel: 'value'
        },
        { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: ' زمان شروع', col: 'col-md-4' },
        { type: 'dateTime', name: 'finish_at', responseKey: 'data.finish_at', label: ' زمان پایان', col: 'col-md-4' },
        { type: 'input', name: 'delay_time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-4', value: 0 },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_register_open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'generate_questions_automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4', value: false }
      ],
      categoryOptions: [
        {
          type: 'Select',
          name: 'category',
          label: 'category',
          col: 'col-md-4',
          options: [],
          optionValue: 'id',
          optionLabel: 'title'
        },
        { type: 'input', name: 'time', label: 'زمان', col: 'col-md-4' },
        { type: 'input', name: 'order', label: 'ترتیب', col: 'col-md-4', value: 0 }
      ],
      typeOptions: [],
      categories: [],
      categoryList: [],
      dataForSend: []
    }
  },
  created () {
    this.getType()
    this.getCategories()
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
    getCategories () {
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          this.categories = response.data.data
          this.categoryOptions.forEach(input => {
            if (input.name === 'category') {
              this.categories.forEach(category => {
                input.options.push(category)
              })
            }
          })
        })
        .catch(() => {})
    },
    // TODO => next method needs to fix
    addCategory () {
      const selectInput = this.categoryOptions.find(element => element.name === 'category')
      const category = this.categories.find(item => item.id === selectInput.value)
      const selectedCategoryTime = this.categoryOptions.find(element => element.name === 'time')
      const selectedCategoryOrder = this.categoryOptions.find(element => element.name === 'order')
      this.categoryList[0] = selectInput
      this.categoryList[1] = selectedCategoryTime
      this.categoryList[2] = selectedCategoryOrder
      console.log(this.categoryList)
      this.dataForSend.push({
        id: category.id,
        time: selectedCategoryTime.value,
        order: selectedCategoryOrder.value,
        title: category.title
      })
    },
    sendData () {
      this.inputs.forEach(input => {
        if (input.name === 'type_id') {
          const type = this.typeOptions.find(element => element.value === input.value)
          input.value = type.id
        }
      })
    }
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
