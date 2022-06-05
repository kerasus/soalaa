<template>
  <div class="steps row">
    <div class="steps-box col-12 row no-padding items-center">
      <div class="exam-info col-5 flex items-center" :class="{ 'current-step' : this.currentStep === 'create' }">
        <q-icon name="isax:edit" class="icon" />
        <div class="exam-info-title title " :class="{ 'hidden-mobile' : this.currentStep !== 'create' }">اطلاعات آزمون</div>
        <div class="line" :class="{ 'border-mobile' : this.currentStep !== 'create' }"/>
      </div>
      <div class="choose-questions col-5 flex items-center" :class="{ 'current-step' : this.currentStep === 'bank-test-component1' }">
        <q-icon name="isax:task-square" class="icon"/>
        <div class="choose-questions-title title" :class="{ 'hidden-mobile' : this.currentStep !== 'bank-test-component1' }">انتخاب سوال</div>
        <div class="line" :class="{ 'border-mobile' : this.currentStep !== 'bank-test-component1' }"/>
      </div>
      <div class="final-approval col-2 flex items-center" :class="{ 'current-step' : this.currentStep === 'bank-test-component2' }">
        <q-icon name="isax:tick-square" class="icon"/>
        <div class="final-approval-title" :class="{ 'hidden-mobile' : this.currentStep !== 'bank-test-component2' }">تایید نهایی</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Steps',
  props: {
    currentComponent: {
      type: String,
      default () {
        return ''
      }
    }
  },
  emits: [
    'update:currentComponent'
  ],
  computed: {
    currentStep: {
      get () {
        return this.currentComponent
      },
      set (value) {
        this.$emit('update:currentComponent', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.steps {
  height: 64px;
  padding-right: 100px;
  padding-left: 76px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #DEDEDE;
  border-radius: 20px;

  .steps-box {
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
    padding-left: 62px !important;
    border-radius: 20px;
    .icon {
      font-size: 22px;
      margin-right: 10px;
    }
    .title{
      margin-right: 16px;
    }
  }
  .line {
    border: 1.5px solid #DEDEDE;
    width: calc(100% - 160.65px);
  }
  .current-step{
    border-color: #8075DC;
    color: #8075DC;
  }

}
@media screen and (max-width: 1919px){
  .steps {
    padding-right: 30px;
    padding-left: 0;
    .steps-box {
      padding-left: 58px !important;
    }
  }
}
@media screen and (max-width: 1440px){
  .steps {
    padding-left: 30px;
    .steps-box {
      padding-left: 50px !important;
    }
  }
}
@media screen and (max-width: 600px){
  .steps {
    padding-right: 16px !important;
    padding-left: 16px !important;
    height: 60px;
    .steps-box {
      padding-left: 34px !important;
    }
  }
  .hidden-mobile {
    display: none !important;
  }
  .border-mobile{
    width: calc(100% - 44.65px) !important;
  }
}
</style>
