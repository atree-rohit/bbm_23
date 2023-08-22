import axios from "axios"

export default {
    namespaced: true,
    state: {
        all_data: [],
        shouldPersist: false,
    },
    mutations: {
        SET_ALL_DATA(state, value){
            state.all_data = value
        },
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/get_all_logs')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving Logs")
            }
        }
    }
}