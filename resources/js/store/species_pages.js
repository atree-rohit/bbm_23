import axios from "axios"
import * as d3 from "d3"
import species_data from "../json/species_data.json"
import species_images from "../json/species_images.json"

const MIN_SPECIES = 5

export default {
    namespaced: true,
    state: {
        headers: [],
        observations: {},
        users: [],
        taxa: [],
        districts: [],
        loading: null,
        geojson: {
            regions: {},
            states: {},
            districts: {}
        },
        species_data: species_data,
        species_images: species_images,
        shouldPersist: true,
    },
    getters: {
        all_species(state){
            return state.species_data
                .filter((s) => s.observations.length >= MIN_SPECIES)
                .map((s) => {
                    const image = state.species_images.filter((i) => i.species_id == s.id)
                    let url = ""
                    if(image.length){
                        url = image[0].url
                    }
                    return {
                        ...s,
                        url
                    }
                })
                .sort((a,b) => b.observations.length - a.observations.length)

        }

    },
    mutations:{
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
            let updatedObservations = {}
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
            console.log(updatedObservations)
            state.observations = updatedObservations
        },
        SET_GEOJSON(state, value) {
            state.geojson = value
        },
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
            // saveObservationData(data)
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
            const response = await axios.get('/api/maps/geojson');
            const data = response.data;
            console.log('getMaps', response)
            commit('SET_GEOJSON', data)
        },
        setLoading({ commit }, value) {
            commit('SET_LOADING', value)
            // console.log("setLoading", value)
        }
    }
}

async function smallDelay(){
    await new Promise(resolve => setTimeout(resolve, 500));
}