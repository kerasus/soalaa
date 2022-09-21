<template>
  <q-card class="q-mt-xl"
          :class="data.is_private ? 'private-message-card' : ''">
    <div :dir="ltrOrRtl">
      <div class="user-img">
        <q-img width="85px"
               height="85px"
               class="user-photo"
               :src="data.user.photo" />
      </div>
    </div>
    <q-card-section class="flex"
                    :class="isUserCustomer ? 'admin-info' : 'user-info'">
      <div class="flex info-section">
        <q-img v-if="!isUserCustomer"
               width="20px"
               height="25px"
               src="https://nodes.alaatv.com/upload/favicon.ico" />
        <span v-if="isUserCustomer"
              class="q-mr-xs">
          ماه:
        </span>
        <span v-else
              class="q-mx-xs q-mt-xs">
          {{data.user.role}}:
        </span>
        <span :class="!isUserCustomer ? 'q-mt-xs' : ''">
          {{data.user.first_name}}
          {{data.user.last_name}}
        </span>
        <q-icon v-if="isUserCustomer"
                size="16px"
                name="isax:user"
                class="user-icon" />
      </div>
      <div v-if="data.is_private"
           class="q-ml-xl">
        <q-icon name="isax:info-circle"
                size="sm"
                class="q-mb-xs"
                color="grey" />
        این پیام به صورت خصوصی میباشد</div>
    </q-card-section>
    <q-card-section class="message-body">
      <div class="body">
        <div v-html="data.body" />
        <div v-if="data.files.voice"
             dir="ltr">
          <div class="flex voice-player-section">
            <q-btn v-if="!showVoicePlayerIsPlaying"
                   size="30px"
                   unelevated
                   icon="isax:play"
                   class="play-btn"
                   @click="playRecordedVoice">
            </q-btn>
            <q-btn v-else
                   size="30px"
                   unelevated
                   @click="pauseRecordedVoice">
              <q-icon name="isax:pause"></q-icon>
            </q-btn>
            <av-waveform ref="waveform"
                         class="av-waveform"
                         :audio-src="data.files.voice"
                         :playtime-font-family="'IRANSans'"
                         :audio-controls="false"
                         :canv-width="900"
                         :canv-height="64"
            ></av-waveform>
          </div>
        </div>
        <q-img v-if="data.files.photo"
               :src="data.files.photo"
               class="q-my-lg"
        />
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div class="flex">
        <q-chip color="blue"
                class="dateTime-chip"
                square>
          {{ convertToShamsi(data.created_at) }}
        </q-chip>
        <q-expansion-item
          v-if="!isUserCustomer"
          class="report-panel"
          icon="isax:ticket"
          label="گزارش پاسخ نامناسب"
        >
          <q-card>
            <q-card-section>
              <q-input v-model="userReportDescription"
                       type="textarea"></q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn v-if="!isUserAdmin"
                     flat
                     color="blue"
                     @click="sendReport">
                ارسال گزارش
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { mixinDateOptions } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import AvWaveform from 'vue-audio-visual/src/components/AvWaveform'

export default {
  name: 'Messages',
  mixins: [mixinDateOptions],
  components: {
    AvWaveform
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    isUserAdmin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showVoicePlayerIsPlaying: false,
      audioPlayerLastPlayedTime: 0,
      userReportDescription: ''
    }
  },
  methods: {
    playRecordedVoice () {
      const audioPlayer = this.$refs.waveform.$el.children[0].children[0],
        that = this
      audioPlayer.src = this.data.files.voice
      audioPlayer.currentTime = this.audioPlayerLastPlayedTime
      audioPlayer.onended = function () {
        // console.log('audioPlayer.onended');
        audioPlayer.pause()
        audioPlayer.currentTime = 0
        that.audioPlayerLastPlayedTime = 0
        that.showVoicePlayerIsPlaying = false
      }
      audioPlayer.play()
      this.showVoicePlayerIsPlaying = true
    },
    pauseRecordedVoice () {
      const audioPlayer = this.$refs.waveform.$el.children[0].children[0]
      audioPlayer.pause()
      this.audioPlayerLastPlayedTime = audioPlayer.currentTime
      this.showVoicePlayerIsPlaying = false
    },
    sendReport () {
      this.$axios.post(API_ADDRESS.ticket.show.reportMessage(this.data.user.id), {
        report_description: this.userReportDescription
      })
        .then((res) => {
          this.$q.notify({
            message: res.data.message,
            type: 'positive'
          })
        })
    }
  },
  computed: {
    isUserCustomer () {
      return this.data.user.role === 'کاربر'
    },
    ltrOrRtl () {
      if (this.isUserCustomer) {
        return 'ltr'
      } else {
        return 'rtl'
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.user-photo {
  border-radius: 50%;
}
.dateTime-chip {
  color: #FFFFFF;
  height: 30px;
}
.user-icon{
  margin-right: 5px;
  margin-top: 2px;
}
.info-section {
  margin-top: 34px;
}
.private-message-card{
  background: #fff9f0;
}
.av-waveform {
  width: calc( 100% - 76px);
  padding-top: 9px;
}
.user-img {
  position: absolute;
  margin-left: 30px;
  top: -40px;
  border-radius: 50%;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.25);
}
 .user-info {
   justify-content: start;
 }
.admin-info {
   justify-content: end;
 }
 .message-body {
   padding-top: 0;
 }
 .report-panel {
   width: 100%;
   margin-left: 30px;
 }
</style>
<style scoped lang="scss">
.voice-player-section {
  margin-top: 10px;
  margin-bottom: 10px;
  .q-btn {
    margin-bottom: 5px;
    background: #34bfa3;
    color: #FFF;
    &:deep(.q-btn__content) {
      margin: 15px;
    }
  }
}
</style>
