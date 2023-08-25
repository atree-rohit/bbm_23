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
                    <h3 class="modal-title" id="exampleModalLiveLabel">Add District Coordinator</h3>
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
                                v-else-if="question.name == 'state'"
                                v-model="form_data[question.name]"
                                class="form-select"
                            >
                                <option selected="true" value="-1">Select {{question.label}}</option>
                                <option
                                    v-for="option in question.options"
                                    :key="option.value"
                                    :value="option.value"
                                    v-text="option.label"

                                />
                            </select>
                            <select
                                v-else-if="question.name == 'district'"
                                v-model="form_data[question.name]"
                                class="form-select"
                            >
                                <option
                                    v-for="option in select_district_options"
                                    :key="option.value"
                                    :value="option.value"
                                    v-text="option.label"

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
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import states from '../json/states.json'
import districts from '../json/districts.json'

export default defineComponent({
    name: 'ModalAddPartner',
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
                }
            ],
            form_data:{},
        }
    },
    created(){
        this.initSelectOptions()
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
        select_district_options(){
            let options = []
            if(this.form_data.state == "-1"){
                options.push({
                    label: "Select State First",
                    value: "-1"
                })
            } else {
                options.push({
                    label: "Select District",
                    value: "-1"
                })
                let op = []
                districts.features.map(district => {
                    if(this.valueFromLabel(district.properties.state) == this.form_data.state){
                        op.push({
                            label: district.properties.district.trim(),
                            value: this.valueFromLabel(district.properties.district.trim())
                        })
                    }                    
                })
                options = options.concat(op.sort((a,b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                }))
            }
            return options
        }
    },
    methods:{
        ...mapActions({
            store:'district_coordinators/store'
        }),
        initSelectOptions(){
            this.form_questions[2].options = states.features.map(state => {
                return {
                    label: state.properties.state.trim(),
                    value: this.valueFromLabel(state.properties.state.trim())
                }
            }).sort((a,b) => {
                if(a.label < b.label) { return -1; }
                if(a.label > b.label) { return 1; }
                return 0;
            })
        },
        initFormData(){
            this.form_data = {
                name:"",
                designation:"",
                district: "-1",
                state:"-1",
                coordinates:"",
                email: "",
                phone: "",
                user: this.user
            }

        },
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        closeModal(){
            this.$emit('close')
        },
        submit(){
            this.store(this.form_data)
            this.initFormData()
            this.closeModal()
        }
    }
})
</script>