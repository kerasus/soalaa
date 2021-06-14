<template>
  <!-- ------------------------- question -------------------------------  -->
  <div>
    <div v-if="status == 'question.create'">
      <Question
        v-for="(item, index) in fakeData2"
        :key="index"
        v-model="item.value"
        :edit-status="item.editStatus"
        :data="item"
      />
    </div>
    <div v-if="status == 'question.show' && editModeStatus">
      <div>
        <Question
          v-for="(item, index) in fakeData2"
          :key="index"
          v-model="item.value"
          :edit-status="item.editStatus"
          :data="item"
        />
      </div>
    </div>
    <div v-if="status == 'question.edit' && !editModeStatus" />
  </div>
</template>
<script>
import Question from '@/components/Question/questionField'

export default {
  name: "Questions",
  components: {
    Question,
  },
  props: {
    status
  },
  data() {
    return {
      editModeStatus: false,
      fakeData: [
        {
          editStatus: true,
          line: 5,
          label: 'صورت سوال',
        },
        {
          editStatus: true,
          line: 3,
          label: 'گزینه 1',
        },
        {
          editStatus: true,
          line: 3,
          label: 'گزینه 2',
        },
        {
          editStatus: true,
          line: 3,
          label: 'گزینه 3',
        },
        {
          editStatus: true,
          line: 3,
          label: 'گزینه 4',
        }
        ,
        {
          editStatus: true,
          line: 5,
          label: 'پاسخ تشریحی',
        }
      ],
      fakeData2: [
        {
          value: 'پيوندهايى كه منشأ تشكيل ساختار دوم در پروتئین هموگلوبین هستند، ممكن  ..................',
          editStatus: false,
          line: 5,
          label: 'صورت سوال',
        },
        {
          value: 'است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند.',
          editStatus: false,
          line: 3,
          label: 'گزینه 1',
        },
        {
          value: 'است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند',
          editStatus: false,
          line: 3,
          label: 'گزینه 2',
        },
        {
          value: 'است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند',
          editStatus: false,
          line: 3,
          label: 'گزینه 3',
        },
        {
          value: 'است بین زیرواحد‌های سازندۀ هر رشتۀ پلی‌نوکلئوتیدی دنا مشاهده شوند',
          editStatus: false,
          line: 3,
          label: 'گزینه 4',
        }
        ,
        {
          value: 'متنوع‌ترین گروه مولکول‌های زیستی پروتئین‌ها هستند، که همۀ آنها در ساختار خود پیوند هیدروژنی دارند. بررسی سایر گزینه‌ها: گزینۀ : بعضی آنزیم‌ها برای فعالیت به یون‌های فلزی مانند آهن، مس و یا مواد آلی مثل ویتامین‌ها نیاز دارند. كوآنزيم تنها نام مواد آلى است كه عامل تسهيل فعاليت و افزايش سرعت عملكرد آنزيم‌هاست. گزینۀ \\displaystyle (2)(2): آنزیم‌ها امکان برخورد مناسب مولکول‌ها را افزایش می‌دهند و انرژی فعال‌سازی واکنش را کاهش می‌دهند. هر آنزیم روی یک یا چند پیش‌مادۀ خاص مؤثر است. گزینۀ \\displaystyle (3)(3): گروهی از آنزیم‌هایی مثل پمپ سدیم – پتاسیم فعالیت خود را در غشا انجام می‌دهند.',
          editStatus: false,
          line: 5,
          label: 'پاسخ تشریحی',
        }
      ]

    }
  },

}
</script>

<style scoped>

</style>