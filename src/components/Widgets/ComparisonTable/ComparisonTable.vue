<template>
  <q-table :title="localOptions.title"
           row-key="col0"
           :columns="computedColumns"
           :color="localOptions.color"
           :flat="true"
           :rows="localOptions.rows"
           :pagination="Pagination"
           :hide-bottom="true"
           :hide-selected-banner="true"
           :hide-no-data="true"
           :hide-pagination="true"
           class="comparison-table"
           :style="localOptions.style"
           :class="localOptions.className">
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
        <q-td v-for="col in computedColumns"
              :key="col.name"
              :props="props"
              class="comparison-td">
          <div v-if="props.row[col.name].type === 'image'">
            <q-img :src="props.row[col.name].value"
                   width="22px"
                   spinner-color="primary"
                   spinner-size="22" />
          </div>
          <div v-else-if="props.row[col.name].type === 'text'">
            {{ props.row[col.name] === 'action' ? '' : props.row[col.name].value }}
          </div>
          <div v-else-if="props.row[col.name].type === 'action' && props.row[col.name].actionType === 'link'">
            <q-btn color="primary"
                   :label="props.row[col.name].value.label"
                   :href="props.row[col.name].value.url" />
          </div>
          <div v-else-if="props.row[col.name].type === 'action' && props.row[col.name].actionType === 'scroll'">
            <q-btn color="primary"
                   :label="props.row[col.name].value.label"
                   @click="scrollToElement(props.row[col.name].value.className)" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ComparisonTable',
  mixins: [mixinWidget],
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
        rowsPerPage: 100
      },
      defaultOptions: {
        columns: [],
        rows: [],
        records: [],
        attributes: [],
        title: '',
        color: '',
        flat: false
      }
    }
  },
  computed: {
    computedColumns() {
      const headerLength = this.localOptions.header.length
      const columns = []
      for (let index = 0; index < headerLength; index++) {
        if (this.localOptions.columns.some(e => e.name === this.getColName(index))) {
          return
        }
        const header = this.localOptions.header[index]
        columns.push(
          {
            name: this.getColName(index),
            label: header
          })
      }
      return columns
    }
  },
  methods: {
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    getColName(colIndex) {
      return `col${colIndex}`
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
