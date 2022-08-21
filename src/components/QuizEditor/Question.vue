<template>
  <div>
    <div class="admin-actions">
      <div
        v-if="source.confirmers.length"
        class="avatar-section grid-item">
        تایید شده توسط :
        <q-chip
          v-for="(item, index) in source.confirmers"
          :key="index"
          color="green-11">
          <q-avatar>
            <q-img :src="item.photo" />
          </q-avatar>
          {{ item.first_name + ' ' + item.last_name }}
        </q-chip>
      </div>
      <div v-else />
      <div class="action-btn-box grid-item">
        <div v-if="options.checkQuestion">
          <q-btn
            v-if="getChoiceStatus() !== 'o'"
            text-color="blue"
            icon="mdi-checkbox-blank-circle-outline"
            flat
            fab-mini
            @click="changeStatus(source.id, 'o')"
          />
          <q-btn
            v-else
            icon="mdi-checkbox-blank-circle"
            text-color="yellow"
            flat
            fab-mini
            @click="changeStatus(source.id, 'o')"
          />
        </div>
        <div v-if="options.markQuestion">
          <q-btn
            v-if="getChoiceStatus() === 'x'"
            text-color="red"
            icon="mdi-close"
            flat
            fab-mini
            @click="changeStatus(source.id ,'x')"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-close"
            flat
            fab-mini
            @click="changeStatus(source.id ,'x')"
          />
        </div>
        <div v-if="options.bookmark">
          <q-btn
            v-if="getChoiceBookmark()"
            text-color="blue"
            icon="mdi-bookmark"
            flat
            fab-mini
            @click="changeBookmark(source.id)"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-bookmark-outline"
            flat
            fab-mini
            @click="changeBookmark(source.id)"
          />
        </div>
        <!----------------- admin actions ---------------->
        <div v-if="options.deleteQuestionFromDb">
          <q-icon
            class="fi fi-rr-delete document icon-style"
            @click="deleteQuestion()"
          >
            <q-tooltip>
              حذف سوال از پایگاه داده
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="options.detachQuestion">
          <q-icon
            class="fi fi-rr-cross-small icon-style"
            @click="detachQuestion()"
          >
            <q-tooltip>
              حذف سوال از آزمون
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="options.editQuestion">
          <q-icon
            class="fi fi-rr-pencil icon-style"
            @click="redirectToEditPage"
          >
            <q-tooltip>
              ویرایش سوال
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="options.copy">
          <q-icon
            class="fi fi-rr-copy icon-style"
            @click="copyIdToClipboard(source.id)"
          >
            <q-tooltip>
              کپی شناسه سوال
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="options.switch">
          <q-circular-progress
            v-if="confirmLoading"
            indeterminate
            :thickness="0.3"
            size="20px"
            color="primary"
          />
          <q-toggle
            v-else
            v-model="source.confirmed"
            @update:model-value="confirmQuestion"
            color="primary"
          >
            <q-tooltip>
              تایید سوال
            </q-tooltip>
          </q-toggle>

          <slot
            name="chartDetail"
          />
        </div>
      </div>
    </div>
    <div class="question-section">
      <div class="question-statement">
        <div class="text-section">
          <vue-katex
            v-if="source.statement"
            :input="'(' + getSubCategoryName + ')' + ' (' + source.order + ') - ' + source.statement"
          />
        </div>
        <div
          v-if="source.statement_photo && !source.statement"
          class="photo-section">
          <p v-if="$route.name === 'exams.lessons.questions'">
            ({{ getSubCategoryName }}) (ترتیب: {{ source.order }})(شماره: {{ source.questNumber }})  -  صورت سوال :
          </p>
          <p v-else>
            ({{ getSubCategoryName }}) ({{ source.order }}) -  صورت سوال :
          </p>
          <div
            v-for="(statement_photo , index) in source.statement_photo"
            :key="index"
          >
            <q-img
              :src="statement_photo"
              alt="صورت سوال"
            />
          </div>
        </div>
      </div>
      <div
        v-if="checkChoices()"
        class="question-choices">
        <div class="row text-section">
          <div
            v-for="(choice , index) in source.choices.list"
            :key="choice.id"
            :class="{ choice, renderedPanel: true, ltr: isLtr , choiceClass, space:!choice.answer}"
          >

            <vue-katex
              :input="(choiceNumber[index]) + choice.title"
              :ltr="isLtrQuestion"
            />
            <q-icon
              v-if="choice.answer"
              class="fi fi-rr-check question-answer"></q-icon>
          </div>
        </div>
        <div  v-if="source.answer_photos.length > 0 && !checkChoices()"
              class="photo-section">
          <p>
            پاسخ :
          </p>
          <div
            v-for="(src, index) in source.answer_photos"
            :key="index"
          >
            <q-img
              alt="صورت سوال"
              class="img-size"
              :src="src"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import { mixinQuiz } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import VueKatex from 'src/components/VueKatex'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { copyToClipboard } from 'quasar'
