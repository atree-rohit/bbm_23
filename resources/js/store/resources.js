import axios from "axios"

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
        UPDATE_DATA(state, value){
            state.all_data.forEach((resource, rid) => {
                if(resource.id == value.id){
                    state.all_data[rid].title = value.title;
                    state.all_data[rid].link = value.link;
                    state.all_data[rid].resource_type = value.resource_type;
                    state.all_data[rid].description = value.description;
                    state.all_data[rid].tags = value.tags;
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
                const { data } = await axios.get('/api/resources')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving Resources")
            }
        },
        async store({commit}, payload){
            try {
                const { data } = await axios.post('/api/store_resource', payload)
                commit('ADD_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error adding Resource")
            }
        },
        async update({commit}, payload){
            try {
                const {data} = await axios.post(`/api/update_resource/${payload.id}`, payload)
                commit('UPDATE_DATA', data.data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error storing resource")
            }
        },
        async delete({commit}, payload){
            try {
                await axios.delete(`/api/delete_resource/${payload}`)
                commit('REMOVE_DATA', payload)
            } catch ({ response: { data: data_1 } }) {
                console.error("error deleting Resource")
            }
        }
    }
}