<style scoped>
.data-container{
    padding: 0;
    background: steelblue;
    height: calc(100vh - 70px);
    position: relative;
    margin: 0 0.25rem;
}

.filters{
    background: rgba(50, 50, 50, 0.85);
    color: #bbb;
    position: absolute;
    border-radius: 2rem;
    width: 3.5rem;
    margin: 0.5rem;
    padding: 0.5rem;
    /* height: calc(100% - 1rem); */
    height: 3.5rem;
    transition: all 350ms;
    overflow:hidden;
}
.filters:hover{
    z-index: 10;
    width: calc(50% + 2rem);
    height: calc(100% - 1rem);
}

.filters > ul{
    background: rgba(50, 50, 50, 1);
    display: none;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    height: calc(100% - 7.5rem);
    margin-top: 7.5rem;
    border-radius: 2rem;
}

.filters > .expand-btn{
    height: 100%;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    transition: all 50ms;
}
.filters:hover > ul{
    display: flex;
}

.filters:hover > .expand-btn{
    font-size: 0;
    width: 0;
    height: 0;
    transform: rotate(180deg);
}

.filters > ul > li {
    margin: 0.25rem;
    padding: 0.5rem;
    flex: 0 1 0;
    border: 1px solid green;
    transition: all 350ms;
    border-radius: 2rem;
}
.filters > ul > li > .header{
    cursor: pointer;
    padding: 0.5rem;
}

.filters > ul > li > .header:hover{
    background: rgba(255, 255, 255, 1);
    color: #333;
    border-radius: 2rem;
    
}
.filters > ul > li.active{
    flex: 1 1 0;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    
    padding: 0.5rem;
}

.canvas{
    margin-left: 4.5rem;
    height: 100%;
    border:1px solid yellow;
    display: flex;
}
.canvas > *{
    flex: 1 1 0;
    display: grid;
    justify-content: center;
    align-items: center;
}

.canvas .observations,
.canvas .taxa{
    border: 1px solid green;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

</style>

<template>
    <div class="data-container">
        <div class="filters">
            <div class="expand-btn"> >> </div>
            <ul class="filter-list">
                <li
                    v-for="filter in filters"
                    :key="filter.id"
                    :class="{'active': filter.active}"
                    @click="filter.active = !filter.active"
                >
                    <div class="header">{{ filter.name }}</div>
                </li>
            </ul>
        </div>
        <div class="canvas">
            <div class="observations">
                
                <table class="table table-sm">
                    <thead  class="bg-info">
                        <tr>
                            <th scope="col">Portal</th>
                            <th scope="col">Observations</th>
                            <th scope="col">Users</th>
                            <th scope="col">States</th>
                            <th scope="col">Districts</th>
                        </tr>
                    </thead>
                    <tbody class="table-info">
                        <tr
                            v-for="(row, key) in observation_table_stats"
                            :key="key"
                        >
                            <td>{{ row.portal }}</td>
                            <td>{{ row.observations }}</td>
                            <td>{{ row.users }}</td>
                            <td>{{ row.states }}</td>
                            <td>{{ row.districts }}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-sm">
                    <thead class="bg-danger text-light">
                        <tr>
                            <th>Rank</th>
                            <th>Count</th>
                            <th>Unique</th>
                        </tr>
                    </thead>
                    <tbody class="table-danger">
                        <tr
                            v-for="(row, key) in taxa_stats"
                            :key="key"
                        >
                            <td>{{ row.rank }}</td>
                            <td>{{ row.count }}</td>
                            <td>{{ row.unique }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="taxa">
                <MapBBMData />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'

import * as d3 from 'd3'
import MapBBMData from './MapBBMData.vue'


export default defineComponent({
    name: "DataComponent",
    components: {
        MapBBMData
    },
    data() {
        return {
            filters: [
                {
                    id: 1,
                    name: "Portals",
                    active: false
                },
                {
                    id: 2,
                    name: "Location",
                    active: false
                },
                {
                    id: 3,
                    name: "Taxa",
                    active: false
                },
                {
                    id: 4,
                    name: "Date",
                    active: false
                },
                {
                    id: 5,
                    name: "Users",
                    active: true
                }
            ],
        }
    },
    computed: {
        ...mapState({
            observations: state => state.data.observations,
            taxa: state => state.data.taxa
        }),
        observation_stats(){
            if(Object.keys(this.observations).length === 0) {
                console.log("no observations")
                return {}
            }
            let op = {
                counts: this.observationStats(this.observations.counts),
                inat: this.observationStats(this.observations.inats),
                ibp: this.observationStats(this.observations.ibps),
                ifb: this.observationStats(this.observations.ifbs),
                total: this.observationStats([].concat(...Object.values(this.observations))),
            }
            
            return op
        },
        observation_table_stats(){
            let op = []
            for(let [key, value] of Object.entries(this.observation_stats)){
                op.push({
                    portal: key,
                    observations: value.observations,
                    users: value.users,
                    states: value.states,
                    districts: value.districts,
                })
            }
            
            return op
        },
        taxa_stats(){
            const all_observations = Object.values(this.observations).flat()
            let op = d3.groups(this.taxa, d => d.rank).map((group) => {
                return {
                    rank: group[0],
                    count: all_observations.filter((o) => group[1].map((o) => o.id).includes(o[1])).length,
                    unique: this.countUnique(group[1].map(x => x.name))
                }
            })
            return op.filter((t) => t.count > 0)
        }
    },
    mounted(){
        // console.clear()
        store.dispatch('data/getAllData')
    },
    methods: {
        observationStats(data){
            let op = {
                observations: data.length,
                users: this.countUnique(data.map(x => x[2])),
                states: this.countUnique(data.map(x => x[4])),
                districts: this.countUnique(data.map(x => x[5])),
            }
            
            return op
        },
        getObservationsCount(data){
            let observations = 0
            data.map((d) => {
                Object.keys(this.observations).forEach((portal) => {
                    observations += this.observations[portal].filter((o) => {
                        return o[1] == d.id
                    }).length
                })
            })
            return observations
        },
        countUnique(arr){
            return [...new Set(arr)].length
        }
    }
})
</script>