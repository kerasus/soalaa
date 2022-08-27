<template>
  <div class="table-section">
    <div class="table-section-title">
      ثبت‌نام آزمون
    </div>
    <div class="submit-table">
      <div class="exams-box">
        <div class="tabs">
          <q-btn v-for="exam in tabPages"
                 :key="exam.id"
                 unelevated
                 :name="exam"
                 class="exam-btn"
                 :class="{'active-exam-btn':activeTab.id === exam.id}"
                 @click="updateActiveTab(exam)"
          >
            <span class="btn-text">
              {{ exam.title }}
            </span>

          </q-btn>
        </div>
        <div class="exams-q-select">
          <q-select
            v-model="activeTab"
            :options="tabPages"
            dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png"
            hide-bottom-space
            dense
            color="grey-10"
            borderless
            rounded
            option-label="title"
            @update:model-value="setFirstMajorsGradesSelected"
          >
          </q-select>
        </div>
        <div class="table-description">
          {{ description }}
        </div>
      </div>
      <div class="table-box-container">
        <!--        <table-component :table-data="data"/>-->
        <div class="table-parent">
          <div class="major-grade-btn">
            <q-select
              v-if="currentGrades.length>0"
              v-model="selectedGrade"
              borderless
              option-label="title"
              dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png"
              hide-bottom-space
              dense
              :options="currentGrades"
              class="dropdown-btn first q-mr-md">
              <template v-slot:selected>
                <span class="custom-label-prefix"> مقطع تحصیلی: </span>
                {{ selectedGrade.title }}
              </template>
            </q-select>
            <q-select v-if="currentMajors.length >0"
                      v-model="selectedMajor"
                      borderless
                      dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png"
                      hide-bottom-space
                      dense
                      :options="currentMajors"
                      option-label="title"
                      class="select-2 dropdown-btn"
            >
              <template v-slot:selected>
                <span class="custom-label-prefix"> رشته تحصیلی: </span>
                {{ selectedMajor.title }}
              </template>
            </q-select>
          </div>
          <table class="table">
            <tr>
              <th class='table-title'>شماره</th>
              <th class='table-title'>تاریخ</th>
              <th class='table-title'>عنوان</th>
              <th v-if="selectiveRegister"
                  class='table-title'>ثبت‌نام انتخابی
              </th>
              <th class='table-title'
                  :class="selectiveRegister? '':''">ثبت‌نام کامل
              </th>
            </tr>
            <tr v-for="item in dataTable"
                :key="item">
              <td class="number custom-border"
                  :class="{'number-selective': selectiveRegister}">{{ item.number }}</td>
              <td class="date custom-border"
                  :class="{'date-selective': selectiveRegister}">{{ item.date }}</td>
              <td class="title custom-border"
                  :class="{ 'title-selective-mod': selectiveRegister}"
              >{{ item.title }}</td>
              <td v-if="selectiveRegister"
                  class="submitStatus-selective-mode custom-border">
                <div class="flex items-center justify-center">
                  <div class="empty-circle"></div>
                </div>
              </td>
              <td class="custom-border"
                  :class="selectiveRegister ? 'submitStatus-selective-mode ': 'submitStatus' ">
                <div
                  class="flex items-center justify-center svg">
                  <svg
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM16.0588 7.50027C16.3351 7.19167 16.3089 6.71752 16.0003 6.44123C15.6917 6.16493 15.2175 6.19113 14.9412 6.49973L11.5721 10.2629C10.8894 11.0254 10.4296 11.5363 10.0365 11.8667C9.66207 12.1814 9.44213 12.25 9.25 12.25C9.05787 12.25 8.83794 12.1814 8.46348 11.8667C8.0704 11.5363 7.61064 11.0254 6.92794 10.2629L6.05877 9.29209C5.78248 8.98349 5.30833 8.9573 4.99973 9.23359C4.69113 9.50988 4.66493 9.98403 4.94123 10.2926L5.84753 11.3049C6.48338 12.0152 7.01374 12.6076 7.49835 13.0149C8.01099 13.4458 8.56393 13.75 9.25 13.75C9.93607 13.75 10.489 13.4458 11.0016 13.0149C11.4863 12.6076 12.0166 12.0152 12.6525 11.3049L16.0588 7.50027Z"
                          fill="#2DBB33" />
                  </svg>
                </div>
              </td>
            </tr>
          </table>
          <div class="bottom-of flex">
            <div class="download-picture-box"
                 :class="{'download-picture-selective-mode' :selectiveRegister}">
              <div class="table-footer-container">
                <div class="pic-container">
                  <q-img src="https://nodes.alaatv.com/upload/landing/3a/13.png"
                         class="img">
                  </q-img>
                </div>
                <div class="download-box">
                  <div class="text-style">
                    برای دانلود برنامه آزمون روی دکمه زیر کلیک کنید.
                  </div>
                  <q-btn class="download-btn">
                    <div class="svg">
                      <svg width="18"
                           height="19"
                           viewBox="0 0 18 19"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1V7H6C5.07099 7 4.60649 7 4.21783 7.06156C2.07837 7.40042 0.400416 9.07837 0.0615583 11.2178C0 11.6065 0 12.071 0 13C0 13.929 0 14.3935 0.0615583 14.7822C0.400416 16.9216 2.07837 18.5996 4.21783 18.9384C4.60649 19 5.07099 19 6 19H12C12.929 19 13.3935 19 13.7822 18.9384C15.9216 18.5996 17.5996 16.9216 17.9384 14.7822C18 14.3935 18 13.929 18 13C18 12.071 18 11.6065 17.9384 11.2178C17.5996 9.07837 15.9216 7.40042 13.7822 7.06156C13.3935 7 12.929 7 12 7H9.75V1ZM9.75 7H8.25V13.8105C7.92734 13.483 7.54375 13.001 6.98553 12.297L5.58768 10.534C5.33034 10.2095 4.8586 10.155 4.53403 10.4123C4.20946 10.6697 4.15497 11.1414 4.41232 11.466L5.83857 13.2648C6.37175 13.9373 6.81172 14.4922 7.20551 14.8875C7.60963 15.2932 8.05816 15.6294 8.63133 15.7208C8.75344 15.7402 8.87661 15.75 9 15.75C9.12339 15.75 9.24656 15.7402 9.36867 15.7208C9.94184 15.6294 10.3904 15.2932 10.7945 14.8875C11.1883 14.4922 11.6283 13.9372 12.1614 13.2648L13.5877 11.466C13.845 11.1414 13.7905 10.6697 13.466 10.4123C13.1414 10.155 12.6697 10.2095 12.4123 10.534L11.0145 12.297C10.4563 13.001 10.0727 13.483 9.75 13.8105V7Z"
                              fill="#2A2A2A" />
                      </svg>
                    </div>
                    <span>
                      دانلود برنامه آزمون‌
                    </span>
                  </q-btn>
                </div>
              </div>
            </div>
            <div v-if="selectiveRegister"
                 class="price-submit-in-footer price-submit-box-selective-mode border-right">
              <div class="price-box">
                <div>
                  <span class="single-price">
                    قیمت تک مرحله
                  </span>
                  <br>
                  <span class="price">۱۸٫۹۰۰ </span>
                  <span class="price">تومان</span>
                </div>
              </div>
              <div class="submit-box single-mode">
                <div class="exam-price">
                  قیمت آزمون کامل
                </div>
                <div class="final-price-box">
                  <span>۱۱۰٫۰۰۰</span>
                  <span>تومان</span>
                </div>
                <q-btn unelevated
                       class="sub-btn">
                  <span class="sub-btn-text">
                    ثبت‌نام
                  </span>
                </q-btn>
              </div>
            </div>
            <div class="price-submit-in-footer"
                 :class="!selectiveRegister? 'price-submit-box-pack-mode':'price-submit-box-selective-mode'">
              <div class="price-box">
                <div>
                  <span class="single-price">
                    قیمت تک مرحله
                  </span>
                  <br>
                  <span class="price">۱۸٫۹۰۰ </span>
                  <span class="price">تومان</span>
                </div>
              </div>
              <div class="submit-box">
                <div class="exam-price">
                  قیمت آزمون کامل
                </div>
                <div class="exam-price-box">
                  <span class="discount-tag"> تخفیف٪</span>
                  <span class="main-price"> ۱۸۶٫۰۰۰ </span>
                  <span class="main-price"> تومان</span>
                </div>
                <div class="final-price-box">
                  <span>۱۱۰٫۰۰۰</span>
                  <span>تومان</span>
                </div>
                <q-btn unelevated
                       class="sub-btn"
                       @click="showMessageDialog"
                >
                  <span class="sub-btn-text">
                    ثبت‌نام
                  </span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <q-dialog v-model="messageDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">توجه!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          در حال حاضر محصول فعال نیست.
        </q-card-section>

        <q-card-actions align="right"
                        class="bg-white text-teal">
          <q-btn v-close-popup
                 flat
                 label="بستن" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import tableComponent from 'src/components/landing/table'
