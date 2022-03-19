<template>
  <q-card class="theme-v1-box-shadow">
    <q-card-section>
      <div class="row search-section">
        <div class="search-box col">
          <q-card-actions>
            <div class="search-box">
              <q-input standout="pink text-white" v-model="searchInput" label="جستجو در سوالات سه آ">
                <template v-slot:append>
                  <q-icon v-if="text === ''" name="search" />
                  <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                </template>
              </q-input>
            </div>
          </q-card-actions>
        </div>
        <div class="select-box col">
          <q-select
            style="width: 250px"
            dropdown-icon="isax:arrow-down-1"
            rounded
            outlined
            v-model="searchInput"
            :options="options"
            label="جدیدترین"
          >
            <template v-slot:append>
              <q-icon
                v-if="model !== null"
                class="cursor-pointer"
                name="clear"
                @click.stop="model = null"
              />
            </template>
          </q-select>
        </div>
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
    .search-box{
      display: flex;
      .search-title {
        align-self: center;
      }
      .search-box {
        height: 64px;
      }
    }
    .select-box{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .q-select .q-field__label{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px
      }
    }
    }
</style>
