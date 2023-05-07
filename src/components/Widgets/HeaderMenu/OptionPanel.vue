<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-py-md">
          <div class="outsideLabel">لینک لوگو</div>
          <q-input v-model="localOptions.logoImage"
                   label="logoImage" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">متن لوگو</div>
          <q-input v-model="localOptions.logoSlogan"
                   label="logoSlogan" />
        </div>
        <div class="row q-col-gutter-md">
          <div class="input-container col-md-2">
            <div class="outsideLabel">hasAction</div>
            <q-checkbox v-model="localOptions.hasAction" />
          </div>
          <div v-if="localOptions.hasAction"
               class="col-md-10">
            <div class="row q-col-gutter-md">
              <div class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">type</div>
                <q-select v-model="localOptions.actionObject.type"
                          :options="actionObjectTypeOptions" />
              </div>
              <div class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">buttonLabel</div>
                <q-input v-model="localOptions.actionObject.buttonLabel"
                         label="buttonLabel" />
              </div>
              <div v-if="localOptions.actionObject.type === 'scroll'"
                   class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">scrollTo</div>
                <q-input v-model="localOptions.actionObject.scrollTo"
                         label="scrollTo" />
              </div>
              <div v-if="localOptions.actionObject.type === 'link'"
                   class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">route</div>
                <q-input v-model="localOptions.actionObject.route"
                         label="route" />
              </div>
              <div v-if="localOptions.actionObject.type === 'event'"
                   class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">eventName</div>
                <q-input v-model="localOptions.actionObject.eventName"
                         label="eventName" />
              </div>
              <div v-if="localOptions.actionObject.type === 'event'"
                   class="input-container col-md-3 q-py-md">
                <div class="outsideLabel">eventArgs</div>
                <q-input v-model="localOptions.actionObject.eventArgs"
                         label="eventArgs" />
              </div>
            </div>
          </div>
        </div>
        <q-card class="custom-card">
          <q-card-section>
            <q-expansion-item v-for="(item, index) in localOptions.menuLink"
                              :key="index"
                              expand-separator>
              <template v-slot:header>
                <q-btn color="negative"
                       icon="close"
                       size="14px"
                       class="q-mr-sm"
                       @click="removeItem(index)" />
                <q-input v-model="item.label"
                         label="label" />
              </template>
              <div class="text">
                <div class="input-container q-py-md">
                  <div>نوع آیتم انتخاب کنید:</div>
                  <q-radio v-model="item.type"
                           val="link"
                           class="q-mr-md"
                           label="لینک" />
                  <q-radio v-model="item.type"
                           val="scroll"
                           class="q-mr-md"
                           label="اسکرول به بخش های دیگر همین صفحه" />
                </div>
              </div>
              <div v-if="item.type && item.type === 'link'">
                <div class="outsideLabel">لینک صفحه</div>
                <q-input v-model="item.route" />
              </div>
              <div v-if="item.type && item.type === 'scroll'">
                <div class="outsideLabel">کلاس المان مربوطه</div>
                <q-input v-model="item.className" />
              </div>
            </q-expansion-item>
          </q-card-section>

          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="add Item"
                   @click="addItem" />
          </div>
        </q-card>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      actionObjectTypeOptions: ['link', 'event', 'scroll'],
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
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  methods: {
    addItem () {
      this.localOptions.menuLink.push([])
    },
    removeItem (itemIndex) {
      this.localOptions.menuLink.splice(itemIndex, 1)
    }
  }
})
</script>
