<style scoped>
.main-container{
    margin: 0 5rem;
    font-size: 1.25rem;
}

.img-container img{
    max-width: 100%;
    /* max-height: 30vh; */
}
.section{
    margin: 3rem 0;
}
</style>

<template>
    <div class="main-container">
        <div class="img-container">
            <img src="img/blue_bottles.jpg" alt="">
        </div>
        <div class="section">Welcome to "Big Butterfly Month," a thrilling citizen science program that takes place annually throughout the month of September! This program invites individuals of all ages and backgrounds to join us in studying and celebrating the incredible world of butterflies.</div>
        <div class="section">At "Big Butterfly Month," we recognize the vital role that citizen scientists like you can play in collecting important data and contributing to our understanding of these remarkable and delicate creatures. Our program focuses on butterflies, captivating insects that are not only beautiful but also serve as essential pollinators and indicators of ecosystem health.</div>
        <div class="section">Why butterflies? Butterflies are renowned for their enchanting beauty, their intricate life cycles, and their ecological significance. By studying butterflies, we can gain insights into the health of our environment, the impact of climate change, and the effectiveness of conservation efforts.</div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Home"
})
</script>