<style scoped>
    .table-container{
        max-width: 100%;
        overflow: auto;
        max-height: 80vh;
    }

    .table-container .table thead {
        position: sticky;
        top: 0;
        z-index: 1; /* Ensure it's on top of the table cells */
    }

    .table tbody tr{
        cursor: pointer;
    }
</style>

<template>
    <div class="btn-group border border-secondary w-100 p-3">
        <button
            class="btn mx-2 rounded"
            v-for="portal in portals"
            :key="portal"
            :class="{'btn-success': portal === selected_portal, 'btn-outline-secondary': portal !== selected_portal}"
            v-text="portal"
            @click="selected_portal = portal"
        />
    </div>
    {{ data.length }}
    <div class="table-container border border-danger" v-if="selected_portal">
        <table class="table table-sm table-hover">
            <thead class="bg-dark text-light">
                <tr>
                    <th
                        v-for="header in headers"
                        :key="header"
                        v-text="header"
                    />
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in unvalidated"
                    :key="row.id"
                    @click="rowClick(row)"
                    :class="rowClass(row)"
                >
                    <td
                        v-for="header in headers"
                        :key="header"
                        v-text="row[header]"
                    />
                </tr>
            </tbody>
        </table>
    </div>
    <MapCleanData
        :data="unvalidated"
        :modes="['countries', 'states', 'districts']"
        tooltip_third_row_label=""
    />
    <ModalEditObservation
        :show="show_modal"
        :data="modal_observation_data"
        :geojson="geojson"
        @close="closeModal"
    />
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ModalEditObservation from './ModalEditObservation.vue'
import MapCleanData from './MapCleanData.vue'

const store = useStore()
const portals = ["counts", "inat", "ibp", "ifb"]
const selected_portal = ref("")

const show_modal = ref(false)
const modal_observation_data = ref({})

onMounted(() => {
    store.dispatch("data/getMaps")
})

watch(selected_portal, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        store.dispatch('clean_data/getData', newVal)
        // console.log(newVal)
    }
})

const geojson = computed(() => store.state.data.geojson)
const data = computed(() => store.state.clean_data.data)
const headers = computed(() => {
    if(data && data.value && data.value[0]){
        return ["id", "user", "observed_on", "place", "country", "state", "district", "latitude", "longitude", "taxa_id", "validated"]
        // return Object.keys(data.value[0])
    } else {
        return []
    }
})
const unvalidated = computed(() => data.value.filter((d) => d.validated == false))


const rowClick = (row) => {
    modal_observation_data.value = row
    show_modal.value = true
}

const closeModal = () => {
    modal_observation_data.value = {}
    show_modal.value = false    
}

const rowClass = (row) =>  row.validated ? "table-success" : "table-danger"
</script>
