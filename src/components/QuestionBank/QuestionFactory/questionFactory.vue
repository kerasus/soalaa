<template>
  <div id="app">
    <v-app id="inspire" class="transparent">
      <v-container >
        <v-row class="mx-4">
          <v-col class="ml-auto">
 <!--  -------------------- nav bar ----------------------------------------------------------------- -->
            <v-row justify="space-between">
              <v-col cols="2" data-text-align="left" >
                <v-btn
                    elevation="0"
                    class="white">
                  جدید ترین
                  <v-icon class="mr-4">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col>
                    <v-chip-group class="white px-6 rounded" >
                      <v-row justify="space-between">
                        <v-col><v-chip class="amber lighten-3">test</v-chip></v-col>
                        <v-col><v-chip class="transparent">test</v-chip></v-col>
                        <v-col><v-chip class="transparent"> test</v-chip></v-col>
                        <v-col><v-chip class="transparent">test</v-chip></v-col>
                        <v-col><v-chip class="transparent">test</v-chip></v-col>
                        <v-col><v-chip class="transparent">test</v-chip></v-col>
                      </v-row>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2" class="text-left">
                <v-btn rounded
                    elevation="0"
                    class="white">
                  <v-icon class="ml-4">
                    mdi-plus
                  </v-icon>
                  سوال جدید
                </v-btn>
              </v-col>
            </v-row>
 <!--  -------------------- table title ------------------------------------------------------------ -->
            <v-card class="transparent" elevation="0">
              <v-row class="">
                <v-col no-gutters cols="1">
                  <v-card class="pa-1 transparent" tile outlined>
                    #
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    سوال
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    تاریخ ایجاد
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    درس
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    وضعیت
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    عملیات
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
  <!--  -------------------- table content ------------------------------------------------------------ -->
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                   یه مشکل دیگه
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/11/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>زیست شناسی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="amber lighten-1 px-4 ml-4" dark>نیازمند ویرایش</v-chip>

                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    124
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                   اون یکی مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1400/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دیفرانسیل</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="green darken-1 px-4 ml-4" dark>نیازمند ویرایش</v-chip>

                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-4 rounded" elevation="0">
              <v-row class="mb-6">
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    1232
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    بیسار مشکل
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    1399/07/01
                  </v-card>
                </v-col>
                <v-col no-gutters cols="1">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip>دینی</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="3">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-chip class="red px-4 ml-4" dark>نیازمند ویرایش</v-chip>
                    <v-chip class="red" dark> 2</v-chip>
                  </v-card>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-card class="pa-2 transparent" tile outlined>
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-4">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-card>
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
  name: "questionFactory",
  data() {
    return {}
  },
}
</script>

<style scoped>

</style>