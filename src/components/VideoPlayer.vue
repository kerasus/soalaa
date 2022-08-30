<template>
  <div class="flex justify-center full-width videoPlayer-container-radius">
    <video
      id="my-video"
      ref="videoPlayer"
      controls
      preload="auto"
      :height="calcTheHeight"
      :width="calcTheWidth"
      class="video-js vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause videoPlayer-container-radius"
    />
  </div>
</template>

<script>
import videojs from 'video.js'

import videojsBrand from 'videojs-brand'
import fa from 'video.js/dist/lang/fa.json'
import { PlayerSourceList } from 'src/models/PlayerSource'

require('video.js/dist/video-js.css')
require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')

export default {
  name: 'VideoPlayer',
  props: {
    sources: {
      type: PlayerSourceList,
      default: new PlayerSourceList()
    },
    poster: {
      type: String,
      default: ''
    },
    keepCalculating: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      videoOptions: {
        controlBar: {
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
            'fullscreenToggle'
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
        playbackRates: [0.25, 0.5, 1, 1.5, 2],
        nativeControlsForTouch: true,
        sources: [],
        poster: null
      },
      player: null
    }
  },
  created() {
    this.setOptions()
  },
  mounted() {
    this.initPlayer()
  },
  computed: {
    calcTheHeight() {
      return '100%'
    },
    calcTheWidth() {
      return '100%'
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    initPlayer() {
      videojs.registerPlugin('brand', videojsBrand)
      this.player = videojs(
        this.$refs.videoPlayer,
        this.videoOptions,
        this.onPlayerReady
      )
      this.player.brand({
        image: 'https://nodes.alaatv.com/upload/alaa-logo-small.png',
        title: 'alaatv',
        destination: 'https://alaatv.com',
        destinationTarget: '_blank'
      })
      this.player.src(this.sources.list)
    },
    onPlayerReady() {
      this.player.on('timeupdate', () => {
        const buffPerc = this.player.bufferedPercent()
        // console.log(this.player.getMedia())
        console.log(this.player.videoWidth())
        console.log(this.player.videoHeight())
        const progressPercentageByTime =
          this.player.currentTime() /
          (this.player.currentTime() + this.player.remainingTime())
        console.log('progressPercentageByTime', progressPercentageByTime)
        console.log('buffPerc', buffPerc)
      })
    },
    setOptions() {
      this.setSources()
      this.setPoster()
    },
    setSources() {
      this.videoOptions.sources = this.sources.list
    },
    setPoster() {
      this.videoOptions.poster = this.poster
    },
    reloadPlayerSources() {
      this.player.src(this.sources.list)
      this.player.poster(this.poster)
    },
    calcWatchedPercentage(currentTime, duration) {
      const watchedPercentage = (currentTime / duration) * 100
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
  },
  watch: {
    sources: function () {
      this.reloadPlayerSources()
    }
  }
}
</script>

<style lang="scss" scoped>
// ToDo: check this styles in scoped style tag
.videoPlayer-container-radius {
  border-radius: inherit;
}
.vjs-poster {
  border-radius: inherit;
}
#my-video_html5_api {
  border-radius: inherit;
}
#my-video .vjs-big-play-button {
  border: none;
  border-radius: inherit;
  width: 80px;
  height: 80px;
  line-height: 2em;
  top: 50%;
  margin-left: -1em;
  color: #fff;
  background-color: #ffb74d;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
    2px 4px 10px rgba(112, 108, 162, 0.05);
  font-size: 52px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  margin-top: -0.817em;
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: '\f4cd';
  left: -12px;
  top: -10px;
  font-size: 110px;
  font-family: iconsax;
  border: none !important;
  box-shadow: none !important;
}

.vjs-control-bar {
  .vjs-volume-panel {
    .vjs-volume-control {
      right: -45px !important;
    }
  }
}

.vjs-brand-container {
  .vjs-brand-container-link {
    img {
      height: 25px;
      padding-top: 3px;
    }
  }
}

.vjs-progress-control {
  .vjs-progress-holder {
    .vjs-play-progress::before {
      left: -8px;
      right: auto;
    }
  }
}
</style>
