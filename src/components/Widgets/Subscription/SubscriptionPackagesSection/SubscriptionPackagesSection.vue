<template>
  <div class="packages-container">
    <div class="row packages-row">
      <div class="col-12 packages-col">
        <div class="package-slogan">
          شروع فاز آزمایشی بانک سوالا
        </div>
        <div class="package-subtitle">
          میتونی با فعال سازی اشتراک آزمایشی سوالا، به طور رایگان از بانک سوالا و ساخت آزمون‌های شخصی لذت ببری
        </div>
      </div>
    </div>
    <div class="q-pa-md row justify-center q-mt-lg">
      <q-banner inline-actions
                rounded
                style="width: 90vw"
                class="bg-orange text-white text-center q-mb-md">
        این قسمت به زودی در دسترس خواهد یود
      </q-banner>
    </div>
    <div class="row packages-row">
      <div class="col-12 packages-col">
        <div class="packages-wrapper">
          <div v-for="(item, index) in packageList"
               :key="index"
               class="package-item">
            <div class="package-item-header">
              <div class="package-item-header-title">
                {{item.title}}
              </div>
              <div class="package-item-header-duration">
                {{item.length}} روزه
              </div>
            </div>
            <div class="package-item-price">
              <div class="package-item-price-numeric">{{item.price}}</div>
              تومان
            </div>
            <ul class="package-item-feature-list">
              <li v-for="ability in item.abilities"
                  :key="ability"
                  class="package-item-feature-item">{{ability}}</li>
            </ul>
            <q-btn class="package-item-action-btn"
                   disable
                   label="شروع کنید"
                   unelevated
                   @click="subscribe(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import API_ADDRESS from 'src/api/Addresses'

export default defineComponent({
  name: 'SubscriptionPackageSection',
  data() {
    return ({
      packageList: {}
    })
  },
  created() {
    this.getData()
  },
  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    getData() {
      this.$axios.get(API_ADDRESS.subscription.list).then((res) => {
        this.packageList = res.data.data
      })
    },
    subscribe(id) {
      if (this.isUserLogin) {
        this.$axios.post(API_ADDRESS.subscription.register(id)).then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: 'User.Dashboard' })
          }
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.packages-container {
  .packages-row {
    .packages-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .package-slogan {
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 56px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #6D708B;
        margin-top: 60px;

        @media screen and (max-width: 600px) {
          font-size: 32px;
          line-height: 50px;
        }
        @media screen and (max-width: 390px) {
          font-size: 24px;
          line-height: 37px;
        }
      }
      .package-subtitle {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #6D708B;

        @media screen and (max-width: 1023px) {
          padding: 0 100px;
        }
        @media screen and (max-width: 600px) {
          padding: 0 30px;
          font-size: 16px;
          line-height: 25px;
        }
        @media screen and (max-width: 390px) {
          padding: 0 19px;
          font-size: 14px;
          line-height: 22px;
        }
      }

      .packages-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        .package-item {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 318px;
          min-height: 420px;
          margin: 60px 0;
          padding: 30px;
          background: #FFFFFF;
          border: 3px solid #E4E8EF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
          border-radius: 24px;

          .package-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-bottom: 24px;
            border-bottom: 2px solid #E4E8EF;

            .package-item-header-title {
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
              line-height: 37px;
              letter-spacing: -0.03em;
              color: #6D708B;
            }
            .package-item-header-duration {
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.03em;
              color: #8075DC;
              min-width: 51px;
            }
          }

          .package-item-price {
            display: flex;
            justify-content: center;
            align-items: center;
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            line-height: 46px;
            text-align: right;
            letter-spacing: -0.03em;
            color: #6D708B;
            padding: 18px 0 8px;

            .package-item-price-numeric {
              font-style: normal;
              font-weight: 700;
              font-size: 36px;
              line-height: 56px;
              letter-spacing: -0.03em;
              color: #9690E4;
              padding: 0 6px;
            }
          }

          .package-item-feature-list {
            width: 100%;
            padding: 0 0 0 20px;
            .package-item-feature-item {
              width: 100%;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              letter-spacing: -0.03em;
              color: #6D708B;

              &:not(:first-child, :last-child) {
                margin: 20px 0;
              }

              &::marker {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                color: #FFB74D;
              }

            }
          }

          .package-item-action-btn {
            width: 100%;
            background: #9690E4;
            border-radius: 8px;
            margin-top: 40px;
            color: #FFFFFF;
          }

          @media screen and (max-width: 1023px) {
            margin: 40px 0 60px;
          }
          @media screen and (max-width: 600px) {
            margin: 30px 0 60px;
          }
          @media screen and (max-width: 390px) {
            margin: 40px 0 60px;
          }
        }
      }
    }
  }
}
</style>
