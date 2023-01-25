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
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
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
      console.log(this.localOptions)
      // for (let i = 0; i < this.localOptions.list.length; i++) {
      //   this.rows.push({
      //     name: i + 1,
      //     title: this.localOptions.list[i].title,
      //     photo: this.localOptions.list[i].photo.src ? this.localOptions.list[i].photo.src : this.responsiveFeatures(this.localOptions.list[i].features).src
      //   })
      // }
    }
  }
})
</script>
