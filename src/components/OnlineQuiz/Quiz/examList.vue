<template>
  <div class="exam-list">
    <v-dialog
        v-model="dialogDelete"
        max-width="500px"
    >
      <v-card>
        <v-card-title class="headline">
          از حذف آزمون اطمینان دارید؟
        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              color="blue darken-1"
              text
              :disabled="examItem.loading"
              :loading="examItem.loading"
              @click="closeDelete"
          >
            خیر
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              :disabled="examItem.loading"
              :loading="examItem.loading"
              @click="deleteItemConfirm"
          >
            بله
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialogUpload"
        max-width="400px"
    >
      <v-sheet>
        <upload-answers :exam_id="selectedExam"/>
      </v-sheet>
    </v-dialog>
    <v-progress-linear
        color="#ffc107"
        absolute
        top
        :active="examList.loading"
        indeterminate
        rounded
        height="6"
    />
    <v-data-table
        :footer-props="{
        disableItemsPerPage: true,
        itemsPerPageText: 'تعداد ردیف در هر صفحه',
        pageText: 'صفحه ' + options.page + ' از ' + Math.ceil(totalRows / options.itemsPerPage)
      }"
        :headers="headers"
        :items="rows.list"
        :options.sync="options"
        :server-items-length="totalRows"
        class="elevation-1"
        disable-sort
    >
      <template v-slot:item.start="{ item }">
        {{ item.shamsiDate('start_at').dateTime }}
      </template>
      <template v-slot:item.end="{ item }">
        {{ item.shamsiDate('finish_at').dateTime }}
      </template>
      <template v-slot:item.delay_time="{ item }">
        {{ item.delay_time }} دقیقه
      </template>
      <template
          v-slot:item.options="{ item }"
          class="table-options"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="indigo"
                v-bind="attrs"
                v-on="on"
            >
              <v-menu
                  right
                  offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="mx-2"
                      fab
                      dark
                      x-small
                      color="purple"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="selectExam(item)"
                      >
                        ویرایش
                        <!--                    <v-icon dark>-->
                        <!--                      mdi-pencil-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="selectExamReport(item)"
                      >
                        ویرایش کارنامه
                        <!--                    <v-icon dark>-->
                        <!--                      mdi-pencil-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          exact
                          :to="{ name: 'onlineQuiz.exams.lessons', params: { quizId: item.id, quizTitle: item.title}}"
                      >
                        مشاهده تمام سوالات
                        <!--                    <v-icon-->
                        <!--                        small-->
                        <!--                    >-->
                        <!--                      mdi-arrow-up-bold-box-outline-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="generateJsonFile(item, false)"
                      >
                        ساخت فایل سوالات
                        <!--                    <v-icon-->
                        <!--                        small-->
                        <!--                    >-->
                        <!--                      mdi-beaker-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="generateJsonFile(item, true)"
                      >
                        ساخت فایل سوالات با جواب
                        <!--                    <v-icon-->
                        <!--                        small-->
                        <!--                    >-->
                        <!--                      mdi-beaker-check-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="openUploadDialog(item.id)"
                      >
                        آپلود فایل سوالات و جواب ها
                        <!--                    <v-icon-->
                        <!--                        small-->
                        <!--                    >-->
                        <!--                      mdi-cloud-upload-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          :to="{ name: 'coefficient.edit', params: { exam_id: item.id } }"
                      >
                        اصلاح ضرایب
                        <!--                    <v-icon-->
                        <!--                        small-->
                        <!--                    >-->
                        <!--                      mdi-pencil-->
                        <!--                    </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="deleteItem(item)"
                      >
                        حذف آزمون
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
          <span>ویرایش</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="indigo"
                :to="{ name: 'onlineQuiz.exams.lessons', params: { quizId: item.id, quizTitle: item.title}}"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon
                  small
              >
                mdi-book-open-page-variant
              </v-icon>
            </v-btn>
          </template>
          <span>مشاهده دروس</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="blue"
                v-bind="attrs"
                v-on="on"
            >
              <v-menu
                  right
                  offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="mx-2"
                      fab
                      dark
                      x-small
                      color="blue"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon small>
                      mdi-clipboard-list-outline
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                          @click="goToResult(item)"
                      >
                        نتایج تمام شرکت کنندگان
                        <!--                        <v-icon-->
                        <!--                            small-->
                        <!--                        >-->
                        <!--                          mdi-clipboard-list-outline-->
                        <!--                        </v-icon>-->
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-btn
                          class="mx-2"
                          depressed
                          :to="{ name: 'onlineQuiz.exams.lessons.lists', params: { quizId: item.id, quizTitle: item.title}}"
                          :ripple="{ class: 'yellow--text' }"
                          retain-focus-on-click
                          plain
                      >
                        کارنامه سرگروه
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
          <span>مشاهده نتایج </span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-btn
          elevation="2"
          @click="selectExam(null)"
      >
        ثبت آزمون جدید
      </v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Exam, ExamList} from "@/models/Exam";
