<style scoped>
.form-container{
    display: flex;
    flex-direction: column;
}

.nav-item{
    flex: 1 0 0;
}

.nav-link{
    display: flex;
    justify-content: center;

}

.nav-link.active{
    background-color: #28a745;
    color: white;
}
.required::after{
    content: '*';
    color: red;
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 0.5rem;
}

.btns-section{
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
}

.btn-disabled{
    border: 1px solid #c66;
    background-color: #fdd;
    color: #e99;
}

.form-floating:has(.w-75){
    display: flex;
    justify-content: space-between;
}

</style>

<template>
    <div class="container-fluid form-container">
        <ul class="nav nav-tabs">
            <li
                class="nav-item"
                v-for="tab in tabs"
                :key="tab.value"
            >
                <a
                    class="nav-link"
                    :class="tabClass(tab)"
                    @click="tabClick(tab)"
                    v-text="tab.label"
                    href="#"
                ></a>
            </li>
        </ul>
        <div class="main-container">
            <template
                v-for="(tab, t) in tabs"
                :key="tab.value"
            >
                <div
                    class="questions-container"
                    v-if="tab.value == current_tab"
                >
                    <template v-if="current_tab == 'species_list'">
                        <div>
                            <h1 class="bg-danger">Species List</h1>
                            <table class="table table-sm table-hover table-responsive border border-primary" v-if="species_list.length">
                                <thead>
                                    <tr class="bg-info">
                                        <th>No.</th>
                                        <th>Common</th>
                                        <th>Scientific</th>
                                        <th>Individuals</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="table-info">
                                    <tr
                                        v-for="(row, index) in species_list"
                                        :key="index"
                                        >
                                        <!-- @click="current_species = row" -->
                                        <td v-text="index+1"></td>
                                        <td v-text="row.common_name"></td>
                                        <td v-text="row.scientific_name"></td>
                                        <td v-text="row.individuals"></td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn btn-danger btn-sm"
                                                v-text="'X'"
                                                @click="deleteSpecies(index)"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                    <div v-for="question in page_questions[t]" :key="question.name" class="form-floating mb-2">
                        <template v-if="t<2">
                            <input type="text" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-if="question.type == 'text'">
                            <textarea v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'textarea'"></textarea>
                            <input type="date" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'date'">
                            <input type="time" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'time'">
                            <input type="text" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control w-75" v-if="question.type == 'location'">
                            <auto-complete
                                v-else-if="question.type == 'autocomplete_state'"
                                :question="question"
                                :suggestions="states"
                                :value="form_data.state_name"
                                @selected="stateSelected"
                            />
                            
                            <div v-if="question.type=='location'" class="my-auto">
                                <button class="btn btn-outline-success px-3 me-2" @click="getPoints">Get Coordinates</button>
                            </div>
                            <label
                                :for="question.name"
                                class="font-weight-bold"
                                :class="{required: question.required}"
                                v-text="question.label"
                                v-if="question.type != 'location' || question.type != 'autocomplete_state'"
                            />
                        </template>
                        <template v-else>
                            <auto-complete
                                v-if="question.type == 'autocomplete_common'"
                                :question="question"
                                :suggestions="common_names"
                                :value="current_species.common_name"
                                @selected="commonNameSelected"
                            />
                            <auto-complete
                                v-else-if="question.type == 'autocomplete_scientific'"
                                :question="question"
                                :suggestions="scientific_names"
                                :value="current_species.scientific_name"
                                @selected="scientificNameSelected"
                            />
                            <input type="number" v-model="current_species[question.name]" :placeholder="`Enter ${question.name}`" class="form-control w-75" v-if="question.type == 'increment'">
                            <textarea v-model="current_species[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'textarea'"></textarea>
                            <label
                                :for="question.name"
                                class="font-weight-bold"
                                :class="{required: question.required}"
                                v-text="question.label"
                                v-if="question.type != 'autocomplete_common' && question.type != 'autocomplete_scientific'"
                            />
                            <div v-if="question.type=='increment'" class="my-auto">
                                <button class="btn btn-outline-success px-3 me-2" @click="current_species.individuals++">+</button>
                                <button class="btn btn-outline-success px-3" @click="decreaseIndividuals">-</button>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <div class="btns-section">
                <button
                    class="btn btn-lg"
                    v-if="current_tab == 'species_list'"
                    :class="current_species_completed ? 'btn-success' : 'btn-disabled'"
                    @click="addSpecies"
                >Add Species</button>
                <button
                    class="btn btn-lg"
                    :class="form_completed ? 'btn-success' : 'btn-disabled'"
                    @click="submitForm"
                >Submit Form</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import districts from '../json/districts.json'
