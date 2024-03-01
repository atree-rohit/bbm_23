<style>
.species-container {
    /* outline: 4px dashed rgba(128, 128, 128, 0.555); */
    border-radius: 2rem;

    display: grid;
    min-height: 10vh;
    max-height: 90vh;
    /* max-width: 60vw; */
    margin: 1rem 0;
    grid-template-columns: 0.3fr 0.3fr 1fr;
    grid-template-rows: 0.1fr 1fr 1fr;
    padding: 0.5rem 1.5rem;
    gap: 0.5rem;
    grid-auto-flow: row;
    grid-template-areas:
        "species-name species-name species-name"
        "species-photo species-photo species-map"
        "species-hierarchy species-stats species-stats";
}

.species-container > div,
.species-stats > div {
    /* display: grid;
    outline: 4px solid rgba(0, 38, 255, 0.507);
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    height: 100%; */
}
.species-name {
    font-size: 2rem;
    justify-content: start !important;
    grid-area: species-name;
}
.species-photo {
    grid-area: species-photo;
    overflow: hidden;
    text-align: center;
}

.species-map {
    grid-area: species-map;
}

.species-hierarchy {
    grid-area: species-hierarchy;
}

.species-stats {
    grid-area: species-stats;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row;
    gap: 0.5rem;
    grid-template-areas:
        "total-observations total-portals total-bbms"
        "total-users total-states total-districts";
}
.species-stats > div {
    border: 2px solid hsl(0, 0%, 50%, 0.75);
    border-radius: 1rem;
    display: grid;
    overflow: hidden;
}
.species-stats > div .stat-value,
.species-stats > div .stat-label {
    width: 100%;
    text-transform: capitalize;
    display: grid;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
}
.stat-value {
    font-size: 3rem;
}
.stat-label {
    /* background: hsl(0, 0%, 50%, 0.75); */
    border-top: 1px solid hsl(0, 0%, 50%, 0.45);
}
.total-observations {
    grid-area: total-observations;
}

.total-users {
    grid-area: total-users;
}

.total-bbms {
    grid-area: total-bbms;
}

.total-states {
    grid-area: total-states;
}

.total-districts {
    grid-area: total-districts;
}

.total-portals {
    grid-area: total-portals;
}

@media print {
    /* Adjust styles for printing */
    .species-container {
        page-break-after: always; /* Ensure each species is printed on a new page */
        margin: 0; /* Reset margin for printing */
    }
}
</style>

<template>
    <div class="species-container">
        <!-- {{ Object.keys(data) }} -->
        <div class="species-name">{{ species_name }}</div>
        <div class="species-photo">
            <species-photo
                :species_data="data"
                @selectedImage="selectedImage"
            />
        </div>
        <div class="species-map">
            <d3-map :data="data.observations" />
        </div>
        <div class="species-hierarchy">
            <hierarchy :data="data" />
        </div>
        <div class="species-stats">
            <div class="total-observations">
                <span class="stat-value" v-text="stats?.observations" />
                <span class="stat-label">observations</span>
            </div>
            <div class="total-portals">
                <stats-portals :data="portals_data" v-if="portals_data" />
                <span class="stat-label">portals</span>
            </div>
            <div class="total-bbms">
                <stats-b-b-m :data="bbm_data" v-if="bbm_data" />
                <span class="stat-label">Years</span>
            </div>
            <div class="total-users">
                <span class="stat-value" v-text="stats?.users" />
                <span class="stat-label">users</span>
            </div>
            <div class="total-states">
                <span class="stat-value" v-text="stats?.states" />
                <span class="stat-label">states</span>
            </div>
            <div class="total-districts">
                <span class="stat-value" v-text="stats?.districts" />
                <span class="stat-label">districts</span>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
import {ref, computed, onMounted} from "vue";
import * as d3 from "d3";

import SpeciesPhoto from "./SpeciesPhoto.vue";
import D3Map from "./D3Map.vue";
import Hierarchy from "./Hierarchy.vue";
import StatsPortals from "./StatsPortals.vue";
import StatsBBM from "./StatsBBM.vue";

const stats = ref(null)
const species_name = ref(null)
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(["selectedImage"])

const bbm_data = ref(null);
const portals_data = ref(null);

onMounted(() => {
    species_name.value = props.data.name
    if(props.data.common_name){
        species_name.value += ` (${props.data.common_name})`
    }
    const observations = d3.groups(props.data.observations, (o) => o.date.split("-")[2])
        .filter((y) => parseInt(y[0]) >= 2020)
    const filtered_observations = observations.map((y) => y[1]).flat()

    bbm_data.value = observations
        .map((y) => {
            return {
                year: y[0],
                observations: y[1].length
            }
        }).sort((a,b) => a.year - b.year)
    portals_data.value = d3.groups(filtered_observations, (o) => o.portal)
                        .map((p) => {
                            return {
                                portal: p[0],
                                observations: p[1].length
                            }
                        }).sort((a,b) => b.observations - a.observations)

    stats.value = {
        observations: filtered_observations.length,
        users: d3.groups(filtered_observations, (o) => o.user).length,
        states: d3.groups(filtered_observations, (o) => o.state).length,
        districts: d3.groups(filtered_observations, (o) => o.district).length,
    }
})

const selectedImage = (image) => {
    let op = {
        species_id: props.data.id,
        ...image
    }

    emit("selectedImage", op)
}
</script>
