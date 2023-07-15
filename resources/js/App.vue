<style scoped>
    .main-container{
        /* border: 1px solid red; */
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: 5fr 80fr 7.5fr;
    }
    .main-container .main-content,
    .main-container footer
    {
        display: grid;
        justify-content: center;
        align-items: center;
        font-size:2rem;
    }
    nav{
        border: 1px solid blue;
    }
    .main-content{
        border: 1px solid green;
    }
    footer{
        border: 1px solid yellow;
    }
</style>

<template>
    <div class="main-container">
        <navigation :current_page="current_page"/>
        <div class="main-content">
            Main
        </div>
        <footer>
            Footer
        </footer>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Navigation from "./components/Navigation.vue"

export default defineComponent({
    name: "App",
    components: {Navigation},
    data(){
        return {
            current_page: window.page
        }
    },
    mounted(){
        // console.clear()
    }
})
</script>