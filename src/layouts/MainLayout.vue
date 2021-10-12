<template>
  <q-layout view="lHr lpR fFf">
    <q-header class="bg-grey-2 text-black">
      <q-toolbar>
        <div class="header-body full-width">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        </div>
      </q-toolbar>
      <q-linear-progress
        v-if="loading"
        color="amber-13"
        track-color="orange"
        class="q-mt-sm"
      />
    </q-header>
      <q-drawer
        class="bg-amber-13 side-bar"
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        elevated
      >
        <div class="side-logo">
          <div class="side-logo-img">
            <q-img
              v-if="false"
              src="#"
              width="150"
            />
            <q-img
              v-else
              src="#"
              width="150"
            />
          </div>
        </div>
        <div class="side-list">
          <side-menu-dashboard/>
        </div>
      </q-drawer>
    <q-page-container class="bg-grey-2">
      <div class="bg-grey-2 page-body">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'

export default {
  components: { SideMenuDashboard },
  data () {
    return {
      loading: true
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header-body{
  max-width: 1158px;
  margin: auto !important;
}
.side-bar{
  display: flex;
  flex-direction: column;
  .side-logo{
    height: 150px;
    line-height: 150px;
    font-size: 4rem;
    color: rgb(255, 193, 7);
    display: flex;
    align-items: center;
    justify-content: center;
    .side-logo-img{
      display: block
    }
  }
}
.page-body{
  max-width: 1158px;
  margin: auto !important;
}
</style>
