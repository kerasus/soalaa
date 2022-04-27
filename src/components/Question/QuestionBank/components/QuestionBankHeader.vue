<template>
  <q-card class="headerBankCard custom-card">
    <q-card-section>
      <div class="row search-section">
        <div class="search-box-container col">
          <q-card-actions>
            <div class="search-box">
              <q-input
                v-model="searchInput"
                filled
                label="جستجو در سوال ها...">
                <template v-slot:append>
                  <q-btn
                    flat
                    rounded
                    icon="isax:search-normal" />
                </template>
              </q-input>
            </div>
          </q-card-actions>
        </div>
        <div class="select-box col">
          <q-select
            filled
            dropdown-icon="isax:arrow-down-1"
            v-model="searchInput"
            label="جدیدترین"
          >
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
.headerBankCard{
  &:deep(.q-card__section){
    padding: 0;
  }
  .search-section {
    padding: 12px 60px 12px 60px;
    .search-box-container{
      display: flex;
      &:deep(.q-card__actions){
        padding: 0;
      }
      .search-box {
        width: 300px;
        &:deep(.q-field__label){
          top: 0;
          padding-left: 7px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
        }
        &:deep(.q-btn-item){
          height: 36px;
          width: 36px;
          justify-content: center;
        }
        &:deep(.q-field__control){
        height: 40px;
        align-items: center;
      }
      }
    }
    .select-box{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .q-select {
        width: 250px;
        &:deep(.q-field__control){
          border-radius: 15px;
        }
        &:deep(.q-field__label){
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px
        }
      }
    }
  }
}
</style>
