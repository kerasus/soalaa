<template>
  <div class="q-my-xl ">
    <div class="status row items-center">
      <div class="col status-details">
        <p class="status-title-text-style">
          تغییر وضعیت
        </p>
        <q-card
          flat
          class="status-card"
        >
          <q-select
            rounded
            borderless
            dense
            v-model="newStatus.changeState"
            :options="statuses.list"
            option-label="display_title"
            option-value="id"
          ></q-select>
        </q-card>
      </div>
      <div class="col status-details">
        <p class="status-title-text-style">
          افزودن کامنت
        </p>
        <q-card
          flat
          class=" status-card"
        >
          <q-input borderless
                   v-model="text"
                   dense
                   model-value=""></q-input>
        </q-card>
      </div>
      <div class="col status-card-btn">
        <q-btn
          unelevated
          color="green"
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

<style lang="scss">
.status {
  .status-details .v-sheet.v-card {
    border-radius: 10px;
  }
  .status-card {
    height: 36px;
    margin-left: 20px;
    border-radius: 10px;
  }
  .status-button {
    height: 36px;
    min-width: 71px;
    padding: 0 16px;
    box-shadow: none;
    border-radius: 10px;
  }
  .status-title-text-style {
      font-size: 16px;
    margin-left: 20px;
  }
  .status-card-btn{
    margin-left: 20px;
    margin-top: 40px;
  }
  .q-field--auto-height .q-field__native, .q-field--auto-height .q-field__prefix, .q-field--auto-height .q-field__suffix {
    margin-right: 20px;
  }
  .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    margin-right: 6px;
    margin-left: 20px;
  }
}
</style>
