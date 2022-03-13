<template>
  <v-app v-resize="updateWindowSize">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      :width="drawerWidth"
      disable-resize-watcher
      :class="{
        'mapOfQuestions': $route.name === 'onlineQuiz.alaaView' || $route.name === 'onlineQuiz.konkoorView',
        'right-drawer': $route.name !== 'onlineQuiz.alaaView' && $route.name !== 'onlineQuiz.konkoorView'
      }"
    >
      <div
        style="height: 150px;line-height: 150px;font-size: 4rem;color: rgb(255, 193, 7);display: flex;align-items: center;justify-content: center;"
      >
        <div style="display: block">
          <v-img
            v-if="$route.name === 'onlineQuiz.alaaView'"
            src="/img/logo-1.png"
            width="150"
          />
          <v-img
            v-else
            src="/img/logo-2.png"
            width="150"
          />
        </div>
      </div>
      <SideMenu_MapOfQuestions
        v-if="$route.name === 'onlineQuiz.alaaView' || $route.name === 'onlineQuiz.konkoorView'"
      />
      <SideMenu_Dashboard v-else />
    </v-navigation-drawer>
    <v-app-bar
      v-if="appBar"
      app
      color="--background-2"
      elevate-on-scroll
    >
      <div class="header">
        <v-container>
          <v-row>
            <v-col class="px-md-0 px-10 d-flex justify-space-between">
              <div class="rounded-b-xl rounded-r-xl d-flex flex-row align-center">
                <v-menu
                  bottom
                  :offset-y="true"
                  class="rounded-b-xl rounded-r-xl"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      large
                      tile
                      v-bind="attrs"
                      elevation="0"
                      class="pl-3 topMenuOpenButton"
                      v-on="on"
                    >
                      <v-icon
                        class="mr-2"
                        :size="30"
                        color="#666"
                      >
                        mdi-account-circle
                      </v-icon>
                      <span v-if="user.last_name">
                        {{ user.last_name }}
                      </span>
                      <span v-if="user.first_name">
                        {{ user.first_name }}
                      </span>
                    </v-btn>
                  </template>
                  <v-card
                    max-width="375"
                    class="mx-auto"
                    rounded="b-xl r-xl"
                  >
                    <TopMenu_OnlineQuiz v-if="$route.name === 'onlineQuiz.alaaView'" />
                    <TopMenu_Dashboard v-else />
                  </v-card>
                </v-menu>
              </div>
              <div>
                <v-btn
                  v-if="$route.name === 'onlineQuiz.alaaView'"
                  class="switch-view-button"
                  icon
                  @click="changeView('konkoor')"
                >
                  <v-icon>mdi-dots-grid</v-icon>
                </v-btn>
                <v-app-bar-nav-icon
                  v-if="$route.name !== 'onlineQuiz.konkoorView'"
                  :color="(isQuizPage) ? '#fcaf25' : '#666'"
                  @click.stop="toggleDrawer"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-app-bar>
    <v-main>
      <v-snackbar
        :timeout="-1"
        :value="updateExists && false"
        centered
        bottom
        color="deep-purple accent-4"
        elevation="24"
      >
        جهت بروزرسانی لطفا صفحه را
        رفرش
        کنید
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="refreshApp"
          >
            رفرش
          </v-btn>
        </template>
      </v-snackbar>

      <notifications group="notifs" />
      <router-view :key="$route.name + ($route.params.quizId || '') + ($route.params.questNumber || '')" />

      <vue-confirm-dialog />
    </v-main>
    <v-overlay
      :opacity="0.5"
      :value="overlay.show"
    >
      <v-progress-circular
        v-if="overlay.loading"
        indeterminate
        size="64"
      />
      <p>{{ overlay.text }}</p>
    </v-overlay>
  </v-app>
</template>

