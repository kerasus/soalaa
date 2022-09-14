<template>
  <div class="footer-row">
    <div class="footer-logo-item">
      <a href="https://alaatv.com">
        <q-img src="https://nodes.alaatv.com/upload/landing/logo.png"
               alt="آلاء"
        />
      </a>
    </div>
    <div class="footer-logo-item">
      <a href="https://trustseal.enamad.ir/?id=294345&code=GxeQYgRGNFFOLcO4o81Q"
         target="_blank">
        <q-img src="https://trustseal.enamad.ir/Content/Images/Star/star1.png?v=5.0.0.47"
               alt="enamad.ir"
               style="cursor:pointer"
        />
      </a>
    </div>
    <div class="footer-logo-item">
      <router-link :to="{name: 'dashboard'}">
        <q-img src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"></q-img>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingFooter'
}
</script>

<style lang="scss" scoped>
.footer-row {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  background: #e1e1e1;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top: solid 1px #d5d5d5;
  border-bottom: solid 1px #d5d5d5;
  .footer-logo-item {
    width: 100px;
    padding-right: 10px;
    padding-left: 10px;
    .q-img,
    svg {
      max-width: 100%;
    }
  }
}
</style>
