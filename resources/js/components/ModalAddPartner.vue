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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Add Partner</h3>
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
                                :folder="`partners`"
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
    name: 'ModalAddPartner',
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
                    label: 'Name',
                    name: 'name',
                    required: true
                },{
                    type: 'select',
                    label: 'Partner Type',
                    name: 'partner_type',
                    required: true,
                    options: [
                        {
                            label: 'NGO',
                            value: 'ngo'
                        },{
                            label: 'Research Organization',
                            value: 'research_organization'
                        },{
                            label: 'School',
                            value: 'school'
                        },{
                            label: 'College',
                            value: 'college'
                        },{
                            label: 'University',
                            value: 'university'
                        },{
                            label: 'Nature Club',
                            value: 'nature_club'
                        },{
                            label: 'Social Media Group',
                            value: 'social_media_group'
                        },{
                            label: 'Other',
                            value: 'other'
                        }
                    ]
                },{
                    type: 'textarea',
                    label: 'Description',
                    name: 'description',
                    required: true
                },{
                    type: 'text',
                    label: 'Contact Person',
                    name: 'contact_person',
                    required: false
                },{
                    type: 'file',
                    label: 'Image',
                    name: 'image',
                    required: false
                },{
                    type: 'textarea',
                    label: 'Link',
                    name: 'link',
                    required: false
                }
            ],
            form_data:{},
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
            store:'partners/store'
        }),
        initFormData(){
            this.form_data = {
                name:"",
                partner_type:"ngo",
                description:"",
                contact_person:"",
                image:"",
                link:"",
                user: this.user
            }

        },
        closeModal(){
            this.$emit('close')
        },
        handleUploadedFileId(file){
            this.form_data.image = file.data.id
            try{
                this.store(this.form_data)
                this.initFormData()
                this.closeModal()
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