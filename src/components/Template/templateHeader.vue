<template>
  <div
    class="drawer-btn"
    :class="{'col-6': windowSize.x < 599}"
  >
    <q-btn
      class="toolbar-button"
      icon="isax:menu-1"
      color="white"
      text-color="accent"
      dense
      unelevated
      @click="toggleLeftDrawer"
    />
  </div>
  <div
    class="right-side"
    :class="{'col-6': windowSize.x > 1439, 'col-12': windowSize.x < 599}"
  >
    <div
      v-if="breadcrumbsVisibility"
    >
      <q-skeleton
        v-if="!breadcrumbs.path"
        width="100px"
        height="10px"
      />
      <q-breadcrumbs
        v-else
        class="breadcrumbs"
        separator-color="dark"
        gutter="sm"
      >
        <template v-slot:separator>
          <q-icon name="isax:arrow-right-3 "/>
        </template>
        <q-breadcrumbs-el
          v-for="(breadcrumb, index) in breadcrumbs.path"
          :key="index"
        >
          <q-skeleton
            v-if="breadcrumb.loading"
            width="100px"
            height="10px"
          />
          <q-breadcrumbs-el
            v-else
            :icon=breadcrumb.icon
            :label=breadcrumb.title
            :to="getRoute(breadcrumb.route)"
            class="q-breadcrumbs-el"
          />
        </q-breadcrumbs-el>
      </q-breadcrumbs>

    </div>
  </div>
  <div
    class="left-side"
    :class="{'col-6': windowSize.x < 599, 'col-6': windowSize.x > 1439}">
    <q-btn-dropdown
      v-if="false"
      class="toolbar-button"
      content-class="profile-menu"
      icon="isax:notification"
      dropdown-icon="false"
      color="white"
      text-color="accent"
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
      text-color="accent"
      dir="ltr"
      dense
      unelevated
      >
      <q-list>
        <q-item clickable v-close-popup @click="logOut">
          <q-item-section>
            <q-item-label>خروج</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'templateHeader',
  data () {
    return {}
  },
  mounted () {
    this.$store.commit('AppLayout/updateBreadcrumbLoading', false)
    this.$store.commit('AppLayout/updateVisibilityBreadcrumb', true)
  },
  computed: {
    ...mapGetters('AppLayout', [
      'breadcrumbsVisibility',
      'breadcrumbs',
      'breadcrumbLoading',
      'layoutLeftDrawerVisible',
      'windowSize'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateVisibilityBreadcrumb',
      'updateBreadcrumbs',
      'updateBreadcrumbLoading',
      'updateLayoutLeftDrawerVisible'
    ]),
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    },
    hasRoute (route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    getRoute (route) {
      if (!this.hasRoute(route)) {
        return { name: null }
      }
      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return { name: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-btn {
  display: none;
  @media screen and (max-width: 1439px) {
    display: block;
  }
  @media screen and (max-width: 599px) {
    margin-bottom: 10px;
  }
}

.right-side {
  display: flex;
  align-items: center;
  @media screen and (max-width: 1439px) {
    margin-left: 78px;
  }
  @media screen and (max-width: 1023px) {
    margin-left: 42px;
  }
  @media screen and (max-width: 599px) {
    margin-left: 0;
  }

  .breadcrumbs {
    &:deep(> *) {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 31px;
      text-align: right;
      color: #23263B;

      div:first-child {
        font-size: 18px;
      }
    }
  }
}

.left-side {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1439px) {
    position: absolute;
    right: 30px;
  }
  @media screen and (max-width: 599px) {
    right: 16px;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.breadcrumbs {
  .q-breadcrumbs__separator {
    .q-icon {
      font-size: 22px;
    }
  }
}

.drawer-btn {
  .q-btn {
    flex-direction: row !important;

    &.toolbar-button {
      margin-left: 0 !important;
    }
  }
}

.q-btn {
  &.toolbar-button {
    margin-left: 12px;
    height: 48px;
    width: 48px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
  }
}

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
</style>
