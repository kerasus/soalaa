<template>
  <q-dialog :model-value="dialog"
            persistent>
    <q-card class="custom-card signup-dialog-card">
      <q-card-section>
        <q-btn color="primary"
               flat
               icon="close"
               @click="toggleDialog" />
      </q-card-section>
      <q-card-section>
        <q-stepper ref="stepper"
                   v-model="step"
                   color="primary"
                   flat
                   header-class="stepper-fire-day-landing-header-less"
                   class="signup-dialog-stepper"
                   animated>
          <q-step :name="'signup'"
                  title="signup">
            <signup-step @goto-next-step="gotoNextStep"
                         @update-user="updateUser($event)" />
          </q-step>
          <q-step v-if="localOptions.verification"
                  :name="'verification'"
                  title="verification">
            <verification-step :userInfo="userForm"
                               @update-user="updateUser($event)"
                               @goto-next-step="gotoNextStep"
                               @goto-prev-step="gotoPrevStep" />
          </q-step>
          <q-step :name="'info'"
                  title="info">
            <info-completion :options="localOptions.userInputs"
                             :userInfo="userForm"
                             @toggle-dialog="toggleDialog" />
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SignupStep from './components/SignupStep.vue'
import VerificationStep from './components/VerificationStep.vue'
import InfoCompletion from './components/InfoCompletion.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'SignupModal',
  components: {
    SignupStep,
    VerificationStep,
    InfoCompletion
  },
  mixins: [mixinWidget],
  data() {
    return {
      dialog: false,
      userForm: {
        mobile: null,
        code: null
      },
      step: 'signup',
      defaultOptions: {
        eventName: 'newsletter',
        verification: true,
        userInputs: {
          first_name: true,
          last_name: true,
          major: true,
          grade: true
        }
      }
    }
  },
  mounted() {
    if (this.$bus) {
      this.$bus.on(this.localOptions.eventName, this.toggleDialog)
    }
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog
    },
    gotoNextStep() {
      this.$refs.stepper.next()
    },
    gotoPrevStep() {
      this.$refs.stepper.previous()
    },
    updateUser(userInfo) {
      this.userForm = userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-dialog-card{
  width: 432px;
  height: 487px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  &:deep(.q-stepper__header) {
    display: none !important;
  }
  &:deep(.q-stepper__step-inner) {
    padding: 0 !important;
  }
}

</style>
