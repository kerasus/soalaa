<template>
  <q-layout :view="value.layoutView">

    <q-header
      v-if="value.layoutHeader"
      :reveal="value.layoutHeaderReveal"
      :elevated="value.layoutHeaderElevated"
      :bordered="value.layoutHeaderBordered"
      :class="value.layoutHeaderCustomClass"
    >
      <slot name="header">
      <q-toolbar>
        <q-btn
          v-if="value.layoutLeftDrawer &&
                (value.layoutLeftDrawerBtn || !value.layoutLeftDrawerVisible || value.layoutLeftDrawerBehavior=='mobile')"
          :dense="value.dense"
          :flat="value.flat"
          :round="value.round"
          :icon="value.menuIcon"
          side="left"
          @click="toggleLeftDrawer"
        />
        <q-btn
          v-if="value.layoutRightDrawer && (value.layoutRightDrawerBtn || !value.layoutRightDrawerVisible)"
          :dense="value.dense"
          :flat="value.flat"
          :round="value.round"
          :icon="value.menuIcon"
          side="right"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
      </slot>
    </q-header>

    <q-drawer
      v-if="value.layoutLeftDrawer && value.layoutLeftDrawerVisible"
      show-if-above
      v-model="leftDrawerOpen"
      :overlay="value.layoutLeftDrawerOverlay"
      :elevated="value.layoutLeftDrawerElevated"
      :bordered="value.layoutLeftDrawerBordered"
      :class="value.layoutLeftDrawerCustomClass"
      :behavior="value.layoutLeftDrawerBehavior"
      :width="value.leftDrawerWidth"
      side="left"
      @hide="onHide"
    >
      <slot name="left-drawer"></slot>
    </q-drawer>

    <q-drawer
      v-if="value.layoutRightDrawer && value.layoutRightDrawerVisible"
      show-if-above v-model="rightDrawerOpen"
      :overlay="value.layoutRightDrawerOverlay"
      :elevated="value.layoutRightDrawerElevated"
      :bordered="value.layoutRightDrawerBordered"
      :class="value.layoutRightDrawerCustomClass"
      :behavior="value.layoutRightDrawerBehavior"
      :width="value.rightDrawerWidth"
      side="right"
    >
      <slot name="right-drawer"></slot>
    </q-drawer>

    <q-page-container v-if="value.layoutPageContainer">
      <slot name="content"></slot>
    </q-page-container>

    <q-footer
      v-if="value.layoutFooter"
      :reveal="value.layoutFooterReveal"
      :elevated="value.layoutFooterElevated"
      :bordered="value.layoutFooterBordered"
      :class="value.layoutFooterCustomClass"
    >
      <slot name="footer">
      <q-toolbar>
      </q-toolbar>
      </slot>
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
          layoutLeftDrawer: true,
          leftDrawerOpen: false,
          layoutLeftDrawerVisible: false,
          layoutLeftDrawerBehavior: '',
          layoutLeftDrawerBtn: false,
          layoutLeftDrawerOverlay: false,
          layoutLeftDrawerElevated: false,
          layoutLeftDrawerBordered: false,
          layoutRightDrawer: false,
          RightDrawerOpen: false,
          layoutRightDrawerVisible: false,
          layoutRightDrawerBtn: false,
          layoutRightDrawerOverlay: false,
          layoutRightDrawerBehavior: 'Desktop',
          layoutRightDrawerElevated: false,
          layoutRightDrawerBordered: false,
          layoutPageContainer: true,
          layoutFooter: false,
          layoutFooterReveal: false,
          layoutFooterElevated: false,
          layoutFooterBordered: false,
          layoutHeaderCustomClass: '',
          layoutLeftDrawerCustomClass: '',
          layoutRightDrawerCustomClass: '',
          layoutPageContainerCustomClass: '',
          layoutFooterCustomClass: '',
          leftDrawerWidth: '300',
          rightDrawerWidth: '300',
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
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        console.log('val', val.leftDrawerOpen)
        console.log('value', this.value.leftDrawerOpen)
        console.log('v', this.leftDrawerOpen)
        this.leftDrawerOpen = val.leftDrawerOpen
        console.log('v2', this.leftDrawerOpen)
        // if (val.leftDrawerOpen !== oldval.leftDrawerOpen) {
        //
        // }
      }
    }
    // leftDrawerOpen () {
    //   console.log('value', this.value.leftDrawerOpen)
    //   this.leftDrawerOpen = this.value.leftDrawerOpen
    //   console.log('value1', this.leftDrawerOpen)
    //   this.leftDrawerOpen = !this.leftDrawerOpen
    //   console.log('value2', this.leftDrawerOpen)
    // },
    // rightDrawerOpen () {
    //   this.rightDrawerOpen = this.value.rightDrawerOpen
    //   this.rightDrawerOpen = !this.leftDrawerOpen
    // }
  },
  methods: {
    onHide () {
      this.leftDrawerOpen = false
    },
    toggleLeftDrawer () {
      console.log(this.leftDrawerOpen)
      this.leftDrawerOpen = !this.leftDrawerOpen
      console.log(this.leftDrawerOpen)
    },
    toggleRightDrawer () {
      this.rightDrawerOpen = !this.rightDrawerOpen
    }
  }
}
</script>
<style scoped>

</style>
