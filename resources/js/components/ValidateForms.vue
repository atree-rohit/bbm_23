<style scoped>
.table tbody tr:hover td{
    cursor: pointer;
    background-color: hsl(100, 80%, 80%) !important;
}
.validate-forms-container{
    height: 100%;
    width: 100vw;
    overflow: auto;
}
</style>

<template>
    <div class="container-fluid my-2 validate-forms-container">
        <table class="table table-sm">
            <thead class="bg-success text-warning">
                <tr>
                    <th
                        v-for="h in headers"
                        :key="h"
                        v-text="h"
                    />
                    <th
                        v-if="is_super_admin"
                    >Actions</th>
                </tr>
            </thead>
            <tbody class="table-secondary">
                <tr
                    v-for="row in filtered_data"
                    :key="row.id"
                >
                    <td
                        v-for="h in headers"
                        :key="h"
                        v-text="row[h]"
                        @click="selectForm(row.id)"
                    />
                    <td
                        v-if="is_super_admin"
                    >
                        <button class="btn btn-sm btn-success" @click="approveForm(row)">Approve</button>
                        <button class="btn btn-sm btn-danger" @click="deleteForm(row)">Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
    <modal-show-count-form 
        :show="showModal"
        :form_data="selected_form"
        @close="closeModal"
    />
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import ModalShowCountForm from "./ModalShowCountForm.vue"
export default{
    name: "ValidateForms",
    components: {
        ModalShowCountForm
    },
    data(){
        return{
            headers: ["name", "location","state", "district", "latitude", "longitude", "no_of_species", "date", "start_time", "end_time", "status"],
            showModal: false,
            selectedFormID: -1
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            is_super_admin: state => state.auth.is_super_admin,
            all_data: state => state.count_forms.all_data
        }),
        filtered_data(){
            let op = []
            this.all_data.forEach((d) => {
                op.push({
                    ...d,
                    no_of_species: d.species_list.length
                })
            })

            return op
        },
        selected_form(){
            if(this.selectedFormID == -1){
                return {}
            }
            return this.all_data.find((d) => d.id == this.selectedFormID)
        }        
    },
    watch:{
    },
    mounted(){
        store.dispatch('count_forms/getAllData')
    },
    methods:{
        selectForm(form_id){
            this.selectedFormID = form_id
            this.showModal = true
        },
        async approveForm(form){
            await store.dispatch('count_forms/approveForm', form)
        },
        async deleteForm(form){
            await store.dispatch('count_forms/deleteForm', form)
        },
        closeModal(){
            this.selectedForm = {}
            this.showModal = false
        }
    }
}
</script>