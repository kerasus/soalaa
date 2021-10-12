<template>
<div class="side-menu-list">
  <q-list
    dense
    padding
    class="rounded-borders"
  >
    <router-link
      v-for="(userItem , index) in userList"
      :key="index"
      :to="userItem.to"
    >
      <q-item
        clickable
        v-ripple:deep-purple
        v-model="userGroup"
        :active="true"
        active-class="text-white"
      >
        <q-item-section class="side-list-item">
          <span class="list-title">{{userItem.displayName}}</span>
          <span
            v-if="true"
            class="indicator"
          />
        </q-item-section>
      </q-item>
    </router-link>
  </q-list>
  <q-separator class="bg-white" size="px" />
  <q-list
    dense
    padding
    class="rounded-borders"
  >
    <router-link
      v-for="(adminItem , index) in adminList"
      :key="index"
      :to="adminItem.to"
    >
      <q-item
        clickable
        v-ripple
        v-model="adminGroup"
      >
        <q-item-section class="side-list-item">
        <span class="list-title">
          {{adminItem.displayName}}
        </span>
          <span
            v-if="true"
            class="indicator"
          />
        </q-item-section>
      </q-item>
    </router-link>
  </q-list>
  <q-separator class="bg-white" size="px" />
</div>
</template>

<script>
export default {
  name: 'SideMenu-dashboard',
  data () {
    return {
      userGroup: null,
      adminGroup: null,
      activeRoute: null,
      userList: [
        {
          displayName: 'آزمون های سه آ',
          to: 'user-exam',
          name: 'user.exam'
        },
        {
          displayName: 'سوالات متداول',
          to: 'user-exam',
          name: 'user.exam.list'
        }
      ],
      adminList: [
        {
          displayName: 'ویرایش درخت دانش',
          to: 'tree.edit',
          name: 'tree.edit'
        },
        {
          displayName: 'ساخت سوال',
          to: 'quest.create',
          name: 'quest.create'
        },
        {
          displayName: 'لیست آزمون ها',
          to: 'onlineQuiz.exams',
          name: 'onlineQuiz.exams'
        },
        {
          displayName: 'بانک سوال',
          to: 'quest.index',
          name: 'quest.index'
        },
        {
          displayName: 'لیست دروس',
          to: 'subCategory.edit',
          name: 'subCategory.edit'
        },
        {
          displayName: 'لیست دفترچه ها',
          to: 'category.edit',
          name: 'category.edit'
        },
        {
          displayName: 'لیست زیرگروه ها',
          to: 'subGroup.edit',
          name: 'subGroup.edit'
        },
        {
          displayName: 'اضافه کردن سوالات MBTI',
          to: 'question.mbti.create',
          name: 'question.mbti.create'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.side-menu-list{
  a{
    text-decoration: none;
    color: white;
  }
  .side-list-item{
    justify-content: space-between;
    align-items: center;
    .list-title{
      justify-content: start;
    }
    .indicator{
      height: 50%;
      width: 3px;
      background-color: white;
      justify-content: end;
    }
  }
}
.q-item{
  padding-right: 0 !important;
}
.q-item__section--main{
  flex-direction: row;
  font-size: 16px !important;
  font-weight: normal !important;
}
</style>
