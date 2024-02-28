import axios from "axios"

export default {
    namespaced: true,
    state: {
        regions: {},
        states: {},
        districts: {},
        shouldPersist: false,
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
        SET_GEOJSONS(state, value){
            state.regions = value.regions
            state.states = value.states
            state.districts = value.districts
        },
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
            // localStorage.clear(); // Clear LocalStorage
            // sessionStorage.clear(); // Clear SessionStorage
            // await dispatch('getRegions')
            // await dispatch('getStates')
            // await dispatch('getDistricts')
            await dispatch('getGeoJSON')
        },
        async getGeoJSON({commit}){
            const { data } = await axios.get('/api/maps/geojson');
            commit('SET_GEOJSONS', data)
            console.log("SET_GEOJSONS")
        },
        async getRegions({commit}){
            try {
                const { data } = await axios.get('/api/maps/regions')
                commit('SET_REGIONS', data)
                console.log("SET_REGIONS")
            } catch (response) {
                console.error("error retreiving Regions", response)
            }
        },
        async getStates({commit}){
            try {
                const { data } = await axios.get('/api/maps/states')
                commit('SET_STATES', data)
                console.log("SET_STATES")
            } catch (response) {
                console.error("error retreiving States", response)
            }
        },
        async getDistricts({commit}){
            try {
                const { data } = await axios.get('/api/maps/districts')
                commit('SET_DISTRICTS', data)
                console.log("SET_DISTRICTS")
            } catch (response) {
                console.error("error retreiving Districts", response)
            }
        },
        
    }
}