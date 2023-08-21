import axios from "axios"

export default {
    namespaced: true,
    state: {
        all_data: [],
    },
    mutations: {
        SET_ALL_DATA(state, value){
            state.all_data = value
        },
        UPDATE_FORM_DATA(state, value){
            const form_id = value.id
            let dataItem = state.all_data.find((item) => item.id === form_id)
            if(dataItem){
                dataItem = value
            }
            console.log(state.all_data)
        },
        REMOVE_DATA(state, value){
            
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                console.log("gad")
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
        async setSpeciesStatus({commit}, species_data){
            const { data } = await axios.post('/api/count_forms/set_species_status', species_data)
            commit('UPDATE_SPECIES_DATA', data.species)
        }
    }
}