import axios from "axios"
import * as d3 from "d3"
// import inat_data from "../json/inat_data_2023_09_03.json"
// import inat_data from "../json/inat_data_2023_09_04.json"
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
        filters:{
            year: 2023,
            portal: null,
            state: null,
            district: null,
        },
        shouldPersist: false,
    },
    getters:{
        filtered_observations(state){
            let op = {}
            if(state.filters.year){
                Object.keys(state.observations).forEach((portal) => {
                    op[portal] = state.observations[portal].filter((d) => {
                        const dateParts = d[2].split("-")
                        const yearInDate = dateParts[0]
                        return yearInDate == state.filters.year
                    })
                })
            } else {
                op = state.observations
            }
            if(state.filters.state){
                Object.keys(op).forEach((portal) => {
                    op[portal] = op[portal].filter((d) => {
                        return d[4] == state.filters.state
                    })
                })
            }
            return op
        },
        observation_stats(state, getters){
            if(Object.keys(getters.filtered_observations).length === 0) {
                return {}
            }
            return {
                counts: getObservationStats(getters.filtered_observations.counts),
                inat: getObservationStats(getters.filtered_observations.inats),
                ibp: getObservationStats(getters.filtered_observations.ibps),
                ifb: getObservationStats(getters.filtered_observations.ifbs),
                total: getObservationStats([].concat(...Object.values(getters.filtered_observations))),
            }
        },
        map_data(state, getters){
            const flatData = Object.values(getters.filtered_observations).flat()
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

            return {
                states: Object.entries(mapData.states).map(([name, value]) => ({ name, value })),
                districts: Object.entries(mapData.districts).map(([name, value]) => ({ name, value })),
            }
        },
        table_data(state, getters){
            const table_data = {
                portals: {
                    headers: [{
                        name: "portal", 
                        label: "Portals",
                        sortable: false,
                        class: "nowrap"
                    },{
                        name: "observations", 
                        label: "Observations",
                        sortable: true
                    },{
                        name: "users", 
                        label: "Users",
                        sortable: true
                    },{
                        name: "states", 
                        label: "States",
                        sortable: true
                    },{
                        name: "districts", 
                        label: "Districts",
                        sortable: true
                    }],
                    rows:[]
                },
                taxa: {
                    headers: [{
                        name: "common_name",
                        label: "Name",
                        sortable: true,
                        class: "nowrap"
                    },{
                        name: "scientific_name",
                        label: "Scientific Name",
                        sortable: true,
                        class: "nowrap"
                    },{
                        name: "rank",
                        label: "Rank",
                        sortable: true,
                        class: "nowrap"
                    },{
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    },{
                        name: "users",
                        label: "Users",
                        sortable: true
                    },{
                        name: "states",
                        label: "States",
                        sortable: true
                    },{
                        name: "districts",
                        label: "Districts",
                        sortable: true
                    }],
                    rows:[]
                },
                state_portals: {
                    headers: [{
                        name: "portal", 
                        label: "Portals",
                        sortable: false,
                        class: "nowrap"
                    },{
                        name: "observations", 
                        label: "Observations",
                        sortable: true
                    },{
                        name: "users", 
                        label: "Users",
                        sortable: true
                    },{
                        name: "districts", 
                        label: "Districts",
                        sortable: true
                    }],
                    rows:[]
                },
                districts: {
                    headers: [{
                        name: "district",
                        label: "District",
                        sortable: false,
                        class: "nowrap"
                    },{
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    },{
                        name: "users",
                        label: "Users",
                        sortable: true
                    },{
                        name: "taxa",
                        label: "Taxa",
                        sortable: true
                    },{
                        name: "portals",
                        label: "Portals",
                        sortable: false
                    }],
                    rows:[]
                }
            }

            //portal rows
            let op = []
            
            for(let [key, value] of Object.entries(getters.observation_stats)){
                op.push({
                    portal: key,
                    observations: value.observations,
                    users: value.users,
                    states: value.states,
                    districts: value.districts,
                })
            }
            table_data.portals.rows = op
            
            //taxa rows
            const all_observations = Object.values(getters.filtered_observations).flat()
            op = d3.groups(all_observations, d => d[1]).map((taxon) => {
                let taxa = state.taxa.find((t) => t.id === taxon[0])
                if(!taxa) return {}
                return {
                    common_name: taxa.common_name,
                    scientific_name: taxa.name,
                    rank: taxa.rank,
                    observations: taxon[1].length,
                    users: countUnique(taxon[1].map((o) => o[0])),
                    states: countUnique(taxon[1].map((o) => o[4])),
                    districts: countUnique(taxon[1].map((o) => o[3])),
                }
            })
            table_data.taxa.rows = op.sort((a,b) => b.observations - a.observations)
            
            

            return table_data
            

        },
        filtered_map_data(state, getters){
            let op = JSON.parse(JSON.stringify(getters.map_data))
            if(state.filters.state != null){
                const state_districts = state.geojson.districts.features.filter((d) => d.properties.state === state.filters.state).map((d) => d.properties.district)
                op.states = op.states.filter(d => d.name === state.filters.state)
                op.districts = op.districts.filter(d => state_districts.includes(d.name))
            }
            if(state.filters.district != null){
                op.districts = op.districts.filter(d => d.name === state.filters.district)
            }
            return op
        }
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
        SET_GEOJSON(state, value) {
            state.geojson = value
            // console.log("Set_geojson", value)
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
            console.groupCollapsed("Loading Data")
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
            commit('SET_LOADING', 'Setting Filter')
            commit('SET_FILTER', data)
            commit('SET_LOADING', null)
        },
        async addStoredData({ dispatch, state }) {
            // console.log(d3.groups(inat_data, (d) => d.user))
            const new_data = inat_data
            console.log(new_data)
            const store_inat_data = {
            //     taxa: await axios.post("/api/data/store_taxa", {data: new_data.taxa}),
                observations: await axios.post("/api/data/store_inat_observations", {data:new_data})
            }
            console.log(store_inat_data)
        },
        async pullInat({ dispatch, state }, pull_all) {
            console.log("pullInat-pull-all:", pull_all)
            
            console.log("get_maps")
            await dispatch('getMaps')
            
            console.log("get_taxa")
            await dispatch('getTaxa')

            // console.log(inat_data)
            // let add = await axios.post("/api/data/store_inat_observations", {data:inat_data})
            // console.log(add)

            console.log("get_last_update_time")
            let response = await axios.get('/api/data/inat_last_updated')
            let last_update_time = response.data.split("T")[0]
            

            let base_url = 'https://api.inaturalist.org/v1/observations?place_id=any&project_id=big-butterfly-month-2023&verifiable=any&order=desc&order_by=updated'
            if(!pull_all) {
                base_url += `&updated_since=${last_update_time}` 
            }
            const per_page = 200
            
            console.log("get_initial_response")
            let url = getUrl(base_url, 1, 1)

            const initial_response = await axios.get(url)
            
            console.log("base_url", base_url)

            if(initial_response){
                console.log("total_results", initial_response.data.total_results)
                const total_pages = Math.ceil(initial_response.data.total_results / per_page) + 1
                let new_data = {
                    taxa: [],
                    observations: []
                }
                for(let p = 1 ; p <= total_pages ; p++){
                    url = getUrl(base_url, p, per_page)
                    const response = await axios.get(url)
                    console.log("url", url)
                    if(response){
                        console.log("response", response.data.results)
                        response.data.results.forEach((o) => {
                            let taxa_is_new = getNewTaxa(state.taxa, o.taxon, new_data.taxa)
                            if(taxa_is_new){
                                new_data.taxa.push(taxa_is_new)
                            }
                            new_data.observations.push(getNewObservation(o, state.geojson.districts.features))
                        })
                    }
                    console.log("new_data", new_data)
                    console.log("admin", d3.group(new_data.observations, (d) => d.state, (d) => d.district))
                }
                const store_inat_data = {
                    taxa: await axios.post("/api/data/store_taxa", {data: new_data.taxa}),
                    observations: await axios.post("/api/data/store_inat_observations", {data:new_data.observations})
                }
                console.log("store_inat_data", store_inat_data)
            }
        }
    }
}

