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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Add Resource</h3>
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
                            <file-upload-component
                                v-else-if="question.type == 'file'"
                                class="form-control"
                                type="file"
                                :upload_file="upload_file_flag"
                                folder="resources"
                                @uploaded_file_id="handleUploadedFileId"
                            />
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
import FileUploadComponent from './FileUploadComponent.vue'

export default defineComponent({
    name: 'ModalAddResource',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    components: {
        FileUploadComponent
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
                    type: 'file',
                    label: 'Image / File (max 2MB)',
                    name: 'image',
                    required: false
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
            form_data: {},
            upload_file_flag: false,
        }
    },
    created(){
        this.initFormData()
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
            store:'resources/store'
        }),
        
        initFormData(){
            this.form_data = {
                title:"",
                link:"",
                resource_type:"video",
                image:null,
                description:"",
                tags:"",
                user: this.user
            }
        }, 
        closeModal(){
            this.$emit('close')
        },
        handleUploadedFileId(file){
            if(file != null){
                this.form_data.image = file.data.id
            }
            try{
                this.store(this.form_data)
                this.closeModal()
                this.initFormData()
                this.upload_file_flag = false
            }catch(error){
                console.error(error)
            }
        },
        submit(){
            this.upload_file_flag = true
        }
    }
})
</script>