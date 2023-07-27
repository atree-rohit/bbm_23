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

    p.section-text{
        text-indent: 3.5rem;
    }
    p.section-text::first-letter {
        font-size: 150%;
        line-height: 1rem;
        color: var(--primary);
    }

</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">About Us</div>
    </div>
    
    <div class="main-container m-1">
        <div class="section px-5">
            <p
                v-for="(paragraph, p) in paragraphs"
                :key="p"
                class="section-text fs-5"
                v-text="paragraph"
            />
            
        </div>
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
            paragraphs: [
                "Big Butterfly Month is a citizen science initiative dedicated to celebrating and conserving butterflies. Our mission is to unite butterfly enthusiasts, students, families, and nature lovers in contributing valuable data that enhances our understanding of these delicate wonders of nature. By participating in butterfly walks, submitting observations, and engaging in various activities, you become an integral part of our journey to safeguard butterflies and their habitats.",
                "At Big Butterfly Month, we believe in the power of community and collaboration. We actively seek partnerships with educational institutions, nature clubs, wildlife organizations, and local communities to organize awareness programs, workshops, and events focused on butterfly conservation and citizen science. By building a strong community of participants and allies, we can amplify our impact and foster a collective passion for preserving butterfly populations throughout India.",
                "Citizen scientists can upload their observations and engage with experts and fellow enthusiasts. This process empowers contributors, offering feedback and guidance to hone butterfly identification skills and build confidence. The platforms also serve as valuable learning tools, inspiring individuals to actively participate in butterfly conservation initiatives and nurturing a deeper appreciation for these magnificent creatures.",
                "Join us on this exciting journey of discovery and conservation! Together, we can make a difference for butterflies, ensuring a brighter future for these enchanting insects and the ecosystems they inhabit. Your participation and support are vital in advancing our cause, and we eagerly anticipate celebrating the beauty and significance of butterflies with you during Big Butterfly Month and beyond."
            ]            
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
