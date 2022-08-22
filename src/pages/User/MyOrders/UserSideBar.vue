<template>
  <div class="bg-primary profile-box">
    <div class="profile-detail">
      <div class="profile-photo-box">
        <div class="profile-photo-img">
          <q-img :src="user.photo"></q-img>
        </div>
        <div class="profile-photo-badge">
          <svg width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="12"
                    cy="12"
                    r="12"
                    fill="white" />
            <path d="M7.69332 17.0133C7.28666 17.0133 6.90666 16.8733 6.63332 16.6133C6.28666 16.2867 6.11999 15.7933 6.17999 15.26L6.42666 13.1C6.47332 12.6933 6.71999 12.1533 7.00666 11.86L12.48 6.06666C13.8467 4.61999 15.2733 4.57999 16.72 5.94666C18.1667 7.31333 18.2067 8.73999 16.84 10.1867L11.3667 15.98C11.0867 16.28 10.5667 16.56 10.16 16.6267L8.01332 16.9933C7.89999 17 7.79999 17.0133 7.69332 17.0133ZM14.62 5.93999C14.1067 5.93999 13.66 6.25999 13.2067 6.73999L7.73332 12.54C7.59999 12.68 7.44666 13.0133 7.41999 13.2067L7.17332 15.3667C7.14666 15.5867 7.19999 15.7667 7.31999 15.88C7.43999 15.9933 7.61999 16.0333 7.83999 16L9.98666 15.6333C10.18 15.6 10.5 15.4267 10.6333 15.2867L16.1067 9.49333C16.9333 8.61333 17.2333 7.79999 16.0267 6.66666C15.4933 6.15333 15.0333 5.93999 14.62 5.93999Z"
                  fill="#6D708B" />
            <path d="M15.56 11.3C15.5466 11.3 15.5266 11.3 15.5133 11.3C13.4333 11.0933 11.76 9.51335 11.44 7.44668C11.4 7.17334 11.5866 6.92001 11.86 6.87334C12.1333 6.83334 12.3866 7.02001 12.4333 7.29334C12.6866 8.90668 13.9933 10.1467 15.62 10.3067C15.8933 10.3333 16.0933 10.58 16.0666 10.8533C16.0333 11.1067 15.8133 11.3 15.56 11.3Z"
                  fill="#6D708B" />
            <path d="M18 19.1667H6C5.72667 19.1667 5.5 18.94 5.5 18.6667C5.5 18.3933 5.72667 18.1667 6 18.1667H18C18.2733 18.1667 18.5 18.3933 18.5 18.6667C18.5 18.94 18.2733 19.1667 18 19.1667Z"
                  fill="#6D708B" />
          </svg>
        </div>
      </div>
      <div class="profile-detail-info">
        <div class="info-name">{{user.full_name}}</div>
        <div class="info-phoneNumber">{{user.mobile}}</div>
      </div>
    </div>
    <div class="role-score-box">
      <div class="role-name">دانش‌آموز</div>
      <div class="role-score">
        <span class="score">955</span>
        <span class="star-icon"><svg width="20"
                                     height="20"
                                     viewBox="0 0 20 20"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4416 2.92501L12.9083 5.85835C13.1083 6.26668 13.6416 6.65835 14.0916 6.73335L16.7499 7.17501C18.4499 7.45835 18.8499 8.69168 17.6249 9.90835L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0417C16.1833 18.0667 15.1083 18.85 13.3166 17.7917L10.8249 16.3167C10.3749 16.05 9.63326 16.05 9.17492 16.3167L6.68326 17.7917C4.89992 18.85 3.81659 18.0583 4.28326 16.0417L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90835C1.15826 8.69168 1.54992 7.45835 3.24992 7.17501L5.90826 6.73335C6.34992 6.65835 6.88326 6.26668 7.08326 5.85835L8.54992 2.92501C9.34992 1.33335 10.6499 1.33335 11.4416 2.92501Z"
                fill="#FFD965"
                stroke="#FFD965"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg></span>
      </div>
    </div>
  </div>
  <div class="bg-primary side-menu-main-layout">
    <q-list
      class="side-menu-list"
      padding
      dark
    >
      <div
        v-for="(item , index) in titlesList"
        :key="index"
      >
        <div
          v-if="showMenuItem(item)"
        >
          <q-expansion-item
            v-if="item.children.length"
            :header-style="{fontSize:'16px', height:'40px', borderRadius: '14px'}"
            :label="item.title"
            :icon="item.icon"
            class="side-expansion-list"
            dark
          >
            <div class="expansion-body">
              <q-separator dark
                           size="2px"
                           vertical
                           class="vertical-separator" />
              <q-list class="list-expansion">
                <q-item
                  v-for="(subItem , i) in item.children"
                  :key="i"
                  :to="{ name: subItem.routeName, params: subItem.params }"
                  class="list-child-item"
                  exact-active-class="active-route"
                >
                  <q-item-section
                    class="list-child-section"
                  >
                    {{ subItem.displayName }}
                  </q-item-section>
                  <span class="indicator" />
                </q-item>
              </q-list>
            </div>
          </q-expansion-item>
          <q-item
            v-else
            :to="(item.routeName) ? {name: item.routeName} : null"
            class="item-list"
            :class="{ 'alone-item': !item.children.length}"
            v-model="clickedItem"
            exact-active-class="active-route"
          >
            <div class="section-title">
              <q-item-section class="list-section title-icon"
                              avatar>
                <q-avatar :icon="item.icon"
                          size="30" />
              </q-item-section>
              <q-item-section class="list-section">
                {{ item.title }}
              </q-item-section>
              <span class="indicator" />
            </div>
          </q-item>
        </div>
      </div>
    </q-list>
    <div class="log-out"
         @click="logOut">
      <span>
        <q-avatar icon="isax:logout"
                  size="30"
                  dir="rtl" />
      </span>
      <span class="logout-text">خروج </span>
    </div>
  </div>
