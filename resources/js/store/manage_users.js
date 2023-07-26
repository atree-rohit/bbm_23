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
        UPDATA_DATA(state, value){
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
                const { data } = await axios.get('/api/get_all_users')
                commit('SET_ALL_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving Users")
            }
        },
        async update({commit}, payload){
            try {
                const { data } = await axios.post('/api/update_user', payload)
                commit('UPDATA_DATA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error updating User")
            }
        },
        async delete({commit}, payload){
            try {
                await axios.delete(`/api/delete_user/${payload}`)
                commit('REMOVE_DATA', payload)
            } catch ({ response: { data: data_1 } }) {
                console.error("error deleting User")
            }
        }
    }
}