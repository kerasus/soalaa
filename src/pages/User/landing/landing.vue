<template>
  <div class="landing-page">
    <nav-bar @onClickRegisterBtn="scrollToExamsTable" />
    <landing-header @onClickRegisterBtn="scrollToExamsTable" />
    <why class="landing-width" />
    <banner class="landing-width" />
    <features class="landing-width" />
    <submit-table ref="SubmitTable"
                  class="landing-width" />
    <exam-rules class="landing-width" />
    <faq class="landing-width" />
    <footer-component />
  </div>
</template>

<script>
import NavBar from 'src/components/landing/NavBar'
import landingHeader from 'src/components/landing/header'
import why from 'src/components/landing/why3A'
import features from 'src/components/landing/3aFeatures'
import examRules from 'components/landing/examRules'
import banner from 'components/landing/banner'
import submitTable from 'components/landing/submitTable'
import faq from 'components/landing/faq'
import footerComponent from 'components/landing/3a-exams/footer.vue'
import { scroll } from 'quasar'

export default {
  name: 'landing',
  components: {
    landingHeader,
    why,
    features,
    NavBar,
    submitTable,
    examRules,
    banner,
    footerComponent,
    faq
  },
  created () {
    this.closeSidBarAndAppbar()
  },
  methods: {
    scrollToExamsTable () {
      this.scrollTo('SubmitTable')
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
    },
    closeSidBarAndAppbar () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      this.$store.commit('AppLayout/updateLayoutHeaderVisible', false)
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
