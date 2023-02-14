<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row items-center q-my-md">
          <q-btn size="md"
                 class="q-py-lg"
                 color="green-7"
                 label="افزودن بنر"
                 round
                 dense
                 icon="add"
                 @click="addBanner" />
        </div>
        <q-table dir="rtl"
                 title="جدول اسلایدها"
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
                     @click="showFullBanner(props.row.name)" />
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
                     @click="removeBanner(props.row.name)" />
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
            <q-toggle v-model="isResponsive"
                      checked-icon="check"
                      color="green"
                      label="responsive features"
                      unchecked-icon="clear" />
          </div>
          <q-table v-if="isResponsive"
                   dir="rtl"
                   title="جدول رسپانسیو"
                   :rows="responsiveRows"
                   :columns="responsiveColumns"
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
                       @click="showFullResponsiveBanner(props.row.name)" />
              </q-td>
            </template>
            <template v-slot:body-cell-thumbnail="props">
              <q-td key="thumbnail"
                    class="thumbnail"
                    :props="props"
                    auto-width>
                <lazy-img :src="props.row.thumbnail" />
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
                       @click="removeSizeFeatures(props.row.name)" />
              </q-td>
            </template>
          </q-table>
          <div v-else>
            <div class="row col-12">
              <q-card-section class="col-12">
                <banner-preview v-model:banner="selectedSlide"
                                @update:src="updateSrc" />
              </q-card-section>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <q-dialog v-model="expandResponsiveBanner"
                persistent>
        <q-card v-ripple
                class="column"
                clickable>
          <div class="row col-12">
            <q-card-section class="row items-center q-pb-none">
              <q-btn v-close-popup
                     icon="close"
                     flat
                     round
                     dense />
            </q-card-section>
          </div>
          <div class="col-12 row">
            <q-card-section class="col-12">
              <banner-preview v-model:banner="selectedSlide"
                              :size="selectedResponsiveSize"
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
import { Banner } from 'src/models/Banner.js'
import lazyImg from '../../../components/lazyImg.vue'
import bannerPreview from 'components/Widgets/Slider/bannerPreview.vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    bannerPreview,
    lazyImg
  },
  mixins: [mixinOptionPanel],
  data() {
    return {
      windowWidth: 0,
      expandBanner: false,
      expandResponsiveBanner: false,
      file: null,
      responsive: '',
      isResponsive: false,
      selectedSlide: new Banner(),
      selectedResponsiveSize: '',
      selectedBannerIndex: 0,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'ردیف',
          align: 'center',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'title',
          align: 'center',
          label: 'عنوان',
          field: row => row.title
        },
        {
          name: 'photo',
          align: 'center',
          label: 'تصویر',
          field: row => row.photo
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
          label: 'حذف بنر',
          field: row => row.remove
        }
      ],
      rows: [],
      responsiveColumns: [
        {
          name: 'name',
          required: true,
          label: 'break point',
          align: 'center',
          field: row => row.name
        },
        {
          name: 'size',
          required: true,
          label: 'اندازه صفحه',
          align: 'center',
          field: row => row.size
        },
        {
          name: 'thumbnail',
          align: 'center',
          label: 'تصویر',
          field: row => row.thumbnail
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
          label: 'حذف',
          field: row => row.remove
        }
      ],
      responsiveRows: [
        {
          name: 'xl',
          size: 'size >= 1920 px',
          thumbnail: ''
        },
        {
          name: 'lg',
          size: 'size >= 1440 px',
          thumbnail: ''
        },
        {
          name: 'md',
          size: 'size >= 1024 px',
          thumbnail: ''
        },
        {
          name: 'sm',
          size: 'size >= 600 px',
          thumbnail: ''
        },
        {
          name: 'xs',
          size: 'size >= 0 px',
          thumbnail: ''
        }
      ],
      defaultOptions: {
        features: {
          xl: {
            src: '',
            width: '',
            height: ''
          },
          lg: {
            src: '',
            width: '',
            height: ''
          },
          md: {
            src: '',
            width: '',
            height: ''
          },
          sm: {
            src: '',
            width: '',
            height: ''
          },
          xs: {
            src: '',
            width: '',
            height: ''
          }
        },
        photo: {
          src: ''
        },
        title: '',
        ratio: 1,
        link: ''
      }
    }
  },
  watch: {
    selectedSlide: {
      handler() {
        this.updateBanner()
      },
      deep: true
    },
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  created() {
    this.initTable()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    addBanner() {
      const rowNumber = this.localOptions.list.length + 1
      this.localOptions.list.push({
        title: '',
        photo: {
          src: ''
        },
        features: {
          xl: {
            src: '',
            width: '',
            height: ''
          },
          lg: {
            src: '',
            width: '',
            height: ''
          },
          md: {
            src: '',
            width: '',
            height: ''
          },
          sm: {
            src: '',
            width: '',
            height: ''
          },
          xs: {
            src: '',
            width: '',
            height: ''
          }
        },
        link: ''
      })
      this.rows.push({
        name: rowNumber,
        title: '',
        photo: ''
      })
    },
    responsiveFeatures(features) {
      if (this.windowWidth >= 1920) {
        return features.xl.src !== '' ? features.xl : features.lg.src !== '' ? features.lg : features.sm.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return features.lg.src !== '' ? features.lg : features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 599) {
        return features.xs.src !== '' ? features.xs : features.sm.src !== '' ? features.sm : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      }
    },
    removeBanner(name) {
      const index = this.rows.findIndex(row => row.name === name)
      this.localOptions.list.splice(index, 1)
      this.rows.splice(index, 1)
    },
    removeSizeFeatures(size) {
      this.localOptions.list[this.selectedBannerIndex].features[size].src = ''
      this.updateResponsiveRows()
    },
    initTable() {
      for (let i = 0; i < this.localOptions.list.length; i++) {
        this.rows.push({
          name: i + 1,
          title: this.localOptions.list[i].title,
          photo: this.localOptions.list[i].photo.src ? this.localOptions.list[i].photo.src : this.responsiveFeatures(this.localOptions.list[i].features).src
        })
      }
    },
    updateTable() {
      for (let i = 0; i < this.localOptions.list.length; i++) {
        this.rows[i] = {
          name: i + 1,
          title: this.localOptions.list[i].title,
          photo: this.localOptions.list[i].photo.src ? this.localOptions.list[i].photo.src : this.responsiveFeatures(this.localOptions.list[i].features).src
        }
      }
    },
    updateBanner() {
      const index = this.localOptions.list.findIndex(banner => banner.title === this.selectedSlide.title)
      this.localOptions.list[index] = this.selectedSlide
      this.updateTable()
    },
    showFullBanner(index) {
      this.expandBanner = true
      this.selectedSlide = new Banner(this.localOptions.list[index - 1])
      this.selectedBannerIndex = index - 1
      this.updateResponsiveRows()
    },
    showFullResponsiveBanner(name) {
      this.expandResponsiveBanner = true
      this.selectedSlide.features[name].src = this.localOptions.list[this.selectedBannerIndex].features[name].src
      this.selectedResponsiveSize = name
    },
    updateResponsiveRows() {
      this.responsiveRows.forEach(row => {
        Object.keys(this.localOptions.list[this.selectedBannerIndex].features).forEach(key => {
          if (key === row.name) {
            row.thumbnail = this.localOptions.list[this.selectedBannerIndex].features[key].src
          }
        })
      })
    },
    updateSrc(data) {
      if (data.size) {
        this.localOptions.list[this.selectedBannerIndex].features[data.size].src = data.src
        const index = this.responsiveRows.findIndex(row => row.name === data.size)
        this.responsiveRows[index].thumbnail = data.src
      } else {
        this.localOptions.list[this.selectedBannerIndex].photo.src = data.src
      }
    }
  }
})
</script>

<style scoped>
.thumbnail {
  padding: 0;
}

.card {
  width: 50%;
}
</style>
