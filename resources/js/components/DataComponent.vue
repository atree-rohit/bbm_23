<style scoped>
.data-container{
    padding: 0;
    background: plum;
    height: calc(100vh - 70px);
    position: relative;
    margin: 0 0.25rem;
}

.filters{
    background: #eee;
    position: absolute;
    border-radius: 2rem;
    width: 3.5rem;
    margin: 0.5rem;
    padding: 0.5rem;
    height: calc(100% - 1rem);
    transition: all 350ms;    
}
.filters:hover{
    z-index: 10;
    width: 50%;
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
            Filters
        </div>
        <div class="canvas">
            <div class="observations">
                <card class="card"
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
                </card>
            </div>
            <div class="taxa">
                <card class="card"
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
                </card>
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
            //
        }
    },
    computed: {
        ...mapState({
            // user: state => state.auth.user,
            observations: state => state.data.observations,
            taxa: state => state.data.taxa
        }),
        observation_stats(){
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