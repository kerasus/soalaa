<template>
  <div class="online-quiz-template-header">
    <div class="right-side">
      <q-btn
        class="toolbar-button"
        icon="isax:menu-1"
        color="white"
        text-color="accent"
        dense
        unelevated
        @click="toggleLeftDrawer"
      />
      <q-btn
        class="toolbar-button"
        icon="mdi-dots-grid"
        color="white"
        text-color="accent"
        dense
        unelevated
        @click="changeView"
      />
    </div>
    <div class="left-side">
      <q-btn-dropdown
        class="toolbar-button"
        content-class="profile-menu"
        icon="isax:user"
        dropdown-icon="false"
        color="white"
        text-color="accent"
        :label="user.full_name "
        dir="ltr"
        dense
        unelevated
      >
        <online-quiz-top-menu/>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script>
import onlineQuizTopMenu from 'components/Menu/topMenu/onlineQuizTopMenu'
export default {
  name: 'onlineQuizTemplateHeader',
  components: { onlineQuizTopMenu },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    changeView () {
      this.$router.push({
        name: 'konkoorView',
        params: {
          quizId: this.$route.params.quizId
        }
      })
    },
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    toggleLeftDrawer () {
      const visibility = this.$store.getters['AppLayout/layoutLeftDrawerVisible']
      return this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', !visibility)
    }
  }
}
</script>

<style lang="scss" scoped>
.online-quiz-template-header{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
</style>
<style lang="scss">
.online-quiz-template-header{
  .left-side {
    .q-btn {
      &.toolbar-button {
        .q-btn__content {
          .q-btn-dropdown__arrow {
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
