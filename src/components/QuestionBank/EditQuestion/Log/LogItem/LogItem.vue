<!--Todo : log item-->
<template>
  <div class="log-item">
    <v-container class="log-container">
      <v-row no-gutters>
        <v-col cols="1">
          <v-icon>
            mdi-circle-medium
          </v-icon>
        </v-col>
        <v-col>
          <v-row justify="space-between">
            <v-col cols="10">
              <div>
                به‌روزشده توسط
                <span class="log-editor">{{ log.causer.full_name }}</span>
                در
                <span class="log-date">{{ log.shamsiDate('created_at').dateTime }}</span>
              </div>
            </v-col>
            <v-col class="eye-icon">
              <v-icon>
                mdi-eye-outline
              </v-icon>
            </v-col>
          </v-row>
          <div class="log-status">
            وضعیت از
            <v-chip
              color="orange"
              text-color="white"
            >
              {{ log.properties.old.status.display_title }}
            </v-chip>
            به
            <v-chip
              color="red"
              text-color="white"
            >
              {{ log.properties.new.status.display_title }}
            </v-chip>
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
          <v-btn
            v-if="!canComment"
            block
            color="primary"
            height="20"
            class="mt-3"
            @click="canComment = true"
          >
            افزودن کامنت
          </v-btn>
          <v-textarea
            v-if="canComment"
            outlined
            rounded
            v-model="commentText"
            class="mt-3"
          />
          <v-btn
            v-if="canComment"
            color="primary"
            block
            height="20"
            @click="addComment"
          >
            ارسال کامنت
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
  padding: 30px 12px 12px 36px;
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
