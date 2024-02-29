<style>
.species-container {
    outline: 4px dashed rgba(128, 128, 128, 0.555);
    border-radius: 2rem;

    display: grid;
    min-height: 10vh;
    max-height: 90vh;
    /* max-width: 60vw; */
    margin: 1rem 0;
    grid-template-columns: 0.7fr 0.3fr 1fr;
    grid-template-rows: 0.1fr 0.9fr 2fr;
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
    justify-content: center;
    align-items: center;
    outline: 4px solid rgba(0, 38, 255, 0.507);
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
    grid-template-areas:
        "total-observations total-users total-bbms"
        "total-states total-districts total-portals";
}
.species-stats > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.species-stats > div .value,
.species-stats > div .label {
    /* flex-grow: 1; */
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
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
                <span class="value" v-text="stats?.observations" />
                <span class="label">observations</span>
            </div>
            <div class="total-users">
                <span class="value" v-text="stats?.users" />
                <span class="label">users</span>
            </div>
            <div class="total-bbms">
                <span class="value" v-text="stats?.bbms" />
                <span class="label">BBMs</span>
            </div>
            <div class="total-states">
                <span class="value" v-text="stats?.states" />
                <span class="label">states</span>
            </div>
            <div class="total-districts">
                <span class="value" v-text="stats?.districts" />
                <span class="label">districts</span>
            </div>
            <div class="total-portals">
                <span class="value" v-text="stats?.portals" />
                <span class="label">portals</span>
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

const stats = ref(null)
const species_name = ref(null)
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(["selectedImage"])

onMounted(() => {
    species_name.value = props.data.name
    if(props.data.common_name){
        species_name.value += ` (${props.data.common_name})`
    }
    const observations = props.data.observations
    const years = d3.groups(observations, (o) => o.date.split("-")[2])
        .map((y) => y[0])
        .filter((y) => parseInt(y) >= 2020).sort()
    const portals = d3.groups(observations, (o) => o.portal).map((y) => y[0])

    stats.value = {
        observations: observations.length,
        users: d3.groups(observations, (o) => o.user).length,
        bbms: years,
        states: d3.groups(observations, (o) => o.state).length,
        districts: d3.groups(observations, (o) => o.district).length,
        portals: portals
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
