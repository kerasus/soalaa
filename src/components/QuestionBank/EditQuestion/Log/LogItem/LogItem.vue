<template>
  <div class="log-item">
    <v-container>
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
                <span class="log-editor">{{ logData.editor }}</span>
                در
                <span>{{ logData.date }}</span>
              </div>
            </v-col>
            <v-col class="text-left">
              <v-icon class="eye-icon">
                mdi-eye-outline
              </v-icon>
            </v-col>
          </v-row>
          <div>
            وضعیت از
            <v-chip color="orange" text-color="white">{{ logData.previousStatus }}</v-chip>
            به
            <v-chip color="red" text-color="white">{{ logData.currentStatus }}</v-chip>
            تغییر یافت.
          </div>
          <div v-for="(item, index) in logData.commnets" :key="index">
            :{{ item.author }}
            <div class="log-comment">
            <div class="comment-text">
              {{ item.text }}
            </div>
            <div class="comment-date">
              {{ item.date }}
            </div>
              </div>
          </div>
        </v-col>
      </v-row>
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
  data() {
    return {}
  }
}

</script>

<style scoped>
.log-item {
  font-size: 12px;
}

.log-editor {
  color: #4a94dc;
}
.v-chip.v-size--default {
  font-size: 12px;
  height: 20px;
}
.log-comment{
  padding: 5px 5px 0px 5px;
  background-color: #fff5d6;
  border-radius: 10px 0px 10px 10px;
}
.comment-date{
  text-align: left;
  font-size: 8px;
}
/*.eye-icon{*/
/*  width: 12px;*/
/*  height: 12px;*/
/*}*/
</style>
