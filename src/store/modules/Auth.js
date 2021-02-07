// initial state
import { User } from '@/models/User'

const state = () => ({
    user: null,
    redirectTo: null,
    accessToken: null
})

// getters
const getters = {
    user (state) {
        return new User(state.user)
    },
    accessToken (state) {
        return state.accessToken
    },
    redirectTo (state) {
        return state.redirectTo
    }
}

// mutations
const mutations = {
    updateUser (state, newInfo) {
        state.user = newInfo
    },
    updateAccessToken (state, newInfo) {
        state.accessToken = newInfo
    },
    updateRedirectTo (state, newInfo) {
        state.redirectTo = newInfo
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
