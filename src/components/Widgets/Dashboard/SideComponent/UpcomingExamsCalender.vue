<template>
  <div class="upcoming-calender">
    <div class="box">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpcomingExamsCalender'
}
</script>

<style scoped lang="scss">
.upcoming-calender {
  @media screen and (max-width: 1023px) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1023px) {
    margin-bottom: 16px;
  }
  .box {
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
    border-radius: 16px;
    height: 489px;
    margin-right: 30px;
    @media screen and (max-width: 1439px) {
      margin-right: 24px;
      height: 394px;
    }
    @media screen and (max-width: 1023px) {
      margin-right: 0;
      height: 473px;
    }
    @media screen and (max-width: 1023px) {
      height: 498px;
    }
  }
}
</style>
