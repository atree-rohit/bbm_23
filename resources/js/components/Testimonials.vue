<style scoped>
    .header{
        align-items: center;
    }

    .header h1{
        flex-grow:2;
    }
</style>

<template>
    <div class="header d-flex px-2">
        <h1>Testimonials</h1>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-sm btn-success mx-5">Add Testimonials</button>
        </div>
    </div>
    
    <div class="testimonials-container">
        <div class="testimonial" v-for="testimonial in all_data" :key="testimonial.id">
            <p>{{ testimonial.text }}</p>
            <p>{{ testimonial.name }}</p>
            <p>{{ testimonial.location }}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
export default defineComponent({
    name: 'Testimonials',
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