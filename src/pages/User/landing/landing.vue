<template>
  <div class="landing-page">
    <nav-bar @onClickRegisterBtn="scrollToExamsTable"
             @onClickConditionsBtn="scrollToExamRules"
             @onClickFaqsBtn="scrollToFaqs"
             @onClickUserExamListBtn="goToUserExamList" />
    <landing-header @onClickRegisterBtn="scrollToExamsTable" />
    <why class="landing-width" />
    <banner class="landing-width" />
    <features class="landing-width" />
    <submit-table ref="SubmitTable"
                  class="landing-width" />
    <exam-rules ref="ExamRules"
                class="landing-width" />
    <faq ref="Faq"
         class="landing-width" />
    <landing-footer />
  </div>
</template>

<script>
import { scroll } from 'quasar'
import faq from 'src/components/landing/faq.vue'
import why from 'src/components/landing/why3A.vue'
import NavBar from 'src/components/landing/NavBar.vue'
import banner from 'src/components/landing/banner.vue'
import features from 'src/components/landing/3aFeatures.vue'
import examRules from 'src/components/landing/examRules.vue'
import submitTable from 'src/components/landing/submitTable.vue'
import LandingHeader from 'src/components/landing/LandingHeader.vue'
import LandingFooter from 'src/components/landing/3a-exams/LandingFooter.vue'

export default {
  name: 'landing',
  components: {
    LandingHeader,
    why,
    features,
    NavBar,
    submitTable,
    examRules,
    banner,
    LandingFooter,
    faq
  },
  methods: {
    goToUserExamList () {
      this.$router.push({
        name: 'User.Exam.List'
      })
    },
    scrollToExamsTable () {
      this.scrollTo('SubmitTable')
    },
    scrollToExamRules () {
      this.scrollTo('ExamRules')
    },
    scrollToFaqs () {
      this.scrollTo('Faq')
    },
    scrollTo (ref) {
      this.$nextTick(() => {
        const refObject = this.$refs[ref]
        if (!refObject) {
          return
        }
        const scrollTargetElement = refObject.$el
        const target = scroll.getScrollTarget(scrollTargetElement)
        const offset = scrollTargetElement.offsetTop
        const duration = 500
        scroll.setVerticalScrollPosition(target, offset, duration)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page{
  background: linear-gradient(-134deg, #EAB311 -52.45%, rgba(255, 255, 255, 0) 48.84%);
  &:deep(.landing-width){
     width: 1110px;
     margin: auto;
    @media screen and (max-width: 1439px) {
      width: 930px;
    }
    @media screen and (max-width: 1023px) {
      width: 690px;
    }
    @media screen and (max-width: 768px) {
      width: 510px;
    }
    @media screen and (max-width: 599px) {
      width: 100%;
      padding: 0 16px;
    }
   }

}
</style>
<style  lang="scss">
@import 'src/assets/scss/Peyda.scss';
.landing-page{
  *{
    font-family: 'peyda';
  }
}
</style>
