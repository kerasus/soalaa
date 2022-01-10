<template>
  <v-dialog
    v-model="dialog"
    max-width="350"
    transition="dialog-top-transition"
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
      >
        توجه!
      </v-toolbar>
      <v-card-text>
        <div class="py-2">
          جهت دانلود دفترچه سوالات می توانید به صفحه لیست آزمون ها مراجعه نمایید.
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          text
          color="pink"
          @click="dialog = false"
        >
          بستن
        </v-btn>
        <v-btn
          text
          color="cyan"
          @click="goToExamList"
        >
          مشاهده دفترچه سوالات
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BookletsDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  watch: {
    value (newValue) {
      this.dialog = newValue
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update', false)
    },
    goToExamList() {
      this.$router.push({name: 'user.exam.list'})
    }
  }
}
</script>

<style scoped>

</style>