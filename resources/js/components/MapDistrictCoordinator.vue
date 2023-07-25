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
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import MapComponent from './MapComponent.vue'
import districts from '../json/districts.json'
import states from '../json/states.json'

export default defineComponent({
    name: "MapDistrictCoordinator",
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
            district_coordinators: state => state.district_coordinators.all_data
        }),
        map_data(){
            let all = {
                states: this.geojson.state.features.map(f => f.properties.state),
                districts: this.geojson.district.features.map(f => f.properties.district),
            }
            let op = {
                state: all.states.map((s) => {
                    return {
                        name: s,
                        value: 0
                    }
                }),
                district: all.districts.map((d) => {
                    return {
                        name: d,
                        value: 0
                    }
                })
            }
            this.district_coordinators.forEach((d) => {
                op.state.find((s, i) => d.state == this.valueFromLabel(s.name)).value += 1
                op.district.forEach((s) => {
                    if(d.district == this.valueFromLabel(s.name)){
                        s.value += 1
                    }
                })
            })
            
            return op
        }
    },
    mounted(){
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
