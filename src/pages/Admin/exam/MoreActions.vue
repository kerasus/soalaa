<template>
  <div>
    <q-expansion-item label="ساخت فایل سوالات">
      <div class="more-action-btns">
        <div class="q-pa-md btn">
          <q-btn
            color="primary"
            class="full-width"
            label="ساخت فایل سوالات"
            @click="generateJsonFile(entityId, false)"
          />
        </div>
        <div class="q-pa-md btn">
          <q-btn
            color="primary"
            class="full-width"
            label="ساخت فایل سوالات با جواب"
            @click="generateJsonFile(entityId, true)"
          />
        </div>
      </div>
    </q-expansion-item>
    <div class="q-pt-md">
      <q-expansion-item
        label="ویرایش کارنامه آزمون"
        expand-separator
      >
        <portlet>
          <template v-slot:title><span></span></template>
          <template v-slot:content>
            <edit-exam-report />
          </template>
        </portlet>
      </q-expansion-item>
    </div>
    <div class="q-pt-md">
      <q-expansion-item
        expand-separator
        label="آپلود فایل سوالات و جواب ها"
      >
        <portlet>
          <template v-slot:title><span></span></template>
          <template v-slot:content>
            <upload />
          </template>
        </portlet>
      </q-expansion-item>
    </div>
    <div class="q-pt-md">
      <q-expansion-item
        label="اصلاح ضرایب"
        expand-separator
      >
        <portlet>
          <template v-slot:title><span></span></template>
          <template v-slot:content>
            <edit-coefficients />
          </template>
        </portlet>
      </q-expansion-item>
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

<style scoped lang="scss">
.more-action-btns {
  display: flex;
  justify-content: center;
  align-content: center;
  .btn {
    width: 100%;
  }
}
.q-expansion-item {
  background: #DBDBDB;
  border-radius: 16px;
}
.q-focus-helper, .q-focusable, .q-manual-focusable, .q-hoverable {
  border-radius: 16px;
}
</style>
