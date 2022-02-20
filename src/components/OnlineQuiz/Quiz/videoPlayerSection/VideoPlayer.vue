<template>
  <div class="vPlayer" id="videoPlayer">
    <div id="videoPlayer-timeStamp" dir="rtl" style="font-family: 'serif', IRANSans;">
<!--      <v-navigation-drawer-->
<!--        right-->
<!--        v-model="drawer"-->
<!--        absolute-->
<!--        :height="calcTheHeight"-->
<!--        :width="calcTheWidth"-->
<!--        temporary-->
<!--        v-show="videoIsPlaying"-->
<!--        hide-overlay-->
<!--      >-->
<!--        <v-list-item>-->

<!--          <i class="fi-sr-bookmark"></i>-->
<!--          <v-list-item-title>زمانکوب ها</v-list-item-title>-->
<!--          &lt;!&ndash; <v-btn-->
<!--              icon-->
<!--              @click.stop="drawer = false"-->
<!--          >-->
<!--              <v-icon>mdi-chevron-right</v-icon>-->
<!--          </v-btn> &ndash;&gt;-->
<!--        </v-list-item>-->
<!--        <v-divider color="rgba(255, 255, 255, 0.6)"></v-divider>-->
<!--        <v-list-->
<!--          nav-->
<!--          dense-->
<!--        >-->
<!--          <v-list-item-group-->

<!--          >-->
<!--            <v-list-item-->
<!--              v-for="(timeStamp,index) in timePoints"-->
<!--              :key="index"-->
<!--              @click="activate(timeStamp.time)"-->
<!--            >-->
<!--              <v-list-item-title>{{ timeStamp.title }}</v-list-item-title>-->
<!--              <v-list-item-action>-->
<!--                <v-list-item-action-text>-->
<!--                  <v-menu bottom left>-->
<!--                    <template v-slot:activator="{ }">-->
<!--                      <v-btn-->
<!--                        class="video-box-icon-button"-->
<!--                        icon-->
<!--                        @click.stop="toggleFavorite(timeStamp.id , $event)"-->
<!--                        :loading="timeStamp.loading"-->
<!--                      >-->

<!--                        &lt;!&ndash;fi-sr-bookmark  &ndash;&gt;-->
<!--                        <span-->
<!--                          class='bookmark-button'-->
<!--                          :class="{ 'is-favorite': timeStamp.isFavored , 'is-not-favorite': !timeStamp.isFavored }"-->
<!--                        ></span>-->
<!--                      </v-btn>-->
<!--                    </template>-->
<!--                  </v-menu>-->
<!--                </v-list-item-action-text>-->
<!--              </v-list-item-action>-->
<!--            </v-list-item>-->
<!--          </v-list-item-group>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->
      <!-- timestamp[0] -->
      <transition name="fade">
<!--        <v-btn-->
<!--          v-show="videoIsPlaying"-->
<!--          color="rgba(0, 0, 0, 0.6)"-->
<!--          class="white&#45;&#45;text vPlayer-drawer-btn"-->
<!--          @click.stop="drawer = true"-->
<!--        >-->
<!--          <span class='vPlayer-timestamp-icon'></span>-->
<!--        </v-btn>-->
      </transition>
    </div>
    <video ref="videoPlayer" id="my-video" dir="ltr"
           class="video-js vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause">

    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import fa from 'video.js/dist/lang/fa.json'

require('video.js/dist/video-js.css')
require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')
// import hotkeys from 'videojs-hotkeys'
import { AlaaContent } from 'src/models/AlaaContent.js'
// import ContentMixin from '../Mixin/ContentMixin'

