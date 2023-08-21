<style scoped>
    .form-row{
        border: 1px solid red;
    }
</style>

<template>
    <div class="form-row">
        <div class="form-data d-flexa flex-wrap">
            <div
                v-for="field in fields.form"
                :key="field"
            >
                {{ field }} - {{ count_form[field] }}
            </div>
        </div>
        <div class="species-list"></div>
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
                form: ['name', 'affiliation', 'phone', 'email', 'team_members', 'location', 'state', 'district', 'coordinates', 'latitude', 'longitude', 'date', 'start_time', 'end_time', 'altitude', 'distance', 'weather', 'photo_link', 'comments', 'status', 'validated'],
                species: ['common_name', 'scientific_name', 'individuals', 'remarks', 'status', 'validated']
            }
        }
    },
    mounted(){
        console.log(Object.keys(this.count_form.species_list[0]))
    }
}
</script>