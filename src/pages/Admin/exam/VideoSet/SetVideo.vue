<template>
     <div
       class="set-video-back-btn q-mx-auto "
     >
    <q-btn
    round
    color="primary"
    unelevated
    @click="goBack"
     >

    <i class="fi-rr-angle-left row" />
    </q-btn>

    </div>
    <q-card
      class="set-video q-mx-auto q-pa-0"
      :style="{'max-width':'800px'}"
    >
      <q-card-section
      class="q-pa-0"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-toolbar
            class="set-video-toolbar bg-deep-purple-11  q-mx-auto"
            :style="{'height' : '64px'}"
            dark
          >
            <q-toolbar-title v-if="selectedSubCategory">
              {{quizTitle + ': ' + selectedSubCategory.title }}
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
                <span class="smallFontSize">لینک جدید</span>
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
                <span class="smallFontSize">ثبت</span>
              </q-tooltip>
            </q-btn>
            <q-inner-loading
              :showing="loading"
              color="primary"
              dark
              label-class="text-teal"
              label-style="font-size: 1.1em"
            />
          </q-toolbar>
        </transition>
          <q-list
            v-for="(item, index) in videos"
            :key="index"
          >
            <q-item
              bordered
            >
              <q-item-section>
                <q-input
                  v-model="videos[index]"
                  type="url"
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
                  :href="item"
                  target="_blank"
                >
                  <q-tooltip
                    anchor="top middle"
                    :offset="[20,33]"
                  >
                    <span class="smallFontSize">مشاهده کانتنت</span>
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
                    <span class="smallFontSize" >حذف لینک</span>
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
import { mixinGetQuizData } from 'src/mixin/Mixins'

export default {
  name: 'SetVideo',
  data: () => {
    return {
      quizTitle: '',
      subCategoriesList: new QuestSubcategoryList(),
      loading: true,
      selectedSubCategory: null,
      videos: []
    }
  },
  mixins: [mixinGetQuizData],
  mounted () {
    this.loadSubcategories()
  },
  created () {
    this.loading = true
    this.getQuizTitle()
  },
  methods: {
    async getQuizTitle () {
      const res = await this.getQuizData(this.$route.params.examId)
      if (res.data.data) {
        this.quizTitle = res.data.data.title
      }
    },
    getCurrentVideos () {
      this.$axios.get(API_ADDRESS.exam.getAnalysisVideo(this.$route.params.examId))
        .then(response => {
          this.selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.$route.params.subcategory_id)
          response.data.data.forEach(item => {
          })
          if (response.data.data.find(item => item.sub_category.id === this.selectedSubCategory.id).videos) {
            this.videos = response.data.data.find(item => item.sub_category.id === this.selectedSubCategory.id).videos
          }
        })
    },
    saveVideos () {
      this.$axios.post(API_ADDRESS.exam.analysisVideo,
        {
          video: this.videos,
          sub_category_id: this.selectedSubCategory.id,
          exams: [{ exam_id: this.$route.params.examId }]
        })
        .then(() => {
          this.$q.notify({
            message: 'اطلاعات ثبت شد.',
            group: 'notifs',
            type: 'positive'
          })
        })
    },
    addVideo () {
      this.videos.push('')
    },
    goBack () {
      this.$router.go(-1)
    },
    removeVideo (index) {
      this.videos.splice(index, 1)
    },
    loadSubcategories () {
      const that = this
      that.$axios.get(that.subCategoriesList.baseRoute)
        .then((response) => {
          that.subCategoriesList = new QuestSubcategoryList(response.data.data)
          that.selectedSubCategory = that.subCategoriesList.list.find(item => item.id === that.$route.params.subcategory_id)
          that.loading = false
          this.getCurrentVideos()
        })
    }

  }
}
</script>

<style lang="scss">
.smallFontSize {
  font-size: 13px;
}
.set-video-back-btn {
  display:flex;
  padding-bottom: 12px;
  justify-content: flex-end;
  max-width: 800px;
}
.set-video{
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  .q-card__section--vert{
    padding: 0px 0px 4px 0px;
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
