<style scoped>    
    .button-container button{
        font-size:1.5rem;
    }
</style>

<template>
    <div class="container-fluid app-container">
        <div class="button-container d-flex justify-content-around my-2">
            <button
                class="btn btn-outline-primary badge rounded-pill text-info"
                title="About"
                @click="show_about_modal = true"
            >
                <i class="bi bi-info-circle"></i>
            </button>
            <button
                class="btn btn-outline-primary badge rounded-pill text-info" titl
                ="Your Data"

            >
                <i class="bi bi-database"></i>
            </button>
        </div>
        <div class="tabs">
            <count-form v-if="current_nav == 'add'"/>
        </div>
        <ModalAboutBBMApp :show="show_about_modal" @close="show_about_modal = false"/>
    </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import CountForm from "./CountForm.vue"
import ModalAboutBBMApp from "./ModalAboutBBMApp.vue"

export default {
    name: "ButterflyCounts",
    components: {
        CountForm,
        ModalAboutBBMApp
    },
    data() {
        return {
            nav_links: [
                {
                    label: "About",
                    value: "about"
                },{
                    label: "Add",
                    value: "add"
                },{
                    label: "Data",
                    value: "data"
                }
            ],
            current_nav: "add",
            show_about_modal: false,
        };
    },
    methods: {
        navClick(nav) {
        this.current_nav = nav.value
        }
    }
    };
</script>

