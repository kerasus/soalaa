<template>
  <div class="user-app-bar-container">
    <div class="app-bar">
      <div class="user-header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="user-logo-section">
          <!--          <div class="hamburger hamburger-1">-->
          <!--            <q-btn-->
          <!--              flat-->
          <!--              @click="toggleLeftDrawer"-->
          <!--            >-->
          <!--              <svg width="24"-->
          <!--                   height="24"-->
          <!--                   viewBox="0 0 24 24"-->
          <!--                   fill="none"-->
          <!--                   xmlns="http://www.w3.org/2000/svg">-->
          <!--                <path d="M3 7H21"-->
          <!--                      stroke="#6D708B"-->
          <!--                      stroke-width="1.5"-->
          <!--                      stroke-linecap="round" />-->
          <!--                <path d="M3 12H21"-->
          <!--                      stroke="#6D708B"-->
          <!--                      stroke-width="1.5"-->
          <!--                      stroke-linecap="round" />-->
          <!--                <path d="M3 17H21"-->
          <!--                      stroke="#6D708B"-->
          <!--                      stroke-width="1.5"-->
          <!--                      stroke-linecap="round" />-->
          <!--              </svg>-->
          <!--            </q-btn>-->
          <!--          </div>-->
          <div
            class="drawer-btn hamburger"
            :style="{ visibility: isUserLogin ? 'visible' : 'hidden' }"
          >
            <q-btn
              class="toolbar-button"
              icon="isax:menu-1"
              color="white"
              text-color="accent"
              dense
              unelevated
              @click="toggleLeftDrawer"
            />
          </div>
          <div class="logo-pic">
            <q-btn flat
                   :to="{name: 'HomePage'}"
                   class="homepage"
            >
              <q-img
                class="logo-pic-img"
                src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"
              />
            </q-btn>
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="user-tab-section">
          <q-list class="flex tabs-list">
            <q-item
              v-for="(item, index) in headerItems"
              :key="index"
              v-ripple
              clickable
              :active="isRouteSelected(item.to)"
              active-class="active-item"
              :to="{ name: item.to }"
            >
              <q-item-section class="tab-title">
                {{ item.title }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action">
          <div>
            <!--            <q-btn-->
            <!--              icon="isax:notification"-->
            <!--              unelevated-->
            <!--              rounded-->
            <!--              size="12px"-->
            <!--              class="action-btn"-->
            <!--            />-->
            <q-btn
              icon="isax:shopping-bag"
              unelevated
              rounded
              size="12px"
              class="action-btn"
              :to="{name: 'cart'}"
            />
          </div>
          <q-btn
            v-if="isUserLogin"
            flat
            class="btn-user-profile"
          >
            <q-img
              class="user-photo"
              :src="user.photo"
              width="48px"
              height="48px"
            />
          </q-btn>
          <div
            v-else
            class="sub-mit-box"
          >
            <q-btn
              unelevated
              class="btn-style"
              label="ورود"
              :to="{ name: 'login' }"
            />
            <q-btn
              unelevated
              color="primary"
              class="btn-style"
              label="ثبت نام"
              :to="{ name: 'login' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { User } from 'src/models/User'

export default {
  name: 'UserTemplateHeader',
  data () {
    return {
      selected: '',
      headerItems: [
        {
          selected: 'exams',
          title: 'آزمون های سه‌آ',
          to: 'User.Exam.List'
        },
        {
          selected: 'questionBank',
          title: 'بانک سوالا',
          to: 'User.Create.Exam'
        }
        // {
        //   selected: 'soalaMag',
        //   title: 'سوالامگ',
        //   to: ''
        // },
        // {
        //   selected: 'askedQuestions',
        //   title: 'سوالات متداول',
        //   to: ''
        // },
        // {
        //   selected: 'contactUs',
        //   title: 'تماس با ما',
        //   to: ''
        // }
      ]
    }
  },
  computed: {
    ...mapGetters('Auth', [
      'user'
    ]),
    ...mapGetters('AppLayout', [
      'layoutLeftDrawerVisible'
    ]),
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    },
    isRouteSelected () {
      return (itemName) => {
        return (this.$route.name === itemName)
      }
    }
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    }
  }
}
</script>

