<template>
  <div>
    <div class="banner-section">
      <a href="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/Binder1.pdf"
         target="_blank">
        <q-img class="extra-large"
               src="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/seA_Desktop.png"></q-img>
        <q-img class="large"
               src="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/Desktop_HD.png"></q-img>
        <q-img class="medium"
               src="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/Tablet_(Medium).png"></q-img>
        <q-img class="small"
               src="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/Tablet_(Small).png"></q-img>
        <q-img  class="extra-small"
                src="https://nodes.alaatv.com/upload/landing/3a/TATABOGH/Mobile_(Extra_small).png"></q-img>
      </a>
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
  //background: #EEEEEE;
  border-radius: 24px;
  margin-bottom: 104px;

  img{
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  .large,.medium,.small,.extra-small{
    display: none;
  }
  @media screen and (max-width: 1439px){
    height: 257px;
    margin-bottom: 64px;
    .extra-large{
      display: none;
    }
    .large{
      display: block;
    }
  }
  @media screen and (max-width: 1023px){
    .large{
      display: none;
    }
    .medium{
      display: block;
    }
  }
  @media screen and (max-width: 764px){
    height: 197px;
    .medium{
      display: none;
    }
    .small{
      display: block;
    }

  }
  @media screen and (max-width: 599px){
    height: auto;
    margin-bottom: 40px;
   .small{
      display: none;
    }
    .extra-small{
      display: block;
    }
  }
}
</style>
