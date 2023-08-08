import axios from "axios"

export default {
    namespaced: true,
    state: {
        headers: [],
        observations: [],
        users: [],
        taxa: [],
    },
    mutations: {
        SET_HEADERS(state, value){
            state.headers = value
        },
        SET_OBSERVATIONS(state, value){
            state.observations = value
        },
        SET_USERS(state, value){
            state.users = value
        },
        SET_TAXA(state, value){
            state.taxa = value
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data }  = await axios.get('/api/data/observations')
                commit('SET_HEADERS', data.headers)
                commit('SET_OBSERVATIONS', data.observations)
                commit('SET_USERS', data.users)
            } catch (response) {
                console.error("error retreiving Observations", response)
            }
            try {
                const { data } = await axios.get('/api/data/taxa')
                commit('SET_TAXA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving Taxa")
            }
        }
    }
}