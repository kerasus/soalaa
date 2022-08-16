<template>
  <div class="landing-page">
    <submit-table class="landing-width" />
    <nav-bar class="landing-width" />
    <landing-header  />
    <why class="landing-width"/>
    <features class="landing-width"/>

  </div>
</template>

<script>
import NavBar from 'src/components/landing/NavBar'
import landingHeader from 'src/components/landing/header'
import why from 'src/components/landing/why3A'
import features from 'src/components/landing/3aFeatures'
import submitTable from 'components/landing/submitTable'
export default {
  name: 'landing',
  components: {
    landingHeader,
    why,
    features,
    NavBar,
    submitTable
  },
  mounted () {
    this.closeSidBarAndAppbar()
  },
  methods: {
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
    @media screen and (max-width: 600px) {
      width: 100%;
    }
   }

}
</style>
<style  lang="scss">
@import 'src/assets/scss/YekanBakh.scss';
.landing-page{
  *{
    font-family:'yekanbakh' ;
  }
}
</style>
