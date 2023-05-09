<template>
  <div
    v-if="$route.name !== 'HomePage'"
    class="user-panel-side-bar"
  >
    <div v-if="isUserLogin"
         class="bg-primary profile-box">
      <div class="profile-detail">
        <div class="profile-photo-box">
          <div class="profile-photo-img">
            <q-img :src="previewImg"></q-img>
            <q-file ref="file"
                    v-model="file"
                    :model-value="file"
                    label="Label"
                    class="hidden"
                    @update:model-value="updateFile()" />
            <q-btn v-if="!controls"
                   icon="isax:edit"
                   size="xs"
                   color="white"
                   text-color="accent"
                   round
                   class="photo-edit"
                   @click="updatePhoto" />
            <div v-if="controls"
                 class="controls flex no-wrap">
              <q-btn icon="isax:tick-circle"
                     size="xs"
                     color="green"
                     text-color="white"
                     class="controls-btn q-mr-xs"
                     @click="confirmUpdate" />
              <q-btn icon="isax:close-circle"
                     size="xs"
                     color="red"
                     text-color="white"
                     class="controls-btn"
                     @click="discardUpdate" />
            </div>
          </div>
          <!--          <div class="profile-photo-badge">-->
          <!--            <svg width="24"-->
          <!--                 height="24"-->
          <!--                 viewBox="0 0 24 24"-->
          <!--                 fill="none"-->
          <!--                 xmlns="http://www.w3.org/2000/svg"-->
          <!--                 style="cursor: pointer"-->
          <!--                 @click="updatePhoto">-->
          <!--              <circle cx="12"-->
          <!--                      cy="12"-->
          <!--                      r="12"-->
          <!--                      fill="white" />-->
          <!--              <path d="M7.69332 17.0133C7.28666 17.0133 6.90666 16.8733 6.63332 16.6133C6.28666 16.2867 6.11999 15.7933 6.17999 15.26L6.42666 13.1C6.47332 12.6933 6.71999 12.1533 7.00666 11.86L12.48 6.06666C13.8467 4.61999 15.2733 4.57999 16.72 5.94666C18.1667 7.31333 18.2067 8.73999 16.84 10.1867L11.3667 15.98C11.0867 16.28 10.5667 16.56 10.16 16.6267L8.01332 16.9933C7.89999 17 7.79999 17.0133 7.69332 17.0133ZM14.62 5.93999C14.1067 5.93999 13.66 6.25999 13.2067 6.73999L7.73332 12.54C7.59999 12.68 7.44666 13.0133 7.41999 13.2067L7.17332 15.3667C7.14666 15.5867 7.19999 15.7667 7.31999 15.88C7.43999 15.9933 7.61999 16.0333 7.83999 16L9.98666 15.6333C10.18 15.6 10.5 15.4267 10.6333 15.2867L16.1067 9.49333C16.9333 8.61333 17.2333 7.79999 16.0267 6.66666C15.4933 6.15333 15.0333 5.93999 14.62 5.93999Z"-->
          <!--                    fill="#6D708B" />-->
          <!--              <path d="M15.56 11.3C15.5466 11.3 15.5266 11.3 15.5133 11.3C13.4333 11.0933 11.76 9.51335 11.44 7.44668C11.4 7.17334 11.5866 6.92001 11.86 6.87334C12.1333 6.83334 12.3866 7.02001 12.4333 7.29334C12.6866 8.90668 13.9933 10.1467 15.62 10.3067C15.8933 10.3333 16.0933 10.58 16.0666 10.8533C16.0333 11.1067 15.8133 11.3 15.56 11.3Z"-->
          <!--                    fill="#6D708B" />-->
          <!--              <path d="M18 19.1667H6C5.72667 19.1667 5.5 18.94 5.5 18.6667C5.5 18.3933 5.72667 18.1667 6 18.1667H18C18.2733 18.1667 18.5 18.3933 18.5 18.6667C18.5 18.94 18.2733 19.1667 18 19.1667Z"-->
          <!--                    fill="#6D708B" />-->
          <!--            </svg>-->
          <!--          </div>-->
        </div>
        <div
          v-if="isUserLogin"
          class="profile-detail-info"
        >
          <div class="info-name">{{user.full_name}}</div>
          <div class="info-phoneNumber">{{user.mobile}}</div>
        </div>
      </div>
      <!--      <div class="role-score-box">-->
      <!--        <div class="role-name">دانش‌آموز</div>-->
      <!--        <div class="role-score">-->
      <!--          <span class="score">955</span>-->
      <!--          <span class="star-icon"><svg width="20"-->
      <!--                                       height="20"-->
      <!--                                       viewBox="0 0 20 20"-->
      <!--                                       fill="none"-->
      <!--                                       xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M11.4416 2.92501L12.9083 5.85835C13.1083 6.26668 13.6416 6.65835 14.0916 6.73335L16.7499 7.17501C18.4499 7.45835 18.8499 8.69168 17.6249 9.90835L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0417C16.1833 18.0667 15.1083 18.85 13.3166 17.7917L10.8249 16.3167C10.3749 16.05 9.63326 16.05 9.17492 16.3167L6.68326 17.7917C4.89992 18.85 3.81659 18.0583 4.28326 16.0417L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90835C1.15826 8.69168 1.54992 7.45835 3.24992 7.17501L5.90826 6.73335C6.34992 6.65835 6.88326 6.26668 7.08326 5.85835L8.54992 2.92501C9.34992 1.33335 10.6499 1.33335 11.4416 2.92501Z"-->
      <!--                  fill="#FFD965"-->
      <!--                  stroke="#FFD965"-->
      <!--                  stroke-width="1.5"-->
      <!--                  stroke-linecap="round"-->
      <!--                  stroke-linejoin="round" />-->
      <!--          </svg></span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div
      class="bg-primary side-menu-main-layout"
      :class="{ 'loggedIn' : isUserLogin }"
    >
      <user-panel-base-menu />
    </div>
  </div>
  <div
    v-else
    class="user-panel-side-drawer-container"
  >
    <user-panel-side-drawer />
  </div>
