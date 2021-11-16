export default function () {
  return {
    drawer: false,
    confirmDialog: {
      show: false,
      message: 'اطمینان دارید؟',
      button: {
        no: 'خیر',
        yes: 'بله'
      }
    },
    windowSize: {
      x: 0,
      y: 0
    },
    bubbleSize: 600,
    appBar: true,
    overlay: {
      show: false,
      loading: false,
      text: ''
    },
    ColumnsWidth: {
      left: 0,
      right: 0
    }
  }
}
