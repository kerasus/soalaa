<template>
  <div class="ticket">
    <entity-create
      ref="EntityCreate"
      v-model:value="inputs"
      :title=this.department.title
      :api="api"
      :entity-id-key-in-response="entityIdKeyInResponse"
      :show-route-param-key="showRouteParamKey"
      :index-route-name="indexRouteName"
      :show-route-name="showRouteName"
      :show-save-button="false"
    >
      <template #before-form-builder>
        <div
          v-if="beforeFormBuilder"
        >
          <q-dialog
            v-model="showDialog"
            no-backdrop-dismiss
          >
            <q-card
              class="flex justify-center">
              <div v-for="(department, index) in departments"
                   :key="index"
                   v-close-popup
                   class="departmentForSelect col-2 q-my-md "
                   @click="selectDepartment(department)">
                <q-btn
                  flat
                  class="departmentActionBtn"
                  icon="isax:search-status .path4:before"
                />
                <div
                  class="departmentTitle flex justify-center"
                  v-html="department.title"
                />
              </div>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </entity-create>
    <q-separator class="q-my-md" />
    <div>
      <send-message-input ref="SendMessageInput"
                          :send-loading="sendLoading"
                          :show-send-private="false"
                          @creatTicket="sendTicket"
      />
    </div>
  </div>
</template>

<script>
import SendMessageInput from 'components/Ticket/SendMessageInput'
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: {
    EntityCreate,
    SendMessageInput
  },
  data () {
    return {
      sendLoading: null,
      showDialog: false,
      expanded: true,
      api: API_ADDRESS.ticket.create.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'User.Ticket.Show',
      indexRouteName: 'User.Ticket.Index',
      department: {
        id: 0,
        title: 'دپارتمان'
      },
      departments: [
        {
          id: '1',
          title: 'آموزش'
        }, {
          id: '2',
          title: 'مالی'
        }, {
          id: '3',
          title: 'استخدام'
        }, {
          id: '4',
          title: 'پرچم'
        }, {
          id: '5',
          title: 'راه ابریشم'
        }, {
          id: '6',
          title: 'فنی'
        }, {
          id: '7',
          title: 'مشاوره خرید'
        }, {
          id: '8',
          title: 'حمایت مردمی'
        }, {
          id: '9',
          title: 'تفتان'
        }, {
          id: '10',
          title: 'آرش'
        }, {
          id: '11',
          title: 'تتا'
        }, {
          id: '12',
          title: 'سه آ'
        }, {
          id: '13',
          title: 'طرح حکمت'
        }
      ],
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          value: '',
          label: 'عنوان',
          col: 'col-md-6'
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'separator',
              label: 'اولویت: ',
              vertical: 'false',
              col: 'col-md-1'
            },
            {
              type: 'toggleButton',
              name: 'priority_id',
              responseKey: 'data.priority',
              value: '',
              options: [
                {
                  label: 'کم',
                  value: '1'
                },
                {
                  label: 'متوسط',
                  value: '2'
                },
                {
                  label: 'فوری',
                  value: '3'
                },
                {
                  label: 'بحرانی',
                  value: '4'
                }
              ],
              toggleColor: 'blue',
              textColor: 'white',
              toggleTextColor: 'white',
              col: 'col-md-4 priority-toggle-button',
              size: '22px'
            }
          ]
        }
      ],
      beforeFormBuilder: true,
      afterFormBuilder: true
    }
  },
  created () {
    this.setDefaultDepartment()
  },
  methods: {
    setDefaultDepartment () {
      this.showDialog = false
      this.department = this.departments.find(item => item.id === '12')
    },
    showMessagesInNotify (messages, type) {
      messages.forEach((message) => {
        this.$q.notify({
          // ...(message.type && { type: message.type }),
          type: type || 'negative',
          message
        })
      })
    },

    getInputsValue (inputName) {
      return this.inputs.find(input => input.name === inputName).value
    },

    hasRequiredField () {
      const errorMessages = []
      if (!this.getInputsValue('title')) {
        errorMessages.push('پر کردن فیلد <عنوان> ضروری میباشد')
      }
      const formBuilderCol = this.getInputsValue('formBuilderCol')
      const toggleButton = formBuilderCol.find(item => item.name === 'priority_id').value
      if (!toggleButton) {
        errorMessages.push('<اولویت> پیام خود را انتخاب کنید')
      }
      this.showMessagesInNotify(errorMessages)
      return !errorMessages.length > 0
    },

    setTicketFormData (data) {
      const formData = new FormData()

      if (data.photo) {
        formData.append('photo', data.photo, 'photo.jpeg')
      }

      if (data.body) {
        this.$refs.EntityCreate.getValues().forEach(input => {
          if (input.name === 'body') {
            input.value = data.body
          }
        })
        formData.append('body', data.body.replace(/\r?\n/g, '<br/>'))
      }

      if (data.voice) {
        formData.append('voice', data.voice, 'voice.ogg')
      }

      if (data.isPrivate) {
        formData.append('is_private', 1)
      }

      formData.append('department_id', this.department.id)

      formData.append('title', this.getInputsValue('title'))

      const formBuilderCol = this.getInputsValue('formBuilderCol')
      const priorityId = formBuilderCol.find(item => item.name === 'priority_id').value
      formData.append('priority_id', priorityId)

      return formData
    },

    sendTicket (data) {
      if (!this.hasRequiredField()) {
        return
      }
      const formData = this.setTicketFormData(data)
      this.sendCreateTicketReq(formData)
    },

    async sendCreateTicketReq (formData) {
      this.sendLoading = true
      try {
        const response = await this.callSendApi(formData)
        this.$refs.SendMessageInput.clearMessage()
        this.showMessagesInNotify(['تیکت شما با موفقیت ایجاد شد'], 'positive')
        this.sendLoading = false
        await this.$router.push({
          name: 'User.Ticket.Show',
          params: { id: response.data.data.id }
        })
      } catch (e) {
        this.sendLoading = false
      }
    },

    callSendApi (formData) {
      return this.$axios.post(this.api, formData)
    },

    createBlob (dataURL) {
      const BASE64_MARKER = ';base64,'
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',')
        const contentType = parts[0].split(':')[1]
        const raw = decodeURIComponent(parts[1])
        return new Blob([raw], { type: contentType })
      }
      const parts = dataURL.split(BASE64_MARKER)
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new Blob([uInt8Array], { type: contentType })
    },

    selectDepartment (department) {
      this.department = department
    }
  }
}
</script>

<style scoped lang="scss">
.ticket {
  :deep(.entity-create) {
    .form-builder-toggle-button-col {
      &.priority-toggle-button {
        .q-btn {
          width: 60px;
          min-width: 60px;
          margin-left: 5px;
        }
      }
    }
  }
}
:deep(.departmentForSelect) {
  cursor: pointer;
  border-radius: 0;

  &:hover {
    background-color: var(--alaa-Primary);
    color: white;
  }

  .departmentActionBtn {
    border-radius: 0;
    width: 100px;
    height: 100px;
    padding: 0;

    .q-focus-helper {
      display: none;
    }
  }

}

:deep(.form-builder-separator-col) {
  display: flex;
  align-items: center;
}

:deep(.q-btn-group) {
  box-shadow: none;

  .q-btn-item:last-child {
  }
}

</style>
