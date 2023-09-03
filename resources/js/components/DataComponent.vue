<style scoped>
.data-container{
    padding: 0;
    background: steelblue;
    height: calc(100vh - 70px);
    position: relative;
    margin: 0 0.25rem;
}

.nav-pills{
    padding: 0.5rem;
    margin: 0 0.5rem;
}
.canvas{
    height: 100%;
    border:1px solid yellow;
    display: flex;
}
.canvas .map{
    flex: 1 1 0;
    display: grid;
    justify-content: center;
    align-items: center;
}

.tables-container{
    display: grid;
    grid-template-rows: 3.5rem auto;
}
.canvas .tables{
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: hsl(120, 25%, 50%);
    overflow: auto;
}

.nav-pills .nav-link.active{
    background-color:green;
}

@media screen and (max-width: 768px){
    .data-container{
        height: 125vh;
    }
    .nav-pills{
        padding: 0;
        margin: 0.5rem;
    }
    .nav-link{
        padding: 0.25rem 0.66rem;
    }
    .canvas{
        flex-direction:column;
    }
    }
</style>

<template>
    <div class="data-container">
        <div class="canvas">
            <div class="map">
                <MapBBMData @state-selected="stateSelected"/>
            </div>
            <div class="tables-container">
                <ul class="nav nav-pills bg-light justify-content-center rounded">
                    <li
                        class="nav-item"
                        v-for="filter in filters"
                        :key="filter.id"
                    >
                        <a
                            class="nav-link"
                            aria-current="page"
                            href="#"
                            :class="{'active': filter.active, 'disabled': filter.disabled}"
                            v-text="filter.name"
                            @click="selectFilterTab(filter)"
                        />
                    </li>
                    
                </ul>
                <div class="tables">
                    <h1 class="bg-warning text-center py-0">{{ selected }}</h1>
                    <template v-if="active_filter.name=='Taxa'">
                        <data-table
                            :headers="table_data.taxa.headers"                    
                            :data="taxa_stats"
                            :total_row="false"
                            hue="info"
                        />
                    </template>
                    <template v-else-if="active_filter.name == 'Portals'">
                        <data-table
                            :headers="table_data.portals.headers"                    
                            :data="portal_stats"
                            :total_row="true"
                            hue="danger"
                        />
                    </template>
                    <div v-else>
                        {{ active_filter }}

                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import * as d3 from 'd3'

import MapBBMData from './MapBBMData.vue'
import DataTable from './DataTable.vue'


