import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_DATA(state, data){
            state.data = data
        }
    },
    actions: {
        async getData({commit}, portal){
            let response = await axios.get("/api/data/portal_observations/" + portal)
            if(response){
                commit("SET_DATA", response.data)
            }
        }
    }
}