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
      :before-get-data="getCategories"
    >
      <template #after-form-builder >
        <q-card class="category-card">
          <q-card-section>
            <h6 class="category-header q-ma-md">لیست دفترچه ها</h6>
          </q-card-section>
          <q-separator/>
          <q-card-section class="flex">
            <div class="row bg-grey-3 add-category-box">
              <q-select
                class="q-pa-md col-md-4"
                v-model="category.title"
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
          <q-card-section class="flex">
            <div
              class="category-list"
              v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length === 0">
              <p class="bg-red-2 alert">در حال حاضر دفترچه ای به آزمون اضافه نشده است !</p>
            </div>
            <div
              v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length > 0"
              class="row"
            >
              <div
                v-for="(category , index) in inputs[examCategoriesIndex].value"
                :key="index"
                class="row col-md-12 category-list-row"
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
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Edit',
  components: { EntityEdit },
  computed: {
    examCategoriesIndex () {
      return this.inputs.findIndex(item => item.name === 'categories')
    },
    totalCategory () {
      return this.inputs[this.examCategoriesIndex].value && this.inputs[this.examCategoriesIndex].value.length >= 2
    }
  },
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
        { type: 'Checkbox', name: 'generate_questions_automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4' },
        { type: 'hidden', name: 'categories', responseKey: 'data.categories', value: [] }
      ],
      category: { title: '', id: '', order: 0, time: 0 },
      categoryOptions: [
        { title: 'دفترچه سؤالات عمومی', id: '60b7858d743940688b23c7f3' },
        { title: 'دفترچه سؤالات اختصاصی', id: '60b7858d743940688b23c7f4' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    getCategories (response, setNewInputData) {
      if (!response) {
        return
      }
      const responseCategories = response.data.categories
      const categoriesIndex = this.inputs.findIndex(item => item.name === 'categories')
      this.inputs[categoriesIndex].value = responseCategories
    },
    getOptions () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          const options = response.data.data.filter(data => data.type === 'exam_type')
          this.inputs.forEach(input => {
            if (input.name === 'type_id') {
              options.forEach(type => {
                input.options.push(type)
                input.value = type.id
              })
            }
          })
        })
        .catch(() => {
        })
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
.category-card{
  display: flex;
  flex-direction: column;
  .category-header{
    margin: auto;
  }
  .add-btn {
    float: right;
  }
  .category-list{
    display: flex;
    padding: 20px;
    width: 60%;
    margin: auto;
    .alert{
      height: 40px;
      margin: auto;
      text-align: center;
      padding: 10px;
    }
  }
  .add-category-box{
    width: 70%;
    margin: auto;
  }
}
</style>
