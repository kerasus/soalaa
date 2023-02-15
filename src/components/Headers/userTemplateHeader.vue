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
          <!--                      :style="{ visibility: isUserLogin ? 'visible' : 'hidden' }"
-->
          <div
            class="drawer-btn hamburger"
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
            <div
              class="homepage"
            >
              <q-img
                class="logo-pic-img"
                src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"
                @click="routeTo('HomePage')"
              />
            </div>
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="user-tab-section">
          <q-list class="flex tabs-list">
            <div
              v-for="(item , index) in headerItems"
              :key="index"
              class="tabs-list-container"
            >
              <div
                v-if="showMenuItem(item)"
                class="self-center"
              >
                <q-item
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
              </div>
            </div>

            <div v-if="user.hasPermission('examStore') && $route.name === 'HomePage'"
                 class="self-center">
              <q-item v-ripple
                      clickable
                      :active="false"
                      active-class="active-item">
                <q-item-section v-if="!pageBuilderEditable"
                                class="tab-title"
                                @click="togglePageBuilderEditable">
                  ویرایش صفحه
                </q-item-section>
                <div v-else>
                  <q-btn square
                         color="positive"
                         icon="check"
                         @click="editPage" />
                  <q-btn square
                         class="q-ml-md"
                         color="negative"
                         icon="cancel"
                         @click="cancelEditPageBuilder" />
                  <q-btn square
                         class="q-ml-md"
                         color="primary"
                         icon="edit"
                         @click="togglePageBuilderEditable" />
                </div>
              </q-item>
            </div>
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
            <q-menu class="user-profile-dropdown"
                    :offset="[170, 10]">
              <div class="dropdown-box">
                <div class="header">
                  <div class="profile-box">
                    <div class="profile-detail">
                      <div class="profile-photo-box">
                        <div class="profile-photo-img">
                          <q-img
                            class="user-photo"
                            :src="user.photo"
                            width="60px"
                            height="60px"
                          />
                        </div>
                      </div>
                      <div
                        v-if="isUserLogin"
                        class="profile-detail-info"
                      >
                        <div class="info-name">{{user.full_name}}</div>
                        <div class="info-phoneNumber">{{user.mobile}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="body">
                  <div
                    class="user-panel-base-menu"
                  >
                    <q-list
                      class="side-menu-list"
                      padding
                      dark
                    >
                      <div
                        v-for="(item , index) in titlesList"
                        :key="index"
                      >
                        <div
                          v-if="showMenuItem(item)"
                        >
                          <q-expansion-item
                            v-if="item.children.length"
                            :header-style="{fontSize:'16px', height:'40px', borderRadius: '14px'}"
                            :label="item.title"
                            :icon="item.icon"
                            class="side-expansion-list"
                            dark
                          >
                            <div class="expansion-body">
                              <q-separator dark
                                           size="2px"
                                           vertical
                                           class="vertical-separator" />
                              <q-list class="list-expansion">
                                <q-item
                                  v-for="(subItem , i) in item.children"
                                  :key="i"
                                  :to="{ name: subItem.routeName, params: subItem.params }"
                                  class="list-child-item"
                                  :exact-active-class="getQItemExactActiveClass"
                                >
                                  <q-item-section
                                    class="list-child-section"
                                  >
                                    {{ subItem.displayName }}
                                  </q-item-section>
                                  <span class="indicator" />
                                </q-item>
                              </q-list>
                            </div>
                          </q-expansion-item>
                          <q-item
                            v-else
                            :to="(item.routeName) ? {name: item.routeName} : null"
                            class="item-list"
                            :class="{ 'alone-item': !item.children.length }"
                          >
                            <div class="section-title">
                              <q-item-section class="list-section title-icon"
                                              avatar>
                                <q-avatar :icon="item.icon"
                                          size="30" />
                              </q-item-section>
                              <q-item-section class="list-section">
                                {{ item.title }}
                              </q-item-section>
                              <span class="indicator" />
                            </div>
                          </q-item>
                        </div>
                      </div>
                    </q-list>
                    <div
                      v-if="isUserLogin"
                      class="log-out"
                      @click="logOut"
                    >
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">خروج </span>
                    </div>
                    <div
                      v-else
                      class="log-out"
                      @click="goToLogin"
                    >
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">ورود </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
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
import UserLayoutHeader from 'src/mixin/UserLayoutHeader'
// import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserTemplateHeader',
  mixins: [UserLayoutHeader],
  data () {
    return {
      selected: '',
      headerItems: [
        {
          selected: 'exams',
          title: 'آزمون های سه‌آ',
          to: 'User.Exam.List',
          permission: 'all'
        },
        {
          selected: 'questionBank',
          title: 'بانک سوالا',
          to: 'User.Create.Exam',
          permission: 'all'
        },
        {
          selected: 'questionBank',
          title: 'پنل ادمین',
          to: 'Admin.Exam.Index',
          permission: 'examStore'
        },
        {
          selected: 'soalaMag',
          title: 'سوالامگ',
          to: ''
        },
        {
          selected: 'askedQuestions',
          title: 'سوالات متداول',
          to: 'faq'
        },
        {
          selected: 'contactUs',
          title: 'تماس با ما',
          to: ''
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
      ],
      titlesList: [
        {
          title: 'پروفایل',
          icon: 'isax:user',
          routeName: 'User.Profile',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'آزمون های من',
          icon: 'isax:task-square',
          routeName: 'User.Exam.List',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'سفارش‌ ها',
          icon: 'isax:clipboard-text',
          routeName: 'User.MyOrders',
          permission: 'all',
          active: false,
          children: []
        }
      ]
    }
  },
  watch: {
    'windowSize.x': {
      handler() {
        this.updateLayout()
      }
    }
  },
  mounted() {
    this.updateLayout()
    this.addAdminItem()
  },
  computed: {
    pageBuilderEditable() {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
    },
    editPage() {
      const currentSections = this.$store.getters['PageBuilder/currentSections']
      // this.$store.dispatch('PageBuilder/editPageWidget', { key: this.$route.name, sections: currentSections })
      this.$store.dispatch('PageBuilder/editPageWidget', { key: 'homePage', sections: currentSections })
      this.togglePageBuilderEditable()
    },
    updateLayout() {
      if (this.$route.name === 'HomePage') {
        if (this.windowSize.x > 599) {
          this.updateLayoutLeftDrawerWidth(285)
        } else if (this.windowSize.x <= 599) {
          this.updateLayoutLeftDrawerWidth(180)
        }
      }
    },
    updateLayoutLeftDrawerWidth(value) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', value)
    },
    addAdminItem () {
      if (this.user.hasPermission('examStore')) {
        this.headerItems.push({
          selected: 'contactUs',
          title: 'پنل ادمین',
          to: 'Admin.Exam.Index'
        })
      }
    },
    togglePageBuilderEditable () {
      const state = this.pageBuilderEditable
      this.$store.commit('PageBuilder/updatePageBuilderEditable', !state)
    },
    cancelEditPageBuilder() {
      const initialSections = this.$store.getters['PageBuilder/initialSections']
      this.$store.commit('PageBuilder/updateCurrentSections', initialSections)
      this.togglePageBuilderEditable()
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
    },
    routeTo(name) {
      this.$router.push({ name })
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
  @media screen and (max-width: 599px) {
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
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
    }
    @media screen and (max-width: 599px) {
      padding-left: 20px;
      padding-right: 20px;
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
          :deep(.homepage) {
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
            margin-left: -8px;
          }
          @media screen and (max-width: 599px) {
            margin-left: 0;
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
          .tabs-list-container{
            display: grid;
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
<style lang="scss">
.user-profile-dropdown {
  width: 220px;
  height: 300px;
  background: #FFFFFF;
  border: 1px solid #F2F5F9;
  border-radius: 0px 16px 16px 16px #{"/* rtl:ignore */"};
  .header {

    box-shadow: 0px 6px 10px rgba(49, 46, 87, 0.04) #{"/* rtl:ignore */"};
    border-radius: 0px 15px 0px 0px #{"/* rtl:ignore */"};
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #6D708B;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 16px;
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      .profile-photo-box {
        //background: #FFB74D;

        width: 60px;
        height: 60px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        .profile-photo-img {
          .q-img {
            border-radius: 16px;
            height: 100%;
          }
          width: 60px;
          height: 60px;
          border-radius: 16px;
          .user-photo {
            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
        .profile-photo-badge {
          position: absolute;
          bottom: -15px;
          left: -7px;
        }
      }
      .profile-detail-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          color: #434765;
        }
        .info-phoneNumber {}
      }
    }
  }
  .user-panel-base-menu {
    display: flex;
    flex-direction: column;
    color: #6D708B;

    .q-list {
      color: #6D708B;
      padding: 0;

      &.side-menu-list {
        .top-separator {
          margin: 0 40px 32px 40px;
        }

        .q-item {
          padding: 0;
          min-height: 0;

          &.item-list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            cursor: pointer;
            padding: 0 14px 0 10px;
            border-radius: 14px;
            &.alone-item {
              height: 40px;

              &.active-route-side-mode {
                .indicator {
                  height: 8px;
                  width: 8px;
                  background-color: white;
                  border-radius: 50%;
                  margin: auto;
                }
              }
            }
            &.alone-item-mode-drawer {
              &.active-route-side-mode {
                .indicator {
                  background-color: #6D708B6B !important;
                }
              }
            }

            .section-title {
              height: 30px;
              display: flex;
              flex-direction: row;
              align-items: center;

              .title-icon {
                margin-right: 12px;
              }

              .q-item__section--side {
                padding: 0;
              }
            }

            .list-section {
              display: flex;
              flex-direction: row;
              justify-content: right;

              .q-avatar {
                height: 22px;
                width: 22px;
              }
            }
          }
        }

        .side-expansion-list {
          &.top-expansion {
            margin-bottom: 10px;
          }

          .expansion-body {
            display: flex;
            margin-left: 8px;
          }

          .q-expansion-item__content {
            .vertical-separator {
              margin: 6px 9px 9px 9px;
            }
          }

          .q-list {
            &.list-expansion {
              margin-bottom: 0;

              .item-list-expansion {
                height: 30px;
                margin: 5px;

                .item-list-expansion-title {
                  justify-content: start;
                }
              }

              .top-expansion-separator {
              }

              .list-child-item {
                height: 30px;
                justify-content: right;
                margin-bottom: 8px;
                width: 157px;
                border-radius: 10px;
                padding: 0 14px;

                &:last-child {
                  margin-bottom: 0;
                }

                .list-child-section {
                  font-size: 14px !important;
                  justify-content: center;
                }
              }
            }
          }
        }

        .active-route-side-mode {

          background-color: #8075DC;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
          }
        }
        .item-mode-drawer {
          background: #F6F9FF;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
            background-color: #6D708B6B ;
          }
        }

      }

      .q-item__section--avatar {
        min-width: 0 !important;
      }

      a {
        text-decoration: none;
        padding: 0;
      }
    }

    &.list-side-mode {
      color: white;
      .q-list {
        a {
          color: white;
        }
      }
    }

    &.list-drawer-mode {
      color: #6D708B;
      .q-list {
        a {
          color: #6D708B;
        }
      }
    }

    .log-out {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      height: 40px !important;
      padding: 0 6px;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      //@media screen and (max-width: 1439px) {
      //  margin: 0 31px 33px 31px;
      //}
      //@media screen and (max-width: 599px) {
      //  margin: 0 30px 30px 30px;
      //  //padding: 0 0 0 10px;
      //}

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
  }
  .body {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
