<template>
  <div>
    <v-row>
      <v-col cols="3">
        <span> سوال #1231</span>
      </v-col>
      <v-col cols="3">
        <span> سازنده سوال:</span> <span> فیلان دبیر</span>
      </v-col>
      <v-col v-if="status === 'question.create'">
        <v-row>
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
                  <span color="green">
                    ذخیره
                  </span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  width="130"
                >
                  <v-icon color="#666666">
                    mdi-square-edit-outline
                  </v-icon>
                  پیش نویس 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="status === 'question.edit'">
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
                  color="green"
                  dark
                  class="ml-2"
                  width="100"
                >
                  <span color="#666666">
                    ذخیره
                  </span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  width="100"
                >
                  لغو 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="status === 'question.show'">
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
                  width="110"
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
                  width="100"
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
  },
  created() {
    console.log(this.status)
  }
}
</script>
<style scoped>
</style>
