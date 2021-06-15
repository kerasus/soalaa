<template>
  <div id="app">
    <v-app
      id="inspire"
      class="transparent"
    >
      <v-container>
        <v-row class="mx-4">
          <v-col>
            <!--  -------------------- nav bar ----------------------------------------------------------------- -->
            <v-row
              justify="space-between"
              class="my-10"
            >
              <v-col
                cols="2"
                data-text-align="left"
              >
                <v-btn
                  elevation="0"
                  class="white"
                >
                  جدید ترین
                  <v-icon class="mr-4">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col>
                    <v-chip-group class="white px-6 rounded">
                      <v-row justify="space-between">
                        <v-col>
                          <v-chip class="amber lighten-3">
                            test
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip class="transparent">
                            test
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip class="transparent">
                            test
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip class="transparent">
                            test
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip class="transparent">
                            test
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip class="transparent">
                            test
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="2"
                class="text-left"
              >
                <v-btn
                  rounded
                  elevation="0"
                  class="white"
                >
                  <v-icon class="ml-4">
                    mdi-plus
                  </v-icon>
                  سوال جدید
                </v-btn>
              </v-col>
            </v-row>
            <!--  -------------------- table title ------------------------------------------------------------ -->
            <v-card
              class="rounded py-2 transparent"
              flat
            >
              <v-row class="">
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-1 mr-4">
                    #
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    سوال
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    تاریخ ایجاد
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    درس
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    وضعیت
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    عملیات
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <!--  -------------------- table content ------------------------------------------------------------ -->
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="red darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                    <v-chip
                      class="red"
                      dark
                    > 2</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <router-link :to="{ name:'question.show'}">
                      <v-icon class="ml-4">
                        mdi-eye-outline
                      </v-icon>
                    </router-link>
                    <router-link :to="{ name:'question.edit'}">
                      <v-icon class="ml-4">
                        mdi-pencil-outline
                      </v-icon>
                    </router-link>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="green darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="green darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="green darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="green darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4 rounded py-2"
              flat
            >
              <v-row
                class="ma-auto"
                align="center"
              >
                <v-col
                  no-gutters
                  cols="1"
                >
                  <div class="pa-2 mr-4">
                    124
                  </div>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    اون یکی مشکل
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="1"
                >
                  <span class="pa-2">
                    1400/07/01
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-chip>دیفرانسیل</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="3"
                >
                  <span class="pa-2">
                    <v-chip
                      class="green darken-1 px-4 ml-4"
                      dark
                    >نیازمند ویرایش</v-chip>
                  </span>
                </v-col>
                <v-col
                  no-gutters
                  cols="2"
                >
                  <span class="pa-2">
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "QuestionFactory",
  data() {
    return {}
  },
}
</script>

<style scoped>

</style>