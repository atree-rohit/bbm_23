<style scoped>
.data-container{
    padding: 0;
    background: steelblue;
    height: calc(100vh - 70px);
    position: relative;
    margin: 0 0.25rem;
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
.canvas .tables{
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.canvas .tables .table-container{
    max-height: 100%;
    width: 100%;
    padding: 1rem;
    overflow: auto;
}
.canvas .tables > *:nth-child(2){
    flex-grow: 100;
    /* border: 2px solid #f3f; */
}

.canvas .tables > *:nth-child(3){
    flex-shrink: 100;
    /* border: 2px solid #ff3; */
}
</style>

<template>
    <div class="data-container">
        <div class="canvas">
            <div class="map">
                <MapBBMData @state-selected="stateSelected"/>
            </div>
            <div class="tables">
                <template v-if="!selected">
                    <data-table
                        :headers="table_data.portals.headers"                    
                        :data="portal_stats"
                        :total_row="true"
                        hue="danger"
                    />
                    <data-table
                        :headers="table_data.taxa.headers"                    
                        :data="taxa_stats"
                        :total_row="false"
                        hue="primary"
                    />
                </template>
                <template v-else>
                    <h1 class="bg-warning text-center py-0">{{ selected }}</h1>
                    <data-table
                        :headers="table_data.state_portals.headers"                    
                        :data="state_table_data.portals"
                        :total_row="true"
                        hue="success"
                    />
                    <data-table
                        :headers="table_data.districts.headers"                    
                        :data="state_table_data.districts"
                        :total_row="false"
                        hue="danger"
                    />
                </template>
                
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
                    active: false
                },
                {
                    id: 2,
                    name: "Location",
                    active: false
                },
                {
                    id: 3,
                    name: "Taxa",
                    active: false
                },
                {
                    id: 4,
                    name: "Date",
                    active: false
                },
                {
                    id: 5,
                    name: "Users",
                    active: true
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
                        name: "rank",
                        label: "Rank",
                        sortable: false,
                        class: "nowrap"
                    },{
                        name: "count",
                        label: "Count",
                        sortable: true
                    },{
                        name: "unique",
                        label: "Unique",
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
            observations: state => state.data.observations,
            taxa: state => state.data.taxa,
            geojson: state => state.data.geojson,
        }),
        observation_stats(){
            if(Object.keys(this.observations).length === 0) {
                console.log("no observations")
                return {}
            }
            let op = {
                counts: this.observationStats(this.observations.counts),
                inat: this.observationStats(this.observations.inats),
                ibp: this.observationStats(this.observations.ibps),
                ifb: this.observationStats(this.observations.ifbs),
                total: this.observationStats([].concat(...Object.values(this.observations))),
            }
            
            return op
        },
        portal_stats(){
            let op = []
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
            const all_observations = Object.values(this.observations).flat()
            let op = d3.groups(this.taxa, d => d.rank).map((group) => {
                return {
                    rank: group[0],
                    count: all_observations.filter((o) => group[1].map((o) => o.id).includes(o[1])).length,
                    unique: this.countUnique(group[1].map(x => x.name))
                }
            })
            return op.filter((t) => t.count > 0)
        },
        state_table_data(){
            let op = {
                portals: [],
                districts: [],
            }
            let portal_data = {}
            Object.keys(this.observations).map((portal) => {
                portal_data[portal] = this.observations[portal].filter((o) => {
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
                Object.keys(this.observations).map((portal) => {
                    data[portal] = this.observations[portal].filter((o) => {
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
        console.log("dispatch")
        store.dispatch('data/getAllData')
    },
    methods: {
        observationStats(data){
            let op = {
                observations: data.length,
                users: this.countUnique(data.map(x => x[2])),
                states: this.countUnique(data.map(x => x[4])),
                districts: this.countUnique(data.map(x => x[5])),
            }
            
            return op
        },
        getObservationsCount(data){
            let observations = 0
            data.map((d) => {
                Object.keys(this.observations).forEach((portal) => {
                    observations += this.observations[portal].filter((o) => {
                        return o[1] == d.id
                    }).length
                })
            })
            return observations
        },
        countUnique(arr){
            return [...new Set(arr)].length
        },
        async stateSelected(data){
            this.selected = data.state
            
        }
    }
}
</script>