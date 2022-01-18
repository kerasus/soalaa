<template>
  <q-layout
    :view="layoutView"
    class="main-layout"
  >
    <q-header
      class="text-black layout-header"
      v-if="layoutHeader"
      v-model="layoutHeaderVisible"
      :reveal="layoutHeaderReveal"
      :elevated="layoutHeaderElevated"
      :bordered="layoutHeaderBordered"
      style="background-color: #f1f1f1"
    >
      <q-toolbar>
        <div class="header-body full-width">
          <div>
            <q-btn
              v-if="layoutLeftDrawer || $route.name !== 'onlineQuiz.konkoorView'"
              round
              dense
              flat
              icon="menu"
              color="grey-14"
              @click="updateLayoutLeftDrawerVisible(!layoutLeftDrawerVisible)"
            />
            <q-btn
              v-if="$route.name === 'onlineQuiz.alaaView'"
              round
              dense
              color="grey-14"
              flat
              icon="mdi-dots-grid"
              @click="changeView"
            />
          </div>
          <div>
            <q-btn-dropdown
              class="toolbar-button"
              content-class="profile-menu"
              icon="notifications_active"
              dropdown-icon="false"
              color="white"
              text-color="black"
              dir="ltr"
              dense
              unelevated
            >
              <DashboardTopMenu/>
            </q-btn-dropdown>
            <q-btn-dropdown
              v-if="$route.name === 'onlineQuiz.alaaView'"
              icon="account_circle"
              color="grey-14"
              dropdown-icon="false"
              dir="ltr"
              flat
            >
              <online-quiz-top-menu/>
            </q-btn-dropdown>
            <q-btn-dropdown
              v-else
              class="toolbar-button"
              content-class="profile-menu"
              icon="person"
              dropdown-icon="false"
              color="white"
              text-color="black"
              dir="ltr"
              dense
              unelevated
            >
              <DashboardTopMenu/>
            </q-btn-dropdown>
          </div>
          <q-btn
            v-if="layoutRightDrawer"
            dense
            flat
            round
            icon="menu"
            @click="updateLayoutRightDrawerVisible(!layoutRightDrawerVisible)"
          />
        </div>
      </q-toolbar>
      <q-linear-progress
        v-if="$store.getters['loading/loading']"
        color="secondary"
        reverse
        class="q-mt-sm"
        indeterminate
      />
    </q-header>
    <q-drawer
      v-if="layoutLeftDrawerVisible"
      v-model="layoutLeftDrawerVisible"
      show-if-above
      :behavior="layoutLeftDrawerBehavior"
      :overlay="layoutLeftDrawerOverlay"
      :elevated="layoutLeftDrawerElevated"
      :bordered="layoutLeftDrawerBordered"
      content-class="bg-grey-1"
      side="left"
      style="background-color: #f1f1f1"
      :width="350"
      class="side-bar"
    >
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
        <router-view :key="$route.name" />
      </div>
    </q-page-container>
    <q-drawer
      class="side-bar"
      :class="{
        'mapOfQuestions': $route.name === 'onlineQuiz.alaaView',
        'bg-secondary': $route.name !== 'onlineQuiz.alaaView',
       }"
      v-if="layoutRightDrawerVisible"
      v-model="layoutRightDrawerVisible"
      show-if-above
      :behavior="layoutRightDrawerBehavior"
      :overlay="layoutRightDrawerOverlay"
      :elevated="layoutRightDrawerElevated"
      :bordered="layoutRightDrawerBordered"
      side="right"
    >
    </q-drawer>
    <q-footer
      v-if="layoutFooter"
      v-model="layoutFooterVisible"
      class="bg-grey-8"
      :reveal="layoutFooterReveal"
      :elevated="layoutFooterElevated"
      :bordered="layoutFooterBordered"
    >
      <q-toolbar>
        <q-btn v-if="layoutLeftDrawer" dense flat round :icon="'menu'" @click="updateLayoutLeftDrawerVisible(!layoutLeftDrawerVisible)" />

        <q-toolbar-title>Quasar</q-toolbar-title>

        <q-btn v-if="layoutRightDrawer" dense flat round :icon="'menu'" @click="updateLayoutRightDrawerVisible(!layoutRightDrawerVisible)" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import { User } from 'src/models/User'
import OnlineQuizTopMenu from 'components/Menu/topMenu/onlineQuizTopMenu'
import SideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'
import DashboardTopMenu from 'components/Menu/topMenu/DashboardTopMenu'

export default {
  components: { DashboardTopMenu, SideMenuMapOfQuestions, OnlineQuizTopMenu, SideMenuDashboard },
  computed: {
    ...mapGetters('AppLayout', [
      'layoutView',
      'layoutHeaderReveal',
      'layoutHeaderElevated',
      'layoutHeaderBordered',
      'layoutLeftDrawer',
      'layoutLeftDrawerVisible',
      'layoutLeftDrawerBehavior',
      'layoutLeftDrawerOverlay',
      'layoutLeftDrawerElevated',
      'layoutLeftDrawerBordered',
      'layoutRightDrawer',
      'layoutRightDrawerVisible',
      'layoutRightDrawerBehavior',
      'layoutRightDrawerOverlay',
      'layoutRightDrawerElevated',
      'layoutRightDrawerBordered',
      'layoutFooterReveal',
      'layoutFooterElevated',
      'layoutFooterBordered',
      'layoutFooter'
    ]),
    ...mapState('AppLayout', [
      'layoutHeader',
      'layoutHeaderVisible',
      'layoutFooterVisible'
    ]),
    headerWithBackground () {
      return this.$store.getters['AppLayout/headerWithBackground']
    }
  },
  data () {
    return {
      user: new User(),
      tab: 'home',
      leftDrawerOpen: false
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutRightDrawerVisible',
      'updateLayoutLeftDrawerVisible'
    ]),
    changeView () {
      this.$router.push({
        name: 'konkoorView',
        params: {
          quizId: this.$route.params.quizId
        }
      })
    },
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
  .layout-header {
    padding: 12px 0;
    .q-toolbar {
      min-height: 48px !important;
      .header-body {
        height: 48px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1158px;
        margin: auto !important;

        .q-btn{
          &.toolbar-button{
            margin-right: 12px;
            height: 48px;
            width: 48px;
            box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
            border-radius: 16px;
            .q-btn__content{
              .q-icon{
                &.q-btn-dropdown--simple * + .q-btn-dropdown__arrow{
                  display: none !important;
                }
              }
            }
          }
        }
        .q-menu{
          &.profile-menu{
            border-radius: 20px !important;
          }
        }
      }
    }
  }
  .side-bar {
    display: flex;
    flex-direction: column;
    &.map-of-questions{
      background: var(--surface-1) !important;
    }

    .side-logo {
      display: flex;
      height: 150px;
      align-items: center;
      justify-content: center;
    }
  }
}

</style>
<style lang="scss">
.main-layout{
  .layout-header {
    .q-btn{
      &.toolbar-button{
        .q-btn__content{
          .q-btn-dropdown__arrow{
            display: none !important;
          }
        }
      }
    }
  }
}
.q-menu{
  &.profile-menu{
    border-radius: 20px !important;
  }
}
</style>