export default {
  name: 'submitTable',
  components: {
    // tableComponent
  },
  data: () => ({
    messageDialog: false,
    data: [],
    activeTab: {},
    selectedGrade: {},
    selectedMajor: {},
    tabPages: [
      {
        id: 0,
        title: 'آزمون سه‌آ ویژه کنکور 1402',
        description: ' سه آ برای کنکوری ها شامل 10 مرحله آزمون جزئی و جامع است که برای داوطلب کنکور تعداد بسیار متناسبی است. با پیشروی طبق برنامه آزمون های سه آ، هر یک از مطالب پایه و دوازدهم حداقل دوبار در آزمون های جزئی تکرار می شوند. برنامه ریزی دقیق، سوالات استاندارد، کارنامه آنی و حل ویدیویی مهم ترین ویژگی های آزمون های سه آ است. در جدول پایین "(ج)" و "(ب)" به ترتیب نمایش اختصاری کلمه "جمع بندی" و "بخشی از" می‌باشد.',
        majors: [{ id: 0, title: 'ریاضی' }, { id: 1, title: 'تجربی' }, { id: 2, title: 'انسانی' }],
        grades: [],
        exams: [
          {
            id: 0,
            major_id: 0,
            grade_id: null,
            title: '(ج) پایه ',
            pack_price: 110000,
            date: '5/7/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 0,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه ',
            pack_price: 110000,
            date: '10/8/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 0,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '15/9/1401',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 0,
            grade_id: null,
            title: '(ج) ترم 1 دوازدهم ',
            pack_price: 110000,
            date: '27/10/1401',
            number: 4,
            selective: true
          },
          {
            id: 4,
            major_id: 0,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '25/11/1401',
            number: 5,
            selective: true
          },
          {
            id: 5,
            major_id: 0,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '23/12/1401',
            number: 6,
            selective: true
          },
          {
            id: 6,
            major_id: 0,
            grade_id: null,
            title: '(ج) پایه',
            pack_price: 110000,
            date: '22/1/1402',
            number: 7,
            selective: true
          },
          {
            id: 7,
            major_id: 0,
            grade_id: null,
            title: '(ج) دوازدهم',
            pack_price: 110000,
            date: '26/2/1402',
            number: 8,
            selective: true
          },
          {
            id: 8,
            major_id: 0,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '23/3/1402',
            number: 9,
            selective: true
          },
          {
            id: 9,
            major_id: 0,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '30/3/1402',
            number: 10,
            selective: true
          },

          {
            id: 0,
            major_id: 1,
            grade_id: null,
            title: '(ج) پایه ',
            pack_price: 110000,
            date: '5/7/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 1,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه ',
            pack_price: 110000,
            date: '10/8/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 1,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '15/9/1401',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 1,
            grade_id: null,
            title: '(ج) ترم 1 دوازدهم ',
            pack_price: 110000,
            date: '27/10/1401',
            number: 4,
            selective: true
          },
          {
            id: 4,
            major_id: 1,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '25/11/1401',
            number: 5,
            selective: true
          },
          {
            id: 5,
            major_id: 1,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '23/12/1401',
            number: 6,
            selective: true
          },
          {
            id: 6,
            major_id: 1,
            grade_id: null,
            title: '(ج) پایه',
            pack_price: 110000,
            date: '22/1/1402',
            number: 7,
            selective: true
          },
          {
            id: 7,
            major_id: 1,
            grade_id: null,
            title: '(ج) دوازدهم',
            pack_price: 110000,
            date: '26/2/1402',
            number: 8,
            selective: true
          },
          {
            id: 8,
            major_id: 1,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '23/3/1402',
            number: 9,
            selective: true
          },
          {
            id: 9,
            major_id: 1,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '30/3/1402',
            number: 10,
            selective: true
          },

          {
            id: 0,
            major_id: 2,
            grade_id: null,
            title: '(ج) پایه ',
            pack_price: 110000,
            date: '5/7/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 2,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه ',
            pack_price: 110000,
            date: '10/8/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 2,
            grade_id: null,
            title: 'ترم 1 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '15/9/1401',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 2,
            grade_id: null,
            title: '(ج) ترم 1 دوازدهم ',
            pack_price: 110000,
            date: '27/10/1401',
            number: 4,
            selective: true
          },
          {
            id: 4,
            major_id: 2,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '25/11/1401',
            number: 5,
            selective: true
          },
          {
            id: 5,
            major_id: 2,
            grade_id: null,
            title: 'ترم 2 دوازدهم و (ب) پایه',
            pack_price: 110000,
            date: '23/12/1401',
            number: 6,
            selective: true
          },
          {
            id: 6,
            major_id: 2,
            grade_id: null,
            title: '(ج) پایه',
            pack_price: 110000,
            date: '22/1/1402',
            number: 7,
            selective: true
          },
          {
            id: 7,
            major_id: 2,
            grade_id: null,
            title: '(ج) دوازدهم',
            pack_price: 110000,
            date: '26/2/1402',
            number: 8,
            selective: true
          },
          {
            id: 8,
            major_id: 2,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '23/3/1402',
            number: 9,
            selective: true
          },
          {
            id: 9,
            major_id: 2,
            grade_id: null,
            title: 'شبیه ساز کنکور',
            pack_price: 110000,
            date: '30/3/1402',
            number: 10,
            selective: true
          }
        ],
        prices: [
          {
            major_id: 0,
            grade_id: 0,
            unit: {
              price: 18900
            },
            pack: {
              unit_price: 18900,
              discount: 76000,
              price: 110000
            }
          }
        ]
      },
      {
        id: 1,
        title: 'آزمون سه‌آ ویژه دهم و یازدهم',
        description: ' دانش آموزان پایه دهم و یازدهم برای آشنایی هرچه بیشتر با فضای آزمون های تستی و کنکور لازم است میزان توانایی خود را در آزمون های تستی بسنجند. آزمون های سه آ در این پایه ها در زمان هایی قرارداده شده است که با برنامه آزمون های تشریحی و نهایی بیشترین مطابقت را داشته باشد.',
        majors: [{ id: 0, title: 'ریاضی' }, { id: 1, title: 'تجربی' }, { id: 2, title: 'انسانی' }],
        grades: [{ id: 0, title: 'دهم' }, { id: 1, title: 'یازدهم' }],
        exams: [
          {
            id: 0,
            major_id: 0,
            grade_id: 0,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 0,
            grade_id: 0,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 0,
            grade_id: 0,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 0,
            grade_id: 0,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: 1,
            grade_id: 0,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 1,
            grade_id: 0,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 1,
            grade_id: 0,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 1,
            grade_id: 0,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: 2,
            grade_id: 0,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 2,
            grade_id: 0,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 2,
            grade_id: 0,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 2,
            grade_id: 0,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: 0,
            grade_id: 1,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 0,
            grade_id: 1,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 0,
            grade_id: 1,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 0,
            grade_id: 1,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: 1,
            grade_id: 1,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 1,
            grade_id: 1,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 1,
            grade_id: 1,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 1,
            grade_id: 1,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: 2,
            grade_id: 1,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: 2,
            grade_id: 1,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '4/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: 2,
            grade_id: 1,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '19/2/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: 2,
            grade_id: 1,
            title: '(ج) کل سال',
            pack_price: 110000,
            date: '30/3/1402',
            number: 4,
            selective: true
          }

        ],
        prices: [
          {
            major_id: 0,
            grade_id: 0,
            unit: {
              price: 18900
            },
            pack: {
              unit_price: 18900,
              discount: 76000,
              price: 110000
            }
          }
        ]
      },
      {
        id: 2,
        description: 'دانش آموزان پایه هفتم،‌هشتم و نهم برای آشنایی هرچه بیشتر با فضای آزمون های تستی و کنکور لازم است میزان توانایی خود را در آزمون های تستی بسنجند. آزمون های سه آ در این پایه ها در زمان هایی قرارداده شده است که با برنامه آزمون های تشریحی بیشترین مطابقت را داشته باشد',
        majors: [],
        title: ' آزمون سه‌آ ویژه هفتم، هشتم و نهم',
        grades: [{ id: 2, title: 'نهم' }, { id: 0, title: 'دهم' }, { id: 1, title: 'یازدهم' }],
        exams: [
          {
            id: 0,
            major_id: null,
            grade_id: 0,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/9/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: null,
            grade_id: 0,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '6/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: null,
            grade_id: 0,
            title: 'میان ترم 2',
            pack_price: 110000,
            date: '17/1/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: null,
            grade_id: 0,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '28/2/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: null,
            grade_id: 1,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/9/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: null,
            grade_id: 1,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '6/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: null,
            grade_id: 1,
            title: 'میان ترم 2',
            pack_price: 110000,
            date: '17/1/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: null,
            grade_id: 1,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '28/2/1402',
            number: 4,
            selective: true
          },

          {
            id: 0,
            major_id: null,
            grade_id: 2,
            title: 'میان ترم 1',
            pack_price: 110000,
            date: '17/9/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: null,
            grade_id: 2,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '6/11/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: null,
            grade_id: 2,
            title: 'میان ترم 2',
            pack_price: 110000,
            date: '17/1/1402',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: null,
            grade_id: 2,
            title: '(ج) ترم 2',
            pack_price: 110000,
            date: '28/2/1402',
            number: 4,
            selective: true
          }
        ],
        prices: [
          {
            major_id: 0,
            grade_id: 0,
            unit: {
              price: 18900
            },
            pack: {
              unit_price: 18900,
              discount: 76000,
              price: 110000
            }
          }
        ]
      },
      {
        id: 3,
        description: [
          {
            id: 3,
            text: 'در آزمون تیزهوشان ششم به هفتم سنجش براساس هوش، خلاقیت و استعداد تحلیلی صورت می گیرد. بنابراین آزمون های سه آ در قالب 7 مرحله به صورت کاملا مشابه با آزمون تیزهوشان از مباحث هوش، خلاقیت و استعداد تحلیلی برگزار می شود. در جدول پایین "(ج)" نمایش اختصاری کلمه "جمع بندی" می‌باشد.'
          },
          {
            id: 2,
            text: 'در آزمون تیزهوشان نهم به دهم سنجش براساس استعداد تحصیلی و تحلیلی صورت می گیرد. بنابراین آزمون های سه آ در قالب 5 مرحله جزئی و 2 آزمون شبیه ساز آزمون تیزهوشان برگزار می شود که در آن سوالات استعداد تحلیلی همواره قرار دارند و سوالات استعداد تحصیلی براساس پیشروی دروس برنامه ریزی شده اند. در جدول پایین "(ج)" و "(ب)" به ترتیب نمایش اختصاری کلمه "جمع بندی" و "بخشی از" می‌باشد.'
          }
        ],
        majors: [],
        title: 'آزمون سه‌آ ویژه قبولی تیزهوشان',
        grades: [{ id: 2, title: 'نهم' }, { id: 3, title: 'ششم' }],
        exams: [
          {
            id: 0,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 1',
            pack_price: 110000,
            date: '19/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 2',
            pack_price: 110000,
            date: '1/10/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 3',
            pack_price: 110000,
            date: '6/11/1401',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 4',
            pack_price: 110000,
            date: '18/12/1401',
            number: 4,
            selective: true
          },
          {
            id: 4,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 5',
            pack_price: 110000,
            date: '17/1/1402',
            number: 5,
            selective: true
          },
          {
            id: 5,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 6',
            pack_price: 110000,
            date: '14/2/1402',
            number: 6,
            selective: true
          },
          {
            id: 6,
            major_id: null,
            grade_id: 2,
            title: 'شبیه ساز 7',
            pack_price: 110000,
            date: '28/2/1402',
            number: 7,
            selective: true
          },

          {
            id: 0,
            major_id: null,
            grade_id: 3,
            title: '(ب) ترم 1',
            pack_price: 110000,
            date: '19/8/1401',
            number: 1,
            selective: true
          },
          {
            id: 1,
            major_id: null,
            grade_id: 3,
            title: '(ب) ترم 1',
            pack_price: 110000,
            date: '1/10/1401',
            number: 2,
            selective: true
          },
          {
            id: 2,
            major_id: null,
            grade_id: 3,
            title: '(ج) ترم 1',
            pack_price: 110000,
            date: '6/11/1401',
            number: 3,
            selective: true
          },
          {
            id: 3,
            major_id: null,
            grade_id: 3,
            title: 'ترم 1 + (ب) ترم 2',
            pack_price: 110000,
            date: '18/12/1401',
            number: 4,
            selective: true
          },
          {
            id: 4,
            major_id: null,
            grade_id: 3,
            title: 'شبیه ساز 1',
            pack_price: 110000,
            date: '17/1/1402',
            number: 5,
            selective: true
          },
          {
            id: 5,
            major_id: null,
            grade_id: 3,
            title: 'شبیه ساز 2',
            pack_price: 110000,
            date: '14/2/1402',
            number: 6,
            selective: true
          },
          {
            id: 6,
            major_id: null,
            grade_id: 3,
            title: 'شبیه ساز 3',
            pack_price: 110000,
            date: '28/2/1402',
            number: 7,
            selective: true
          }
        ],
        prices: [
          {
            major_id: 0,
            grade_id: 0,
            unit: {
              price: 18900
            },
            pack: {
              unit_price: 18900,
              discount: 76000,
              price: 110000
            }
          }
        ]
      }
    ]
  }),
  created() {
    this.initPageData()
  },
  computed: {
    dataTable() {
      return this.activeTab.exams.filter(item => ((this.activeTab.majors.length > 0 ? item.major_id === this.selectedMajor.id : true) && (this.activeTab.grades.length > 0 ? item.grade_id === this.selectedGrade.id : true)))
    },
    currentMajors() {
      return this.activeTab.majors
    },
    currentGrades() {
      return this.activeTab.grades
    },
    description() {
      if (this.activeTab.id !== 3) {
        return this.activeTab.description
      }
      // return this.activeTab.description[this.selectedGrade.id].text
      return ''
    },
    selectiveRegister() {
      return false
    }
  },
  methods: {
    showMessageDialog () {
      this.messageDialog = true
    },
    initPageData() {
      this.setFirstExamActive()
      this.setFirstMajorsGradesSelected()
    },
    updateActiveTab(exam) {
      this.activeTab = exam
      this.setFirstMajorsGradesSelected()
    },
    setFirstMajorsGradesSelected() {
      if (this.currentMajors.length > 0) {
        this.selectedMajor = this.currentMajors[0]
      }

      if (this.currentGrades.length > 0) {
        this.selectedGrade = this.currentGrades[0]
      }
    },
    onResize(data) {
    },
    setFirstExamActive() {
      this.activeTab = this.tabPages[0]
    }
  }

}
</script>

