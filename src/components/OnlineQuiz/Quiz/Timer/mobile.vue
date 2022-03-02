<template>
  <div style="bottom: 0; margin-bottom: 25px;">
    <v-row style="padding-left: 0">
      <v-col
        cols="7 "
        class="col-sm-6 btnCol"
      >
        <div class="sideBtns  elevation-3">
          <v-row>
            <v-col class="d-flex justify-center">
              <v-icon
                class="sideBtnIcons "
                @click="goToPrevQuestion('onlineQuiz.alaaView')"
              >
                mdi-chevron-right
              </v-icon>
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              cols="1"
            >
              <svg
                class="spacer"
                viewBox="2228.5 627.403 0.20000000298023224 20"
              >
                <path
                  id="spacer"
                  d="M 2228.5 627.4031982421875 L 2228.5 647.4031982421875"
                />
              </svg>
            </v-col>
            <v-col class="d-flex justify-center">
              <v-icon
                class="sideBtnIcons  "
                @click="goToNextQuestion('onlineQuiz.alaaView')"
              >
                mdi-chevron-left
              </v-icon>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col class="col-sm-3 col-3 timerCol">
        <div
          id="clockBtn"
          class="timeCArdMob d-flex justify-center elevation-3"
          style="float:left;"
          @click="drawerUp"
        >
          <svg
            class="timerMob  justify-center"
            viewBox="0 0.175 13.474 15.719"
          >
            <path
              id="timer"
              d="M 8.982000350952148 0.1749999970197678 L 8.982000350952148 1.6839998960495 L 4.491000175476074 1.6839998960495 L 4.491000175476074 0.1749999970197678 L 8.982000350952148 0.1749999970197678 Z M 6 9.928999900817871 L 6 5.439000129699707 L 7.473999977111816 5.439000129699707 L 7.473999977111816 9.930000305175781 L 6 9.930000305175781 Z M 12 4.98199987411499 C 12.98266696929932 6.198666572570801 13.47399997711182 7.590332984924316 13.47399997711182 9.156999588012695 C 13.47399997711182 11.02833271026611 12.81900024414063 12.61899948120117 11.50899982452393 13.92899894714355 C 10.19899940490723 15.23899841308594 8.608333587646484 15.89399814605713 6.736999988555908 15.89399909973145 C 4.86566686630249 15.89400005340576 3.275000333786011 15.23899936676025 1.965000152587891 13.92899894714355 C 0.6549999713897705 12.61899852752686 0 11.03433227539063 0 9.175000190734863 C 0 7.315668106079102 0.6549999713897705 5.725001811981201 1.965000033378601 4.403000354766846 C 3.275000095367432 3.08099889755249 4.865666389465332 2.420332193374634 6.736999988555908 2.421000003814697 C 8.304333686828613 2.421000003814697 9.708000183105469 2.923999786376953 10.94799995422363 3.929999828338623 L 12.00099945068359 2.841999769210815 C 12.37499904632568 3.145999908447266 12.725998878479 3.496999740600586 13.05399894714355 3.894999742507935 L 12 4.98199987411499 Z M 6.736999988555908 14.42099952697754 C 8.187000274658203 14.42099952697754 9.420999526977539 13.90633296966553 10.43900012969971 12.8769998550415 C 11.45700073242188 11.84766674041748 11.96566677093506 10.60799980163574 11.96500015258789 9.157999992370605 C 11.96433353424072 7.707999706268311 11.45566654205322 6.473999977111816 10.43900012969971 5.456000328063965 C 9.422333717346191 4.438000679016113 8.188333511352539 3.929333925247192 6.736999988555908 3.930000066757202 C 5.285666465759277 3.930666208267212 4.051666259765625 4.439332962036133 3.035000085830688 5.455999851226807 C 2.018333911895752 6.47266674041748 1.509667158126831 7.706666946411133 1.508999943733215 9.157999992370605 C 1.5083327293396 10.60933303833008 2.016999244689941 11.8489990234375 3.034999847412109 12.8769998550415 C 4.053000450134277 13.90500068664551 5.287000179290771 14.41966724395752 6.736999988555908 14.42099952697754 Z"
            />
          </svg>
        </div>
      </v-col>
    </v-row>
    <div
      class="drawer elevation-3 d-flex justify-center "
      :style="{height: drawerVisible ? '80px' : '0'}"
    >
      <div class="timerInfo">
        <p class="passedTimeText">
          زمان گذشته
          {{ passedTime }}
        </p>
        <p
          v-if="remainingTime && currentCat"
          class="remainingTimeText"
        >
          دقیقه تا پایان مهلت پاسخگویی
          {{ currentCat.title }}
          {{ remainingTime }}
        </p>
      </div>
      <v-icon
        class="closeIcon"
        @click="drawerVisible = false"
      >
        mdi-close
      </v-icon>
    </div>
  </div>
