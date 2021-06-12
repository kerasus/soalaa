<template>
  <div id="app">
    <v-app id="inspire" class="transparent">
      <v-container>
        <v-row>
          <!--  -------------------------------------------------------- right side ----------------------------------------------------------------------- -->
          <v-col cols="9">
            <div>
              <!-- ------------------------- title -------------------------------  -->
              <v-row>
                <v-col> <span> سوال #1231</span></v-col>
                <v-col> <span> سازنده سوال:</span> <span> فیلان دبیر</span></v-col>
                <v-col>
                  <span> وضعیت:</span>
                  <v-chip color="#44a3ff" dark>
                    بررسی نهایی
                  </v-chip>
                </v-col>
                <v-col>
                  <v-btn depressed rounded color="white" class="ml-2" width="120">
                    <v-icon color="#666666">
                      mdi-square-edit-outline
                    </v-icon>
                    <span color="#666666">
                         ویرایش
                    </span>
                  </v-btn>
                  <v-btn  depressed rounded color="white" width="120"> حذف</v-btn>
                </v-col>
              </v-row>
            </div>
            <!-- ------------------------- question -------------------------------  -->
            <div class="my-12">
              <p class="font-weight-medium my-12">
                پيوندهايى كه منشأ تشكيل ساختار دوم در پروتئین هموگلوبین هستند، ممكن  ..................
              </p>
              <v-row>
                <v-col cols="12"><span>1-  است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند.</span></v-col>
                <v-col cols="12"><span>2-  است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند.</span></v-col>
                <v-col cols="12"><span>3-  است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند.</span></v-col>
                <v-col cols="12"><span>4-  است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند.</span></v-col>
              </v-row>

            </div>
            <!-- ------------------------- answer -------------------------------  -->
            <div class="my-10">
              <p class="font-weight-medium mb-4">
                پاسخ تشریحی
              </p>
              <v-row>
                <v-col>
                  <v-card flat height="160" class="pa-7 px-11">
                    متنوع‌ترین گروه مولکول‌های زیستی پروتئین‌ها هستند، که همۀ آنها در ساختار خود پیوند هیدروژنی دارند. بررسی سایر گزینه‌ها: گزینۀ : بعضی آنزیم‌ها برای فعالیت به یون‌های فلزی مانند آهن، مس و یا مواد آلی مثل ویتامین‌ها نیاز دارند. كوآنزيم تنها نام مواد آلى است كه عامل تسهيل فعاليت و افزايش سرعت عملكرد آنزيم‌هاست. گزینۀ \displaystyle (2)(2): آنزیم‌ها امکان برخورد مناسب مولکول‌ها را افزایش می‌دهند و انرژی فعال‌سازی واکنش را کاهش می‌دهند. هر آنزیم روی یک یا چند پیش‌مادۀ خاص مؤثر است. گزینۀ \displaystyle (3)(3): گروهی از آنزیم‌هایی مثل پمپ سدیم – پتاسیم فعالیت خود را در غشا انجام می‌دهند.
                  </v-card>

                </v-col>
              </v-row>
            </div>
              <!-- ------------------------- upload -------------------------------  -->
            <div class="my-10">
              <v-row>
                <v-col cols="5">
                  <p class="font-weight-medium">فایل های آپلود شده:</p>
                  <v-card height="138" flat>
                    <v-row justify="space-between">
                      <v-col>
                        <p>صورت سوال</p>
                        <v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"></v-img>
                      </v-col>
                      <v-col>
                            <p>جواب سوال</p>
                            <v-row >
                            <v-col><v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"> </v-img></v-col>
                            <v-col><v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"> </v-img></v-col>
                            </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="7">
                  <p class="font-weight-medium">آزمون ها</p>
                  <v-row>
                    <v-col cols="6">
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                    </v-col>
                    <v-col cols="2">
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                      <v-card flat height="36" class="my-4"></v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
                <!-- ------------------------- status -------------------------------  -->
            <div class="my-10">
                <v-row>
                  <v-col>
                    <p class="font-weight-medium">تغییر وضعیت</p>
                      <v-card flat height="36" class="my-4"></v-card>
                  </v-col>
                  <v-col>
                    <p class="font-weight-medium">افزودن کامنت</p>
                    <v-card flat height="36" class="my-4"></v-card>
                  </v-col>
                </v-row>
            </div>
                <!-- ------------------------- save -------------------------------  -->
            <div class="my-16">
                <v-row>
                  <v-col>
                    <v-row justify="space-around">
                      <v-col cols="4">
                        <v-btn color="green darken-1 " dark class="ml-13 " large>
                          ذخیره
                        </v-btn>
                        <span>
                          لغو
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
            </div>
          </v-col>
          <!--  ------------------------------------------------------------- left side ------------------------------------------------------------------ -->
          <v-col cols="3">
            <historyComment>
            </historyComment>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>



</template>

<script>
import historyComment from "@/components/QuestionBank/NewQuestion/HistoryComment/historyComment";
export default {
  name: "newQuestion",

  components:{
    historyComment:historyComment
  }
}
</script>

<style scoped>

</style>