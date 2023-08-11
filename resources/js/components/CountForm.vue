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

.main-container{
    height: calc(100vh - 155px);
    display: grid;
    grid-template-rows: auto 10px;
    border: 1rem solid red;
}

.required::after{
    content: '*';
    color: red;
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 0.5rem;
}

.btns-section{
    background: rgb(179, 137, 179);
}

</style>

<template>
    <div class="container-fluid form-container">
        {{ current_tab }}
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
                />
            </li>
        </ul>
        <div class="main-container">
            <div
                v-for="(tab, t) in tabs"
                :key="tab.value"
            >
                <div v-for="question in page_questions(t)" :key="question.name" class="form-floating mb-2">
                        <input type="text" v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-if="question.type == 'text'">
                        <textarea v-model="form_data[question.name]" :placeholder="`Enter ${question.name}`" class="form-control" v-else-if="question.type == 'textarea'"></textarea>
                        <label
                            :for="question.name"
                            class="font-weight-bold"
                            :class="{required: question.required}"
                            v-text="question.label"
                        />
                    </div>
            </div>
            <div class="btns-section">
                <button
                    class="btn btn-lg"
                    v-if="current_tab == 'species_list'"
                    :class="current_species_completed ? 'btn-success' : 'btn-disabled'"
                >Add Species</button>
                <button
                    class="btn btn-lg"
                    :class="form_completed ? 'btn-success' : 'btn-disabled'"

                >Submit Form</button>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
            quiestions: state => state.butterfly_counts.quiestions
        }),
        completed(){
            let op = {
                user_details: true,
                location_details: true,
                species_list: true
            }
            
            this.page_questions(0)
                .filter((q) => q.required)
                .map((q) => {
                    if(this.form_data[q.name] == ''){
                        op.user_details = false
                    }
                })
            this.page_questions(1)
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
            return this.current_species.common_name != null || this.current_species.scientific_name != null
        },
        form_completed(){
            return this.completed.user_details && this.completed.location_details && this.completed.species_list
        }
    },
    created(){
        this.initFormData()
    },
    methods:{
        initFormData(){
            let debug = 'test'
            this.page_questions(0).map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.page_questions(1).map((q) => {
                this.form_data[q.name] = q.required ? debug : null
            })
            this.page_questions(2).map((q) => {
                this.current_species[q.name] = q.required ? '' : null
            })            
        },
        page_questions(page){
            return this.quiestions.filter(question => question.page == page)
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
            console.log(op, tab, this.current_tab)
            return op
        },
        tabClick(tab){
            this.current_tab = tab.value
        }
    }
}
</script>