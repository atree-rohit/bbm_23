<template>
    <div class="container-fluid rounded">
        <!-- <h1 class="h1">Species Pages ( {{ all_species?.length }} )</h1>
        <div class="footer-nav mx-auto d-flex gap-1">
            <button
                class="btn"
                v-text="`<`"
                :disabled="currentPage <= 1"
                :class="
                    currentPage > 1
                        ? 'btn-outline-success'
                        : 'btn-outline-danger'
                "
                @click="
                    currentPage =
                        currentPage > 1 ? currentPage - 1 : currentPage
                "
            />
            <div class="bg-light py-2 px-4">
                {{ currentPage }} of {{ totalPages }}
            </div>
            <button
                class="btn"
                v-text="`>`"
                :disabled="currentPage == totalPages"
                :class="
                    currentPage == totalPages
                        ? 'btn-outline-danger'
                        : 'btn-outline-success'
                "
                @click="
                    currentPage =
                        currentPage == totalPages
                            ? currentPage
                            : currentPage + 1
                "
            />
        </div>
        <div class="bg-secondary text-light">
            {{ selected_images }}
        </div> -->
        <div class="container-fluid" v-if="geojson_loaded">
            <species-page
                v-for="species in all_species.slice(
                    pageStart,
                    pageStart + perPage
                )"
                :key="species.id"
                :data="species"
                @selectedImage="selectedImage"
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
const store = useStore()
const all_species = computed(() => store.getters["species_pages/all_species"])
const species_images = computed(() => store.state.species_pages.species_images)
const geojsons = computed(() => store.state.maps.districts)
watch(() => geojsons.value, (newVal) => {
    geojson_loaded.value = true
})

const selected_images = ref([]);

const selectedImage = (image) => {
    const index = selected_images.value.findIndex(img => img.species_id === image.species_id)
    if(index !== -1){
        if(image.id && selected_images.value[index].id != image.id){
            selected_images.value[index] = image
        } else {
            selected_images.value.splice(index, 1)
        }
    } else {
        selected_images.value.push(image)
    }
    console.log([...selected_images.value, ...species_images.value])
}

const currentPage = ref(1);
const perPage = ref(50);
const totalPages = computed(() =>  Math.ceil(all_species.value.length / perPage.value));
const pageStart = computed(() => perPage.value * (currentPage.value - 1));
</script>
