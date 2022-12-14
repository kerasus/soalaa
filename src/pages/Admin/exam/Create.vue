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
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: ' نوع آزمون',
          col: 'col-md-6',
          options: [],
          optionValue: 'id',
          optionLabel: 'value'
        },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6', placeholder: ' ', filled: true },
        { type: 'dateTime', name: 'start_at', responseKey: 'data.start_at', label: '', col: 'col-md-4', placeholder: 'زمان شروع آزمون' },
        { type: 'dateTime', name: 'finish_at', responseKey: 'data.finish_at', label: '', col: 'col-md-4', placeholder: 'زمان پایان آزمون' },
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
      const a = { type_id: '6225f4828044517f52500c02', title: 'دسته سوالات تگ خراب (ElementWithWrongTag)', start_at: '2022-12-07 14:15:00', finish_at: '2022-12-21 18:00:00', delay_time: '48', enable: false, is_free: false, is_register_open: false, is_open: false, confirm: false, generate_questions_automatically: false }
      for (const property in a) {
        const index = this.inputs.findIndex(obj => obj.name === `${property}`)
        this.inputs[index].value = a[property]
      }

      const b = [
        {
          id: '63998c292fd9a747500f81d7',
          title: 'دسته سوالات تگ خراب (ElementWithWrongTag)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-12-10 17:27:22',
          created_at: '2022-12-10 17:27:22',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false,
          categories: [],
          sub_categories: []
        },
        {
          id: '63998c042fd9a747500f81b5',
          title: 'دسته سوالاتی که آپدیت آن ناموفق بوده است (allFailedUpdateQuestions)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-12-03 18:36:44',
          created_at: '2022-12-03 18:36:44',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998bea8b517e5c5104d340',
          title: 'دسته سوالات با مشکلات خراب بودن کسینوس (ElementsWithWrongCosine)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-12-03 10:24:49',
          created_at: '2022-12-03 10:24:49',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998bd18b517e5c5104d32a',
          title: 'دسته سوالات دارای علامت زاویه ی خراب(ElementsWithWidehatTag)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:50:28',
          created_at: '2022-11-30 14:50:28',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998bb78b517e5c5104d307',
          title: 'دسته سوالات دارای curley bracket - ضوابط و مجموعه ها و..- (ElementWithCurlyBrackets)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:49:21',
          created_at: '2022-11-30 14:49:13',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998b92b0ab2ad22604e48e',
          title: 'دسته سوالات با مشکلات خراب بودن سینوس (ElementsWithWrongSinus)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:47:06',
          created_at: '2022-11-30 14:47:06',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998b71b0ab2ad22604e46d',
          title: 'دسته سوالات ترکیب خراب (ElementsWithWrongCombination)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:46:04',
          created_at: '2022-11-30 14:46:04',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998b330c5f8d0b980c99bc',
          title: 'دسته سوالات دارای توان به همراه پریم (ElementsWithPrimeAndPower)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:45:22',
          created_at: '2022-11-30 14:45:22',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998b07c8eea92242077262',
          title: 'دسته 3 سوالات با احتمال پریدن متن به دلیل علامت نامساوی (PossibilityOfTextLossForInequalitySigns)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:44:47',
          created_at: '2022-11-30 14:44:47',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998abcc8eea92242077213',
          title: 'دسته 2 سوالات با احتمال پریدن متن فارسی با علامت \\ (ElementWithPossibleLossOfPersianWordsBackslashSymbol)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:44:08',
          created_at: '2022-11-30 14:44:08',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998aa1a3fb042c6f0b39f3',
          title: 'دسته سوالات دارای آکولاد زیر فرمول (ElementWithUnderBraces)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:43:18',
          created_at: '2022-11-30 14:43:18',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998a8aa3fb042c6f0b39bb',
          title: 'دسته سوالات پریده با علامت های فرمول (ElementWithTheOverlineTag)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:42:39',
          created_at: '2022-11-30 14:42:39',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998a69a3fb042c6f0b3960',
          title: 'دسته سوالات کد شده با تگ خاص (ElementWithHtmlStyleTag)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:41:44',
          created_at: '2022-11-30 14:41:43',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998a45a3fb042c6f0b3933',
          title: 'دسته سوالات با احتمال پریدن متن فارسی ۱ (ElementWithPossibleLossOfPersianWordsCaretSymbol)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:39:25',
          created_at: '2022-11-30 14:38:37',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998a2ca3fb042c6f0b3924',
          title: 'دسته سوالات دارای علامت نامساوی (NotCoddedInequalitySigns)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:37:57',
          created_at: '2022-11-30 14:37:57',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998a01a3fb042c6f0b3913',
          title: 'دسته 5 سوالات کد شده (UnclosedFormulaBracket)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:36:50',
          created_at: '2022-11-30 14:36:50',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '6399899993de5da8d50ecdb6',
          title: 'دسته 4 سوالات کد شده (OddNumberOfDollarSigns)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:36:28',
          created_at: '2022-11-30 14:36:04',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '6399897793de5da8d50ecdab',
          title: 'دسته 3 سوالات کد شده (DataKatexElInTwoDollarSigns)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:35:47',
          created_at: '2022-11-30 14:35:47',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '6399895893de5da8d50ecd90',
          title: 'دسته 2 سوالات کد شده (ParagraphWithTwoDollarSigns)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:34:56',
          created_at: '2022-11-30 14:34:56',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        },
        {
          id: '63998911875ae1a1bc0c157d',
          title: 'دسته 1 سوالات کد شده (EmptyFormulaElements)',
          holding_status: null,
          start_at: '2022-12-07 14:15:00',
          finish_at: '2022-12-07 14:15:00',
          photo: null,
          delay_time: 48,
          n_questions: 0,
          enable: false,
          updated_at: '2022-11-30 14:14:59',
          created_at: '2022-11-30 14:14:59',
          generate_questions_automatically: false,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6225f4828044517f52500c02',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2022-03-07 15:33:14',
            created_at: '2022-03-07 15:33:14'
          },
          user_exam_id: null,
          is_free: false,
          is_register_open: false,
          is_open: false
        }
      ]
      console.log('b', b)
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
