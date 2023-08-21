<style scoped>
    .form-row{
        padding: 0.5rem 0rem;
        margin: 0.5rem;
        border: 1px solid rgb(105, 105, 105, .75);
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 350ms;
    }

    .form-row.form-approved{
        border: 1px solid green;
    }

    .form-row.form-pending{
        border: 1px solid red;
    }

    .form-row:hover{
        box-shadow: 0.125rem 0.125rem 0.75rem rgba(0 ,0 ,0 , 0.5);
    }
    .form-data-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.25rem;
    }
    .form-field{
        border: 2px solid green;
        margin: 1px;
        border-radius: 0.5rem;
    }
    span{
        padding: 0.25rem 0.5rem;
    }
    .form-field > *:nth-child(1){
        background: pink;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
</style>

<template>
    <div class="form-row" :class="rowClass()">
        <div class="form-data-container">
            <div
                v-for="field in fields.form_mini"
                :key="field"
                class="form-field"
            >
                <span v-text="field"/>
                <span v-text="count_form[field]"/>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-success btn-sm m-1" @click="show_details=!show_details" v-text="buttonText()"/>
        </div>
        <div class="species-list container-fluid" v-if="show_details">
            <div v-if="admin" class="border border-success text-center m-1 p-2 d-flex">
                <span>Set Count Form Status</span>
                <div
                    v-for="status in statuses"
                    :key="status"
                    class="mx-2"
                >
                    <button
                        class="btn btn-success btn-sm"
                        v-text="status"
                        v-if="status != count_form.status"
                        @click="setFormStatus(status)"
                    />
                </div>
            </div>
            <table class="table table-sm">
                <tbody>
                    <tr
                        v-for="field in fields.form"
                        :key="field"
                    >
                        <td v-text="field"/>
                        <td v-text="count_form[field]"/>
                    </tr>
                </tbody>
            </table>
            <div v-if="admin && unvalidated_species" class="border border-success text-center m-1 p-2">
                <button class="btn btn-success" @click="validateAllSpecies">Validate All Species</button>
            </div>
            <table class="table table-sm">
                <thead class="bg-dark text-light">
                    <tr>
                        <th>Sl. No</th>
                        <th v-for="field in fields.species" :key="field" v-text="field"/>
                        <th v-if="admin" class="bg-success">Validate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(species, s) in count_form.species_list"
                        :key="species.id"
                        :class="speciesRowClass(species)"
                    >
                        <td>{{ s + 1  }}</td>
                        <td>{{ species.common_name }}</td>
                        <td>{{ species.scientific_name }}</td>
                        <td>{{ species.individuals }}</td>
                        <td>{{ species.remarks }}</td>
                        <td>{{ species.status }}</td>
                        <td v-if="admin" class="d-flex justify-content-around">
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
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'CountFormRow',
    props: {
        count_form: {
            type: Object,
            required: true
        },
    },
    data(){
        return {
            fields: {
                form: ['name', 'affiliation', 'phone', 'email', 'team_members', 'location', 'state', 'district',  'latitude', 'longitude', 'date', 'start_time', 'end_time', 'altitude', 'distance', 'weather', 'photo_link', 'status', 'comments'],
                form_mini: ["location","state", "district", "latitude", "longitude", "date", "start_time", "end_time"],
                species: ['common_name', 'scientific_name', 'individuals', 'remarks', 'status']
            },
            statuses: ['pending','approved','duplicate','rejected'],
            show_details: false,
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
        form_validate_flag(){
            let op = false
            if(this.count_form.species_list.filter((d) => d.status == 'approved').length > 0){
                op = true
            }
            return op
        },
        unvalidated_species(){
            return this.count_form.species_list.filter((d) => d.status != "approved").length > 0
        }
    },
    methods:{
        buttonText(){
            return this.show_details ? "Hide Details" : "Show Details"
        },
        rowClass(){
            return this.count_form.status == "approved" ? "form-approved" : "form-pending"
        },
        speciesRowClass(species){
            return species.status == "approved" ? "table-success" : "table-danger"
        },
        setFormStatus(status){
            let data = {
                form_id: this.count_form.id,
                status: status
            }
            this.$store.dispatch('count_forms/setFormStatus', data)
        },
        setSpeciesStatus(species, status){
            let data = {
                species_id: species.id,
                status: status
            }
            this.$store.dispatch('count_forms/setSpeciesStatus', data)
        },
        validateAllSpecies(){
            this.count_form.species_list.forEach((species) => {
                if(species.status != "approved"){
                    this.setSpeciesStatus(species, "approved")
                }
            })
        },
    }
}
</script>