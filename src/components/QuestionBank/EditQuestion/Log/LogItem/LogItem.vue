<template>
  <div class="log-item">
    <div class="log-container">
      <div class="row q-gutter-none" >
        <div class="col col-1">
          <q-icon name="mdi-circle-medium" style="font-size: 2em; color: rgba(0, 0, 0, 0.54);"/>
        </div>
        <div class="col">
          <div class="row justify-between">
            <div class="col col-10">
              <div>
                به‌روزشده توسط
                <span class="log-editor">{{ log.causer.full_name }}</span>
                در
                <span class="log-date">{{ log.shamsiDate('created_at').dateTime }}</span>
              </div>
            </div>
            <div class="eye-icon">
              <q-icon name="mdi-eye-outline" style="font-size: 2em; color: rgba(0, 0, 0, 0.54);"/>
            </div>
          </div>
          <div class="log-status">
            وضعیت از
            <q-chip dense color="orange"
                    text-color="white"
                    size="sm"
                    :label="log.properties.old.status.display_title"
            />
            به
            <q-chip
              dense
              color="red"
              text-color="white"
              size="sm"
              :label="log.properties.new.status.display_title"
            />
            تغییر یافت.
          </div>
          <div
            v-for="(comment, index) in log.comments.list"
            :key="index"
          >
            <div class="log-author">
              {{ comment.user.full_name }}:
            </div>
            <div class="log-comment">
              <div class="comment-text">
                {{ comment.comment }}
              </div>
              <div class="comment-date">
                {{ comment.shamsiDate('created_at').dateTime }}
              </div>
            </div>
          </div>
          <q-btn
            v-if="!canComment"
            color="blue"
            class="full-width"
            label="افزودن کامنت"
            style="height: 20px;"
            @click="canComment = true"
          />
          <q-input
            v-if="canComment"
            v-model="commentText"
            filled
            type="textarea"
           model-value=""
          />
          <q-btn
            v-if="canComment"
            color="blue"
            class="full-width"
            label="ارسال کامنت"
            style="height: 20px;"
            @click="addComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Log } from 'src/models/Log'

export default {
  name: 'LogItem',
  props: {
    log: {
      default () {
        return new Log()
      },
      type: Log
    }
  },
  data () {
    return {
      canComment: false,
      commentText: ''
    }
  },
  methods: {
    addComment () {
      this.$emit('addComment', { text: this.commentText, logId: this.log.id })
      this.commentText = ''
      this.canComment = false
    }
  }
}

</script>

<style scoped>
.log-item {
  font-size: 12px;
}

.log-container {
  border-radius: 10px;
  background-color: white;
  padding: 30px 12px 12px 12px;
}

.log-editor {
  color: #4a94dc;
}

.log-date {
  text-decoration: underline;
}

.eye-icon {
  width: 24px;
}

.log-status {
  margin-top: 9px;
  margin-bottom: 8px;
}

.v-chip.v-size--default {
  font-size: 12px;
  height: 20px;
}

.log-author {
  font-size: 10px;
  margin-bottom: 5px;
  margin-top: 7px;
}

.log-comment {
  padding: 5px 10px 2px 5px;
  background-color: #fff5d6;
  border-radius: 10px 0px 10px 10px;
}

.comment-date {
  text-align: left;
  font-size: 8px;
}
</style>
