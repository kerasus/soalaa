<template>
<p class="test">
  hi im landing
</p>
  <landing-header ></landing-header>
  <why/>
  <features />
</template>

<script>
import landingHeader from 'src/components/landing/header'
import why from 'src/components/landing/why3A'
import features from 'src/components/landing/3aFeatures'
export default {
  name: 'landing',
  components: {
    landingHeader,
    why,
    features
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/YekanBakh.scss';

</style>
