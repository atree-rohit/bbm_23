import axios from "axios"

export default {
    namespaced: true,
    state: {
        observations: [],
        taxa: [],
    },
    getters:{
        observations(state){
            return state.observations
        },
        taxa(state){
            return state.taxa
        }
    },
    mutations: {
        SET_OBSERVATIONS(state, value){
            state.observations = value
        },
        SET_TAXA(state, value){
            state.taxa = value
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data }  = await axios.get('/api/data/observations')
                console.log(data)
                commit('SET_OBSERVATIONS', data)
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