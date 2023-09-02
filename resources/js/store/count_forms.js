import axios from "axios"

export default {
    namespaced: true,
    state: {
        all_data: [],
        loading: null,
    },
    mutations: {
        SET_ALL_DATA(state, value){
            state.all_data = value
        }, 
        REMOVE_DATA(state, value){
            state.all_data = state.all_data.filter((d) => d.id != value.id)
        },
        SET_LOADING(state, value) {
            if(value != null){
                console.info("Loading:", value)
            }
            state.loading = value
        },
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
            commit('SET_LOADING', 'Approving Form')
            form_data.species_list
                .filter((s) => s.status == "pending" )
                .forEach(async (species) => {
                    await dispatch('setSpeciesStatus', { species_id: species.id, status: "approved" })
                })
            //Validate form
            await dispatch('setFormStatus', { form_id: form_data.id, status: "approved" })
            commit('SET_LOADING', null)
        },
        async deleteForm({commit}, form_data){
            const { data } = await axios.delete('/api/count_forms/delete_form', { data: form_data })
            commit('REMOVE_DATA', form_data)
        },
        async setFormStatus({commit, dispatch}, form_data){
            commit('SET_LOADING', 'Setting Form Status to ' + form_data.status)
            const { data } = await axios.post('/api/count_forms/set_form_status', form_data)
            await dispatch('getAllData')
            commit('SET_LOADING', null)
        },
        async setSpeciesStatus({commit, dispatch}, species_data){
            commit('SET_LOADING', 'Setting Form Status to ' + species_data.status)
            const { data } = await axios.post('/api/count_forms/set_species_status', species_data)
            await dispatch('getAllData')
            commit('SET_LOADING', null)
        }
    }
}