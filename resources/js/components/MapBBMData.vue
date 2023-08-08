<style>
.map-container{
    width: 100%;
}
</style>

<template>
    <div class="map-container border border-danger rounded">
        <map-component
            :geojson='geojson[mode]'
            :data='map_data'
            :modes="['state', 'district']"
            tooltip_third_row_label="Observations"
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import MapComponent from './MapComponent.vue'
import districts from '../json/districts.json'
import states from '../json/states.json'

export default defineComponent({
    name: "MapBBMData",
    components: {
        MapComponent
    },
    emits: ["polygon-clicked"],
    data() {
        return {
            geojson: {
                district: districts,
                state: states
            },
            mode: 'state'
        }
    },
    computed:{
        ...mapState({
            district_coordinators: state => state.district_coordinators.all_data,
            map_data: state => state.data.map_data
        }),
    },
    mounted(){
        console.log("MapBBMData mounted")
    },
    watch: {
        map_data(newVal){
            console.log("mapData changed")
            console.log(newVal)
        }
    },
    methods:{
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        polygonClick(data){
            this.$emit('polygon-clicked', data)
        }
    }
})
</script>
