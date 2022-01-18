<template>
  <div>
    <entity-edit
      v-model:value="inputs"
      title="ویرایش اطلاعات آزمون"
      :api="api"
      :entity-id-key="entityIdKey"
      :entity-param-key="entityParamKey"
      :show-route-name="showRouteName"
      :after-load-input-data="getOptions"
    >

    </entity-edit>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      api: API_ADDRESS.exam.base(),
      entityIdKey: 'data.id',
      entityParamKey: 'data.id',
      showRouteName: 'Admin.Exam.Show',
      options: null,
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' },
        {
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: ' انتخاب نوع آزمون',
          col: 'col-md-6',
          options: [],
          optionValue: 'id',
          optionLabel: 'value'
        },
        { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: ' زمان شروع', col: 'col-md-4' },
        { type: 'dateTime', name: 'finish_at', responseKey: 'data.finish_at', label: ' زمان پایان', col: 'col-md-4' },
        { type: 'input', name: 'delay_time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-4' },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is_free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is_register_open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is_open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-4' },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-4' },
        { type: 'Checkbox', name: 'generate_questions_automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4' }
      ]
    }
  },
  created () {
    this.$axios.get(API_ADDRESS.exam.base())
      .then(res => {
        console.log('response:', res)
      })
    this.api += '/' + this.$route.params.id
  },
  methods: {
    getOptions () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          console.log('res:', response)
          const options = response.data.data.filter(data => data.type === 'exam_type')
          this.inputs.forEach(input => {
            if (input.name === 'type_id') {
              options.forEach(type => {
                input.options.push(type)
                input.value = type.id
                console.log('val', input.value)
              })
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
