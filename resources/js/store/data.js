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
        },
        loading: null,
    },
    mutations: {
        SET_LOADING(state, value){
            state.loading = value
        },
        SET_DISTRICTS(state, value){
            state.boundaries.districts = JSON.parse(value)
        },
        SET_HEADERS(state, value){
            state.headers = value
        },
        SET_OBSERVATIONS(state, value){
            const place_names = state.boundaries.districts.features.map((d) => d.properties)
            let op = []
            Object.keys(value).forEach((portal) => {
                op[portal] = value[portal].map((d) => {
                    const user = state.users[portal][d[2]]
                    const district = state.districts[d[4]]
                    const state_name = place_names.find((d) => d.district == district)
                    return [
                        user,
                        d[1],
                        d[3],
                        district,
                        state_name?.state
                    ]
                })
            })
            console.log(op)
            state.observations = op      
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
        async getAllData({commit, dispatch}){
            commit('SET_LOADING', 'Getting District Boundaries')
            await dispatch('getDistricts')
            commit('SET_LOADING', 'Getting Observations')
            await dispatch('getObservations')
            commit('SET_LOADING', 'Getting Taxa Details')
            await dispatch('getTaxa')
            commit('SET_LOADING', null)
        },
        async getDistricts({commit}){
            try {
                const { data } = await axios.get('/api/maps/districts')
                commit('SET_DISTRICTS', data)
            } catch (response) {
                console.error("error retreiving Districts", response)
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
            } catch (response) {
                console.error("error retreiving Taxa", response)
            }
        }
    }
}