<style scoped lang="scss">
.table-section {
  padding-bottom: 64px;

  .table-section-title {
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    color: #232323;
    text-align: center;
    margin-bottom: 28px;
  }

  .submit-table {
    background: #FFFFFF;
    box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);
    border-radius: 24px;
    &:deep(.q-btn) {
      .q-btn__content {
        margin: 0;
      }
    }
    .exams-q-select {
      display: none;
    }

    .tabs {
      padding: 15px;
      margin-bottom: 31px;
      box-shadow: 0 4px 16px rgba(224, 224, 224, 0.25);
      display: flex;
      justify-content: space-between;

      .exam-btn {
        border-radius: 24px;
        height: 38px;
        padding: 0 10px;

        .btn-text {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #232323;
          opacity: 0.7;
        }
      }

      .active-exam-btn {
        background: #FFBD07;
        border-radius: 24px;

        .btn-text {
          font-weight: 900;
        }
      }
    }

    .table-description {
      padding: 0 27px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #232323;
      margin-bottom: 30px;
    }

    .table-box-container {
      padding: 0 24px 24px 24px;

      .table-parent {
        border: 2px solid #DBDBDB;
        border-radius: 24px;

        .major-grade-btn {
          display: flex;
          border-bottom: none;
          padding: 16px;

          .dropdown-btn {

            &:deep(.q-icon ) {
              width: 15px;
              height: 10px;
            }

            &:deep(.q-field__control) {
              background: #E9E9E9;
              border-radius: 24px;
            }

            &:deep(.q-field__native ) {
              padding: 0 12.5px;
            }

            &:deep(.q-field__append ) {
              padding-right: 20px;
            }

            .custom-label-prefix {
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #232323;
            }
          }
        }

        .download-picture-box {
          width: 702px;
          background: #FFF2CB;
          border-radius: 0 0 0 22px;
          padding: 0;
          border-right: 1px solid #DBDBDB;
          &.download-picture-selective-mode{
            width: 699px;
          }

          .table-footer-container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            height: 100%;
            border-top: 1px solid #DBDBDB;

            .pic-container {
              width: 200px;
              align-self: end;

              .img {
                width: 100%;
                border-radius: 0 0 0 22px;

              }

            }

            .download-box {
              align-self: center;
              text-align: center;

              .text-style {
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 24px;
                text-align: center;
                color: #232323;
                margin-bottom: 16px;
              }

              .download-btn {
                width: 150px;
                height: 40px;
                background: #FFF2CB;
                border: 2px solid #2A2A2A;
                border-radius: 24px;
              }

            }
          }
        }

        .price-submit-in-footer {

          .price-box {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 75px;
            border-bottom: 1px solid #DBDBDB;
            border-top: 1px solid #DBDBDB;
            background: #F7F7F7;

            .single-price {
              font-weight: 500;
              font-size: 11px;
              line-height: 16px;
              font-style: normal;
              padding-bottom: 8px;
            }

            .price {
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 16px;
            }
          }

          .submit-box {
            padding: 16px 0;
            height: 163px;
            width: 100%;
            text-align: center;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .exam-price {
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 16px;
              color: #232323;
              margin-bottom: 12px;
            }

            .exam-price-box {
              margin-bottom: 7px;

              .discount-tag {
                padding: 4px 8px;
                color: #DB1F1F;
                background: #FFDEDE;
                border-radius: 8px;
                margin-right: 4px;
              }

              .main-price {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 16px;
                text-decoration-line: line-through;
                color: #DB1F1F;
              }
            }

            .final-price-box {
              font-style: normal;
              font-weight: 900;
              font-size: 20px;
              line-height: 16px;
              color: #232323;
              margin-bottom: 12px;
            }

            .sub-btn {
              width: calc(100% - 32px);
              height: 48px;
              background: #FFBD07;
              border-radius: 24px;

              .sub-btn-text {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 16px;
                color: #2B2B2B;
              }
            }
          }
        }
        .price-submit-box-pack-mode{
          width: 356px;
        }
        .price-submit-box-selective-mode{
            width: 179px ;
          &.border-right{
            border-right:1px solid #DBDBDB;
          }
        }

        .table {
          width: 100%;
          background: #fafafa;
          color: #232323 !important;
          border-width: 2px;
          border-style: hidden;
          border-collapse: collapse;
          border-top: 2px solid #DBDBDB;
          overflow: hidden;

          .svg{
            svg{
              width: 20px;
              height: 20px;
            }

          }

          td {
            padding: 8px 0;
            background: #FAFAFA;
            text-align: center;
            font-weight: 500;
            font-size: 12px;
            line-height: 24px;
          }

          th {
            padding: 8px 0;
          }

          tr {

            .top-of-table {
              padding: 0;
            }

            .table-title {
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #232323;
              border-top: 1px solid #DBDBDB;
              border-left: 1px solid #DBDBDB;
            }

            .custom-border {
              border-bottom: 1px solid #DBDBDB;
              border-left: 1px solid #DBDBDB;
            }

            .number {
              width: 97px;

            }

            .date {
              width: 95px;
            }

            .title {
              width: 509px;
            }

            .submitStatus {
              width: 357px;
            }

            .submitStatus-selective-mode {
              width: 180px;
              .empty-circle {
                border-radius: 24px;
                min-width: 21.5px;
                min-height: 21.5px;
                border: 2px solid #232323;
                cursor: pointer;
              }
            }
          }
        }
      }

    }
  }
}

