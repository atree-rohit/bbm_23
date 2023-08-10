<style scoped>
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

</style>

<template>
    <div class="container-fluid">
        {{ current_tab }}
        <ul class="nav nav-tabs">
            <li
                class="nav-item"
                v-for="tab in tabs"
                :key="tab.value"
            >
                <a
                    class="nav-link"
                    :class="current_tab == tab.value ? 'active' : ''"
                    @click="tabClick(tab)"
                    v-text="tab.label"
                    href="#"
                />
            </li>
        </ul>
        <div class="main-container">
            <template v-if="current_tab == 'user_details'">
                <pre>{{ page_questions(1) }}</pre>
            </template>
            <template v-else-if="current_tab == 'location_details'">
                <pre>{{ page_questions(2) }}</pre>
            </template>
            <template v-else-if="current_tab == 'species_list'">
                <pre>{{ page_questions(3) }}</pre>
            </template>
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
                    label: "User Details",
                    value: "user_details"
                }, {
                    label: "Location Details",
                    value: "location_details"
                },{
                    label: "Species List",
                    value: "species_list"
                }
            ],
            current_tab: "user_details"
        }
    },
    computed: {
        ...mapState({
            quiestions: state => state.butterfly_counts.quiestions
        }),
    },
    methods:{
        page_questions(page){
            if(page == 3){
                return this.quiestions.species
            } else {
                return this.quiestions.form.filter(question => question.page == page)
            }
        },
        tabClick(tab){
            this.current_tab = tab.value
        }
    }
}
</script>