<template>
  <div class="row content-selection">
    <div class="col-md-3 content-dialog">
      <div class="content-label">
        پاسخ ویدیویی
      </div>
      <q-btn
        label="انتخاب محتوا"
        color="primary"
        class="dialog-btn"
        :loading="loading"
        unelevated
        @click="toggleVideoAnswerDialog()"
      >
        <q-badge v-if="contentId !== null"
                 color="warning"
                 floating
                 transparent>
          1
        </q-badge>
      </q-btn>
      <content-selection-dialog :dialog="dialog"
                                :content="content"
                                @toggle-dialog="toggleVideoAnswerDialog"
                                @update-value="updateContent($event)" />
    </div>
    <div class="col-md-3 timepoints">
      <div class="timepoint-label">
        زمانکوب
      </div>
      <q-select v-model="timePoint"
                :options="timePointOptions"
                :disable="timePointOptions.length === 0 || loading"
                placeholder="انتخاب کنید"
                dense
                rounded
                option-label="title"
                option-value="id"
                @update:model-value="onUpdateValue" />
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import ContentSelectionDialog from 'components/Question/QuestionPage/ContentSelectionDialog.vue'
import { Content } from 'src/models/Content'
export default {
  name: 'QuestionVideoAnswer',
  components: { ContentSelectionDialog },
  props: {
    contentId: {
      type: Number,
      default: null
    },
    timePointId: {
      type: Number,
      default: null

    }
  },
  emits: ['updateValue'],
  data () {
    return {
      api: API_ADDRESS.content.admin,
      content: new Content(),
      timePoint: null,
      timePointOptions: [],
      loading: false,
      dialog: false
    }
  },
  watch: {
    contentId(newContentId) {
      this.getContent(newContentId)
    }
  },
  methods: {
    toggleVideoAnswerDialog() {
      this.dialog = !this.dialog
    },
    updateContent(contentList) {
      this.content = new Content(contentList[0])
      this.getContent(this.content.id)
      this.onUpdateValue()
    },
    onUpdateValue() {
      this.$emit('updateValue', {
        content_id: this.content.id,
        time_point_id: this.timePoint?.id
      })
    },
    getContent(contentId) {
      this.loading = true
      this.$axios.get(API_ADDRESS.content.get(contentId))
        .then(res => {
          this.content = new Content(res.data.data)
          if (this.content.timepoints && this.content.timepoints.list.length > 0) {
            this.timePointOptions = this.content.timepoints.list
            this.timePoint = this.content.timepoints.list.find(x => x.id === this.timePointId)
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-selection {
  padding: 20px 0;

  .content-dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-right: 10px;

    .content-label {
      margin-bottom: 5px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #23263B;
    }

    .dialog-btn {
      width: 100%;
      height: 40px;
    }
  }

  .timepoints {
    display: flex;
    flex-direction: column;

    .timepoint-label {
      margin-bottom: 5px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #23263B;
    }

    .q-fild {
      background-color: #FFFFFF;
      border-radius: 10px;
      line-height: 24px;
      height: 40px;
      min-height: 40px;
    }
  }
}
</style>
