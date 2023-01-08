<template>
  <div class="question-bank-pagination q-pa-lg flex flex-center">

    <!--    <div class="search-box">-->
    <!--      <q-btn-->
    <!--        unelevated-->
    <!--        color="primary"-->
    <!--        icon="isax:search-normal"-->
    <!--        class="question-item-button"-->
    <!--        @click="goToPage"-->
    <!--      />-->
    <!--      <q-input-->
    <!--        v-model="pageToGoTo"-->
    <!--        class="search-input"-->
    <!--        :rules="[val => !isNaN(val) || 'لطفا عدد وارد کنید']"-->
    <!--        dense-->
    <!--      />-->
    <!--    </div>-->
    <q-pagination
      ref="pagination"
      v-model="localCurrentPage"
      input
      direction-links
      color="black"
      :max="meta.last_page"
      :max-pages="10"
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
  data() {
    return {
      localCurrentPage: 1,
      disableValue: false,
      pageToGoTo: ''
    }
  },
  computed: {
    currentPage () {
      return this.meta?.current_page
    }
  },
  watch: {
    currentPage (newValue) {
      this.localCurrentPage = newValue
    }
  },
  methods: {
    updatePage(val) {
      this.$emit('updateCurrentPage', val)
    },
    goToPage () {
      this.$refs.pagination.set(this.pageToGoTo)
    }
  }

}
</script>

<style lang="scss" scoped>
// ToDo: check this styles in scoped style tag
.question-bank-pagination {
  .q-btn--actionable {
    width: 35px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-right: 3px;
  }
   .question-item-button {
    width: 40px;
    height: 40px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 13px;
    margin-right: 10px;
  }
  .search-box{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    .search-input{
      width: 100px;
      height: 40px;
    }
  }

}
</style>
