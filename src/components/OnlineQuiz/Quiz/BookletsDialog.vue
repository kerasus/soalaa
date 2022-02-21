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
          جهت دانلود دفترچه سوالات می توانید از لینک زیر استفاده کنید.
        </div>
        <div class="py-2">
          <v-btn
            v-for="(categoryItem, categoryIndex) in categoriesWithBooklet"
            :key="categoryIndex"
            color="#ffc107"
            text
            @click="downloadBooklet(categoryItem.questions_booklet)"
          >
            دانلود
            {{ categoryItem.title }}
          </v-btn>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {Exam} from "@/models/Exam";

export default {
  name: 'BookletsDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    quiz: {
      type: Exam,
      default: new Exam()
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    categoriesWithBooklet () {
      return this.quiz.categories.list.filter( categoryItem => !!categoryItem.questions_booklet)
    }
  },
  watch: {
    value (newValue) {
      if (this.categoriesWithBooklet.length === 0) {
        return
      }
      this.dialog = newValue
    }
  },
  methods: {
    downloadBooklet(bookletUrl) {
      window.open(bookletUrl, '_blank').focus();
    },
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