import Toasted from 'vue-toasted';
import API_ADDRESS from "@/api/Addresses";

Vue.use(Toasted)
import Axios from "axios";
import UploadAnswers from "@/components/OnlineQuiz/Quiz/uploadAnswers";

export default {
  name: 'ExamList',
  components: {UploadAnswers},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    selectedExam: null,
    examList: new ExamList(),
    examItem: new Exam(),
    headers: [
      {text: 'عنوان', value: 'title'},
      {text: 'شروع', value: 'start'},
      {text: 'پایان', value: 'end'},
      {text: 'میزان تاخیر', value: 'delay_time'},
      {text: 'عملیات', value: 'options'}
    ],
    rows: [],
    options: {
      itemsPerPage: 15,
      page: 1
    },
    totalRows: 0,
    dialogUpload: false
  }),
  watch: {
    options: {
      handler() {
        this.getExams()
      }
    }
  },
  mounted() {
    // this.getExams()
  },
  methods: {
    goToResult(exam) {
      if (exam.type.value === 'psychometric') {
        this.$router.push({name: 'psychology.results', params: {examId: exam.id}})
        return
      }
      this.$router.push({name: 'exam.results', params: {examId: exam.id}})
    },
    openUploadDialog(exam_id) {
      this.dialogUpload = true
      this.selectedExam = exam_id
    },
    generateJsonFile(exam, withAnswer) {
      this.examList.loading = true
      const that = this
      Axios.post(API_ADDRESS.exam.generateExamFile(exam.id, withAnswer))
          .then(() => {
            that.$notify({
              group: 'notifs',
              text: 'ساخت فایل ' + exam.title + ' با موفقیت انجام شد',
              type: 'success',
              duration: -1
            })
            this.examList.loading = false
          })
          .catch(() => {
            this.examList.loading = false
          })
    },
    deleteItem(examItem) {
      this.examItem = examItem
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.$emit('delete-exam', this.examItem)
      this.closeDelete()
    },
    save() {
      this.close()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    getExams() {
      this.examList.loading = true
      this.examList.fetch(null, API_ADDRESS.exam.base(this.options.page))
          .then((response) => {
            this.examList.loading = false
            this.totalRows = response.data.meta.total
            this.rows = new ExamList(response.data.data, {meta: response.data.meta, links: response.data.links})
            this.examList = new ExamList(response.data.data, {meta: response.data.meta, links: response.data.links})
          })
          .catch(() => {
            this.examList.loading = false
            this.examList = new ExamList()
          })
    },
    selectExam(item) {
      this.$emit('update-exam-id', item)
    },
    selectExamReport(item) {
      this.$emit('update-exam-report-id', item)
    }
  }
}
</script>

<style lang="scss">
.exam-list {
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child {
    display: flex !important;
    align-items: center !important;
  }
}

</style>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  display: flex;
  flex-direction: column;
}

.v-list-item {
  min-height: 0 !important;
}

.v-list-item__title .v-btn:not(.v-btn--round).v-size--default {
  margin: 10px 0 !important;
  width: 100% !important;
}

.v-list-item .v-list-item__title {
  width: 100% !important;
}
</style>
