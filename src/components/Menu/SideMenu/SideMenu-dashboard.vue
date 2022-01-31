<template>
  <div class="bg-secondary side-menu-main-layout">
    <div class="side-logo">
      <div class="logo-image">
        <q-img
          src="https://3a.alaatv.com/img/logo-2.png"
        />
      </div>
    </div>
    <q-separator class="top-separator" size="2px" dark/>
    <q-list
      class="side-menu-list"
      padding
      dark
    >
      <q-item
        v-for="(item , index) in titlesList"
        :key="index"
        :to="item.path"
        class="list-item"
        :class="{ 'item-children': item.children.length , 'alone-item': !item.children.length}"
        v-model="clickedItem"
        :active="$route.name === item.name"
        active-class="active-route"
        @click="selectedItem(item.title)"
      >
        <div class="section-title">
          <q-item-section class="list-section title-icon" avatar>
            <q-avatar :icon="item.icon" size="30"/>
          </q-item-section>
          <q-item-section class="list-section">
            {{ item.title }}
          </q-item-section>
          <span class="indicator"/>
        </div>
        <q-item-section
          v-if="item.children.length"
          class="list-section list-children-section"
        >
          <q-separator dark size="2px" vertical class="vertical-separator"/>
          <q-list>
            <q-item
              v-for="(subItem , i) in item.children"
              :key="i"
              :to="subItem.to"
              class="list-child-item"
              :active="$route.name === subItem.name"
              active-class="active-route"
              @click="clickedChildItem(item.title, subItem.displayName)"
            >
              <q-item-section
                class="list-child-section"
              >
                {{ subItem.displayName }}
              </q-item-section>
              <span class="indicator"/>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="log-out">
      <span>
        <q-avatar icon="isax:logout" size="30" dir="rtl"/>
      </span>
      <span class="logout-text">خروج </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu-dashboard',
  data () {
    return {
      clickedItem: null,
      titlesList: [
        {
          title: 'داشبورد',
          icon: 'isax:home',
          path: '/',
          name: 'dashboard',
          children: []
        },
        {
          title: 'سوال',
          icon: 'isax:bank',
          path: '',
          name: '',
          children: [
            { displayName: 'ثبت سوال', to: '/question/create', name: 'user.exam' },
            { displayName: 'کارخانه سوال', to: '/question/list', name: 'question.list' },
            { displayName: 'بانک سوال', to: '/questions', name: 'question-bank' }
          ]
        },
        {
          title: 'آزمون',
          icon: 'isax:task-square',
          path: '',
          name: '',
          children: [
            { displayName: 'ساخت آزمون', to: '/exam/create', name: 'Admin.Exam.Creat' },
            { displayName: 'لیست آزمون ها', to: '/exam', name: 'Admin.Exam.Index' }
          ]
        },
        {
          title: 'درخت دانش',
          icon: 'isax:tree',
          path: '',
          name: '',
          children: []
        },
        {
          title: 'لیست دروس',
          icon: 'isax:book',
          path: '/subCategory',
          name: 'Admin.subCategory.Index',
          children: []
        },
        {
          title: 'گزارشات',
          icon: 'isax:graph',
          path: '',
          name: '',
          children: []
        },
        {
          title: 'تنظیمات',
          icon: 'isax:setting-2',
          path: '',
          name: '',
          children: []
        },
        {
          title: 'سوالات متداول',
          icon: 'isax:message-question',
          path: '',
          name: '',
          children: []
        }
      ]
    }
  },
  created () {
  },
  methods: {
    selectedItem (item) {
      this.$emit('selectedItem', item)
    },
    clickedChildItem (item, child) {
      this.$emit('selectedChildItem', { item, child })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 840px;
  border-radius: 30px;
  margin: 40px 24px;
  @media screen and (max-width: 1439px) {
    width: 260px;
    height: 740px;
    margin: 30px 30px 30px 24px;
  }
  @media screen and (max-width: 1023px) {
    margin: 0 !important;
    border-radius: 0;
    width: 280px;
    min-height: 680px;
    height: 100%;
  }
  @media screen and (max-width: 349px) {
    width: 242px;
  }

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1439px) {
      height: 136px;
    }
    @media screen and (max-width: 1023px) {
      height: 100px;
    }
    @media screen and (max-width: 349px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1439px) {
        height: 76px;
      }
      @media screen and (max-width: 1023px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1439px) {
          height: 76px;
        }
        @media screen and (max-width: 1023px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .top-separator {
    margin: 0 40px 32px 40px;
    @media screen and (max-width: 1439px) {
      margin: 0 30px 25px 30px;
    }
    @media screen and (max-width: 349px) {
      margin: 0 45px 22px 45px;
    }
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      margin: 0 24px 109px 24px;
      @media screen and (max-width: 1439px) {
        margin: 0 24px 34px 24px;
      }
      @media screen and (max-width: 1023px) {
        margin: 0 21px 26px 21px;
      }
      @media screen and (max-width: 349px) {
        margin: 0 18px 8px 18px;
      }

      .q-item {
        padding: 0;
        min-height: 0;
      }

      .list-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        padding: 0 14px 0 10px;
        border-radius: 14px;

        &.item-children {
          margin-bottom: 0;
        }

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

          &.list-children-section {
            .vertical-separator {
              margin: 6px 9px 9px 9px;
              @media screen and (max-width: 349px) {
                margin: 0 10px 12px 10px;
              }
            }

            .q-list {
              .list-child-item {
                height: 30px;
                justify-content: right;
                margin-bottom: 8px;
                width: 157px;
                border-radius: 10px;
                padding: 0 14px;
                @media screen and (max-width: 1023px) {
                  width: 148px;
                }
                @media screen and (max-width: 349px) {
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

      .side-list-item {
        justify-content: space-between;
        align-items: center;

        .list-title {
          justify-content: start;
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
    margin: 0 37px 36px 37px;
    @media screen and (max-width: 1023px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 349px) {
      margin: 0 30px 30px 30px;
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
  .q-icon {
    font-size: 21px;
  }
}
</style>
