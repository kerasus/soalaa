<template>
  <div class="flex justify-center user-app-bar-container">
    <div class="app-bar">
      <div class="row">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="col-3 flex logo">
          <div class="logo-pic">
            <q-img src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"
                   width="71px"
                   height="71px" />
          </div>
          <div>
            <q-btn flat
                   icon="mdi-more"
                   @click="toggleLeftDrawer" />
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="col-6 flex justify-center">
          <q-list class="flex tabs-list">
            <q-item
              v-ripple
              clickable
              :active="selected === 'exams'"
              active-class="active-item"
              @click="selected = 'exams'">
              <q-item-section class="tab-title">
                آزمون ها
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              :active="selected === 'questionBank'"
              active-class="active-item"
              @click="selected = 'questionBank'">
              <q-item-section class="tab-title">
                بانک سوال
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              :active="selected === 'soalaMag'"
              active-class="active-item"
              @click="selected = 'soalaMag'">
              <q-item-section class="tab-title">
                سوالامگ
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              :active="selected === 'askedQuestions'"
              active-class="active-item"
              @click="selected = 'askedQuestions'">
              <q-item-section class="tab-title">
                سوالات متداول
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              :active="selected === 'contactUs'"
              active-class="active-item"
              @click="selected = 'contactUs'">
              <q-item-section class="tab-title">
                تماس با ما
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="col-3 user-action">
          <div>
            <q-btn icon="isax:notification"
                   unelevated
                   rounded
                   size="12px"
                   class="action-btn" />
            <q-btn icon="isax:shopping-bag"
                   unelevated
                   rounded
                   size="12px"
                   class="action-btn" />
          </div>
          <q-btn flat
                 class="btn-user-profile">
            <q-img class="user-photo"
                   :src="'https://cdn.quasar.dev/img/avatar2.jpg'"
                   width="48px"
                   height="48px" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserTemplateHeader',
  data () {
    return {
      selected: 'exams'
    }
  },
  computed: {
    ...mapGetters('Auth', [
      'user'
    ]),
    ...mapGetters('AppLayout', [
      'layoutLeftDrawerVisible'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    }
  }
}
</script>

<style scoped lang="scss">
.user-app-bar-container {
  background-color: #fff;
  height: 72px;
  align-items: center;
  .app-bar {
    max-width: 1360px;
    min-width: 1360px;
    .logo {
      align-items: center;
      .logo-pic {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    .tabs-list {
      height: 72px;
      .tab-title {
        //font-family: 'Yekan Bakh FaNum';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
      }
    }
    .active-item {
      color: #9690E4;
    }
    .user-action {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-user-profile {
        margin-left: 18px;
        width: 48px;
        height: 48px;
        border-radius: 16px;
        :deep(.q-btn__content) {
          margin: 0;
          .user-photo {
            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
      }
      .action-btn {
        margin: 4px;
      }
      .fit-profile-img {
        width: 48px;
        height: 48px;
        border-radius: 16px;
      }
    }
  }
}
</style>
<style scoped>
</style>
