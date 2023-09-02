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
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">Your Counts Data</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="count-forms-coutanier" v-if="user_data.length != 0">
                        <table class="table">
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
                                    :class="tableRowColor(row)"
                                >
                                    <td
                                        v-for="h in headers"
                                        :key="h"
                                        v-text="row[h]"
                                        @click="selectForm(row)"
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        {{user_data}}

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
    <modal-show-count-form 
        :show="showModal"
        :form_data="form_data"
        @close="closeFormModal"
    />
</template>

<script>
import { mapState } from "vuex"
import CountFormRow from "./CountFormRow.vue"
import ModalShowCountForm from "./ModalShowCountForm.vue"
export default{
    name: 'ModalUserCountsData',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    components:{
        CountFormRow,
        ModalShowCountForm
    },
    emits: ["close"],
    data(){
        return {
            showModal: false,
            form_data: {},
            headers: ["id", "name", "location","state", "district", "latitude", "longitude", "no_of_species", "date", "start_time", "end_time", "status"],
        }
    },
    computed:{
        ...mapState({
            user_data: state => state.butterfly_counts.user_data,
        }),
        filtered_data(){
            let op = []
            this.user_data.forEach((d) => {
                if(d.date.includes("2023-09")){
                    op.push({
                        ...d,
                        no_of_species: d.species_list.length
                    })
                }
            })

            return op
        },
    },
    methods:{
        selectForm(form){
            this.form_data = form
            this.showModal = true
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
        closeModal(){
            this.$emit('close')
        },
        closeFormModal(){
            this.showModal = false
        }
    },
}
</script>