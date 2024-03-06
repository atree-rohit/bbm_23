<template>
    <div class="container-fluid rounded">
        <!-- <h1 class="h1">
            States Pages ( {{ Object.keys(states_data)?.length }} )
        </h1> -->
        <!-- <div class="footer-nav mx-auto d-flex gap-1">
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

        {{ states_data.length }}
        <div class="container-fluid" v-if="geojson_loaded">
            <state-page
                v-for="(state_data, state) in states_data"
                :key="state"
                :data="state_data"
                :name="state"
            />
            <!-- <state-page :data="states_data[`West Bengal`]" name="West Bengal" /> -->
            <!-- @selectedImage="selectedImage" -->
        </div>

        <!-- {{ portal_stats }} -->
    </div>
</template>

<script lang="js" setup>
import {ref, computed, onMounted, watch} from "vue"
import { useStore } from 'vuex'
import StatePage from "./StatePage.vue"

onMounted(() => {
    store.dispatch("maps/getAllData");
    store.dispatch("new_data/getTaxa");
})
const geojson_loaded = ref(false);
const store = useStore()

const states_data = computed(() => store.state.new_data.states_data)
const geojsons = computed(() => store.state.maps.districts)
watch(() => geojsons.value, (newVal) => {
    geojson_loaded.value = true
    const map_states = store.state.maps.states.features.map((s) => s.properties.state).sort()
    const data_states = Object.keys(states_data.value).sort()
    let unmatched = []
    unmatched.push(map_states.filter((s) => data_states.indexOf(s) == -1))
    unmatched.push(data_states.filter((s) => map_states.indexOf(s) == -1))

    console.log(data_states)
    console.log(map_states)
})

const currentPage = ref(1);
const perPage = ref(3);
// const totalPages = computed(() =>  Math.ceil(all_species.value.length / perPage.value));
// const pageStart = computed(() => perPage.value * (currentPage.value - 1));
</script>
