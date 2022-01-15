<template>
  <div
  class="profile-card"
  >
    <q-img
      style="background-color: #e8e8e8;"
      :src="user.photo"
      width="300px"
      height="300px"
      dark
    >
    </q-img>
    <q-btn
      style="letter-spacing: inherit;"
      href="https://alaatv.com/"
      large
      dark
      block
      color="amber-7"
    >
      آلاء
    </q-btn>
    <q-btn
      style="letter-spacing: inherit;"
      :to="{ name: 'dashboard' }"
      large
      dark
      tile
      block
      color="orange"
      elevation="0"
    >
      سه آ
    </q-btn>
    <q-btn
      style="letter-spacing: inherit;"
      large
      dark
      tile
      block
      color="red"
      @click="logout"
    >
      خروج
    </q-btn>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'

export default {
  name: 'DashboardTopMenu',
  mixins: [mixinAuth],
  methods: {
    logout () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile-card{
    width: 100%;
    flex-direction: row;
    max-width: 300px;
    border-radius: 20px;
     .q-btn{
       padding: 0 !important;
       text-decoration: none;
       height: 44px;
       width: 100%;
       color: white;
       text-align: center;
       padding: 12px;
       box-sizing: border-box;
    }
 }
</style>
