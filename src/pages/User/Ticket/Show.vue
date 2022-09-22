<template>
  <div class="row justify-center">
    <div class="col-12 q-mb-xl">
      <entity-show
        ref="entityEdit"
        v-model:value="inputs"
        :show-save-button="false"
        :title="'شماره تیکت ' + searchForInputVal('id') + ' در ' + searchForInputVal('department_title')"
        :api="api"
        :entity-id-key="entityIdKey"
        :entity-param-key="entityParamKey"
        :index-route-name="indexRouteName"
        :after-load-input-data="checkLoadInputData"
        :show-edit-button="false"
      >
        <template #before-form-builder>
          <div class="flex justify-around">
            <q-btn rounded
                   color="blue"
                   icon="isax:archive-book"
                   @click="openCloseLogDrawer">
              <q-tooltip>
                باز شدن لیست اتفاقات
              </q-tooltip>
            </q-btn>
            <q-btn v-if="isUserAdmin"
                   rounded
                   color="blue"
                   icon="isax:shopping-cart"
                   @click="openShopLogList">
              <q-tooltip>
                باز شدن لیست خرید
              </q-tooltip>
            </q-btn>
          </div>
        </template>
        <template #after-form-builder>
          <ticket-rate
            v-if="!isUserAdmin"
            :rate="searchForInputVal('rate')"
            :ticket-id="searchForInputVal('id')"
            class="q-ml-lg q-mt-lg" />
        </template>
      </entity-show>
      <messages v-for="item in userMessageArray"
                :key="item"
                :is-user-admin="isUserAdmin"
                :data="item"
      />
      <send-message-input ref="SendMessageInput"
                          :send-loading="sendMessageLoading"
                          :show-send-private="false"
                          class="SendMessageInput"
                          @sendText="sendMessageText"
                          @sendImage="sendMessageImage"
                          @sendVoice="sendMessageVoice"
                          @creatTicket="sendTicket"
      />
      <drawer :is-open="logDrawer"
              max-width="310px"
              side="left"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 unelevated
                 class="close-btn"
                 @click="logDrawer = false" />
          <div class="q-my-md flex content-between">
            <q-tabs
              v-model="panel"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="events"
                     label="رویداد ها" />
            </q-tabs>
          </div>
          <q-tab-panels v-model="panel"
                        class="tab-panels"
                        animated>
            <q-tab-panel name="events">
              <log-list :log-array="ticketLogs" />
            </q-tab-panel>
          </q-tab-panels>
        </q-scroll-area>
      </drawer>
      <drawer :is-open="orderDrawer"
              max-width="1016px"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 class="close-btn"
                 unelevated
                 @click="orderDrawer = false" />
          <user-order-list :user-orders-list="userOrderData?.list"
                           :loading="orderLoading" />
        </q-scroll-area>
      </drawer>
    </div>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import Messages from 'components/Ticket/Messages'
import TicketRate from 'components/Ticket/TicketRate'
import LogList from 'components/Ticket/LogList'
import Drawer from 'components/CustomDrawer'
import UserOrderList from 'components/Ticket/userOrderList'
import API_ADDRESS from 'src/api/Addresses'
import { CartItemList } from 'src/models/CartItem'
import SendMessageInput from 'components/Ticket/SendMessageInput'
import { mixinDateOptions, mixinTicket } from 'src/mixin/Mixins'