export default {
  name: 'VideoPlayer',
  // mixins: [ContentMixin],
  props: {
    source: {
      type: Array,
      default () {
        return []
      }
    },
    timePoints: {
      type: Array,
      default () {
        return []
      }
    },
    poster: {
      type: String,
      default () {
        return ''
      }
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
    }
  },
  data () {
    return {
      drawer: false,
      favLoading: false,
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
      videoIsPlaying: false,
      currentContent: new AlaaContent(),
      postIsFavored: {}
    }
  },
  created () {
    this.setSources()
    this.setPoster()
  },
  mounted () {
    const that = this
    this.player = videojs(
      this.$refs.videoPlayer, this.options, function onPlayerReady () {
        this.on('timeupdate', function () {
          if (that.keepCalculating) {
            that.calcWatchedPercentage(this.currentTime(), this.duration())
          }
          document.querySelector('.video-js').focus()

          if (!that.player.paused() && !that.player.userActive()) {
            that.videoStatus(false)
          } else if (!that.player.paused()) {
            that.videoStatus(true)
          }
        })
      })
    const timeStamp = document.getElementById('videoPlayer-timeStamp')
    this.player.el().appendChild(timeStamp)
    // this.player.on('timeupdate', function () {
    //     if(that.player.isFullscreen()){
    //                 // var timeStamp = document.getElementById('videoPlayer').requestFullscreen();
    //                 // if(!timeStamp)
    //                 // if (!document.fullscreenElement) {
    //                 //     timeStamp.requestFullscreen().catch(err => {
    //                 //         alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    //                 //     });
    //                 //     }
    //                 //      else {
    //                 //     document.exitFullscreen();
    //                 // }

    //     }
    //     console.log('player.isFullscreen()' , that.player.isFullscreen());
    // })
  },
  computed: {
    calcTheHeight () {
      return '100%'
    },
    calcTheWidth () {
      return '100%'
    }
  },
  beforeUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    activate (time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources () {
      this.options.sources = this.source
    },
    setPoster () {
      this.options.poster = this.poster
    },
    reInitVideo () {
      this.player.src(this.source)
      this.player.poster(this.poster)
    },
    toggleFavorite (id) {
      const that = this
      let count = -1
      let currentTimepointIndex = null
      this.timePoints.forEach(function (item, index) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          currentTimepointIndex = index
          item.loading = true
          item.isFavored = !item.isFavored
          that.postIsFavored = {
            id: item.id,
            isFavored: item.isFavored,
            numberOfTimestamp: count
          }
        }
      })
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
      this.$emit('toggleBookmark', this.postIsFavored)
      console.log('currentTimepointIndex', currentTimepointIndex)
      // setTimeout(function () {
      //   that.timePoints[currentTimepointIndex].loading = false
      // }, 200)
    },
    // postIsFavored(timeStampData){
    //     var postStatus = 'unfavored'
    //     if (timeStampData.isFavored){
    //         postStatus = 'favored'
    //     }
    //     // /api/v2/timepoint/{timepoint_id}/favored
    //     axios.post('/api/v2/c/timepoint/' + parseInt(timeStampData.id) + '/'+ postStatus)
    //         .then(response => {
    //             if (response.status === 200){
    //                 this.timePoints.forEach( function (item) {
    //                     if (parseInt(item.id) === parseInt(timeStampData.id)) {
    //                         item.loading = false
    //                     }
    //                 })
    //             }
    //         })
    //         .catch(err => console.error(err));
    // },
    calcWatchedPercentage (currentTime, duration) {
      const watchedPercentage = ((currentTime / duration) * 100)
      const videoPlayerTimeData = {
        currentTime: currentTime,
        duration: duration,
        watchedPercentage: watchedPercentage
      }
      this.$emit('calcTimeData', videoPlayerTimeData)
    },
    videoStatus (val) {
      this.videoIsPlaying = val
    }
  },
  watch: {
    source: function () {
      this.reInitVideo()
    }
  }
}
</script>