</template>

<script>

import { User } from 'src/models/User'
import UserPanelBaseMenu from 'layouts/UserPanelLayouts/UserPanelBaseMenu'
import UserPanelSideDrawer from 'layouts/UserPanelLayouts/UserPanelSideDrawer'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'UserSideBar',
  components: { UserPanelSideDrawer, UserPanelBaseMenu },
  data () {
    return {
      clickedItem: null,
      previewImg: null,
      file: null,
      controls: false
    }
  },
  mounted() {
    this.previewImg = this.user.photo
  },
  methods: {
    logOut () {
      this.$store.dispatch('Auth/logOut')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    },
    updatePhoto() {
      this.$refs.file.pickFiles()
    },
    updateFile() {
      this.controls = true
      this.previewImg = URL.createObjectURL(this.file)
    },
    discardUpdate() {
      this.controls = false
      this.file = null
      this.previewImg = this.user.photo
    },
    confirmUpdate() {
      const fd = new FormData()
      fd.append('photo', this.file)
      this.$axios.put(API_ADDRESS.user.updatePhoto(), fd).then((d) => {
        this.controls = false
      })
    }
  },
  computed: {
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    },
    showMenuItem () {
      return (item) => {
        return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-edit {
  font-size: 7px;
  position: absolute;
  border-radius: 50%;
  top: 50px;
  left: -10px;
}
.controls-btn {
  font-size: 9px !important;
  border-radius: 50%;
  left: -15px;
}
.user-panel-side-bar {
  @media screen and (max-width: 1023px) {
    //display: none;
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #FFFFFF;

    width: 100%;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 16px;

    @media screen and (max-width: 1439px) {
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
      letter-spacing: -0.03em;
      padding: 12px;
      border-radius: 16px;
      margin-bottom: 10px;

    }
    @media screen and (max-width: 1023px) {
      width: 100%;
      border-radius: 0;
    }
    @media screen and (max-width: 599px) {}
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      @media screen and (max-width: 1439px) {
        grid-template-columns: 64px auto;
      }
      .profile-photo-box {
        //background: #FFB74D;

        width: 60px;
        height: 60px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        @media screen and (max-width: 1439px) {
          width: 56px;
          height: 56px;
        }
        .profile-photo-img {
          width: 100%;
          height: 100%;
          .q-img {
            border-radius: 16px;
            height: 100%;
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
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
          @media screen and (max-width: 1439px) {
            font-weight: 700;
            font-size: 16px;
            line-height: 25px;
          }
        }
        .info-phoneNumber {}
      }
    }
    .role-score-box {
      background: #FFFFFF;
      border-radius: 10px;
      letter-spacing: -0.03em;
      color: #6D708B;
      padding: 7px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;

      .role-score {
        display: flex;
        align-items: center;
        .score {
          margin-top: 2px;
          padding-right: 6px;
        }
        .star-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .side-menu-main-layout {
    width: 100%;
    min-height: 480px;
    border-radius: 20px;
    padding: 24px;
    display: grid;
    @media screen and (max-width: 1919px) {
      min-height: 480px;
    }
    @media screen and (max-width: 1439px) {
      border-radius: 16px;
      padding-right: 16px;
      padding-left: 16px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }
    @media screen and (max-width: 1023px) {
      width: 100%;
      border-radius: 0;
      height:100vh;

      &.loggedIn {
        height: calc(100vh - 90px);

      }
    }
    @media screen and (max-width: 599px) {
      //width: 100%;
    }
  }
}
.user-panel-side-drawer-container {
  display: none;
  @media screen and (max-width: 1023px) {
    display: block;
  }
}
</style>
