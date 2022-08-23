<template>
  <div class="question-bank-pagination q-pa-lg flex flex-center">
    {{ this.checkedStyle }}
    <q-pagination
      v-model="checkedStyle"
      active-color="primary"
      outline
      direction-links
      color="black"
      :max="meta.last_page"
      :max-pages="7"
      boundary-numbers
      :disable="disable"
      @update:model-value="updatePage"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          current_page: 1,
          from: 0,
          last_page: 1,
          links: [],
          path: '',
          per_page: 0,
          to: 0,
          total: 0
        }
      }
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkedStyle: 1,
      disableValue: false
    }
  },
  methods: {
    updatePage (val) {
      this.$emit('updateCurrentPage', val)
    }
  }

}
</script>

<style lang="scss">
.question-bank-pagination{
.q-btn--actionable{
  width: 35px;
  height: 35px;
  background: #FFFFFF;
  border-radius: 12px;
  margin-right: 3px;
}
}
</style>
