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
            state.all_data = state.all_data.filter((d) => d.id != value.id)
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
        async approveForm({commit, dispatch}, form_data){
            //Validate all species
            form_data.species_list
                .filter((s) => s.status == "pending" )
                .forEach(async (species) => {
                    await dispatch('setSpeciesStatus', { species_id: species.id, status: "approved" })
                })
            //Validate form
            await dispatch('setFormStatus', { form_id: form_data.id, status: "approved" })
        },
        async deleteForm({commit}, form_data){
            const { data } = await axios.delete('/api/count_forms/delete_form', { data: form_data })
            commit('REMOVE_DATA', form_data)
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