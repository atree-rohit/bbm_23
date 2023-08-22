import axios from "axios"

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        token: "",
        is_admin: false,
        is_super_admin: false,
        shouldPersist: true,
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
            alert(JSON.stringify(value))
            state.user = value
        },
        SET_TOKEN(state, value){
            state.token = value
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
        async login({commit, dispatch}, login_data){
            
            try {
                const { data } = await axios.get('/api/user', {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${login_data.token}`
                    }
                })
                commit('SET_USER', data)
                commit('SET_TOKEN', login_data.token)
                commit('SET_AUTHENTICATED', true)
                if(data.user_type === "admin"){
                    commit('SET_IS_ADMIN', true)
                } else if(data.user_type === "super_admin"){
                    commit('SET_IS_SUPER_ADMIN', true)
                }
            } catch (response) {
                dispatch('reset_auth')
            }
        },
        reset_auth({commit}){
            commit('SET_USER', {})
            commit('SET_TOKEN', "")
            commit('SET_AUTHENTICATED', false)
            commit('SET_IS_ADMIN', false)
            commit('SET_IS_SUPER_ADMIN', false)
        },
        logout({dispatch}){
            dispatch('reset_auth')
        }
    }
}