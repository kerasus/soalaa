<template>
    <q-card
      class="set-video q-mx-auto q-pa-0"
      :style="{'max-width':'800px'}"
    >
      <q-card-section
      class="q-pa-0"
      >
        <q-toolbar
          class="set-video-toolbar bg-deep-purple-11  q-mx-auto"
          :style="{'height' : '64px'}"
          dark
        >
          <q-toolbar-title>
            {{ ' آزمون داخل 98 ریاضی 4K سری سوم: دین و زندگی ' }}
          </q-toolbar-title>

          <q-space />
          <q-btn
            color="white"
            flat
            round
            @click="addVideo"
            icon="mdi-plus"
          >
            <q-tooltip
              anchor="top middle"
              :offset="[20,33]"
            >
              <span>لینک جدید</span>
            </q-tooltip>
          </q-btn>
          <q-btn
            color="white"
            flat
            round
            @click="saveVideos"
            icon="mdi-check"
          >
            <q-tooltip
              anchor="top middle"
              :offset="[20,33]"
            >
              <span>ثبت</span>
            </q-tooltip>
          </q-btn>

        </q-toolbar>
        <q-list
        >
<!--          v-for="(item, index) in videos"-->
<!--          :key="index"-->
          <q-item
            bordered
          >
            <q-item-section>
              <q-input
                v-model="videos[index]"
                dir="ltr"
                outlined
                dense
                :style="{ 'max-width': '650px' }"
              />
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                color="primary"
                flat
                round
                icon="mdi-play-box-outline"
              >
                <a
                  :href="item"
                  target="_blank"
                />
                <q-tooltip
                  anchor="top middle"
                  :offset="[20,33]"
                >
                  <span>مشاهده کانتنت</span>
                </q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                color="red"
                flat
                round
                @click="removeVideo(index)"
                icon="mdi-close"
              >
                <q-tooltip
                  anchor="top middle"
                  :offset="[20,33]"
                >
                  <span>حذف لینک</span>
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item
            bordered
          >
            <q-item-section>
              <q-input
                v-model="videos[index]"
                dir="ltr"
                outlined
                dense
                :style="{ 'max-width': '650px' }"
              />
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                color="primary"
                flat
                round
                icon="mdi-play-box-outline"
              >
                <q-tooltip
                  anchor="top middle"
                  :offset="[20,33]"
                >
                  <span>مشاهده کانتنت</span>
                </q-tooltip>
              </q-btn>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                color="red"
                flat
                round
                @click="removeVideo(index)"
                icon="mdi-close"
              >
                <q-tooltip
                  anchor="top middle"
                  :offset="[20,33]"
                >
                  <span>حذف لینک</span>
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

    </q-card>
</template>

<script>

import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'SetVideo',
  data: () => {
    return {
      subCategoriesList: new QuestSubcategoryList(),
      loading: true,
      selectedSubCategory: null,
      videos: []
    }
  },
  watch: {

  },
  mounted () {
    this.selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.$route.params.subcategory_id)
    this.loadSubcategories()
    this.getCurrentVideos()
  },
  created () {
    this.loading = true
  },
  methods: {
    getCurrentVideos () {
      console.log(this.subCategoriesList)
      this.$axios.get(API_ADDRESS.exam.getAnalysisVideo(this.$route.params.examId))
        .then(response => {
          console.log(this.subCategoriesList.list)
          this.selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.$route.params.subcategory_id)
          if (response.data.data.find(item => item.sub_category.id === this.selectedSubCategory.id).videos) {
            this.videos = response.data.data.find(item => item.sub_category.id === this.selectedSubCategory.id).videos
          }
        })
    },
    saveVideos () {
      this.$axios.post(API_ADDRESS.exam.analysisVideo, {
        video: this.videos,
        sub_category_id: this.selectedSubCategory.id,
        exams: [{ exam_id: this.$route.params.exam_id }]
      })
        .then(() => {
          this.$notify({
            group: 'notifs',
            text: 'اطلاعات ثبت شد.',
            type: 'success'
          })
        })
    },
    addVideo () {
      this.videos.push('')
    },
    removeVideo (index) {
      this.videos.splice(index, 1)
    },
    loadSubcategories () {
      this.subCategoriesList.fetch()
        .then((response) => {
          this.selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.$route.params.subcategory_id)
          this.subCategoriesList = new QuestSubcategoryList(response.data.data)
          this.loading = false
        })
    }

  }
}
</script>

<style lang="scss">
.set-video{
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  .q-card__section--vert{
    padding: 0px 0px 12px 0px;
    .q-item{
      padding-bottom: 16px;
      .q-item__section--avatar{
        min-width: 42px;
        padding-left: 0;
      }
    }
    .q-toolbar{
      margin-bottom: 5px;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      .ellipsis {
        color: #ffffff;
        overflow: visible;
      }
    }
  }
}

</style>

<style scoped>

</style>
