<style scoped>
    .app-container{
        /* border: 0.5rem solid red; */
        width: 100vw;
        height: calc(100vh - 56px);
    }
    .navbar ul{
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    
    .navbar ul li{
        margin: 0 0.1rem;
        flex: 2 0 0;
        transition: all 0.33s;
    }
    
    .navbar ul li:has(.btn-success){
        flex: 1 1 0;
    }
    
</style>

<template>
    <div class="container-fluid app-container">
        {{ current_tab }}
        <div class="tabs">
            <count-form v-if="current_tab == 'add'"/>
        </div>
        <nav class="navbar fixed-bottom navbar-light border border-secondary">
            <div class="container-fluid">
                <ul>
                    <li
                        v-for='nav in nav_links'
                        :key='nav.value'
                    >
                        <div class="d-grid gap-2">
                            <button
                                class="btn"
                                type="button"
                                :class="current_tab == nav.value ? 'btn-success' : 'btn-outline-secondary'"
                                @click="navClick(nav)"
                                v-text="nav.label"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import CountForm from "./CountForm.vue"

export default {
    name: "ButterflyCounts",
    components: {
        CountForm
    },
    data() {
        return {
            nav_links: [
                {
                    label: "Home",
                    value: "home"
                }, {
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
            current_tab: "add"
        };
    },
    methods: {
        navClick(nav) {
        this.current_tab = nav.value
        }
    }
    };
</script>