export default {
  name: 'questionField',
  components: {
    VueKatex
  },
  mixins: [mixinQuiz],
  props: {
    subCategory: {
      default () {
        return new QuestSubcategoryList()
      }
    },
    index: { // index of current source
      type: Number
    },
    examId: {
      default () {
        return null
      }
    },
    sourcee: { // here is: {uid: 'unique_1', text: 'abc'}
      default () {
        return {}
      }
    },
    quizList: {
      type: Array,
      default () {
        return []
      }
    },
    questionListOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      options: {
        checkQuestion: false,
        markQuestion: false,
        bookmark: false,
        copy: true,
        detachQuestion: true,
        deleteQuestionFromDb: true,
        editQuestion: true,
        switch: true
      },
      isLtr: false,
      confirmLoading: false,
      observer: null,
      choiceNumber: {
        0: '1) ',
        1: '2) ',
        2: '3) ',
        3: '4) '
      },
      source: {}

    }
  },
  created () {
    this.source = this.sourcee
    Object.assign(this.options, this.questionListOptions)
  },
  computed: {
    getSubCategoryName () {
      const target = this.subCategory.list.find(
        (item) => {
          if (item && item.id && this.source.sub_category) {
            return item.id === this.source.sub_category.id
          }
          return false
        }
      )
      if (target) {
        return target.title
      } else {
        return ''
      }
    },
    isLtrQuestion () {
      const string = this.source.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    isRtlString () {
      const source = this.source
      const string = source.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return string.match(persianRegex)
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    choiceClass () {
      const source = this.source
      const largestChoice = this.getLargestChoice(source.choices)
      const largestChoiceWidth = this.windowSize.x / largestChoice
      if (largestChoiceWidth < 12) {
        return 'col-md-12'
      }
      if (largestChoiceWidth < 24) {
        return 'col-md-6'
      }
      if (largestChoiceWidth < 48) {
        return 'col-md-3'
      }
      return 'col-md-3'
    }
  },
  methods: {
    redirectToEditPage () {
      this.$router.push({
        name: 'Admin.Question.Edit',
        params: {
          question_id: this.source.id
        }
      })
    },
    checkChoices () {
      const hasText = this.source.choices.list.find(item => item.title)
      return !!hasText
    },
    confirmQuestion () {
      this.confirmLoading = true
      this.source.confirmed ? this.confirmUser() : this.unConfirmUser()
    },
    async confirmUser () {
      try {
        const response = await this.sendConfirmReq()
        this.source.confirmed = response.data.data.confirmed
        this.source.confirmers = response.data.data.confirmers
        this.confirmLoading = false
      } catch (e) {
        this.source.confirmed = !this.source.confirmed
        this.confirmLoading = false
      }
    },
    async unConfirmUser () {
      try {
        const response = await this.sendUnConfirmReq()
        this.source.confirmed = response.data.data.confirmed
        this.source.confirmers = response.data.data.confirmers
        this.confirmLoading = false
      } catch (e) {
        this.source.confirmed = !this.source.confirmed
        this.confirmLoading = false
      }
    },
    sendConfirmReq () {
      return this.$axios.get(API_ADDRESS.question.confirm(this.source.id))
    },
    sendUnConfirmReq () {
      return this.$axios.get(API_ADDRESS.question.unconfirm(this.source.id))
    },
    copyIdToClipboard (sourceId) {
      copyToClipboard(sourceId)
    },

    onIntersect (entries) {
      if (typeof this.source.onIntersect === 'function') {
        this.source.onIntersect(entries)
      }
    },
    choiceClicked (questionId, choiceId) {
      this.changeQuestion(questionId)
      this.answerClicked({ questionId, choiceId })
    },
    removeErab (string) {
      if (!string || string.length === 0) {
        return ''
      }

      let temp = string
      temp = temp.split('َ').join('')
      temp = temp.split('ُ').join('')
      temp = temp.split('ِ').join('')
      temp = temp.split('ّ').join('')
      temp = temp.split('ً').join('')
      temp = temp.split('ٌ').join('')
      temp = temp.split('ٍ').join('')
      return temp
    },
    getLargestChoice (choices) {
      let largestChoice = 0
      choices.list.forEach((source) => {
        if (source.title.length > largestChoice) {
          largestChoice = this.removeErab(source.title).length
        }
      })
      return largestChoice
    },
    detachQuestion () {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'از حذف سوال از آزمون اطمینان دارید؟',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: async (confirm) => {
          if (!confirm) {
            this.closeConfirmModal()
          } else {
            try {
              this.closeConfirmModal()
              await this.detachQuestionReq()
              this.$emit('reloadPage')
            } catch (e) {
              this.closeConfirmModal()
            }
          }
        }
      })
    },
    detachQuestionReq () {
      return this.$axios.post(API_ADDRESS.question.detach(this.source.id), {
        exams: [this.examId]
      })
    },
    closeConfirmModal () {
      this.$store.commit('AppLayout/showConfirmDialog', {
        show: false
      })
    },
    deleteQuestion () {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'از حذف کامل سوال از پایگاه داد و حذف از تمامی آزمون ها اطمینان دارید؟',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: (confirm) => {
          if (!confirm) {
            this.closeConfirmModal()
            return
          }
          this.$axios.delete(API_ADDRESS.question.delete(this.source.id), {
            exams: [this.examId]
          })
            .then(() => {
              this.closeConfirmModal()
              this.$emit('reloadPage')
            })
            .catch((e) => {
              this.closeConfirmModal()
            })
        }
      })
    },
    edit () {
      // console.Log(questionId)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-actions{
  display: grid;
  grid-template-columns: 1fr 1fr;
  .grid-item{

  }
  .action-btn-box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .icon-style{
      cursor: pointer;
      font-size: 22px;
      color: rgba(0, 0, 0, 0.54);
      margin: 0 5px
    }
  }
}

