<template>
  <div>
    <q-card class="theme-v1-box-shadow q-pa-none">
      <div class="filter-card-container">
        <div class="filter-header">
          <q-card-section class="header-title-container q-pa-none">
            <div class="header-title">
              فیلترهای اعمال شده
            </div>
          </q-card-section>
          <q-card-actions class="delete-all-container q-pa-none">
            <q-btn flat rounded color="primary" @click="deleteAllFilters">
              حذف همه
            </q-btn>
          </q-card-actions>
        </div>
        <div>
          <q-card-actions class="q-pa-none">
            <div v-for="item in filters" :key="item" class="filter-items">
              <div class="items-title">
                {{ item.title }}
              </div>
              <div class="items-action">
                <q-btn flat rounded size="xs" @click="deleteFilter(item.id)">
                  <q-icon name="mdi-close"></q-icon>
                </q-btn>
              </div>
            </div>
          </q-card-actions>
        </div>
      </div>
    </q-card>
    <div class="filter-options-section"
         v-for="item in filterOptions" :key="item">
      <q-card class="theme-v1-box-shadow q-pa-none">
        <q-card-section class="q-pa-none">
          <q-expansion-item
            expand-icon="isax:arrow-down-1"
          >
              <template v-slot:header>
                <div class="filter-option-container " >
                <div class="filter-option-title">
                  {{ item }}
                </div>
                </div>
              </template>
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionBankFilter',
  data () {
    return {
      filters: [{
        title: 'شیمی دهم',
        id: 1
      },
      {
        title: 'فصل یک',
        id: 2
      },
      {
        title: 'فیلتر شماره یک',
        id: 3
      },
      {
        title: 'فیلتر شماره دو',
        id: 4
      },
      {
        title: 'تستی',
        id: 5
      }
      ],
      filterOptions: ['درس و مبحث', 'نوع سوال', 'طراح سوال', 'تاریخ تالیف']
    }
  },
  methods: {
    deleteFilter (id) {
      this.filters = this.filters.filter(e => e.id !== id)
    },
    deleteAllFilters () {
      this.filters = []
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-card-container {
  padding: 20px 23px 16px 24px;
  margin-bottom: 24px;

  .filter-header {
    padding-bottom: 11px;
    display: flex;
    justify-content: space-between;

    .delete-all-container {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
      position: relative;
      top: -5px;
    }

    .header-title-container {
      .header-title {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: #23263B;
      }
    }
  }

  .filter-items {
    margin-right: 8px;
    margin-bottom: 8px;
    background: #F4F5F6;
    border-radius: 11px;
    display: flex;

    .items-title {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
      color: #23263B;
      padding: 2px 0 0 9px;
    }

    .items-action {
      padding: 1px 1px 0 3px;
    }
  }
}

.filter-options-section {
  margin-bottom: 16px;

  .filter-option-container {
    width: 500px;
    display: flex;
    padding: 20px 24px 20px 24px;
    justify-content: space-between;

    .filter-option-title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #23263B;
    }

    .filter-option-drop-down-btn {
      position: relative;
      top: -3px;
    }
  }
}

@media only screen and (max-width: 1439px) {
  .filter-card-container {
    padding: 16px 16px 8px 16px !important;

    .filter-header {
      .delete-all-container {
        width: 90px;
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .filter-card-container {
    padding: 16px 0 8px 16px !important;
  }
  .filter-options-section {
    display: none;
  }
}

@media only screen and (max-width: 599px) {
  .filter-card-container {
    padding: 20px 0 16px 16px !important;
  }
}
</style>

<style lang="scss">
.filter-options-section {
  .q-expansion-item__container{
    .q-focus-helper{
      background: none !important;
    }
  }
}
</style>