@media screen and (max-width: 1439px) {
  .table-section {
    .submit-table {
      .major-grade-btn {
        display: flex;
      }
      .table-box-container{
        .table-parent{
          .price-submit-box-pack-mode{
            width: 297px;
          }
          .price-submit-box-selective-mode{
            width: 182px ;
          }
          .download-picture-box {
            width: 581px;
            &.download-picture-selective-mode{
              width: 514px;
            }
            .table-footer-container {
              .pic-container {
                width: 200px;
                align-self: end;
                .img {
                  width: 100%;
                  border-radius: 0 0 0 22px;

                }
              }

              .download-box {
                align-self: center;

                .text-style {
                  font-style: normal;
                  font-weight: 700;
                  font-size: 18px;
                  line-height: 24px;
                  text-align: center;
                  color: #232323;
                  margin-bottom: 16px;
                }

                .download-btn {
                  width: 150px;
                  height: 40px;
                  background: #FFF2CB;
                  border: 2px solid #2A2A2A;
                  border-radius: 24px;
                }

              }
            }
          }
          .table {
            width: 100%;

            tr {
              .number {
              }

              .date {

              }

              .title {
                width: 390px;
                &.title-selective-mod{
                  width: 316px;
                }
              }

              .submitStatus {
                width: 297px;
              }

            }
          }
        }
      }
    }
  }

}

