<template>
  <q-layout
    view="lHr lpR fFf"
    class="main-layout"
  >
    <q-header
      class="text-black layout-header"
      style="background-color: #f1f1f1"
    >
      <q-toolbar>
        <div class="header-body full-width">
          <q-btn
            round
            dense
            flat
            icon="menu"
            color="grey-14"
            @click="toggleLeftDrawer"
          />
          <q-btn-dropdown
            v-if="$route.name === 'onlineQuiz.alaaView'"
            icon="account_circle"
            :label="user.full_name "
            color="grey-14"
            dropdown-icon="false"
            dir="ltr"
            flat
            >
            <online-quiz-top-menu/>
          </q-btn-dropdown>
          <q-btn-dropdown
            v-else
            icon="account_circle"
            :label="user.full_name "
            color="grey-14"
            dropdown-icon="false"
            dir="ltr"
            flat
          >
            <q-card
              class="profile-card"
            >
              <img src="https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg">
              <q-card-actions vertical>
                <a
                  class="profile-link bg-primary"
                  href="https://alaatv.com/"
                >
                  <span  >آلاء</span>
                </a>
                <a
                  class="profile-link bg-amber-8"
                  href="https://alaatv.com/"
                >
                  <span >سه آ</span>
                </a>
                <a
                  class="profile-link bg-negative"
                  @click="logOut"
                >
                  <span >خروج</span>
                </a>
              </q-card-actions>
            </q-card>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
      <q-linear-progress
        v-if="$store.getters['loading/loading']"
        color="primary"
        class="q-mt-sm"
        indeterminate
      />
    </q-header>
    <q-drawer
      :class="{
        'mapOfQuestions side-bar': $route.name === 'onlineQuiz.alaaView',
        'bg-primary side-bar': $route.name !== 'onlineQuiz.alaaView',
       }"
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        :width="316"
        elevated
      >
        <div class="side-logo">
          <div class="side-logo-img">
            <q-img
              v-if="$route.name === 'onlineQuiz.alaaView'"
              src="https://3a.alaatv.com/img/logo-1.png"
              width="150px"
            />
            <q-img
              v-else
              src="https://3a.alaatv.com/img/logo-2.png"
              width="150px"
            />
          </div>
        </div>
        <div
          v-if="$route.name === 'onlineQuiz.alaaView'"
          >
          <side-menu-map-of-questions/>
        </div>
      <div
        v-else
        class="side-list"
      >
        <side-menu-dashboard/>
      </div>
      </q-drawer>
    <q-page-container class="layout-page">
      <div class="page-body">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import { User } from 'src/models/User'
import OnlineQuizTopMenu from 'components/Menu/topMenu/onlineQuizTopMenu'
import SideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'

export default {
  components: { SideMenuMapOfQuestions, OnlineQuizTopMenu, SideMenuDashboard },
  data () {
    return {
      leftDrawerOpen: false,
      user: new User()
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>
<style lang="scss" scoped>
.main-layout{
  .profile-card{
    width: 100%;
    max-width: 324px;
    border-radius: 20px;
    .q-card__actions{
      padding: 0 !important;
      a{
        text-decoration: none;
        cursor: pointer;
        height: 44px;
        color: white;
        text-align: center;
        padding: 12px;
        box-sizing: border-box;
      }
    }
  }
  .layout-header{
    padding: 12px 0;
    .q-toolbar{
      min-height: 48px !important;
      .header-body{
        height: 48px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1158px;
        margin: auto !important;
        .q-btn--dense{
          &.q-btn--round{
            height: 48px;
            width: 48px;
          }
        }
      }
    }
  }

}
.map-of-questions {
  background: var(--surface-1) !important;
}
.layout-header{
  padding: 12px 0;
  .header-body{
    height: 48px;

  .side-bar{
    display: flex;
    flex-direction: column;
    .side-logo{
      display: flex;
      height: 150px;
      align-items: center;
      justify-content: center;
    }
  }
  .layout-page{
   padding-bottom: 72px;
  }
  .q-drawer--left {
    .q-layout__shadow{
      &:after {
        box-shadow: 0 0 10px 0px rgb(0 0 0 / 10%), 0 0px 10px rgb(0 0 0 / 12%) !important;
      }
    }
  }
  }
}
</style>
<style lang="scss">
.q-menu{
  border-radius: 20px;
}
</style>
