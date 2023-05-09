<template>
  <div class="page-width"
       :style="options.style">
    <div class="tab-panel-container">
      <q-tabs
        v-model="activeTab"
        inline-label
        outside-arrows
        mobile-arrows
        left-icon="isax:arrow-left-2"
        right-icon="isax:arrow-right-3"
        indicator-color="transparent"
        active-class="active-tab"
        class="tab-box"
      >
        <q-tab v-for="(tab, index) in options.tabs"
               :key="index"
               :name="index"
               :icon="tabIcon(index, tab.icon, tab.icon2)"
               class="tab-style"
               :label="tab.title"
        />
      </q-tabs>
      <q-tab-panels v-model="activeTab"
                    animated
                    class="tab-content">
        <q-tab-panel v-for="(tabData, index) in options.tabs"
                     :key="index"
                     class="q-pa-none tab-panel-box"
                     :name="index">
          <div class="content">
            <div class="title"> {{ tabData.title }}</div>
            <span class="description"
                  v-html="tabData.editor"></span>
            <div v-if="tabData.button.url"
                 class="more-detail text-right">
              <q-btn
                flat
                :href="tabData.button.url"
                :style="{background: tabData.button.bgColor, color: tabData.button.color}"
                class="btn"
                padding="9px 17px"
                icon-right="west"
                :label="tabData.button.text" />
            </div>
          </div>
          <div class="img-box">
            <q-img class="img"
                   :src="tabData.image" />
          </div>
        </q-tab-panel>
      </q-tab-panels>

    </div>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'TabPanel',
  data: () => ({
    tabs: [],
    activeTab: 0
  }),
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created() {
    // this.initPageData()
  },
  methods: {
    tabIcon(index, icon, icon2) {
      const iconImg = index === this.activeTab ? icon : icon2
      return 'img:' + iconImg
    },
    async initPageData() {
      this.loading = true
      try {
        const response = await this.$axios.get(API_ADDRESS.homePage.base)
        this.tabs = response.data.data.tabs
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-width {
  //width: 100%;
  //display: flex;
  //justify-content: center;
  margin: auto;
  @media screen and (max-width: 1439px) {
    //width: 954px;
    //width: 100%;
  }
  @media screen and (max-width: 1023px) {
    //width: 540px;
    //width: 100%;
  }
  @media screen and (max-width: 599px) {
    //display: flex;
    //flex-wrap: wrap;
    //width: 100%;
    padding-left: 19px;
    padding-right: 19px;
  }

  .tab-panel-container {
    margin-bottom: 80px;
    @media screen and (max-width: 1439px) {
      margin-bottom: 40px;
    }

    @media screen and (max-width: 599px) {
      width: 100%
    }

    .active-tab {
      :deep(.q-tab__label) {
        color: #9690E4 !important;
      }
    }

    .active-container {
      color: #9690E4;
    }

    .tab-box {
      :deep(.q-icon) {
        font-size: 20px;
        color: var(--Text-2);
      }

      @media screen and (max-width: 1023px) {
        width: 265px;
        margin: auto auto 16px;
      }

      .tab-style {
        width: 202px;
        margin: 0 15px 24px 15px;
        height: 60px;

        &:deep(.q-tab__label) {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.03em;
          color: #8A8CA6;
          @media screen and (max-width: 1439px) {
            font-size: 16px;
            line-height: 25px;
          }
          @media screen and (max-width: 1023px) {
            font-size: 18px;
            line-height: 28px;
          }
        }

        &:deep(.q-tab__content) {
          .q-icon {
            width: 28px;
            height: 28px;
          }
        }

        @media screen and (max-width: 1023px) {
          margin: 0;
        }
      }
    }

    .tab-content {
      background: rgba(228, 232, 239, .6);
      border-radius: 20px;
      padding: 40px 80px;
      @media screen and (max-width: 1439px) {
        flex-direction: column;
        padding: 36px;
      }
      @media screen and (max-width: 1023px) {
        padding: 24px;
      }
      @media screen and (max-width: 599px) {
        padding: 20px;
      }
      &:deep(.q-panel) {
        overflow: hidden;
      }

      .tab-panel-box {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1439px) {
          flex-direction: column;
          align-items: center;
        }

        .content {
          margin-right: 40px;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: min-content;
          padding-top: 20px;
          @media screen and (max-width: 1439px) {
            margin-right: 0;
            margin-bottom: 20px;
            padding-top: 0px;
          }

          .title {
            font-weight: 700;
            font-size: 24px;
            line-height: 37px;
            letter-spacing: -0.03em;
            color: #434765;
            margin-bottom: 24px;
            @media screen and (max-width: 1439px) {
              margin-bottom: 16px;
            }
            @media screen and (max-width: 1023px) {
              margin-bottom: 10px;
              font-size: 20px;
              line-height: 31px;
            }
            @media screen and (max-width: 599px) {
              font-size: 18px;
              line-height: 28px;
            }
          }

          .description {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            text-align: justify;
            letter-spacing: -0.03em;
            color: #434765;
            margin-bottom: 31px;
            width: 586px;
            @media screen and (max-width: 1439px) {
              margin-bottom: 6px;
              font-size: 18px;
              line-height: 28px;
              width: 100%;
            }
            @media screen and (max-width: 1023px) {
              margin-bottom: 10px;
              font-size: 16px;
              line-height: 25px;
            }
            @media screen and (max-width: 599px) {
              font-size: 14px;
              line-height: 22px;
              margin-bottom: 16px;
            }
          }

          .more-detail {
            align-self: flex-end;

            .btn {
              //color: #8075DC;
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 28px;
              letter-spacing: -0.03em;
              @media screen and (max-width: 1439px) {
                font-size: 16px;
                line-height: 25px;
                padding: 0 !important;
              }

              &:deep(.q-btn__content) {
                margin: 0;
              }

              &:deep(.q-icon) {
                font-size: 22px;
                @media screen and (max-width: 1023px) {
                  font-size: 16px;
                  line-height: 25px;
                }
              }
            }
          }
        }

        .img-box {
          width: 576px;
          border-radius: 20px;
          @media screen and (max-width: 1439px) {
            width: 502px;
            border-radius: 16px;
          }
          @media screen and (max-width: 1023px) {
            width: 492px;
          }
          @media screen and (max-width: 599px) {
            border-radius: 12px;
            width: 272px
          }

          .img {
            width: 100%;
            height: 100%;
            border-radius: inherit;
          }
        }
      }
    }
  }
}

</style>
