<template>
  <div class="tabs-of-lessons">
    <div class="q-pa-md">
      <q-card>
        <q-tabs
          v-if="report.length"
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
        </q-tabs>
        <q-tab-panels v-model="tab"
                      animated>
          <q-tab-panel name="Lessons"
                       class="q-pa-none">

            <q-splitter
              v-model="splitterModel"
            >

              <template v-slot:before>
                <q-tabs
                  v-model="innerTab"
                  :vertical="canBeVertical"
                  class="text-primary"
                >
                  <!--        TODO :  window.innerWidth MUST BE REPLACED   -->
                  <q-tab
                    v-for="(item, index) in report.sub_category"
                    :id="'lessonTab' + index"
                    :key="index"
                    :name="item.sub_category_id"
                    :label="item.sub_category"
                    :disable="tabPanelDisabled"
                    @click="onVideoTabChange(index)"
                  ></q-tab>
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="innerTab"
                  animated
                  :vertical="canBeVertical"
                  transition-prev="slide-down"
                  transition-next="slide-up"
                >
                  <q-tab-panel
                    v-for="(item, index) in report.sub_category"
                    :key="index"
                    :name="item.sub_category_id"
                  >
                    <div v-if="currentVideoContent">
                      <div class="current-panel-title q-mb-md">{{ currentVideoContent.title }}</div>
                      <div class="answers-video-group">
                        <div class="video-box">
                          <content-video-player :content="content" />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <q-banner inline-actions
                                class="text-white bg-red">
                        ویدیویی منتشر نشده
                      </q-banner>
                    </div>
                    <div v-if="currentVideoContent"
                         class="row videoPlayer-pages-box">
                      <div class="col">
                        <div
                          class="flex flex-center"
                          dir="ltr"
                        >
                          <q-btn
                            v-for="(video, alaaVideoIndex) in alaaVideos"
                            :key="alaaVideoIndex"
                            outline
                            rounded
                            class="videoPlayer-pages-btn"
                            @click="getContent(video.id)"
                          >
                            {{ alaaVideoIndex + 1 }}
                          </q-btn>
                        </div>
                      </div>
                    </div>
                    <q-inner-loading
                      :showing="loadingVisibility"
                      label="لطفا کمی صبر کنید..."
                      color="primary"
                      class="tabLessons-inner-loading"
                      label-style="font-size: 1.1em"
                    />
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { AlaaSet } from 'src/models/AlaaSet.js'
import Assistant from 'src/plugins/assistant.js'
import { Content } from 'src/models/Content.js'
import ContentVideoPlayer from 'src/components/ContentVideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'

export default {
  name: 'tabsOfLessons',
  components: { ContentVideoPlayer },
  props: {
    report: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      tab: 'Lessons',
      loadingVisibility: false,
      tabPanelDisabled: false,
      innerTab: this.report.sub_category[0].sub_category,
      splitterModel: 20,
      currentVideoContent: null,
      alaaVideos: null,
      content: new Content(),
      alaaSet: new AlaaSet(),
      videoLesson: null,
      contentSources: new PlayerSourceList(),
      contentPoster: null
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.loadFirstVideoTab()
    })
  },
  methods: {
    getContent (contentId, subCategoryIndex) {
      this.$axios.get(API_ADDRESS.content.base + '/' + contentId)
        .then((response) => {
          this.currentVideoContent = response.data.data
          this.content = new Content(this.currentVideoContent)
          // this.initVideoJs(this.currentVideoContent.file.video, this.currentVideoContent.photo, subCategoryIndex)
        })
        .catch((error) => {
          Assistant.reportErrors(error)
          this.currentVideoContent = null
        })
    },
    initVideoJs (srcs, poster) {
      this.contentSources = new PlayerSourceList(srcs)
      this.contentPoster = poster
    },
    playTimePoint (index) {
      // ToDo: changePlayer time
      // this.player.pause()
      // this.player.currentTime(this.currentVideoContent.timepoints[index].time)
      // this.player.play()
    },
    loadFirstVideoTab () {
      // Todo : i need loading here
      this.currentVideoContent = '0'
      document.getElementById('lessonTab0').click()
      this.onVideoTabChange(0)
    },
    onVideoTabChange (tabIndex) {
      this.loadingVisibility = true
      this.tabPanelDisabled = true
      const that = this
      setTimeout(() => {
        that.loadingVisibility = false
        that.tabPanelDisabled = false
      }, 1000)

      if (this.report && this.report.sub_category[tabIndex].video_url[0]) {
        const parsed = this.report.sub_category[tabIndex].video_url[0].split('/')
        let contentId = parsed[parsed.length - 1]
        if (contentId === '') {
          contentId = parsed[parsed.length - 2]
        }
        this.alaaVideos = []
        this.report.sub_category[tabIndex].video_url.forEach(item => {
          const parsedd = item.split('/')
          let contentIdd = parsedd[parsedd.length - 1]
          if (contentIdd === '') {
            contentIdd = parsedd[parsedd.length - 2]
          }
          this.alaaVideos.push({ id: contentIdd })
        })
        this.getContent(contentId, tabIndex)
      } else {
        this.currentVideoContent = null
      }
    }
  },
  computed: {
    canBeVertical () {
      return window.innerWidth > 670
    }
  }
}
</script>

