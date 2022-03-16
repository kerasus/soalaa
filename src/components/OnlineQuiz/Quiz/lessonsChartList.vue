<template>
  <div class="row">
    <div class="col-12">
      <div class="tableSize">
        <span>{{ $route.params.quizTitle }}</span>
        <q-btn
          class="q-mx-sm float-right"
          round
          dark-percentage
          color="primary"
          @click="goBack"
          icon="isax:arrow-left-2"
        />
      </div>
    </div>
    <div class="col-12">
      <q-markup-table class="tableSize">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              عنوان
            </th>
            <th class="text-left">
              عملیات
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="item in lessonsList.list"
            :key="item.id"
          >
            <td>{{ item.title }}</td>
            <td class="actionsColumn">
              <q-btn
                v-if="item.permissions.view"
                class="q-mx-sm"
                size="12px"
                round
                dark-percentage
                @click="redirect(item)"
                color="green">
                <q-icon
                  name="mdi-notebook-outline"
                  size="sm"
                />
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span class="smallFontSize">مشاهده سوالات دروس</span>
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item.permissions.view"
                class="q-mx-sm"
                size="12px"
                round
                dark-percentage
                color="blue"
                @click="redirect(item)"
              >
                <q-icon
                  name="mdi-video"
                  size="sm"
                />
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span class="smallFontSize">ثبت ویدئو تحلیل</span>
                </q-tooltip>
              </q-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'

export default {
  name: 'LessonsChartList',
  data: () => ({
    lessonsList: new QuestSubcategoryList()
  }),
  created () {
    this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
  },
  mounted () {
    this.loadLessons()
  },
  methods: {
    goBack () {
      this.$router.push('/admin/exam')
    },
    async loadLessons () {
      this.lessonsList.loading = true
      try {
        const response = await this.getLessons()
        this.lessonsList.loading = false
        this.lessonsList = new QuestSubcategoryList(response.data.data, {
          meta: response.data.meta,
          links: response.data.links
        })
      } catch (e) {
        this.lessonsList.loading = false
        this.lessonsList = new QuestSubcategoryList()
      }
    },
    getLessons () {
      return axios.get(API_ADDRESS.exam.getSubCategoriesWithPermissions(this.$route.params.quizId))
    },
    redirect (link) {
      console.log(link)
    }
  }
}

</script>

<style scoped>

.actionsColumn {
  width: 50%;
}

.tableSize {
  width: 60%;
  margin: auto;
}

.col-12 {
  padding: 12px;
}

.smallFontSize {
  font-size: 13px;
}

span {
  font-size: 16px;
}
</style>
