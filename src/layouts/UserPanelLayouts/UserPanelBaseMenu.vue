<template>
  <div
    class="user-panel-base-menu"
    :class="{ 'list-side-mode' :  mode === 'sideBar' , 'list-drawer-mode' : mode === 'drawer'}"

  >
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
                  :exact-active-class="getQItemExactActiveClass"
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
            v-model="clickedItem"
            :to="(item.routeName) ? {name: item.routeName} : null"
            class="item-list"
            :class="{ 'alone-item': !item.children.length , 'alone-item-mode-drawer' : mode === 'drawer'}"
            :exact-active-class="getQItemExactActiveClass"
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
  name: 'UserPanelBaseMenu',
  props: {
    mode: {
      type: String,
      default () {
        return 'sideBar'
      }
    }
  },
  data () {
    return {
      clickedItem: null,
      titlesList: [
        // {
        //   title: 'داشبورد',
        //   icon: 'isax:home',
        //   routeName: 'dashboard',
        //   permission: 'all',
        //   active: false,
        //   children: []
        // },
        {
          title: 'آزمون ها',
          icon: 'isax:task-square',
          routeName: 'User.Exam.List',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'سفارش‌ های من',
          icon: 'isax:clipboard-text',
          routeName: 'User.MyOrders',
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
    },
    getQItemExactActiveClass () {
      if (this.mode === 'drawer') {
        return 'item-mode-drawer'
      }
      return 'active-route-side-mode'
    }
  }
}
</script>

<style scoped lang="scss">
.user-panel-base-menu {
  display: flex;
  flex-direction: column;
  color: #6D708B;
  @media screen and (max-width: 1919px) {}
  @media screen and (max-width: 1439px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
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
          @media screen and (max-width: 1439px) {
            font-weight: 400 ;
            font-size: 14px ;
            line-height: 22px ;
          }
          &.alone-item {
            height: 40px;

            &.active-route-side-mode {
              .indicator {
                height: 8px;
                width: 8px;
                background-color: white;
                border-radius: 50%;
                margin: auto;
              }
            }
          }
          &.alone-item-mode-drawer {
            &.active-route-side-mode {
              .indicator {
                background-color: #6D708B6B !important;
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

      .active-route-side-mode {

        background-color: #8075DC;
        .indicator {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          margin: auto;
        }
      }
      .item-mode-drawer {
        background: #F6F9FF;
        .indicator {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          margin: auto;
          background-color: #6D708B6B ;
        }
      }

    }

    .q-item__section--avatar {
      min-width: 0 !important;
    }

    a {
      text-decoration: none;
      padding: 0;
    }
  }

  &.list-side-mode {
    color: white;
    .q-list {
      a {
        color: white;
      }
    }
  }

  &.list-drawer-mode {
    color: #6D708B;
    .q-list {
      a {
        color: #6D708B;
      }
    }
  }

  .log-out {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    padding: 0 6px;
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
.user-panel-base-menu {
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