import AutoComplete from './AutoComplete.vue'
export default{
    name: 'CountForm',
    components:{
        AutoComplete
    },
    data(){
        return {
            tabs:[
                {
                    label: "User",
                    value: "user_details"
                }, {
                    label: "Location",
                    value: "location_details"
                },{
                    label: "Checklist",
                    value: "species_list"
                }
            ],
            current_tab: "user_details",
            form_data: {},
            species_list: [],
            current_species: {},
            states: []
        }
    },
    computed: {
        ...mapState({
            quiestions: state => state.butterfly_counts.quiestions,
            species_lists: state => state.butterfly_counts.species_lists,            
            scientific_names: state => state.butterfly_counts.scientific_names,
            common_names: state => state.butterfly_counts.common_names,
            latitude: state => state.locations.latitude,
            longitude: state => state.locations.longitude,
        }),
        page_questions(){
            let op = []
            op.push(this.quiestions.filter(question => question.page == 0))
            op.push(this.quiestions.filter(question => question.page == 1))
            op.push(this.quiestions.filter(question => question.page == 2))
            console.log(11, op)
            return op
        },
        completed(){
            let op = {
                user_details: true,
                location_details: true,
                species_list: true
            }
            
            this.page_questions[0]
                .filter((q) => q.required)
                .map((q) => {
                    if(this.form_data[q.name] == ''){
                        op.user_details = false
                    }
                })
            this.page_questions[1]
                .filter((q) => q.required)
                .map((q) => {
                    if(this.form_data[q.name] == ''){
                        op.location_details = false
                    }
                })
            if(this.species_list.length == 0){
                op.species_list = false
            }
            return op
        },
        current_species_completed(){
            return this.current_species.common_name?.length > 3 || this.current_species.scientific_name?.length > 3
        },
        form_completed(){
            return this.completed.user_details && this.completed.location_details && this.completed.species_list
        }
    },
    watch:{
        latitude(){
            this.form_data.coordinates = this.latitude + ',' + this.longitude
        },
        longitude(){
            this.form_data.coordinates = this.latitude + ',' + this.longitude
        }
    },
    created(){
        store.dispatch('locations/init')
        store.dispatch('butterfly_counts/initNames')
        this.initFormData()
    },
    methods:{
        initFormData(){
            let debug = ''
            this.page_questions[0].map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.page_questions[1].map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.form_data.date = new Date().toISOString().slice(0, 10)
            this.form_data.start_time = new Date().toLocaleTimeString()
            this.form_data.state = ''
            this.states = [...new Set(districts.features.map((district) => district.properties.state))]
            this.species_list = []
            this.initCurrentSpecies()
        },
        initCurrentSpecies(){
            this.current_species = {
                common_name: '',
                scientific_name: '',
                individuals: 1,
                remarks: null
            }
        },
        tabClass(tab){
            let op = this.current_tab == tab.value ? 'active' : ''
            switch(tab.value){
                case "location_details":
                    op += this.completed.user_details ? '' : ' disabled'
                    break
                case "species_list":
                    op += this.completed.location_details ? '' : ' disabled'
                    break
            }
            return op
        },
        tabClick(tab){
            this.current_tab = tab.value
        },
        stateSelected(state){
            this.form_data.state_name = state
        },
        commonNameSelected(name){
            this.current_species.common_name = name
            let match = this.species_lists.synoptic.find((species) => species[1] == name)
            if(match){
                this.current_species.scientific_name = match[0]
                return
            } 
            
            match = this.species_lists.ifb.find((species) => species[1] == name)
            if(match){
                this.current_species.scientific_name = match[0]
            }
            
        },
        scientificNameSelected(name){
            this.current_species.scientific_name = name
            let match = this.species_lists.synoptic.find((species) => species[0] == name)
            if(match){
                this.current_species.common_name = match[1]
                return
            } 
            
            match = this.species_lists.ifb.find((species) => species[0] == name)
            if(match){
                this.current_species.common_name = match[1]
            }
        },
        decreaseIndividuals(){
            if(this.current_species.individuals > 0){
                this.current_species.individuals--;
            }
        },
        addSpecies(){
            const newSpecies = Object.assign({}, this.current_species)
            console.log(newSpecies)
            this.species_list.push(newSpecies)
            this.initCurrentSpecies()
        },
        deleteSpecies(index){
            if(confirm('Are you sure you want to delete this species?')){
                this.species_list.splice(index, 1)
            }
        },
        getPoints(){
            store.dispatch('locations/getCurrentCoordinates')
        },
        submitForm(){
            let data = {
                ...this.form_data,
                species_list: this.species_list
            }
            store.dispatch('butterfly_counts/submitForm', data)
            this.initFormData()
        }
        
    }
}
</script>