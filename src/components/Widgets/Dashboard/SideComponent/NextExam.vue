<template>
  <div class="next-exam">
    <div class="title">
      <div class="base-title">تا آزمون بعدی</div>
      <div class="exam ellipsis"> ( آزمون پنجم - پایه یازدهم رشته انسانی )</div>
    </div>
    <div class="time-section">
      <div class="time">2:30:15</div>
      <div class="remaining">
        <span class="hidden">روز</span>
        مانده
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextExam'
}
</script>

<style scoped lang="scss">
.next-exam {
  width: 100%;
  background: #FFB74D;
  border-radius: 16px;
  margin-top: 30px;
  padding: 20px 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1439px) {
    padding: 20px 30px;
  }
  @media screen and (max-width: 1023px) {
    margin-top: 20px;
    padding: 30px;
  }
  @media screen and (max-width: 599px) {
    padding: 10px 16px;
    flex-direction: column;
    align-items: initial;
  }
  .title {
    display: flex;
    align-items: center;
    .base-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      margin-right: 4px;
      @media screen and (max-width: 1439px) {
        font-size: 18px;
        line-height: 28px;
      }
      @media screen and (max-width: 1023px) {
        font-size: 16px;
        line-height: 25px;
      }
      @media screen and (max-width: 599px) {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .exam {
      @media screen and (max-width: 1439px) {
        font-size: 14px;
        line-height: 22px;
      }
      @media screen and (max-width: 1023px) {}
      @media screen and (max-width: 599px) {
        font-size: 12px;
        line-height: 19px;
      }
    }
  }
  .time-section {
    display: flex;
    align-items: center;
    @media screen and (max-width: 599px) {
      align-self: flex-end;
    }
    .time {
      margin-right: 4px;
      font-weight: 700;
      font-size: 24px;
      line-height: 37px;
      @media screen and (max-width: 1439px) {
        font-size: 20px;
        line-height: 31px;
      }
      @media screen and (max-width: 599px) {
        font-size: 16px;
        line-height: 25px;
      }
    }
    .remaining {
      font-size: 18px;
      line-height: 28px;
      @media screen and (max-width: 1439px) {
        font-size: 16px;
        line-height: 25px;
      }
      @media screen and (max-width: 599px) {
        font-size: 12px;
        line-height: 19px;
      }
    }
  }
}
</style>
