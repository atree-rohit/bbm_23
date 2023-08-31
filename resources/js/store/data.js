import axios from "axios"
import * as d3 from "d3"

import { saveData, getData } from "../utils/idb_geojson.js"    
import { saveObservationData, getObservationData } from "../utils/idb_observations.js"    

export default {
    namespaced: true,
    state: {
        headers: [],
        observations: [],
        users: [],
        taxa: [],
        districts: [],
        loading: null,
        geojson: {
            regions: {},
            states: {},
            districts: {}
        },
        map_data: {},
        shouldPersist: false,
    },
    getters: {
        mapData(state) {
            return {
                states: d3.groups(state.observations, (d) => d[4]),
                districts: d3.groups(state.observations, (d) => d[3])
            }
        }
    },
    mutations: {
        SET_LOADING(state, value) {
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
            let op = []
            Object.keys(value).forEach((portal) => {
                op[portal] = value[portal].map((d) => {
                    const district = state.districts[d[4]]
                    const state_name = place_names_map.get(district)
                    return [
                        state.users[portal][d[2]],
                        d[1],
                        d[3],
                        district,
                        state_name
                    ]
                })
            })
            state.observations = op
        },
        SET_GEOJSON(state, value) {
            state.geojson = value
            // console.log("Set_geojson", value)
        },
        SET_MAP_DATA(state) {
            state.map_data = {
                states: d3.rollups(Object.values(state.observations).flat(), (v) => v.length, (d) => d[4]).map((p) => {
                    return {
                        name: p[0],
                        value: p[1]
                    }
                }),
                districts: d3.rollups(Object.values(state.observations).flat(), (v) => v.length, (d) => d[3]).map((p) => {
                    return {
                        name: p[0],
                        value: p[1]
                    }
                }),
            }
        }

    },
    actions: {
        async getAllData({ commit, dispatch }) {
            // console.log("DATA getAllData")
            commit('SET_LOADING', 'Getting Taxa Details')
            await dispatch('getTaxa')

            commit('SET_LOADING', 'Getting Map Data')
            await dispatch('getMaps')

            commit('SET_LOADING', 'Getting Observations')
            await dispatch('getObservations').then(() => {
                commit('SET_LOADING', 'Setting Map Data')
                commit('SET_MAP_DATA')
            })


            commit('SET_LOADING', null)
        },
        async getObservations({ commit }) {
            // let data = await getObservationData()
            //need to do some sort of caching / busting here
            // if(!data){
            // }
            const response = await axios.get('/api/data/observations');
            let data = response.data;
            // console.log('getObservations', response)
            saveObservationData(data)
            commit('SET_LOADING', 'Setting Headers')
            commit('SET_HEADERS', data.headers)
            commit('SET_LOADING', 'Setting Users')
            commit('SET_USERS', data.users)
            commit('SET_LOADING', 'Setting Districts')
            commit('SET_DISTRICTS_LIST', data.districts)
            commit('SET_LOADING', 'Setting Observations')
            commit('SET_OBSERVATIONS', data.observations)
            commit('SET_LOADING', 'Setting Complete')
        },
        async getTaxa({ commit }) {
            try {
                const { data } = await axios.get('/api/data/taxa')
                commit('SET_TAXA', data)
            } catch (response) {
                console.error("error retreiving Taxa", response)
            }
        },
        async getMaps({ commit }) {
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
            console.log("setLonading", value)
        }
    }
}
