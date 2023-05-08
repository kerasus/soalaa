<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="table-rows flex justify-between">
          <q-table flat
                   bordered
                   :rows="localOptions.sliderItems"
                   :columns="columns"
                   binary-state-sort>
            <template v-slot:top>
              <q-btn color="positive"
                     label="اضافه کردن باکس جدید"
                     @click="addRow" />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="(item) in props.cols"
                      :key="item.name"
                      :props="props">
                  <template v-if="item.name === 'actions'">
                    <q-btn round
                           flat
                           dense
                           size="md"
                           color="negative"
                           icon="delete"
                           class="q-ml-md"
                           @click="removeRow(props.rowIndex)">
                      <q-tooltip>
                        حذف
                      </q-tooltip>
                    </q-btn>
                  </template>
                  <template v-else>
                    {{ item.value }}
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[item.name]">
                      <q-input v-model="scope.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
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
  data () {
    return {
      loading: false,
      rowCount: 0,
      columns: [
        {
          name: 'code',
          label: 'کد',
          align: 'left',
          field: row => row.code,
          format: val => `${val}`
        },
        { name: 'first_name', align: 'center', label: 'نام', field: row => row.first_name },
        { name: 'last_name', align: 'center', label: 'نام خانوادگی', field: row => row.last_name },
        { name: 'major', align: 'center', label: 'رشته', field: row => row.major },
        { name: 'rank', align: 'center', label: 'رتبه', field: row => row.rank },
        { name: 'distraction', align: 'center', label: 'منطقه', field: row => row.distraction },
        { name: 'actions', align: 'right', label: 'عملیات', field: row => row.id }
      ]
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
  methods: {
    addRow () {
      this.localOptions.sliderItems.unshift(this.localOptions.sliderItems[0])
    },
    removeRow(index) {
      this.localOptions.sliderItems.splice(index, 1)
    }
  }
})
</script>

<style lang="scss" scoped>
.option-panel-container{
  .table-rows{
    place-content: center;
  }
}
</style>
