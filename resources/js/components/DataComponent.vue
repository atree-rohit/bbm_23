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
                            :data="table_data.taxa.rows"
                            :total_row="false"
                            hue="info"
                        />
                    </template>
                    <template v-else-if="active_filter.name == 'Portals'">
                        <data-table
                            :headers="table_data.portals.headers"                    
                            :data="table_data.portals.rows"
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
import { mapState, mapGetters } from 'vuex'
import store from '../store'

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
                    active: true,
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
                    active: false,
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
        ...mapGetters({
            observation_stats: 'data/observation_stats',
            table_data: 'data/table_data'
        }),
        active_filter(){
            return this.filters.filter((f) => f.active)[0]
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