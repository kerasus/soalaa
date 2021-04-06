// initial state
const state = () => ({
    drawer: false,
    windowSize: {
        x: 0,
        y: 0,
    },
    appBar: true,
    overlay: {
        show: false,
        loading: false,
        text: ''
    },
    ColumnsWidth :{
        left:0,
        right:0
    }
})

// getters
const getters = {
    drawer (state) {
        return state.drawer
    },
    appBar (state) {
        return state.appBar
    },
    overlay (state) {
        return state.overlay
    },
    windowSize (state) {
        return state.windowSize
    },
    ColumnsWidth (state) {
        return state.ColumnsWidth
    },
}

// mutations
const mutations = {
    updateDrawer(state, newInfo) {
        state.drawer = newInfo
    },
    updateAppBar (state, newInfo) {
        state.appBar = newInfo
    },
    updateOverlay (state, newInfo) {
        state.overlay = newInfo
    },
    updateWindowSize (state, newInfo) {
        state.windowSize = newInfo
    },
    updateColumnsWidth (state, newInfo) {
        state.ColumnsWidth = newInfo
    },
    updateAppBarAndDrawer(state, newInfo) {
        this.commit('AppLayout/updateAppBar', newInfo)
        this.commit('AppLayout/updateDrawer', newInfo)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
