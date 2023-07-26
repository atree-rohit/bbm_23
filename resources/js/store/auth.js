import axios from "axios"

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        is_admin: false,
        is_super_admin: false,
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_USER(state, value){
            state.user = value
        },
        SET_AUTHENTICATED(state, value){
            state.authenticated = value
        },
        SET_IS_ADMIN(state, value){
            state.is_admin = value            
        },
        SET_IS_SUPER_ADMIN(state, value){
            state.is_super_admin = value
        }
    },
    actions: {
        async login({commit, dispatch}){
            try {
                const { data } = await axios.get('/api/user')
                commit('SET_USER', data)
                commit('SET_AUTHENTICATED', true)
                if(data.user_type === "admin"){
                    commit('SET_IS_ADMIN', true)
                } else if(data.user_type === "super_admin"){
                    commit('SET_IS_SUPER_ADMIN', true)
                }
                window.location.href = window.location.origin
            } catch ({ response: { data: data_1 } }) {
                dispatch('reset_auth')
            }
        },
        reset_auth({commit}){
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
            commit('SET_IS_ADMIN', false)
            commit('SET_IS_SUPER_ADMIN', false)
        },
        async logout({dispatch}){
            try {
                const { data } = await axios.get('/api/logout')
                dispatch('reset_auth')
                window.location.href = window.location.origin
            } catch ({ response: { data: data_1 } }) {
                console.error("error logging out")
            }
        }
    }
}