<template>
  <q-layout view="lHr lpR fFf">
    <q-header
      class="text-black"
      style="background-color: #f1f1f1"
    >
      <q-toolbar>
        <div class="header-body full-width">
          <q-btn
            dense
            flat
            round
            icon="menu"
            color="grey-14"
            @click="toggleLeftDrawer"
          />
          <q-btn-dropdown
            icon="account_circle"
            label="مریم رزمجوی"
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
                >
                  <span >خروج</span>
                </a>
              </q-card-actions>
            </q-card>
          </q-btn-dropdown>
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
        class="bg-primary side-bar"
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        :width="316"
        elevated
      >
        <div class="side-logo">
          <div class="side-logo-img">
<!--            <q-img-->
<!--              v-if="false"-->
<!--              src="https://3a.alaatv.com/img/logo-2.png"-->
<!--              width="150"-->
<!--            />-->
            <q-img
              src="https://3a.alaatv.com/img/logo-2.png"
              width="150px"
            />
          </div>
        </div>
        <div class="side-list">
          <side-menu-dashboard/>
        </div>
      </q-drawer>
    <q-page-container>
      <div class="page-body">
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
.profile-card{
  width: 100%;
  max-width: 324px;
  border-radius: 20px;
  .q-card__actions{
    padding: 0 !important;
    a{
      text-decoration: none;
      height: 44px;
      color: white;
      text-align: center;
    }
  }
}
.header-body{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1158px;
  margin: auto !important;
}
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
.page-body{
  max-width: 1158px;
  margin: auto !important;
}
.q-drawer--left .q-layout__shadow{
  opacity: 0.5 !important;
}
</style>
<style lang="scss">
.q-menu{
  border-radius: 20px !important;
}
</style>
