import axios from "axios"

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    actions: {
        async login({commit}){
            try {
                const { data } = await axios.get('/api/user')
                commit('SET_USER', data)
                commit('SET_AUTHENTICATED', true)
            } catch ({ response: { data: data_1 } }) {
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            }
        },
        logout({commit}){
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
        }
    }
}