<style scoped lang="scss">
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-active {
  transition: opacity 0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.v-application--is-rtl .v-list-item__action:first-child, .v-application--is-rtl .v-list-item__icon:first-child {
  margin-left: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.v-application--is-ltr .v-list-item__avatar:first-child, .v-application--is-rtl .v-list-item__action:last-of-type:not(:only-child), .v-application--is-rtl .v-list-item__avatar:last-of-type:not(:only-child), .v-application--is-rtl .v-list-item__icon:last-of-type:not(:only-child) {
  margin-top: 0;
  margin-bottom: 0;
}

.vPlayer .v-divider {
  width: 268px;
  margin-right: 14px;
}

.vPlayer .v-sheet.v-list:not(.v-sheet--outlined) {
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 0;
  padding-bottom: 0;
}

.vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  height: 42px;
}

@media screen and (max-width: 1903px) {
  .vPlayer .v-divider {
    width: 268px;
    margin-right: 13px;
  }
}

@media screen and (max-width: 1263px) {
  .vPlayer .v-divider {
    width: 189px;
  }
}

@media screen and (max-width: 960px) {
  .vPlayer .v-divider {
    width: 188px;
  }
}

@media screen and (max-width: 768px) {
  .vPlayer .v-divider {
    width: 190px;
  }
  .vPlayer .v-sheet.v-list:not(.v-sheet--outlined) {
    padding-right: 0;
  }
}

@media screen and (max-width: 599px) {
  .vPlayer .v-divider {
    width: 155px;
    margin-right: 6px;
  }
}
</style>

// ---------------------------------------------------- all video js styles --------------------------------------
<style lang="scss"> // all of the skin

/*----------- TIMESTAMP (NO MEDIA) -----------*/

.vPlayer-timestamp-icon {
  background: url('https://i.ibb.co/Ss3KVVw/Asset-25.png');
  height: 21px;
  width: 23px;
  display: block;
  /* Other styles here */
}

.vPlayer-drawer-btn {
  position: absolute !important;
  right: 0 !important;
  z-index: 4 !important;
  bottom: 23px;
  margin-right: 13px;
}

.vPlayer .v-btn:not(.v-btn--round).v-size--default {
  height: 44px;
  min-width: 44px;
  padding: 0;
  border-radius: 15px;
  margin-right: 0;
  position: absolute !important;
  bottom: 4%;
  right: 1.8% !important;
}

.video-js .vjs-current-time {
  display: block;
}

.icon-btn-box .video-box-icon .favorite-bookmark {
  color: #ff8f00;
}

.vPlayer .is-favorite {
  background: url('https://i.ibb.co/rp94pkm/b2-600-1920.png');
  // color: #ff8f00;
}

.vPlayer .is-not-favorite {
  background: url('https://i.ibb.co/Z8dS0dC/bfull-600-1920.png');
  // color: #fff;
  // opacity: 0.6;
}

.vPlayer .video-box-icon-button {
  padding-left: 6px;
  padding-top: 4px;
}

.vPlayer .bookmark-button {
  padding-top: 7px;
  padding-left: 3px;
  // font-size: 20px;
  height: 20px;
  width: 20px;
  background-repeat: no-repeat !important;
}

.vPlayer-drawer-btn {
  position: absolute !important;
  right: 0 !important;
  z-index: 4 !important;
}

.vPlayer .theme--light.v-navigation-drawer {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 4;
  height: 518px !important;
  top: calc(100% - 612px) !important;
  right: 24px;
  width: 300px !important;
  border-radius: 14px;
}

.vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  // padding-right: 12px;
}

.vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
  font-weight: 500;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 8px;
}

.vPlayer .v-list--nav .v-list-item, .v-list--nav .v-list-item::before {
  padding-bottom: 0;
  padding-right: 0;
}

.vPlayer .v-list--nav.v-list--dense .v-list-item:not(:last-child):not(:only-child), .v-list--nav .v-list-item--dense:not(:last-child):not(:only-child), .v-list--rounded.v-list--dense .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item--dense:not(:last-child):not(:only-child) {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-right: 0;
  height: 42px;
}

.theme--light.v-navigation-drawer .v-divider {
  border-color: rgba(255, 255, 255, 0.6);
}

/*------------------------------- THE SKIN ----------------------------------*/

/*----------- CUSTOME ICONS -----------*/

.video-js .vjs-control {
  width: 6.5em;
}

.vjs-quality-selector {
  .vjs-menu-button {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .vjs-icon-placeholder {
    &::before {
      content: '';
      background-image: url('https://i.ibb.co/PYftzKz/setting.png');
      background-repeat: no-repeat;
      background-size: 14px;
      background-position: 55% calc(50% - 2px);
      border: none !important;
      box-shadow: none !important;
    }
  }
}

.vjs-icon-play:before, .video-js .vjs-play-control .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/z48vSyS/play.png');
  background-repeat: no-repeat;
  background-size: 14px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-pause:before, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/ZBXrgRF/pause.png');
  background-repeat: no-repeat;
  background-size: 14px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;

}

.vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/n6rXsFx/mute.png');
  background-repeat: no-repeat;
  background-size: 17px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-volume-low:before, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before {
  content: "";
}

.vjs-icon-volume-mid:before, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before {
  content: "";
}

.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/f8PzV93/volume.png');
  background-repeat: no-repeat;
  background-size: 17px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/hZ0x7Fg/full.png');
  background-repeat: no-repeat;
  background-size: 17px;
  background-position: 55% calc(50% - 2px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/BrvGPCD/full-exit.png');
  background-repeat: no-repeat;
  background-size: 17px;
  background-position: 55% calc(50% - 2px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-picture-in-picture-enter:before, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/vdSFsHV/pip.png');
  background-repeat: no-repeat;
  background-size: 22px;
  background-position: 51% calc(50% - 2px);
  border: none !important;
  box-shadow: none !important;
}

.vjs-icon-picture-in-picture-exit:before, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "";
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: "";
  background-image: url('https://i.ibb.co/ykDmMK2/play-600-1920.png');
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;
}

#my-video .vjs-big-play-button {
  border: none;
  width: 80px;
  height: 80px;
  line-height: 2em;
  top: 48%;
  margin-left: -1em;
  color: #fff;
  // opacity: 0.6;
  background-color: #ff8f00;
  font-size: 52px;
  border-radius: 100px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  margin-top: -0.817em;
}

