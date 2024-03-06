<style scoped>
.state-container {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    /* grid-template-rows: 0.1fr 1fr auto;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    grid-template-areas:
        "state-name state-table"
        "state-map state-table"
        "state-stats state-table"; */
    /* outline: 2px solid coral; */
}

.state-container > div {
    /* outline: 2px solid hsla(180, 50%, 25%, 0.5);
    border-radius: 0.5rem; */
    display: grid;
    /* justify-content: center; */
    align-items: center;
    /* overflow: hidden; */
    /* padding: 1rem; */
}
.state-name {
    justify-content: start !important;
    font-size: 2rem;
    grid-area: state-name;
}
.state-taxa {
    grid-area: state-taxa;
}
.state-map {
    grid-area: state-map;
}
.state-table {
    grid-area: state-table;
}
.state-stats {
    grid-area: state-stats;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 0.25rem;
}

.stat-card {
    display: flex;
    flex-direction: column;
    border: 2px solid hsl(0, 0%, 50%, 0.75);
    border-radius: 1rem;
}

.stat-card-2 {
    grid-column: span 2;
}

.state-stats > div .stat-value,
.state-stats > div .stat-label {
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

@media print {
    /* Adjust styles for printing */
    .state-container {
        page-break-after: always; /* Ensure each species is printed on a new page */
        margin: 0; /* Reset margin for printing */
    }
}
</style>

<template>
    <div class="state-container">
        <div class="state-name">{{ name }}</div>
        <!-- <div class="state-taxa">taxa</div> -->
        <div class="state-map">
            <d3-state-map :data="map_data" :state="name" v-if="map_data" />
        </div>
        <div class="state-stats">
            <div class="stat-card">
                <span class="stat-value" v-text="state_stats?.observations" />
                <span class="stat-label">observations</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" v-text="state_stats?.users" />
                <span class="stat-label">users</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" v-text="state_stats?.taxa" />
                <span class="stat-label">taxa</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" v-text="state_stats?.species" />
                <span class="stat-label">species</span>
            </div>
            <div class="stat-card stat-card-2">
                <stats-portals
                    :data="state_stats?.portals"
                    v-if="state_stats?.portals"
                />
                <span class="stat-label">portals</span>
            </div>
            <div class="stat-card stat-card-2">
                <stats-b-b-m
                    :data="state_stats?.bbms"
                    v-if="state_stats?.bbms"
                />
                <span class="stat-label">Years</span>
            </div>
            <!-- <pre>
                {{ state_stats }}
            </pre> -->
        </div>
        <div class="state-table">
            <districts-table
                :data="districts_table_data"
                :state="name"
                class="w-100"
                v-if="districts_table_data"
            />
        </div>
    </div>
</template>

<script lang="js" setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import * as d3 from "d3";

import D3StateMap from "./D3StateMap.vue";
import DistrictsTable from "./DistrictsTable.vue";
import StatsPortals from "./StatsPortals.vue";
import StatsBBM from "./StatsBBM.vue";

const store = useStore();

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const taxa = computed(() => store.state.new_data.taxa);
const map_data = ref(null);
const districts_table_data = ref(null);
const state_stats = ref(null);

const set_map_data = () => {
    map_data.value = Object.keys(props.data).map((district) => {
                return {
                    name: district,
                    value: props.data[district].length
                }
            });
}

const set_table_data = () => {
    districts_table_data.value = Object.keys(props.data).map((d) => {
        const district_data = props.data[d]
        const district_taxa = d3.groups(district_data, (d) => d.taxa)
        const district_species = district_taxa.map((d) => d[0]).filter((t_id) => {
            const matching_taxa = taxa.value.find((t) => t.id == t_id)
            return (matching_taxa && matching_taxa.rank == "species")
        })
        const bbms = d3.groups(district_data, (d) => d.date.split("-")[2]).map((d) => d[0] - 2000).sort()
        return {
            name: d,
            observations: district_data.length,
            users: d3.groups(district_data, (d) => d.user).length,
            taxa: district_taxa.length,
            species: district_species.length,
            bbms: bbms,
            portals: d3.groups((district_data), (d) => d.portal).map((d) => d[0])
        }
    }).sort((a,b) => b.observations - a.observations)
}

const set_state_stats = () => {
    const all_observations = Object.values(props.data).flat()
    const all_taxa = d3.groups(all_observations, (d) => d.taxa)
    const all_species = all_taxa.map((d) => d[0]).filter((t_id) => {
        const matching_taxa = taxa.value.find((t) => t.id == t_id)
        return (matching_taxa && matching_taxa.rank == "species")
    })
    console.log(all_species)

    state_stats.value = {
        observations: all_observations.length,
        users: d3.groups(all_observations, (d) => d.user).length,
        taxa: all_taxa.length,
        species: all_species.length,
        bbms: d3.groups((all_observations), (d) => d.date.split("-")[2]).map((d) => {
            return {
                year: d[0],
                observations: d[1].length,
            }
        }),
        portals: d3.groups((all_observations), (d) => d.portal).map((d) => {
            return {
                portal: d[0],
                observations: d[1].length
            }
        }).sort((a,b) => b.observations - a.observations)
    }
    // console.log(Object.keys(state_stats.value))
}

const set_data = () => {
    set_map_data();
    set_table_data();
    set_state_stats();
}

onMounted(() => {
    set_data();
})
watch(() => props.data, (newVal, oldVal) => {
    if(newVal) {
        set_data();
    }
})
</script>
