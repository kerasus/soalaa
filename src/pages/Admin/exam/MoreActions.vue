<template>
  <div>
    <q-expansion-item label="ساخت فایل سوالات">
      <div class="more-action-btns">
        <div class="q-pa-md btn">
          <q-btn
            color="primary"
            class="full-width"
            label="ساخت فایل سوالات"
            :loading="generateJsonFileLoading"
            @click="generateJsonFile(entityId, false)"
          />
        </div>
        <div class="q-pa-md btn">
          <q-btn
            color="primary"
            class="full-width"
            label="ساخت فایل سوالات با جواب"
            :loading="generateJsonFileLoading"
            @click="generateJsonFile(entityId, true)"
          />
        </div>
      </div>
    </q-expansion-item>
    <q-expansion-item label="ویرایش کارنامه آزمون"
                      expand-separator
                      class="q-mt-md"
    >
      <edit-exam-report />
    </q-expansion-item>
    <q-expansion-item label="آپلود فایل سوالات و جواب ها"
                      expand-separator
                      class="q-mt-md"
    >
      <upload />
    </q-expansion-item>
    <q-expansion-item label="اصلاح ضرایب"
                      expand-separator
                      class="q-mt-md"
    >
      <edit-coefficients />
    </q-expansion-item>
    <q-btn color="primary"
           class="full-width q-mt-md"
           label="کپی کردن لینک شرکت در آزمون"
           @click="copyExamLink"
    />
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import EditExamReport from 'pages/Admin/exam/editExamReport'
import Upload from 'pages/Admin/exam/Upload'
import EditCoefficients from 'pages/Admin/exam/editCoefficients'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'MoreActions',
  components: {
    // EntityShow,
    EditCoefficients,
    Upload,
    EditExamReport
  },
  data () {
    return {
      generateJsonFileLoading: false
    }
  },
  methods: {
    generateJsonFile (id, withAnswer) {
      this.generateJsonFileLoading = true
      const that = this
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.post(API_ADDRESS.exam.generateExamFile(id, withAnswer))
        .then(() => {
          that.$q.notify({
            type: 'positive',
            message: 'ساخت فایل ' + id + ' با موفقیت انجام شد',
            position: 'top'
          })
          this.$store.dispatch('loading/linearLoading', false)
          this.generateJsonFileLoading = false
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
          this.generateJsonFileLoading = false
        })
    },
    copyExamLink () {
      const examId = this.$route.params.id
      const props = this.$router.resolve({
        name: 'onlineQuiz.alaaView',
        params: { quizId: examId, questNumber: 1 }
      })
      const examPageUrl = window.location.origin + props.path
      copyToClipboard(examPageUrl)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'لینک آزمون کپی شد.',
            position: 'top'
          })
        })
        .catch(() => {
          // fail
        })
    }
  },
  computed: {
    entityId () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped lang="scss">
.more-action-btns {
  display: flex;
  justify-content: center;
  align-content: center;
  .btn {
    width: 100%;
  }
}
:deep(.q-expansion-item) {
  background: white;
  border-radius: 16px;
  .q-expansion-item__content {
    padding: 20px;
  }
}
.q-focus-helper, .q-focusable, .q-manual-focusable, .q-hoverable {
  border-radius: 16px;
}
</style>
