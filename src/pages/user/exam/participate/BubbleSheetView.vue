<template>
  <v-container :fluid="true">
    <v-row>
      <v-col>
        <BubbleSheet
          :info="{ type: 'pasokh-barg' }"
          @clickChoice="choiceClicked"
        />
      </v-col>
    </v-row>
    <v-footer
      class="justify-center pl-0"
      color="transparent"
      elevation="0"
      padless
      inset
      app
    >
      <v-container
        fluid
        class="py-0"
      >
        <v-row class="timer-row justify-center">
          <v-col
            :md="10"
            class="d-flex justify-center timer-container py-0"
          >
            <Timer
              :daftarche="'عمومی'"
              :quiz-started-at="1607963897"
              :daftarche-end-time="1607963897"
              :height="100"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-container>
</template>

<script>
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import { mixinQuiz, mixinDrawer, mixinWindowSize } from '@/mixin/Mixins'
    import Timer from "@/components/OnlineQuiz/Quiz/Timer/Timer";
    export default {
        name: 'BubbleSheetView',
        components: {BubbleSheet, Timer},
        mixins: [mixinQuiz, mixinDrawer, mixinWindowSize],
        created() {
            // this.showAppBar()
            // this.updateDrawerBasedOnWindowSize()
            this.startExam()
        },
        methods: {
            choiceClicked (questionId, choiceId) {
                this.answerClicked({questionId, choiceId})
            },
        }
    }
</script>

<style>
    .timeCArdMob {
        width: 100%;
    }

    .timer-row {
        width: 100%;
        position: absolute;
        bottom: 12px;
    }

    .timer-row .col {
        padding: 0;
    }
</style>
