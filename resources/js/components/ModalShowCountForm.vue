<style scoped>
    .modal{
        display: block !important;
    }
    .modal textarea{
        min-height: 10rem;
    }
    .table th{
        font-size: .75rem;
    }

    .form-table th{
        width: 200px;
    }
    
    .table td{
        font-size: .85rem;        
    }

    .species-table .btn{
        padding: 0.125rem;
        font-size: .75rem;
    }
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <div v-if="admin" class="border border-success text-center m-1 p-2 w-75">
                        <div v-if="unvalidated_species_flag" class="d-flex justify-content-center">
                            <div
                                v-for="status in statuses"
                                :key="status"
                                class="mx-2"
                            >
                                <button
                                    class="btn btn-success btn-sm"
                                    v-text="status"
                                    v-if="status != form_data.status"
                                    @click="setFormStatus(status)"
                                />
                            </div>
                        </div>
                        <div v-else class="">
                            <button class="btn btn-success" @click="validateAllSpecies">Validate All Species</button>
                        </div>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-sm form-table">
                        <tbody>
                            <tr
                                v-for="h in fields.form"
                                :key="h"
                            >
                                <th v-text="h" :class="`bg-${formClassColor()}`"/>
                                <td v-text="form_data[h]" :class="`table-${formClassColor()}`"/>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table table-sm species-table">
                        <thead class="text-light" :class="speciesTableClassColor()">
                            <tr>
                                <th
                                    v-for="s in fields.species"
                                    :key="s"
                                    v-text="s"
                                />
                                <th class="bg-dark">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="species in form_data.species_list"
                                :key="species.id"
                                :class="speciesTableRowColor(species)"
                            >
                                <td
                                    v-for="s in fields.species"
                                    :key="s"
                                    v-text="species[s]"
                                />
                                <td v-if="admin" class="d-flex justify-content-around bg-secondary">
                                    <div
                                        v-for="status in statuses"
                                        :key="status"
                                    >
                                        <button
                                            class="btn btn-success btn-sm"
                                            v-text="status"
                                            v-if="status != species.status"
                                            @click="setSpeciesStatus(species, status)"
                                        />
                                    </div>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    name: 'ModalShowCountForm',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        form_data:{
            type: Object,
            default: () => {}
        }
    },
    emits: ["close"],
    data(){
        return {
            fields: {
                form: ['name', 'affiliation', 'phone', 'email', 'team_members', 'open_access', 'location', 'state', 'district',  'latitude', 'longitude', 'date', 'start_time', 'end_time', 'altitude', 'distance', 'weather', 'photo_link', 'status', 'comments'],
                species: ['common_name', 'scientific_name', 'individuals', 'remarks', 'status']
            },
            statuses: ['pending','approved','duplicate','rejected'],
        }
    },
    computed:{
        ...mapState({
            is_super_admin: state => state.auth.is_super_admin,
            is_admin: state => state.auth.is_admin,
            user: state => state.auth.user,
        }),
        admin(){
            return this.is_super_admin || this.is_admin
        },
        unvalidated_species_flag(){
            const statuses = [...new Set(this.form_data.species_list.map((s) => s.status))]
            return ((statuses.length == 1 && statuses[0] == 'approved'))
        }
    },
    methods:{
        formClassColor(){
            let op = 'danger'
            if(this.form_data.status == 'approved'){
                op = "info"
            }
            return op
        },
        speciesTableClassColor(){
            return (this.unvalidated_species_flag) ? "bg-success" : 'bg-danger'
        },
        speciesTableRowColor(row){
            return (row.status == 'approved') ? "table-success": 'table-danger'
        },
        setSpeciesStatus(species, status){
            let data = {
                species_id: species.id,
                status: status
            }
            this.$store.dispatch('count_forms/setSpeciesStatus', data)
        },
        setFormStatus(status){
            let data = {
                form_id: this.form_data.id,
                status: status
            }
            this.$store.dispatch('count_forms/setFormStatus', data)
        },
        validateAllSpecies(){
            this.form_data.species_list
                .filter((s) => s.status == "pending" )
                .forEach((species) => this.setSpeciesStatus(species, "approved"))
        },
        closeModal(){
            this.$emit('close')
        },

    }
}
</script>