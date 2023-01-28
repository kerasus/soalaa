<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-table dir="rtl"
                 title="جدول پنل ها"
                 :rows="rows"
                 :columns="columns"
                 row-key="name">
          <template v-slot:body-cell-view="props">
            <q-td key="view"
                  :props="props"
                  auto-width>
              <q-btn size="sm"
                     color="secondary"
                     round
                     dense
                     :icon="'edit'"
                     @click="showFullBanner(props.row.title)" />
            </q-td>
          </template>
          <template v-slot:body-cell-photo="props">
            <q-td key="photo"
                  class="thumbnail"
                  :props="props"
                  auto-width>
              <lazy-img :src="props.row.photo" />
            </q-td>
          </template>
          <template v-slot:body-cell-icon="props">
            <q-td key="icon"
                  class="thumbnail"
                  :props="props"
                  auto-width>
              <lazy-img :src="props.row.icon" />
            </q-td>
          </template>
          <template v-slot:body-cell-icon2="props">
            <q-td key="icon2"
                  class="thumbnail"
                  :props="props"
                  auto-width>
              <lazy-img :src="props.row.icon2" />
            </q-td>
          </template>
          <template v-slot:body-cell-remove="props">
            <q-td key="view"
                  :props="props"
                  auto-width>
              <q-btn class="q-mr-lg"
                     size="sm"
                     color="red-8"
                     round
                     dense
                     :icon="'delete'"
                     @click="removeBanner(props.row.title)" />
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="expandBanner"
                persistent>
        <q-card v-ripple
                class="column card"
                clickable>
          <div class="row col-12">
            <q-card-section class="row items-center q-pb-none">
              <q-btn v-close-popup
                     icon="close"
                     flat
                     round
                     dense
                     @click="responsive = ''" />
            </q-card-section>
          </div>
          <div class="col-12 row">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.title"
                       label="title" />
            </q-card-section>
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.link"
                       label="link" />
            </q-card-section>
          </div>
          <div class="row col-12">
            <q-card-section class="col-12">
              <banner-preview v-model:banner="selectedSlide"
                              @update:src="updateSrc" />
            </q-card-section>
          </div>
        </q-card>
      </q-dialog>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import lazyImg from 'components/lazyImg'
import { TabPanel } from 'src/models/TabPanel.js'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, lazyImg },
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
      columns: [
        {
          name: 'title',
          required: true,
          label: 'عنوان',
          align: 'center',
          field: row => row.title,
          sortable: true
        },
        {
          name: 'icon',
          align: 'center',
          label: 'آیکن',
          field: row => row.icon
        },
        {
          name: 'icon2',
          align: 'center',
          label: 'آیکن2',
          field: row => row.icon2
        },
        {
          name: 'photo',
          align: 'center',
          label: 'تصویر',
          field: row => row.icon.photo
        },
        {
          name: 'view',
          align: 'center',
          label: 'مشاهده',
          field: row => row.view
        },
        {
          name: 'remove',
          align: 'center',
          label: 'حذف پنل',
          field: row => row.remove
        }
      ],
      rows: [],
      expandBanner: false,
      selectedSlide: new TabPanel(),
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      for (let i = 0; i < this.localOptions.tabs.length; i++) {
        this.rows.push({
          title: this.localOptions.tabs[i].title,
          icon: this.localOptions.tabs[i].icon,
          icon2: this.localOptions.tabs[i].icon2,
          photo: this.localOptions.tabs[i].image
        })
      }
    },
    showFullBanner(title) {
      const index = this.localOptions.tabs.findIndex(tab => tab.title === title)
      this.expandBanner = true
      this.selectedSlide = new TabPanel(this.localOptions.tabs[index])
    },
    removeBanner() {

    }
  }
})
</script>
