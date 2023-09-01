import axios from "axios"
import * as d3 from "d3"

import { saveData, getData } from "../utils/idb_geojson.js"    
import { saveObservationData, getObservationData } from "../utils/idb_observations.js"    

export default {
    namespaced: true,
    state: {
        headers: [],
        observations: [],
        filtered_observations: [],
        users: [],
        taxa: [],
        districts: [],
        loading: null,
        geojson: {
            regions: {},
            states: {},
            districts: {}
        },
        filters:{
            year: null,
            portal: null,
            state: null,
            district: null,
        },
        map_data: {},
        shouldPersist: false,
    },
    mutations: {
        SET_LOADING(state, value) {
            if(value != null){
                console.info("Loading:", value)
            }
            state.loading = value
        },
        SET_TAXA(state, value) {
            state.taxa = value
        },
        SET_HEADERS(state, value) {
            state.headers = value
        },
        SET_USERS(state, value) {
            state.users = value
        },
        SET_DISTRICTS_LIST(state, value) {
            state.districts = value
        },
        SET_OBSERVATIONS(state, value) {
            const place_names_map = new Map(state.geojson.districts.features.map((d) => [d.properties.district, d.properties.state]))
            let updatedObservations = []
            Object.entries(value).forEach(([portal, observations]) => {
                updatedObservations[portal] = observations.map((d) => {
                    const district = state.districts[d[4]]
                    return [
                        state.users[portal][d[2]],
                        d[1],
                        d[3],
                        district,
                        place_names_map.get(district)
                    ]
                })
            })
            state.observations = updatedObservations
        },
        SET_FILTERED_OBSERVATIONS(state){
            let op = {}
            if(state.filters.year){
                Object.keys(state.observations).forEach((portal) => {
                    op[portal] = state.observations[portal].filter((d) => {
                        const dateParts = d[2].split("-");
                        const yearInDate = dateParts[0];
                        return yearInDate == state.filters.year;
                    })
                })
            } else {
                op = state.observations
            }
            console.log(op)
            state.filtered_observations = op
        },
        SET_GEOJSON(state, value) {
            state.geojson = value
            // console.log("Set_geojson", value)
        },
        SET_MAP_DATA(state) {
            const flatData = Object.values(state.filtered_observations).flat()
            const mapData = flatData.reduce((acc, observation) => {
                const stateName = observation[4]
                const districtName = observation[3]
                
                if (!acc.states[stateName]) {
                    acc.states[stateName] = 0
                }
                acc.states[stateName]++
                
                if (!acc.districts[districtName]) {
                    acc.districts[districtName] = 0
                }
                acc.districts[districtName]++
                
                return acc
            }, { states: {}, districts: {} })

            state.map_data = {
                states: Object.entries(mapData.states).map(([name, value]) => ({ name, value })),
                districts: Object.entries(mapData.districts).map(([name, value]) => ({ name, value })),
            }
        },
        SET_FILTER(state, data){
            state.filters[data.field] = data.value
        }

    },
    actions: {
        async getAllData({ commit, dispatch }) {
            await dispatch('getTaxa')
            await dispatch('getMaps')
            await dispatch('getObservations')
        },
        async getObservations({ commit }) {
            console.group("Loading Data")
            commit('SET_LOADING', 'Getting Observations')
            
            await smallDelay()

            const response = await axios.get('/api/data/observations');
            let data = response.data;
            saveObservationData(data)
            commit('SET_LOADING', 'Setting Headers')
            commit('SET_HEADERS', data.headers)
            
            commit('SET_LOADING', 'Setting Users')
            await smallDelay()
            commit('SET_USERS', data.users)
            
            commit('SET_LOADING', 'Setting Districts')
            await smallDelay()
            commit('SET_DISTRICTS_LIST', data.districts)
            
            commit('SET_LOADING', 'Setting Observations')
            await smallDelay()
            commit('SET_OBSERVATIONS', data.observations)

            commit('SET_LOADING', 'Setting Filtered Observations')
            await smallDelay()
            commit('SET_FILTERED_OBSERVATIONS')
            
            commit('SET_LOADING', 'Setting Map Data')
            await smallDelay()
            commit('SET_MAP_DATA')
            console.groupEnd()
            commit('SET_LOADING', null)
            await smallDelay()
        },
        async getTaxa({ commit }) {
            commit('SET_LOADING', 'Getting Taxa Details')
            try {
                const { data } = await axios.get('/api/data/taxa')
                commit('SET_TAXA', data)
            } catch (response) {
                console.error("error retreiving Taxa", response)
            }
        },
        async getMaps({ commit }) {
            commit('SET_LOADING', 'Getting Map Data')
            let data = await getData("geojson")
            if(!data){
                const response = await axios.get('/api/maps/geojson');
                data = response.data;
                console.log('getMaps', response)
                saveData("geojson", data);
            }
            commit('SET_GEOJSON', data)
        },
        setLoading({ commit }, value) {
            commit('SET_LOADING', value)
            // console.log("setLoading", value)
        },
        async setFilter({commit}, data){
            console.group("Updating Map Data")
            
            commit('SET_LOADING', 'Setting Filter')
            await smallDelay()
            commit('SET_FILTER', data)

            commit('SET_LOADING', 'Setting Filtered Observations')
            await smallDelay()
            commit('SET_FILTERED_OBSERVATIONS')
            
            commit('SET_LOADING', 'Setting Map Data')
            await smallDelay()
            commit('SET_MAP_DATA')

            console.groupEnd()
            commit('SET_LOADING', null)
        },
        async pullInat({ commit }) {
            console.log("pullInat")
            let response = await axios.get('/api/data/pull_inat');
            if(response){
                console.log(response)
            }
        }
    }
}

async function smallDelay(){
    await new Promise(resolve => setTimeout(resolve, 500));
}