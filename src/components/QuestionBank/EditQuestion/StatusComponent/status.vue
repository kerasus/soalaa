<template>
  <div>
    <div class="status row items-center">
      <div class="status-details">
        <p class="font-weight-medium">
          تغییر وضعیت
        </p>
        <q-card
          flat
          class="status-card q-my-md"
        >
          <!--    todo v-select-->
          <!--        <v-select-->
          <!--          v-model="newStatus.changeState"-->
          <!--          :items="statuses.list"-->
          <!--          item-text="display_title"-->
          <!--          item-value="id"-->
          <!--          dense-->
          <!--          solo-->
          <!--          flat-->
          <!--        />-->
        </q-card>
      </div>
      <div class="col status-details">
        <p class="font-weight-medium">
          افزودن کامنت
        </p>
        <q-card
          flat
          class="q-my-md status-card"
        >
          <!--    todo v-text-field-->
          <!--        <v-text-field-->
          <!--          v-model="newStatus.commentAdded"-->
          <!--          height="36"-->
          <!--          solo-->
          <!--          dense-->
          <!--          flat-->
          <!--        />-->
        </q-card>
      </div>
      <div class="col q-mt-lg">
        <q-btn
          color="success"
          :loading="loading"
          :disabled="loading"
          @click="sendStatus"
          class="status-button"
        >
          ذخیره
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { QuestionStatusList } from 'src/models/QuestionStatus'

export default {
  name: 'Status',
  props: {
    statuses: {
      type: QuestionStatusList,
      default: new QuestionStatusList()
    },
    loading: {
      default: () => {
        return false
      },
      type: Boolean
    }
  },
  data: () => ({
    newStatus: {
      changeState: null,
      commentAdded: null
    }
  }),
  methods: {
    sendStatus () {
      this.$emit('update', this.newStatus)
      this.newStatus.changeState = null
      this.newStatus.commentAdded = null
    }
  }
}
</script>

<style>
.status-details .v-sheet.v-card {
  border-radius: 10px;
}

.status .v-btn {
  box-shadow: none;
  border-radius: 10px;
}

.status .status-card {
  height: 36px;
}
</style>
