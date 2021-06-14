<template>
  <div>
    <v-row>
      <v-col><span> سوال #1231</span></v-col>
      <v-col><span> سازنده سوال:</span> <span> فیلان دبیر</span></v-col>
      <v-col v-if="status == 'question.show' || status == 'question.edit'">
        <v-row>
          <v-col>
            <span> وضعیت:</span>
            <v-chip
              color="#44a3ff"
              dark
            >
              بررسی نهایی
            </v-chip>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  class="ml-2"
                  width="120"
                >
                  <v-icon color="#666666">
                    mdi-square-edit-outline
                  </v-icon>
                  <span color="#666666">
                    ویرایش
                  </span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  width="120"
                >
                  حذف
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    status,
  }


}
</script>

<style scoped>

</style>