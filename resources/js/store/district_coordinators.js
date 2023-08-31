import axios from "axios"
import jsonData from "./dc.json"

export default {
    namespaced: true,
    state: {
        all_data: [],
        shouldPersist: false,
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
        },
        REMOVE_DATA(state, value){
            let index = state.all_data.findIndex(item => item.id === value)
            state.all_data.splice(index, 1)
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/district_coordinators')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving District Coordinators")
            }
        },
        async importDC({ dispatch }, user) {
            const time = 666
            for (const item of jsonData) {
                if(item.id >= 165 && item.id <=173 ){
                    await new Promise(resolve => setTimeout(resolve, time)); // Wait for 1 seconds
                    
                    let data = { ...item, user: user };
                    await dispatch('store', data);
                    
                    console.log(`After ${time} milli seconds`);

                }
            }
        },
        async store({commit}, payload){
            try {
                const { data } = await axios.post('/api/store_district_coordinator', payload)
                commit('ADD_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error storing District Coordinator")
            }
        },
        async delete({commit}, payload){
            try {
                await axios.delete(`/api/delete_district_coordinator/${payload}`)
                commit('REMOVE_DATA', payload)
            } catch ({ response: { data: data_1 } }) {
                console.error("error deleting District Coordinator")
            }
        }
    }
}