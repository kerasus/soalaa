<template>
  <div class="layout-header">
    <div class="right-side">
      <span
        v-for="(address, index) in addresses"
        :key="index"
        class="address-bar"
      >
        {{ address }}
      </span>
    </div>
    <div class="left-side">
      <q-btn-dropdown
        class="toolbar-button"
        content-class="profile-menu"
        icon="isax:notification"
        dropdown-icon="false"
        color="white"
        text-color="black"
        dir="ltr"
        dense
        unelevated
      >
        <q-badge color="red" rounded floating>3</q-badge>
      </q-btn-dropdown>
      <q-btn-dropdown
        class="toolbar-button"
        content-class="profile-menu"
        icon="isax:user"
        dropdown-icon="false"
        color="white"
        text-color="black"
        dir="ltr"
        dense
        unelevated
      >
        <DashboardTopMenu/>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script>
import dashboardTopMenu from 'components/Menu/topMenu/DashboardTopMenu'

export default {
  name: 'mainHeader',
  components: { dashboardTopMenu },
  data () {
    return {
      leftDrawerOpen: false,
      addresses: ['سوال', 'لیست آزمون ها', 'یکی از آزمونا']
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  margin: 60px 100px 24px 76px;
  .right-side {
    display: flex;
    align-items: center;
    .address-bar {
      font-size: 18px;
      font-weight: 500;
      color: #23263B;
      &::after {
        content: ">";
        margin: 0 10px;
      }
      &:last-child {
        &::after {
          content: none;
        }
      }
    }
  }

  .left-side {
    .q-btn {
      &.toolbar-button {
        margin-right: 12px;
        height: 48px;
        width: 48px;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 16px;
      }
    }
  }
}
</style>
<style lang="scss">
.layout-header {
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
