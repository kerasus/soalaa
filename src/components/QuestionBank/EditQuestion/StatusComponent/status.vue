<template>
  <v-row align="center">
    <v-col>
      <p class="font-weight-medium">
        تغییر وضعیت
      </p>
      <v-card
        flat
        height="36"
        class="my-4"
      >
        <v-select
          v-model="newStatus.changeState"
          :items="statuses.list"
          item-text="display_title"
          item-value="id"
          dense
          solo
        />
      </v-card>
    </v-col>
    <v-col>
      <p class="font-weight-medium">
        افزودن کامنت
      </p>
      <v-card
        flat
        height="36"
        class="my-4"
      >
        <v-text-field
          v-model="newStatus.commentAdded"
          height="36"
          solo
          dense
        />
      </v-card>
    </v-col>
    <v-col class="mt-7">
      <v-btn
        color="success"
        :loading="loading"
        :disabled="loading"
        @click="sendStatus"
      >
        ذخیره
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {QuestionStatusList} from "@/models/QuestionStatus";

export default {
  name: "Status",
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
      commentAdded: null,
    }
  }),
  methods: {
    sendStatus() {
      this.$emit('update', this.newStatus)
      this.newStatus.changeState = null
      this.newStatus.commentAdded = null
    }
  }
}
</script>

<style scoped>

</style>
