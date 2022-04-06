<template>
  <div class="bg-primary side-menu-main-layout">
    <div class="side-logo">
      <div class="logo-image">
        <q-img
          src="https://3a.alaatv.com/img/logo-2.png"
        />
      </div>
    </div>
    <q-list
      class="side-menu-list"
      padding
      dark
    >
      <q-expansion-item
        class="side-expansion-list top-expansion"
        :header-style="{fontSize:'16px', height:'40px', borderRadius: '14px'}"
        label="برنامه ی آزمون ها"
        dark
      >
        <q-list
          class="list-expansion"
          padding
        >
          <div
            v-for="(examPlan, index) in examsPlan"
            :key="index"
          >
            <a
              v-if="!examPlan.divider"
              :href="examPlan.link"
              target="_blank"
            >
              <q-item
                clickable
                v-ripple:deep-purple
                :active="false"
                active-class="active-route"
              >
                <q-item-section class="item-list-expansion">
                  <span class="item-list-expansion-title">
                    {{ examPlan.name }}
                  </span>
                </q-item-section>
              </q-item>
            </a>
            <q-separator
              v-else
              class="top-expansion-separator"
              size="2px"
              dark
            />
          </div>
        </q-list>
      </q-expansion-item>
      <q-separator class="top-separator" size="2px" dark/>
      <div
        v-for="(item , index) in titlesList"
        :key="index"
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
            <q-separator dark size="2px" vertical class="vertical-separator"/>
            <q-list class="list-expansion">
<!--              Todo : toxic Traits!!!!!-->
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
                <span class="indicator"/>
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
            <q-item-section class="list-section title-icon" avatar>
              <q-avatar :icon="item.icon" size="30"/>
            </q-item-section>
            <q-item-section class="list-section">
              {{ item.title }}
            </q-item-section>
            <span class="indicator"/>
          </div>
        </q-item>
      </div>
    </q-list>
    <div class="log-out" @click="logOut">
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
          routeName: 'dashboard',
          active: false,
          children: []
        },
        {
          title: 'سوال',
          icon: 'isax:bank',
          routeName: null,
          active: false,
          children: [
            {
              displayName: 'ثبت سوال',
              routeName: 'Admin.Question.Create.Image',
              params: {
                questionType: 'multipleChoice'
              },
              active: false
            },
            // { displayName: 'ثبت سوال', routeName: 'a', active: false },
            { displayName: 'کارخانه سوال', routeName: 'Admin.Question.Factory', active: false },
            { displayName: 'بانک سوال', routeName: 'Admin.Question.Bank', active: false }
          ]
        },
        {
          title: 'آزمون',
          icon: 'isax:task-square',
          routeName: null,
          active: false,
          children: [
            { displayName: 'ساخت آزمون', routeName: 'Admin.Exam.Create', active: false },
            { displayName: 'لیست آزمون ها', routeName: 'Admin.Exam.Index', active: false }
          ]
        },
        {
          title: 'درخت دانش',
          icon: 'isax:tree',
          routeName: 'Admin.KnowledgeTree.tree',
          active: false,
          children: []
        },
        {
          title: 'لیست دروس',
          icon: 'isax:book',
          routeName: 'Admin.subCategory.Index',
          active: false,
          children: []
        },
        {
          title: 'لیست دفترچه ها',
          icon: 'isax:book',
          routeName: 'Admin.Category.Index',
          active: false,
          children: []
        },
        {
          title: 'گزارشات',
          icon: 'isax:graph',
          routeName: null,
          active: false,
          children: []
        },
        {
          title: 'تنظیمات',
          icon: 'isax:setting-2',
          routeName: 'Admin.Settings',
          active: false,
          children: []
        },
        {
          title: 'سوالات متداول',
          icon: 'isax:message-question',
          routeName: 'faq',
          active: false,
          children: []
        }
      ],
      examsPlan: [
        {
          divider: true
        },
        {
          name: 'دهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_dahom.pdf'
        },
        {
          name: 'دهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_dahom.pdf'
        },
        {
          name: 'دهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_dahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'یازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_yazdahom.pdf'
        },
        {
          name: 'یازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_yazdahom.pdf'
        },
        {
          name: 'یازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_yazdahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'دوازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_davazdahom.pdf'
        }
      ]
    }
  },
  methods: {
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 840px;
  border-radius: 30px;
  margin: 40px 24px;
  @media screen and (max-width: 1919px) {
    width: 260px;
    min-height: 740px;
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
    width: 242px;
  }

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1919px) {
      height: 136px;
    }
    @media screen and (max-width: 1439px) {
      height: 100px;
    }
    @media screen and (max-width: 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1919px) {
        height: 76px;
      }
      @media screen and (max-width: 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1919px) {
          height: 76px;
        }
        @media screen and (max-width: 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      margin: 0 24px 109px 24px;
      @media screen and (max-width: 1919px) {
        margin: 0 24px 34px 24px;
      }
      @media screen and (max-width: 1439px) {
        margin: 0 21px 26px 21px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 18px 8px 18px;
      }

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
    width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
    }

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
