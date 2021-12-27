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
</template>

<script>
import EntityCreate from 'components/Entity/Create/EntityCreate'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.exam.base(),
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-12' },
        {
          type: 'Select',
          name: 'type',
          responseKey: 'data.type.value',
          label: ' انتخاب نوع آزمون',
          col: 'col-md-12',
          options: [{ id: '6141a799f044ab21205450b2', type: 'exam_type', value: 'konkur', updated_at: '2021-09-15 12:28:17', created_at: '2021-09-15 12:28:17' },
            { id: '6141a799f044ab21205450b3', type: 'exam_type', value: 'psychometric', updated_at: '2021-09-15 12:28:17', created_at: '2021-09-15 12:28:17' }],
          optionValue: 'value',
          optionLabel: 'value'
        },
        { type: 'dateTime', name: 'start-at', responseKey: 'data.start_at', label: ' زمان شروع', col: 'col-md-12', range: false, multiple: false, time: false },
        { type: 'dateTime', name: 'finish-at', responseKey: 'data.finish_at', label: ' زمان پایان', col: 'col-md-12', range: true, multiple: true, time: true },
        { type: 'input', name: 'delay-time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-12' },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-6' },
        { type: 'Checkbox', name: 'is-free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-6' },
        { type: 'Checkbox', name: 'is-register-open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-12' },
        { type: 'Checkbox', name: 'is-open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-12' },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-12' },
        { type: 'Checkbox', name: 'generate-questions-automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-12' },
        {
          type: 'Select',
          name: 'category',
          responseKey: 'data.type',
          label: 'category',
          col: 'col-md-6',
          options: [
            { id: '60b7858d743940688b23c7f3', title: 'دفترچه سؤالات عمومی' },
            { id: '60b7858d743940688b23c7f4', title: 'دفترچه سؤالات اختصاصی' }
          ],
          optionValue: 'id',
          optionLabel: 'title'
        },
        { type: 'input', name: 'time', responseKey: 'data.delay_time', label: 'زمان', col: 'col-md-6' },
        { type: 'input', name: 'order', responseKey: 'data.delay_time', label: 'ترتیب', col: 'col-md-6' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
