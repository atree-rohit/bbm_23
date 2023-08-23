<style scoped>
.table tbody tr:hover td{
    cursor: pointer;
    background-color: hsl(100, 80%, 80%) !important;
}
</style>

<template>
    <div class="container-fluid validate-forms-container">
        TEST
        <table class="table table-sm">
            <thead class="bg-success text-warning">
                <tr>
                    <th
                        v-for="h in headers"
                        :key="h"
                        v-text="h"
                    />
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
            headers: ["name", "location","state", "district", "latitude", "longitude", "date", "start_time", "end_time", "status"],
            showModal: false,
            selectedFormID: -1
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.count_forms.all_data
        }),
        filtered_data(){
            return this.all_data

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
        closeModal(){
            this.selectedForm = {}
            this.showModal = false
        }
    }
}
</script>