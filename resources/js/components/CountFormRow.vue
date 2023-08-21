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
        border: 1px solid orange;
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
            <table class="table table-sm">
                <thead class="bg-dark text-light">
                    <tr>
                        <th>Sl. No</th>
                        <th v-for="field in fields.species" :key="field" v-text="field"/>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(species, s) in count_form.species_list"
                        :key="species.id"
                    >
                        <td>{{ s + 1  }}</td>
                        <td>{{ species.common_name }}</td>
                        <td>{{ species.scientific_name }}</td>
                        <td>{{ species.individuals }}</td>
                        <td>{{ species.remarks }}</td>
                        <td>{{ species.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
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
            show_details: false,
        }
    },
    mounted(){
    },
    methods:{
        buttonText(){
            return this.show_details ? "Hide Details" : "Show Details"
        },
        rowClass(){
            return this.count_form.status != "approved" ? "form-approved" : "form-pending"
        }
    }
}
</script>