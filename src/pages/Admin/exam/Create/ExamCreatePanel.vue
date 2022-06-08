<template>
  <steps v-model:currentComponent="currentTab"/>
  <q-tab-panels v-model="currentTab" keep-alive animated style=" background: #f1f1f1;">
    <q-tab-panel name="createPage">
      <create ref="createExam"/>
    </q-tab-panel>
    <q-tab-panel name="chooseQuestion">
      <bank-test-component1/>
    </q-tab-panel>
    <q-tab-panel name="finalApproval">
      <bank-test-component2/>
    </q-tab-panel>
  </q-tab-panels>
  <div class="btn-box flex justify-end items-center">
    <q-btn
      unelevated
      class="q-mr-xl btn-md"
      :icon="'isax:arrow-right-3'"
      style="margin-right: 18px;"
      @click="goToLastStep"
    >
      بازگشت
    </q-btn>
    <q-btn
      unelevated
      color="primary"
      class="q-mr-xl btn-md"
      style="margin-right: 18px;"
      :icon-right="'isax:arrow-left-2'"
      @click="goToNextStep"
    >
      مرحله بعد
    </q-btn>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Exam } from 'src/models/Exam'
import Steps from 'pages/Admin/exam/Create/Steps'
import Create from 'pages/Admin/exam/Create'
import BankTestComponent1 from 'pages/Admin/exam/Create/BankTestComponent1'
import BankTestComponent2 from 'pages/Admin/exam/Create/BankTestComponent2'
export default {
  name: 'ExamCreatePanel',
  components: {
    BankTestComponent2,
    BankTestComponent1,
    Create,
    Steps
  },
  data () {
    return {
      exam: new Exam(),
      currentComponent: 'Create',
      currentComponentName: 'Create',
      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      isExamDataInitiated: false
    }
  },
  provide () {
    return {
      providedExam: computed(() => this.exam)
    }
  },
  created () {},
  methods: {
    camelize (word) {
      return word.replace(/-./g, x => x[1].toUpperCase())
    },
    kebabize (word) {
      return word.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
    },
    getChosenComponent (name) {
      const cNameKebabized = this.kebabize(name)
      this.currentComponentName = cNameKebabized
      return cNameKebabized
    },
    changeCurrentTab (val) {
      this.currentTab = val
      // console.log(val)
    },
    getCurrentIndexOfStep () {
      return this.allTabs.indexOf(this.currentTab)
    },
    goToLastStep () {
      this.currentTab = this.allTabs[this.getCurrentIndexOfStep() - 1] || 'createPage'
    },
    goToNextStep () {
      this.updateExamData()
      this.currentTab = this.allTabs[this.getCurrentIndexOfStep() + 1] || 'createPage'
    },
    updateExamData () {
      if (this.currentTab === 'createPage') {
        const formData = this.$refs.createExam.$refs.EntityCrudFormBuilder.getFormData()
        if (!this.isExamDataInitiated) {
          this.exam = new Exam(formData)
          this.isExamDataInitiated = true
        }
        this.exam = Object.assign(this.exam, formData)
      }
    }
  },
  computed: {
    getComponent () {
      return this.getChosenComponent(this.currentComponent)
    }
  }
}
</script>

<style scoped>

</style>
