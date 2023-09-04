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

    .table-container{
        overflow: auto;
        max-width: 90vw;
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
                        <div class="d-flex justify-content-center">
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
                            <div class="mx-2">
                                <button class="btn btn-success" @click="validateAllSpecies">Validate All Species</button>
                            </div>
                            <div class="mx-2">
                                <button class="btn btn-danger" @click="deleteForm">Delete Form</button>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">

                    <div class="table-container">
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
                    </div>

                    <div class="table-container">
                        <table class="table table-sm species-table">
                            <thead class="text-light" :class="speciesTableClassColor()">
                                <tr>
                                    <th
                                        v-for="s in fields.species"
                                        :key="s"
                                        v-text="s"
                                    />
                                    <th 
                                        v-if="admin" 
                                        class="bg-dark"
                                    >
                                        Actions
                                    </th>
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
                form: ['id', 'name', 'affiliation', 'phone', 'email', 'team_members', 'open_access', 'location', 'state', 'district',  'latitude', 'longitude', 'date', 'start_time', 'end_time', 'altitude', 'distance', 'weather', 'photo_link', 'status', 'comments'],
                species: ['id', 'common_name', 'scientific_name', 'individuals', 'remarks', 'status']
            },
            statuses: ['pending','approved','duplicate','rejected'],
        }
    },
    created(){
        console.log(this.form_data)
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
            let op = "table-secondary"
            switch(row.status){
                case "pending": op = "table-primary"
                    break
                case "approved": op = "table-success"
                    break
                case "duplicate": op = "table-warning"
                    break
                case "rejected": op = "table-danger"
                    break
            }
            return op
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
        async deleteForm(){
            if(confirm('Are you sure you want to delete this Form?')){
                this.$emit('close')
                await this.$store.dispatch('count_forms/deleteForm', this.form_data)
            }
        },
        closeModal(){
            this.$emit('close')
        },

    }
}
</script>