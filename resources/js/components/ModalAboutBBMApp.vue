<style scoped>
    .modal{
        display: block !important;
    }
    .modal textarea{
        min-height: 10rem;
    }
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">🦋 Join the Butterfly Adventure! Count and Explore! 🦋</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div
                        v-for="(point, p) in points"
                        :key="p"
                        class="py-2"
                    >
                        <span>{{ point[0] }}</span>
                        <span class="px-2 fw-bold">{{ point[1] }}</span>
                        <span class="px-2">{{ point[2] }}</span>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>

export default{
    name: 'ModalAboutBBMApp',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    data(){
        return {
            points: [
                ["🕒", "Quick Counts, Big Fun", "Each count takes just 30 minutes. Imagine, in just half an hour, you're uncovering the secrets of nature!"],
                ["🚶‍♀️", "Forget the Distance", "It's not about how far you go, but what you discover along the way. Estimate your journey distance during each 30-minute count - a fascinating challenge!"],
                ["🦋", "One-Way Magic", "Follow the butterflies from Point A to Point B. Capture the enchantment of their journey, and if you spot different species on the way back, note them too! Explore new routes for added thrill!"],
                ["📸", "Snap the Beauty", "Get ready to photograph these incredible creatures. Even if you can't name them all, just record the group or genus. A Grass Yellow becomes an adventure in itself!"],
                ["☀️", "Sunshine Quest", "Choose the perfect sunny moment when butterflies are most active. Feel the warmth, embrace the excitement!"],
                ["📝", "Easy Sheets, More Joy", "Each 30-minute adventure gets its own sheet. Fill it up, submit, and let the discoveries flow!"],
                ["🟡", "Highlight Your Insights", "Those golden questions with red stars? They're the key to our shared exploration. Required and rewarding - make sure to fill them in!"],
                ["🚫", "Stay Still, Dive Deep", "Dive into the data without moving cells. Let the information flow while keeping everything organized."],
            ]
        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        }
    }
}
</script>