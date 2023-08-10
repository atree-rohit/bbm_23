<style>
.map-container{
    width: 100%;
}
</style>

<template>
    <div class="map-container">
        <loading-data />
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
import { mapState } from 'vuex'
import store from '../store'
import MapData from './MapData.vue'
import LoadingData from './LoadingData.vue'
import districts from '../json/districts.json'
import states from '../json/states.json'

export default {
    name: "MapBBMData",
    components: {
        MapData,
        LoadingData
    },
    // emits: ["polygon-clicked"],
    data() {
        return {
            geojson: {
                district: districts,
                state: states
            },
            mode: 'state',
            selected: {
                state: null,
                district: null,
            }
        }
    },
    computed:{
        ...mapState({
            district_coordinators: state => state.district_coordinators.all_data,
            map_data: state => state.data.map_data
        }),
        filtered_map_data(){
            let op = JSON.parse(JSON.stringify(this.map_data))
            if(this.selected.state != null){
                const state_districts = this.geojson.district.features.filter((d) => d.properties.state === this.selected.state).map((d) => d.properties.district)
                op.state = op.state.filter(d => d.name === this.selected.state)
                op.district = op.district.filter(d => state_districts.includes(d.name))
            }
            if(this.selected.district != null){
                op.district = op.district.filter(d => d.name === this.selected.district)
            }
            return op
        }
    },
    mounted(){
    },
    watch: {
        // map_data(newVal){
        //     console.log("mapData changed", newVal)
        // }
    },
    methods:{
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        polygonClick(data){
            this.selected[data.mode] = this.selected[data.mode] === data.name ? null : data.name
            this.selected[data.mode === 'state' ? 'district' : 'state'] = null
            this.$emit('state-selected', this.selected)
        }
    }
}
</script>
