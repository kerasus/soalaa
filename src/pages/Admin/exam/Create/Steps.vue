<template>
  <div class="steps row">
    <div v-if="!loading"
         class="exam-info step step-1"
         :class="{ 'current-step' : this.currentStep === 'createPage','passed' : this.currentStep === 'chooseQuestion' || this.currentStep === 'finalApproval' || isConfirmd }"
         @click="changeCurrentStep('createPage')"
    >
      <q-icon name="isax:edit"
              class="icon"
      />
      <div class="exam-info-title title "
           :class="{ 'hidden-mobile' : this.currentStep !== 'createPage' }">
        اطلاعات آزمون
      </div>
      <div class="line"
           :class="{ 'border-mobile' : this.currentStep !== 'createPage','passed' : this.currentStep === 'chooseQuestion' || this.currentStep === 'finalApproval' || isConfirmd }"
      />
    </div>
    <div v-if="!loading"
         class="choose-questions step step-2"
         :class="{ 'current-step' : this.currentStep === 'chooseQuestion','passed' : this.currentStep === 'finalApproval' || isConfirmd }"
         @click="changeCurrentStep('chooseQuestion')"
    >
      <q-icon name="isax:task-square"
              class="icon"
      />
      <div class="choose-questions-title title"
           :class="{ 'hidden-mobile' : this.currentStep !== 'chooseQuestion' }"
      >
        انتخاب سوال
      </div>
      <div class="line"
           :class="{ 'border-mobile' : this.currentStep !== 'chooseQuestion','passed' : this.currentStep === 'finalApproval' || isConfirmd }"
      />
    </div>
    <div v-if="!loading"
         class="final-approval step step-3"
         :class="{ 'current-step' : this.currentStep === 'finalApproval','passed' : isConfirmd}"
         @click="changeCurrentStep('finalApproval')"
    >
      <q-icon name="isax:tick-square"
              class="icon"
      />
      <div class="final-approval-title"
           :class="{ 'hidden-mobile' : this.currentStep !== 'finalApproval' }"
      >
        تایید نهایی
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',

  props: {
    isConfirmd: {
      type: Boolean,
      default: false
    },
    step: {
      type: String,
      default () {
        return ''
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      stepList: [
        {
          stepName: 'createPage',
          icon: 'isax:edit',
          title: 'اطلاعات آزمون',
          separator: true
        },
        {
          stepName: 'createPage',
          icon: 'isax:task-square',
          title: 'انتخاب سوال',
          separator: true
        },
        {
          stepName: 'finalApproval',
          icon: 'isax:tick-square',
          title: 'تایید نهایی',
          separator: false
        }
      ]
    }
  },

  computed: {
    currentStep: {
      get () {
        return this.step
      },
      set (value) {
        this.$emit('update:step', value)
      }
    }
  },
  emits: ['update:step'],
  methods: {
    changeCurrentStep (step) {
      if (this.disabled) {
        return
      }
      this.$emit('update:step', step)
    }
  }
}
</script>

<style scoped lang="scss">
.steps {
  display: flex;
  height: 64px;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #8A8CA6;
  padding: 20px 40px;
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 16px;

  @media screen and (max-width: 1439px) {
    padding: 20px 30px;
  }

  @media screen and (max-width: 1023px) {
    height: 60px;
    padding: 20px;
  }

  @media screen and (max-width: 599px) {

    .hidden-mobile {
      display: none !important;
    }

    .border-mobile{
      width: calc(100% - 44.65px) !important;
    }
  }

  .step-1{
    width:45%;

    &.current-step {
      @media screen and (max-width: 599px) {
        width:60%;
      }
    }

    @media screen and (max-width: 599px) {
      width:30%;
    }
    @media screen and (max-width: 820px) and (min-width: 600px) {
      width:38%;
    }
    @media screen and (max-width: 1023px) and (min-width: 821px) {
      width:45%;
    }
    @media screen and (max-width: 1200px) and (min-width: 1024px) {
      width:43%;
    }
    @media screen and (max-width: 1439px) and (min-width: 1201px){
      width: 40%;
    }
  }

  .step-2{
    width:45%;

    &.current-step {
      @media screen and (max-width: 599px) {
        width:60%;
      }
    }

    @media screen and (max-width: 599px) {
      width:30%;
    }
    @media screen and (max-width: 1023px) and (min-width: 600px) {
      width:40%;
    }
    @media screen and (max-width: 1200px) and (min-width: 1024px) {
      width:43%;
    }
    @media screen and (max-width: 1439px) and (min-width: 1201px){
      width: 45%;
    }
  }

  .step-3{
    width:10%;

    &.current-step {
      justify-content: space-around;
      @media screen and (max-width: 599px) {
        width:40%;
      }
    }

    @media screen and (max-width: 599px) {
      width:10%;
    }
    @media screen and (max-width: 820px) and (min-width: 600px) {
      width:22%;
    }
    @media screen and (max-width: 1023px) and (min-width: 821px) {
      width:15%;
    }
    @media screen and (max-width: 1200px) and (min-width: 1024px) {
      width:12%;
    }
    @media screen and (max-width: 1439px) and (min-width: 1201px){
      width: 15%;
    }
  }

  .step {
    cursor: pointer;
    display: flex;
    align-items: center;

    &.choose-questions {
      .line {
        width: 440px;

        @media screen and (max-width: 1023px) and (min-width: 600px) {
          width:200px;
        }
        @media screen and (max-width: 1200px) and (min-width: 1024px) {
          width: 300px;
        }
        @media screen and (max-width: 1439px) and (min-width: 1201px){
          width: 337px;
        }
      }
    }
  }
  .icon {
    font-size: 22px;
    margin-right: 10px;
  }
  .title{
    margin-right: 16px;
    min-width: 100px;

    @media screen and (max-width: 1023px) {
      margin-right: 0;
    }
  }
  .line {
    height: 1.5px;
    background: #E4E8EF;
    width: 408px;
    margin-right: 18px;

    &.passed {
      background: #8075DC;
    }

    @media screen and (max-width: 1023px) and (min-width: 600px) {
      width:200px;
    }
    @media screen and (max-width: 1200px) and (min-width: 1024px) {
      width: 300px;
    }
    @media screen and (max-width: 1439px) and (min-width: 1201px){
      width: 337px;
    }
  }
  .current-step{
    color: #FFA117;
  }
  .passed {
    color: #8075DC;
  }

}

</style>
