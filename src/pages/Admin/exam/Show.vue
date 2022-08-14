<template>
  <div>
<!--    <entity-show-->
<!--      v-model:value="inputs"-->
<!--      title="اطلاعات آزمون"-->
<!--      :api="api"-->
<!--      :entity-id-key="entityIdKey"-->
<!--      :entity-param-key="entityParamKey"-->
<!--      :edit-route-name="editRouteName"-->
<!--      :index-route-name="indexRouteName"-->
<!--    >-->
<!--      <template #after-form-builder >-->
<!--        <div-->
<!--          v-for="(category , index) in inputs[examCategoriesIndex].value"-->
<!--          :key="index"-->
<!--          class="row"-->
<!--        >-->
<!--          <q-select-->
<!--            class="q-pa-md col-md-4"-->
<!--            v-model="category.title"-->
<!--            :value="category.id"-->
<!--            label="دفترچه"-->
<!--            :options="inputs[examCategoriesIndex].value"-->
<!--            option-value="title"-->
<!--            option-label="title"-->
<!--            emit-value-->
<!--            map-options-->
<!--            disable-->
<!--          />-->
<!--          <q-input-->
<!--            class="q-pa-md col-md-3"-->
<!--            v-model="category.order"-->
<!--            label="ترتیب"-->
<!--            disable-->
<!--          />-->
<!--          <q-input-->
<!--            class="q-pa-md col-md-3"-->
<!--            v-model="category.time"-->
<!--            label="زمان"-->
<!--            disable-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
<!--    </entity-show>-->
    <div class="q-pa-md">
      <q-btn
        color="primary"
        class="full-width"
        label="ساخت فایل سوالات"
        @click="generateJsonFile(entityId, false)"
      />
    </div>
    <div class="q-pa-md">
      <q-btn
        color="primary"
        class="full-width"
        label="ساخت فایل سوالات با جواب"
        @click="generateJsonFile(entityId, true)"
      />
    </div>
    <div class="q-pt-md">
      <portlet>
        <template v-slot:title >
          ویرایش کارنامه آزمون
        </template>
        <template v-slot:content >
          <edit-exam-report/>
        </template>
      </portlet>
    </div>
    <div class="q-pt-md">
      <portlet>
        <template v-slot:title >
          آپلود فایل سوالات و جواب ها
        </template>
        <template v-slot:content >
          <upload/>
        </template>
      </portlet>
    </div>
    <div class="q-pt-md">
      <portlet>
        <template v-slot:title >
          اصلاح ضرایب
        </template>
        <template v-slot:content >
          <edit-coefficients/>
        </template>
      </portlet>
    </div>
  </div>

</template>

<script>
import {
  // EntityShow,
  Portlet
} from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import EditExamReport from 'pages/Admin/exam/editExamReport'
import Upload from 'pages/Admin/exam/Upload'
import EditCoefficients from 'pages/Admin/exam/editCoefficients'

export default {
  name: 'Show',
  components: {
    // EntityShow,
    EditCoefficients,
    Upload,
    EditExamReport,
    Portlet
  },
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
  methods: {
    generateJsonFile (id, withAnswer) {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.post(API_ADDRESS.exam.generateExamFile(id, withAnswer))
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'ساخت فایل ' + this.inputs[0].value + ' با موفقیت انجام شد',
            position: 'top'
          })
          this.$store.dispatch('loading/linearLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    editCoefficient (id) {
      this.$router.push({
        name: 'Admin.Exam.Coefficient.Edit',
        params: {
          id
        }
      })
    },
    getRemoveMessage (row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  computed: {
    entityId () {
      return this.$route.params.id
    },
    examCategoriesIndex () {
      return this.inputs.findIndex(item => item.name === 'categories')
    }
  }
}
</script>

<style scoped>

</style>
