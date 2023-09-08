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
    .canvas .map{   
    flex: 0 1 0;
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
                    <li class="nav-item">
                        <a href="#" class="nav-link" @click="show_modal = true">Data Policy</a>
                    </li>
                </ul>
                <div class="tables">
                    <h1 class="bg-warning text-center py-0">{{ selected }}</h1>
                    <template v-if="active_filter.name == 'Portals'">
                        <data-table
                            :content="table_data.portals"
                        />
                    </template>
                    <template v-else-if="active_filter.name=='Location'">
                        <data-table
                            :content="table_data.locations"
                        />
                    </template>
                    <template v-else-if="active_filter.name=='Taxa'">
                        <data-table
                            :content="table_data.taxa"
                        />
                    </template>
                    <template v-else-if="active_filter.name=='Date'">
                        <data-table
                            :content="table_data.date"
                        />
                    </template>
                    <template v-else-if="active_filter.name=='Users'">
                        <data-table
                            :content="table_data.users"
                        />
                    </template>
                    <div v-else>
                        {{ active_filter }}

                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <loading-data />
    <ModalDataPolicy :show="show_modal" @close="show_modal = false"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '../store'

import MapBBMData from './MapBBMData.vue'
import LoadingData from './LoadingData.vue'
import DataTable from './DataTable.vue'
import ModalDataPolicy from './ModalDataPolicy.vue'


export default {
    name: "DataComponent",
    components: {
        MapBBMData,
        DataTable,
        LoadingData,
        ModalDataPolicy
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
                    disabled: false
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
                    disabled: false
                },
                {
                    id: 5,
                    name: "Users",
                    active: false,
                    disabled: false
                }
            ],
            show_modal:false,
            selected: null
        }
    },
    computed: {
        ...mapState({
            geojson: state => state.data.geojson,
        }),
        ...mapGetters({
            table_data: 'data/table_data'
        }),
        active_filter(){
            return this.filters.filter((f) => f.active)[0]
        },
    },
    created(){
        store.dispatch('data/getAllData')
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