@media screen and (max-width: 1023px) {
  .table-section {
    .submit-table {
      .table-description {
        font-size: 14px;
        line-height: 20px;
      }

      .table-box-container {
        .table-parent{
          .download-picture-box {
            width: 462px;
            &.download-picture-selective-mode{
              width: 398px;
            }

            .table-footer-container {

              .pic-container {
                width: 160px;
                align-self: end;

                .img {
                  width: 100%;
                  border-radius: 0 0 0 22px;

                }

              }

              .download-box {

                .text-style {
                  font-size: 16px;
                  line-height: 24px;
                }

                .download-btn {
                  width: 142px;
                  height: 32px;
                }

              }
            }
          }
          .price-submit-in-footer {
            width: 176px;
            .price-box {

              height: 64px;

              .single-price {
                font-size: 11px;
                line-height: 16px;
              }

              .price {
                font-size: 16px;
                line-height: 16px;
              }
            }

            .submit-box {
              padding-top: 8px;
              height: 123px;
              text-align: center;

              .exam-price {
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                color: #232323;
                margin-bottom: 0;
              }

              .exam-price-box {
                margin-bottom: 5px;

                .discount-tag {
                  padding: 4px 5px;
                  font-size: 10px;
                  line-height: 16px;
                  border-radius: 8px;
                  margin-right: 4px;
                }

                .main-price {
                  font-size: 10px;
                  line-height: 16px;
                  text-decoration-line: line-through;
                  color: #DB1F1F;
                }
              }

              .final-price-box {
                font-size: 16px;
                line-height: 16px;
                margin-bottom: 8px;
              }

              .sub-btn {
                width: 77px;
                height: 24px;

                .sub-btn-text {
                  font-weight: 700;
                  font-size: 14px;
                  line-height: 16px;
                }
              }
            }
          }
          .price-submit-box-selective-mode{
            width: 119px;
          }
          .table {
            width: 100%;

            tr {
              .number {
                width: 97px;
              }

              .date {
                width: 97px;

              }

              .title {
                width: 272px;
                &.title-selective-mod{
                  width: 208px;
                }

              }

              .submitStatus {
                width: 177px;
              }
              .submitStatus-selective-mode {
                width: 121px;
              }
              .price-submit-box-pack-mode{
                //width: 100%;
              }
              .price-submit-box-selective-mode{
                //width: 50%;
              }

            }
          }
        }

      }

    }
  }

}

