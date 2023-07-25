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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Add Testimonial</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form action="javascript:void(0)" @submit="submit" class="row" method="post">
                        <div v-for="question in form_questions" :key="question.name" class="form-group col-12">
                            <label :for="question.name" class="font-weight-bold" v-text="question.label" />
                            <input type="text" name="name" v-model="form_data[question.name]" id="name" :placeholder="`Enter ${question.name}`" class="form-control" v-if="question.type == 'text'">
                            <textarea class="form-control" v-else-if="question.type == 'textarea'" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" />
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
import { mapActions, mapState } from 'vuex'

export default defineComponent({
    name: 'ModalAddTestimonial',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    data(){
        return {
            form_questions: [
                {
                    type: 'text',
                    label: 'Name',
                    name: 'name',
                    required: true
                },
                {
                    type: 'text',
                    label: 'Designation',
                    name: 'designation',
                    required: false
                },
                {
                    type: 'textarea',
                    label: 'Text',
                    name: 'text',
                    required: true
                }
            ],
            form_data:{}
        }
    },
    created(){
        this.init_form_data()
    },
    watch:{
        show(newVal){
            let body = document.querySelector('body')
            if(newVal == true){
                body.classList.add('modal-open')
            } else {
                body.classList.remove('modal-open')
            }
        }
    },
    computed:{
        ...mapState({
            user: state => state.auth.user,
        }),
    },
    methods:{
        ...mapActions({
            store:'testimonials/store'
        }),
        init_form_data(){
            this.form_data = {
                name:"",
                designation:"",
                text:"",
                user: this.user
            }
        },
        closeModal(){
            this.$emit('close')
        },
        async submit(){
            try{
                await this.store(this.form_data)
                this.init_form_data()
                this.closeModal()
            }catch(error){
                console.error(error)
            }
        }
    }
})
</script>