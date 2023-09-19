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
    <div class="btn-rows">
        <div class="btn-group border border-secondary w-100 p-3">
            <button
                class="btn mx-2 rounded"
                v-for="portal in portals"
                :key="portal"
                :class="{'btn-success': portal === selected_portal, 'btn-outline-secondary': portal !== selected_portal}"
                v-text="portal"
                @click="selected_portal = (selected_portal == portal) ? null : portal"
            />
        </div>
        <div class="btn-group border border-secondary w-100 p-3">
            <button
                class="btn mx-2 rounded"
                v-for="filter in data_filters"
                :key="filter"
                :class="{'btn-success': filter === selected_filter, 'btn-outline-secondary': filter !== selected_filter}"
                v-text="filter"
                @click="selected_filter = (selected_filter == filter) ? null : filter"
            />
        </div>

    </div>
    <div class="table-container border border-danger" v-if="selected_portal">
        <table class="table table-sm table-hover">
            <thead class="bg-dark text-light">
                <tr>
                    <th
                        v-for="header in headers"
                        :key="header"
                        v-text="header"
                        @click="sortCol(header)"
                    />
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in sorted_data"
                    :key="row.id"
                    @click="rowClick(row)"
                    :class="rowClass(row)"
                >
                    <td
                        v-for="header in headers"
                        :key="header"
                        v-text="row[header]"
                        :class="cellClass(row,header)"
                    />
                </tr>
            </tbody>
        </table>
    </div>
    <MapCleanData
        :data="filtered_data"
        :modes="['countries', 'states', 'districts']"
        tooltip_third_row_label=""
    />
    <ModalEditObservation
        :show="show_modal"
        :data="modal_observation_data"
        :geojson="geojson"
        @close="closeModal"
    />
    <pre>
        {{ data[0] }}
    </pre>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ModalEditObservation from './ModalEditObservation.vue'
import MapCleanData from './MapCleanData.vue'

const store = useStore()
const portals = ["counts", "inat", "ibp", "ifb"]
const selected_portal = ref("")
const data_filters = ["all", "validated", "unvalidated"]
const selected_filter = ref("all")
const sort_col = ref("id")
const sort_dir = ref("asc")

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
const data = computed(() => store.getters["clean_data/data_with_classes"])

const filtered_data = computed(() => {
    if(data && data.value && data.value[0]){
        switch(selected_filter.value){
            case "all":
                return data.value
            case "validated":
                return data.value.filter(row => row.validated)
            case "unvalidated":
                return data.value.filter(row => !row.validated)
        }
    }
    return []
})

const sorted_data = computed(() => {
    if (data && data.value && data.value[0]) {
        return filtered_data.value.sort((a, b) => {
            const valA = a[sort_col.value];
            const valB = b[sort_col.value];

            // Check data types
            const isNumber = (value) => !isNaN(value);
            const isBoolean = (value) => typeof value === 'boolean';

            if (isNumber(valA) && isNumber(valB)) {
                // Sort as numbers
                return sort_dir.value === 'asc' ? valA - valB : valB - valA;
            } else if (isBoolean(valA) && isBoolean(valB)) {
                // Sort as booleans (true comes before false)
                return sort_dir.value === 'asc' ? (valA - valB) : (valB - valA);
            } else {
                // Sort as strings (default)
                return sort_dir.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
        });
    }
    return [];
});






const headers = computed(() => {
    if(data && data.value && data.value[0]){
        return ["id", "user", "observed_on", "place", "country", "state", "district", "latitude", "longitude", "taxa_id", "species", "validated"]
    } else {
        return []
    }
})

const sortCol = (col) => {
    if(sort_col.value === col){
        sort_dir.value = (sort_dir.value === "asc") ? "desc" : "asc"
    } else {
        sort_col.value = col
        sort_dir.value = "asc"
    }
    console.log(col, sort_col.value, sort_dir.value)
}

const rowClick = (row) => {
    modal_observation_data.value = row
    show_modal.value = true
}

const closeModal = () => {
    modal_observation_data.value = {}
    show_modal.value = false    
}

const rowClass = (row) =>  {
    return row.classes.all ? "table-success" : "table-danger"
}

const cellClass = (cell, col) => {
    const classMap = {
        'observed_on': 'classes.date',
        'user': 'classes.user',
        'country': 'classes.location.country',
        'state': 'classes.location.state',
        'district': 'classes.location.district',
        'latitude': 'classes.location.latitude',
        'longitude': 'classes.location.longitude',
        'taxa_id': 'classes.taxon.taxa_id',
        'species': 'classes.taxon.species',
        'validated': 'validated',
    };

    const classKey = classMap[col];

    if (classKey) {
        const hasClass = classKey.split('.').reduce((value, key) => (value && value[key]), cell);
        return hasClass ? 'table-success' : 'table-danger';
    }

    return 'table-warning';
};


</script>
