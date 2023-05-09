<template>
  <entity-create
    v-model:value="inputs"
    title="ساخت آزمون"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  >
    <!--    <form-builder-separator/>-->
    <!--    <template #after-form-builder >-->
    <!--      <q-card class="category-card">-->
    <!--        <q-card-section>-->
    <!--          <h6 class="category-header q-ma-md">لیست دفترچه ها</h6>-->
    <!--        </q-card-section>-->
    <!--        <q-separator/>-->
    <!--        <q-card-section class="flex">-->
    <!--          <div class="row bg-grey-3 add-category-box">-->
    <!--            <q-select-->
    <!--              class="q-pa-md col-md-4"-->
    <!--              v-model="category"-->
    <!--              :value="category"-->
    <!--              label="دفترچه"-->
    <!--              :options="categoryOptions"-->
    <!--              option-value="categoryOptions"-->
    <!--              option-label="title"-->
    <!--              emit-value-->
    <!--              map-options-->
    <!--              :disable="totalCategory"-->
    <!--            />-->
    <!--            <q-input-->
    <!--              class="q-pa-md col-md-3"-->
    <!--              v-model="category.order"-->
    <!--              label="ترتیب"-->
    <!--              :disable="totalCategory"-->
    <!--            />-->
    <!--            <q-input-->
    <!--              class="q-pa-md col-md-3"-->
    <!--              v-model="category.time"-->
    <!--              label="زمان"-->
    <!--              :disable="totalCategory"-->
    <!--            />-->
    <!--            <div class="q-pa-md col-md-2 flex">-->
    <!--              <q-btn-->
    <!--                class="q-ma-md"-->
    <!--                icon="add"-->
    <!--                color="green"-->
    <!--                flat-->
    <!--                dense-->
    <!--                fab-mini-->
    <!--                :disable="totalCategory"-->
    <!--                @click="addCategory"-->
    <!--              />-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </q-card-section>-->
    <!--        <q-card-section>-->
    <!--          <div-->
    <!--            class="category-list"-->
    <!--            v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length === 0">-->
    <!--            <p class="bg-red-2 alert">در حال حاضر دفترچه ای به آزمون اضافه نشده است !</p>-->
    <!--          </div>-->
    <!--          <div-->
    <!--            v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length > 0"-->
    <!--            class="row category-list-row"-->
    <!--          >-->
    <!--            <div-->
    <!--              v-for="(category , index) in inputs[examCategoriesIndex].value"-->
    <!--              :key="index"-->
    <!--              class="row col-md-12"-->
    <!--            >-->
    <!--              <q-select-->
    <!--                class="q-pa-md col-md-4"-->
    <!--                v-model="category.title"-->
    <!--                :value="category.id"-->
    <!--                label="دفترچه"-->
    <!--                :options="categoryOptions"-->
    <!--                option-value="categoryOptions"-->
    <!--                option-label="title"-->
    <!--                emit-value-->
    <!--                map-options-->
    <!--              />-->
    <!--              <q-input-->
    <!--                class="q-pa-md col-md-3"-->
    <!--                v-model="category.order"-->
    <!--                label="ترتیب"-->
    <!--              />-->
    <!--              <q-input-->
    <!--                class="q-pa-md col-md-3"-->
    <!--                v-model="category.time"-->
    <!--                label="زمان"-->
    <!--              />-->
    <!--              <div class="q-pa-md col-md-2 flex">-->
    <!--                <q-btn-->
    <!--                  class="q-ma-md"-->
    <!--                  icon="close"-->
    <!--                  color="red"-->
    <!--                  flat-->
    <!--                  dense-->
    <!--                  fab-mini-->
    <!--                  @click="deleteCategory(category.id)"-->
    <!--                />-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </q-card-section>-->
    <!--      </q-card>-->

    <!--    </template>-->
  </entity-create>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: { EntityCreate },
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
          type: 'formBuilder',
          col: 'col-md-4',
          value: [
            { type: 'file', name: 'photo', label: 'پیش نمایش تصویر', col: 'col-md-6', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          col: 'col-md-8',
          value: [
            { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-12', placeholder: ' ', filled: true, readonly: true },
            { type: 'dateTime', name: 'start_at', label: 'زمان شروع', calendarIcon: ' ', col: 'col-md-6', placeholder: 'زمان شروع' },
            { type: 'dateTime', name: 'finish_at', label: 'زمان پایان', calendarIcon: ' ', col: 'col-md-6', placeholder: 'زمان پایان' }
          ]
        },
        {
          type: 'Select',
          name: 'type_id',
          label: ' انتخاب نوع آزمون',
          col: 'col-md-3',
          options: [],
          optionValue: 'id',
          optionLabel: 'value',
          placeholder: ' ',
          filled: true
        },
        { type: 'input', name: 'delay_time', value: 0, label: 'زمان تاخیر(دقیقه)', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'Checkbox', name: 'enable', value: false, label: 'فعال', col: 'col-md-3' },
        { type: 'Checkbox', name: 'is_free', value: false, label: 'رایگان', col: 'col-md-3' },
        { type: 'Checkbox', name: 'is_register_open', value: false, label: 'ثبت نام باز است.', col: 'col-md-3' },
        { type: 'Checkbox', name: 'is_open', value: false, label: 'شرکت در آزمون باز است.', col: 'col-md-3' },
        { type: 'Checkbox', name: 'confirm', value: false, label: 'تولید خودکار کارنامه', col: 'col-md-3' },
        { type: 'Checkbox', name: 'generate_questions_automatically', value: false, label: 'تولید خودکار سوال', col: 'col-md-3' },
        { type: 'hidden', name: 'categories', value: [] }
      ],
      categoryOptions: [
        { title: 'دفترچه سؤالات عمومی', id: '60b7858d743940688b23c7f3' },
        { title: 'دفترچه سؤالات اختصاصی', id: '60b7858d743940688b23c7f4' }
      ],
      typeOptions: [],
      category: { title: '', id: '', order: 0, time: 0 }
    }
  },
  created () {
    this.getType()
    this.getCategories()
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
    getCategories() {
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          this.categoryOptions = response.data.data
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
      if (this.category.title.id) {
        this.category.id = this.category.title.id
        this.category.title = this.category.title.title
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
