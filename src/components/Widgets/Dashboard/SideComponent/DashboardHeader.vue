<template>
  <div class="dashboard-header">
    <div class="box signed-exams">
      <div class="header">
        <div>آزمون‌های ثبت‌نام شده‌</div>
      </div>
      <div class="footer">
        {{statistics.register_exam}}
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
          :to="{name:'User.Create.Exam'}"
          size="md"
        >
          <span v-if="windowSize.x > 1439">ساخت آزمون</span>
        </q-btn>
      </div>
      <div class="footer exam-create">
        {{statistics.self_exam}}
        <span class="exam">آزمون</span>
        <q-btn
          class="exam-create-btn md-hide"
          icon="isax:add"
          round
          flat
          dense
          :to="{name:'User.Create.Exam'}"
          size="md"
        ></q-btn>
      </div>
    </div>
    <div class="box orders">
      <div class="header exam-plus">
        <div class="title">سفارش‌های من‌</div>
        <div class="md-hide mobile-order-title">سفارش‌ها‌</div>
        <q-btn
          class="exam-plus-btn"
          icon="isax:arrow-left-2"
          round
          flat
          dense
          size="md"
          :to="{name: 'User.MyOrders'}"
        ></q-btn>
      </div>
      <div class="footer exam-plus">
        {{statistics.self_order}}
        <span class="exam">آزمون</span>
        <q-btn
          class="exam-plus-btn md-hide"
          icon="isax:arrow-left-2"
          round
          flat
          dense
          size="md"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'DashboardHeader',
  data() {
    return {
      statistics: []
    }
  },
  computed: {
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    getStatistics() {
      this.$axios.get(API_ADDRESS.user.statistics).then((res) => {
        this.statistics = res.data.data
      })
    }
  },
  created() {
    this.getStatistics()
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
  .signed-exams {
    margin-left: 0;
  }
  .orders {
    margin-right: 0;
    @media screen and (max-width: 1023px) {
      margin-bottom: 0px !important;
    }
  }
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 599px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

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
    @media screen and (max-width: 1439px) {
      height: 130px;
    }
    @media screen and (max-width: 1023px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      margin-right: 0px;
      margin-left: 0px;
      margin-bottom: 20px;
      &.signed-exams {
        .footer {
          margin-right: 48px;
        }
      }
    }
    @media screen and (max-width: 599px) {
      padding-right: 16px;
      padding-left: 16px;
    }
    .header {
      display: flex;
      align-items: center;
      align-self: flex-start;
      justify-content: space-between;
      .title {
        @media screen and (max-width: 1023px) {
          display: none;
        }
      }
      .mobile-order-title {
        @media screen and (min-width: 1024px) {
          display: none;
        }
      }
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
          @media screen and (max-width: 599px) {
            margin: 4px;
          }
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
        @media screen and (max-width: 599px) {
          :deep(.q-btn--dense.q-btn--round) {
            min-height: 24px;
            font-size: 10px;
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
        @media screen and (max-width: 1023px) {}

      }
      @media screen and (max-width: 1023px) {
        align-self: center;
        .exam-create-btn {
          display: none;
        }
        .exam-plus-btn {
          display: none;
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
          @media screen and (max-width: 599px) {
            margin: 4px;
          }
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
        @media screen and (max-width: 599px) {
          :deep(.q-btn--dense.q-btn--round) {
            min-height: 24px;
            font-size: 10px !important;
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
      @media screen and (max-width: 1023px) {
        line-height: 40px;
      }
      @media screen and (max-width: 599px) {
        font-weight: 600;
        font-size: 30px;
        .exam {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }
      }
      @media screen and (min-width: 1024px) {
        .exam-create-btn {
          display: none;
        }
        .exam-plus-btn {
          display: none;
        }
      }
      .exam-create-btn {
        margin-left: 16px;

      }
      .exam-plus-btn {
        margin-left: 16px;
        @media screen and (max-width: 599px) {
          font-size: 10px !important;
        }
      }
    }
  }
}
</style>
