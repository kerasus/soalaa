<template>
  <steps v-model:currentComponent="currentComponentName"/>
  <component
    :is="getComponent"
    @btnClicked="changeCurrentComponent"
  />
  <q-tab-panels v-model="currentTab" animated class="shadow-2 rounded-borders">
    <q-tab-panel name="mails">
      <div class="text-h6">Mails</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="alarms">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="movies">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import Steps from 'pages/Admin/exam/Create/Steps'
import { defineAsyncComponent } from 'vue'
export default {
  name: 'ExamCreatePanel',
  components: {
    Steps,
    Create: defineAsyncComponent(() => import('src/pages/Admin/exam/Create')),
    BankTestComponent1: defineAsyncComponent(() => import('src/pages/Admin/exam/Create/BankTestComponent1')),
    BankTestComponent2: defineAsyncComponent(() => import('src/pages/Admin/exam/Create/BankTestComponent2'))
  },
  data () {
    return {
      currentComponent: 'Create',
      currentComponentName: 'Create',
      currentTab: ''
    }
  },
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
    changeCurrentComponent (val) {
      this.currentComponent = val
      // console.log(val)
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
