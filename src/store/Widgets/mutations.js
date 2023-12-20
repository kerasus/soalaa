export function clear(state) {
  state.data = null
}

export function updateData(state, newData) {
  const widgetName = newData.name
  const widgetData = newData.data
  if (!widgetName) {
    return
  }
  state.data[widgetName] = widgetData
}

export function updateDataByUid (state, newData) {
  const uid = newData.uid
  const widgetName = newData.name
  const widgetData = newData.data
  const serverSideRendered = newData.serverSideRendered
  if (!widgetName) {
    return
  }

  const widgetIndex = state.data[widgetName].findIndex(item => item.uid === uid)

  state.data[widgetName][widgetIndex].widgetData = widgetData
  state.data[widgetName][widgetIndex].serverSideRendered = serverSideRendered
}

export function addWidgetData(state, newData) {
  const uid = newData.uid
  const widgetName = newData.name
  const widgetData = newData.data
  if (!widgetName) {
    return
  }

  if (!state.data[widgetName]) {
    state.data[widgetName] = []
  }

  state.data[widgetName].push({
    uid,
    widgetData
  })
}
