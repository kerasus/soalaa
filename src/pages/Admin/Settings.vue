<template>
  <q-layout :view="view">

    <q-page-container>
      <q-page padding class="flex justify-center items-start">
        <q-stepper
          animated
          header-nav
          flat
          bordered
          alternative-labels
          :contracted="isContracted"
          color="secondary"
          v-model="step"
          ref="stepper"
          style="max-width: 600px"
        >
          <q-step name="pick" title="Pick Layout Parts" :icon="mdiViewDashboard">
            <div class="column">
              <q-toggle v-model="pick.header" label="I want a QHeader" />
              <q-toggle v-model="pick.footer" label="I want a QFooter" />
              <q-toggle v-model="pick.left" label="I want a left-side QDrawer" />
              <q-toggle v-model="pick.right" label="I want a right-side QDrawer" />
            </div>
          </q-step>

          <q-step name="cfg" title="Configure Layout Parts" :icon="mdiCog" class="q-pb-lg">
            <div class="q-mb-md text-grey-8">Layout "View"</div>

            <div class="q-mb-lg rounded-borders overflow-hidden shadow-2">
              <div class="row">
                <div class="col-3 q-pa-md flex flex-center" :class="topL === 'h' ? 'bg-primary text-white' : 'bg-orange text-grey-9'">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="topL"
                    :options="[{ label: 'l', value: 'l'}, { label: 'h', value: 'h'}]"
                  />
                </div>
                <div class="col-6 q-pa-md flex flex-center bg-primary text-white">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="topC"
                    :options="[{ label: 'h', value: 'h'}, { label: 'H', value: 'H'}]"
                  />
                </div>
                <div class="col-3 q-pa-md flex flex-center" :class="topR === 'h' ? 'bg-primary text-white' : 'bg-orange text-grey-9'">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="topR"
                    :options="[{ label: 'r', value: 'r'}, { label: 'h', value: 'h'}]"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-3 q-px-md q-py-xl flex flex-center bg-orange text-grey-9">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="middleL"
                    :options="[{ label: 'l', value: 'l'}, { label: 'L', value: 'L'}]"
                  />
                </div>
                <div class="col-6 q-px-md q-py-xl flex flex-center">
                  Page
                </div>
                <div class="col-3 q-px-md q-py-xl flex flex-center bg-orange text-grey-9">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="middleR"
                    :options="[{ label: 'r', value: 'r'}, { label: 'R', value: 'R'}]"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-3 q-pa-md flex flex-center" :class="bottomL === 'f' ? 'bg-grey-8 text-white' : 'bg-orange text-grey-9'">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="bottomL"
                    :options="[{ label: 'l', value: 'l'}, { label: 'f', value: 'f'}]"
                  />
                </div>
                <div class="col-6 q-pa-md flex flex-center bg-grey-8 text-white">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="bottomC"
                    :options="[{ label: 'f', value: 'f'}, { label: 'F', value: 'F'}]"
                  />
                </div>
                <div class="col-3 q-pa-md flex flex-center" :class="bottomR === 'f' ? 'bg-grey-8 text-white' : 'bg-orange text-grey-9'">
                  <q-option-group
                    inline
                    color="white"
                    keep-color
                    dense
                    v-model="bottomR"
                    :options="[{ label: 'r', value: 'r'}, { label: 'f', value: 'f'}]"
                  />
                </div>
              </div>
            </div>

            <template v-if="pick.header">
              <div class="q-pt-lg q-pb-sm text-grey-8">Header</div>

              <div class="q-pl-lg q-gutter-y-sm">
                <q-toggle v-model="cfg.headerReveal" label="Header Reveal" />
                <q-select
                  v-model="cfg.headerSep"
                  label="Separator type"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="sepOptions"
                  options-cover
                  style="max-width: 200px"
                />
              </div>
            </template>

            <template v-if="pick.footer">
              <div class="q-pt-lg q-pb-sm text-grey-8">Footer</div>

              <div class="q-pl-lg q-gutter-y-sm">
                <q-toggle v-model="cfg.footerReveal" label="Footer Reveal" />
                <q-select
                  v-model="cfg.footerSep"
                  label="Separator type"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="sepOptions"
                  options-cover
                  style="max-width: 200px"
                />
              </div>
            </template>

            <template v-if="pick.left">
              <div class="q-pt-lg q-pb-sm text-grey-8">Left-side Drawer</div>

              <div class="q-pl-lg q-gutter-y-sm">
                <q-toggle v-model="cfg.leftOverlay" label="Overlay mode" />
                <q-select
                  v-model="cfg.leftBehavior"
                  label="Behavior"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="drawerBehaviorOptions"
                  options-cover
                  style="max-width: 200px"
                />
                <q-select
                  v-model="cfg.leftSep"
                  label="Separator type"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="sepOptions"
                  options-cover
                  style="max-width: 200px"
                />
              </div>
            </template>

            <template v-if="pick.right">
              <div class="q-pt-lg q-pb-sm text-grey-8">Right-side Drawer</div>

              <div class="q-pl-lg q-gutter-y-sm">
                <q-toggle v-model="cfg.rightOverlay" label="Overlay mode" />
                <q-select
                  v-model="cfg.rightBehavior"
                  label="Behavior"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="drawerBehaviorOptions"
                  option-value="value"
                  options-cover
                  style="max-width: 200px"
                />
                <q-select
                  v-model="cfg.rightSep"
                  label="Separator type"
                  outlined
                  dense
                  options-dense
                  map-options
                  emit-value
                  :options="sepOptions"
                  options-cover
                  style="max-width: 200px"
                />
              </div>
            </template>
          </q-step>

          <q-step name="play" title="Play with Layout" :icon="mdiPlayCircleOutline">
            <div class="column">
              <q-toggle v-model="play.header" :disable="!pick.header" label="Visible Header" />
              <q-toggle v-model="play.footer" :disable="!pick.footer" label="Visible Footer" />
              <q-toggle v-model="play.left" :disable="!pick.left" label="Visible left-side Drawer" />
              <q-toggle v-model="play.right" :disable="!pick.right" label="Visible right-side Drawer" />
              <q-toggle v-model="play.scroll" label="Inject Drawer content for scrolling" />
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-separator spaced />
              <div class="row q-col-gutter-sm">
                <div v-if="step !== 'play'" class="col-12 col-sm-auto">
                  <q-btn class="full-width" color="primary" @click="$refs.stepper.next()" label="Continue" />
                </div>
                <div class="col-12 col-sm-auto">
                  <q-btn class="full-width" color="black" label="Export Layout" @click="exportDialog = true" />
                </div>
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>

        <q-dialog v-model="exportDialog">
          <q-card>
            <div class="bg-code export-code">
              <code>{{ layoutExport }}</code>
            </div>

            <q-separator />

            <q-card-actions align="right">
              <q-btn color="brand-primary" flat label="Close" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {
  mdiMenu, mdiViewDashboard, mdiCog, mdiPlayCircleOutline
} from '@quasar/extras/mdi-v5'

