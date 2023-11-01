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
    <ButterflyAnimation v-if="loading">
        <div class="text">{{loading}}</div>
    </ButterflyAnimation>
    <div class="container-fluid validate-forms-container">
        <div class="d-flex justify-content-center bg-dark p-2">
            <button
                v-for="status in statuses"
                :key="status"
                class="btn btn-sm"
                :class="status == selected_status ? 'btn-success' : 'btn-outline-success bg-light'"
                v-text="status"
                @click="selected_status = status"
            />
        </div>
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
                    :class="tableRowColor(row)"
                >
                    <td
                        v-for="h in headers"
                        :key="h"
                        v-text="row[h]"
                        @click="selectForm(row.id)"
                    />
                    <td
                        v-if="is_super_admin"
                        class="bg-secondary d-flex justify-content-around"
                    >
                        <button
                            class="btn btn-sm btn-success"
                            v-if="showApproveBtn(row)"
                            @click="approveForm(row)"
                        >
                            Approve
                        </button>
                        &nbsp;
                        <button
                            class="btn btn-sm btn-danger"
                            v-if="showDeleteBtn(row)"
                            @click="deleteForm(row)"
                        >
                            Delete
                        </button>
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
import ButterflyAnimation from './ButterflyAnimation.vue';
export default{
    name: "ValidateForms",
    components: {
        ModalShowCountForm,
        ButterflyAnimation
    },
    data(){
        return{
            headers: ["id", "name", "location","state", "district", "latitude", "longitude", "no_of_species", "date", "start_time", "end_time", "status"],
            statuses: ["all", "pending", "approved", "rejected", "duplicate"],
            selected_status: "pending",
            showModal: false,
            selectedFormID: -1
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            is_super_admin: state => state.auth.is_super_admin,
            all_data: state => state.count_forms.all_data,
            loading: state => state.count_forms.loading
        }),
        filtered_data(){
            let op = []
            this.all_data.forEach((d) => {
                op.push({
                    ...d,
                    no_of_species: d.species_list.length
                })
                // if(d.date.includes("2023-")){
                // }
            })
            if(this.selected_status != "all"){
                op = op.filter((d) => d.status == this.selected_status)
            }

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
        showApproveBtn(row){
            return row.status == "pending"
        },
        showDeleteBtn(row){
            return row.status != "approved"
        },
        tableRowColor(row){
            let op = "table-secondary"
            switch(row.status){
                case "pending": op = "table-primary"
                    break
                case "approved": op = "table-success text-success"
                    break
                case "duplicate": op = "table-warning"
                    break
                case "rejected": op = "table-danger text-danger"
                    break
            }
            return op
        },
        async approveForm(form){
            if(confirm('Are you sure you want to Approve this Form?')){
                await store.dispatch('count_forms/approveForm', form)
            }
        },
        async deleteForm(form){
            if(confirm('Are you sure you want to delete this Form?')){
                await store.dispatch('count_forms/deleteForm', form)
            }
        },
        closeModal(){
            this.selectedForm = {}
            this.showModal = false
        }
    }
}
</script>