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
        },
        UPDATE_DATA(state, value){
                
            state.all_data.forEach((partner, pid) => {
                if(partner.id == value.id){
                    state.all_data[pid].name = value.name;
                    state.all_data[pid].partner_type = value.partner_type;
                    state.all_data[pid].description = value.description;
                    state.all_data[pid].contact_person = value.contact_person;
                    state.all_data[pid].link = value.link;
                }
            })
        },
        REMOVE_DATA(state, value){
            let index = state.all_data.findIndex(item => item.id === value)
            state.all_data.splice(index, 1)
        }
    },
    actions: {
        async getAllData({commit}){
            try {
                const { data } = await axios.get('/api/partners')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving partners")
            }
        },
        async store({commit}, payload){
            try {
                const { data } = await axios.post('/api/store_partners', payload)
                commit('ADD_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error storing partner")
            }
        },
        async update({commit}, payload){
            try {
                const {data} = await axios.post(`/api/update_partner/${payload.id}`, payload)
                commit('UPDATE_DATA', data.data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error storing partner")
            }
        },
        async delete({commit}, payload){
            try {
                await axios.delete(`/api/delete_partner/${payload}`)
                commit('REMOVE_DATA', payload)
            } catch ({ response: { data: data_1 } }) {
                console.error("error deleting partner")
            }
        }
    }
}