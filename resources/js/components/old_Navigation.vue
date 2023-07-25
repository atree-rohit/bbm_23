<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        background-color: var(--primary);
    }
    nav .logo{
            display: grid;
            justify-content: center;
            align-items: center;
        }
    .logo{
        width: 7.5%;
        border: 1px solid red;
    }

    ul{
        max-width: 75rem;
        list-style: none;
        display:flex;
        justify-content: space-around;
        align-items:baseline;
    }
    ul li{
        border-radius: .33rem;
        padding: .25rem 1rem;
        margin: auto 0.125rem;
        transition: all var(--transition-time);
    }
    ul li a{
        text-decoration: none;
        color: var(--primary-text);
        white-space: nowrap;
        transition: all var(--transition-time);
    }

    ul li a::before, 
    ul li a::after{
        content: "";
        display:block;
        height: 0rem;
    }

    ul li.active a{
        color: var(--active-clr);
    }
    ul li.active a::before, 
    ul li.active a::after,
    ul li:hover a::before,
    ul li:hover a::after
    {
        width: 100%;
        height: .1rem;
        margin: 0.5rem 0;
        transition: all var(--transition-time);
    }
    ul li.active a::before, 
    ul li.active a::after{
        background-color: var(--active-clr);
    }

    ul li:hover a{
        color: yellow;
    }
    ul li:hover a::before,
    ul li:hover a::after{
        background-color: yellow;
    }
</style>
<template>
    <nav>
        <div class="logo">Logo</div>
        <ul>
            <li
                v-for="link in links"
                :key="link.id"
                :class="{active: link.id == current_link}"
            >
                <a :href="link.link">{{ link.label }}</a>
            </li>
        </ul>
    </nav>
</template>
   
<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name: "Navigation",
    props: {
        current_page: {
            type: String,
            default: "home"
        }
    },
    data(){
        return {
            links: [
                {
                    id: 1,
                    label: "Home",
                    link: "/"
                },{
                    id: 2,
                    label: "Data",
                    link: "/data"
                },{
                    id: 3,
                    label: "About us",
                    link: "/about"
                },{
                    id: 4,
                    label: "How to Participate",
                    link: "/participate"
                },{
                    id: 5,
                    label: "Registration",
                    link: "/registration"
                },{
                    id: 6,
                    label: "Resources",
                    link: "/resources"
                },{
                    id: 7,
                    label: "Calendar",
                    link: "/calendar"
                },{
                    id: 8,
                    label: "Login",
                    link: "/login"
                }
            ],
            current_link: 1
        }
    },
    mounted() {
        this.set_current_link()
        console.log(555)
    },
    methods:{
        set_current_link(){
            if(this.current_page == "home"){
                this.current_link = 1
            } else {
                this.current_link = this.links.find((link) => link.link.replace("/", "") == this.current_page).id
            }
        }
    }
})
</script>