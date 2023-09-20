<style scoped>

    .page-info{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;        
    }
    .table-container{
        max-width: 100%;
        overflow: auto;
        max-height: 60vh;
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
    <div class="btn-rows bg-secondary">
        <div class="btn-group w-100 p-1">
            <button
                class="btn btn-sm mx-2 rounded"
                v-for="portal in portals"
                :key="portal"
                :class="{'btn-success': portal === selected_portal, 'btn-outline-light': portal !== selected_portal}"
                v-text="portal"
                @click="selected_portal = (selected_portal == portal) ? null : portal"
            />
        </div>
        <div class="btn-group w-100 p-1">
            <button
                class="btn btn-sm mx-2 rounded"
                v-for="filter in data_filters"
                :key="filter"
                :class="{'btn-success': filter === selected_filter, 'btn-outline-light': filter !== selected_filter}"
                v-text="filter"
                @click="selected_filter = (selected_filter == filter) ? null : filter"
            />
        </div>
        <div class="page-info">
            <button class="btn btn-sm btn-info" @click="page_no--"> &lt; </button>
            <span>Page {{page_no}} of {{Math.ceil(filtered_data.length / per_page)}}</span>
            <button class="btn btn-sm btn-info" @click="page_no++"> &gt; </button>
            Total Records: {{filtered_data.length}}
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
    <ModalEditObservation
        :show="show_modal"
        :data="modal_observation_data"
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

const store = useStore()
const portals = ["counts", "inat", "ibp", "ifb"]
const selected_portal = ref(null)
const data_filters = ["all", "validated", "unvalidated"]
const selected_filter = ref("unvalidated")
const sort_col = ref("id")
const sort_dir = ref("asc")
const per_page = ref(1000)
const page_no = ref(1)

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

const data = computed(() => store.getters["clean_data/data_with_classes"])

const filtered_data = computed(() => {
    let op = []
    if(data && data.value && data.value[0]){
        switch(selected_filter.value){
            case "all": op = data.value
                break
            case "validated": op = data.value.filter(row => row.validated)
                break
            case "unvalidated": op = data.value.filter(row => !row.validated)
                break
        }
    }
    return op
})

const paginated_data = computed(() => {
    const start = (page_no.value - 1) * per_page.value
    const end = start + per_page.value
    return filtered_data.value.slice(start, end)
})

const sorted_data = computed(() => {
    if (data && data.value && data.value[0]) {
        return paginated_data.value.sort((a, b) => {
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
    modal_observation_data.value = {
        ...row,
        portal: selected_portal.value
    }
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
