<template>
  <q-layout :view="defaultProperties.layoutView">

    <q-header
      v-if="defaultProperties.layoutHeader"
      :reveal="defaultProperties.layoutHeaderReveal"
      :elevated="defaultProperties.layoutHeaderElevated"
      :bordered="defaultProperties.layoutHeaderBordered"
      :class="[ defaultProperties.layoutHeaderCustomClass, headerVisibility ? 'hidden': '']"
    >
      <slot name="header">
        <q-toolbar>
          <q-btn
            v-if="!defaultProperties.layoutLeftDrawerVisible || defaultProperties.layoutLeftDrawerBtn "
            :icon="defaultProperties.menuIcon"
            side="left"
            @click="toggleLeftDrawer"
          />
          <q-btn
            v-if="!defaultProperties.layoutRightDrawerVisible || defaultProperties.layoutRightDrawerBtn "
            :icon="defaultProperties.menuIcon"
            side="right"
            @click="toggleRightDrawer"
          />
        </q-toolbar>
      </slot>
    </q-header>

    <q-drawer
      v-if="defaultProperties.layoutLeftDrawer"
      show-if-above
      v-model="defaultProperties.layoutLeftDrawerVisible"
      :overlay="defaultProperties.layoutLeftDrawerOverlay"
      :elevated="defaultProperties.layoutLeftDrawerElevated"
      :bordered="defaultProperties.layoutLeftDrawerBordered"
      :class="[ defaultProperties.layoutLeftDrawerCustomClass, leftVisibility ? 'hidden': '']"
      :behavior="defaultProperties.layoutLeftDrawerBehavior"
      :width="defaultProperties.leftDrawerWidth"
      side="left"
      @hide="onHideLeft"
    >
      <slot name="left-drawer"></slot>
    </q-drawer>

    <q-drawer
      v-if="defaultProperties.layoutRightDrawer"
      show-if-above
      v-model="defaultProperties.layoutRightDrawerVisible"
      :overlay="defaultProperties.layoutRightDrawerOverlay"
      :elevated="defaultProperties.layoutRightDrawerElevated"
      :bordered="defaultProperties.layoutRightDrawerBordered"
      :class="[defaultProperties.layoutRightDrawerCustomClass, rightVisibility ? 'hidden': '']"
      :behavior="defaultProperties.layoutRightDrawerBehavior"
      :width="defaultProperties.rightDrawerWidth"
      side="right"
    >
      <slot name="right-drawer"></slot>
    </q-drawer>

    <q-page-container v-if="defaultProperties.layoutPageContainer">
      <slot name="content"></slot>
    </q-page-container>

    <q-footer
      v-if="defaultProperties.layoutFooter || defaultProperties.layoutFooterVisible"
      :reveal="defaultProperties.layoutFooterReveal"
      :elevated="defaultProperties.layoutFooterElevated"
      :bordered="defaultProperties.layoutFooterBordered"
      :class="[defaultProperties.layoutFooterCustomClass, footerVisibility ? 'hidden': '']"
    >
      <slot name="footer">
        <q-toolbar>
        </q-toolbar>
      </slot>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TemplateBuilder',
  props: {
    value: {
      default: () => {
      },
      type: Object
    }
  },
  data () {
    return {
      defaultProperties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: false,
        layoutLeftDrawerVisible: false,
        layoutLeftDrawerBehavior: '',
        layoutLeftDrawerBtn: false,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutRightDrawer: false,
        layoutRightDrawerVisible: false,
        layoutRightDrawerBtn: false,
        layoutRightDrawerOverlay: false,
        layoutRightDrawerBehavior: 'Desktop',
        layoutRightDrawerElevated: false,
        layoutRightDrawerBordered: false,
        layoutPageContainer: true,
        layoutFooter: false,
        layoutFooterVisible: false,
        layoutFooterReveal: false,
        layoutFooterElevated: false,
        layoutFooterBordered: false,
        layoutHeaderCustomClass: '',
        layoutLeftDrawerCustomClass: '',
        layoutRightDrawerCustomClass: '',
        layoutPageContainerCustomClass: '',
        layoutFooterCustomClass: '',
        leftDrawerWidth: 300,
        rightDrawerWidth: 300,
        menuIcon: 'menu'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        this.defaultProperties.layoutView = val.layoutView
        this.updateLayoutView(val.layoutView)

        this.defaultProperties.layoutHeader = val.layoutHeader
        this.updateLayoutHeader(val.layoutHeader)

        this.defaultProperties.layoutHeaderReveal = val.layoutHeaderReveal
        this.updateLayoutHeaderReveal(val.layoutHeaderReveal)

        this.defaultProperties.layoutHeaderElevated = val.layoutHeaderElevated
        this.updateLayoutHeaderElevated(val.layoutHeaderElevated)

        this.defaultProperties.layoutHeaderBordered = val.layoutHeaderBordered
        this.updateLayoutHeaderBordered(val.layoutHeaderBordered)

        this.defaultProperties.layoutLeftDrawer = val.layoutLeftDrawer
        this.updateLayoutLeftDrawer(val.layoutLeftDrawer)

        this.defaultProperties.layoutLeftDrawerVisible = val.layoutLeftDrawerVisible
        this.updateLayoutLeftDrawerVisible(val.layoutLeftDrawerVisible)

        this.defaultProperties.layoutLeftDrawerBehavior = val.layoutLeftDrawerBehavior
        this.updateLayoutLeftDrawerBehavior(val.layoutLeftDrawerBehavior)

        this.defaultProperties.layoutLeftDrawerBtn = val.layoutLeftDrawerBtn

        this.defaultProperties.layoutLeftDrawerOverlay = val.layoutLeftDrawerOverlay
        this.updateLayoutLeftDrawerOverlay(val.layoutLeftDrawerOverlay)

        this.defaultProperties.layoutLeftDrawerElevated = val.layoutLeftDrawerElevated
        this.updateLayoutLeftDrawerElevated(val.layoutLeftDrawerElevated)

        this.defaultProperties.layoutLeftDrawerBordered = val.layoutLeftDrawerBordered
        this.updateLayoutLeftDrawerBordered(val.layoutLeftDrawerBordered)

        this.defaultProperties.layoutRightDrawer = val.layoutRightDrawer
        this.updateLayoutRightDrawer(val.layoutRightDrawer)

        this.defaultProperties.layoutRightDrawerVisible = val.layoutRightDrawerVisible
        this.updateLayoutRightDrawerVisible(val.layoutRightDrawerVisible)

        this.defaultProperties.layoutRightDrawerBtn = val.layoutRightDrawerBtn

        this.defaultProperties.layoutRightDrawerOverlay = val.layoutRightDrawerOverlay
        this.updateLayoutRightDrawerOverlay(val.layoutRightDrawerOverlay)

        this.defaultProperties.layoutRightDrawerBehavior = val.layoutRightDrawerBehavior
        this.updateLayoutRightDrawerBehavior(val.layoutRightDrawerBehavior)

        this.defaultProperties.layoutRightDrawerElevated = val.layoutRightDrawerElevated
        this.updateLayoutRightDrawerElevated(val.layoutRightDrawerElevated)

        this.defaultProperties.layoutRightDrawerBordered = val.layoutRightDrawerBordered
        this.updateLayoutRightDrawerBordered(val.layoutRightDrawerBordered)

        this.defaultProperties.layoutPageContainer = val.layoutPageContainer

        this.defaultProperties.layoutFooter = val.layoutFooter
        this.updateLayoutFooter(val.layoutFooter)

        this.defaultProperties.layoutFooterReveal = val.layoutFooterReveal
        this.updateLayoutFooterReveal(val.layoutFooterReveal)

        this.defaultProperties.layoutFooterElevated = val.layoutFooterElevated
        this.updateLayoutFooterElevated(val.layoutFooterElevated)

        this.defaultProperties.layoutFooterBordered = val.layoutFooterBordered
        this.updateLayoutFooterBordered(val.layoutFooterBordered)

        this.defaultProperties.layoutHeaderCustomClass = val.layoutHeaderCustomClass
        this.defaultProperties.layoutLeftDrawerCustomClass = val.layoutLeftDrawerCustomClass
        this.defaultProperties.layoutRightDrawerCustomClass = val.layoutRightDrawerCustomClass
        this.defaultProperties.layoutPageContainerCustomClass = val.layoutPageContainerCustomClass
        this.defaultProperties.layoutFooterCustomClass = val.layoutFooterCustomClass
        this.defaultProperties.leftDrawerWidth = val.leftDrawerWidth
        this.defaultProperties.rightDrawerWidth = val.rightDrawerWidth
      }
    },
    layoutView: function (value) {
      this.defaultProperties.layoutView = value
    },
    layoutHeader: function (value) {
      this.defaultProperties.layoutHeader = value
    },
    layoutHeaderVisible: function (value) {
      if (this.defaultProperties.layoutHeader) {
        this.defaultProperties.layoutHeaderVisible = value
      }
    },
    layoutHeaderReveal: function (value) {
      if (this.defaultProperties.layoutHeader) {
        this.defaultProperties.layoutHeaderReveal = value
      }
    },
    layoutHeaderElevated: function (value) {
      if (this.defaultProperties.layoutHeader) {
        this.defaultProperties.layoutHeaderElevated = value
      }
    },
    layoutHeaderBordered: function (value) {
      if (this.defaultProperties.layoutHeader) {
        this.defaultProperties.layoutHeaderBordered = value
      }
    },
    layoutLeftDrawer: function (value) {
      this.defaultProperties.layoutLeftDrawer = value
    },
    layoutLeftDrawerVisible: function (value) {
      if (this.defaultProperties.layoutLeftDrawer) {
        this.defaultProperties.layoutLeftDrawerVisible = value
      }
    },
    layoutLeftDrawerBehavior: function (value) {
      if (this.defaultProperties.layoutLeftDrawer) {
        this.defaultProperties.layoutLeftDrawerBehavior = value
      }
    },
    layoutLeftDrawerOverlay: function (value) {
      if (this.defaultProperties.layoutLeftDrawer) {
        this.defaultProperties.layoutLeftDrawerOverlay = value
      }
    },
    layoutLeftDrawerElevated: function (value) {
      if (this.defaultProperties.layoutLeftDrawer) {
        this.defaultProperties.layoutLeftDrawerElevated = value
      }
    },
    layoutLeftDrawerBordered: function (value) {
      if (this.defaultProperties.layoutLeftDrawer) {
        this.defaultProperties.layoutLeftDrawerBordered = value
      }
    },
    layoutRightDrawer: function (value) {
      this.defaultProperties.layoutRightDrawer = value
    },
    layoutRightDrawerVisible: function (value) {
      if (this.defaultProperties.layoutRightDrawer) {
        this.defaultProperties.layoutRightDrawerVisible = value
      }
    },
    layoutRightDrawerBehavior: function (value) {
      if (this.defaultProperties.layoutRightDrawer) {
        this.defaultProperties.layoutRightDrawerBehavior = value
      }
    },
    layoutRightDrawerOverlay: function (value) {
      if (this.defaultProperties.layoutRightDrawer) {
        this.defaultProperties.layoutRightDrawerOverlay = value
      }
    },
    layoutRightDrawerElevated: function (value) {
      if (this.defaultProperties.layoutRightDrawer) {
        this.defaultProperties.layoutRightDrawerElevated = value
      }
    },
    layoutRightDrawerBordered: function (value) {
      if (this.defaultProperties.layoutRightDrawer) {
        this.defaultProperties.layoutRightDrawerBordered = value
      }
    },
    layoutFooter: function (value) {
      this.defaultProperties.layoutFooter = value
    },
    layoutFooterVisible: function (value) {
      if (this.defaultProperties.layoutFooter) {
        this.defaultProperties.layoutFooterVisible = value
      }
    },
    layoutFooterReveal: function (value) {
      if (this.defaultProperties.layoutFooter) {
        this.defaultProperties.layoutFooterReveal = value
      }
    },
    layoutFooterElevated: function (value) {
      if (this.defaultProperties.layoutFooter) {
        this.defaultProperties.layoutFooterElevated = value
      }
    },
    layoutFooterBordered: function (value) {
      if (this.defaultProperties.layoutFooter) {
        this.defaultProperties.layoutFooterBordered = value
      }
    }
  },
  computed: {
    ...mapGetters('AppLayout', [
      'layoutView',
      'layoutHeader',
      'layoutHeaderVisible',
      'layoutHeaderReveal',
      'layoutHeaderElevated',
      'layoutHeaderBordered',
      'layoutHeaderNavTabs',
      'layoutLeftDrawer',
      'layoutLeftDrawerVisible',
      'layoutLeftDrawerBehavior',
      'layoutLeftDrawerOverlay',
      'layoutLeftDrawerElevated',
      'layoutLeftDrawerBordered',
      'layoutRightDrawer',
      'layoutRightDrawerVisible',
      'layoutRightDrawerBehavior',
      'layoutRightDrawerOverlay',
      'layoutRightDrawerElevated',
      'layoutRightDrawerBordered',
      'layoutFooter',
      'layoutFooterVisible',
      'layoutFooterReveal',
      'layoutFooterElevated',
      'layoutFooterBordered'
    ]),
    headerVisibility () {
      return !this.defaultProperties.layoutHeaderVisible
    },
    leftVisibility () {
      return !this.defaultProperties.layoutLeftDrawerVisible
    },
    rightVisibility () {
      return !this.defaultProperties.layoutRightDrawerVisible
    },
    footerVisibility () {
      return !this.defaultProperties.layoutFooterVisible
    }
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutView',
      'updateLayoutHeader',
      'updateLayoutHeaderVisible',
      'updateLayoutHeaderReveal',
      'updateLayoutHeaderElevated',
      'updateLayoutHeaderBordered',
      'updateLayoutHeaderNavTabs',
      'updateLayoutLeftDrawer',
      'updateLayoutLeftDrawerVisible',
      'updateLayoutLeftDrawerBehavior',
      'updateLayoutLeftDrawerOverlay',
      'updateLayoutLeftDrawerElevated',
      'updateLayoutLeftDrawerBordered',
      'updateLayoutRightDrawer',
      'updateLayoutRightDrawerVisible',
      'updateLayoutRightDrawerBehavior',
      'updateLayoutRightDrawerOverlay',
      'updateLayoutRightDrawerElevated',
      'updateLayoutRightDrawerBordered',
      'updateLayoutFooter',
      'updateLayoutFooterVisible',
      'updateLayoutFooterReveal',
      'updateLayoutFooterElevated',
      'updateLayoutFooterBordered'
    ]),
    onHideLeft () {
      this.defaultProperties.layoutLeftDrawerVisible = false
      this.$emit('drawerClosed')
    },
    toggleLeftDrawer () {
      this.leftDrawerOpen = false
    },
    toggleRightDrawer () {
      this.rightDrawerOpen = !this.rightDrawerOpen
    }
  }
}
</script>
<style>
.hidden{
  display: none;
}
</style>
