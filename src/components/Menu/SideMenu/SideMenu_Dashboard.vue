<template>
  <v-list
    nav
    class="menu"
  >
    <v-list-item-group
      v-model="userGroup"
      active-class="deep-purple--text text--accent-4"
      @change="adminGroup = null"
    >
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'dashboard' }"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#fff">
              mdi-view-dashboard
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>داشبورد</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'onlineQuiz.result.lessonDetails' }"
      >
        <v-list-item>
          <v-list-item-title>شرکت در آزمون</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-for="item in userList"
        :key="item.displayName"
        class="text-decoration-none"
        :class="{'router-link-active': $route.name === item.to.name}"
        :to="item.to"
      >
        <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
          <v-list-item-title>{{ item.displayName }}</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'quest.create' }"
      >
        <v-list-item>
          <v-list-item-title>اطلاعیه و اصلاحیه</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'onlineQuiz.result' }"
      >
        <v-list-item>
          <v-list-item-title>کارنامه</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'onlineQuiz.result.lessonDetails' }"
      >
        <v-list-item>
          <v-list-item-title>ریزدرس ها</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'onlineQuiz.result.topScore' }"
      >
        <v-list-item>
          <v-list-item-title>نتایج نفرات برتر</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link
        v-if="false"
        class="text-decoration-none"
        :to="{ name: 'onlineQuiz.result.pasokhbarg' }"
      >
        <v-list-item>
          <v-list-item-title>پاسخ برگ</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list-item-group>
    <v-list-item-group
      v-if="user.has_admin_permission"
      v-model="adminGroup"
      class="admin-panel"
      active-class="deep-purple--text text--accent-4"
      @change="userGroup = null"
    >
      <router-link
        v-for="item in adminList"
        :key="item.displayName"
        class="text-decoration-none"
        :class="{'router-link-active': $route.name === item.to.name}"
        :to="item.to"
      >
        <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
          <v-list-item-title>{{ item.displayName }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list-item-group>
    <!--    <v-list-item-group-->
    <!--      v-if="user.has_educational_permission && !user.has_admin_permission"-->
    <!--      v-model="adminGroup"-->
    <!--      class="admin-panel"-->
    <!--      active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"-->
    <!--      @change="userGroup = null"-->
    <!--    >-->
    <v-list-item-group
      v-model="adminGroup"
      class="admin-panel "
      active-class="deep-purple--text text--accent-4"
      @change="userGroup = null"
    >
      <router-link
        v-for="item in educationList"
        :key="item.displayName"
        class="text-decoration-none"
        :class="{'router-link-active': $route.name === item.to.name}"
        :to="item.to"
      >
        <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
          <v-list-item-title>{{ item.displayName }}</v-list-item-title>
        </v-list-item>
      </router-link>
      <v-list-group
        v-if="user.has_admin_permission"
        class="question_bank"
        prepend-icon="mdi-bank-outline"
        color="white"
      >
        <template v-slot:activator>
          <v-list-item-title>
            بانک سوال
          </v-list-item-title>
        </template>
        <router-link
          :to="{ name:'question.create'}"
          class="text-decoration-none"
        >
          <v-list-item>
            <v-list-item-title class="question_bank_item_list">
              سوال جدید
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link
          :to="{ name:'question.list'}"
          class="text-decoration-none"
        >
          <v-list-item>
            <v-list-item-title class="question_bank_item_list">
              کارخانه ی سوال
            </v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mixinAuth } from '@/mixin/Mixins'

export default {
  name: "SideMenuDashboard",
  mixins: [mixinAuth],
  data: () => ({
    userGroup: null,
    adminGroup: null,
    userList: [
      {
        displayName: 'آزمون های سه آ',
        to: { name: 'user.exam.list' }
      },
      {
        displayName: 'سوالات متداول',
        to: { name: 'faq' }
      }
    ],
    adminList: [
      {
        displayName: 'ویرایش درخت دانش',
        to: { name: 'tree.edit' }
      },
      {
        displayName: 'ساخت سوال',
        to: { name: 'quest.create' }
      },
      {
        displayName: 'لیست آزمون ها',
        to: { name: 'onlineQuiz.exams' }
      },
      {
        displayName: 'بانک سوال',
        to: { name: 'quest.index' }
      },
      {
        displayName: 'لیست دروس',
        to: { name: 'subCategory.edit' }
      },
      {
        displayName: 'لیست دفترچه ها',
        to: { name: 'category.edit' }
      },
      {
        displayName: 'لیست زیرگروه ها',
        to: { name: 'subGroup.edit' }
      },
      {
        displayName: 'اضافه کردن سوالات MBTI',
        to: { name: 'question.mbti.create' }
      }
    ],
    educationList: [
      // {
      //   displayName: 'لیست آزمون ها',
      //   to: { name: 'onlineQuiz.exams' }
      // },
    ]
  }),
  created () {
    if (
      !this.user.has_admin_permission &&
      this.user.has_educational_permission
    ) {
      this.adminList = [
        {
          displayName: 'لیست آزمون ها',
          to: { name: 'onlineQuiz.exams' }
        }
      ]
    }
  }
}
</script>
<style scoped>
.v-list__group__header__prepend-icon .v-icon {
  color: red;
}
.admin-panel {
  border-top: 1px solid var(--surface-1);
}
.menu .v-list-item-group .question_bank {
  padding: 0;
}
.menu .v-list-item-group .question_bank .question_bank_item_list {
  margin-right: 30px;
  font-size: 14px !important;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}
</style>

<style>
.menu .v-list-item-group .question_bank mdi-chevron-down::before {
  content: "\F0140";
  color: white;
}
.menu .v-list-item__title {
  color: var(--text-3);
  font-size: 16px !important;
  font-weight: normal !important;
}

.menu .v-list-item__icon {
  margin-left: 12px !important;
}

.v-list.menu {
  padding: 8px 0 !important;
}

.router-link-exact-active .v-list-item {
  /*background: var(--primary-1);*/
  padding: 0 8px 0 0 !important;
  border-radius: 0 !important;
}

.router-link-exact-active .v-list-item .v-list-item__title {
  border-left: 4px solid var(--surface-1);
}
.v-list-group--active > .v-list-group__header .v-list-item,
.v-list-group--active > .v-list-group__header .v-list-item__content,
.v-list-group--active
  > .v-list-group__header
  .v-list-group__header__prepend-icon
  .v-icon {
  color: white;
}
.menu .theme--light.v-icon {
  color: white !important;
}
</style>
