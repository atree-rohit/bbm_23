<style scoped>
    .modal{
        display: block !important;
    }
    .modal textarea{
        min-height: 10rem;
    }
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">{{title}}</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form action="javascript:void(0)" @submit="submit" class="row" method="post">
                        <div v-for="question in body" :key="question.name" class="form-group col-12">
                            <label :for="question.name" class="font-weight-bold" v-text="question.label" />
                            <input type="text" name="name" v-model="testimonial[question.name]" id="name" :placeholder="`Enter ${question.name}`" class="form-control" v-if="question.type == 'text'">
                            <textarea class="form-control" v-else-if="question.type == 'textarea'" v-model="testimonial.text" :placeholder="`Enter ${question.name}`" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-success" @click="submit">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
    name: 'ModalAddTestimonial',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Modal title'
        },
        body: {
            type: Array,
            default: []
        },
        footer: {
            type: Array,
            default: []
        },
        post_url: {
            type: String,
            default: ''
        },
        user: {
            type: Object,
            default: {}
        }
    },
    emits: ["close"],
    data(){
        return {
            testimonial:{
                name:"",
                designation:"",
                text:"",
                user: this.user
            }
        }
    },
    computed:{
    },
    methods:{
        ...mapActions({
            store:'testimonials/store'
        }),
        closeModal(){
            this.$emit('close')
        },
        async submit(){
            try{
                let response = await this.store(this.testimonial)
                console.log(response)
                this.closeModal()
            }catch(error){
                console.log(error)
            }
        }
    }
})
</script>