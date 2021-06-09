<template>
  <v-container
    :fluid="true"
    dir="rtl"
  >
    <v-row>
      <v-col md="12">
        <v-data-table
          :headers="selectedQuizzesHeaders"
          :items="selectedQuizzes"
          item-key="subId"
          :loading="attachLoading"
          loading-text="کمی صبر کنید..."
          dense
          sort-by="title"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>آزمون های تخصیص داده شده</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    آزمون جدید
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">تخصیص سوال به آزمون</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="attachExamID"
                            :items="totalExamsFiltered"
                            label="آزمون"
                            item-text="title"
                            item-value="id"
                            dense
                            outlined
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="attachSubcategoryID"
                            :items="subCategoriesList.list"
                            label="درسدرس"
                            item-text="display_title"
                            item-value="id"
                            dense
                            outlined
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="attachOrder"
                            dense
                            label="ترتیب"
                            type="number"
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      انصراف
                    </v-btn>
                    <v-btn
                      dark
                      color="green"
                      @click="attachQuestion"
                    >
                      افزودن
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogDelete"
                max-width="500px"
              >
                <v-card>
                  <v-card-title class="headline">
                    از حذف سوال از این آزمون اطمینان دارید؟
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                    >
                      خیر
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      بله
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              color="pink"
              @click="detachQuestion(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <v-btn
          color="light-green"
          dark
          block
          @click="submitQuestion"
        >
          ثبت سوال
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-if="false"
      v-model="editDialog"
      max-width="1600px"
    >
      <v-sheet class="pa-5">
        <v-row>
          <v-col
            v-show="false"
            :md="3"
            class="d-flex justify-center"
          >
            <v-text-field
              v-model="currentQuestion.recommendedTime"
              suffix="ثانیه"
              prepend-icon="mdi-timer-outline"
              outlined
              label="زمان پیشنهادی"
              :style="{ maxWidth: '170px' }"
              dense
              class="recommended-time"
              type="number"
            />
          </v-col>
          <v-col
            v-show="false"
            :md="3"
          >
            <v-btn-toggle
              v-model="currentQuestion.difficulty"
              dense
            >
              <v-btn
                v-for="item in difficulties"
                :key="item.id"
                :value="item.id"
                dense
              >
                {{ item.title }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col
            v-if="editMode"
            :md="12"
          >
            <v-btn
              dark
              color="blue"
              block
            >
              ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-dialog>
    <v-form>
      <v-sheet color="#f4f4f4">
        <v-row>
          <v-col
            v-if="false"
            :md="12"
            class="main-info-container"
          >
            <v-row class="justify-center">
              <v-col
                :md="4"
                class="d-flex flex-row flex-wrap justify-space-between"
              >
                <div
                  v-show="false"
                  class="question-info"
                >
                  زمان پیشنهادی: {{ currentQuestion.recommendedTime }} ثانیه
                </div>
                <div
                  v-show="false"
                  class="question-info"
                >
                  طراح: {{ getQuestionCreator }}
                </div>
                <div
                  v-show="false"
                  class="question-info"
                >
                  سختی: {{ getCurrentDifficultyTitle }}
                </div>
              </v-col>
              <v-col
                :md="3"
                class="d-flex flex-column align-center"
              >
                <div
                  v-for="(item, index) in selectedQuizzes"
                  :key="index"
                  class="order-show"
                >
                  <p>
                    ترتیب در {{ item.title }}:
                  </p>
                  <p :style="{ 'margin-left': '40px' }">
                    {{ item.order }}
                  </p>
                </div>
              </v-col>
              <v-col :md="1">
                <v-btn
                  color="grey"
                  block
                  :style="{ height: '100%' }"
                  @click="editDialog = !editDialog"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col :md="12">
            متن سوال:
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="renderedPanel"
              v-html="questRendered"
            />
            <!--eslint-enable-->
          </v-col>
        </v-row>
      </v-sheet>
      <v-radio-group v-model="trueChoiceIndex">
        <v-row>
          <v-col
            v-for="index in 4"
            :key="index"
            md="6"
            :style="{ 'display': 'flex' }"
          >
            <!--                    <v-col class="pl-5" :md="5">-->
            <!--                            <v-textarea v-if="typeof currentQuestion.choices.list[index - 1] !== 'undefined'"-->
            <!--                                        dir="rtl"-->
            <!--                                        clearable-->
            <!--                                        clear-icon="mdi-close-circle"-->
            <!--                                        auto-grow-->
            <!--                                        :label="choiceNumber[index -1]"-->
            <!--                                        v-model="currentQuestion.choices.list[index - 1].title"-->
            <!--                                        @input="updateRendered"-->
            <!--                            ></v-textarea>-->
            <!--                    </v-col>-->
            <!--                    <v-col :md="2">-->
            <!--                        <v-radio :value="index - 1" />-->
            <!--                        <markdown-btn :elem="currentQuestion.choices.list[index - 1]" :elem-key="'title'" :rendered-matrix-katex="renderedMatrixKatex" :url="url" @add="markdownBtnAddString" />-->

            <!--                    </v-col>-->
            <v-radio
              :value="index - 1"
              on-icon="mdi-check-circle-outline"
              off-icon="mdi-checkbox-blank-circle-outline"
              color="green"
            />
            {{ index }})
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="renderedPanel"
              v-html="choiceRendered[index - 1]"
            />
            <!--eslint-enable-->
          </v-col>
        </v-row>
      </v-radio-group>
      <!--            <v-row>-->
      <!--                <v-col>-->
      <!--                    <v-textarea v-model="currentQuestion.answer" outlined label="جواب تشریحی" />-->
      <!--                </v-col>-->
      <!--            </v-row>-->
    </v-form>
    <hr>
    <div class="d-flex justify-space-around mb-5 mt-5">
      <v-btn-toggle v-model="selectedField">
        <v-btn :value="0">
          متن سوال
        </v-btn>

        <v-btn :value="1">
          گزینه 1
        </v-btn>

        <v-btn :value="2">
          گزینه 2
        </v-btn>

        <v-btn :value="3">
          گزینه 3
        </v-btn>

        <v-btn :value="4">
          گزینه 4
        </v-btn>
      </v-btn-toggle>
      <markdown-btn
        v-if="selectedField === 0"
        :elem="currentQuestion"
        :elem-key="'statement'"
        :rendered-matrix-katex="renderedMatrixKatex"
        :rendered-table-katex="renderedTableKatex"
        :url="url"
        @add="markdownBtnAddString"
      />
      <markdown-btn
        v-else
        :elem="currentQuestion.choices.list[selectedField - 1]"
        :elem-key="'title'"
        :rendered-matrix-katex="renderedMatrixKatex"
        :rendered-table-katex="renderedTableKatex"
        :url="url"
        @add="markdownBtnAddString"
      />
    </div>
    <v-textarea
      v-if="selectedField === 0"
      v-model="currentQuestion.statement"
      outlined
      dir="rtl"
      clearable
      clear-icon="mdi-close-circle"
      auto-grow
      :label="'متن'"
      @input="updateRendered"
    />
    <v-textarea
      v-else
      v-model="currentQuestion.choices.list[selectedField - 1].title"
      outlined
      dir="rtl"
      clearable
      clear-icon="mdi-close-circle"
      auto-grow
      :label="'متن'"
      @input="updateRendered"
    />
    <div v-if="currentQuestion.id">
