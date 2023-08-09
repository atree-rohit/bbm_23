<style>
.map-container{
    width: 100%;
}
</style>

<template>
    {{ selected }}
    <div class="map-container border border-danger rounded">
        <loading-data />
        <map-component
            :geojson='geojson[mode]'
            :data='filtered_map_data'
            :modes="['state', 'district']"
            tooltip_third_row_label="Observations"
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import MapComponent from './MapComponent.vue'
import LoadingData from './LoadingData.vue'
import districts from '../json/districts.json'
import states from '../json/states.json'

export default defineComponent({
    name: "MapBBMData",
    components: {
        MapComponent,
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
                op.state = op.state.filter(d => d.name === this.selected.state)
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
        map_data(newVal){
            console.log("mapData changed", newVal)
        }
    },
    methods:{
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        polygonClick(data){
            this.selected[data.mode] = this.selected[data.mode] === data.name ? null : data.name;
            this.selected[data.mode === 'state' ? 'district' : 'state'] = null;
        }
    }
})
</script>
