<template>
  <div class="header-menu"
       :class="options.className"
       :style="options.style">
    <div class="logo-pic"
         @click="routeTo('Public.Home')">
      <lazy-img :src="localOptions.logoImage"
                :alt="'logo'"
                width="40"
                height="40"
                class="logo-pic-img" />
      <div class="logo-text">
        {{ localOptions.logoSlogan }}
      </div>

    </div>
    <div class="routes">
      <q-list class="routes-list">
        <q-item v-for="item in localOptions.menuLink"
                :key="item"
                class="route-link"
                clickable
                @click="takeAction(item)">
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="user">
      <q-btn v-if="localOptions.hasAction"
             color="white"
             flat
             :label="localOptions.actionObject.buttonLabel"
             @click="takeAction(localOptions.actionObject)" />
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { openURL } from 'quasar'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'HeaderMenu',
  components: { LazyImg },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        style: {},
        className: '',
        menuLink: [],
        logoImage: null,
        logoSlogan: null,
        hasAction: false,
        actionObject: {
          buttonLabel: null,
          type: null,
          className: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  methods: {
    routeTo(name) {
      this.$router.push({ name })
    },
    takeAction(item) {
      if (item.type === 'link') {
        openURL(item.route)
      } else if (item.type === 'scroll') {
        this.scrollToElement(item.className)
      } else if (item.type === 'event') {
        this.$bus.emit(item.eventName, item.eventArgs)
      }
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-pic {
    cursor: pointer;
    display: flex;
    height: 72px;
    align-items: center;
    @media screen and (max-width: 1023px) {
      height: 64px;
    }
    .logo-pic-img {
      height: 40px;
      width: 40px;
      @media screen and (max-width: 1023px) {
        height: 48px;
        width: 48px;
      }
    }
    .logo-text {
      padding: 0 10px;
      padding: 0 10px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .routes {
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1024px) {
      display: none;
    }
    .routes-list {
      display: flex;

      .route-link {
        margin: 0 20px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        cursor: pointer;

        &:deep(.q-focus-helper) {
          display: none;
        }
      }
    }
  }

  .user {
    margin: 0 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    &:deep(.q-btn .q-focus-helper) {
      display: none;
    }
  }
}
</style>
