// initial state
import Vue from 'vue'

const state = () => ({
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
        y: 0,
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
})

// getters
const getters = {
    drawer(state) {
        return state.drawer
    },
    appBar(state) {
        return state.appBar
    },
    overlay(state) {
        return state.overlay
    },
    windowSize(state) {
        return state.windowSize
    },
    ColumnsWidth(state) {
        return state.ColumnsWidth
    },
    bubbleSize(state) {
        return state.bubbleSize
    }
}

// mutations
const mutations = {
    updateDrawer(state, newInfo) {
        state.drawer = newInfo
    },
    updateAppBar(state, newInfo) {
        state.appBar = newInfo
    },
    updateOverlay(state, newInfo) {
        state.overlay = newInfo
    },
    updateWindowSize(state, newInfo) {
        state.windowSize = newInfo
    },
    updateBubbleSize(state, newInfo) {
        state.bubbleSize = newInfo
    },
    updateColumnsWidth(state, newInfo) {
        state.ColumnsWidth = newInfo
    },
    updateAppBarAndDrawer(state, newInfo) {
        this.commit('AppLayout/updateAppBar', newInfo)
        this.commit('AppLayout/updateDrawer', newInfo)
    },
    showConfirmDialog(state, newInfo) {
        Vue.$confirm({
            message: newInfo.message,
            button: newInfo.button,
            callback: confirm => {
                newInfo.callback(confirm)
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