@media screen and (max-width: 765px) {
  .table-section {
    padding-bottom: 56px;

    .table-section-title {
      font-size: 24px;
      line-height: 42px;
    }

    .submit-table {
      padding: 24px;

      .table-description {
        padding: 0;
        line-height: 18px;
      }

      .tabs {
        display: none;
      }

      .exams-q-select {
        display: block;
        margin-bottom: 16px;

        &:deep(.q-icon ) {
          width: 15px;
          height: 10px;
        }

        &:deep(.q-field__native ) {
          padding: 0 12.5px;
          font-weight: 900;
          font-size: 14px;
          line-height: 24px;
          color: #2B2B2B;
        }

        &:deep(.q-field__control) {
          background: #FFBD07;
          border-radius: 24px;
          border: 1px solid black;
        }

        &:deep(.q-field__append ) {
          padding-right: 20px;
        }
      }

      .major-grade-btn {
        display: flex;
      }

      .table-box-container {
        padding: 0;

        .table-parent{
          .download-picture-box{
            width: 279px;
            .table-footer-container{
              .pic-container{
                width: 124px;
              }
              .download-box{
                margin-left: -35px;
                .text-style{
                  font-weight: 700;
                  font-size: 12px;
                  line-height: 16px;
                  text-align: left;
                }
                .download-btn{
                  width: 130px;
                  height: 32px;
                  span{
                    font-size: 12px;
                  }
                }
              }
            }

            &.download-picture-selective-mode{
              width: 251px;
            }
          }
          .price-submit-in-footer {
              width: 179px;
            .price-box {

              height: 64px;

              .single-price {
                font-size: 11px;
                line-height: 16px;
              }

              .price {
                font-size: 16px;
                line-height: 16px;
              }
            }

            .submit-box {
              padding-top: 8px;
              height: 123px;
              text-align: center;

              .exam-price {
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                color: #232323;
                margin-bottom: 0;
              }

              .exam-price-box {

                .discount-tag {
                  padding: 4px 5px;
                  font-size: 10px;
                  line-height: 16px;
                  border-radius: 8px;
                  margin-right: 4px;
                }

                .main-price {
                  font-size: 10px;
                  line-height: 16px;
                  text-decoration-line: line-through;
                  color: #DB1F1F;
                }
              }

              .final-price-box {
                font-size: 16px;
                line-height: 16px;
                margin-bottom: 8px;
              }

              .sub-btn {
                width: 77px;
                height: 24px;

                .sub-btn-text {
                  font-weight: 700;
                  font-size: 14px;
                  line-height: 16px;
                }
              }
            }
          }
          .price-submit-box-selective-mode{
            width: 103px ;
            .submit-box {
              padding-top: 8px;
              height: 123px;
              text-align: center;

              .exam-price {
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
              }

              .exam-price-box {

                .discount-tag {
                  font-size: 9px;
                }
              }

              .final-price-box {
                font-size: 16px;
                line-height: 16px;
                margin-bottom: 8px;
              }

              .sub-btn {
                width: 77px;
                height: 24px;

                .sub-btn-text {
                  font-weight: 700;
                  font-size: 14px;
                  line-height: 16px;
                }
              }
            }
          }
          .table {
            width: 100%;

            .svg{
              svg{
                width: 16px;
                height: 16px;
              }

            }

            tr {
              .number {
                width: 56px;
                &.number-selective{
                  width: 49px;
                }
              }

              .date {
                width: 60px;
                &.date-selective{
                  width: 49px;
                }
              }

              .title {
                width: 164px;
                &.title-selective-mod{
                  width: 151px;
                }
              }

              .submitStatus {
                width: 181px;
              }

              .submitStatus-selective-mode {
                width: 108px;
              }
            }
          }
        }

      }

    }
  }

}

