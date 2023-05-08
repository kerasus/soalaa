<template>
  <q-table :title="title"
           row-key="attribute"
           :columns="columns"
           :color="color"
           :flat="true"
           :rows="rows"
           :pagination="Pagination"
           :hide-bottom="true"
           :hide-selected-banner="true"
           :hide-no-data="true"
           :hide-pagination="true"
           class="comparison-table"
           :style="options.style"
           :class="options.className">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="comparison-th"
              :class="col.name + '-head'">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props"
            class="comparison-tr">
        <q-td v-for="item in rows"
              :key="item.name"
              :props="props"
              class="comparison-td">
          <div v-if="item.name === 'attribute'">
            {{ props.row.attribute === 'action' ? '' : props.row.attribute }}
          </div>
          <div v-else-if="props.row[item.name].type === 'boolean'">
            <q-icon :name="props.row[item.name].value ? 'check_circle' : 'cancel'"
                    :color="props.row[item.name].value ? 'green' : 'red'"
                    size="22px" />
          </div>
          <div v-else-if="props.row[item.name].type === 'text'">
            {{ props.row[item.name].value }}
          </div>
          <div v-else-if="props.row[item.name].type === 'link'">
            <q-btn color="primary"
                   :label="props.row[item.name].label"
                   :href="props.row[item.name].url" />
          </div>
          <div v-else-if="props.row[item.name].type === 'scroll'">
            <q-btn color="primary"
                   :label="props.row[item.name].label"
                   @click="scrollToElement(props.row[item.name].className)" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
// import { scroll } from 'quasar'
// const { getScrollTarget, setVerticalScrollPosition } = scroll

export default {
  name: 'ComparisonTable',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      Pagination: {
        rowsPerPage: 6
      },
      columns: [],
      rows: [],
      records: [],
      attributes: [],
      title: '',
      color: '',
      flat: false
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.title = this.options.title
      this.flat = this.options.flat
      this.color = this.options.color
      this.attributes = this.options.attributes
      this.records = this.options.records
      this.header = this.options.header
      this.getColumns()
      // this.getRows()
    },
    getColumns() {
      // this.columns.push({ name: 'attribute', label: this.options.attributesLabel, field: 'attribute' })
      // this.records.forEach(record => {
      //   this.columns.push({ name: record.key, label: record.title, field: record.key })
      // })
      for (let index = 0; index < this.header.length; index++) {
        const header = this.header[index]
        this.columns.push(
          {
            name: `col${index}`,
            label: header,
            field: row => row[`col${index}`]
          })
      }
    },
    getRows() {
      this.attributes.forEach(attribute => {
        const row = {
          attribute: attribute.label
        }
        this.records.forEach(record => {
          const attr = record.attributes.find(x => x.name === attribute.name)
          row[record.key] = {
            type: attribute.type,
            value: attr.value
          }
        })
        this.rows.push(row)
      })
      const actionRow = {
        attribute: 'action'
      }
      this.records.forEach(record => {
        actionRow[record.key] = { ...record.action, rowType: 'action' }
      })
      this.rows.push(actionRow)
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 60
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comparison-table {
  background-color: transparent !important;

  &:deep(.q-table__control){
    width: 100%;
  }
  &:deep(.q-table__title){
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    letter-spacing: -0.02em;
    color: #575962;
    margin: 25px 0;
  }

  .comparison-th {
    text-align: center !important;
    font-size: 14px;
    font-weight: 500;
  }
  .comparison-tr {
    background: #fff;

    &:nth-child(2n) {
      background: transparent;
    }

    .comparison-td {
      text-align: center;
    }
  }
}
</style>
