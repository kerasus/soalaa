<template>
  <div class="user-app-bar-container">
    <div class="app-bar">
      <div class="user-header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="user-logo-section">
          <div class="hamburger">
            <q-btn
              flat
              @click="toggleLeftDrawer"
            >
              <svg width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21"
                      stroke="#6D708B"
                      stroke-width="1.5"
                      stroke-linecap="round" />
                <path d="M3 12H21"
                      stroke="#6D708B"
                      stroke-width="1.5"
                      stroke-linecap="round" />
                <path d="M3 17H21"
                      stroke="#6D708B"
                      stroke-width="1.5"
                      stroke-linecap="round" />
              </svg>
            </q-btn>
          </div>
          <div class="logo-pic">
            <q-img
              class="logo-pic-img"
              src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"
            />
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
              :active="selected === item.selected"
              active-class="active-item"
              @click="selected = item.selected">
              <q-item-section class="tab-title">
                {{ item.title }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action">
          <div>
            <q-btn
              icon="isax:notification"
              unelevated
              rounded
              size="12px"
              class="action-btn"
            />
            <q-btn
              icon="isax:shopping-bag"
              unelevated
              rounded
              size="12px"
              class="action-btn"
            />
          </div>
          <q-btn
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
      selected: 'exams',
      headerItems: [
        {
          selected: 'exams',
          title: 'آزمون ها'
        },
        {
          selected: 'questionBank',
          title: 'بانک سوال'
        },
        {
          selected: 'soalaMag',
          title: 'سوالامگ'
        },
        {
          selected: 'askedQuestions',
          title: 'سوالات متداول'
        },
        {
          selected: 'contactUs',
          title: 'تماس با ما'
        }
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
      padding-left: 40px;
      padding-right: 40px;
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
          .logo-pic-img {
            height: 72px;
            width: 72px;
            @media screen and (max-width: 1023px) {
              height: 48px;
              width: 48px;
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
}
</style>
<style scoped>
</style>
