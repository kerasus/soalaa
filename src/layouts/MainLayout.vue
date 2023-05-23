<template>
  <quasar-template-builder @onResize="resize">
    <template #header>
      <div v-if="getTemplateHeaderType === 'quiz'"
           class="header-inside row">
        <online-quiz-template-header />
      </div>
      <div v-else-if="getTemplateHeaderType === 'default'"
           class="user-main-layout-header">
        <div class="header-inside row">
          <user-template-header />
        </div>
      </div>
      <div v-else-if="getTemplateHeaderType === 'panel'"
           class="main-layout-header row">
        <template-header />
      </div>
      <q-resize-observer @resize="setHeaderDimension" />
    </template>
    <template #left-drawer>
      <q-scroll-area class="scroll">
        <div v-if="getTemplateLeftSideBarType === 'quiz'"
             class="drawer-inside-of-MapOfQuestions">
          <sideMenuMapOfQuestions />
        </div>
        <div v-else-if="getTemplateLeftSideBarType === 'panel'"
             class="drawer-inside">
          <side-menu-dashboard />
        </div>
        <div v-else-if="getTemplateLeftSideBarType === 'default'"
             class="drawer-inside">
          <user-side-bar />
        </div>
      </q-scroll-area>
    </template>
    <template #content>
      <q-linear-progress
        v-if="linearLoading"
        color="primary"
        reverse
        class="q-mt-sm"
        indeterminate
      />
      <div ref="contentInside"
           class="content-inside"
           :class="{ 'user-panel' : getTemplateLeftSideBarType === 'default' }"
      >
        <q-dialog v-model="confirmDialogData.show"
                  persistent>
          <q-card class="q-pa-md q-pb-none">
            <q-card-section>
              <q-icon name="warning"
                      color="warning"
                      size="2rem" />
              {{confirmDialogData.message}}
            </q-card-section>
            <q-separator />
            <q-card-actions align="right"
                            class="q-pb-none">
              <q-btn v-close-popup
                     color="green"
                     flat
                     @click="confirmDialogAction(true)">بله</q-btn>
              <q-btn v-close-popup
                     color="red"
                     flat
                     @click="confirmDialogAction(false)">خیر</q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="loginDialog">
          <auth />
        </q-dialog>
        <Router :include="keepAliveComponents" />
        <floating-action-button v-if="user.hasPermission('examStore') && ($route.name === 'HomePage' || $route.name === 'Landing.3aComprehensiveExams' || $route.name === 'Public.Product.Show')" />
      </div>
    </template>
    <template #footer>
      <main-footer />
    </template>
  </quasar-template-builder>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import MainFooter from 'components/Layout/Footer/main'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import QuasarTemplateBuilder from 'quasar-template-builder/src/quasar-template-builder.vue'
import FloatingActionButton from 'components/Template/FloatingActionButton/FloatingActionButton.vue'
import { User } from 'src/models/User'

// import templateHeader from 'components/Headers/templateHeader'
// import onlineQuizTemplateHeader from 'components/Headers/onlineQuizTemplateHeader'
// import UserTemplateHeader from 'components/Headers/userTemplateHeader'
// import Router from 'src/router/Router'
// import Auth from 'components/Auth'
// import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
// import sideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'
// import UserSideBar from 'layouts/UserPanelLayouts/UserSideBar'

