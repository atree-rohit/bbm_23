<style scoped>
.main-container{
    margin: 0 1.5rem;
}
.img-container{
    display: flex;
    justify-content: center;
}
.img-container img{
    max-width: 100%;
    /* max-height: 30vh; */
}
.section{
    border: 1px solid #ccc;
    border-radius: 1.5rem;
    min-height: 50vh;
    margin: 2.5rem 0;
    padding: 2.5rem 0;
}

.text-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}
.section p{
    font-size: 1.25rem;
    padding: 0.5rem 0;
    text-indent: 5rem;
}

p::first-letter {
    font-size: 260%;
    color: var(--primary);
}
</style>

<template>
    <div class="main-container">
        <div class="img-container">
            <img src="img/DSCN2192_mud_puddling_ss.jpg" alt="">
        </div>
        <div class="section text-section">
            <p>Welcome to "Big Butterfly Month," a thrilling citizen science program that takes place annually throughout the month of September! This program invites individuals of all ages and backgrounds to join us in studying and celebrating the incredible world of butterflies.</p>
            <p>At "Big Butterfly Month," we recognize the vital role that citizen scientists like you can play in collecting important data and contributing to our understanding of these remarkable and delicate creatures. Our program focuses on butterflies, captivating insects that are not only beautiful but also serve as essential pollinators and indicators of ecosystem health.</p>
            <p>Why butterflies? Butterflies are renowned for their enchanting beauty, their intricate life cycles, and their ecological significance. By studying butterflies, we can gain insights into the health of our environment, the impact of climate change, and the effectiveness of conservation efforts.</p>
        </div>
        <div class="section">
            <partners />
        </div>
        <div class="section">
            <testimonials />
        </div>
        <div class="section">
            <press-links />
        </div>
    </div>
    <Footer />
</template>

<script>
import Partners from './Partners.vue'
import Testimonials from './Testimonials.vue'
import PressLinks from './PressLinks.vue'
import Footer from './Footer.vue'

export default{
    name: "Home",
    components: {
        Partners,
        Testimonials,
        PressLinks,
        Footer
    }
}
</script>