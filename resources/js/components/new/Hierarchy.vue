<style>
.hierarchy-table-container {
    --clr-grey: rgb(201, 201, 245);
    /* padding: 0.15rem; */
    height: 100%;
    display: flex;
    border-radius: 1rem;
    border: 2px solid var(--clr-grey);
    overflow: hidden;
}
.hierarchy-table {
    width: 17.5vw;

    /* border-radius: 1rem; */
}
.hierarchy-table tbody {
    border-radius: 5rem;
    font-size: 0.9rem;
}

.hierarchy-table td {
    border: 0px solid red;
    padding: 3px 6px;
    text-align: center;
}
.hierarchy-table td:first-child {
    font-weight: 600;
    text-transform: capitalize;
}

tr:nth-child(odd) {
    background-color: var(--clr-grey);
}
</style>
<template>
    <div class="hierarchy-table-container">
        <table class="hierarchy-table">
            <tbody>
                <tr v-for="taxa in hierarchy" :key="taxa.id">
                    <td v-text="taxa?.rank" />
                    <td v-text="taxa?.name" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="js" setup>
import {ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import * as d3 from 'd3'
import * as d3Legend from "d3-svg-legend"

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const store = useStore();

const taxa = computed(() => store.state.species_pages.taxa)
const hierarchy = computed(() => {
    let op = []
    const ancestry = props.data.ancestry.split("/")
    ancestry.push(props.data.id)
    ancestry.forEach((a) => {
        const t = taxa.value.find((t) => t.id == a)
        if(t && ["stateofmatter", "kingdom", "phylum", "subphylum", "subclass"].indexOf(t.rank) == -1){
            op.push(t)
        }
    })
    return op
})
</script>
