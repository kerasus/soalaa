<template>
  <div ref="videoPlayerWrapper"
       style="width: 100%;"
       class="vPlayer">
    <video-player v-if="content.photo && content.isVideo() && content.hasVideoSource()"
                  ref="videoPlayer"
                  :key="playerKey"
                  :source="content.getVideoSource()"
                  :poster="content.photo"
                  :over-player="hasTimepoint"
                  :over-player-width="'250px'"
                  :use-over-player="hasTimepoint">
      <template #overPlayer>
        <div class="timepoint-list">
          <q-banner class="timepoint-list-title">
            زمان کوب ها
          </q-banner>
          <q-list class="timepoint-list-items">
            <q-item v-for="(timepoint) in currentContent.timepoints.list"
                    :key="timepoint.id"
                    v-ripple
                    clickable
                    @click="goToTimpoint(timepoint)">
              <q-item-section avatar>
                <!--                <bookmark color="white"-->
                <!--                          size="30"-->
                <!--                          :is-favored="timepoint.is_favored"-->
                <!--                          :loading="timepoint.loading"-->
                <!--                          @clicked="handleTimepointBookmark(timepoint.id)" />-->
              </q-item-section>
              <q-item-section class="text-section">
                <span>{{ timepoint.title }}</span>
                <span v-if="currentContent.can_user_use_timepoint">
                  {{ timepoint.formattedTime() }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
    </video-player>
    <div v-else>
      <q-card class="flex justify-center items-center">
        <q-img v-if="content.photo"
               :src="content.photo" />
        <div v-else
             class="flex justify-center items-center"
             style="height: 420px; justify-content: center">
          ویدیویی وجود ندارد!
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'
// import Bookmark from 'src/components/Bookmark.vue'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'ContentVideoPlayer',
  components: {
    VideoPlayer
    // Bookmark
  },
  props: {
    content: {
      type: Content
    },
    showTimePoints: {
      type: Boolean,
      default: true
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
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked'],
  data() {
    return {
      playerKey: Date.now(),
      currentContent: new Content()
    }
  },
  computed: {
    hasTimepoint () {
      return this.content.timepoints.list.length > 0
    }
  },
  watch: {
    content: {
      handler (newVal) {
        this.playerKey = Date.now()
        this.currentContent = newVal
        if (!this.currentContent.can_user_use_timepoint) {
          this.currentContent.timepoints.removeAllTimes()
        }
      },
      deep: true
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    getCurrentContentTimepoint (timepointId) {
      return this.currentContent.timepoints.list.find(item => item.id === timepointId)
    },
    handleTimepointBookmark (timepointId) {
      const timepointIndex = this.currentContent.timepoints.list.findIndex(item => item.id === timepointId)
      const currentContentTimepoint = this.getCurrentContentTimepoint(timepointId)
      this.currentContent.timepoints.list[timepointIndex].loading = true
      const isFavoredStatus = currentContentTimepoint.is_favored ? 'unfavored' : 'favored'
      this.changeTimepointStatus({
        timepointId,
        isFavoredStatus,
        timepointIndex,
        currentContentTimepoint
      })
    },
    changeTimepointStatus (data) {
      this.$apiGateway.content.setBookmarkTimepointFavoredStatus({
        id: data.timepointId,
        status: data.isFavoredStatus
      })
        .then(() => {
          this.currentContent.timepoints.list[data.timepointIndex].is_favored = !data.currentContentTimepoint.is_favored
          this.toggleFavorite(this.content.id)
          this.currentContent.timepoints.list[data.timepointIndex].loading = false
        })
        .catch(() => {
          this.currentContent.timepoints.list[data.timepointIndex].loading = false
        })
    },
    goToTimpoint (timepoint) {
      if (!this.$refs.videoPlayer) {
        return
      }
      if (!this.currentContent.can_user_use_timepoint) {
        this.$q.dialog({
          title: 'استفاده از زمان کوب',
          message: 'جهت استفاده از زمان کوب می بایست اشتراک خریداری کنید.',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$router.push({ name: 'Public.Landing.DynamicName', params: { landing_name: 'timepoint' } })
        }).onCancel(() => {
          // this.$router.push({ name: 'Public.Home' })
        })
        return
      }
      this.$refs.videoPlayer.changeCurrentTime(timepoint.time)
    },
    activate(time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources() {
      this.options.sources = this.source
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      this.player.src(this.source)
      this.player.poster(this.poster)
    },
    toggleFavorite(id) {
      const that = this
      let count = -1
      // let currentTimepointIndex = null
      this.timePoints.forEach(function (item) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          // currentTimepointIndex = index
          item.loading = true
          item.is_favored = !item.is_favored
          that.postIsFavored = {
            id: item.id,
            isFavored: item.is_favored,
            numberOfTimestamp: count
          }
        }
      })
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
      this.$emit('toggleBookmark', this.postIsFavored)
      // setTimeout(function() { that.timePoints[currentTimepointIndex].loading = false }, 200) // vue/no-mutating-props
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

<style scoped lang="scss">
.timepoint-list {
  direction: ltr;
  width: 100%;
  color: white;
  height: 100%;
  padding-bottom: 30px;
  background: rgba(0,0,0,0.4);
  .timepoint-list-title {
    text-align: center;
    background: rgba(0,0,0,0.7);
  }
  .timepoint-list-items {
    .text-section {
      display: flex;
      flex-flow: row;
      font-size: 0.7rem;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;
    }
  }
  :deep(.q-list) {
    height: calc(100% - 54px);
    overflow: auto;
    .bookmark-btn.q-btn {
      width: 26px;
      height: 26px;
      padding: 0;
      font-size: 10px;
      color: $primary !important;
      .q-btn__content {
        margin: 3px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
