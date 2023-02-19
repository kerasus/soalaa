const state = {
  linearLoading: false,
  drawer: false,
  loginDialog: false,
  pageBuilderEditable: false,
  initialSections: [],
  currentSections: [],
  confirmDialog: {
    show: false,
    message: '',
    buttons: {
    }
  },

  layoutHeaderType: '',
  layoutLeftSideBarType: '',
  layoutRightSideBarType: '',

  windowSize: {
    x: 0,
    y: 0
  },
  bubbleSize: 600,
  appBar: true,
  ColumnsWidth: {
    left: 0,
    right: 0
  },
  breadcrumbs: {
    visible: true,
    loading: false,
    path: [
    ]
  }
}

export default state
