<template>
  <div class="user-panel-side-drawer">
    <q-img
      class="logo-pic-img"
      src="https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png"
      @click="routeTo('HomePage')"
    />
    <div class="separator-line"></div>
    <q-list class="tabs-list">
      <div
        v-for="(item , index) in headerItems"
        :key="index"
        class="tabs-list-container"
      >
        <div
          v-if="showMenuItem(item)"
          class="self-center"
        >
          <q-item
            v-ripple
            clickable
            :active="isRouteSelected(item.to)"
            active-class="active-item"
            :to="{ name: item.to }"
          >
            <q-item-section class="tab-title">
              {{ item.title }}
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import UserLayoutHeader from 'src/mixin/UserLayoutHeader'

export default {
  name: 'UserPanelSideDrawer',
  mixins: [UserLayoutHeader],
  methods: {
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped lang="scss">
.user-panel-side-drawer {
    padding: 10px 20px;
  @media screen and (max-width: 599px) {
    padding: 4px 16px;
  }
  .logo-pic-img {
    width: 72px;
    margin-bottom: 8px;
    @media screen and (max-width: 599px) {
      width: 44px;
    }
  }
  .separator-line {
    border: 1px solid #E4E8EF;
  }
  .tabs-list {
    :deep(.q-item) {
      padding: 16px 10px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      color: #6D708B;
      @media screen and (max-width: 599px) {
        padding: 10px 0;
        font-weight: 600;
        font-size: 12px;
        line-height: 19px;
      }
    }
  }
}
</style>
