<template>
  <div>
    <div class="banner-section">

    </div>
  </div>
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style lang="scss" scoped>
.banner-section{
  height: 317px;
  background: #EEEEEE;
  border-radius: 24px;
  margin-bottom: 104px;
  border: 1px solid black;
  @media screen and (max-width: 1439px){
    height: 257px;
    margin-bottom: 64px;
  }
  @media screen and (max-width: 1023px){

  }
  @media screen and (max-width: 764px){
    height: 197px;

  }
  @media screen and (max-width: 599px){
    height: 239px;
    margin-bottom: 40px;
  }
}
</style>
