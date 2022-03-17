<template>
  <q-card class="theme-v1-box-shadow">
    <q-card-section>
      <div class="search-section">
        <div class="search-title">
          جستجو
        </div>
        <q-card-actions>
          <div class="search-box">
            <q-input standout="pink text-white" v-model="searchInput" label="جستجو در سوالات سه آ"></q-input>
          </div>
        </q-card-actions>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'QuestionBankHeader',

  data () {
    return {
      searchInput: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-section {
    display: flex;
    .search-title {
      align-self: center;
    }
    .search-box {
      height: 64px;
    }
  }
</style>