// #my-video:hover .vjs-big-play-button {
//     opacity: 0.8;
// }

/*#my-video .vjs-big-play-button:hover {*/
/*  background-color: #ff8f00;*/
/*  color: #fff;*/
/*}*/

/*----------- CONTROL BAR -----------*/

#my-video .vjs-control-bar {
  color: #ccc;
  width: 92%;
  height: 44px;
  left: 1%;
  bottom: 4%;
  font-size: 1.3em;
  //opacity: 0.6; /////////////////******************************its overwriting the opacity of video js
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.6);
}

//.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
//  visibility: visible;
//  opacity: 0 !important;
//  transition: visibility 1s, opacity 1s;
//}
//.vjs-default-skin.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
//  display: block;
//  visibility: hidden;
//  opacity: 0;
//  //
//  //@trans: visibility 1.0s, opacity 1.0s;
//  //.transition(@trans);
//}
#my-video .vjs-progress-control .vjs-progress-holder {
  margin: 0 10px;
  margin-right: 61px;
  height: 24px;
  border-radius: 7px;
}

#my-video .vjs-progress-holder .vjs-play-progress, .video-js .vjs-progress-holder, .video-js .vjs-progress-holder .vjs-load-progress div {
  border-radius: 7px;
}

#my-video .vjs-play-progress::before {
  font-size: 0.9em;
  z-index: 1;
  display: none;
}

#my-video .vjs-play-progress, #my-video .vjs-volume-level {
  background: #ffffff;
}

#my-video .vjs-load-progress {
  background-color: #ffffff;
  opacity: 0.2;
  border-radius: 7px;
}

#my-video .video-js .vjs-progress-holder .vjs-play-progress, .video-js .vjs-progress-holder .vjs-load-progress, .video-js .vjs-progress-holder .vjs-load-progress div {
  background-color: #ffffff;
  opacity: 0.2;
}

#my-video .vjs-menu-content {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 0;
}

#my-video .vjs-playback-rate .vjs-menu li {
  text-align: left;
  font-size: 12px;
  padding: 3px 0 3px 11px;
}

#my-video .vjs-quality-selector .vjs-menu li {
  text-align: left;
  font-size: 12px;
  padding: 3px 0 3px 15px;
}

#my-video .vjs-selected {
  background-color: #fff;
  color: #000000;
}

#my-video .vjs-playback-rate .vjs-menu-content {
  padding: 3px 0 !important;
  width: 53px;
}

.vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  bottom: 1.9em;
}

.video-js .vjs-time-control {
  font-size: 12px;
  font-weight: bold;
  line-height: 3.75em;
}

#my-video .vjs-playback-rate .vjs-playback-rate-value {
  line-height: 3.1;
  font-size: 14px;
  font-weight: bold;
}

#my-video .vjs-menu-button-popup .vjs-menu {
  width: 80px;
  left: 0;
  height: 0;
  bottom: 1px;
}

#my-video .vjs-quality-selector .vjs-menu {
  width: 80px;
  left: 0;
  height: 0;
  bottom: 4px;
}

/*!*----------- Volume Vertical ------------*!*/

#my-video .vjs-volume-vertical {
  //background: #262626;
  font-size: 1.1em;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  position: relative;
  left: -30px;
  bottom: 103px;
  width: 32px;
  height: 100px;
}

#my-video .vjs-slider {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

#my-video .vjs-volume-bar.vjs-slider-vertical {
  width: 32px;
  height: 32px;
  margin: 1.35em auto;
  background-color: rgba(0, 0, 0, 0.1);
}

#my-video .vjs-slider-vertical .vjs-volume-level {
  //width: 0.3em;
  width: 32px;
  border-radius: 10px;
}

#my-video .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  width: 32px;
  height: 100px;
}

#my-video .vjs-volume-bar.vjs-slider-vertical {
  width: 32px;
  height: 100px;
  margin-top: 0;
}

#my-video .vjs-volume-vertical:hover .vjs-volume-tooltip {
  left: 35px;
}

#my-video .vjs-volume-level::before {
  display: none;
}

#my-video .vjs-current-time {
  position: relative;
  width: 40px;
  padding: 0;
  z-index: 1;
  color: #fff;
  display: block;
  right: -8px;
}

#my-video .vjs-remaining-time {
  position: relative;
  color: #fff;
  width: 46px;
  padding: 0;
  padding-right: 10px;
  right: 50px;
}

#my-video .vjs-button:hover {
  color: #ffffff;
  opacity: 1;
}

#my-video .vjs-control:focus:before,
#my-video .vjs-control:hover:before,
#my-video .vjs-control:focus {
  text-shadow: none;
}

