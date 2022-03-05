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
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Lessons" class="q-pa-none">

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
                  :key="index"
                  :name="item.sub_category_id"
                  :label="item.sub_category"
                  :id="'lessonTab' + index"
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
                      <div class="timestamp-box">
                        <div class="timestamp">زمانکوب ها</div>
                        <q-list dense>
                          <q-item
                            clickable
                            v-ripple
                            v-for="(currentVideoItem, i) in currentVideoContent.timepoints"
                            :key="i"
                            @click="playTimePoint(i)"
                          >
                            <q-item-section>{{ currentVideoItem.title }}</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="video-box">
                        <video
                          :ref="'videoPlayer'+ index"
                          class="video-js vjs-default-skin vjs-16-9 vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <q-banner inline-actions class="text-white bg-red">
                      ویدیویی منتشر نشده
                    </q-banner>
                  </div>
                  <div class="row videoPlayer-pages-box" v-if="currentVideoContent">
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
/* eslint-disable camelcase */

import videojs from 'video.js'
import 'video.js/dist/video-js.css'
require('@silvermine/videojs-quality-selector')(videojs)
import fa from 'video.js/dist/lang/fa.json'
// eslint-disable-next-line no-unused-vars
// import hotkeys from 'videojs-hotkeys'
import Assistant from 'src/plugins/assistant'
import { AlaaSet } from 'src/models/AlaaSet'
import { AlaaContent } from 'src/models/AlaaContent'

export default {
  name: 'tabsOfLessons',
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
      innerTab: this.report.sub_category[0].sub_category,
      splitterModel: 20,
      player: null,
      options: {
        controlBar: {
          // currentTimeDisplay: true,
          TimeDivider: true,
          children: [
            'playToggle',
            'PlaybackRateMenuButton',
            'CurrentTimeDisplay',
            'progressControl',
            'TimeDivider',
            'RemainingTimeDisplay',
            'volumePanel',
            'SubtitlesButton',
            'qualitySelector',
            'fullscreenToggle',
            'PictureInPictureToggle'
          ],
          volumePanel: {
            inline: false,
            vertical: true
          }
        },
        language: 'fa',
        languages: {
          fa
        },
        autoplay: false,
        controls: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4],
        nativeControlsForTouch: true,
        sources: [],
        poster: null,
        plugins: {
          hotkeys: {
            enableModifiersForNumbers: false,
            seekStep: 5,
            enableMute: true,
            enableVolumeScroll: true,
            enableHoverScroll: true,
            enableFullscreen: true
          }
        }
      },
      currentVideoContent: null,
      alaaVideos: null,
      alaaContent: new AlaaContent(),
      alaaSet: new AlaaSet(),
      videoLesson: null
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.loadFirstVideoTab()
    })
  },
  methods: {
    getContent (contentId, sub_categoryIndex) {
      const that = this
      this.alaaContent.show(contentId)
        .then((response) => {
          that.currentVideoContent = response.data.data
          that.initVideoJs(that.currentVideoContent.file.video, sub_categoryIndex)
        })
        .catch((error) => {
          Assistant.reportErrors(error)
          that.currentVideoContent = null
        })
    },
    initVideoJs (srcs, sub_categoryIndex) {
      if (!this.$refs['videoPlayer' + sub_categoryIndex]) {
        return
      }
      const that = this
      this.player = videojs(that.$refs['videoPlayer' + sub_categoryIndex][0], this.options,
        function onPlayerReady () {
          // console.log('onPlayerReady', this)
        })
      this.updateTimepointsHeights(sub_categoryIndex)
      this.updateVideoSrc(srcs)
    },
    updateVideoSrc (srcs) {
      const updatedSrcs = this.getVideoSrcs(srcs)
      this.player.pause()
      this.player.src(updatedSrcs)
      this.player.load()
    },
    updateTimepointsHeights (sub_categoryIndex) {
      this.timepointsHeights = this.$refs['videoPlayer' + sub_categoryIndex][0].clientHeight
    },
    playTimePoint (index) {
      this.player.pause()
      this.player.currentTime(this.currentVideoContent.timepoints[index].time)
      this.player.play()
    },
    getVideoSrcs (srcs) {
      const updatedSrcs = []
      srcs.forEach(video => {
        updatedSrcs.push({
          src: video.link,
          type: 'video/' + video.ext,
          res: video.res,
          default: (video.res === '240p'),
          label: video.caption
        })
      })
      return updatedSrcs
    },
    loadFirstVideoTab () {
      // Todo : i need loading here
      this.currentVideoContent = '0'
      document.getElementById('lessonTab0').click()
      this.onVideoTabChange(0)
    },
    onVideoTabChange (tabIndex) {
      if (this.player) {
        this.player.pause()
      }
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
.tabs-of-lessons .answers-video-group {
  display: flex;
  flex-direction: row;
}
.tabs-of-lessons .video-box {
  width: 70%;
}
.tabs-of-lessons .timestamp-box {
  width: 30%;
  margin-left: 15px #{"/* rtl:ignore */"};
  max-height: 435px;
  overflow-x: scroll;
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
  .tabs-of-lessons .timestamp-box {
    max-height: 280px;
  }
  .tabs-of-lessons {
    .q-tab {
      height: 48px;
    }
    .q-splitter__after {
      margin-top: 86px;
    }
  }
}

@media only screen and (max-width: 670px) {
  .tabs-of-lessons .video-box {
    width: 100%;
  }
  .tabs-of-lessons .timestamp-box {
    width: 100%;
    margin-left: 0px #{"/* rtl:ignore */"};
  }
  .tabs-of-lessons .answers-video-group {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
  .tabs-of-lessons .timestamp-box {
    margin-top: 10px;
    max-height: 210px;
  }
}
@media only screen and (max-width: 700px) {
  .tabs-of-lessons .timestamp-box {
    max-height: 180px;
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
