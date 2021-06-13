<template>
  <div>
    <v-container>
      <div>
      به‌روزشده توسط
    {{ logData.editor }}
      در
      {{logData.date}}
    <v-icon class="ml-4">
      mdi-eye-outline
    </v-icon>
      </div>
      <div>
        وضعیت از {{logData.previousStatus}} به {{logData.currentStatus}}
      </div>
      <div v-for="(item, index) in logData.commnets" :key="index">
        {{ item.author}}
        <div>
          {{ item.text}}
        </div>
        <div>
          {{ item.date}}
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    logData: {
      default: ''
    }
  },
  name: "logItem",
  data (){
    return {}
  }
}

</script>

<style scoped></style>