.video-js .vjs-volume-panel.vjs-volume-panel-vertical {
  width: 30px;
  padding-top: 2px;
  position: relative;
  top: -1px;
  right: 50px;
}

.vjs-quality-selector.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
  padding-top: 2px;
  position: absolute;
  top: 2px;
  right: 81px;
  width: 25px;
}

.video-js .vjs-picture-in-picture-control {
  cursor: pointer;
  flex: none;
  position: relative;
  top: 2px;
  right: 4px;
  width: 35px;

}

.video-js .vjs-fullscreen-control {
  padding-left: 0;
  padding-top: 2px;
  position: relative;
  top: 2px;
  // right: -13px;
  right: 11px;
  width: 25px !important;
}

.vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
  width: 30px;
  position: relative;
  right: -5px;
}

.vjs-play-control.vjs-control.vjs-button.vjs-paused {
  width: 35px;
  position: relative;
  top: 0;
  left: 3px;
}

.vjs-play-control.vjs-control.vjs-button.vjs-playing {
  width: 35px;
  position: relative;
  top: 0;
  left: 3px;
}

.video-js .vjs-progress-control {
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 8em;
  touch-action: none;
  width: 620px;
  flex: auto;
}

.video-js .vjs-mute-control {
  width: 30px !important;
}

@media screen and (max-width: 1903px) {
  .vPlayer .theme--light.v-navigation-drawer {
    right: 10px;
  }
  #my-video .vjs-control-bar {
    bottom: 3%;
  }

  .vPlayer .theme--light.v-navigation-drawer .v-divider {
    border-color: rgba(255, 255, 255, 0.6);
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-right: 6px;
  }
  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    font-size: 16px;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    font-size: 16px;
  }
  #my-video .vjs-big-play-button {
    width: 80px;
    height: 80px;
    margin-left: -0.6em;
  }
  .vPlayer .v-divider {
    width: 190px;
    margin-right: 14px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    bottom: 3%;
  }
}

@media screen and (max-width: 1810px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.7em;
  }
}

@media screen and (max-width: 1715px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.7em;
  }
}

@media screen and (max-width: 1500px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.5em;
  }
}

@media screen and (max-width: 1550px) {
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    right: 0.8% !important;
  }
}

@media screen and (max-width: 1263px) {
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    font-size: 14px;
  }
  .vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    height: 28px;
  }
  .vPlayer .v-btn--fab.v-size--default {
    height: 45px;
    width: 45px;
  }
  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    font-size: 14px;
    padding-right: 12px;
  }
  .vPlayer .theme--light.v-list-item[data-v-248d5eda]:not(.v-list-item--active):not(.v-list-item--disabled) {
    height: 29px;
  }
  .vPlayer .v-list-item {
    min-height: 36px;
  }
  .vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    height: 40px;
    min-height: 32px;
    padding-right: 0;
  }
  // .vPlayer .v-divider {
  //     width: 153px !important;
  //     margin-right: 12px !important;
  // }
  .vPlayer .v-list--nav .v-list-item:not(:last-child):not(:only-child), .vPlayer .v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .vPlayer .v-list--dense .v-list-item, .vPlayer .v-list-item--dense {
    min-height: 35px;
  }
  .video-box-icon-button {
    justify-content: flex-end;
  }
  .vPlayer .bookmark-button {
    padding-left: 9px;
    font-size: 18px;
  }
  #my-video .vjs-control-bar {
    height: 40px;
    width: 88%;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    height: 40px;
    min-width: 40px;
    right: 2.6% !important;
  }
  // .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  //     width: 180px !important;
  //     height: 218px !important;
  // }
  // .vPlayer .theme--light.v-navigation-drawer {
  //     top: calc(100% - 274px) !important;
  // }

  .vPlayer .theme--light.v-list-item[data-v-779f4d98]:not(.v-list-item--active):not(.v-list-item--disabled) {
    height: 35px;
  }
  #my-video .vjs-remaining-time {
    top: -2px;
    right: 25px;
  }
  #my-video .vjs-current-time {
    top: -2px;
  }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    top: -2px;
  }
  .video-js .vjs-fullscreen-control {
    width: 35px;
    right: 4px;
  }
  .vjs-quality-selector.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    width: 35px;
    right: 64px;
  }
  .video-js .vjs-volume-panel.vjs-volume-panel-vertical {
    right: 28px;
    width: 35px;
  }
  #my-video .vjs-quality-selector .vjs-menu {
    left: 0.7em;
    bottom: 0;
  }
  #my-video .vjs-menu-button-popup .vjs-menu {
    bottom: -5px;
  }
  .vPlayer .v-divider[data-v-454d47e5] {
    width: 149px;
  }
  #my-video .vjs-big-play-button {
    margin-left: -0.5em;
  }
  #my-video .vjs-progress-control .vjs-progress-holder {
    margin-right: 35px;
  }
  .vPlayer .video-box-icon-button {
    padding-left: 11px;
  }
}

