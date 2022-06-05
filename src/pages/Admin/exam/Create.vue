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
              v-model="category"
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
        <q-card-section>
          <div
            class="category-list"
            v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length === 0">
            <p class="bg-red-2 alert">در حال حاضر دفترچه ای به آزمون اضافه نشده است !</p>
          </div>
          <div
            v-if="inputs[examCategoriesIndex] && inputs[examCategoriesIndex].value.length > 0"
            class="row category-list-row"
          >
            <div
              v-for="(category , index) in inputs[examCategoriesIndex].value"
              :key="index"
              class="row col-md-12"
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
  </entity-create>
  <div class="btn-box flex justify-end items-center">
    <q-btn
      unelevated
      class="q-mr-xl btn-md"
      :icon="'isax:arrow-right-3'"
      style="margin-right: 18px;"
    >
      بازگشت
    </q-btn>
    <q-btn
      unelevated
      color="primary"
      class="q-mr-xl btn-md"
      style="margin-right: 18px;"
      :icon-right="'isax:arrow-left-2'"
      @click="saveExam"
    >
      مرحله بعد
    </q-btn>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: { EntityCreate },
  emits: [
    'btnClicked'
  ],
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
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: ' نوع آزمون',
          col: 'col-md-6',
          options: [],
          optionValue: 'id',
          optionLabel: 'value'
        },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' },
        { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: ' زمان شروع آزمون', col: 'col-md-4' },
        { type: 'dateTime', name: 'finish_at', responseKey: 'data.finish_at', label: ' زمان پایان آزمون', col: 'col-md-4' },
        { type: 'input', name: 'delay_time', responseKey: 'data.delay_time', label: 'زمان تاخیر(دقیقه)', col: 'col-md-4', value: 0 },
        { type: 'Checkbox', name: 'enable', responseKey: 'data.enable', label: 'فعال', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_free', responseKey: 'data.is_free', label: 'رایگان', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_register_open', responseKey: 'data.is_register_open', label: 'ثبت نام باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'is_open', responseKey: 'data.is_open', label: 'شرکت در آزمون باز است.', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'confirm', responseKey: 'data.confirm', label: 'تولید خودکار کارنامه', col: 'col-md-4', value: false },
        { type: 'Checkbox', name: 'generate_questions_automatically', responseKey: 'data.generate_questions_automatically', label: 'تولید خودکار سوال', col: 'col-md-4', value: false },
        { type: 'hidden', name: 'categories', responseKey: 'data.categories', value: [] },
        { type: 'hidden', name: 'photo', responseKey: 'data.photo', value: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719' }
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
    },
    saveExam () {
      this.$emit('btnClicked', 'BankTestComponent1')
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
.btn-box {
  margin-bottom: 30px;
}
</style>
