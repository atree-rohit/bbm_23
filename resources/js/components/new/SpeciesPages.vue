<template>
    <div class="container-fluid border border-danger rounded">
        <h1 class="h1">Species Pages ( {{ all_species.length }} )</h1>
        <div class="container-fluid" v-if="geojson_loaded">
            <species-page
                v-for="species in all_species.slice(0, 20)"
                :key="species.id"
                :data="species"
            />
        </div>

        <!-- {{ portal_stats }} -->
    </div>
</template>

<script lang="js" setup>
import {ref, computed, onMounted, watch} from "vue"
import { useStore } from 'vuex'
import SpeciesPage from "./SpeciesPage.vue"

onMounted(() => {
    store.dispatch("maps/getAllData");
    store.dispatch("species_pages/getTaxa");
})
const geojson_loaded = ref(false);
const min_observations = 3
const store = useStore()
const all_species = computed(() => store.state.species_pages.all_species
    .filter((s) => s.observations.length >= min_observations)
    .sort((a,b) => b.observations.length - a.observations.length)
)
const geojsons = computed(() => store.state.maps.districts)
watch(() => geojsons.value, (newVal) => {
    geojson_loaded.value = true
})
</script>
