<template>
<div class="side-menu-list">
  <q-list
    dense
    padding
    class="rounded-borders"
  >
    <q-item
      v-for="(userItem , index) in userList"
      :key="index"
      clickable
      v-ripple
      v-model="userGroup"
    >
      <router-link to="userItem.to">
        {{userItem.displayName}}
      </router-link>
    </q-item>
  </q-list>
  <q-separator dark />
  <q-list
    dense
    padding
    class="rounded-borders"
  >
    <q-item
      v-for="(adminItem , index) in adminList"
      :key="index"
      clickable
      v-ripple
      v-model="adminGroup"
    >
      <router-link to="adminItem.to">
        {{adminItem.displayName}}
      </router-link>
    </q-item>
  </q-list>
  <q-separator dark />
</div>
</template>

<script>
export default {
  name: 'SideMenu-dashboard',
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-list{
  a{
    text-decoration: none;
    color: white;
  }
}
</style>
