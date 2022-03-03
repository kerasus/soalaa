<template>
  <quasar-template-builder v-model:value="properties" @onResize="resize">
    <template #header>
      <template-header/>
      <q-linear-progress
        v-if="$store.getters['loading/loading']"
        color="primary"
        reverse
        class="q-mt-sm"
        indeterminate
      />
    </template>
    <template #left-drawer>
      <div v-if="$route.name === 'onlineQuiz.alaaView'">
        <sideMenuMapOfQuestions/>
      </div>
      <div v-else>
        <side-menu-dashboard/>
      </div>
    </template>
    <template #content>
      <router-view :key="$route.name"/>
    </template>
  </quasar-template-builder>
</template>

<script>

import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import sideMenuMapOfQuestions from 'components/Menu/SideMenu/SideMenu_MapOfQuestions'
import { User } from 'src/models/User'
import { QuasarTemplateBuilder } from 'quasar-template-builder'
import templateHeader from 'components/Template/templateHeader'

export default {
  components: { SideMenuDashboard, sideMenuMapOfQuestions, QuasarTemplateBuilder, templateHeader },
  data () {
    return {
      user: new User(),
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: false,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutLeftDrawerWidth: 325,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: 'main-layout-header row',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container'
      }
    }
  },
  created () {
    const localData = this.$store.getters['AppLayout/appLayout']
    Object.assign(this.properties, localData)
  },
  methods: {
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    resize (val) {
      this.$store.commit('AppLayout/updateWindowSize', val)
      if (val.width > 1023) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 325)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'desktop') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'desktop')
      } else if (val.width > 349) {
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

}

.main-layout-container {
}

.main-layout-left-drawer {
}
</style>

<style lang="scss">
.main-layout-header {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  padding: 60px 100px 24px 76px;
  @media screen and (max-width: 1439px) {
    padding: 30px 30px 24px 0;
  }
  @media screen and (max-width: 1023px) {
    padding: 20px 30px 18px 30px !important;
  }
  @media screen and (max-width: 599px) {
    padding: 20px 30px 20px 20px;
  }
  @media screen and (max-width: 349px) {
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
    @media screen and (max-width: 1023px) {
    }
  }
}

.main-layout-container {
  background-color: #f1f1f1;
}

.main-layout-left-drawer {
  background-color: #f1f1f1;
}
</style>
