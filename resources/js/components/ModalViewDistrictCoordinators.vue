<style scoped>
    .modal{
        display: block !important;
    }
    .modal textarea{
        min-height: 10rem;
    }
    .btn-group> *{
        margin: 0 1rem;
    }
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">View District Coordinator</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="btn-group mx-auto d-flex justify-content-center" v-if="data.length >= 1">
                        <div>
                            <button
                                class="btn btn-outline-secondary"
                                @click="current_district_coordinator_id--"
                                v-if="current_district_coordinator_id > 0"
                            >
                                &lt;
                            </button>
                        </div>
                        <div class="my-0 mx-5 h3">{{ current_district_coordinator_id }}</div>
                        <div>
                            <button
                                class="btn btn-outline-secondary"
                                v-if="current_district_coordinator_id < data.length - 1"
                                @click="current_district_coordinator_id++"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <table class="table">
                        <tbody>
                            <tr
                                v-for="question in form_questions"
                                :key="question.name"
                            >
                                <td>{{ question.label }}</td>
                                <td>{{ data[current_district_coordinator_id][question.name] }}</td>
                            </tr>
                        </tbody>
                    </table>
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

export default defineComponent({
    name: 'ModalViewDistrictCoordinators',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: () => []
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
                },{
                    type: 'text',
                    label: 'Organization / Designation',
                    name: 'designation',
                    required: false
                },{
                    type: 'select',
                    label: 'State',
                    name: 'state',
                    required: true,
                    options: []
                },{
                    type: 'select',
                    label: 'District',
                    name: 'district',
                    required: true,
                    options: []
                },{
                    type: 'text',
                    label: 'Coordinates (Latitude, Longitude)',
                    name: 'coordinates',
                    required: false
                },{
                    type: 'text',
                    label: 'Email',
                    name: 'email',
                    required: false
                },{
                    type: 'text',
                    label: 'Phone Number',
                    name: 'phone',
                    required: false
                },{
                    type: 'file',
                    label: 'Image',
                    name: 'image',
                    required: false
                }
            ],
            current_district_coordinator_id: 0,
        }
    },
    created(){
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
    methods:{
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        closeModal(){
            this.$emit('close')
        },
    }
})
</script>