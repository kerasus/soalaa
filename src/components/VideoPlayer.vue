<template>
  <div ref="videoPlayerWrapper"
       class="vPlayer">
    <video ref="videoPlayer"
           dir="ltr"
           class="video-js vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause"
           controls
           preload="none">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="https://videojs.com/html5-video-support/"
           target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
    <div v-if="useOverPlayer"
         ref="overPlayer"
         class="over-player-wrapper">
      <q-btn icon-right="isax:menu-1"
             size="sm"
             color="primary"
             class="toggleSideBarBtn"
             @click="toggleSideBar" />
      <div class="over-player-slot"
           :class="{'show': localOverPlayer, 'hide': !localOverPlayer}"
           :style="{width: overPlayerWidth}">
        <slot name="overPlayer" />
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import videojsBrand from 'videojs-brand'
import fa from 'video.js/dist/lang/fa.json'
import { Content } from 'src/models/Content.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import videoJsResolutionSwitcher from 'src/assets/js/videoJsResolutionSwitcher.js'

import 'videojs-hls-quality-selector'
// import 'videojs-contrib-quality-levels'

// // redefineTap
// // https://stackoverflow.com/questions/28070934/video-js-player-pause-play-with-a-single-tap-on-a-mobile
// if (typeof window !== 'undefined') {
//   videojs.MediaTechController.prototype.onTap = function() {
//     if (this.player().controls()) {
//       if (this.player().paused()) {
//         this.player().play()
//       } else {
//         this.player().pause()
//       }
//     }
//   }
//   player.on('click', function() {
//     if (player.paused()) {
//       player.play();
//     } else {
//       player.pause();
//     }
//   });
// }

// https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8 (Live)
// https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8

export default {
  name: 'VideoPlayer',
  props: {
    source: {
      type: [String, PlayerSourceList],
      default: null
    },
    useOverPlayer: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default () {
        return ''
      }
    },
    overPlayer: {
      type: Boolean,
      default: true
    },
    overPlayerWidth: {
      type: String,
      default: '100%'
    },
    keepCalculating: {
      type: Boolean,
      default () {
        return true
      }
    },
    bookmarkLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked', 'update:sideBar'],
  data() {
    return {
      width: '',
      drawer: false,
      player: null,
      localOverPlayer: false,
      favLoading: false,
      options: {
        myItems: [{
          name: 'test'
        }],
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
            'QualitySelector',
            'fullscreenToggle',
            'PictureInPictureToggle'
          ],
          volumePanel: {
            inline: true,
            vertical: true
          }
        },
        language: 'fa',
        languages: {
          fa
        },
        responsive: true,
        autoplay: false,
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2, 3, 4],
        nativeControlsForTouch: true,
        sources: [],
        poster: null,
        plugins: {
          // hotkeys: {
          //   enableModifiersForNumbers: false,
          //   seekStep: 5,
          //   enableMute: true,
          //   enableVolumeScroll: true,
          //   enableHoverScroll: true,
          //   enableFullscreen: true
          // }
        }
      },
      videoIsPlaying: false,
      currentContent: new Content(),
      postIsFavored: {}
    }
  },
  computed: {
    calcTheHeight() {
      return '100%'
    },
    calcTheWidth() {
      return '100%'
    },
    currentTime() {
      return this.currentTimed
    }
  },
  watch: {
    source () {
      this.reInitVideo()
    },
    currentTime(time) {
      this.player.currentTime(time)
    },
    overPlayer(newValue) {
      this.localOverPlayer = newValue
    },
    useOverPlayer (newValue) {
      if (!newValue) {
        return
      }

      this.$nextTick(() => {
        this.moveSideBarElementIntoVideoPlayerElements()
      })
    }
  },
  created() {
    this.width = this.overPlayerWidth
    this.setPoster()
    this.setSources()
  },
  mounted() {
    this.initPlayer()
    if (this.useOverPlayer) {
      this.$nextTick(() => {
        this.moveSideBarElementIntoVideoPlayerElements()
      })
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    focusOnPlayer () {
      this.player.el().focus()
    },
    setPlayerBrand () {
      this.player.brand({
        image: 'https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png?w=30&h=30',
        title: 'آلاء',
        destination: '/',
        destinationTarget: '_blank'
      })
    },
    redefineTap () {
      this.player.on('touchend', function() { // tap
        if (this.player().controls()) {
          if (this.player().paused()) {
            this.player().play()
          } else {
            this.player().pause()
          }
        }
      })
    },
    hasPlugin (pluginName) {
      return Object.keys(videojs.getPlugins()).includes(pluginName)
    },
    initPlayer () {
      if (!this.hasPlugin('brand')) {
        videojs.registerPlugin('brand', videojsBrand)
      }
      if (this.isPlayerSourceList(this.source) && !this.hasPlugin('videoJsResolutionSwitcher')) { // old multiple quality type
        videoJsResolutionSwitcher(videojs)
        this.options.plugins.videoJsResolutionSwitcher = {
          default: 'کیفیت بالا',
          dynamicLabel: true
        }
      }
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        this.setPlayerBrand()
        this.focusOnPlayer()
        this.redefineTap()
        // this.on('timeupdate', function () {
        //   if (that.keepCalculating) {
        //     that.calcWatchedPercentage(this.currentTime(), this.duration())
        //   }
        //   // document.querySelector('.video-js').focus()
        //   if (that.$refs.videoPlayer) {
        //     that.$refs.videoPlayer.focus()
        //   }

        //   if (!that.player.paused() && !that.player.userActive()) {
        //     that.videoStatus(false)
        //   } else if (!that.player.paused()) {
        //     that.videoStatus(true)
        //   }
        // })
      })

      if (typeof this.source === 'string' && this.source.includes('.m3u8')) { // hls type
        this.player.hlsQualitySelector()
      }

      this.player.on('seeked', () => {
        this.$emit('seeked', this.player.currentTime())
      })

      // const events = [
      //   'loadstart',
      //   'progress',
      //   'suspend',
      //   'abort',
      //   'error',
      //   'emptied',
      //   'stalled',
      //   'loadedmetadata',
      //   'loadeddata',
      //   'canplay',
      //   'canplaythrough',
      //   'playing',
      //   'waiting',
      //   'seeking',
      //   'seeked',
      //   'ended',
      //   'durationchange',
      //   'timeupdate',
      //   'play',
      //   'pause',
      //   'ratechange',
      //   'resize',
      //   'volumechange'
      // ]
      //
      // events.forEach(event => {
      //   this.player.on(event, () => {
      //     console.log('event: ', event)
      //     console.log('sources: ', this.player.sources)
      //   })
      // })
    },
    changeCurrentTime (time) {
      if (!this.player) {
        return
      }
      this.player.currentTime(time)
    },
    injectDomeElement (elementClass, refKey) {
      const div = document.createElement('div')
      div.classList = elementClass
      div.appendChild(this.$refs[refKey])
      this.$refs.videoPlayerWrapper.querySelector('.video-js').appendChild(div)
    },
    moveSideBarElementIntoVideoPlayerElements () {
      this.injectDomeElement('over-player-wrapper-div', 'overPlayer')
    },
    toggleSideBar () {
      this.localOverPlayer = !this.localOverPlayer
      // this.$emit('update:sideBar', this.localOverPlayer)
    },
    activate(time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources() {
      this.options.sources = this.isPlayerSourceList() ? this.source.list : this.source
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      this.player.reset()
      // this.player.dispose()
      this.setPoster()
      this.setSources()
      this.initPlayer()
      const source = this.isPlayerSourceList() ? this.source.list : this.source
      this.player.src(source)
      this.player.poster(this.poster)
    },
    isPlayerSourceList () {
      return (this.source && this.source.list && Array.isArray(this.source.list))
    },
    calcWatchedPercentage(currentTime, duration) {
      const watchedPercentage = ((currentTime / duration) * 100)
      const videoPlayerTimeData = {
        currentTime,
        duration,
        watchedPercentage
      }
      this.$emit('calcTimeData', videoPlayerTimeData)
    },
    videoStatus(val) {
      this.videoIsPlaying = val
    }
  }
}
</script>

