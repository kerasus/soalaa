<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <q-expansion-item class="q-py-md"
                          expand-separator
                          label="ویرایش ستون ها">
          <q-card class="custom-card">
            <q-card-section>
              <q-expansion-item v-for="(item, index) in headers"
                                :key="index"
                                expand-separator>
                <template v-slot:header>
                  <q-btn color="negative"
                         icon="close"
                         size="14px"
                         class="q-mr-sm"
                         @click="removeItem(index)" />
                  <q-input v-model="item.label"
                           label="label"
                           disable />
                </template>
                <div class="text">
                  <editor v-model:value="item.label" />
                </div>
              </q-expansion-item>
            </q-card-section>

            <div class="row q-gutter-xs justify-center">
              <q-btn color="positive"
                     class="full-width"
                     label="ستون جدید"
                     @click="addItem" />
            </div>
          </q-card>
        </q-expansion-item>
        <div class="table-rows justify-between">
          <q-table flat
                   bordered
                   :rows="localOptions.rows"
                   :columns="columns"
                   :rows-per-page-options="[0]"
                   binary-state-sort>
            <template v-slot:top>
              <q-btn color="positive"
                     :disable="loading"
                     label="اضافه کردن ردیف جدید"
                     @click="addRow" />
              <q-btn class="q-ml-sm"
                     color="negative"
                     :disable="loading"
                     label="حذف ردیف"
                     @click="removeRow" />
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="(item, index) in props.cols"
                      :key="'col'+ index"
                      :props="props">
                  <div>
                    {{item.label}}
                    <q-popup-edit v-slot="scope"
                                  v-model="props.cols[index]">
                      <q-input v-model="scope.value.label"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="(item, index) in props.cols"
                      :key="'col'+ index"
                      :props="props">
                  <div v-if="props.row[getColName(index)].type === 'text'">
                    {{ item.value }}
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
                  <div v-if="props.row[getColName(index)].type === 'image'">
                    <q-img :src="props.row[getColName(index)].value"
                           width="30px" />
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
                  <div v-if="props.row[getColName(index)].type === 'action'">
                    <q-btn color="primary"
                           :label="props.row[getColName(index)].value.label" />
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value.label"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-input v-if="props.row[getColName(index)].actionType === 'link'"
                               v-model="scope.value.value.url"
                               dense
                               class="q-my-sm"
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-input v-if="props.row[getColName(index)].actionType === 'scroll'"
                               v-model="scope.value.value.className"
                               dense
                               class="q-my-sm"
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.actionType"
                                class="q-mt-md"
                                :options="actionTypeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
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
import Editor from 'components/Utils/Editor.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs },
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
      rowCount: 10,
      loading: false,
      filter: '',
      typeOptions: ['text', 'image', 'action'],
      actionTypeOptions: ['scroll', 'link']

    }
  },
  computed: {
    value: {
      get() {
        return this.options
      },
      set(value) {
        this.localOptions = value
      }
    },
    columns: {
      get() {
        return this.options.header.map((item, index) => {
          return {
            name: 'col' + index,
            label: item,
            format: val => `${val}`,
            field: row => row['col' + index].value,
            align: 'center'
          }
        })
      },
      set(value) {
        this.localOptions.header = value.map((item) => item.label)
      }
    },
    headers: {
      get() {
        return this.options.header.map(item => {
          return {
            label: item
          }
        })
      },
      set(value) {
        this.localOptions.header = value.map((item) => item.label)
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
  methods: {
    getColName(index) {
      return 'col' + index
    },
    changeType(value, rowIndex, colIndex) {
      const row = this.localOptions.rows[rowIndex]
      const col = row[this.getColName(colIndex)]
      col.type = value.type
      if (value.type === 'action') {
        col.value = {
          label: '',
          className: '',
          url: ''
        }
      }
      if (value.type === 'text' || value.type === 'image') {
        col.value = ''
      }
    },
    addRow () {
      this.loading = true
      const
        index = this.localOptions.rows.length + 1,
        row = this.localOptions.rows[Math.floor(Math.random() * this.localOptions.rows.length)]

      if (this.localOptions.rows.length === 0) {
        this.rowCount = 0
      }

      row.id = ++this.rowCount
      const newRow = { ...row }
      this.localOptions.rows = [...this.localOptions.rows.slice(0, index), newRow, ...this.localOptions.rows.slice(index)]
      this.loading = false
    },

    removeRow () {
      this.loading = true
      const index = this.localOptions.rows.length - 1
      this.localOptions.rows = [...this.localOptions.rows.slice(0, index), ...this.localOptions.rows.slice(index + 1)]
      this.loading = false
    },
    addItem () {
      this.localOptions.header.push('label')
    },
    removeItem (itemIndex) {
      this.localOptions.header.splice(itemIndex, 1)
    }
  }
})
</script>