.question-section{
  .question-choices{
    .question-answer{
      font-size: 20px;
      color: #3bd03b;
      margin: 0 5px
    }
    .space{
      margin: 0 30px;
    }
  }
}
.question-field{
  width: 100% !important;
  .alert-sheet{
    margin: 10px;
    display: flex;
    height: 200px;
    .alert-sheet-text{
      margin: auto;
    }
    &.red-sheet{
      background-color: #F44336;
    }
    &.primary-sheet{
      background-color: #9690e4;
    }
  }
  .question-box {
    padding: 10px 10px 10px 30px;
    border: 1px solid red;
    &.current-question {
      background-color: #fffaee;
    }
    .question-head{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
      .icon-style{
        font-size: 22px;
        color: rgba(0, 0, 0, 0.54);
      }
      .question-body {
        margin-bottom: 20px;
        line-height: 40px;
      }
      .question-icons {
        display: flex;
        border: 1px solid #09c260;
        flex-direction: row;
        justify-content: space-around;
      }
    }
    .choices-box{
      .choices {
        display: flex;
        flex-direction: row;
        .choice{
          display: flex;
          flex-direction: row;
          height: auto;
          cursor: pointer;
          transition: all ease-in-out 0.3s;
          padding: 0;
          .choice-inside{
            display: flex;
            flex-direction: row;
            width: 100%;
          }
          &:hover {
            background: #e1e1e1;
          }
          &.active{
            .check-icon{
              display: block;
            }
          }
          .check-icon{
            display: none;
          }
        }
      }
    }
  }
  .ltr {
    direction: rtl;
    &.question-box{
      padding: 10px 20px;
    }
    &.choice{
      direction: rtl;
      text-align: right;
    }
    &.question-icons{
      float: left;
    }
  }
}
</style>

<style lang="scss">
.question-field{
  .question-box{
    .question-head{
      .question-icons{
        .q-btn--fab-mini {
          padding: 0;
          height: 36px;
          width: 36px;
        }
      }
    }
  }
}
</style>
