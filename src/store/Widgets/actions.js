export function updateData (context, newData) {
  context.commit('updateData', newData)
}

export function addWidgetData (context, newData) {
  context.commit('addWidgetData', newData)
}

export function getWidgetData (context, newData) {
  return new Promise((resolve) => {
    const widgetName = newData.name
    const stack = context.getters.data(widgetName)
    const fristItem = stack.slice(0, 1)
    const remainItems = stack.slice(1)
    context.commit('updateData', {
      name: widgetName,
      data: remainItems
    })
    if (fristItem && fristItem.length > 0) {
      resolve(fristItem[0])
    }

    resolve(null)
  })
}