@media only screen and (max-width: 959px) {
  //.vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  //    width: 256px !important;
  //}
  .vPlayer .theme--light.v-navigation-drawer {
    right: 10px;
  }
  #my-video .vjs-control-bar {
    bottom: 3%;
  }
  //   .vPlayer .v-divider[data-v-23ae32da] {
  //     width: 188px !important;
  //     margin-right: 16px !important;
  // }
  .vPlayer .theme--light.v-navigation-drawer .v-divider {
    border-color: rgba(255, 255, 255, 0.6);
  }
  // .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle,.vPlayer .v-list--dense .v-list-item .v-list-item__title,.vPlayer .v-list-item--dense .v-list-item__subtitle,.vPlayer .v-list-item--dense .v-list-item__title{
  //     padding-right: 16px;
  // }

  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    font-size: 16px;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    font-size: 16px;
  }
  // .vPlayer .v-divider{
  //   width: 192px !important;
  //   margin-right: 15px !important;
  // }
  #my-video .vjs-control-bar {
    width: 90%;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    font-size: 14px;
  }
  .vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    height: 34px;
  }
  .vPlayer .v-divider[data-v-454d47e5] {
    width: 188px;
  }
}

@media screen and (max-width: 768px) {
  .vPlayer .v-list--nav .v-list-item:not(:last-child):not(:only-child), .vPlayer .v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    right: 2.6% !important;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-right: 5px;
  }
  .vPlayer .v-item-group {
    padding-right: 12px;
  }
  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    padding-right: 12px;
  }
  .vPlayer .v-divider {
    width: 150px;
  }
}

// -------1264 ------------
@media screen and (max-width: 708px) {
  #my-video .vjs-playback-rate .vjs-playback-rate-value {
    line-height: 2.75;
    font-size: 14px;
  }
  .vjs-quality-selector.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    //padding-right: 10px;
    position: relative;
    right: 34px;
  }
  .video-js .vjs-picture-in-picture-control {
    width: 10px !important;
    position: relative;
    right: 3px;
    padding-right: 44px;
  }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    position: relative;
    top: 0.75px;
    right: -6px;
  }
  .vjs-play-control.vjs-control.vjs-button.vjs-paused {
    left: 7px;
  }
  #my-video .vjs-current-time {
    position: absolute;
    right: -4px;
    color: #000;
    left: 80px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    margin-right: 3px;
    position: absolute !important;
    bottom: 3%;
    right: 1.8% !important;
  }
  .video-js .vjs-volume-panel.vjs-volume-panel-vertical {

    right: 28px;

  }
  .video-js .vjs-fullscreen-control {
    position: absolute;
    right: 49px;
    width: 25px;
  }
  #my-video .vjs-quality-selector .vjs-menu {
    left: 0;
  }
  #my-video .vjs-remaining-time {
    position: absolute;
    color: #000;
    right: 150px;
  }
  #my-video .vjs-control-bar {
    width: 88%;
  }
}

@media screen and (max-width: 599px) {
  #my-video .vjs-control-bar {
    width: 85% !important;
    height: 32px;
    border-radius: 7px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    height: 33px;
    min-width: 33px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    border-radius: 7px;
  }
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    right: 2.6% !important;
  }
  #my-video .vjs-remaining-time {
    top: -6px;
  }
  #my-video .vjs-current-time {
    top: -6px;
  }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    top: -3px;
  }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    right: -4px;
  }
  #my-video .vjs-menu-content {
    border-radius: 5px;
    width: 60px;
  }
  .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
    bottom: 2.1em;
  }
  #my-video .vjs-volume-vertical {
    border-radius: 5px;
    width: 26px;
  }
  #my-video .vjs-slider-vertical .vjs-volume-level {
    width: 26px;
    border-radius: 5px;
  }
  #my-video .vjs-slider {
    border-radius: 5px;
  }
  #my-video .vjs-quality-selector .vjs-menu {
    left: .2em;
  }
  #my-video .vjs-menu-button-popup .vjs-menu {
    bottom: -12px;
  }
  .vjs-playback-rate .vjs-menu {
    margin-bottom: 1.1em;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    border-radius: 7px;
  }
  .vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    min-height: 30px;
    height: 30px !important;
  }

  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-right: 7px;
  }
  .vPlayer .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    padding-right: 0;
  }
  #my-video .vjs-menu-content {
    padding: 5px 0;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-right: 0;
  }
  .vPlayer .v-item-group {
    padding-right: 7px;
  }
  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    padding-right: 7px;
  }
  .vPlayer .v-divider[data-v-454d47e5] {
    width: 101px;
    margin-right: 6px;
  }
  #my-video .vjs-big-play-button {
    margin-left: -0.6em;
  }
  #my-video .vjs-volume-vertical {
    left: -27px;
  }
  .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    content: "";
    background-image: url('https://i.ibb.co/YB8GwMq/play-0-600.png');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: 55% calc(50% - 0px);
    border: none !important;
    box-shadow: none !important;
  }
}

