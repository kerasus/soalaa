<template>
  <div class="faq-container">
    <div class="faq-title">سوالات متداول</div>
    <q-list class="faq-list">
      <q-expansion-item
        v-for="(item, index) in info"
        :key="index"
        dense
        :default-opened="index === 0 ? true : false"
        icon="format_quote"
        class="faq-item"
      >
        <template v-slot:header>
          <q-item-section class="faq-item-header">
            <q-icon
              name="format_quote"
              class="faq-item-header-icon"
              color="primary"
              size="28px"

            />
            <div class="faq-item-label">
              {{ item.key }}
            </div>
          </q-item-section>
        </template>

        <q-card class="faq-item-content">
          <q-card-section>
            {{ item.value }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'FAQ',
  props: {
    getData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.get(API_ADDRESS.subscription.landing)
        .then(res => {
          this.info = res.data.data.questions
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .faq-container {
    width: 100%;
    margin-bottom: 177px;

    .faq-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      letter-spacing: -0.03em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 0 24px;
      color: #434765;

      @media screen and (max-width: 1023px) {
        padding: 60px 0 24px;
      }

      @media screen and (max-width: 599px) {
        padding: 40px 0 24px;
      }
      @media screen and (max-width: 600px) {
        padding: 40px 0 20px;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
      }
    }

    .faq-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .faq-item {
        width: 100%;
        max-width: 898px;
        background: #FFFFFF;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 12px;
        margin: 8px 0;

        &:deep(.q-item) {
          min-height: 64px;
          height: auto;
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.03em;
          color: #6D708B;
          border-radius: 12px;

          @media screen and (max-width: 600px) {
            min-height: 64px;
            height: auto;
          }
          @media screen and (max-width: 390px) {
            font-size: 16px;
            line-height: 25px;
            min-height: 64px;
            height: auto;
          }
          .faq-item-label {
            width: calc(100% - 36px);
          }
        }

        &:deep(.q-expansion-item__toggle-icon) {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #F2F5F9;
        }

        .faq-item-header{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          padding: 0px 40px;
          border-radius: 12px;

          .faq-item-header-icon {
            margin-right: 5px;
          }
          @media screen and (max-width: 1023px) {
            align-items: flex-start;
            padding: 18px 0px 7px;
          }
          //@media screen and (max-width: 599px) {
          //  padding: 0px 20px;
          //}
        }

        .faq-item-content {
          font-style: normal;
          padding: 0 96px 0 65px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.03em;
          color: #6D708B;
          border-radius: 12px;
          :deep(.q-card__section) {
            padding-top: 0;
            padding-bottom: 22px;
            @media screen and (max-width: 600px) {
              padding-bottom: 20px;
            }
          }
          @media screen and (max-width: 600px) {
            padding: 0 55px 0 45px;
          }
          @media screen and (max-width: 390px) {
            padding: 0 45px 0 45px;
          }
        }

        @media screen and (max-width: 1023px) {
          width: 90%;
        }
        @media screen and (max-width: 600px) {
          width: 90%;
        }
        @media screen and (max-width: 390px) {
          width: 90%;
        }
      }
      :first-child {
        margin-top: 0;
      }
    }
  }
</style>
