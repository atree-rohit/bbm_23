<style>
.map-container{
    width: 100%;
}
</style>

<template>
    <div class="map-container">
        <div class="border border-danger d-flex justify-content-center py-1">
            <button
                class="btn btn-sm mx-1"
                v-for="year in years"
                :key="year"
                :class="{'btn-success': (year === selected_year || selected_year == null ), 'btn-outline-light': (year !== selected_year)}"
                @click="selectYear(year)"
                v-text="year"
            >

            </button>            
        </div>
        <map-data
            :geojson='geojson'
            :data='filtered_map_data'
            :mode="mode"
            tooltip_third_row_label="Observations"
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '../store'
import MapData from './MapData.vue'

export default {
    name: "MapBBMData",
    components: {
        MapData
    },
    emits: ["state-selected"],
    data() {
        return {
            mode: 'states',
            years: [2020, 2021, 2022, 2023],
            selected_year: 2023,
            selected: {
                states: null,
                districts: null,
            }
        }
    },
    computed:{
        ...mapState({
            district_coordinators: state => state.district_coordinators.all_data,
            geojson: state => state.data.geojson,
        }),
        ...mapGetters({
            filtered_map_data: 'data/filtered_map_data'
        }),
    },
    methods:{
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        polygonClick(data){
            this.selected[data.mode] = this.selected[data.mode] === data.name ? null : data.name
            this.selected[data.mode === 'state' ? 'district' : 'state'] = null
            this.$emit('state-selected', this.selected)
        },
        selectYear(year){
            if(this.selected_year == year){
                this.selected_year = null
            } else {
                this.selected_year = year
            }
            store.dispatch('data/setFilter', {field:"year", value: this.selected_year})
        }
    }
}
</script>