export default {
  name: 'Settings',
  created () {
    return this.onCreate
  },
  watch: {
    'pick.header': function (newValue) {
      this.updateLayoutHeader(newValue)
      this.updateLayoutHeaderVisible(newValue)
      this.localStorageData.layoutHeader = newValue
    },
    'play.header': function (newValue) {
      if (this.layoutHeader) {
        this.updateLayoutHeaderVisible(newValue)
        this.localStorageData.layoutHeaderVisible = newValue
      }
    },
    'cfg.headerReveal': function (newValue) {
      this.updateLayoutHeaderReveal(newValue)
      this.localStorageData.layoutHeaderReveal = newValue
    },
    'cfg.headerSep': function (newValue) {
      if (newValue === 'elevated') {
        this.updateLayoutHeaderElevated(true)
        this.localStorageData.layoutHeaderElevated = true
        this.updateLayoutHeaderBordered(false)
        this.localStorageData.layoutHeaderBordered = false
      } else if (newValue === 'bordered') {
        this.updateLayoutHeaderElevated(false)
        this.localStorageData.layoutHeaderElevated = false
        this.updateLayoutHeaderBordered(true)
        this.localStorageData.layoutHeaderBordered = true
      } else if (newValue === 'none') {
        this.updateLayoutHeaderElevated(false)
        this.localStorageData.layoutHeaderElevated = false
        this.updateLayoutHeaderBordered(false)
        this.localStorageData.layoutHeaderBordered = false
      }
    },
    'pick.left': function (newValue) {
      this.updateLayoutLeftDrawer(newValue)
      this.localStorageData.layoutLeftDrawer = newValue
      this.updateLayoutLeftDrawerVisible(newValue)
      this.localStorageData.layoutLeftDrawerVisible = newValue
    },
    'play.left': function (newValue) {
      if (this.layoutLeftDrawer) {
        this.updateLayoutLeftDrawerVisible(newValue)
        this.localStorageData.layoutLeftDrawerVisible = newValue
      }
    },
    'cfg.leftBehavior': function (newValue) {
      this.updateLayoutLeftDrawerBehavior(newValue)
      this.localStorageData.layoutLeftDrawerBehavior = newValue
      if (newValue === 'mobile') {
        this.updateLayoutLeftDrawerVisible(false)
        this.localStorageData.layoutLeftDrawerVisible = false
      } else if (newValue === 'default' || newValue === 'desktop') {
        this.updateLayoutLeftDrawerVisible(true)
        this.localStorageData.layoutLeftDrawerVisible = true
      }
    },
    'cfg.leftOverlay': function (newValue) {
      this.updateLayoutLeftDrawerOverlay(newValue)
      this.localStorageData.layoutLeftDrawerOverlay = newValue
    },
    'cfg.leftSep': function (newValue) {
      if (newValue === 'elevated') {
        this.updateLayoutLeftDrawerElevated(true)
        this.localStorageData.layoutLeftDrawerElevated = true
        this.updateLayoutLeftDrawerBordered(false)
        this.localStorageData.layoutLeftDrawerBordered = false
      } else if (newValue === 'bordered') {
        this.updateLayoutLeftDrawerElevated(false)
        this.localStorageData.layoutLeftDrawerElevated = false
        this.updateLayoutLeftDrawerBordered(true)
        this.localStorageData.layoutLeftDrawerBordered = true
      } else if (newValue === 'none') {
        this.updateLayoutLeftDrawerElevated(false)
        this.localStorageData.layoutLeftDrawerElevated = false
        this.updateLayoutLeftDrawerBordered(false)
        this.localStorageData.layoutLeftDrawerBordered = false
      }
    },
    'pick.right': function (newValue) {
      this.updateLayoutRightDrawer(newValue)
      this.localStorageData.layoutRightDrawer = newValue
      this.updateLayoutRightDrawerVisible(newValue)
      this.localStorageData.layoutRightDrawerVisible = newValue
    },
    'play.right': function (newValue) {
      if (this.layoutRightDrawer) {
        this.updateLayoutRightDrawerVisible(newValue)
        this.localStorageData.layoutRightDrawerVisible = newValue
      }
    },
    'cfg.rightBehavior': function (newValue) {
      this.updateLayoutRightDrawerBehavior(newValue)
      this.localStorageData.layoutRightDrawerBehavior = newValue
      if (newValue === 'mobile') {
        this.updateLayoutRightDrawerVisible(false)
        this.localStorageData.layoutRightDrawerVisible = false
      } else if (newValue === 'default' || newValue === 'desktop') {
        this.updateLayoutRightDrawerVisible(true)
        this.localStorageData.layoutRightDrawerVisible = true
      }
    },
    'cfg.rightOverlay': function (newValue) {
      this.updateLayoutRightDrawerOverlay(newValue)
      this.localStorageData.layoutRightDrawerOverlay = newValue
    },
    'cfg.rightSep': function (newValue) {
      if (newValue === 'elevated') {
        this.updateLayoutRightDrawerElevated(true)
        this.localStorageData.layoutRightDrawerElevated = true
        this.updateLayoutRightDrawerBordered(false)
        this.localStorageData.layoutRightDrawerBordered = false
      } else if (newValue === 'bordered') {
        this.updateLayoutRightDrawerElevated(false)
        this.localStorageData.layoutRightDrawerElevated = false
        this.updateLayoutRightDrawerBordered(true)
        this.localStorageData.layoutRightDrawerBordered = true
      } else if (newValue === 'none') {
        this.updateLayoutRightDrawerElevated(false)
        this.localStorageData.layoutRightDrawerElevated = false
        this.updateLayoutRightDrawerBordered(false)
        this.localStorageData.layoutRightDrawerBordered = false
      }
    },
    'pick.footer': function (newValue) {
      this.updateLayoutFooter(newValue)
      this.localStorageData.layoutFooter = newValue
      this.updateLayoutFooterVisible(newValue)
      this.localStorageData.layoutFooterVisible = newValue
    },
    'play.footer': function (newValue) {
      if (this.layoutFooter) {
        this.updateLayoutFooterVisible(newValue)
        this.localStorageData.layoutFooterVisible = newValue
      }
    },
    'cfg.footerReveal': function (newValue) {
      this.updateLayoutFooterReveal(newValue)
      this.localStorageData.layoutFooterReveal = newValue
    },
    'cfg.footerSep': function (newValue) {
      if (newValue === 'elevated') {
        this.updateLayoutFooterElevated(true)
        this.localStorageData.layoutFooterElevated = true
        this.updateLayoutFooterBordered(false)
        this.localStorageData.layoutFooterBordered = false
      } else if (newValue === 'bordered') {
        this.updateLayoutFooterElevated(false)
        this.localStorageData.layoutFooterElevated = false
        this.updateLayoutRightDrawerBordered(true)
        this.localStorageData.layoutFooterBordered = true
      } else if (newValue === 'none') {
        this.updateLayoutFooterElevated(false)
        this.localStorageData.layoutFooterElevated = false
        this.updateLayoutRightDrawerBordered(false)
        this.localStorageData.layoutFooterBordered = false
      }
    },
    layoutView: function () {
      return this.view
    },
    layoutHeader: function (newValue) {
      this.pick.header = newValue
    },
    layoutHeaderVisible: function (newValue) {
      this.play.header = newValue
    },
    layoutHeaderReveal: function (newValue) {
      this.cfg.headerReveal = newValue
    },
    layoutHeaderElevated: function (newValue) {
      if (newValue) {
        this.cfg.headerSep = 'Elevated'
      } else if (!newValue && !this.layoutHeaderBordered) {
        this.cfg.headerSep = 'None'
      }
    },
    layoutHeaderBordered: function (newValue) {
      if (newValue) {
        this.cfg.headerSep = 'Bordered'
      } else if (!newValue && !this.layoutHeaderElevated) {
        this.cfg.headerSep = 'None'
      }
    },
    layoutLeftDrawer: function (newValue) {
      this.pick.left = newValue
    },
    layoutLeftDrawerVisible: function (newValue) {
      if (this.layoutLeftDrawer) {
        this.play.left = newValue
      }
    },
    layoutLeftDrawerBehavior: function (newValue) {
      this.cfg.leftBehavior = newValue
    },
    layoutLeftDrawerOverlay: function (newValue) {
      this.cfg.leftOverlay = newValue
    },
    layoutLeftDrawerElevated: function (newValue) {
      if (newValue) {
        this.cfg.leftSep = 'Elevated'
      } else if (!newValue && !this.layoutLeftDrawerBordered) {
        this.cfg.leftSep = 'None'
      }
    },
    layoutLeftDrawerBordered: function (newValue) {
      if (newValue) {
        this.cfg.leftSep = 'Bordered'
      } else if (!newValue && !this.layoutLeftDrawerElevated) {
        this.cfg.leftSep = 'None'
      }
    },
    layoutRightDrawer: function (newValue) {
      this.pick.right = newValue
    },
    layoutRightDrawerVisible: function (newValue) {
      if (this.layoutRightDrawer) {
        this.play.right = newValue
      }
    },
    layoutRightDrawerBehavior: function (newValue) {
      this.cfg.rightBehavior = newValue
    },
    layoutRightDrawerOverlay: function (newValue) {
      this.cfg.rightOverlay = newValue
    },
    layoutRightDrawerElevated: function (newValue) {
      if (newValue) {
        this.cfg.rightSep = 'Elevated'
      } else if (!newValue && !this.layoutRightDrawerElevated) {
        this.cfg.rightSep = 'None'
      }
    },
    layoutRightDrawerBordered: function (newValue) {
      if (newValue) {
        this.cfg.rightSep = 'Bordered'
      } else if (!newValue && !this.layoutRightDrawerBordered) {
        this.cfg.rightSep = 'None'
      }
    },
    layoutFooter: function (newValue) {
      this.pick.footer = newValue
    },
    layoutFooterVisible: function (newValue) {
      this.play.footer = newValue
    },
    layoutFooterReveal: function (newValue) {
      this.cfg.footerReveal = newValue
    },
    layoutFooterElevated: function (newValue) {
      if (newValue) {
        this.cfg.footerSep = 'Elevated'
      } else if (!newValue && !this.layoutRightDrawerBordered) {
        this.cfg.footerSep = 'None'
      }
    },
    layoutFooterBordered: function (newValue) {
      if (newValue) {
        this.cfg.footerSep = 'Bordered'
      } else if (!newValue && !this.layoutRightDrawerElevated) {
        this.cfg.footerSep = 'None'
      }
    },
    localStorageData: {
      deep: true,
      handler (newValue) {
        this.$store.commit('AppLayout/updateAppLayout', newValue)
      }
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
    ...mapActions('AppLayout', [
      'updateStore'
    ]),
    initialData () {
      this.mdiMenu = mdiMenu
      this.mdiViewDashboard = mdiViewDashboard
      this.mdiCog = mdiCog
      this.mdiPlayCircleOutline = mdiPlayCircleOutline
      this.drawerBehaviorOptions = [
        { label: 'Behave Normal', value: 'default' },
        { label: 'Behave Mobile', value: 'mobile' },
        { label: 'Behave Desktop', value: 'desktop' }
      ]
      this.sepOptions = [
        { label: 'None', value: 'none' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Bordered', value: 'bordered' }
      ]

      this.pick.header = this.layoutHeader
      this.play.header = this.layoutHeaderVisible
      this.cfg.headerReveal = this.layoutHeaderReveal
      if (this.cfg.headerSep === 'elevated') {
        this.updateLayoutHeaderElevated(true)
        this.updateLayoutHeaderBordered(false)
      } else if (this.cfg.headerSep === 'bordered') {
        this.updateLayoutHeaderElevated(false)
        this.updateLayoutHeaderBordered(true)
      }
      this.pick.left = this.layoutLeftDrawer
      if (this.layoutLeftDrawer) {
        this.play.left = this.layoutLeftDrawerVisible
      }
      this.cfg.leftBehavior = this.layoutLeftDrawerBehavior
      this.cfg.leftOverlay = this.layoutLeftDrawerOverlay
      if (this.cfg.leftSep === 'elevated') {
        this.updateLayoutLeftDrawerElevated(true)
        this.updateLayoutLeftDrawerBordered(false)
      } else if (this.cfg.leftSep === 'bordered') {
        this.updateLayoutLeftDrawerElevated(false)
        this.updateLayoutLeftDrawerBordered(true)
      }
      this.pick.right = this.layoutRightDrawer
      if (this.layoutRightDrawer) {
        this.play.right = this.layoutRightDrawerVisible
      }
      this.cfg.rightBehavior = this.layoutRightDrawerBehavior
      this.cfg.rightOverlay = this.layoutRightDrawerOverlay
      if (this.cfg.rightSep === 'elevated') {
        this.updateLayoutRightDrawerElevated(true)
        this.updateLayoutRightDrawerBordered(false)
      } else if (this.cfg.rightSep === 'bordered') {
        this.updateLayoutRightDrawerElevated(false)
        this.updateLayoutRightDrawerBordered(true)
      }
      this.pick.footer = this.layoutFooter
      this.play.footer = this.layoutFooterVisible
      this.cfg.footerReveal = this.layoutFooterReveal
      this.cfg.footerReveal = this.layoutFooterReveal
      if (this.cfg.footerSep === 'elevated') {
        this.updateLayoutFooterElevated(true)
        this.updateLayoutFooterBordered(false)
      } else if (this.cfg.footerSep === 'bordered') {
        this.updateLayoutFooterElevated(false)
        this.updateLayoutFooterBordered(true)
      }
    }
  },
  data () {
    return {
      topL: 'l',
      topC: 'H',
      topR: 'h',
      middleL: 'l',
      middleR: 'R',
      bottomL: 'f',
      bottomC: 'F',
      bottomR: 'f',
      step: 'pick',
      exportDialog: false,
      pick: {
        header: null,
        footer: true,
        left: true,
        right: true
      },
      cfg: {
        headerReveal: false,
        headerSep: 'none',
        footerReveal: false,
        footerSep: 'none',
        leftBehavior: 'default',
        leftOverlay: false,
        leftSep: 'none',
        rightBehavior: 'default',
        rightOverlay: false,
        rightSep: 'none'
      },
      play: {
        header: true,
        footer: true,
        left: false,
        right: false,
        scroll: false
      },
      localStorageData: {}
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
      'layoutFooterBordered',
      'appLayout'
    ]),
    isContracted () {
      return this.$q.screen.lt.sm === true || (
        this.$q.screen.md === true &&
        this.play.left === true &&
        this.cfg.leftOverlay === false &&
        this.play.right === true &&
        this.cfg.rightOverlay === false
      )
    },
    view () {
      const
        top = `${this.topL}${this.topC}${this.topR}`,
        middle = `${this.middleL}p${this.middleR}`,
        bottom = `${this.bottomL}${this.bottomC}${this.bottomR}`
      const newView = `${top} ${middle} ${bottom}`
      this.updateLayoutView(newView)
      return newView
    },
    layoutExport () {
      let code = `<${'template'}>
  <q-layout view="${this.view}">
`
      if (this.pick.header) {
        code += `
    <q-header ${this.cfg.headerReveal ? 'reveal ' : ''}${this.cfg.headerSep !== 'none' ? this.cfg.headerSep + ' ' : ''}class="bg-primary text-white"${this.pick.navtabs ? ' height-hint="98"' : ''}>
      <q-toolbar>${this.pick.left
          ? `
        <q-btn dense flat round icon="menu" @click="left = !left" />
`
          : ''}
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>${this.pick.right
          ? `
        <q-btn dense flat round icon="menu" @click="right = !right" />`
          : ''}
      </q-toolbar>${this.pick.navtabs
          ? `
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>`
          : ''}
    </q-header>
`
      }
      if (this.pick.left) {
        code += `
    <q-drawer ${this.cfg.leftBehavior !== 'mobile' && !this.cfg.leftOverlay ? 'show-if-above ' : ''}v-model="left" side="left"${this.cfg.leftOverlay ? ' overlay' : ''}${this.cfg.leftBehavior !== 'default' ? ` behavior="${this.cfg.leftBehavior}"` : ''}${this.cfg.leftSep !== 'none' ? ' ' + this.cfg.leftSep : ''}>
      <!-- drawer content -->
        </q-drawer>
        `
      }
      if (this.pick.right) {
        code += `
        <q-drawer ${this.cfg.rightBehavior !== 'mobile' && !this.cfg.rightOverlay ? 'show-if-above ' : ''}v-model="right" side="right"${this.cfg.rightOverlay ? ' overlay' : ''}${this.cfg.rightBehavior !== 'default' ? ` behavior="${this.cfg.rightBehavior}"` : ''}${this.cfg.rightSep !== 'none' ? ' ' + this.cfg.rightSep : ''}>
          <!-- drawer content -->
        </q-drawer>
        `
      }
      code += `
        <q-page-container>
        <router-view />
        </q-page-container>
        `
      if (this.pick.footer) {
        code += `
        <q-footer ${this.cfg.footerReveal ? 'reveal ' : ''}${this.cfg.footerSep !== 'none' ? this.cfg.footerSep + ' ' : ''}class="bg-grey-8 text-white">
        <q-toolbar>
        <q-toolbar-title>
        <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        Title
        </q-toolbar-title>
        </q-toolbar>
        </q-footer>
        `
      }
      code += `
        </q-layout>
        </${'template'}>
        <${'script'}>
        export default {
        data () {
        return {${this.pick.left
        ? `
        left: false${this.pick.right ? ',' : ''}`
        : ''}${this.pick.right
        ? `
        right: false`
        : ''}
        }
        }
        }
        </${'script'}>`
      return code
    },
    onCreate () {
      return this.initialData()
    }

  }
}
</script>

<style lang="sass">
body
  background: $grey-1
.export-code
  .doc-code__inner
    max-height: 50vh
  .doc-code + div
    right: 22px !important
  .q-badge
    right: 72px !important
</style>
