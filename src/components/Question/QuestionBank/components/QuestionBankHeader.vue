<template>
  <q-card class="custom-card">
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
  .search-section {
    .search-box-container{
      display: flex;
      .search-box {
        height: 64px;
        width: 300px;
      }
    }
    .select-box{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .q-select {
        .q-field__label{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px
        }
      }
    }
    }
</style>
<style lang="scss">
.search-section {
  .search-box-container{
    .search-box {
      .q-field__inner{
        .q-field__control{
          border-radius: 15px;
          .q-field__label{
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
          }
        }
      }
    }
  }
  .select-box{
    .q-select {
      width: 250px;
      .q-field__control{
        border-radius: 15px;
      }
      .q-field__label{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px
      }
    }
  }
}

</style>