<style lang="scss">
@import "video.js/dist/video-js.css";
.vPlayer {
  width: 100%;
  overflow: hidden;
  .over-player-wrapper-div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    .over-player-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      .over-player-slot {
        left: 2000px;
        height: 100%;
        color: initial;
        transition: 0.4s;
        direction: ltr;
        position: relative;
        z-index: 1;
        &.show {
          right: 0;
        }
        &.hide {
          width: 0 !important;
          right: 2500px;
        }
      }
    }
  }
  .toggleSideBarBtn {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
  }
  .video-js {
    background-color: transparent;
    .vjs-loading-spinner {
      right: 50%;
      margin: -25px -25px 0 0;
      text-align: right;
    }
    .vjs-big-play-button {
      color: white;
      width: 80px;
      height: 80px;
      border-radius: 100%;
      background: $primary;
      border-color: $primary;

      @media screen and(max-width: 600px) {
        margin-top: -60px;
      }
      .vjs-icon-placeholder:before {
        display: flex;
        font-size: 65px;
        align-items: center;
        justify-content: center;
      }
    }
    .vjs-control-bar {
      z-index: 2;
      .vjs-volume-panel {
        .vjs-volume-control {
          right: -3.5em;
          margin-right: -1px;
        }
      }
      .vjs-resolution-button {
        .vjs-menu-button {
          .vjs-icon-placeholder {
            &:before {
              content: "\f114";
              font-style: normal;
              font-weight: normal;
              font-family: VideoJS, Arial, serif;
            }
          }
        }
      }
    }
    .vjs-play-progress {
      &:before {
        /*rtl:ignore*/
        right: -0.5em;
        /*rtl:ignore*/
        left: auto;
      }
    }
  }
}
</style>
