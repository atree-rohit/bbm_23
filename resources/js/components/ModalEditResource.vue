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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Edit Resource</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form action="javascript:void(0)" @submit="submit" class="row" method="post">
                        <div v-for="question in form_questions" :key="question.name" class="form-group col-12">
                            <label :for="question.name" class="font-weight-bold" v-text="question.label" />
                            <input
                                type="text"
                                v-if="question.type == 'text'"
                                v-model="form_data[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            >
                            <textarea
                                v-else-if="question.type == 'textarea'"
                                v-model="form_data[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            />
                            <select
                                v-else-if="question.type == 'select'"
                                v-model="form_data[question.name]"
                                class="form-select"
                            >
                                <option>Select Link Type</option>
                                <option
                                    v-for="option in question.options"
                                    :key="option.value"
                                    :value="option.value"
                                    v-text="option.label"
                                    :selected="option.value == 'newspaper_print'"
                                />
                            </select>
                            
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
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ModalEditResource',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    emits: ["close"],
    data(){
        return {
            form_questions: [
                {
                    type: 'text',
                    label: 'Title',
                    name: 'title',
                    required: true
                },{
                    type: 'textarea',
                    label: 'Link URL',
                    name: 'link',
                    required: true
                },{
                    type: 'select',
                    label: 'Resource Type',
                    name: 'resource_type',
                    required: true,
                    options: [
                        {
                            label: 'Video',
                            value: 'video'
                        },{
                            label: 'Presentation',
                            value: 'presentation'
                        },{
                            label: 'E-book',
                            value: 'e-book'
                        },{
                            label: 'Website',
                            value: 'website'
                        },{
                            label: 'Other',
                            value: 'other'
                        },
                    ]
                },{
                    type: 'textarea',
                    label: 'Description',
                    name: 'description',
                    required: false
                },{
                    type: 'text',
                    label: 'Tags',
                    name: 'tags',
                    required: false
                }
            ],
            form_data: {}
        }
    },
    mounted(){
        this.initFormData()
    },
    watch:{
        show(newVal){
            this.initFormData()
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
            update:'resources/update'
        }),
        
        initFormData(){
            this.form_data = {
                id: this.data.id,
                title: this.data.title,
                link: this.data.link,
                resource_type: this.data.resource_type,
                description: this.data.description,
                tags: this.data.tags,
                user: this.data.user
            }
        }, 
        closeModal(){
            this.$emit('close')
        },
        submit(){
            try{
                this.update(this.form_data)
                this.initFormData()
                this.closeModal()
            }catch(error){
                console.error(error)
            }
        }
    }
}
</script>