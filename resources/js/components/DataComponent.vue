<style scoped>
.data-container{
    margin: 0;
    padding: 0;
    background: plum;
    height: calc(100vh - 70px);
    position: relative;
    margin: 0 0.25rem;
}

.filters{
    background: #fff;
    position: absolute;
    width: 3.5rem;
    height: 100%;
    transition: all 350ms;    
}
.filters:hover{
    width: 50%;
}

.canvas{
    margin-left: 3.5rem;
    height: 100%;
    background-color:chocolate;
}

</style>

<template>
    <div class="data-container">
        <div class="filters">
            Filters
        </div>
        <div class="canvas">
            Canvas
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
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
        })
    },
    mounted(){
        store.dispatch('data/getAllData')
    },
})
</script>