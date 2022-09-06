<template>
  <div class="dashboard-header">
    <div class="box">
      <div class="header">
        <div>آزمون‌های ثبت‌نام شده‌</div>
      </div>
      <div class="footer">
        45
        <span class="exam">آزمون</span>
      </div>
    </div>
    <div class="box">
      <div class="header exam-create">
        <div>آزمون‌های ساخته شده</div>
        <q-btn
          class="exam-create-btn"
          icon="isax:add"
          round
          flat
          dense
          size="md"
        >
          <span v-if="windowSize.x > 1439">ساخت آزمون</span>
        </q-btn>
      </div>
      <div class="footer">
        55
        <span class="exam">آزمون</span>
      </div>
    </div>
    <div class="box">
      <div class="header exam-plus">
        <div>سفارش‌های من‌</div>
        <q-btn
          class="exam-plus-btn"
          icon="isax:arrow-left-2"
          round
          flat
          dense
          size="md"
        ></q-btn>
      </div>
      <div class="footer">
        10
        <span class="exam">آزمون</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHeader',
  computed: {
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  text-align: left;
  letter-spacing: -0.03em;
  color: #434765;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }

  .box {
    min-width: 220px;
    height: 150px;
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
    border-radius: 16px;
    margin: 0 15px;
    padding: 20px 30px;
    display: grid;
    grid-template-rows: auto auto;
    @media screen and (max-width: 1023px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header {
      display: flex;
      align-items: center;
      align-self: flex-start;
      justify-content: space-between;
      :deep(.q-btn) {
        border-radius: 12px;
        color: #8075DC;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        background: #f4f3ff;
        .q-btn__content {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      &.exam-create {
        :deep(.q-btn--dense.q-btn--round) {
            min-height: 24px;
        }
        :deep(.q-btn) {
          .q-icon {
            font-size: 16px;
          }
        }
        @media screen and (max-width: 1439px) {
          :deep(.q-btn--dense.q-btn--round) {
            min-height: 34px;
          }
          :deep(.q-btn) {
            border-radius: 50%;
            .q-icon {
              font-size: 18px;
            }
          }
        }
      }
      &.exam-plus {
        :deep(.q-btn) {
          border-radius: 50%;
          .q-icon {
            font-size: 16px;
          }
        }
      }
    }
    .footer {
      align-self: end;
      text-align: right;
      font-weight: 700;
      font-size: 40px;
      line-height: 28px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .exam {
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        padding-left: 8px;
      }
    }
    @media screen and (max-width: 1919px) {

    }
    @media screen and (max-width: 1439px) {
      height: 130px;
    }
    @media screen and (max-width: 1023px) {
      height: 80px;
    }
    @media screen and (max-width: 1919px) {}
  }
}
</style>
