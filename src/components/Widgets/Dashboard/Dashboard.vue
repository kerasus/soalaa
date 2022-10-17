<template>
  <div class="dashboard-container">
    <div v-if="lastSubscribeLoading"
         class="loading">
      <div class="row">
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
      </div>
      <div class="row q-my-lg">
        <div class="col-12">
          <q-skeleton width="100%"
                      height="70px" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-pa-sm">
          <q-skeleton width="100%"
                      height="480px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="480px" />
        </div>
      </div>
    </div>
    <div v-else
         class="content-wrapper">
      <div v-if="windowSize">
        <div
          v-if="windowSize.x < 1024"
          class="profile-container"
        >
          <div class="profile-box">
            <div class="profile-detail">
              <div class="profile-photo-box">
                <div class="profile-photo-img">
                  <q-img :src="user.photo"></q-img>
                </div>
              </div>
              <div
                v-if="isUserLogin"
                class="profile-detail-info"
              >
                <div class="info-name">{{user.full_name}}</div>
                <div class="info-phoneNumber">{{user.mobile}}</div>
              </div>
            </div>
          </div>
        </div>
        <dashboard-header />
        <next-exam />
        <div class="board-container row q-col-gutter-lg">
          <div class="col-12 col-lg-8 calendar-col"
          >
            <upcoming-exams-calender :calendarTitle="'آزمون های پیش‌رو'"
                                     :calendarIcon="'isax:calendar-1'" />
          </div>
          <div v-if="lastSubscribeDate !== null"
               class="col-12 col-lg-4 subscription-col"
          >
            <subscription-status :subscribe="lastSubscribeDate" />
          </div>
        </div>
        <div v-if="windowSize.x < 1024">
          <div
            v-ripple
            class="relative-position navigation-btn"
            @click="routeTo('User.Exam.List')"
          >
            <div class="title-box">
              <q-icon
                name="isax:task-square"
                color="primary"
                size="24px"
                style="padding-left: 16px"
              />
              <div class="title">
                آزمون‌ها
              </div>
            </div>
            <div class="arrow-icon">
              <q-icon
                name="isax:arrow-left-2"
                size="24px"
              />
            </div>
          </div>
          <div
            v-ripple
            class="relative-position navigation-btn"
            @click="routeTo('User.MyOrders')"
          >
            <div class="title-box">
              <q-icon
                name="isax:clipboard-text"
                color="primary"
                size="24px"
                style="padding-left: 16px"
              />
              <div class="title">
                سفارش‌های من
              </div>
            </div>
            <div class="arrow-icon">
              <q-icon
                name="isax:arrow-left-2"
                size="24px"
              />
            </div>
          </div>
          <div
            v-ripple
            class="relative-position navigation-btn"
            @click="routeTo('User.Profile')"
          >
            <div class="title-box">
              <q-icon
                name="isax:user"
                color="primary"
                size="24px"
                style="padding-left: 16px"
              />
              <div class="title">
                اطلاعات کاربری
              </div>
            </div>
            <div class="arrow-icon">
              <q-icon
                name="isax:arrow-left-2"
                size="24px"
              />
            </div>
          </div>
          <div
            v-ripple
            class="relative-position navigation-btn logout"
            @click="logOut"
          >
            <div class="title-box">
              <q-icon
                name="isax:logout"
                color="primary"
                size="24px"
                style="padding-left: 16px"
              />
              <div class="title">
                خروج
              </div>
            </div>
            <div class="arrow-icon">
              <q-icon
                name="isax:arrow-left-2"
                size="24px"
              />
            </div>
          </div>
        </div>
        <div
          v-if="windowSize.x < 600"
          class="bottom-nav"
        >
          <q-btn
            unelevated
            class="btn-style profile"
          >
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                    fill="#9690E4" />
              <path d="M17.08 14.1499C14.29 12.2899 9.73996 12.2899 6.92996 14.1499C5.65996 14.9999 4.95996 16.1499 4.95996 17.3799C4.95996 18.6099 5.65996 19.7499 6.91996 20.5899C8.31996 21.5299 10.16 21.9999 12 21.9999C13.84 21.9999 15.68 21.5299 17.08 20.5899C18.34 19.7399 19.04 18.5999 19.04 17.3599C19.03 16.1299 18.34 14.9899 17.08 14.1499Z"
                    fill="#9690E4" />
            </svg>
          </q-btn>
          <q-btn
            unelevated
            class="btn-style"
            :to="{ name: 'cart'}"
          >
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4899 22.75H7.49993C5.77993 22.75 4.48994 22.29 3.68994 21.38C2.88994 20.47 2.57993 19.15 2.78993 17.44L3.68994 9.94C3.94994 7.73 4.50994 5.75 8.40994 5.75H15.6099C19.4999 5.75 20.0599 7.73 20.3299 9.94L21.2299 17.44C21.4299 19.15 21.1299 20.48 20.3299 21.38C19.4999 22.29 18.2199 22.75 16.4899 22.75ZM8.39993 7.25C5.51993 7.25 5.37993 8.38999 5.16993 10.11L4.26994 17.61C4.11994 18.88 4.29993 19.81 4.80993 20.38C5.31993 20.95 6.21993 21.24 7.49993 21.24H16.4899C17.7699 21.24 18.6699 20.95 19.1799 20.38C19.6899 19.81 19.8699 18.88 19.7199 17.61L18.8199 10.11C18.6099 8.37999 18.4799 7.25 15.5899 7.25H8.39993Z"
                    fill="#8A8CA6" />
              <path d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z"
                    fill="#8A8CA6" />
              <path d="M20.41 17.78H8C7.59 17.78 7.25 17.44 7.25 17.03C7.25 16.62 7.59 16.28 8 16.28H20.41C20.82 16.28 21.16 16.62 21.16 17.03C21.16 17.44 20.82 17.78 20.41 17.78Z"
                    fill="#8A8CA6" />
            </svg>
          </q-btn>
          <q-btn
            unelevated
            class="btn-style"
            :to="{ name: 'User.Create.Exam'}"
          ><svg width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                  fill="#8A8CA6" />
            <path d="M10.5 16.75C8.71 16.75 7.25 15.29 7.25 13.5C7.25 10.05 10.05 7.25 13.5 7.25C15.29 7.25 16.75 8.71 16.75 10.5C16.75 13.95 13.95 16.75 10.5 16.75ZM13.5 8.75C10.88 8.75 8.75 10.88 8.75 13.5C8.75 14.46 9.54 15.25 10.5 15.25C13.12 15.25 15.25 13.12 15.25 10.5C15.25 9.54 14.46 8.75 13.5 8.75Z"
                  fill="#8A8CA6" />
          </svg>
          </q-btn>
          <q-btn
            unelevated
            class="btn-style"
            :to="{ name: 'HomePage'}"
          >
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.00997 2.09 7.29997 3.17 6.45997L8.56 2.25997C10.18 0.999974 12.77 0.939974 14.45 2.11997L20.63 6.44997C21.82 7.27997 22.75 9.05997 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.43997L4.09 7.63997C3.38 8.19997 2.75 9.46997 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.54997 20.56 8.21997 19.77 7.67997L13.59 3.34997C12.45 2.54997 10.57 2.58997 9.48 3.43997Z"
                    fill="#8A8CA6" />
              <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
                    fill="#8A8CA6" />
            </svg>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from 'components/Widgets/Dashboard/SideComponent/DashboardHeader'
