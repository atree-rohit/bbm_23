import axios from "axios"

export default {
    namespaced: true,
    state: {
        regions: {},
        states: {},
        districts: {},
    },
    getters:{
        regions(state){
            return state.regions
        },
        states(state){
            return state.states
        },
        districts(state){
        },
    },
    mutations: {
        SET_REGIONS(state, value){
            state.regions = JSON.parse(value)
        }, 
        SET_STATES(state, value){
            state.states = JSON.parse(value)
        },
        SET_DISTRICTS(state, value){
            state.districts = JSON.parse(value)
        },
    },
    actions: {
        async getAllData({commit, dispatch}){
            localStorage.clear(); // Clear LocalStorage
            sessionStorage.clear(); // Clear SessionStorage
            await dispatch('getRegions')
            await dispatch('getStates')
            await dispatch('getDistricts')
        },
        async getRegions({commit}){
            try {
                const { data } = await axios.get('/api/maps/regions')
                commit('SET_REGIONS', data)
            } catch (response) {
                console.error("error retreiving Regions", response)
            }
        },
        async getStates({commit}){
            try {
                const { data } = await axios.get('/api/maps/states')
                commit('SET_STATES', data)
            } catch (response) {
                console.error("error retreiving States", response)
            }
        },
        async getDistricts({commit}){
            try {
                const { data } = await axios.get('/api/maps/districts')
                commit('SET_DISTRICTS', data)
            } catch (response) {
                console.error("error retreiving Districts", response)
            }
        },
        
    }
}