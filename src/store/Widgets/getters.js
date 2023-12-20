export function data (state) {
  return (widgetName) => {
    return state.data[widgetName] || []
  }
}

export function getByUid (state) {
  return (widgetName, uid) => {
    const stack = state.data[widgetName] || []
    return stack.find(item => item.uid === uid)
  }
}
