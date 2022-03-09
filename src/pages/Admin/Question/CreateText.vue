<template>
  <div class="createQ-text-container">
    <Navbar @chosenComponent="chosenComponent"/>
    <DynamicComponent
      :component="currentComponent"
      :key="componentKey"
      :allProps="allProps"
    />
  </div>
</template>

<script>
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import DynamicComponent from 'components/Question/QuestionPage/Create/textMode/questionTypes/DynamicComponent'
import { Question } from 'src/models/Question'
export default {
  name: 'CreateText',
  components: {
    DynamicComponent,
    Navbar
  },
  props: {},
  data () {
    return {
      componentsNames: [
        {
          componentName: 'MultipleChoiceQ',
          tabName: 'تستی'
        },
        {
          componentName: 'DescriptiveQ',
          tabName: 'تشریحی'
        },
        {
          componentName: 'MBTIQ',
          tabName: 'ام بی تی آی'
        }
      ],
      componentKey: 0,
      currentComponent: {
        componentName: 'MultipleChoiceQ',
        tabName: 'تستی'
      },
      allProps: {
        cq: {
          type: Question,
          default: () => new Question()
        },
        modelValue: {
          type: Question,
          default: () => new Question()
        },
        status: {
          type: Boolean,
          default: () => false
        }
      }
    }
  },
  methods: {
    chosenComponent (cName) {
      const that = this
      this.componentsNames.forEach(function (item) {
        if (item.tabName === cName) {
          that.currentComponent.componentName = item.componentName
          that.currentComponent.tabName = item.tabName
        }
      })
      this.forceRerenderComponent()
    },
    forceRerenderComponent () {
      this.componentKey += 1
    }
  }
}
</script>

<style scoped lang="scss">
.createQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
}
.slide-fade-enter-active {
   transition: all 0.3s ease-out;
 }

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