import SubscriptionStatus from 'components/Widgets/Dashboard/SideComponent/SubscriptionStatus'
import UpcomingExamsCalender from 'components/Widgets/Dashboard/SideComponent/UpcomingExamsCalender'
import NextExam from 'components/Widgets/Dashboard/SideComponent/NextExam'
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'
export default {
  name: 'Dashboard',
  components: { NextExam, UpcomingExamsCalender, SubscriptionStatus, DashboardHeader },
  data () {
    return {
      lastSubscribeLoading: false,
      lastSubscribeDate: null
    }
  },
  created() {
    this.getLastSubscribe()
  },
  computed: {
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    getLastSubscribe () {
      this.lastSubscribeLoading = true
      this.$axios.get(API_ADDRESS.subscription.last)
        .then((response) => {
          this.lastSubscribeLoading = false
          this.lastSubscribeDate = response.data.data.subscribe
        })
        .then(() => {
          this.lastSubscribeLoading = false
        })
    },
    routeTo(name) {
      this.$router.push({ name })
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-container {
  .calendar-col {
    padding-left: 0;

    @media screen and (max-width: 1023px) {
      padding-top: 10px;
    }
  }
  .subscription-col {
    @media screen and (max-width: 1439px) {
      padding-left: 0;
      padding-top: 120px;
    }
    @media screen and (max-width: 1200px) {
      padding-left: 0;
      padding-top: 30px;
    }
    @media screen and (max-width: 1023px) {
      padding-left: 0;
      padding-top: 10px;
    }
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #434765;

    width: 277px;
    border-radius: 20px;
    margin-bottom: 0px;
    padding-bottom: 22px;
    @media screen and (max-width: 1919px) {
      width: 273px;
    }
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      .profile-photo-box {

        width: 70px;
        height: 70px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        @media screen and (max-width: 599px) {
          width: 64px;
          height: 64px;
        }
        .profile-photo-img {
          width: 100%;
          height: 100%;
          .q-img {
            border-radius: 16px;
            height: 100%;
          }
        }
      }
      .profile-detail-info {
        margin-left: 12px;
        .info-name {
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
        }
        .info-phoneNumber {}
      }
    }
  }
  .content-wrapper {
    @media screen and (max-width: 599px) {
      padding-bottom: 60px;
    }
  }
}
.navigation-btn {
  width: 100%;
  background: #FFFFFF;
  border-radius: 16px;
  margin-top: 30px;
  padding: 20px 40px;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.03em;
  color: #6D708B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05)  #{"/* rtl:ignore */"};
  @media screen and (max-width: 1439px) {
    padding: 20px 30px;
  }
  @media screen and (max-width: 1023px) {
    margin-top: 20px;
    padding: 30px;
  }
  @media screen and (max-width: 599px) {
    padding: 10px 16px;
    min-height: 70px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
  .title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.q-icon) {
      @media screen and (max-width: 599px) {
        font-size: 20px !important;
        padding-right: 8px !important;
      }
    }
  }
  .arrow-icon{
    :deep(.q-icon) {
      @media screen and (max-width: 599px) {
        font-size: 20px !important;
      }
    }
  }
  &.logout {
    margin-bottom: 28px;
  }
}
.bottom-nav {
  position: fixed;
  height: 72px;
  background: #FFFFFF;
  box-shadow: 0px -6px 10px rgba(112, 108, 161, 0.07) #{"/* rtl:ignore */"};
  border-radius: 16px 16px 0px 0px #{"/* rtl:ignore */"};
  margin-left: -20px;
  margin-right: -20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 42px;
  padding-left: 42px;
  bottom: 0;
  width: 100%;
  .btn-style {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    &.profile {
      background: #F4F3FF;

    }
  }
}
.board-container {
margin:0;
  @media screen and (max-width: 1023px) {
    margin: 20px 0;
    //margin-bottom: 20px;
  }
  .upcoming-exams-calender {
    padding-left: 15px;
    @media screen and (max-width: 1023px) {
      padding-left: 0px !important;
    }
  }
}
</style>
