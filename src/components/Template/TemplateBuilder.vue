<template>
    <q-layout :view="value.layoutView">

      <q-header v-if="value.layoutHeader" :reveal="value.layoutHeaderReveal" :elevated="value.layoutHeaderElevated" :bordered="value.layoutHeaderBordered" :class="value.headerCustomClass" :height-hint="value.heightHint">
        <q-toolbar>
          <q-btn v-if="value.layoutLeftDrawer" :dense="value.dense" :flat="value.flat" :round="value.round" :icon="value.menuIcon" side="left" @click="toggleLeftDrawer" />
          <slot name="header"></slot>
          <q-btn v-if="value.layoutRightDrawer" :dense="value.dense" :flat="value.flat" :round="value.round" :icon="value.menuIcon" side="right" @click="toggleRightDrawer" />
        </q-toolbar>
      </q-header>

      <q-drawer v-if="value.layoutLeftDrawer" :overlay="value.layoutLeftDrawerOverlay" v-model="leftDrawerOpen" :elevated="value.layoutLeftDrawerElevated" :bordered="value.layoutLeftDrawerBordered" side="left" >
        <slot name="left-drawer"></slot>
      </q-drawer>

      <q-drawer v-if="value.layoutRightDrawer" v-model="rightDrawerOpen" side="right" :overlay="value.layoutRightDrawerOverlay" :elevated="value.layoutRightDrawerElevated" :bordered="value.layoutRightDrawerBordered">
        <slot name="right-drawer"></slot>
      </q-drawer>

      <q-page-container v-if="value.pageContainer">
        <slot name="content"></slot>
      </q-page-container>

      <q-footer v-if="value.layoutFooter" :reveal="value.layoutFooterReveal" :elevated="value.layoutFooterElevated" :bordered="value.layoutFooterBordered" :class="value.footerCustomClass">
        <q-toolbar>
          <slot name="footer"></slot>
        </q-toolbar>
      </q-footer>

    </q-layout>
</template>

<script>
export default {
  name: 'TemplateBuilder',
  props: {
    value: {
      default: () => {
        return {
          layoutView: 'lHh Lpr lFf',
          layoutHeader: true,
          layoutHeaderReveal: false,
          layoutHeaderElevated: false,
          layoutHeaderBordered: false,
          layoutLeftDrawer: false,
          layoutLeftDrawerOverlay: false,
          layoutLeftDrawerElevated: false,
          layoutLeftDrawerBordered: false,

          layoutRightDrawer: false,
          layoutRightDrawerVisible: false,
          layoutRightDrawerBehavior: 'default',
          layoutRightDrawerOverlay: false,
          layoutRightDrawerElevated: false,
          layoutRightDrawerBordered: false,

          layoutFooter: false,
          layoutFooterVisible: true,
          layoutFooterReveal: false,
          layoutFooterElevated: false,
          layoutFooterBordered: false,

          appName: 'app',
          headerTitle: 'app',
          headerWithBackground: false,
          headerTitleCentered: false,
          headerShowTitle: true,
          headerShowBtnSearch: true,
          headerShowBtnBack: false,
          headerShowBtnShare: false,
          lang: 'fa',
          langOptions: {},
          header: true,
          leftDrawer: true,
          leftDrawerOpen: true,
          rightDrawer: true,
          rightDrawerOpen: true,
          pageContainer: true,
          footer: true,
          headerElevated: true,
          footerElevated: false,
          headerCustomClass: 'bg-primary text-white',
          footerCustomClass: 'bg-grey-8 text-white',
          heightHint: '98',
          dense: true,
          flat: true,
          menuIcon: 'menu'
        }
      },
      type: Object
    }
  },
  data () {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: true
    }
  },
  created () {
    this.leftDrawerOpen = this.value.leftDrawerOpen
    this.rightDrawerOpen = this.value.rightDrawerOpen
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleRightDrawer () {
      this.rightDrawerOpen = !this.rightDrawerOpen
    }
  }
}
</script>
<style scoped>

</style>