<style scoped lang="scss">
.user-panel-bare-layout {
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .user-side-bar {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}

.user-app-bar-container {
  background-color: #fff;
  height: 72px;
  width: 100%;
  @media screen and (max-width: 1023px) {
    height: 64px;
  }
  @media screen and (max-width: 599px) {
    background-color: #F4F6F9;
  }
  .app-bar {
    max-width: 1360px;
    //min-width: 1360px;
    margin: auto;
    height: 72px;
    @media screen and (max-width: 1919px) {
      width: 100%;
      //padding-left: 40px;
      //padding-right: 40px;
    }
    @media screen and (max-width: 1439px) {
      padding-left: 35px;
      padding-right: 35px;
    }
    @media screen and (max-width: 1023px) {
      padding-left: 20px;
      padding-right: 20px;
      height: 64px;
    }
    .user-header-section {
      display: grid;
      grid-template-columns: 132px auto 156px;
      height: 100%;
      @media screen and (max-width: 1023px) {
        grid-template-columns: auto auto;
      }
      @media screen and (max-width: 599px) {
        grid-template-columns: 1fr;
      }
      .user-logo-section {
        align-items: center;
        display: flex;
        @media screen and (max-width: 1023px) {
          justify-self: start;
        }
        @media screen and (max-width: 599px) {
          justify-self: center;
          justify-content: space-between;
          width: 100%;
        }
        .logo-pic {
          cursor: pointer;
          display: flex;
          height: 72px;
          align-items: center;
          @media screen and (max-width: 1023px) {
            height: 64px;
          }
          :deep(.homepage.q-btn) {
            .q-btn__content {
              margin: 0;
            }
            .logo-pic-img {
              height: 72px;
              width: 72px;
              @media screen and (max-width: 1023px) {
                height: 48px;
                width: 48px;
              }
            }
          }
          //img {
          //
          //}
        }
        .hamburger {
          display: none;
          @media screen and (max-width: 1023px) {
            display: block;
            margin-right: 20px;
          }
        }
        .drawer-btn {
          :deep(.q-btn) {
            flex-direction: row !important;
          }
        }
      }
      .user-tab-section {
        height: 72px;
        .tabs-list {
          height: 72px;
          .tab-title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
          }
        }
        @media screen and (max-width: 1023px) {
          height: 64px;
          display: none;
        }
      }
      .active-item {
        color: #9690E4;
      }
      .user-action {
        .sign-up-btn {
          :deep(.q-btn .q-btn__content) {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        @media screen and (max-width: 1023px) {
          justify-self: end;
          height: 64px;
        }
        @media screen and (max-width: 599px) {
          display: none;
        }
        display: flex;
        //justify-content: flex-end;
        align-items: center;
        height: 72px;
        justify-self: end;
        .btn-user-profile {
          margin-left: 18px;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          :deep(.q-btn__content) {
            margin: 0;
            .user-photo {
              img {
                border: 2px solid #FFB74D;
                border-radius: 16px;
                max-width: 100%;
                width: 100%;
              }
            }
          }
        }
        .action-btn {
          margin: 4px;
        }
        .fit-profile-img {
          width: 48px;
          height: 48px;
          border-radius: 16px;
        }
      }
    }
  }
  .sub-mit-box{
    background: #FFFFFF;
    border-radius: 16px;
    display: flex;
    margin-bottom: 0px;
    padding: 0px;

    .btn-style{
      width: 96px;
      color: #6D708B;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      align-items: center;
      text-align: center;
      letter-spacing: -0.03em;
    }
  }
}
</style>
