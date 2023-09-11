<style scoped>
.modal {
    display: block !important;
}

.modal textarea {
    min-height: 10rem;
}

.btn-group>* {
    margin: 0 1rem;
}
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">View Observation Details</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body d-flex">
                    <div>
                        Validate Data
                        <pre>
                            {{ validate_data }}
                        </pre>
                    </div>
                    <div>
                        Location
                        <div class="btn-continer">
                            <button
                                class="btn btn-success mx-1"
                                v-for="level in levels"
                                :key="level"
                                @click="check(level)"
                                v-text="level"
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <!-- <button type="button" class="btn btn-success" @click="submit">Save changes</button> -->
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>


export default {
    name: 'ModalEditObservation',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            required: true
        },
        geojson: {
            type: Object,
            required: true
        }
    },
    emits: ["close"],
    data() {
        return {
            levels: ["countries", "states", "districts"]
        }
    },
    mounted() {
    },
    computed: {
        validate_data() {
            const { latitude, longitude, state, district, observed_on, date, taxa_id } = this.data
            return { latitude, longitude, state, district, observed_on, date, taxa_id }
        },
        show_map() {
            return (this.data.latitude && this.data.longitude) && (this.data.state == null || this.data.district == null)
        }
    },
    watch: {
        show(newVal) {
            this.current_district_coordinator_id = 0
            let body = document.querySelector('body')
            if (newVal == true) {
                body.classList.add('modal-open')
            } else {
                body.classList.remove('modal-open')
            }
        }
    },
    methods: {
        valueFromLabel(str) {
            return str.replace(/\s/g, '_').toLowerCase()
        },
        closeModal() {
            this.$emit('close')
        },
        check(level){
            let matching_polygon = null
            for(const country of this.geojson[level].features){
                // console.log(level, this.geojson[level])
                for(let polygons of country.geometry.coordinates){
                    if(level == "districts"){
                        polygons = [polygons]
                    }
                    for(const polygon of polygons){
                        console.log(polygon)
                        if (this.pointInPolygon(this.data.longitude, this.data.latitude, polygon)) {
                            switch(level){
                                case "countries": matching_polygon = country.properties.ADMIN
                                    break
                                case "states": matching_polygon = country.properties.state
                                    break
                                case "districts": matching_polygon = country.properties.districts
                                    break
                            }
                            break
                        }
                    }
                }
            }
            console.log(matching_polygon)
        },  
        pointInPolygon(longitude, latitude, polygonVertices) {
            let intersections = 0;
            const vertexCount = polygonVertices.length;

            for (let i = 0; i < vertexCount; i++) {
                const j = (i + 1) % vertexCount;

                const [xi, yi] = polygonVertices[i];
                const [xj, yj] = polygonVertices[j];

                if (yi === yj) {
                    continue;
                }

                if (latitude < Math.min(yi, yj)) {
                    // Skip if point is below the edge
                    continue;
                }

                if (latitude >= Math.max(yi, yj)) {
                    // Skip if point is above the edge
                    continue;
                }

                const xIntersect = (latitude - yi) * (xj - xi) / (yj - yi) + xi

                if (xIntersect > longitude) {
                    intersections++;
                }
            }

            return (intersections % 2) === 1;
        }
    }
}
</script>