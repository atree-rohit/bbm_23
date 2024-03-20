<style scoped>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section {
    display: grid;
    grid-template-columns: 35% 1fr 35%; /* Adjusted to allocate 35% space for each text section */
    width: 100%;
}

.section .image-container {
    grid-column: 1 / 4; /* Adjusted to span all three columns */
    grid-row: 1;
    position: relative;
}

.image-container img {
    width: 100%;
    height: auto;
}

.content {
    grid-row: 1;
    display: grid;
    align-items: center;
    padding: 3rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-size: 1.5rem;
    font-weight: 100;
}

.section-reverse .content {
    grid-column: 1;
}

.section:not(.section-reverse) .content {
    grid-column: 3; /* Adjusted to align with the right side of the image */
}

.main-container {
    display: grid;
    padding: 1rem;
}

@media (max-width: 500px) {
    .section {
        grid-template-columns: 1fr; /* Display single column layout for text below image */
    }

    .section .content {
        grid-column: 1; /* Span full width */
        grid-row: 2;
        padding: 0.5rem 2rem; /* Adjust padding for mobile layout */
        font-size: 1rem;
    }

    .section .image-container {
        /* grid-column: 1; Span full width */
    }

    .section .image-container img {
        width: 100%; /* Full width image on mobile */
    }
}
</style>

<template>
    <div class="sections-container">
        <div
            v-for="(section, index) in sections"
            :key="index"
            :class="{ 'section-reverse': index % 2 !== 0 }"
            class="section"
        >
            <div class="content">
                {{ section.text }}
            </div>
            <div class="image-container">
                <img :src="section.img" alt="Section Image" />
            </div>
        </div>
    </div>
    <div class="main-container">
        <partners />
        <testimonials />
        <press-links />
    </div>
    <Footer />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Partners from "./Partners.vue";
import Testimonials from "./Testimonials.vue";
import PressLinks from "./PressLinks.vue";
import Footer from "./Footer.vue";

const sections = [
    {
        text: "Welcome to 'Big Butterfly Month,' a thrilling citizen science program that takes place annually throughout the month of September! This program invites individuals of all ages and backgrounds to join us in studying and celebrating the incredible world of butterflies.",
        img: "img/butterflies/cropped/DSC_8431.JPG",
    },
    {
        text: "At 'Big Butterfly Month', we recognize the vital role that citizen scientists like you can play in collecting important data and ,contributing to our understanding of these remarkable and delicate creatures. Our program focuses on butterflies, captivating insects that are ,not only beautiful but also serve as essential pollinators and indicators of ecosystem health.",
        img: "img/butterflies/cropped/DSC_0726.JPG",
    },
    {
        text: "Why butterflies? Butterflies are renowned for their enchanting beauty, their intricate life cycles, and their ecological significance. By studying butterflies, we can gain insights into the health of our environment, the impact of climate change, and the effectiveness of conservation efforts.",
        img: "img/butterflies/cropped/DSC_1430.JPG",
    },
];
</script>