</template>

<script>
    import {mixinQuiz} from "@/mixin/Mixins";

    export default {
        name: 'MobileTimer',
        mixins: [mixinQuiz],
        props: [
            'currentCat',
            'passedTime',
            'remainingTime'
        ],
        data: () => ({
            drawerVisible: false,
        }),
        methods: {
            drawerUp() {
                this.drawerVisible = true
            },
        },

    }
</script>

<style scoped>
     .col-sm-6, .col-sm-5,  .col-3 {
        padding-bottom: 0!important;
    }
     .timerCol{
         position: absolute;
         left: 3%;
     }
     .btnCol{
         padding-right: 0;
         right: 5%;
         position: relative;
     }
    @media only screen and (max-width: 500px) {
        .timeCArdMob {
            margin-left: 0%;
            width: 100%;
        }

        .space {
            width: 0px;
        }

        .drawer {
            width: 90%;
            left: 5%;
        }

        .passedTimeText {
            font-size: 2.2vw;
        }

        .remainingTimeText {
            font-size: 2.2vw;
        }
    }

    @media only screen and (min-width: 500px)and (max-width: 601px) {
        .timeCArdMob {
            margin-left: 0%;
            width: 100%;

        }

        .space {
            width: 10%;
        }

        .drawer {
            width: 90%;
            left: 5%;
        }

        .passedTimeText {
            font-size: 2.2vw;
        }

        .remainingTimeText {
            font-size: 2.2vw;
        }
    }

    @media only screen and (min-width: 601px)and (max-width: 700px) {
        .timeCArdMob {
            margin-left: 6%;
            width: 80%;
        }

        .space {
            width: 0px;
        }

        .drawer {
            width: 90%;
            left: 5%;
        }

        .passedTimeText {
            font-size: 2vw;
        }

        .remainingTimeText {
            font-size: 2vw;
        }
    }

     @media only screen and (min-width: 700px) {
       .timeCArdMob {
         margin-left: 6%;
         width: 50%;
       }
     }

    .remainingTimeText {
        margin-right: 10px
    }

    .passedTimeText {
        margin-right: 10px;
        margin-left: 10px
    }

    .timerInfo {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 80%
    }

    .timeCArdMob {
        background-color: white;
        height: 50px;
        border-radius: 15px 15px 0 0;
    }

    .closeIcon {
        float: left;
        background-color: rgba(255, 255, 255, 1);
        margin-left: 0px;
        margin-top: 10px;
        font-size: 5vw;
        margin-right: 0;
        color: rgba(112, 112, 112, 1);
    }

    .sideBtnIcons {
        margin: auto;
    }

    .sideBtns {
        width: 100%;
        height: 50px;
        float: left;
        display: flex;
        background-color: white;
        border-radius: 15px 15px 0 0;
    }


    .timerMob {
        fill: rgba(136, 136, 136, 1);
        width: 13.474px;
        height: 15.719px;
        margin: auto;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }

    .drawer {
        position: absolute;
        bottom: 0;

        overflow: hidden;
        height: 0;
        padding-bottom: 0;
        z-index: 200;
        transition: all 0.2s;
        border-radius: 15px 15px 0 0;
        background-color: rgba(255, 255, 255, 1);


    }
     #spacer {
         fill: transparent;
         stroke: rgba(112,112,112,1);
         stroke-width: 0.20000000298023224px;
         stroke-linejoin: miter;
         stroke-linecap: butt;
         stroke-miterlimit: 4;
         shape-rendering: auto;
     }
     .spacer {
         overflow: visible;
         position: absolute;
         width: 0.2px;
         height: 20px;
         transform: matrix(1,0,0,1,0,0);
     }
</style>