@media screen and (max-width: 576px) {
  // .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  //     width: 150px !important;
  // }
  .vPlayer .v-btn--fab.v-size--default {
    height: 35px;
    width: 35px;
  }
  .vPlayer .v-list-item .v-list-item__subtitle, .vPlayer .v-list-item .v-list-item__title {
    font-size: 12px;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    font-size: 12px;
  }
  .vPlayer .v-list--dense .v-list-item .v-list-item__subtitle, .vPlayer .v-list--dense .v-list-item .v-list-item__title, .vPlayer .v-list-item--dense .v-list-item__subtitle, .vPlayer .v-list-item--dense .v-list-item__title {
    padding-top: 0;
    padding-bottom: 0;
  }
  .vPlayer .v-list--dense .v-list-item, .vPlayer .v-list-item--dense {
    min-height: 30px;
  }
  .vPlayer .bookmark-button {
    padding-left: 10px;
    padding-bottom: 4px;
    font-size: 15px;
  }

}

@media screen and (max-width: 480px) {
  .vPlayer .v-btn:not(.v-btn--round).v-size--default {
    right: 1.6% !important;
  }
  // #my-video .vjs-remaining-time{
  //     right: 118px;
  // }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    right: -4px;
  }
}

@media screen and (max-width: 399px) {
  #my-video .vjs-progress-control .vjs-progress-holder {
    margin-right: 6px;
  }
  .video-js .vjs-picture-in-picture-control {
    right: -5px;
  }
  .video-js .vjs-fullscreen-control {
    right: 35px;
  }
  .video-js .vjs-volume-panel.vjs-volume-panel-vertical {
    right: 3px;
  }
  .vjs-quality-selector.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    right: 15px;
  }
  #my-video .vjs-remaining-time {
    right: 118px;
  }
}

@media screen and (max-width: 356px) {
  #my-video .vjs-remaining-time {
    right: 107px;
  }
  #my-video .vjs-current-time {
    left: 73px;
  }
  .video-js .vjs-fullscreen-control {
    right: 35px;
  }
  .video-js .vjs-picture-in-picture-control {
    right: 9px;
  }
  .vjs-quality-selector.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    right: 23px;
  }
  .video-js .vjs-volume-panel.vjs-volume-panel-vertical {
    right: 7px;
  }
  .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button {
    top: -3px;
  }
}

// -------960------------
@media screen and (max-width: 533px) {
  // .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button{
  //     top: 0;

  // }
  // #my-video .vjs-current-time{
  //     top: -1px;
  // }
  // #my-video .vjs-remaining-time{
  //     top: -1px;
  // }
  // #my-video .vjs-menu-button-popup .vjs-menu{
  //     bottom: -2px;
  // }
}

// ------- TIMESTAMP FULL WITH -------------
// @media only screen and (max-width: 959px){}
@media screen and (min-width: 2060px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 554px !important;
    top: calc(100% - 638px) !important;
  }
}

@media screen and (max-width: 1903px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 545px !important;
    top: calc(100% - 619px) !important;
  }
}

@media screen and (max-width: 1820px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 535px !important;
    top: calc(100% - 611px) !important;
  }
}

@media screen and (max-width: 1805px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 523px !important;
    top: calc(100% - 599px) !important;
  }
}

@media screen and (max-width: 1760px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 485px !important;
    top: calc(100% - 559px) !important;
  }
}

@media screen and (max-width: 1672px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 453px !important;
    top: calc(100% - 524px) !important;
  }
}

@media screen and (max-width: 1572px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 425px !important;
    top: calc(100% - 494px) !important;
  }
}

@media screen and (max-width: 1572px) {
  .vPlayer .theme--light.v-navigation-drawer {
    width: 228px !important;
  }
  .vPlayer .v-divider[data-v-64b5a1c0] {
    width: 198px;
  }
}

@media screen and (max-width: 1488px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 408px !important;
    top: calc(100% - 473px) !important;
  }
}

@media screen and (max-width: 1432px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 382px !important;
    top: calc(100% - 452px) !important;
  }
}