<style scoped lang="scss">
.video-js .vjs-current-time, .vjs-no-flex .vjs-current-time {
  display: block;
}
.tabs-of-lessons {
  .answers-video-group {
    .video-box {
      width: 100%;
    }
  }
}

.tabs-of-lessons {
  .current-panel-title {
    font-size: 16px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .timestamp {
    padding-right: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
  .videoPlayer-pages-box {
    margin-top: 15px;
  }
  .videoPlayer-pages-btn {
    color : #666666;
    margin-right: 10px #{"/* rtl:ignore */"};
  }
}
@media only screen and (max-width: 1330px) {
  .tabs-of-lessons {
    .q-tab {
      height: 48px;
    }
    .q-splitter__after {
      margin-top: 86px;
    }
  }
}

</style>
<style lang="scss">
[dir="rtl"] .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  right: 0 #{"/* rtl:ignore */"};
  left: -4.5em #{"/* rtl:ignore */"};
  transition: left 0s #{"/* rtl:ignore */"};
}
.vjs-quality-selector {
  .vjs-menu-button {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  .vjs-icon-placeholder {
    font-family: 'VideoJS';
    font-weight: normal;
    font-style: normal;
    &::before {
      content: '\f110';
    }
  }
}
.video-js .vjs-play-progress::before {
  left: initial #{"/* rtl:ignore */"} !important;
  right: -0.5em #{"/* rtl:ignore */"};
}
.tabs-of-lessons .timestamp-box {
  .q-focus-helper, .q-focusable, .q-manual-focusable, .q-hoverable {
    border-radius: 15px 0px 0px 15px #{"/* rtl:ignore */"};
  }
  .q-list--dense > .q-item, .q-item--dense {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}
.tabs-of-lessons {
  .q-splitter--vertical.q-splitter--workable > .q-splitter__separator {
    color: transparent;
    background-color: transparent;
  }
}
.tabs-of-lessons {
  background-color: #f1f1f1;
    .q-tabs__content {
      .q-tab--active{
        background-color: #fff;
        border-radius: 0 10px 10px 0 #{"/* rtl:ignore */"};
        color: #ffc107;
      }
    }
  .q-tab-panels {
    background-color: #f1f1f1;
  }
  .q-tabs {
    background-color: #f1f1f1;
    margin-top: 34px;
  }
  .q-tab {
    background-color: #ebeaea;
    color: #6a6969;
    border-radius: 0 10px 10px 0 #{"/* rtl:ignore */"};
  }
  .q-card {
    box-shadow: none;
  }
  .q-splitter__after .q-tab-panels {
    background-color: #fff;
    border-radius: 25px;
  }
  .tabLessons-inner-loading {
    background: rgba(119, 119, 119, 0.4);
  }
}
@media only screen and (min-width: 1330px) {
  .tabs-of-lessons {
    .q-tab {
      padding: 0 8px;
      height: 58px !important;
    }
    .q-splitter__after {
      margin-top: 52px !important;
    }
  }
}
@media only screen and (min-width: 671px) {
  .tabs-of-lessons {
    .q-tab {
      height: 48px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .q-splitter__after {
      margin-top: 86px;
    }
  }
}
@media only screen and (max-width: 670px) {
  .tabs-of-lessons .q-tab-panel .q-splitter {
    display: flex;
    flex-direction: column;
    .q-splitter__panel {
      width: 100% !important;
    }
    .q-tabs {
      margin-top: 0px;
    }
  }
  .tabs-of-lessons {
    .q-tabs__content {
      .q-tab--active{
        border-radius: 0 !important;
      }
    }
    .q-tab {
      border-radius: 0 !important;
    }
    .q-tabs--horizontal {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}
</style>
