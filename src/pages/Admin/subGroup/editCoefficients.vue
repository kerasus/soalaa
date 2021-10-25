<template>
  <div class="row ">
    <div class="col-md-6 q-pa-sm">
      <!--        ToDo change to using id-->
      <q-select
        v-model="selectedSubgroup"
        outlined
        dense
        :options="allSubGroups"
        item-text="value"
        item-value="id"
        label="زیرگروه"
      />
    </div>
    <div class="col-md-6 q-pa-sm">
      <q-btn
        class="full-width"
        block
        color="blue"
        @click="addSubgroup"
      >
        افزودن زیرگروه
      </q-btn>
    </div>
    <div class="col-md-12 q-pa-sm">
      <q-expansion-item
        class="bg-white rounded-borders q-mb-md"
        v-for="(subGroup, index) in subGroups"
        :key="index"
        :label='subGroups'
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-md-4 q-pa-sm">
                <q-select
                  v-model="selectedCategory"
                  label="دفترچه"
                  outlined
                  dense
                  :options="categoryList"
                  item-text="title"
                  item-value="title"
                />
              </div>
              <div class="col-md-4 q-pa-sm">
                <q-select
                  v-model="selectedSubcategory"
                  label="درس"
                  outlined
                  dense
                  :options="subCategoriesList"
                  item-text="title"
                  item-value="id"
                />
              </div>
              <div class="col-md-4 q-pa-sm">
                <q-btn
                  class="full-width"
                  dense
                  color="blue"
                  block
                  @click="addSubcategory(subGroup)"
                >
                  اضافه کردن درس
                </q-btn>
              </div>
              <div class="col-md-12 q-pa-sm">
                <q-markup-table
                  flat
                  dense
                >
                  <template v-slot:default>
                    <thead class="text-left">
                    <tr>
                      <th>اسم درس</th>
                      <th
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <q-tooltip
                          anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <p
                              v-bind="attrs"
                              class="d-inline-block"
                              v-on="on"
                            >
                              {{ subCategory.sub_category_title }}
                            </p>
                          </template>
                          <span>{{ subCategory.category_title }}</span>
                        </q-tooltip>
                        <q-tooltip
                          anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <q-btn
                              icon
                              color="red"
                              v-bind="attrs"
                              v-on="on"
                              @click="deleteSubcategory(subGroup, subCategory.sub_category_title)"
                            >
                              <q-icon>mdi-close</q-icon>
                            </q-btn>
                          </template>
                          <span>حذف درس</span>
                        </q-tooltip>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="text-left">
                    <tr>
                      <td width="130px">
                        ضریب درس
                      </td>
                      <td
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <q-input
                          v-model="subCategory.sub_category_zarib"
                          dense
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td width="130px">
                        ضریب دفترچه
                      </td>
                      <td
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <q-input
                          v-model="subCategory.category_zarib"
                          dense
                          type="number"
                        />
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </q-markup-table>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 q-pa-sm">
      <q-btn
        class="full-width"
        color="green"
        dark
        block
        x-large
        @click="save"
      >
        ثبت
      </q-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditCoefficients',
  data () {
    return {
      categoryList: ['دفترچه سوالات اختصاصی', 'دفترچه سوالات عمومی'],
      subCategoriesList: ['ریاضی', 'شیمی'],
      subGroups: ['زیرگروه 1'],
      selectedSubgroup: null,
      selectedCategory: null,
      selectedSubcategory: null,
      allSubGroups: ['زیرگروه ۱', 'زیرگروه ۲', 'زیرگروه ۳', 'زیرگروه ۴']
    }
  },
  methods: {
    addSubgroup () {
      const selectedSubGroup = this.allSubGroups.find(item => item.id === this.selectedSubgroup)
      this.subGroups.push({
        title: selectedSubGroup.value,
        sub_category: [],
        id: selectedSubGroup.id
      })
    },
    addSubcategory (subGroup) {
      const that = this
      const selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.selectedSubcategory)
      subGroup.sub_category.push({
        category_title: that.selectedCategory,
        category_zarib: 0,
        sub_category_id: selectedSubCategory.id,
        sub_category_title: selectedSubCategory.title,
        sub_category_zarib: 0
      })
    },
    deleteSubcategory (subGroup, subcategoryTitle) {
      subGroup.sub_category = subGroup.sub_category.filter(item => item.sub_category_title !== subcategoryTitle)
    },
    save () {
      this.subGroups.forEach(subGroup => {
        if (!subGroup.zirgorooh_id) {
          subGroup.zirgorooh_id = subGroup.id
        }
        subGroup.sub_category.forEach(subCategory => {
          subCategory.subcategory_id = subCategory.sub_category_id
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
