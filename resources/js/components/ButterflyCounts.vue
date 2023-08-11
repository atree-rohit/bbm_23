<style scoped>
    .app-container{
        width: 100%;
        height: calc(100vh - 7rem);
        display: flex;
        flex-direction: column;
        grid-template-rows: auto 60px;
    }

    .nav-item{
        flex: 1 0 0;
    }

    .nav-link{
        display: flex;
        justify-content: center;

    }

    .tabs{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
    }

    .nav-link.active{
        background-color: #28a745;
        color: white;
    }

    @media (max-width: 768px) {
        .container-fluid{
            padding: 0;
        }
        .app-container{
            padding: 1rem 5px;
        }
    }
    
</style>

<template>
    <div class="container-fluid app-container">
        <div class="tabs">
            <count-form v-if="current_nav == 'add'"/>
        </div>
        <nav class="navbar fixed-bottom navbar-light border border-secondary bg-dark">
            <div class="container-fluid">
                <ul class="nav nav-tabs d-flex justify-content-around w-100">
                    <li
                        class="nav-item"
                        v-for="nav in nav_links"
                        :key="nav.value"
                    >
                        <a
                            class="nav-link"
                            :class="current_nav == nav.value ? 'active' : ''"
                            @click="navClick(nav)"
                            v-text="nav.label"
                            href="#"
                        />
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
            current_nav: "add"
        };
    },
    methods: {
        navClick(nav) {
        this.current_nav = nav.value
        }
    }
    };
</script>

