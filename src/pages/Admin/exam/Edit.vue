<template>
<div>
  <entity-edit
    v-model:value="inputs"
    title="ویرایش اطلاعات آزمون"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :options="options"
  >

  </entity-edit>
</div>
</template>

<script>
import entityEdit from 'src/components/Entity/Edit/EntityEdit'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'Edit',
  components: { entityEdit },
  data () {
    return {
      examId: null,
      api: API_ADDRESS.exam.base(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      options: null,
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
        { type: 'dateTime', name: 'start-at', responseKey: 'data.start_at', label: ' زمان شروع', col: 'col-md-4' },
        { type: 'dateTime', name: 'finish-at', responseKey: 'data.finish_at', label: ' زمان پایان', col: 'col-md-4' },
        { type: 'input', name: 'delay-time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-4' },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is-free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is-register-open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-4' },
        { type: 'Checkbox', name: 'is-open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-4' },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-4' },
        { type: 'Checkbox', name: 'generate-questions-automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    /* getOptions () { */
    //   this.$axios.get(API_ADDRESS.option.base)
    //     .then((response) => {
    //       this.$store.dispatch('loading/linearLoading', false)
    //       this.options = response.data.data.filter(data => data.type === 'exam_type')
    //     })
    //     .catch(() => {
    //       this.$store.dispatch('loading/linearLoading', false)
    //     })
    // }
  }
}
</script>

<style scoped>

</style>
