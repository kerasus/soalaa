<template>
  <div>
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
        <template v-slot:title>
          ویرایش کارنامه آزمون
        </template>
        <template v-slot:content>
          <edit-exam-report />
        </template>
      </portlet>
    </div>
    <div class="q-pt-md">
      <portlet>
        <template v-slot:title>
          آپلود فایل سوالات و جواب ها
        </template>
        <template v-slot:content>
          <upload />
        </template>
      </portlet>
    </div>
    <div class="q-pt-md">
      <portlet>
        <template v-slot:title>
          اصلاح ضرایب
        </template>
        <template v-slot:content>
          <edit-coefficients />
        </template>
      </portlet>
    </div>
  </div>
</template>

<script>
import EditExamReport from 'pages/Admin/exam/editExamReport'
import Upload from 'pages/Admin/exam/Upload'
import EditCoefficients from 'pages/Admin/exam/editCoefficients'
import { Portlet } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'MoreActions',
  components: {
    // EntityShow,
    EditCoefficients,
    Upload,
    EditExamReport,
    Portlet
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
    }
  },
  computed: {
    entityId () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