function getObservationStats(data){
    return {
        observations: data.length,
        users: countUnique(data.map(x => x[0])),
        states: countUnique(data.map(x => x[4])),
        districts: countUnique(data.map(x => x[3])),
    }
}

function countUnique(arr){
    return [...new Set(arr)].length
}


function getNewObservation(observation, districts){
    let coordinates = observation.location.split(",").map((d) => parseFloat(d))
    const user = (observation.user.name && observation.user.name.length > 3) ? observation.user.name : observation.user.login
    let op = {
        id: observation.id,
        user_id: observation.user.id,
        user: user,
        observed_on: observation.observed_on,
        place: observation.place_guess,
        latitude: coordinates[0],
        longitude: coordinates[1],
        taxa_id: observation.taxon.id,
        img_url: observation.photos[0].url,
        inat_created_at: observation.created_at,
        inat_updated_at: observation.updated_at
        
    }

    districts.forEach((district) => {
        district.geometry.coordinates.forEach((polygon) => {
            let result = pointInPolygon(op.longitude, op.latitude, polygon);
            if(result){
                op.state = district.properties.state;
                op.district = district.properties.district;
                op.validated = true;
            }
        })
    })
    return op
}

function pointInPolygon(longitude, latitude, polygonVertices) {
    let intersections = 0;
    const vertexCount = polygonVertices.length;

    for (let i = 0; i < vertexCount; i++) {
        const j = (i + 1) % vertexCount;

        const vertexI = polygonVertices[i];
        const vertexJ = polygonVertices[j];

        if (vertexI[1] === vertexJ[1]) {
            // Skip horizontal edges
            continue;
        }

        if (latitude < Math.min(vertexI[1], vertexJ[1])) {
            // Skip if point is below the edge
            continue;
        }

        if (latitude >= Math.max(vertexI[1], vertexJ[1])) {
            // Skip if point is above the edge
            continue;
        }

        const xIntersect = (latitude - vertexI[1]) * (vertexJ[0] - vertexI[0]) / (vertexJ[1] - vertexI[1]) + vertexI[0];

        if (xIntersect > longitude) {
            intersections++;
        }
    }

    return (intersections % 2) === 1;
}


function getNewTaxa(taxa, taxon, new_taxa){
    if(taxa.filter((d) => d.id == taxon.id).length > 0 || new_taxa.filter((d) => d.id == taxon.id).length > 0){
        return false
    } else {
        return {
            id: taxon.id,
            name: taxon.name || '',
            common_name: taxon.preferred_common_name,
            rank: taxon.rank,
            ancestry: taxon.ancestry
        }
    }
}

function getUrl(base_url, page, per_page){
    return base_url + "&page=" + page + "&per_page=" + per_page
}

async function smallDelay(){
    await new Promise(resolve => setTimeout(resolve, 500));
}