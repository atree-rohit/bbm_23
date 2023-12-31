import axios from "axios"
import * as d3 from "d3"
// import inat_data from "../json/inat_data_2023_09_03.json"
// import inat_data from "../json/inat_data_2023_09_04.json"
import inat_data from "../json/inat_data_2023_09_08.json"
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
            countries: {},
            states: {},
            districts: {}
        },
        filters: {
            year: 2023,
            portal: null,
            state: null,
            district: null,
        },
        shouldPersist: false,
        last_update_time: {
            counts: null,
            inat: null,
            ibp: null,
            ifb:null
        },
        total_results: {
            counts: null,
            inat: null,
            ibp: null,
            ifb:null     
        },
        inat_total_results: 0,
        inat_bbm_total:0,
    },
    getters: {
        inat_new_total(state){
            return state.inat_total_results - state.inat_bbm_total
        },
        filtered_observations(state) {
            console.time("filtered_observations")
            let op = {}
            if (state.filters.year) {
                for (const portal in state.observations) {
                    const data = state.observations[portal];
                    const groupedData = d3.group(data, (d) => parseInt(d[2].substring(0, 4))); // Group by year
                    op[portal] = (groupedData.get(state.filters.year) || []);
                }
            } else {
                op = { ...state.observations };
            }
            if (state.filters.state) {
                for (const portal in op) {
                    op[portal] = op[portal].filter((d) => d[4] == state.filters.state)
                }
            }
            if (state.filters.portal && op[state.filters.portal]) {
                Object.keys(op).forEach((portal) => {
                    if (portal != state.filters.portal) {
                        op[portal] = []
                    }
                })
            }
            console.timeEnd("filtered_observations")
            return op
        },
        observation_stats(state, getters) {
            console.time("observations_stats")
            if (Object.keys(getters.filtered_observations).length === 0) {
                console.timeEnd("observations_stats")
                return {}
            }
            const data = {
                counts: getObservationStats(getters.filtered_observations.counts),
                inat: getObservationStats(getters.filtered_observations.inat),
                ibp: getObservationStats(getters.filtered_observations.ibp),
                ifb: getObservationStats(getters.filtered_observations.ifb),
                total: getObservationStats([].concat(...Object.values(getters.filtered_observations))),
            }
            console.timeEnd("observations_stats")
            return data
        },
        map_data(state, getters) {
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
        table_data(state, getters) {
            console.group("table_data getter Execution Time")
            console.time("total")
            console.time("init")
            const { filters, geojson } = state
            const { filtered_observations, observation_stats } = getters
            let op = []
            const table_data = {
                portals: {
                    headers: [{
                        name: "portal",
                        label: "Portals",
                        sortable: false,
                        class: "nowrap"
                    }, {
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    }, {
                        name: "users",
                        label: "Users",
                        sortable: true
                    }, {
                        name: "states",
                        label: "States",
                        sortable: true
                    }, {
                        name: "districts",
                        label: "Districts",
                        sortable: true
                    }],
                    rows: [],
                    total_row: true,
                    hue: "danger",
                    click: "portal",
                    sort_col: 1
                },
                locations: {
                    headers: [{
                        name: "state",
                        label: "State",
                        sortable: false,
                        class: "nowrap"
                    }, {
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    }, {
                        name: "users",
                        label: "Users",
                        sortable: true
                    }, {
                        name: "taxa",
                        label: "Taxa",
                        sortable: true
                    }, {
                        name: "portals",
                        label: "Portals",
                        sortable: false
                    }],
                    rows: [],
                    total_row: false,
                    hue: "info",
                    click: "state",
                    sort_col: 1
                },
                taxa: {
                    headers: [{
                        name: "common_name",
                        label: "Name",
                        sortable: true,
                        class: "nowrap"
                    }, {
                        name: "scientific_name",
                        label: "Scientific Name",
                        sortable: true,
                        class: "nowrap"
                    }, {
                        name: "rank",
                        label: "Rank",
                        sortable: true,
                        class: "nowrap"
                    }, {
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    }, {
                        name: "users",
                        label: "Users",
                        sortable: true
                    }, {
                        name: "states",
                        label: "States",
                        sortable: true
                    }, {
                        name: "districts",
                        label: "Districts",
                        sortable: true
                    }],
                    rows: [],
                    total_row: false,
                    hue: "primary",
                    click: null,
                    sort_col: 3
                },
                date: {
                    headers: [{
                        name: "year",
                        label: "Year",
                        sortable: true,
                        class: "nowrap"
                    }, {
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    }, {
                        name: "taxa",
                        label: "Taxa",
                        sortable: true
                    }, {
                        name: "users",
                        label: "Users",
                        sortable: true
                    }, {
                        name: "states",
                        label: "States",
                        sortable: true
                    }, {
                        name: "districts",
                        label: "Districts",
                        sortable: true
                    }],
                    rows: [],
                    total_row: false,
                    hue: "danger",
                    click: null,
                    sort_col: 0
                },
                users: {
                    headers: [{
                        name: "user",
                        label: "User",
                        sortable: true,
                        class: "nowrap"
                    }, {
                        name: "portals",
                        label: "Portals",
                        sortable: true
                    }, {
                        name: "observations",
                        label: "Observations",
                        sortable: true
                    }, {
                        name: "taxa",
                        label: "Taxa",
                        sortable: true
                    }, {
                        name: "years",
                        label: "Years",
                        sortable: true
                    }, {
                        name: "states",
                        label: "States",
                        sortable: true
                    }, {
                        name: "districts",
                        label: "Districts",
                        sortable: true
                    }],
                    rows: [],
                    total_row: false,
                    hue: "warning",
                    click: null,
                    sort_col: 2
                }
            }
            const all_observations_flat = Object.values(filtered_observations).flat()
            console.timeEnd("init")
            if (all_observations_flat.length === 0) {
                console.timeEnd("total")
                console.groupEnd()
                return table_data
            }

            //portal rows
            console.time("portal")
            table_data.portals.rows = Object.entries(observation_stats).map(([key, value]) => ({
                portal: key,
                ...value
            }))
            console.timeEnd("portal")

            //locations rows
            console.time("locations")
            op = []
            if (filters.state == null) {
                if (geojson.states.features) {
                    let grouped_states = d3.groups(all_observations_flat, (o) => o[4])
                    op = grouped_states.reduce((result, [stateName, stateObservations]) => {
                        const portals = Object.keys(filtered_observations).filter((portal) => stateObservations.some((o) => o[4] === stateName))
                        const uniqueUsers = new Set()
                        const uniqueTaxa = new Set()

                        stateObservations.forEach((o) => {
                            uniqueUsers.add(o[0])
                            uniqueTaxa.add(o[1])
                        })

                        result.push({
                            state: stateName,
                            observations: stateObservations.length,
                            users: uniqueUsers.size,
                            taxa: uniqueTaxa.size,
                            portals: portals.map(fixPortalNames).join(", "),
                        })

                        return result
                    }, [])
                }
            } else {
                if (geojson.districts.features) {
                    table_data.locations.headers[0].name = "district"
                    table_data.locations.headers[0].label = "District"
                    table_data.locations.click = "district"

                    const state_districts = geojson.districts.features
                        .filter((d) => d.properties.state === filters.state)
                        .map((d) => d.properties.district)

                    state_districts.map((district) => {
                        let data = {}

                        for (const portal of Object.keys(filtered_observations)) {
                            data[portal] = filtered_observations[portal]
                                .filter((o) => o[3] === district)
                        }
                        const allDataFlat = Object.values(data).flat()
                        const uniqueUsers = countUnique(allDataFlat.map((d) => d[2]))
                        const uniqueTaxa = countUnique(allDataFlat.map((d) => d[1]))
                        op.push({
                            district: district,
                            observations: allDataFlat.length,
                            users: uniqueUsers,
                            taxa: uniqueTaxa,
                            portals: Object.entries(data)
                                .filter((d) => d[1].length > 0)
                                .map((d) => fixPortalNames(d[0]))
                                .join(", ")
                        })
                    })
                }
            }
            table_data.locations.rows = op
            console.timeEnd("locations")

            //taxa rows
            console.time("taxa")
            op = d3.groups(all_observations_flat, d => d[1]).map((taxon) => {
                let taxa = state.taxa.find((t) => t.id === taxon[0])
                if (!taxa) return {}
                const observations = taxon[1].length
                const users = observations === 1 ? 1 : countUnique(taxon[1].map((o) => o[0]))
                const states = observations === 1 ? 1 : countUnique(taxon[1].map((o) => o[4]))
                const districts = observations === 1 ? 1 : countUnique(taxon[1].map((o) => o[3]))
                return {
                    common_name: taxa.common_name,
                    scientific_name: taxa.name,
                    rank: taxa.rank,
                    observations: observations,
                    users: users,
                    states: states,
                    districts: districts,
                }
            })
            table_data.taxa.rows = op
            console.timeEnd("taxa")

            //date rows
            console.time("date")
            if (filters.year == null) {
                op = d3.groups(all_observations_flat, d => d[2].slice(0, 4)).map((group) => {
                    return {
                        year: group[0],
                        observations: group[1].length,
                        taxa: countUnique(group[1].map((o) => o[1])),
                        users: countUnique(group[1].map((o) => o[0])),
                        states: countUnique(group[1].map((o) => o[4])),
                        districts: countUnique(group[1].map((o) => o[3]))
                    }
                })
            } else {
                table_data.date.headers[0].name = "date"
                table_data.date.headers[0].label = "Date"
                op = d3.groups(all_observations_flat, d => d[2]).map((group) => {
                    return {
                        date_raw: group[0],
                        date: formatDate(group[0]),
                        observations: group[1].length,
                        taxa: countUnique(group[1].map((o) => o[1])),
                        users: countUnique(group[1].map((o) => o[0])),
                        states: countUnique(group[1].map((o) => o[4])),
                        districts: countUnique(group[1].map((o) => o[3]))
                    }
                })
            }
            table_data.date.rows = op
            console.timeEnd("date")

            //users rows
            console.time("user")
            const userToPortals = {};
            for (const portal in filtered_observations) {
                for (const observation of filtered_observations[portal]) {
                    const user = observation[0];
                    userToPortals[user] = userToPortals[user] || new Set();
                    userToPortals[user].add(portal)
                }
            }

            table_data.users.rows = d3.groups(all_observations_flat, (d) => d[0]).map((group) => {
                const user = group[0];
                const portals = userToPortals[user] ? [...userToPortals[user]].join(', ') : '';

                const uniqueTaxa = countUnique(group[1].map((o) => o[1]));
                const uniqueYears = [...new Set(group[1].map((o) => o[2].slice(0, 4)))].join(', ');

                return {
                    user: user,
                    portals: fixPortalNames(portals),
                    observations: group[1].length,
                    taxa: uniqueTaxa,
                    years: uniqueYears,
                    states: countUnique(group[1].map((o) => o[4])),
                    districts: countUnique(group[1].map((o) => o[3])),
                };
            })
            console.timeEnd("user")
            console.timeEnd("total")
            console.groupEnd()
            return table_data


        },
        filtered_map_data(state, getters) {
            let op = JSON.parse(JSON.stringify(getters.map_data))
            if (state.filters.state != null) {
                const state_districts = state.geojson.districts.features.filter((d) => d.properties.state === state.filters.state).map((d) => d.properties.district)
                op.states = op.states.filter(d => d.name === state.filters.state)
                op.districts = op.districts.filter(d => state_districts.includes(d.name))
            }
            if (state.filters.district != null) {
                op.districts = op.districts.filter(d => d.name === state.filters.district)
            }
            return op
        }
    },
    mutations: {
        SET_LOADING(state, value) {
            if (value != null) {
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
        SET_LAST_UPDATE_TIME(state,value){
            state.last_update_time = value
        },
        SET_TOTAL_RESULTS(state,value){
            state.total_results = value
        },
        SET_INAT_TOTAL_RESULTS(state, value){
            state.inat_total_results = value
        },
        SET_INAT_BBM_TOTAL(state, value){
            state.inat_bbm_total = value
        },
        SET_OBSERVATIONS(state, value) {
            const place_names_map = new Map(state.geojson.districts.features.map((d) => [d.properties.district, d.properties.state]))
            let updatedObservations = []
            Object.entries(value).map(([portal, observations]) => {
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
        },
        SET_FILTER(state, data) {
            state.filters[data.field] = (state.filters[data.field] == data.value) ? null : data.value
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
            if (!data) {
                const response = await axios.get('/api/maps/geojson');
                data = response.data;
                console.log('getMaps', data)
                saveData("geojson", data);
            }
            commit('SET_GEOJSON', data)
        },
        setLoading({ commit }, value) {
            commit('SET_LOADING', value)
            // console.log("setLoading", value)
        },
        async setFilter({ commit }, data) {
            commit('SET_LOADING', 'Setting Filter')
            commit('SET_FILTER', data)
            commit('SET_LOADING', null)
        },
        async addStoredData({ dispatch, state }) {
            // console.log(d3.groups(inat_data, (d) => d.user))
            const new_data = inat_data
            console.log(new_data)
            const store_inat_data = {
                taxa: await axios.post("/api/data/store_taxa", {data: new_data.taxa}),
                observations: await axios.post("/api/data/store_inat_observations", {data:new_data.observations})
            }
            console.log(store_inat_data)
        },
        async initInatPull({dispatch}){
            await dispatch('getTotalResultsInternal')
            await dispatch('getInatNewTotal')
            await dispatch('getInatTotalResults')
        },
        async pullInat({ commit, dispatch, state, getters }, pull_all) {
            
            commit('SET_LOADING', 'iNatPull ' + pull_all)
            // console.groupCollapsed("Loading Data")
            // console.log("pullInat-pull-all:", pull_all)
            
            // console.log("get_maps")
            commit('SET_LOADING', 'getMaps')
            await dispatch('getMaps')
            
            // console.log("get_taxa")
            commit('SET_LOADING', 'getTaxa')
            await dispatch('getTaxa')
            
            let base_url = 'https://api.inaturalist.org/v1/observations?place_id=any&project_id=big-butterfly-month-2023&verifiable=any&order=desc&order_by=updated'
            const last_update_time = await dispatch('getLastUpdateTimes')
            if(last_update_time)
            {
                if (!pull_all) {
                    base_url += "&updated_since=" + last_update_time.inat
                }
            }
            const per_page = 200
            let url = ""           
            
            const total_observations = await axios.get(base_url + "&per_page=0")
            if(total_observations){
                const total_pages = Math.ceil(total_observations.data.total_results / per_page) + 1
                // const total_pages = 1
                let store_inat_data = []
                for(let p = 1 ; p <= total_pages ; p++){
                    await smallDelay()
                    let new_data = {
                        taxa: [],
                        observations: []
                    }
                    url = getUrl(base_url, p, per_page)
                    const response = await axios.get(url)
                    let loading_message_base = `Pulling data from: Page ${p} of ${total_pages}`
                    console.groupCollapsed(loading_message_base)
                    // console.group("Pull page", p, "of", total_pages)
                    // console.log("url", url)
                    commit('SET_LOADING', `${loading_message_base}<br>Pull Url: ${url}`)
                    if(response){
                        // console.log("responses", response.data.results.length)
                        commit('SET_LOADING', `${loading_message_base}<br>Observations: ${response.data.results.length}`)
                        response.data.results.forEach((o) => {
                            let taxa_is_new = getNewTaxa(state.taxa, o.taxon, new_data.taxa)
                            if(taxa_is_new){
                                new_data.taxa.push(taxa_is_new)
                            }
                            new_data.observations.push(getNewObservation(o, state.geojson.districts.features))
                        })
                    }
                    const new_data_arr = Object.entries(new_data).map(([key, value]) => [key, value.length])
                    commit('SET_LOADING', `${loading_message_base}<br>New Data<br> Taxa: ${new_data_arr[0][1]}<br> Observations: ${new_data_arr[1][1]}`)
                    // console.log("new_data", new_data_arr)
                    store_inat_data.push({
                        taxa: await axios.post("/api/data/store_taxa", {data: new_data.taxa}),
                        observations: await axios.post("/api/data/store_inat_observations", {data:new_data.observations})
                    })
                    // console.log("admin", d3.group(new_data.observations, (d) => d.state, (d) => d.district))
                    // console.log("store_inat_data", store_inat_data)
                    console.groupEnd()
                }
            }
            commit('SET_LOADING', null)
        },
        async getLastUpdateTimes({commit}){
            let response = await axios.get('/api/data/last_updated')
            if(response){
                const last_update_time = response.data
                commit("SET_LAST_UPDATE_TIME", last_update_time)
                return last_update_time
            }
        },
        async getTotalResultsInternal({commit}){
            let response = await axios.get('/api/data/total_results')
            if(response){
                console.log("total_results", response.data)
                const total_results = response.data
                commit("SET_TOTAL_RESULTS", total_results)
            }
        },
        async getInatTotalResults({commit}){
            let response = await axios.get("https://api.inaturalist.org/v1/observations?project_id=big-butterfly-month-2023&verifiable=any&per_page=0")
            if(response){
                commit("SET_INAT_TOTAL_RESULTS", response.data.total_results)
                return response.data
            }
        },
        async getInatNewTotal({commit, state}){
            let response = await axios.get("/api/data/inat_new_total_2023")
            if(response){
                commit("SET_INAT_BBM_TOTAL", response.data)
            }
        }
    }
}

function formatFloat(num){
    return parseFloat(num.toFixed(4))
}
const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

function fixPortalNames(portal) {
    return portal.replace("inats", "iNat").replace("ibps", "IBP").replace("ifbs", "IFB")
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().substring(2);
    const day = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth

    return `${day}-${month}, ${year} (${dayOfWeek})`;
}

function getObservationStats(data) {
    const stats = {
        users: new Set(),
        states: new Set(),
        districts: new Set(),
    };

    for (const item of data) {
        stats.users.add(item[0]);
        stats.states.add(item[4]);
        stats.districts.add(item[3]);
    }

    return {
        observations: data.length,
        users: stats.users.size,
        states: stats.states.size,
        districts: stats.districts.size,
    };
}

function countUnique(arr) {
    const uniqueValues = {};
    let count = 0;

    for (const item of arr) {
        if (!uniqueValues[item]) {
            uniqueValues[item] = true;
            count++;
        }
    }

    return count;
}


function getNewObservation(observation) {
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
    return op
}

function getObservationPolygon(field, coordinates, all_polygons) {
    const lat_lon = coordinates.split(",").map(d => parseFloat(d))
    for(const place of all_polygons){
        for(const polygons of place.geometry.coordinates){
            for(const polygon of polygons){
                if (pointInPolygon(lat_lon[1], lat_lon[0], polygon)) {
                    return place.properties[field]
                }
            }
        }
    }
    return null
}

function getObservationDistrict(field, coordinates, all_polygons) {
    const lat_lon = coordinates.split(",").map(d => parseFloat(d))
    for(const place of all_polygons){
        for(const polygons of place.geometry.coordinates){
            if (pointInPolygon(lat_lon[1], lat_lon[0], polygons)) {
                return place.properties[field]
            }
        }
    }
    return null
}

function pointInPolygon(longitude, latitude, polygonVertices) {
    // console.log(longitude, latitude, polygonVertices)
    let intersections = 0;
    const vertexCount = polygonVertices.length;

    for (let i = 0; i < vertexCount; i++) {
        const j = (i + 1) % vertexCount;

        const [xi, yi] = polygonVertices[i];
        const [xj, yj] = polygonVertices[j];

        if (yi === yj) {
            continue;
        }

        if (latitude < Math.min(yi, yj)) {
            // Skip if point is below the edge
            continue;
        }

        if (latitude >= Math.max(yi, yj)) {
            // Skip if point is above the edge
            continue;
        }

        const xIntersect = (latitude - yi) * (xj - xi) / (yj - yi) + xi

        if (xIntersect > longitude) {
            intersections++;
        }
    }

    return (intersections % 2) === 1;
}


function getNewTaxa(taxa, taxon, new_taxa) {
    if (taxa.filter((d) => d.id == taxon.id).length > 0 || new_taxa.filter((d) => d.id == taxon.id).length > 0) {
        return false
    } else {
        return {
            id: taxon.id,
            name: taxon.name || '',
            common_name: taxon.preferred_common_name || '',
            rank: taxon.rank,
            ancestry: taxon.ancestry
        }
    }
}

function getUrl(base_url, page, per_page) {
    return base_url + "&page=" + page + "&per_page=" + per_page
}

async function smallDelay() {
    await new Promise(resolve => setTimeout(resolve, 500));
}