export default {
  components: {
    MainFooter,
    FloatingActionButton,
    QuasarTemplateBuilder,
    UserSideBar: defineAsyncComponent(() => import('layouts/UserPanelLayouts/UserSideBar')),
    sideMenuMapOfQuestions: defineAsyncComponent(() => import('components/Menu/SideMenu/SideMenu_MapOfQuestions')),
    SideMenuDashboard: defineAsyncComponent(() => import('components/Menu/SideMenu/SideMenu-dashboard')),
    Router: defineAsyncComponent(() => import('src/router/Router')),
    templateHeader: defineAsyncComponent(() => import('components/Headers/templateHeader')),
    onlineQuizTemplateHeader: defineAsyncComponent(() => import('components/Headers/onlineQuizTemplateHeader')),
    UserTemplateHeader: defineAsyncComponent(() => import('components/Headers/userTemplateHeader')),
    Auth: defineAsyncComponent(() => import('components/Auth'))

    // UserSideBar,
    // Router,
    // SideMenuDashboard,
    // sideMenuMapOfQuestions,
    // templateHeader,
    // onlineQuizTemplateHeader,
    // UserTemplateHeader,
    // Auth
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  computed: {
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    loginDialog: {
      get () {
        return this.$store.getters['AppLayout/loginDialog']
      },
      set (newValue) {
        if (!newValue) {
          this.$store.commit('AppLayout/updateLoginDialog', false)
          return
        }
        this.$store.dispatch('AppLayout/showLoginDialog')
      }
    },
    confirmDialogData () {
      return this.$store.getters['AppLayout/confirmDialog']
    },
    linearLoading () {
      return this.$store.getters['AppLayout/linearLoading']
    },
    getTemplateHeaderType() {
      return this.$store.getters['AppLayout/layoutHeaderType']
    },
    getTemplateLeftSideBarType() {
      return this.$store.getters['AppLayout/layoutLeftSideBarType']
    }
  },
  watch: {
  },
  mounted () {
  },
  created () {
  },
  methods: {
    confirmDialogAction (data) {
      if (this.confirmDialogData) this.confirmDialogData.callback(data)
      else {
        this.$store.commit('AppLayout/showConfirmDialog', {
          show: false
        })
      }
    },
    setHeaderDimension (value) {
      this.$refs.contentInside.style.height = 'calc(100vh +' + value.height + 'px'
    },
    resize (val) {
      this.$store.commit('AppLayout/updateWindowSize', val)
      if (val.width > 1439) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 314)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'desktop') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'desktop')
      } else if (val.width > 599) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 280)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'mobile')
      } else {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 242)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'mobile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  height: 100%;
}

.main-layout-header {
  .header-inside{
    width: 100%;
  }
}

.drawer-inside{
  @media screen and(max-width: 599px) {
    width: 250px
  }
}

:deep(.user-main-layout-header) {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  width: 100%;

  .header-inside {
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    color: #65677F;
  }
}

.main-layout-container {
}
.content-inside {
  //overflow: auto;
}
.user-panel {
  background: #F4F6F9;
}
.main-layout-header {
  background-color: #F4F6F9;
  display: flex;
  flex-direction: row;
  padding: 60px 100px 24px 76px;
  @media screen and (max-width: 1919px) {
    padding: 30px 30px 24px 0;
  }
  @media screen and (max-width: 1439px) {
    padding: 20px 30px 18px 30px !important;
  }
  @media screen and (max-width: 1023px) {
    padding: 20px 30px 20px 20px;
  }
  @media screen and (max-width: 599px) {
    padding: 24px 16px 14px 16px !important;
    :nth-child(1) {
      order: 1;
    }
    :nth-child(2) {
      order: 3;
    }
    :nth-child(3) {
      order: 2;
    }
  }

  .right-side {
    @media screen and (max-width: 1439px) {
    }
  }
}

//.user-main-layout-header {
//  background-color: #f1f1f1;
//  display: flex;
//  flex-direction: row;
//
//  .header-inside {
//    width: 100%;
//    background: #fff;
//    display: flex;
//    justify-content: center;
//    color: #65677F;
//  }
//}

.main-layout-container {
}
.content-inside {
  //overflow: auto;
}

.main-layout-left-drawer {
  .drawer-inside-of-MapOfQuestions{
    height: 100%;
  }
}
</style>

<style lang="scss">

.main-layout-container {
  //background-color: #f1f1f1;
  background-color: #F4F6F9;
}

.main-layout-left-drawer {
  //background-color: #f1f1f1;
  overflow: hidden;
  background-color: #F4F6F9;
}
</style>
