<template>
  <div>
    <div class="row justify-end q-pr-lg">
        <q-btn
          round
          color="primary"
          unelevated
          @click= this.$router.go(-1)
        >
          <i class="fi-rr-angle-left row" />
        </q-btn>
    </div>
    <entity-show
      v-model:value="inputs"
      title="اطلاعات آزمون"
      :api="api"
      :entity-id-key="entityIdKey"
      :entity-param-key="entityParamKey"
      :edit-route-name="editRouteName"
      :index-route-name="indexRouteName"
    >
      <template #after-form-builder >
        <div
          v-for="(category , index) in inputs[examCategoriesIndex].value"
          :key="index"
          class="row"
        >
          <q-select
            class="q-pa-md col-md-4"
            v-model="category.title"
            :value="category.id"
            label="دفترچه"
            :options="inputs[examCategoriesIndex].value"
            option-value="title"
            option-label="title"
            emit-value
            map-options
            disable
          />
          <q-input
            class="q-pa-md col-md-3"
            v-model="category.order"
            label="ترتیب"
            disable
          />
          <q-input
            class="q-pa-md col-md-3"
            v-model="category.time"
            label="زمان"
            disable
          />
        </div>
      </template>
    </entity-show>
  </div>

</template>

<script>
import { EntityShow } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      api: API_ADDRESS.exam.base(),
      entityIdKey: 'data.id',
      entityParamKey: 'data.id',
      editRouteName: 'Admin.Exam.Edit',
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
        { type: 'Checkbox', name: 'generate_questions_automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4' },
        { type: 'hidden', name: 'categories', responseKey: 'data.categories', value: [] }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  computed: {
    examCategoriesIndex () {
      return this.inputs.findIndex(item => item.name === 'categories')
    }
  }
}
</script>

<style scoped>

</style>
