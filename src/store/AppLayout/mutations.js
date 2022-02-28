export function updateDrawer (state, newInfo) {
  state.drawer = newInfo
}

export function updateAppBar (state, newInfo) {
  state.appBar = newInfo
}

export function updateAppBarAndDrawer (state, newInfo) {
  this.commit('AppLayout/updateAppBar', newInfo)
  this.commit('AppLayout/updateDrawer', newInfo)
}

export function updateWindowSize (state, newInfo) {
  state.windowSize = newInfo
}

export function updateBubbleSize (state, newInfo) {
  state.bubbleSize = newInfo
}

export function showConfirmDialog (state, newInfo) {
  // Dialog.create({
  //   title: '',
  //   message: 'newInfo.message',
  //   ok: {
  //     push: newInfo
  //   },
  //   cancel: {
  //     push: true,
  //     color: 'negative'
  //   },
  //   persistent: true
  // }).onOk(() => {
  //   // console.log('>>>> OK')
  // }).onCancel(() => {
  //   // console.log('>>>> Cancel')
  // }).onDismiss(() => {
  //   // console.log('I am triggered on both OK and Cancel')
  // })
  // Vue.$confirm({
  //   message: newInfo.message,
  //   button: newInfo.button,
  //   callback: confirm => {
  //     newInfo.callback(confirm)
  //   }
  // })
  // message: 'از ارسال پاسخ ها اطمینان دارید؟',
  //   button: {
  //   no: 'ادامه میدم',
  //     yes: 'ثبت میکنم'
  // },
  // callback: (confirm) => {
  //   if (!confirm) {
  //     return
  //   }
  //   that.sendAnswersAndFinishExam()
  // }
}

export function updateBreadcrumbs (state, data) {
  Object.assign(state.breadcrumbs, data)
}
export function updateLoading (state, data) {
  state.breadcrumbs.loading = data
}
