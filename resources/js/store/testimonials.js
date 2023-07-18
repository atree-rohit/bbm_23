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
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/testimonials')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.log("error retreiving testimonials")
            }
        }
    }
}