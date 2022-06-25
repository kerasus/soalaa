<template>
  <q-card class="headerBankCard custom-card">
    <q-card-section>
      <div class="row search-section">
        <div class="search-box-container col-sm col-xs-12">
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
        <div class="select-box col-sm  col-xs-6">
          <q-select
            filled
            dropdown-icon="isax:arrow-down-1"
            v-model="searchInput"
            label="جدیدترین"
          >
          </q-select>
        </div>
        <div class="question-filter-btn col-sm col-xs-6 " >
          <q-btn
            @click="this.FilterOptionDialog = !this.FilterOptionDialog"
            class="filter-btn"
            icon="isax:setting-4"
            flat
          />
        </div>

      </div>
    </q-card-section>
  </q-card>
  <q-dialog
    class="dialog-filter-card"
    v-model="FilterOptionDialog"
    persistent
    maximized
    transition-show="slide-right"
    transition-hide="slide-left"
  >
    <q-card class="dialog-filter-card-container">
      <div class="questions-filter">
        <div class="filter-headerOption-container">
          <div class="filter-header">
            <div class="filter-header-title"> فیلتر سوالات </div>
            <div class="close-filter-section">
              <q-btn
                flat
                label="بازگشت"
                icon-right="isax:arrow-left-2"
                @click="this.FilterOptionDialog = !this.FilterOptionDialog"
              />
            </div>
          </div>
          <div class="filter-options">
            <question-filter-expansion
              header-title="درس و مبحث"
            >
              salam
            </question-filter-expansion>
            <question-filter-expansion
              header-title="نوع سوال"
            >
<!--              <tree-->
<!--                ref="tree"-->
<!--                tick-strategy="strict"-->
<!--                :get-node-by-id="getNodeById"-->
<!--              />-->
            </question-filter-expansion>
            <question-filter-expansion
              header-title="سختی سوال"
            >
<!--              <tree-->
<!--                ref="tree1"-->
<!--                tick-strategy="strict"-->
<!--                :get-node-by-id="getNodeById"-->
<!--              />-->
            </question-filter-expansion>
            <question-filter-expansion
              header-title="تاریخ تالیف"
            >
              <div>
                salam
              </div>
            </question-filter-expansion>
          </div>
        </div>
        <div class="filter-actions">
          <div class="delete-all-filters-container">
            <q-btn
              class="delete-all-filters"
              label="حذف همه"
            />
          </div>
          <div class="set-filters-container">
            <q-btn
              label="اعمال فیلتر"
              class="set-filters"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import QuestionFilterExpansion from 'components/Question/QuestionBank/QuestionFilterExpansion'
export default {
  name: 'QuestionBankHeader',
  components: { QuestionFilterExpansion },
  data () {
    return {
      FilterOptionDialog: false,
      maximizedToggle: true,
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
          top: 8px;
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
        width: 160px;
        &:deep(.q-field__control){
          align-items: center;
          min-height: 40px;
          max-height: 40px;
          padding-left: 20px;
        }
        &:deep(.q-field__control-container){
          padding-top: 0;
        }
        &:deep(.q-field__label){
          top: 0;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px
        }
      }
    }
    .question-filter-btn{
      display: none;
    }
  }
}
@media only screen and (max-width: 1439px) {
  .headerBankCard{
    .search-section {
      padding: 12px 40px 12px 60px;
    }
  }
}
@media only screen and (max-width: 1023px) {
  .headerBankCard{
    .search-section {
      padding: 16px 16px 16px 18px;
      .search-box-container{
        justify-content: flex-start;
        padding-left: 18px;
        .search-box{
          width: 274px;
        }
      }
      .question-filter-btn{
        order: -1;
        display: flex;
        .filter-btn{
          width: 40px;
          height: 40px;
          background: #F4F5F6;
        }
        max-width: 40px;
      }
      .select-box{
        max-width: 160px;
      }
    }
  }
  .dialog-filter-card{
    .dialog-filter-card-container{
      background: #F4F5F6;
      .questions-filter{
        padding: 20px 30px 40px 30px;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        height: 100%;
        .filter-headerOption-container{
          .filter-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            .filter-header-title{
              font-weight: 500;
              font-size: 16px;
              line-height: 28px;
              color: #23263B;
            }
            .close-filter-section{
            }
          }
        }
        .filter-actions{
          display: flex;
          justify-content: space-between;
          .delete-all-filters-container{
            width: 262px;
            .delete-all-filters{
              width: 100%;
              border: 1px solid #E86562;
              background: #FFFFFF;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: #E86562;
            }
          }
          .set-filters-container{
            width: 262px;
            .set-filters{
              width: 100%;
              background-color: var(--3a-Primary);
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 599px) {
  .headerBankCard{
    .search-section {
      padding: 16px !important;
      justify-content: space-between;
      .search-box-container{
        padding-left: 0;
        &:deep(.q-card__actions){
          width: 100%;
        }
        padding-bottom: 12px;
        order: -1;
        .search-box{
          width: 100%;
        }
      }
      .select-box{
        min-width: 160px;
      }
    }
  }
  .dialog-filter-card{
    .dialog-filter-card-container{
      .questions-filter{
        padding: 20px 16px 30px 16px;
        .filter-headerOption-container{
          .filter-header{
            margin-bottom: 32px;
            .filter-header-title{
            }
            .close-filter-section{
            }
          }
        }
        .filter-actions{
          .delete-all-filters-container{
            width: 151px;
            .delete-all-filters{
            }
          }
          .set-filters-container{
            width: 151px;
            .set-filters{

            }
          }
        }
      }
    }
  }
}
</style>
