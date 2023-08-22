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
        REMOVE_DATA(state, value){
            
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/count_forms')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving partners")
            }
        },
        async setFormStatus({commit, dispatch}, form_data){
            const { data } = await axios.post('/api/count_forms/set_form_status', form_data)
            await dispatch('getAllData')
        },
        async setSpeciesStatus({dispatch}, species_data){
            const { data } = await axios.post('/api/count_forms/set_species_status', species_data)
            await dispatch('getAllData')
        }
    }
}