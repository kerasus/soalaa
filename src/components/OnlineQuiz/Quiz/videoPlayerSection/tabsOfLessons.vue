<template>
  <div>
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
        <q-tab name="Lessons" style="display: none"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Lessons" class="q-pa-none">

          <q-splitter
            v-model="splitterModel"
          >

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-primary"
              >
                <q-tab
                  v-for="(item, index) in report.sub_category"
                  :key="index"
                  :name="item.sub_category_id"
                  :label="item.sub_category"
                  @click="onVideoTabChange(index)"
                ></q-tab>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel
                  v-for="(item, index) in report.sub_category"
                  :key="index"
                  :name="item.sub_category_id"
                >
                  <div class="text-h4 q-mb-md">{{ currentVideoContent.title }}</div>
                  <div>زمانکوب ها</div>
                  <q-list bordered separator>
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
                    <video
                      :ref="'videoPlayer'+index"
                      class="video-js vjs-default-skin vjs-16-9 vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause"
                    />
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    </div>
    <button @click="log">log</button>
  </div>
</template>
<script>
/* eslint-disable camelcase */

import videojs from 'video.js'
import 'video.js/dist/video-js.css'
require('@silvermine/videojs-quality-selector')(videojs)
import fa from 'video.js/dist/lang/fa.json'
// eslint-disable-next-line no-unused-vars
import hotkeys from 'videojs-hotkeys'
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
  created () {
    console.log('this.report', this.report)
    this.loadFirstVideoTab()
    // this.report.sub_category[0].video_url: Array
  },
  methods: {
    log (n) {
      console.log('this.currentVideoContent', this.currentVideoContent)
      // console.log('logged', n)
    },
    getContent (contentId, sub_categoryIndex) {
      console.log('getContent contentId', contentId)
      console.log('getContent sub_categoryIndex', sub_categoryIndex)
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
          console.log('onPlayerReady', this)
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
      console.log('playTimePoint index', index)
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
      console.log('loadFirstVideoTab')
      this.onVideoTabChange(0)
    },
    onVideoTabChange (tabIndex) {
      console.log('tabIndex', tabIndex)
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
  }
}
</script>
<style scoped lang="scss">
.video-js .vjs-current-time, .vjs-no-flex .vjs-current-time {
  display: block;
}
</style>
<style lang="scss">
[dir="rtl"] .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  right: 0 #{"/* rtl:ignore */"};
  left: -4.5em #{"/* rtl:ignore */"};
  transition: left 0s #{"/* rtl:ignore */"};
}
</style>
