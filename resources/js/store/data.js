import axios from "axios"

export default {
    namespaced: true,
    state: {
        headers: [],
        observations: [],
        users: [],
        taxa: [],
        districts: [],
        boundaries:{
            states: {},
            districts: {},
        }
    },
    mutations: {
        SET_DISTRICTS(state, value){
            state.boundaries.districts = JSON.parse(value)
        },
        SET_HEADERS(state, value){
            state.headers = value
        },
        SET_OBSERVATIONS(state, value){
            const place_names = state.boundaries.districts.features.map((d) => d.properties)
            let op = {}
            console.log(place_names)
            Object.keys(value).forEach((portal) => {
                op[portal] = value[portal].map((d) => {
                    const user = state.users[portal][d[2]]
                    const district = state.districts[d[4]]
                    const state_name = place_names.find((d) => d.district == district)
                    return {
                        user: user,
                        taxa: d[1],
                        date: d[3],
                        district: district,
                        state: state_name?.state
                    }
                })
            })
            console.log("op", op)            
        },
        SET_USERS(state, value){
            state.users = value
        },
        SET_DISTRICTS_LIST(state, value){
            state.districts = value
        },
        SET_TAXA(state, value){
            state.taxa = value
        }
    },
    actions: {
        async getAllData({dispatch}){
            await dispatch('getDistricts')
            await dispatch('getObservations')
            await dispatch('getTaxa')
        },
        async getDistricts({commit}){
            try {
                const { data } = await axios.get('/api/maps/districts')
                commit('SET_DISTRICTS', data)
            } catch (x) {
                console.error("error retreiving partners")
                console.log(x)
            }
        },
        async getObservations({commit}){
            try {
                const { data }  = await axios.get('/api/data/observations')
                commit('SET_HEADERS', data.headers)
                commit('SET_USERS', data.users)
                commit('SET_DISTRICTS_LIST', data.districts)
                commit('SET_OBSERVATIONS', data.observations)
            } catch (response) {
                console.error("error retreiving Observations", response)
            }
        },
        async getTaxa({commit}){
            try {
                const { data } = await axios.get('/api/data/taxa')
                commit('SET_TAXA', data)
            } catch ({ response: { data: data_1 } }) {
                console.error("error retreiving Taxa")
            }
        }
    }
}