<!--                  <upload-image :url="'/api/v1/question/upload/'+currentQuestion.id" />-->
      <upload-files
        :post-action="'/api/v1/question/upload/'+currentQuestion.id"
        :put-action="'/api/v1/question/upload/'+currentQuestion.id"
      />
    </div>
    <div
      id="mathfield"
      dir="ltr"
      locale="fa"
    >
      x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="latexData"
      dir="ltr"
      v-html="latexData"
    />
    <!--eslint-enable-->
    <v-text-field
      v-model="url"
      full-width
      label="url"
      dir="ltr"
    />
    <v-row>
      <v-col>
        <v-sheet width="500px">
          <v-container :fluid="true">
            <v-row>
              <v-col :md="2">
                <v-text-field
                  v-model="matrixWidth"
                  label="عرض"
                  outlined
                  dense
                  type="number"
                  @input="initMatrix"
                />
              </v-col>
              <v-col :md="2">
                <v-text-field
                  v-model="matrixHeight"
                  label="ارتفاع"
                  outlined
                  dense
                  type="number"
                  @input="initMatrix"
                />
              </v-col>
              <v-col :md="4">
                <v-select
                  v-model="determinan"
                  outlined
                  :items="matrixMenu"
                  item-text="title"
                  item-value="value"
                  dense
                />
              </v-col>
            </v-row>
            <div dir="ltr">
              <v-row
                v-for="indexY in parseInt(matrixTempHeight)"
                :key="indexY"
              >
                <v-col
                  v-for="indexX in parseInt(matrixTempWidth)"
                  :key="indexX"
                >
                  <v-text-field
                    v-model="matrix[indexY - 1][indexX - 1]"
                    outlined
                    :label="'(' + indexX + ', ' + indexX + ')'"
                    dense
                  />
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet
          width="500px"
          color="#e1e1e1"
        >
          <v-container :fluid="true">
            <v-row>
              <v-col :md="2">
                <v-text-field
                  v-model="tableWidth"
                  label="عرض"
                  outlined
                  dense
                  type="number"
                  @input="initTable"
                />
              </v-col>
              <v-col :md="2">
                <v-text-field
                  v-model="tableHeight"
                  label="ارتفاع"
                  outlined
                  dense
                  type="number"
                  @input="initTable"
                />
              </v-col>
              <v-col :md="5">
                <!--                                <v-select outlined :items="tableMenu" item-text="title" item-value="value" v-model="tableHeader" dense />-->
              </v-col>
            </v-row>
            <div dir="ltr">
              <v-row
                v-for="indexY in parseInt(tableTempHeight)"
                :key="indexY"
              >
                <v-col
                  v-for="indexX in parseInt(tableTempWidth)"
                  :key="indexX"
                >
                  <v-text-field
                    v-model="table[indexY - 1][indexX - 1]"
                    outlined
                    :label="'(' + indexX + ', ' + indexX + ')'"
                    dense
                  />
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet color="#fff">
          <v-row>
            <v-col :md="3">
              <v-text-field
                v-model="resizerUrl"
                label="آدرس عکس"
                outlined
                dense
                @input="setWidth"
              />
              <v-slider
                v-if="resizerImgSize"
                v-model="resizerImgFinalWidth"
                class="mt-5"
                label="سایز عکس"
                thumb-color="red"
                thumb-label="always"
                inverse-label
              />
              <v-btn
                icon
                @click="copyResizedImgUrl"
              >
                <v-icon>
                  mdi-content-copy
                </v-icon>
              </v-btn>
            </v-col>
            <v-col :md="9">
              <img
                v-if="resizerUrl !== ''"
                ref="resizerimg"
                :src="resizerUrl"
                :width="resizerImgFinalWidth ? resizerImgSize / 100 * resizerImgFinalWidth : 'auto'"
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import { Question } from '@/models/Question'
    import {ExamList} from '@/models/Exam'
    import {QuestSubcategoryList} from '@/models/QuestSubcategory';
    import Vue from 'vue'
    import axios from 'axios'
    import MarkdownBtn from '@/components/QuizEditor/MarkdownBtn';
    import UploadFiles from '@/components/UploadFiles';
    // import UploadImage from '@/components/UploadImage';
    import API_ADDRESS from '@/api/Addresses'
    import {mixinMarkdownAndKatex} from "@/mixin/Mixins"
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'
    import MathLive from 'mathlive'
    import Assistant from "@/plugins/assistant";
    import TurndownService from "turndown/lib/turndown.browser.umd";
    // import Assistant from "@/plugins/assistant";

    export default {
        name: 'CreateOrEdit',
        components: {MarkdownBtn, UploadFiles},
        mixins: [mixinMarkdownAndKatex],
        data: () => {
            return {
                dialog: false,
                dialogDelete: false,
                selectedQuizzesHeaders: [
                    {
                        text: 'آزمون',
                        align: 'start',
                        sortable: false,
                        value: 'title',
                    },
                    {
                        text: 'درس',
                        align: 'start',
                        sortable: false,
                        value: 'sub_category_title',
                    },
                    {
                        text: 'ترتیب',
                        align: 'start',
                        sortable: false,
                        value: 'order',
                    },
                    { text: '', value: 'actions', sortable: false }
                ],
                attachLoading: false,
                attachExamID: null,
                attachOrder: null,
                attachSubcategoryID: null,
                resizerImgFinalWidth: 0,
                resizerImgSize: 0,
                resizerImgHSize: 0,
                resizerUrl: '',
                editDialog: false,
                teachers: [
                    { name: 'ممد', id: 1 },
                    { name: 'اصغر', id: 2 }
                ],
                difficulties: [
                    {
                        id: 1,
                        title: 'ساده'
                    },
                    {
                        id: 2,
                        title: 'متوسط'
                    },
                    {
                        id: 3,
                        title: 'دشوار'
                    },
                ],
                selectedField: 0,
                whiteSpace: '                   ',
                test: [true, false, false, false],
                questMarkdownText: '# Math Rulez! \n  $x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
                choicesMarkdownText: ['', '', '', ''],
                questRendered: '',
                formula: '',
                choiceRendered: ['', '', '', ''],
                latexData: null,
                choiceNumber: {
                    0: '1 ',
                    1: '2 ',
                    2: '3 ',
                    3: '4 '
                },
                trueChoiceIndex: 0,
                fieldId: [0],
                questionData: {
                    statement: '',
                    category_id: '',
                    sub_category_id: 1,
                    order: [],
                    choices: [
                        {
                            title: '',
                            order: 1,
                            answer: false
                        },
                        {
                            title: '',
                            order: 2,
                            answer: false
                        },
                        {
                            title: '',
                            order: 3,
                            answer: false
                        },
                        {
                            title: '',
                            order: 4,
                            answer: false
                        }
                    ]
                },
                currentQuestion: new Question(),
                url: '',
                editMode: false,
                examList: new ExamList(),
                totalExams: [],
                subCategoriesList: new QuestSubcategoryList(),
                selectedQuizzes: [],
                matrixWidth: 1,
                matrixHeight: 1,
                matrixTempWidth: 1,
                matrixTempHeight: 1,
                matrix: [[]],
                tableWidth: 1,
                tableHeight: 1,
                tableTempWidth: 1,
                tableTempHeight: 1,
                table: [[]],
                determinan: false,
                matrixMenu: [{ title: 'دترمینان', value: true}, { title: 'ماتریس', value: false }],
                tableHeader: true,
                tableMenu: [{ title: 'جدول با هدر', value: true}, { title: 'جدول ساده', value: false }]
            }
        },
        computed: {
            totalExamsFiltered () {
                let filtered = this.totalExams
                for (let i = 0; i < this.selectedQuizzes.length; i++) {
                    filtered = filtered.filter(item => item.id !== this.selectedQuizzes[i].id)
                }
                return filtered
            },
            renderedTableKatex () {
                return this.renderTableKatex()
            },
            renderedMatrixKatex () {
                return this.renderMatrixKatex()
            },
            getSelectedQuizzez () {
                const arr = []
                for (let i = 0; i < this.selectedQuizzes.length; i++) {
                    arr.push(this.getQuizById(this.selectedQuizzes[i]))
                }
                return arr
            },
            getCurrentDifficultyTitle () {
                return this.difficulties.find(item => item.id === this.currentQuestion.difficulty).title
            },
            getQuestionCreator () {
                return this.teachers.find(item => item.id === this.currentQuestion.creator).name
            }
        },
        created() {
            this.setEditModeState()
          const loanExamListPromise = this.loanExamList()
          const loadSubcategoriesPromise = this.loadSubcategories()

            if (this.editMode) {
              Promise.all([loanExamListPromise, loadSubcategoriesPromise])
            .then(() => {
                this.loadnCurrentQuestionData()
              })
            } else {
                this.currentQuestion = new Question(this.questionData)
            }
        },
        mounted() {
            // this.rendered = this.markdown.render();
            // this.updateRendered();

            let that = this
            const mf = MathLive.makeMathField(
                document.getElementById('mathfield'),
                {
                    virtualKeyboardMode: 'manual',
                    onContentDidChange: (mf) => {
                        that.latexData = mf.getValue()
                    },
                });
            // mf.$setConfig(
            //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
            // );
            that.latexData = mf.getValue()

        },
        methods: {

          updateSelectedQuizzes () {
            let selectedQuizzes = JSON.parse(JSON.stringify(this.selectedQuizzes))
            selectedQuizzes.forEach((item, i) => {
              selectedQuizzes[i].subId = i + 1;
            })

            this.selectedQuizzes = selectedQuizzes
          },
            getExamById (quizId) {
                return this.totalExams.find(item => item.id == quizId);
            },
            deleteItem (item) {
                console.log('item', item)
                this.editedIndex = this.selectedQuizzes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm () {
                this.selectedQuizzes.splice(this.editedIndex, 1)
                this.closeDelete()
              this.updateSelectedQuizzes()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    // this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    // this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            attachQuestionOnEditMode () {
                this.attachLoading = true
                axios.post(API_ADDRESS.question.attach, {
                    order: this.attachOrder,
                    exam_id: this.attachExamID,
                    question_id: this.$route.params.id,
                    sub_category_id: this.attachSubcategoryID
                })
                    .then( response => {
                        this.updateAttachList(response.data.data.exams)
                        console.log('response', response)
                        this.attachLoading = false
                        this.dialog = false
                    })
                    .catch( () => {
                        this.attachLoading = false
                        this.dialog = false
                    })
            },
            attachQuestionOnCreateMode () {
                const targetExamIndex = this.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(this.attachExamID))
                const targetSubCategoryIndex = this.subCategoriesList.list.findIndex(subCategoryItem => Assistant.getId(subCategoryItem.id) === Assistant.getId(this.attachSubcategoryID))
                this.totalExams[targetExamIndex].order = this.attachOrder
                this.totalExams[targetExamIndex].sub_category_id = this.attachSubcategoryID
                this.totalExams[targetExamIndex].sub_category_title = this.subCategoriesList.list[targetSubCategoryIndex].display_title
                this.selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))
                this.dialog = false
              this.updateSelectedQuizzes()
            },
            attachQuestion () {
                if (this.editMode) {
                    this.attachQuestionOnEditMode()
                } else {
                    this.attachQuestionOnCreateMode()
                }
            },
            detachQuestionOnEditMode(item) {
                this.attachLoading = true
                axios.post(API_ADDRESS.question.detach(this.$route.params.id), {
                  detaches: [{
                    exam_id: item.id,
                    order: item.order,
                    sub_category_id: item.sub_category_id
                  }]
                })
                    .then((response) => {
                        console.log('response', response)
                        this.selectedQuizzes = []
                        response.data.data.exams.forEach(item => {
                            this.selectedQuizzes.push({
                                id: item.exam_id,
                                order: item.order,
                                sub_category_id: item.sub_category.category_id,
                                sub_category_title: item.sub_category.display_title,
                                title: this.getExamById(item.exam_id).title
                            })
                        })
                      this.updateSelectedQuizzes()
                        // this.currentQuestion = new Question(responseData)
                        // this.trueChoiceIndex = this.currentQuestion.choices.list.findIndex((item) => item.answer )
                        // this.updateAttachList(response.data.data)
                        this.attachLoading = false
                        this.dialog = false
                    })
                    .catch( () => {
                        this.attachLoading = false
                        this.dialog = false
                    })
            },
            detachQuestionOnCreateMode(item) {
                const detachedExamIndex = this.selectedQuizzes.indexOf(item)
                this.selectedQuizzes.splice(detachedExamIndex, 1)
                this.dialog = false
              this.updateSelectedQuizzes()
            },
            detachQuestion(item) {
                let that = this
                this.$store.commit('AppLayout/showConfirmDialog', {
                    message: 'از حذف سوال از آزمون اطمینان دارید؟',
                    button: {
                        no: 'خیر',
                        yes: 'بله'
                    },
                    callback: (confirm) => {
                        if (!confirm) {
                            return
                        }
                        if (that.editMode) {
                            that.detachQuestionOnEditMode(item)
                        } else {
                            that.detachQuestionOnCreateMode(item)
                        }
                    }
                })
            },
            setEditModeState () {
                this.editMode = this.$route.name === 'quest.edit'
            },
            loanExamList () {
              let that = this
              return new Promise(function(resolve, reject) {
                new ExamList().fetch()
                        .then((response) => {
                          that.examList = new ExamList(response.data.data)
                          that.totalExams = []
                          that.examList.list.forEach(item => {
                            that.totalExams.push({
                              order: 0,
                              sub_category_id: null,
                              sub_category_title: '',
                              title: item.title,
                              id: item.id
                            })
                          })
                          resolve()
                        })
                .catch( () => {
                  reject()
                })
              })
            },
            loadSubcategories () {
              let that = this
              return new Promise(function(resolve, reject) {
                that.subCategoriesList.fetch()
                    .then((response) => {
                        that.subCategoriesList = new QuestSubcategoryList(response.data)
                      resolve()
                    })
                    .catch( () => {
                      reject()
                    })
              })
            },
            copyResizedImgUrl () {
                let size = '?'
                size += 'w=' + Math.floor(this.resizerImgSize * (this.resizerImgFinalWidth / 100))
                size += '&h=' + Math.floor(this.resizerImgHSize * (this.resizerImgFinalWidth / 100))
                this.copyToClipboard('![](' + this.resizerUrl + size + ')')
            },
            setWidth () {
                this.resizerImgFinalWidth = 0
                let resizedWidth = 0
                if (this.resizerUrl.indexOf('?w=') !== -1) {
                    resizedWidth = parseInt(this.resizerUrl.slice(this.resizerUrl.indexOf('?w=') + 3, this.resizerUrl.indexOf('&h=')))
                }
                this.resizerUrl = this.resizerUrl.replace('![](https://cdn.alaatv.com', 'https://cdn.alaatv.com')
                if (this.resizerUrl.indexOf('.png') !== -1) {
                    this.resizerUrl = this.resizerUrl.slice(0, this.resizerUrl.indexOf('.png') + 4)
                }
                if (this.resizerUrl.indexOf('.jpg') !== -1) {
                    this.resizerUrl = this.resizerUrl.slice(0, this.resizerUrl.indexOf('.jpg') + 4)
                }
                if (this.resizerUrl.indexOf('.jpeg') !== -1) {
                    this.resizerUrl = this.resizerUrl.slice(0, this.resizerUrl.indexOf('.jpeg') + 5)
                }

                setTimeout(() => {
                    this.resizerImgSize = this.$refs.resizerimg.clientWidth
                    this.resizerImgHSize = this.$refs.resizerimg.clientHeight
                    if (resizedWidth !== 0) {
                        this.resizerImgFinalWidth = resizedWidth / this.resizerImgSize * 100
                    } else {
                        this.resizerImgFinalWidth = 100
                    }
                },500)
            },
            copyToClipboard (text) {
                const el = document.createElement('textarea')
                el.value = text
                document.body.appendChild(el)
                el.select()
                document.execCommand('copy')
                document.body.removeChild(el)
                this.$notify({
                    group: 'notifs',
                    title: 'توجه',
                    text: 'آدرس فایل به کلیپبورد منتقل شد',
                    type: 'success'
                })
            },
            inputFilter: function (newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Filter non-image file
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }

                // Create a blob field
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
            },
            updateAttachList(exams) {
              let that = this
                this.selectedQuizzes = []
                exams.forEach( item => {
                    const targetExamIndex = that.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam_id))
                    that.totalExams[targetExamIndex].order = item.order
                    that.totalExams[targetExamIndex].sub_category_id = item.sub_category.id
                    that.totalExams[targetExamIndex].sub_category_title = item.sub_category.title
                    that.selectedQuizzes.push(that.totalExams[targetExamIndex])
                })
              this.updateSelectedQuizzes()
            },
            loadnCurrentQuestionData () {
                let that = this
                this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.id))
                    .then((response) => {
                        this.currentQuestion = new Question(response.data.data)
                        this.trueChoiceIndex = this.currentQuestion.choices.list.findIndex((item) => item.answer )
                        that.updateAttachList(response.data.data.exams)
                        that.updateRendered()
                    })
            },
            initTable () {
                this.table = []
                let row = []
                for (let i = 0; i < this.tableHeight; i++) {
                    row = []
                    for (let j = 0; j < this.tableWidth; j++) {
                        row.push('')
                    }
                    this.table.push(row)
                }
                this.tableTempWidth = this.tableWidth
                this.tableTempHeight = this.tableHeight
            },
            initMatrix () {
                this.matrix = []
                let row = []
                for (let i = 0; i < this.matrixHeight; i++) {
                    row = []
                    for (let j = 0; j < this.matrixWidth; j++) {
                        row.push(0)
                    }
                    this.matrix.push(row)
                }
                this.matrixTempWidth = this.matrixWidth
                this.matrixTempHeight = this.matrixHeight
            },
            renderTableKatex () {
                let tableKatex = ''
                for (let i = 0; i < this.tableTempHeight; i++) {
                    for (let j = 0; j < this.tableTempWidth; j++) {
                        tableKatex += ' | ' + this.table[i][j]
                    }
                    tableKatex += ' |\n'
                    if (i === 0 && this.tableHeader) {
                        for (let x = 0; x < this.tableTempWidth; x++) {
                            tableKatex += '|:-------------:'
                        }
                        tableKatex += '|\n'
                    }
                }
                // this.matrixTempHeight = 1
                // this.matrixTempWidth = 1
                return tableKatex
            },
            renderMatrixKatex () {
                let matrixType = this.determinan ? 'vmatrix' : 'bmatrix'
                let matrixKatex = ''
                matrixKatex += '$\\begin{' + matrixType + '}'
                for (let i = 0; i < this.matrixTempHeight; i++) {
                    for (let j = 0; j < this.matrixTempWidth; j++) {
                        matrixKatex += this.matrix[i][j]
                        if (j !== this.matrixTempWidth - 1) {
                            matrixKatex += ' & '
                        }
                    }
                    if (i !== this.matrixTempHeight - 1) {
                        matrixKatex += ' \\\\ '
                    }
                }
                matrixKatex += '\\end{' + matrixType + '}$'
                // this.matrixTempHeight = 1
                // this.matrixTempWidth = 1
                return matrixKatex
            },
            replaceNimFasele () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement = this.currentQuestion.statement.replace('¬', '‌')
            },
            markdownBtnAddString ({elem, key, string}) {
                this.addString(elem, key, string)
            },
            addString (elem, key, string) {
                if (!elem[key]) {
                    elem[key] = ''
                }
                Vue.set(elem, key, elem[key] + string)
                this.updateRendered()
            },
            getQuizById (quizId) {
                return this.examList.list.find((quiz) => quiz.id === quizId )
            },
            // replaceNimFasele () {
            //     if (!this.currentQuestion.statement) {
            //         this.currentQuestion.statement = ''
            //     }
            //     this.currentQuestion.statement = this.currentQuestion.statement.replace('¬', '‌')
            // },
            replaceExtraSpaceAroundDollarSign () {
                if (this.selectedField === 0) {
                    if (!this.currentQuestion.statement) {
                        this.currentQuestion.statement = ''
                    }
                    while (this.currentQuestion.statement.indexOf('$$') !== -1) {
                        this.currentQuestion.statement = this.currentQuestion.statement.replace('$$', '$')
                    }
                    let dollarSignCounter = 0
                    for (let i = 0; i < this.currentQuestion.statement.length; i++) {
                        if (this.currentQuestion.statement[i] === '$') {
                            dollarSignCounter++
                            if (dollarSignCounter % 2 === 1 && this.currentQuestion.statement[i + 1] === ' ') {
                                this.currentQuestion.statement = this.currentQuestion.statement.slice(0, i + 1) + this.currentQuestion.statement.slice(i + 2)
                                if (this.currentQuestion.statement[i + 1] === ' ') {
                                    i--
                                    dollarSignCounter--
                                }
                            }
                            else if (dollarSignCounter % 2 === 0 && this.currentQuestion.statement[i - 1] === ' ') {
                                this.currentQuestion.statement = this.currentQuestion.statement.slice(0, i - 1) + this.currentQuestion.statement.slice(i)
                                if (this.currentQuestion.statement[i - 2] === ' ') {
                                    i = i - 2
                                    dollarSignCounter--
                                }
                            }
                        }
                    }
                } else {
                    if (!this.currentQuestion.choices.list[this.selectedField - 1].title) {
                        this.currentQuestion.choices.list[this.selectedField - 1].title = ''
                    }
                    while (this.currentQuestion.choices.list[this.selectedField - 1].title.indexOf('$$') !== -1) {
                        this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.replace('$$', '$')
                    }
                    let dollarSignCounter = 0
                    for (let i = 0; i < this.currentQuestion.choices.list[this.selectedField - 1].title.length; i++) {
                        if (this.currentQuestion.choices.list[this.selectedField - 1].title[i] === '$') {
                            dollarSignCounter++
                            if (dollarSignCounter % 2 === 1 && this.currentQuestion.choices.list[this.selectedField - 1].title[i + 1] === ' ') {
                                this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.slice(0, i + 1) + this.currentQuestion.choices.list[this.selectedField - 1].title.slice(i + 2)
                                if (this.currentQuestion.choices.list[this.selectedField - 1].title[i + 1] === ' ') {
                                    i--
                                    dollarSignCounter--
                                }
                            }
                            else if (dollarSignCounter % 2 === 0 && this.currentQuestion.choices.list[this.selectedField - 1].title[i - 1] === ' ') {
                                this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.slice(0, i - 1) + this.currentQuestion.choices.list[this.selectedField - 1].title.slice(i)
                                if (this.currentQuestion.choices.list[this.selectedField - 1].title[i - 2] === ' ') {
                                    i = i - 2
                                    dollarSignCounter--
                                }
                            }
                        }
                    }
                }
            },
            updateRendered () {
                this.replaceNimFasele()
                this.replaceExtraSpaceAroundDollarSign()
                this.questRendered = this.markdown.render(this.currentQuestion.statement.toString());
                for (let i = 0; i < 4; i++) {
                    const title = (typeof this.currentQuestion.choices.list[i] !== 'undefined') ? this.currentQuestion.choices.list[i].title : null
                    if (title) {
                        this.choiceRendered[i] = this.markdown.render(title.toString())
                    }
                }
                this.replaceNimFasele()
            },
            selectAllExams () {
                if (this.selectedQuizzes.length !== this.examList.list.length) {
                    this.selectedQuizzes = []
                    this.examList.list.forEach((item) => { this.selectedQuizzes.push(item.id) })
                  this.updateSelectedQuizzes()
                }
            },
            submitQuestion () {
                if (this.editMode) {
                    this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
                    this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
                    this.currentQuestion.update(API_ADDRESS.question.updateQuestion(this.currentQuestion.id))
                        .then(() => {
                            this.$notify({
                                group: 'notifs',
                                title: 'توجه',
                                text: 'ویرایش با موفقیت انجام شد',
                                type: 'success'
                            })

                        })
                    return
                }
                this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
                this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
                this.currentQuestion.exams = this.selectedQuizzes
                this.currentQuestion.create()
                    .then(() => {
                        this.currentQuestion.statement = ''
                        this.currentQuestion.choices.list.forEach((item) => { item.title = '' })
                        this.$notify({
                            group: 'notifs',
                            title: 'توجه',
                            text: 'ثبت با موفقیت انجام شد',
                            type: 'success'
                        })
                    })

            },
            // changeTrueChoice (index) {
            //     for (let i = 0; i < 4; i++) {
            //         if (i === index) {
            //
            //         }
            //     }
            // }


          convertToMarkdownKatex1 (string) {
            if (!string) {
              return string
            }
            string = string.replace(/\n/g,'<br>')
            TurndownService.prototype.escape = function (string) {
              let escapes = [
                [/\s\$/g, '$'],
                [/\$\s/g, '$'],
                [/\{align\*\}/g, '{cases}'],
                // [/\\/g, '\\\\'],
                // [/\*/g, '\\*'],
                // [/^-/g, '\\-'],
                // [/^\+ /g, '\\+ '],
                // [/^(=+)/g, '\\$1'],
                // [/^(#{1,6}) /g, '\\$1 '],
                // [/`/g, '\\`'],
                // [/^~~~/g, '\\~~~'],
                // [/\[/g, '\\['],
                // [/\]/g, '\\]'],
                // [/^>/g, '\\>'],
                // [/_/g, '\\_'],
                // [/^(\d+)\. /g, '$1\\. ']
              ];
              return escapes.reduce(function (accumulator, escape) {
                return accumulator.replace(escape[0], escape[1])
              }, string)
            }
            // create an instance of Turndown service
            const turndownService = new TurndownService({
              // rules: COMMONMARK_RULES,
              headingStyle: 'setext',
              hr: '* * *',
              bulletListMarker: '*',
              codeBlockStyle: 'indented',
              fence: '```',
              emDelimiter: '_',
              strongDelimiter: '**',
              linkStyle: 'inlined',
              linkReferenceStyle: 'full',
              br: '  ',
              blankReplacement: function (content, node) {
                return node.isBlock ? '\n\n' : ''
              },
              keepReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
              },
              defaultReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + content + '\n\n' : content
              }
            })
            // turndownService.keep(['$'])

            // convert HTML to Markdown
            const markdown = turndownService.turndown(string)
            // return string
            // return markdown

            // return this.markdown.render(string.replace('<div class="question" dir="rtl">', ''))
            return this.markdown.render(markdown)
          },
        }
    }
</script>

<style>
    .renderedPanel {
        direction: rtl;
        padding: 20px;
    }
    .renderedPanel .katex {
        direction: ltr;
    }
    .renderedPanel strong>strong>s {
        text-decoration: underline;
        text-underline-position: under;
    }

    .ML__virtual-keyboard-toggle {
        color: gray !important;
    }

    #mathfield, .latexData {
        font-size: 32px;
        margin: 3em;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3);
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)
    }

    .recommended-time .v-text-field__details {
        display: none;
    }
</style>

<style scoped>
    .order-show {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .order-show p {
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .question-info {
        margin: 5px 0 15px;
        width: 50%;
    }
</style>
