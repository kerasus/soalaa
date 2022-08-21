<!--       -----------------------ToDO => change last v-else-ifs ------------------------ -->

<template>
  <quasar-template-builder v-model:value="properties"
                           @onResize="resize">
    <template #header>
      <div v-if="templateHeaderType === 'quiz'" class="header-inside row">
        <online-quiz-template-header/>
      </div>
      <div v-else-if="templateHeaderType === 'default'" class="user-main-layout-header">
        <div class="header-inside row">
          <user-template-header/>
        </div>
      </div>
      <div v-else-if="templateHeaderType === 'panel'" class="main-layout-header row">
        <template-header/>
      </div>
      <q-resize-observer @resize="setHeaderDimension" />
    </template>
    <template #left-drawer>
      <div v-if="$route.name === 'onlineQuiz.alaaView'"
           class="drawer-inside-of-MapOfQuestions">
        <sideMenuMapOfQuestions />
      </div>
      <div v-else
           class="drawer-inside">
        <side-menu-dashboard />
      </div>
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
           class="content-inside">
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
      </div>
    </template>
  </quasar-template-builder>
</template>

<script>
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import sideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'
import { QuasarTemplateBuilder } from 'quasar-template-builder'
import templateHeader from 'components/Headers/templateHeader'
import onlineQuizTemplateHeader from 'components/Headers/onlineQuizTemplateHeader'
import UserTemplateHeader from 'components/Headers/userTemplateHeader'
import { ref } from 'vue'
import { QuasarTemplateBuilder } from 'quasar-template-builder'
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Auth from 'components/Auth'
import templateHeader from 'components/Template/templateHeader'
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import sideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'
import onlineQuizTemplateHeader from 'components/Template/onlineQuizTemplateHeader'

export default {
  components: { Router, SideMenuDashboard, sideMenuMapOfQuestions, QuasarTemplateBuilder, templateHeader, onlineQuizTemplateHeader, UserTemplateHeader, Auth },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents,
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: true,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutLeftDrawerWidth: 325,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: '',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container'
      },
      contentInside: ref(0)
    }
  },
  computed: {
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
    getTemplateTypes () {
      return () => {
        this.templateHeaderType = this.$store.getters['AppLayout/templateHeaderType']
        this.templateSideBarType = this.$store.getters['AppLayout/templateSideBarType']
      }
    }
  },
  watch: {
  },
  mounted () {
    this.getTemplateTypes()
  },
  created () {
    this.getTemplateHeaderType()
    this.setLayoutCustomClass()
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      this.$store.dispatch('AppLayout/updateStore', this.properties)
    },
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
    setLayoutCustomClass () {
      if (this.templateHeaderType === 'dashboard') {
        this.properties.layoutHeaderCustomClass = 'user-main-layout-header row'
        return
      }
      this.properties.layoutHeaderCustomClass = 'main-layout-header row'
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
.main-layout-header {
  .header-inside{
    width: 100%;
  }

}

:deep(.user-main-layout-header) {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  padding-bottom: 24px;

  .header-inside {
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    color: #65677F;
  }
}

:deep(.user-main-layout-header) {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  padding-bottom: 24px;

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

.main-layout-left-drawer {
  .drawer-inside-of-MapOfQuestions{
    height: 100%;
  }
}
</style>

<style lang="scss">
.main-layout-header {
  background-color: #f1f1f1;
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

.user-main-layout-header {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;

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

.main-layout-left-drawer {
  .drawer-inside-of-MapOfQuestions{
    height: 100%;
  }
}
</style>

<style lang="scss">

.main-layout-container {
  background-color: #f1f1f1;
}

.main-layout-left-drawer {
  background-color: #f1f1f1;
}
</style>
