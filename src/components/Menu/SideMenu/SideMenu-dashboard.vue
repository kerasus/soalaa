<template>
  <div>
    <q-list
      class="side-menu-list"
      padding
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
          :active="$route.name === userItem .name"
          active-class="active-route"
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
      class="side-menu-list"
    >
      <router-link
        v-for="(adminItem , index) in adminList"
        :key="index"
        :to="adminItem.to"
      >
        <q-item
          clickable
          v-ripple:deep-purple-5
          v-model="adminGroup"
          :active="$route.name === adminItem.name"
          active-class="active-route"
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
    <q-list
      class="side-menu-list"
      padding
      dark
    >
      <q-expansion-item
        style="font-size:16px; "
        icon="account_balance"
        label="بانک سوال"
      >
        <q-list
          class="side-menu-list"
          padding
        >
          <router-link
            v-for="(questionBankItem , index) in questionBankList"
            :key="index"
            :to="questionBankItem.to"
          >
            <q-item
              clickable
              v-ripple:deep-purple
              v-model="questionGroup"
              :active="$route.name === questionBankItem .name"
              active-class="active-route"
            >
              <q-item-section class="side-list-item">
              <span class="list-title">
                {{questionBankItem.displayName}}
              </span>
                <span
                  v-if="true"
                  class="indicator"
                />
              </q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'SideMenu-dashboard',
  data () {
    return {
      userGroup: null,
      adminGroup: null,
      questionGroup: null,
      activeRoute: null,
      userList: [
        {
          displayName: 'آزمون های سه آ',
          to: '/user_exam_list',
          name: 'user.exam.list'
        },
        {
          displayName: 'سوالات متداول',
          to: 'user-exam',
          name: 'user.exam'
        }
      ],
      adminList: [
        {
          displayName: 'لیست آزمون ها',
          to: '/exam',
          name: 'list'
        },
        {
          displayName: 'بانک سوال',
          to: '/questions',
          name: 'question-bank'
        },
        {
          displayName: 'لیست دروس',
          to: '/sub_category/edit',
          name: 'subCategory.edit'
        },
        {
          displayName: 'لیست دفترچه ها',
          to: '/category',
          name: 'categoryList'
        },
        {
          displayName: 'لیست زیرگروه ها',
          to: 'subGroup.edit',
          name: 'subGroup.edit'
        },
        {
          displayName: 'اضافه کردن سوالات MBTI',
          to: '/question/mbti/create',
          name: 'question.mbti.create'
        }
      ],
      questionBankList: [
        {
          displayName: 'سوال جدید',
          to: '/question/create',
          name: 'user.exam'
        },
        {
          displayName: ' کارخانه ی سوال',
          to: '/question/list',
          name: 'question.list'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.q-list{
  &.side-menu-list{
    .active-route{
      background-color: rgba(98,0,234,0.12);
      color: rgb(255,255,255,0.6) !important;
      .indicator{
        height: 50%;
        width: 3px;
        background-color: white;
        justify-content: end;
      }
    }
    .side-list-item{
      justify-content: space-between;
      align-items: center;
      .list-title{
        justify-content: start;
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
  .q-item__section--avatar{
    min-width: 0 !important;
  }
  a{
    text-decoration: none;
    color: white;
  }
}
</style>
<style lang="scss">
.q-list {
  &.side-menu-list {
    .q-item__section--avatar {
      min-width: 0 !important;
    }
  }
}
</style>