@media screen and (max-width: 1400px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 350px !important;
    top: calc(100% - 423px) !important;
  }
}

@media screen and (max-width: 1290px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 323px !important;
    top: calc(100% - 395px) !important;
  }
}

@media screen and (max-width: 1263px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 314px !important;
    top: calc(100% - 376px) !important;
    width: 220px !important;
  }
  .vPlayer .v-divider[data-v-64b5a1c0] {
    width: 189px;
  }
}

@media screen and (max-width: 1244px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.7em;
  }
}

@media screen and (max-width: 1162px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 300px !important;
    top: calc(100% - 357px) !important;
  }
}

@media screen and (max-width: 1100px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 270px !important;
    top: calc(100% - 329px) !important;
  }
}

@media screen and (max-width: 1034px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 256px !important;
    top: calc(100% - 314px) !important;
  }
}

@media only screen and (max-width: 975px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.6em;
  }
}

@media only screen and (max-width: 959px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 458px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    width: 220px !important;
    height: 394px !important;
  }
}

@media only screen and (max-width: 910px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 429px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 364px !important;
  }
}

@media only screen and (max-width: 860px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 402px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 339px !important;
  }
}

@media only screen and (max-width: 810px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 377px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 315px !important;
  }
}

@media only screen and (max-width: 710px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 358px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 299px !important;
  }
}

@media only screen and (max-width: 680px) {
  .vPlayer .theme--light.v-navigation-drawer {
    width: 176px !important;
  }
  .vPlayer .v-divider[data-v-64b5a1c0] {
    width: 149px;
  }
}

@media only screen and (max-width: 678px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 337px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 278px !important;
  }
}

@media only screen and (max-width: 648px) {
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 316px) !important;
  }
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    height: 260px !important;
  }
}

// @media only screen and (max-width: 678px){
//     .vPlayer .theme--light.v-navigation-drawer{
//         top: calc(100% - 314px) !important;
//     }
//     .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
//         height: 255px !important;
//     }
// }
@media screen and (max-width: 599px) {
  // .vPlayer .theme--light.v-navigation-drawer{
  //     height: 314px !important;
  //     top: calc(100% - 374px) !important;
  //     width: 220px !important;
  // }
  // .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  //     width: 220px !important;
  //     height: 518px !important;
  // }
  .vPlayer .theme--light.v-navigation-drawer {
    height: 250px !important;
    top: calc(100% - 299px) !important;
  }
  .vPlayer .is-favorite {
    background: url('https://i.ibb.co/HpqxfJQ/bfull2-0-600.png');
    // color: #ff8f00;
  }
  .vPlayer .is-not-favorite {
    background: url('https://i.ibb.co/X2ghttP/b-0-600.png');
    // color: #fff;
    // opacity: 0.6;
  }
  .video-box-icon-button {
    padding-left: 12px;
    padding-top: 6px;
  }
  #my-video .vjs-big-play-button {
    width: 50px;
    height: 50px;
    top: 56%;
    margin-left: -0.4em;
  }
}

@media screen and (max-width: 570px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 222px !important;
    width: 140px !important;
    top: calc(100% - 274px) !important;
  }
  .vPlayer .v-divider[data-v-64b5a1c0] {
    width: 120px !important;
  }
}

@media screen and (max-width: 514px) {
  #my-video .vjs-big-play-button {
    margin-left: -0.4em;
  }
}

@media screen and (max-width: 530px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 201px !important;
    top: calc(100% - 250px) !important;
  }
}

@media screen and (max-width: 490px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 176px !important;
    top: calc(100% - 225px) !important;
  }
}

@media screen and (max-width: 440px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 158px !important;
    width: 140px !important;
    top: calc(100% - 205px) !important;
  }
  .vPlayer .v-divider {
    width: 102px !important;
  }
}

@media screen and (max-width: 403px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 158px !important;
    top: calc(100% - 203px) !important;
  }
}

@media screen and (max-width: 599px) {
  .vPlayer .v-divider {
    width: 155px !important;
    margin-right: 6px;
  }
}

@media screen and (max-width: 393px) {
  .vPlayer .theme--light.v-navigation-drawer {
    height: 148px !important;
    top: calc(100% - 191px) !important;
  }
}

@media screen and (max-width: 380px) {
  .vPlayer .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .vPlayer .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
    width: 120px !important;
    height: 129px !important;
  }
  .vPlayer .theme--light.v-navigation-drawer {
    top: calc(100% - 174px) !important;
  }
  .vPlayer .v-divider[data-v-64b5a1c0] {
    width: 100px !important;
  }
}
</style>
// ----------------------------------------------------------------------------------------------------------------