<script>
import '@/assets/scss/app.scss'
import '@/assets/scss/font.scss'
import '@mdi/font/css/materialdesignicons.css'
import './assets/Fonts/Flaticons/css/uicons-regular-rounded.css'
import './assets/Fonts/Flaticons/css/uicons-bold-rounded.css'
import {mixinAuth, mixinQuiz, mixinDrawer, mixinWindowSize} from '@/mixin/Mixins'

import {
  SideMenu_Dashboard,
  SideMenu_MapOfQuestions,
  TopMenu_OnlineQuiz,
  TopMenu_Dashboard
} from '@/components/Menu/Menus'


export default {
  name: 'App',
  components: {
    TopMenu_OnlineQuiz,
    TopMenu_Dashboard,
    SideMenu_Dashboard,
    SideMenu_MapOfQuestions
  },
  mixins: [mixinAuth, mixinQuiz, mixinDrawer, mixinWindowSize],
  data: () => ({

    refreshing: false,
    registration: null,
    updateExists: false,

    selectedItem: null
  }),
  computed: {
    appBar() {
      return this.$store.getters['AppLayout/appBar']
    },
    drawerWidth() {
      if (this.windowSize.x > 450) {
        return 316
      } else {
        return 230
      }
    },
    overlay() {
      return this.$store.getters['AppLayout/overlay']
    },
    confirmDialog() {
      return this.$store.getters['AppLayout/confirmDialog']
    }
  },
  watch: {
    selectedItem() {
      this.selectedItem = null
    }
  },
  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    if (navigator && navigator.serviceWorker) {
      // Prevent multiple refreshes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        // Here the actual reload of the page occurs
        // window.location.reload()
      })
    }

    // Time.synchronizeTime()
    this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },
    // Called when the user accepts the update
    refreshApp() {
      // https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  direction: ltr;
}

.right-drawer {
  background: var(--primary-1) !important;
}

.map-of-questions {
  background: var(--surface-1) !important;
}
</style>

<style>
:root {
  --background-1: #fff;
  --background-2: #f5f5f5;
  --background-3: red;
  --surface-1: #fff;
  --surface-2: #f1f1f1;
  --surface-3: #f1f1f1;
  --primary-1: #ffc107;
  --primary-2: #fbcf4b;
  --primary-3: #ffc107;
  --text-1: #000;
  --text-2: #666;
  --text-3: #fff;
  --accent-1: #2196F3;
  --accent-2: #2196F3;
  --accent-3: #2196F3;
  --success-1: #4caf50;
  --success-2: #4caf50;
  --success-3: #4caf50;
  --error-1: #f44336;
  --error-2: #f44336;
  --error-3: #f44336;
}

.v-application .body-1,
.v-application .body-2,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .caption,
.v-application, .v-application .headline {
  font-family: 'IRANSans', 'Arial', 'Verdana', 'Tahoma', sans-serif !important;
}

.choice p:nth-child(2n) {
  display: block;
}

.answer-text p:nth-child(2n) {
  display: block;
}

.notification-title,
.notification-content {
  text-align: right;
}

.v-application > .v-menu__content {
  border-top-right-radius: 24px !important;
  border-bottom-left-radius: 24px !important;
  border-bottom-right-radius: 24px !important;
}

/*ToDo: not suport IE*/
.v-navigation-drawer {
  filter: drop-shadow(-3px 0px 10px rgba(0, 0, 0, 0.102));
}

.v-navigation-drawer .v-navigation-drawer__content .theme--light.v-btn {
  color: #666;
}

.v-navigation-drawer__border {
  background: transparent !important;
}

.v-main {
  background: var(--background-2);
}

.appDarkMode * {
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);;
}

.appDarkMode .v-main {
  background: #242424;;
}

.appDarkMode header,
.appDarkMode .topMenuOpenButton {
  background: #242424 !important;
}

.appDarkMode div,
.appDarkMode .topMenuOpenButton span {
  color: #bfbfbf;
}

@media only screen and (max-width: 960px) {
  .switch-view-button {
    display: none;
  }
}

strong em s {
  margin-left: 50px;
  font-weight: normal;
  text-decoration: none;
  font-style: normal;
}
</style>