@media screen and (max-width: 599px) {
  .table-section {
    margin-bottom: 40px !important;

    .table-section-title {
      font-size: 20px;
    }

    .submit-table {
      padding: 0;
      .exams-box{
        padding: 30px;
      }
      .table-description{
        margin-bottom: 0;
      }

      .table-description {
        padding: 0;
        line-height: 18px;
      }

      .tabs {
        display: none;
      }

      .exams-q-select {
        display: block;
        margin-bottom: 16px;

        &:deep(.q-icon ) {
          width: 15px;
          height: 10px;
        }

        &:deep(.q-field__native ) {
          padding: 0 12.5px;
          font-weight: 900;
          font-size: 14px;
          line-height: 24px;
          color: #2B2B2B;
        }

        &:deep(.q-field__control) {
          background: #FFBD07;
          border-radius: 24px;
          border: 1px solid black;
        }

        &:deep(.q-field__append ) {
          padding-right: 20px;
        }
      }

      .major-grade-btn {
        display: flex;
      }

      .table-box-container {
        padding: 0;

        .table-parent {
          .major-grade-btn {
            flex-direction: column;

            .dropdown-btn {
              width: 100%;

              &:deep(.q-icon ) {
                width: 9px;
                height: 4px;
              }

              &:deep(.q-field__native ) {
                padding: 0 12.5px;
              }

              &:deep(.q-field__append ) {
                padding-right: 12px;
              }
              &.first{
                margin-bottom: 16px;
              }

              .custom-label-prefix {
                font-weight: 700;
                font-size: 12px;
                line-height: 24px;
              }
            }
          }

          .download-picture-box {
            order: 2;
            width: 100%;
            border-radius: 22px 0 22px 22px;
            border-top: 1px solid #DBDBDB;

            .table-footer-container {

              .pic-container {
                width: 100px;
              }

              .download-box {
                align-self: center;
                justify-self: center;

                .text-style {
                  display: none;
                }

                .download-btn {
                  width: 130px;
                  height: 32px;
                  background: #FFF2CB;
                  border-width: 1px;

                  span {
                    font-size: 12px;
                  }
                }

              }
            }
            &.download-picture-selective-mode{
              width: 100%;
            }
          }

          .price-submit-in-footer {
                width:108px ;
              .price-box {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 75px;
                border-bottom: 1px solid #DBDBDB;
                background: #F7F7F7;

                .single-price {
                  font-weight: 500;
                  font-size: 11px;
                  line-height: 16px;
                  font-style: normal;
                  padding-bottom: 8px;
                }

                .price {
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 16px;
                }
              }

              .submit-box {
                padding-top: 8px;
                height: 120px;
                width: 100%;

                .exam-price {
                  font-style: normal;
                  font-weight: 500;
                  font-size: 11px;
                  line-height: 16px;
                  margin-bottom: 0;
                }

                .exam-price-box {
                  //display: none;
                }

                .final-price-box {
                  font-weight: 900;
                  font-size: 16px;
                  line-height: 16px;
                  margin-bottom: 4px;
                }

                .sub-btn {
                  width: calc(100% - 30px);
                  height: 32px;

                  .sub-btn-text {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 16px;
                    color: #2B2B2B;
                  }
                }
              }
            }

          .price-submit-box-pack-mode{
            width: 100%;
          }
          .price-submit-box-selective-mode{
            width: 50%;
            &.border-right{
              border-right:none;
            }
            .submit-box{
              border-right:1px solid #DBDBDB;
            }

          }

          .table {
            width: 100%;
            .svg{
              svg{
                width: 13px;
                height: 13px;
              }

            }

            td {
              font-style: normal;
              font-weight: 500;
              font-size: 8px;
              line-height: 24px;
            }

            tr {
              .table-title {
                font-weight: 700;
                font-size: 8px;
                line-height: 24px;
              }

              .number {
                width: 32px;
              }

              .date {
                width: 34px;
              }

              .title {
                width: 93px;
              }

              .submitStatus {
                width: 129px;
              }

              .submitStatus-selective-mode {
                width: 65px;

                .empty-circle {
                  min-width: 14.5px;
                  min-height: 14.5px;
                  border-width: 1px;
                }
              }
            }
          }
        }

      }

    }
  }

}
</style>
