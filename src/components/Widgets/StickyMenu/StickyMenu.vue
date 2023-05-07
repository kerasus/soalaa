<template>
  <div id="stickyMenu"
       class="header-menu">
    <div class="logo-pic"
         @click="routeTo('Public.Home')">
      <lazy-img :src="logoImage"
                :alt="'logo'"
                width="40"
                height="40"
                class="logo-pic-img" />
      <div class="logo-text">
        {{ logoSlogan }}
      </div>

    </div>
    <div class="routes">
      <q-list class="routes-list">
        <q-item v-for="item in menuLink"
                :key="item"
                class="route-link"
                clickable
                @click="takeAction(item)">
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="user">
      <q-btn v-if="action"
             color="white"
             flat
             :label="actionButtonLabel"
             @click="routeTo('Login')" />
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { openURL } from 'quasar'

export default {
  name: 'StickyMenu',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menuLink: [],
      logoImage: '',
      logoSlogan: '',
      action: false,
      actionButtonLabel: '',
      scrollTarget: ''
    }
  },
  computed: {
    scrollOffset() {
      return window.scrollY
    },
    toScrollTarget() {
      return this.getOffset(this.scrollTarget)
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    },
    toScrollTarget(val) {
    },
    scrollOffset(value) {
      if (value < this.toScrollTarget) {
        document.getElementById('stickyMenu').style.display = 'none'
      } else {
        document.getElementById('stickyMenu').style.display = 'flex'
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.menuLink = this.options.menuLink
      this.logoImage = this.options.logoImage
      this.logoSlogan = this.options.logoSlogan
      this.action = this.options.action
      this.actionButtonLabel = this.options.actionButtonLabel
      this.scrollTarget = this.options.scrollTarget
    },
    routeTo(name) {
      this.$router.push({ name })
    },
    takeAction(item) {
      if (item.type === 'link') {
        openURL(item.route)
      } else {
        this.scrollToElement(item.className)
      }
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      if (!el) {
        return
      }
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    getOffset(className) {
      if (className) {
        const el = document.getElementsByClassName(className)[0]
        if (!el) {
          return
        }
        const elementPosition = el.getBoundingClientRect().top
        return elementPosition
      }
    },
    setDisplay() {
      document.getElementById('stickyMenu').style.display = 'flex'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  position: fixed;
  height: 70px;
  top: 0;
  display: none;
  justify-content: space-between;
  background-color: #fff;
  z-index: 110;
  width: 100%;

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
      color: #fff;
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
        color: #fff;
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
