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
                        </template>
                        <template v-else>
                            <input type="text" v-model="current_species[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-if="question.type == 'text'">
                            <textarea v-model="current_species[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'textarea'"></textarea>
                        </template>
                        <label
                            :for="question.name"
                            class="font-weight-bold"
                            :class="{required: question.required}"
                            v-text="question.label"
                        />
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
import { dispatch } from 'd3'
export default{
    name: 'CountForm',
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
            current_tab: "species_list",
            form_data: {},
            species_list: [],
            current_species: {}
        }
    },
    computed: {
        ...mapState({
            quiestions: state => state.butterfly_counts.quiestions,
            scientific_names: state => state.butterfly_counts.scientific_names,
            common_names: state => state.butterfly_counts.common_names,
        }),
        page_questions(){
            let op = []
            op.push(this.quiestions.filter(question => question.page == 0))
            op.push(this.quiestions.filter(question => question.page == 1))
            op.push(this.quiestions.filter(question => question.page == 2))
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
    created(){
        store.dispatch('butterfly_counts/initNames')
        this.initFormData()
        console.log(this.scientific_names)
    },
    methods:{
        initFormData(){
            let debug = 'test'
            this.page_questions[0].map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.page_questions[1].map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.initCurrentSpecies()
        },
        initCurrentSpecies(){
            this.page_questions[2].map((q) => {
                this.current_species[q.name] = q.required ? '' : null
            })
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
        addSpecies(){
            const newSpecies = Object.assign({}, this.current_species)
            this.species_list.push(newSpecies)
            this.initCurrentSpecies()
        },
        deleteSpecies(index){
            if(confirm('Are you sure you want to delete this species?')){
                this.species_list.splice(index, 1)
            }
        },
    }
}
</script>