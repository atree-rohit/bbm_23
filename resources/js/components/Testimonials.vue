<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .testimonials-container .testimonial{
        font-size: 1.2rem;
        background: rgba(225, 225, 225, .75);
        border-radius: 1rem;;
    }
    .testimonials-container .testimonial .testimonial-text{
        font-weight: 100;
        color: #444;
        text-align: justify;
    }
    .testimonials-container .testimonial .testimonial-attribution{
        color: #000;
        text-align: end;
    }
</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Testimonials</div>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-lg btn-success mx-5" @click="show_modal = true">Add Testimonials</button>
        </div>
    </div>
    
    <div class="testimonials-container m-4">
        <div
            class="testimonial my-4 p-4"
            v-for="testimonial in all_data"
            :key="testimonial.id"
        >
            <div class="testimonial-text fst-italic">{{ testimonial.text }}</div>
            <div class="testimonial-attribution pt-4">-- {{ testimonial.name }} <span>( {{ testimonial.designation }} )</span></div>
        </div>
    </div>
    <modal-add-testimonial
        :show="show_modal"
        @close="show_modal=false"
    />
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
import ModalAddTestimonial from './ModalAddTestimonial.vue'
export default defineComponent({
    name: 'Testimonials',
    components: {
        ModalAddTestimonial
    },
    data(){
        return {
            show_modal: false,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.testimonials.all_data
        })
    },
    mounted(){
        store.dispatch('testimonials/getAllData')
    }
})
</script>