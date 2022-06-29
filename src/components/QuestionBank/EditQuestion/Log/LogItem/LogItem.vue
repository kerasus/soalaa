<template>
  <div class="main-log-item">
    <div class="row log-item">
      <div class="col-md-4 col-xs-12 log-item-right-side">
        <q-avatar
          class="log-item-avatar"
          size="24px"
        >
          <!--        <img :src="log.causer.photo">-->
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <span class="log-editor">
          {{ log.causer.full_name + ' ' }}
        </span>
        <span>
          {{ log.log_status.title }}
      </span>
      </div>
      <div class="col-md-2 col-xs-6 log-date-time">
        <span class="log-time">
          {{ log.shamsiDate('created_at').time }}
        </span>
        <span class="log-date">
          {{ log.shamsiDate('created_at').date }}
        </span>
      </div>
      <div class="col-6 log-btn-box">
        <q-btn
          v-if="true"
          icon="add_comment"
          class="icon-type log-comment-btn"
          flat
          @click="addComment"
        />
        <q-btn
          v-if="true"
          icon="more_horiz"
          class="icon-type log-comment-btn"
          flat
        />
      </div>
      <div class="col-12 log-actions">
        <ul class="actions-list">
          <li
            v-if="log.log_status.actions.message"
            class="actions-list-item"
          >
            {{ log.log_status.actions.message }}
          </li>
        </ul>
      </div>
    </div>
    <q-separator size="2px" class="log-list-separator"/>
  </div>
</template>

<script>
import { Log } from 'src/models/Log'

export default {
  name: 'LogItem',
  props: {
    log: {
      type: Log,
      default () {
        return new Log()
      }
    }
  },
  data () {
    return {
      canComment: false,
      commentText: ''
    }
  },
  created () {
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

<style lang="scss" scoped>
.main-log-item {
  .log-item {
    align-items: center;
    justify-content: space-between;
    margin: 24px 24px 0 50px;
    @media screen and (max-width: 991px) {
      margin: 24px 20px 0 34px;
    }
    @media screen and (max-width: 599px) {
      margin: 16px 12px 0 12px !important;
    }

    &:first-child {
      margin-top: 10px;
      @media screen and (max-width: 1023px) {
        margin-top: 6px !important;
      }
      @media screen and (max-width: 599px) {
        margin-top: 2px !important;
      }
    }

    .log-item-right-side {
      font-size: 14px;
      color: var(--3a-TextPrimary);
      @media screen and (max-width: 1023px) {
        order: 1;
      }

      .log-item-avatar {
        margin-right: 10px;
      }

      .log-editor {
        font-weight: 500;
        color: var(--3a-Primary);
      }
    }

    .log-date-time {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      @media screen and (max-width: 1023px) {
        justify-content: start;
      }
      color: var(--3a-TextSecondary);

      .log-date {
        margin-left: 8px;
      }
    }

    .log-btn-box {
      display: flex;
      justify-content: flex-end;

      .log-comment-btn {
        &:deep(.q-icon) {
          color: var(--3a-TextSecondary);
          font-size: 20px;
          @media screen and (max-width: 1023px) {
            font-size: 16px;
          }
        }
      }
    }

    .log-actions {
      order: 2;

      .actions-list {
        list-style: none;
        margin-right: 10px;
        padding-left: 36px;
        color: var(--3a-TextSecondary);

        .actions-list-item {
          font-size: 14px;

          &:before {
            content: "\2022";
            color: var(--3a-Secondary);
            font-size: 20px;
            font-weight: bold;
            display: inline-block;
            margin-right: 8px;
          }
        }
      }
    }
  }

  &:deep(.q-separator) {
    background-color: var(--3a-Neutral2);
    width: 95%;
    margin-left: 50px;
    margin-right: 30px;
    @media screen and (max-width: 1023px) {
      margin-left: 34px;
      margin-right: 24px;
    }
    @media screen and (max-width: 599px) {
      margin-left: 16px !important;
      margin-right: 16px !important;
    }
  }
}
</style>