</template>

<script>

import { User } from 'src/models/User'
export default {
  name: 'UserSideBar',
  data () {
    return {
      clickedItem: null,
      titlesList: [
        {
          title: 'داشبورد',
          icon: 'isax:home',
          routeName: 'dashboard',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'آزمون ها',
          icon: 'isax:task-square',
          routeName: 'dashboard',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'سفارش‌ های من',
          icon: 'isax:clipboard-text',
          routeName: 'myOrders',
          permission: 'all',
          active: false,
          children: []
        }
        // {
        //   title: 'تنظیمات',
        //   icon: 'isax:setting-2',
        //   routeName: 'Admin.Settings',
        //   permission: 'examStore',
        //   active: false,
        //   children: []
        // },
      ]
    }
  },
  methods: {
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  },
  computed: {
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    showMenuItem () {
      return (item) => {
        return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-box {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  color: #FFFFFF;

  width: 277px;
  height: 152px;
  border-radius: 20px;
  padding: 20px;
  margin: 40px 0 0 24px;
  @media screen and (max-width: 1919px) {
    width: 260px;
    margin: 30px 30px 30px 24px;
  }
  @media screen and (max-width: 1439px) {
    height: 100%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }
  .profile-detail {
    display: grid;
    grid-template-columns: 70px auto;
    align-items: center;
    margin-bottom: 16px;
    .profile-photo-box {
      //background: #FFB74D;

      width: 60px;
      height: 60px;
      border: 3px solid #FFFFFF;
      border-radius: 16px;
      position: relative;
      .profile-photo-img {
        .q-img {
          border-radius: 16px;
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
      }
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
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 480px;
  border-radius: 30px;
  margin: 40px 0 0 24px;
  padding: 24px;
  @media screen and (max-width: 1919px) {
    width: 260px;
    min-height: 480px;
    margin: 30px 30px 30px 24px;
  }
  @media screen and (max-width: 1439px) {
    margin: 0 !important;
    border-radius: 0;
    width: 280px;
    min-height: 680px;
    height: 100%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      .top-separator {
        margin: 0 40px 32px 40px;
        @media screen and (max-width: 1919px) {
          margin: 0 30px 25px 30px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 45px 22px 45px;
        }
      }

      .q-item {
        padding: 0;
        min-height: 0;

        &.item-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 0 14px 0 10px;
          border-radius: 14px;

          &.alone-item {
            height: 40px;

            &.active-route {
              .indicator {
                height: 8px;
                width: 8px;
                background-color: white;
                border-radius: 50%;
                margin: auto;
              }
            }
          }

          .section-title {
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .title-icon {
              margin-right: 12px;
            }

            .q-item__section--side {
              padding: 0;
            }
          }

          .list-section {
            display: flex;
            flex-direction: row;
            justify-content: right;

            .q-avatar {
              height: 22px;
              width: 22px;
            }
          }
        }
      }

      .side-expansion-list {
        &.top-expansion {
          margin-bottom: 10px;
        }

        .expansion-body {
          display: flex;
          margin-left: 8px;
        }

        .q-expansion-item__content {
          .vertical-separator {
            margin: 6px 9px 9px 9px;
            @media screen and (max-width: 599px) {
              margin: 0 10px 12px 10px;
            }
          }
        }

        .q-list {
          &.list-expansion {
            margin-bottom: 0;

            .item-list-expansion {
              height: 30px;
              margin: 5px;

              .item-list-expansion-title {
                justify-content: start;
              }
            }

            .top-expansion-separator {
              margin: 0 40px 5px 40px;
              @media screen and (max-width: 1439px) {
                margin: 0 30px 5px 30px;
              }
              @media screen and (max-width: 599px) {
                margin: 0 45px 5px 45px;
              }
            }

            .list-child-item {
              height: 30px;
              justify-content: right;
              margin-bottom: 8px;
              width: 157px;
              border-radius: 10px;
              padding: 0 14px;
              @media screen and (max-width: 1439px) {
                width: 148px;
              }
              @media screen and (max-width: 599px) {
                width: 160px;
                margin-bottom: 5px;
                padding: 0 10px 0 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }

              .list-child-section {
                font-size: 14px !important;
                justify-content: center;
              }
            }
          }
        }
      }

      .active-route {
        background-color: #8075DC;

        .indicator {
          height: 6px;
          width: 6px;
          background-color: white;
          border-radius: 50%;
          margin: auto;
        }
      }

    }

    .q-item__section--avatar {
      min-width: 0 !important;
    }

    a {
      text-decoration: none;
      color: white;
      padding: 0;
    }
  }

  .log-out {
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    margin-top: 15px;
    //@media screen and (max-width: 1439px) {
    //  margin: 0 31px 33px 31px;
    //}
    //@media screen and (max-width: 599px) {
    //  margin: 0 30px 30px 30px;
    //  //padding: 0 0 0 10px;
    //}

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }
}
</style>
<style lang="scss">
.side-menu-main-layout {
  .q-expansion-item__container {
    .q-item {
      display: flex;
      padding: 0 10px !important;

    }

    .q-icon {
      font-size: 21px;
    }
  }
}

</style>
