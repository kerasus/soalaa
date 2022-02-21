// import { Dialog } from 'quasar'
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
// -------------------------------layout----------------------------------

export function updateLang (state, data) {
  state.lang = data
}

export function updateHeaderTitleLoading (state, data) {
  state.headerTitle.loading = data
}

export function updateHeaderTitleIcon (state, data) {
  state.headerTitle.icon = data
}

export function updateHeaderTitle (state, data) {
  console.log('state.headerTitle', state.headerTitle)
  console.log('updateHeaderTitle data: ', data)
  Object.assign(state.headerTitle, data)
  console.log('after state.headerTitle', state.headerTitle)
  // state.headerTitle = data
  // state.headerTitle.path.title = data.title
  // state.headerTitle.path.route = data.route
  // if (data.length > 1) {
  //   state.headerTitle.path = []
  //   for (const i in data) {
  //     state.headerTitle.path.push(data[i])
  //   }
  // } else {
  //   state.headerTitle.path.push(data[0])
  // }
}

export function updateHeaderWithBackground (state, data) {
  state.headerWithBackground = data
}

export function updateHeaderTitleCentered (state, data) {
  state.headerTitleCentered = data
}

export function updateHeaderShowTitle (state, data) {
  state.headerShowTitle = data
}

export function updateHeaderShowBtnSearch (state, data) {
  state.headerShowBtnSearch = data
}

export function updateHeaderShowBtnBack (state, data) {
  state.headerShowBtnBack = data
}

export function updateHeaderShowBtnShare (state, data) {
  state.headerShowBtnShare = data
}

export function updateLayoutView (state, data) {
  state.layoutView = data
}

export function updateLayoutHeader (state, data) {
  state.layoutHeader = data
}

export function updateLayoutHeaderVisible (state, data) {
  state.layoutHeaderVisible = data
}

export function updateLayoutHeaderReveal (state, data) {
  state.layoutHeaderReveal = data
}

export function updateLayoutHeaderElevated (state, data) {
  state.layoutHeaderElevated = data
}

export function updateLayoutHeaderBordered (state, data) {
  state.layoutHeaderBordered = data
}

export function updateLayoutHeaderNavTabs (state, data) {
  state.layoutHeaderNavTabs = data
}

export function updateLayoutHeaderNavTabsModel (state, data) {
  state.layoutHeaderNavTabsModel = data
}

export function updateLayoutLeftDrawer (state, data) {
  state.layoutLeftDrawer = data
}

export function updateLayoutLeftDrawerVisible (state, data) {
  state.layoutLeftDrawerVisible = data
}

export function updateLayoutLeftDrawerBehavior (state, data) {
  state.layoutLeftDrawerBehavior = data
}

export function updateLayoutLeftDrawerOverlay (state, data) {
  state.layoutLeftDrawerOverlay = data
}

export function updateLayoutLeftDrawerElevated (state, data) {
  state.layoutLeftDrawerElevated = data
}

export function updateLayoutLeftDrawerBordered (state, data) {
  state.layoutLeftDrawerBordered = data
}

export function updateLayoutRightDrawer (state, data) {
  state.layoutRightDrawer = data
}

export function updateLayoutRightDrawerVisible (state, data) {
  state.layoutRightDrawerVisible = data
}

export function updateLayoutRightDrawerBehavior (state, data) {
  state.layoutRightDrawerBehavior = data
}

export function updateLayoutRightDrawerOverlay (state, data) {
  state.layoutRightDrawerOverlay = data
}

export function updateLayoutRightDrawerElevated (state, data) {
  state.layoutRightDrawerElevated = data
}

export function updateLayoutRightDrawerBordered (state, data) {
  state.layoutRightDrawerBordered = data
}

export function updateLayoutFooter (state, data) {
  state.layoutFooter = data
}

export function updateLayoutFooterVisible (state, data) {
  state.layoutFooterVisible = data
}

export function updateLayoutFooterReveal (state, data) {
  state.layoutFooterReveal = data
}

export function updateLayoutFooterElevated (state, data) {
  state.layoutFooterElevated = data
}

export function updateLayoutFooterBordered (state, data) {
  state.layoutFooterBordered = data
}
