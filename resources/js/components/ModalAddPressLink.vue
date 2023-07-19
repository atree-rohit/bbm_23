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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Add Press Link</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form action="javascript:void(0)" @submit="submit" class="row" method="post">
                        <div v-for="question in form_questions" :key="question.name" class="form-group col-12">
                            <label :for="question.name" class="font-weight-bold" v-text="question.label" />
                            <input
                                type="text"
                                v-if="question.type == 'text'"
                                v-model="press_link[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            >
                            <textarea
                                v-else-if="question.type == 'textarea'"
                                v-model="press_link[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            />
                            <select
                                v-else-if="question.type == 'select'"
                                v-model="press_link[question.name]"
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
                            />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <pre style="font-size:.8rem;">
                        {{ press_link }}
                    </pre>
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
import FileUploadComponent from './FileUploadComponent.vue'

export default defineComponent({
    name: 'ModalAddPressLink',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            default: {}
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
                    type: 'select',
                    label: 'Link Type',
                    name: 'link_type',
                    required: true,
                    options: [
                        {
                            label: 'Newspaper (Print)',
                            value: 'newspaper_print'
                        },{
                            label: 'Newspaper (Online)',
                            value: 'newspaper_online'
                        },{
                            label: 'Journal',
                            value: 'journal'
                        },{
                            label: 'Magazine',
                            value: 'magazine'
                        },{
                            label: 'Social Media',
                            value: 'socialmedia'
                        },{
                            label: 'Blog',
                            value: 'blog'
                        },{
                            label: 'Other',
                            value: 'other'
                        },]
                },{
                    type: 'textarea',
                    label: 'Link URL',
                    name: 'link',
                    required: true
                },{
                    type: 'file',
                    label: 'Image',
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
            press_link:{
                title:"",
                link_type:"newspaper_print",
                link:"",
                image:"",
                description:"",
                tags:"",
                user: this.user
            }
        }
    },
    computed:{
    },
    methods:{
        ...mapActions({
            store:'press_links/store'
        }),
        closeModal(){
            this.$emit('close')
        },
        async submit(){
            try{
                await this.store(this.press_link)
                this.closeModal()
                this.press_link = {
                    title:"",
                    link_type:"newspaper_print",
                    link:"",
                    image:"",
                    description:"",
                    tags:"",
                    user: this.user
                }
            }catch(error){
                console.error(error)
            }
        }
    }
})
</script>