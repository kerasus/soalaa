<template>
  <div class="subscription-status">

  </div>
</template>

<script>
export default {
  name: 'SubscriptionStatus'
}
</script>

<style scoped lang="scss">
.subscription-status {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
  border-radius: 16px;
  height: 489px;
  @media screen and (max-width: 1439px) {
    height: 410px;
  }
  @media screen and (max-width: 1023px) {
    height: 443px;
  }
  @media screen and (max-width: 1023px) {
    height: 312px;
  }
}
</style>
