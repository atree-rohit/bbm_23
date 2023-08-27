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
            tooltip_third_row_label="Coordinator(/s)"
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import MapComponent from './MapComponent.vue'

export default defineComponent({
    name: "MapDistrictCoordinator",
    components: {
        MapComponent
    },
    emits: ["polygon-clicked"],
    data() {
        return {
            mode: 'states'
        }
    },
    computed:{
        ...mapState({
            district_coordinators: state => state.district_coordinators.all_data,
            geojson: state => state.data.geojson,
        }),
        map_data(){
            let op = {}
            if(this.geojson.states.features){
                let all = {
                    states: this.geojson.states.features.map(f => f.properties.state),
                    districts: this.geojson.districts.features.map(f => f.properties.district),
                }
                op = {
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
            }
            
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
