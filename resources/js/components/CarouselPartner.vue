<style scoped>
    .carousel-wrapper {
        position: relative;
        overflow: visible;
    }
    .carousel-item.active{
        height: auto;
        /* border: 1px solid red; */
        padding-top: 1rem;
        padding-bottom: 0.25rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: space-around;
        gap: 1rem;
        font-size: 0.75rem;
        grid-template-columns: repeat(6, 1fr);
    }

    .carousel-control-prev,
    .carousel-control-next{
        background:red;
    }
    .card{
        min-width: 23%;
        padding: 1rem 0.25rem;
        border-radius: 1rem;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
    }

    .card-img{
        max-height: 5rem;
        object-fit: contain;
    }

    @media screen and (max-width: 768px){
        .card{
            max-width: 25%;
        }
    }
</style>

<template>
    <div class="carousel-wrapper">
        <div class="carousel slide" >
            <div class="carousel-inner">
                <div class="carousel-inner">
                    <div
                        v-for="(item, index) in carouselItems"
                        :key="index"
                        class="carousel-item"
                        :class="{ active: activeIndex === index }"
                    >
                        <div
                            class="card"
                            v-for="partner in item"
                            :key="partner.name"
                        >
                            <div class="card-body p-0">
                                <img
                                    :src="partner.image_path"
                                    class="card-img"
                                >
                                <span class="card-badge badge" :class="badge_color[partner.partner_type]">
                                    {{ partner.partner_type }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btns-container bg-info text-center">
                Play Pause
                <button
                    class="carousel-control-prev"
                    type="button"
                    @click="prevSlide"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    @click="nextSlide"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "CarouselPartner",
    data(){
        return {
            activeIndex: 0,
            autoplayInterval: 2000,
            slice_size: 0,
            badge_color: {
                'ngo': 'bg-info',
                'research_organization': 'bg-info',
                'school': 'bg-warning',
                'college': 'bg-warning',
                'university': 'bg-warning',
                'nature_club': 'bg-success',
                'social_media_group': 'bg-primary',
                'other': 'bg-danger',
            }
        }
    },
    computed:{
        ...mapState({
            partners: state => state.partners.all_data,
        }),
        carouselItems() {
            const items = [];
            for (let i = 0; i < this.partners.length; i += this.slice_size) {
                items.push(this.partners.slice(i, i + this.slice_size));
            }
            return items;
        }
    },
    methods: {
        nextSlide() {
            this.activeIndex = (this.activeIndex + 1) % this.carouselItems?.length;
        },
        prevSlide() {
            this.activeIndex = (this.activeIndex - 1 + this.carouselItems?.length) % this.carouselItems?.length;
        },
        startAutoplay() {
            this.autoplayInterval = setInterval(this.nextSlide, this.autoplayInterval); // Change slide every 3 seconds
        },
        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }
    },
    mounted() {
        if(window.innerWidth < 768) {
            this.slice_size = 6
        } else {
            this.slice_size = 6
        }
        this.startAutoplay();
    },
    beforeDestroy() {
        this.stopAutoplay();
    }
}
</script>