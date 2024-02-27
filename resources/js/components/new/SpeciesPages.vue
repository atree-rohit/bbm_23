<template>
    <div class="container bg-info">
        <h1 class="h1">Species Pages</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in data">
                    <td>{{ key }}</td>
                    <td>{{ typeof value }}</td>
                    <td>{{ getValue(value) }}</td>
                </tr>
            </tbody>
        </table>
        {{ portal_stats }}
    </div>
</template>

<script lang="js" setup>
import {ref, computed, onMounted} from "vue"
import { useStore } from 'vuex'
import * as d3 from 'd3'

const store = useStore()
const {headers, observations, users, taxa, districts} = store.state.species_pages

onMounted(() => store.dispatch('species_pages/getAllData'))
const data = computed(() => store.state.species_pages)
const portal_stats = computed(() => {
    const op = {}
    if(data.value.observations){
        Object.keys(data.value.observations).forEach((portal) => {
            op[portal] = data.value.observations[portal].length
        })
    }
    return op
})

const getValue = (value) => {
    const value_type = typeof value
    let op = null
    switch (value_type){
        case'string':
            op = value
            break
        case 'number':
            op = value.toFixed(2)
            break
        case 'boolean':
            op = value.toString()
            break
        case 'object':
            if(value){
                op = Object.keys(value).length
            }
            break
    }
    return op

}
</script>
