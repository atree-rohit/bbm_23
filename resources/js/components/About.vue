<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .section{
        border: 1px solid #ccc;
        border-radius: 1.5rem;
        min-height: 50vh;
        margin: 2.5rem 0;
        padding: 2.5rem 0;
        width: 100%;
    }
    .card{
        width: 20rem;
        position: relative;
        transition: all var(--transition-time);
        box-shadow: 0.2rem 0.2rem 0.33rem .2rem rgba(0,0,0,0.125);
        border-radius: 0.67rem;
    }

    
    .card .card-body{
        display: grid;
        align-items: end;
    }
    .card .card-badge{
        position: absolute;
        font-size: .75rem;
        bottom: 0;
        right: 0;
        font-weight: 300;
        opacity: 0;
        transition: all var(--transition-time);        
    }

    .card-delete{
        content: '🗑';
        position: absolute;
        top: 0;
        right: 0;
        font-size: .75rem;
        opacity: 0;
        transition: all var(--transition-time);
    }

    .card:hover{
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0.2rem 0.2rem .25rem .2rem rgba(0,0,0,0.5);
    }

    .card-img-top{
        width: auto;
        height: 10rem;
        object-fit: contain;
    }

    .card:hover .card-badge,
    .card:hover .card-delete{
        opacity: 1;
    }

</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">About Us</div>
    </div>
    
    <div class="main-container m-1">
        We are the Big Butterfly Monitoring Network, a consortium of conservation organizations working together to raise awareness on the sharp decline in butterfly populations and create widespread acceptance of the actions needed to reverse this trend.
        <div class="section">
            <partners />
        </div>
        <div class="section">
            <district-coordinators />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Partners from './Partners.vue'
import DistrictCoordinators from './DistrictCoordinators.vue'

export default defineComponent({
    name: 'About',
    components: {
        Partners,
        DistrictCoordinators
    },
    data(){
        return {
            
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.resources.all_data
        }),
    },
    mounted(){
        // console.clear()
    },
    methods:{
        gotoLink(link){
            window.open(link, '_blank')
        },
    }
})
</script>
