<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row items-center q-my-md">
          <q-btn size="md"
                 class="q-py-lg"
                 color="green-7"
                 label="افزودن پنل"
                 round
                 dense
                 icon="add"
                 @click="addBanner" />
        </div>
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
                class="dialog"
                persistent>
        <q-card v-ripple
                class="column card no-wrap"
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
            <q-card-section class="col-4">
              <q-input v-model="selectedSlide.title"
                       label="title" />
            </q-card-section>
            <q-card-section class="col-4">
              <q-input v-model="selectedSlide.button.url"
                       label="link" />
            </q-card-section>
            <q-card-section class="col-3">
              <q-input v-model="selectedSlide.button.text"
                       label="button text" />
            </q-card-section>
            <q-card-section class="col-6 text-center">
              background color
              <q-color v-model="selectedSlide.button.bgColor"
                       class="button background" />
            </q-card-section>
            <q-card-section class="col-6 text-center">
              color
              <q-color v-model="selectedSlide.button.color"
                       class="button background" />
            </q-card-section>
          </div>
          <div class="col-12 row">
            <q-editor v-model="selectedSlide.editor"
                      min-height="10rem"
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify']
                          },
                          'token',
                          {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7'
                            ]
                          }
                        ],
                        ['bold', 'italic', 'strike', 'underline'],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                        ['viewsource']
                      ]">
              <template v-slot:token>
                <q-btn-dropdown
                  ref="token"
                  dense
                  no-caps
                  no-wrap
                  unelevated
                  color="white"
                  text-color="primary"
                  label="Text Color"
                  size="sm"
                >
                  <q-list dense>
                    <q-item tag="label"
                            clickable
                            @click="color('foreColor', foreColor)">
                      <q-item-section side>
                        <q-icon name="format_paint" />
                      </q-item-section>
                      <q-item-section>
                        <q-color
                          v-model="foreColor"
                          no-header
                          no-footer
                          default-view="palette"
                          class="my-picker"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-editor>
          </div>
          <div class="col-12 row">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.icon"
                       label="icon" />
            </q-card-section>
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.icon2"
                       label="icon2" />
            </q-card-section>
          </div>
          <div class="col-12 row">
            <q-card-section class="col-6">
              <lazy-img :src="selectedSlide.icon" />
            </q-card-section>
            <q-card-section class="col-6">
              <lazy-img :src="selectedSlide.icon2" />
            </q-card-section>
          </div>
          <div class="col-12 row">
            <q-card-section class="col-12">
              <q-input v-model="selectedSlide.image"
                       label="image" />
            </q-card-section>
            <q-card-section class="col-12">
              <lazy-img :src="selectedSlide.image" />
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
    },
    selectedSlide: {
      handler(newValue) {
        const index = this.localOptions.tabs.findIndex(tab => tab.id === this.selectedSlide.id)
        this.localOptions.tabs[index] = new TabPanel(newValue)
        this.updateTable(index)
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
    updateTable(index) {
      this.rows[index].title = this.localOptions.tabs[index].title
      this.rows[index].icon = this.localOptions.tabs[index].icon
      this.rows[index].icon2 = this.localOptions.tabs[index].icon2
      this.rows[index].photo = this.localOptions.tabs[index].photo
    },
    addBanner() {
      const index = this.localOptions.tabs.length
      this.localOptions.tabs.push({
        id: this.localOptions.tabs.length + 1,
        title: '',
        editor: '',
        value: '',
        image: '',
        icon: '',
        icon2: '',
        button: {
          bgColor: '',
          color: '#8075DC',
          text: 'اطلاعات بیشتر',
          url: ''
        }
      })
      this.rows.push({
        title: this.localOptions.tabs[index].title,
        icon: this.localOptions.tabs[index].icon,
        icon2: this.localOptions.tabs[index].icon2,
        photo: this.localOptions.tabs[index].photo
      })
    },
    removeBanner(title) {
      const index = this.rows.findIndex(row => row.title === title)
      this.localOptions.tabs.splice(index, 1)
      this.rows.splice(index, 1)
    },
    showFullBanner(title) {
      const index = this.localOptions.tabs.findIndex(tab => tab.title === title)
      this.expandBanner = true
      this.selectedSlide = new TabPanel(this.localOptions.tabs[index])
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  max-width: 900px !important;
}
</style>
