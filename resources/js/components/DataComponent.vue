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
    height: calc(100% - 1rem);
    transition: all 350ms;
    overflow:hidden;
}
.filters:hover{
/* .filters{ */
    z-index: 10;
    width: calc(50% + 2rem);
}

.filters > ul{
    background: rgba(50, 50, 50, 1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    height: calc(100% - 7.5rem);
    margin-top: 7.5rem;
    border-radius: 2rem;
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

.canvas .taxa .card{
    border: 1px solid red;
}

</style>

<template>
    <div class="data-container">
        <div class="filters">
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
                <div class="card"
                    v-for="(card, key) in observation_stats"
                    :key="key"
                >
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ key }}
                        </h5>
                        <p class="card-text">Observations: {{ card.observations }}</p>
                        <p class="card-text">Users: {{ card.users }}</p>
                        <p class="card-text">States: {{ card.states }}</p>
                        <p class="card-text">Districts: {{ card.districts }}</p>
                    </div>
                </div>
            </div>
            <div class="taxa">
                <div class="card"
                    v-for="card in taxa_stats"
                    :key="card.rank"
                >
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ card.rank }}
                        </h5>
                        <p class="card-text">Count: {{ card.count }}</p>
                        <p class="card-text">Unique: {{ card.unique }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'

import * as d3 from 'd3'


export default defineComponent({
    name: "DataComponent",
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
            // user: state => state.auth.user,
            observations: state => state.data.observations,
            taxa: state => state.data.taxa
        }),
        observation_stats(){
            console.log("this.observations", typeof(this.observations),this.observations)
            if(Object.keys(this.observations).length === 0) {
                console.log("no observations")
                return {}
            }
            let op = {
                total: this.observationStats([].concat(...Object.values(this.observations))),
                counts: this.observationStats(this.observations.counts),
                inat: this.observationStats(this.observations.inats),
                ibp: this.observationStats(this.observations.ibps),
                ifb: this.observationStats(this.observations.ifbs),
            }
            
            return op
        },
        taxa_stats(){
            let op = d3.groups(this.taxa, d => d.rank).map((group) => {
                return {
                    rank: group[0],
                    count: group[1].length,
                    unique: this.countUnique(group[1].map(x => x.name))
                }
            })
            return op
        }
    },
    mounted(){
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
        countUnique(arr){
            return [...new Set(arr)].length
        }
    }
})
</script>