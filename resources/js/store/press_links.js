import axios from "axios"

export default {
    namespaced: true,
    state: {
        all_data: [],
    },
    getters:{
        all_data(state){
            return state.all_data
        }
    },
    mutations: {
        SET_ALL_DATA(state, value){
            state.all_data = value
        },
        ADD_DATA(state, value){
            let { created_at, updated_at, ...data} = value.data
            state.all_data.push(data)
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/press_links')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.log("error retreiving press_links")
            }
        },
        async store({commit}, payload){
            try {
                const { data } = await axios.post('/api/store_press_link', payload)
                commit('ADD_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.log("error storing press_link")
            }
        }
    }
}