export default {
  name: 'Show',
  mixins: [mixinDateOptions, mixinTicket],
  components: { EntityShow, Messages, LogList, UserOrderList, TicketRate, SendMessageInput, Drawer },
  data () {
    return {
      isUserAdmin: false,
      sendMessageLoading: false,
      renderComponent: true,
      logDrawer: false,
      orderDrawer: false,
      orderLoading: false,
      panel: 'events',
      userOrderData: null,
      isDataLoaded: false,
      userId: null,
      userMessageArray: [],
      expanded: true,
      api: API_ADDRESS.ticket.show.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      indexRouteName: 'User.Ticket.Index',
      departments: [
        {
          title: 'آموزش',
          id: 1
        }, {
          title: 'مالی',
          id: 2
        }, {
          title: 'استخدام',
          id: 3
        }, {
          title: 'پرچم',
          id: 4
        }, {
          title: 'راه ابریشم',
          id: 5
        }, {
          title: 'فنی',
          id: 6
        }, {
          title: 'مشاوره خرید',
          id: 7
        }, {
          title: 'حمایت مردمی',
          id: 8
        }, {
          title: 'تفتان',
          id: 9
        }, {
          title: 'آرش',
          id: 10
        }, {
          title: 'تتا',
          id: 11
        }, {
          title: 'سه آ',
          id: 12
        }, {
          title: 'طرح حکمت',
          id: 13
        }
      ],
      status: [
        {
          title: 'پاسخ داده نشده',
          id: 1
        },
        {
          title: 'در حال بررسی',
          id: 2
        },
        {
          title: 'پاسخ داده شده',
          id: 3
        },
        {
          title: 'بسته شده',
          id: 4
        }
      ],
      inputs: [
        { type: 'input', name: 'title', responseKey: 'ticket.title', label: 'عنوان', col: 'col-md-12', disable: true },

        { type: 'input', name: 'first_name', responseKey: 'ticket.user.first_name', label: 'نام', col: 'col-md-3', disable: true },
        { type: 'input', name: 'last_name', responseKey: 'ticket.user.last_name', label: 'نام خانوادگی', col: 'col-md-3', disable: true },
        { type: 'input', name: 'national_code', responseKey: 'ticket.user.national_code', label: 'کد ملی', col: 'col-md-3', disable: true },
        { type: 'input', name: 'major', responseKey: 'ticket.user.major.name', label: 'رشته', col: 'col-md-3', disable: true },

        { type: 'dateTime', name: 'created_at', responseKey: 'ticket.created_at', label: 'تاریخ ایجاد', col: 'col-md-4', disable: true },
        { type: 'input', name: 'priority', responseKey: 'ticket.priority.title', label: 'اولویت', col: 'col-md-4', disable: true },
        // { type: 'select', name: 'department', options: [], optionLabel: 'title', optionValue: 'id', responseKey: 'ticket.department.id', label: 'گروه', col: 'col-md-4' },
        { type: 'select', name: 'status', options: [], optionLabel: 'title', optionValue: 'id', responseKey: 'ticket.status.id', label: 'وضعیت', col: 'col-md-4' },

        // { type: 'dateTime', name: 'created_at', responseKey: 'ticket.updated_at', abc: true, label: 'تاریخ بروز آوری:', col: 'col-md-4', disable: true },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', label: 'id' },
        { type: 'hidden', name: 'department_title', responseKey: 'ticket.department.title' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages', label: '' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo', label: '' },
        { type: 'hidden', name: 'logs', responseKey: 'ticket.logs', label: '' },
        { type: 'hidden', name: 'userId', responseKey: 'ticket.user.id', label: '' },
        { type: 'hidden', name: 'otherTickets', responseKey: 'other_tickets', label: '' },
        { type: 'hidden', name: 'priority-id', responseKey: 'ticket.priority.id' },
        { type: 'hidden', name: 'rate', responseKey: 'ticket.rate' }
      ]
    }
  },
  computed: {
    ticketLogs () {
      const logs = this.searchForInputVal('logs')
      if (!logs) {
        return []
      }
      return logs
    }
  },
  methods: {
    initPageData () {
      this.api += '/' + this.$route.params.id
      // this.getInput('department').options = this.departments
      this.getInput('status').options = this.status
    },
    getInput (inputName) {
      return this.inputs.find(input => input.name === inputName)
    },
    filterDataForUserRole () {
      this.inputs = this.inputs.filter(input => !input.isAdmin)
    },
    sendTicket (data) {
      const sendMessageData = {
        body: data.body,
        isPrivate: data.isPrivate,
        voice: data.voice,
        loading: data.loading
      }
      if (data.resultURL) {
        sendMessageData.photo = this.createBlob(data.resultURL)
      }
      this.sendMessage(sendMessageData)
    },
    sendMessageText (data) {
      this.sendMessage({
        body: data.body,
        isPrivate: data.isPrivate,
        loading: data.loading
      })
    },

    sendMessageImage (data) {
      this.sendMessage({
        body: data.caption,
        isPrivate: data.isPrivate,
        photo: this.createBlob(data.resultURL),
        loading: data.loading
      })
    },

    sendMessageVoice (data) {
      this.sendMessage({
        voice: data.voice,
        isPrivate: data.isPrivate,
        loading: data.loading
      })
    },

    sendMessage (data) {
      const formData = new FormData()

      if (data.photo) {
        formData.append('photo', data.photo, 'photo.jpeg')
      }

      if (data.body) {
        formData.append('body', data.body.replace(/\r?\n/g, '<br/>'))
      }

      if (data.voice) {
        formData.append('voice', data.voice, 'voice.ogg')
      }

      formData.append('ticket_id', this.searchForInputVal('id'))
      this.postMessage(formData)
    },
    postMessage (formData) {
      this.sendLoading = true
      this.$axios.post(API_ADDRESS.ticket.show.ticketMessage, formData)
        .then(res => {
          this.userMessageArray.unshift(res.data.data.ticketMessage)
          this.$refs.SendMessageInput.clearMessage()
          this.$q.notify({
            message: 'پیام شما با موفقیت ثبت شد',
            type: 'positive'
          })
          this.sendLoading = false
        })
        .catch(() => {
          this.sendLoading = false
        })
    },
    saveChanges () {
      this.$axios.put(API_ADDRESS.ticket.show.base + '/' + this.searchForInputVal('id'), {
        department_id: this.searchForInputVal('department'),
        id: this.searchForInputVal('id'),
        priority_id: this.searchForInputVal('priority-id'),
        status_id: this.searchForInputVal('status'),
        title: this.searchForInputVal('title'),
        user_id: this.searchForInputVal('userId')
      })
        .then((res) => {
          this.$q.notify({
            message: 'تغییرات با موفقیت اعمال شد.',
            type: 'positive'
          })
        })
    },
    searchForInputVal (name) {
      const input = this.inputs.find(input => input.name === name)
      if (input) {
        return input.value
      }
      return false
    },
    openShopLogList () {
      this.orderDrawer = this.orderDrawer === false
      this.orderLoading = true
      this.$axios.get(API_ADDRESS.user.orders(this.userId)).then(
        response => {
          this.userOrderData = new CartItemList(response.data.data)
          this.orderLoading = false
        }
      )
    },
    checkLoadInputData () {
      this.userMessageArray = this.searchForInputVal('messages')
      this.userId = this.searchForInputVal('userId')
      if (!this.isUserAdmin) {
        return
      }
      this.filterDataForUserRole()
    },
    openCloseLogDrawer () {
      this.logDrawer = this.logDrawer === false
    },
    sendTicketStatusNotice (ticketId) {
      this.$axios.post(API_ADDRESS.ticket.show.statusNotice(ticketId))
        .then((res) => {
          this.$q.notify({
            message: res.data.message,
            type: 'positive'
          })
        })
    }
  },
  created () {
    this.initPageData()
  },
  mounted () {
    this.isUserAdmin = this.$store.getters['Auth/user'].has_admin_permission
  }
}
</script>

<style scoped>
.SendMessageInput {
  position: sticky;
  bottom: 20px;
}
.tab-panels{
  background: rgb(250, 250, 250);
}
.close-btn {
  width: 100%;
  border-radius: 0;
  color: #212529;
  background: #fbaa00;
}
.other-ticket {
  display: flex;
}
.other-ticket .right-side-squere {
  border: solid 3px #34bfa3;
  border-radius: 100px;
  margin-right: 16px;
}
.other-ticket .link-btn {
  color: #333;
}
.other-ticket .time {
  color: #a6a7c1;
  opacity: 0.5;
}
</style>