export default {
    name: "DataComponent",
    components: {
        MapBBMData,
        DataTable
    },
    data() {
        return {
            filters: [
                {
                    id: 1,
                    name: "Portals",
                    active: false,
                    disabled: false
                },
                {
                    id: 2,
                    name: "Location",
                    active: false,
                    disabled: true
                },
                {
                    id: 3,
                    name: "Taxa",
                    active: true,
                    disabled: false
                },
                {
                    id: 4,
                    name: "Date",
                    active: false,
                    disabled: true
                },
                {
                    id: 5,
                    name: "Users",
                    active: false,
                    disabled: true
                }
            ],
            table_data: {
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
                }
            },
            selected: null
        }
    },
    computed: {
        ...mapState({
            filtered_observations: state => state.data.filtered_observations,
            observations: state => state.data.observations,
            taxa: state => state.data.taxa,
            geojson: state => state.data.geojson,
        }),
        active_filter(){
            return this.filters.filter((f) => f.active)[0]
        },
        observation_stats(){
            if(Object.keys(this.filtered_observations).length === 0) {
                // console.log("no observations")
                return {}
            }
            let op = {
                counts: this.observationStats(this.filtered_observations.counts),
                inat: this.observationStats(this.filtered_observations.inats),
                ibp: this.observationStats(this.filtered_observations.ibps),
                ifb: this.observationStats(this.filtered_observations.ifbs),
                total: this.observationStats([].concat(...Object.values(this.filtered_observations))),
            }
            
            return op
        },
        portal_stats(){
            let op = []
            console.log(this.observation_stats)
            for(let [key, value] of Object.entries(this.observation_stats)){
                op.push({
                    portal: key,
                    observations: value.observations,
                    users: value.users,
                    states: value.states,
                    districts: value.districts,
                })
            }
            
            return op
        },
        taxa_stats(){
            // common_name, scientific_name,  rank, observations, users, states, districts
            const all_observations = Object.values(this.filtered_observations).flat()
            let op = d3.groups(all_observations, d => d[1]).map((taxon) => {
                let taxa = this.taxa.find((t) => t.id === taxon[0])
                if(!taxa) return {}
                return {
                    common_name: taxa.common_name,
                    scientific_name: taxa.name,
                    rank: taxa.rank,
                    observations: taxon[1].length,
                    users: this.countUnique(taxon[1].map((o) => o[0])),
                    states: this.countUnique(taxon[1].map((o) => o[4])),
                    districts: this.countUnique(taxon[1].map((o) => o[3])),
                }
            })
            return op.sort((a,b) => b.observations - a.observations)

        },
        state_table_data(){
            let op = {
                portals: [],
                districts: [],
            }
            let portal_data = {}
            Object.keys(this.filtered_observations).map((portal) => {
                portal_data[portal] = this.filtered_observations[portal].filter((o) => {
                    return o[4] === this.selected
                })
            })
            Object.keys(portal_data).map((portal) => {
                op.portals.push({
                    portal: portal,
                    observations: portal_data[portal].length,
                    users: this.countUnique(portal_data[portal].map(x => x[2])),
                    districts: this.countUnique(portal_data[portal].map(x => x[3])),
                })
            })
            op.portals.push({
                portal: "total",
                observations: Object.values(portal_data).flat().length,
                users: this.countUnique(Object.values(portal_data).flat().map(x => x[2])),
                districts: this.countUnique(Object.values(portal_data).flat().map(x => x[3])),
            })

            const state_districts = this.geojson.districts.features.filter((d) => d.properties.state === this.selected).map((d) => d.properties.district)
            state_districts.map((district) => {
                let data = {}
                Object.keys(this.filtered_observations).map((portal) => {
                    data[portal] = this.filtered_observations[portal].filter((o) => {
                        return o[3] === district
                    })
                })
                op.districts.push({
                    district: district,
                    observations: Object.values(data).flat().length,
                    users: this.countUnique(Object.values(data).flat().map((d) => d[2])),
                    taxa: this.countUnique(Object.values(data).flat().map((d) => d[1])),
                    portals: Object.entries(data)
                            .filter((d) => d[1].length > 0)
                            .map((d) => d[0])
                            .join(", ")
                            .replace("inats", "iNat")
                            .replace("ibps", "IBP")
                            .replace("ifbs", "IFB")
                })
            })
            
            return op
        }
    },
    created(){
        store.dispatch('data/getAllData')
        console.log(this.observations)
    },
    methods: {
        observationStats(data){
            let op = {
                observations: data.length,
                users: this.countUnique(data.map(x => x[2])),
                states: this.countUnique(data.map(x => x[4])),
                districts: this.countUnique(data.map(x => x[3])),
            }
            
            return op
        },
        getObservationsCount(data){
            let observations = 0
            data.map((d) => {
                Object.keys(this.filtered_observations).forEach((portal) => {
                    observations += this.filtered_observations[portal].filter((o) => {
                        return o[1] == d.id
                    }).length
                })
            })
            return observations
        },
        countUnique(arr){
            return [...new Set(arr)].length
        },
        selectFilterTab(filter){
            this.filters.map((f) => {
                f.active = false
            })
            filter.active = true
        },
        async stateSelected(data){
            this.selected = data.state
            store.dispatch('data/setFilter', {field:"state", value: this.selected})            
        }
    }
}
</script>