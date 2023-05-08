<template>
  <div>
    <q-card class="edit-question-main-card custom-card">
      <q-card-section class="main-card-section question">
        <div class="card-section-header">
          <span>صورت سوال</span>
        </div>
        <div class="question-box">
          <QuestionField
            ref="tiptapQuestionStatement"
            :key="'statement' + domKey"
            :editorValue="question.statement"
          />
        </div>
      </q-card-section>
      <q-card-section
        class="row main-card-section multiple-answer"
      >
        <div
          v-for="(item, index) in question.group"
          :key="index"
          class="col-lg-6 col-12"
        >
          <div class="card-section-header">
            <q-btn
              v-if="isQuestionGroupInEditMode"
              class="icon-type"
              icon="isax:close-square5"
              color="negative"
              flat
              @click="removeSelectedQuestionIDs(item)"
            />
            <div>سوال {{index+ 1}} با شناسه {{item.id}}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row main-card-section">
        <div class="col-12">
          <div class="card-section-header">
            <q-input
              v-if="isQuestionGroupInEditMode"
              v-model="currentQuestionIdToAdd"
              filled
              placeholder="شناسه سوال"
            />
            <q-btn
              v-if="isQuestionGroupInEditMode"
              class="icon-type q-mr-lg"
              icon="isax:add-square5"
              color="positive"
              flat
              @click="addQuestionId"
            />
            <q-btn
              unelevated
              class="icon-type q-mr-lg"
              color="positive"
              :loading="groupAttachLoading"
              label="ثبت نهایی شناسه سوالات"
              @click="attachQuestionGroup"
            />
            <q-btn
              v-if="!isQuestionGroupInEditMode"
              unelevated
              class="icon-type"
              color="primary"
              label="ویرایش سوالات گروهی"
              @click="isQuestionGroupInEditMode = true"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="main-card-section long-answer">
        <div class="card-section-header">پاسخ تشریحی</div>
        <div class="answer-box">
          <QuestionField
            ref="tiptapDescriptiveAnswer"
            :key="'descriptive_answer' + domKey"
            :editor-value="question.descriptive_answer"
          />
        </div>
      </q-card-section>
    </q-card>
    <div
      class="q-pt-lg"
    >
      <div  class="q-pb-md"> سوالات گروهی این سوال </div>
      <question-item
        v-for="(question, index) in question.group"
        :key="index"
        :question="question"
        pageStrategy="question-bank"
        :listOptions="questionsItemOptions"
      />
    </div>
  </div>
</template>

<script>
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
export default {
  name: 'GroupQuestionEdit',
  components: {
    QuestionItem,
    QuestionField
  },
  mixins: [
    AdminActionOnQuestion
  ],
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      domKey: Date.now(),
      questionsItemOptions: {
        copy: true,
        detachQuestion: true,
        deleteQuestionFromDb: false,
        deleteQuestionFromExam: false,
        editQuestion: true,
        switch: true
      },
      choice: '',
      defaultRefName: 'tiptap',
      dynamicMassage: '',
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      currentQuestionIdToAdd: '',
      categoryList: new QuestCategoryList(),
      allProps: {
        loading: false
      },
      groupAttachLoading: false,
      isQuestionGroupInEditMode: true
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey++
    }, 100)
  },
  updated () {},
  methods: {
    attachQuestionGroup () {
      this.groupAttachLoading = true
      this.$axios.post(API_ADDRESS.question.groupAttach, {
        group_question_id: this.question.id,
        questions: this.question.group.map(item => item.id)
      })
        .then((response) => {
          const question = new Question(response.data.data)
          this.question.group = question.group
          this.$q.notify({
            message: 'ثبت با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          this.groupAttachLoading = false
          this.isQuestionGroupInEditMode = false
        })
        .catch(() => {
          this.groupAttachLoading = false
        })
    },
    removeSelectedQuestionIDs (questionId) {
      const index = this.question.group.findIndex(item => item === questionId)
      this.question.group.splice(index, 1)
    },
    addQuestionId () {
      this.question.group.push(new Question({ id: this.currentQuestionIdToAdd }))
      this.currentQuestionIdToAdd = ''
    },
    saveQuestion () {
      this.setContent()
      const question = {
        ...this.question,
        choices: this.question.choices.list,
        // type_id: this.question.type_id
        tags: this.question.tags.list.map(tag => tag.id),
        subject_tags: this.question.subject_tags.list.map(item => item.id)
      }
      this.updateQuestion(question)
    },
    setContent () {
      this.question.statement = this.getContentOfQuestionParts('QuestionStatement')
      this.question.descriptive_answer = this.getContentOfQuestionParts('DescriptiveAnswer')
    },
    getContentOfQuestionParts (name) {
      return this.$refs[this.defaultRefName + name].getContent()
    }
  }
}
</script>
<style scoped lang="scss">
.edit-question-main-card {
  margin-top: 43px;
  margin-bottom: 40px;
  .main-card-section {
    .card-section-header {
      display: flex;
      font-size: 16px;
      color: black;
      margin: 8px 18px 0;
      align-items: center;
      @media screen and (max-width: 1024px) {
        margin: 8px 0;
      }
      .save-btn {
        &:deep(.q-icon){
          order: 1;
        }
      }

    }
    .question-box , .answer-box, .multiple-answer-box {
      margin: 16px 8px;
      @media screen and (max-width: 1024px) {
        margin: 16px 0;
      }
    }
  }
}
</style>
<style lang="scss">
[dir="rtl"] .filepond--root {
  text-align: left #{"/* rtl:ignore */"} !important ;
  direction: ltr #{"/* rtl:ignore */"} !important;
}
.filepond--file-info {
  transform: none !important;
  margin-left: 2.5em #{"/* rtl:ignore */"} !important;
  margin-right: 0.5em #{"/* rtl:ignore */"} !important;
}
</style>
