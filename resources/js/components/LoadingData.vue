<style scoped>
.loading-container {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background:rgba(0,0,0,.75);
}
.loading-container .circle {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    background: rgba(138, 43, 226, 0.02);
}
.loading-container .circle:nth-of-type(1) {
    width: 30%;
    height: 50%;
    animation: rt 6s infinite linear;
    box-shadow: 0 0 1px 0 blueviolet, inset 0 0 10px 0 blueviolet;
}
.loading-container .circle:nth-of-type(2) {
    width: 32.5%;
    height: 40%;
    animation: rt 10s infinite linear;
    box-shadow: 0 0 1px 0 darkviolet, inset 0 0 10px 0 darkviolet;
}
.loading-container .circle:nth-of-type(3) {
    width: 25%;
    height: 50%;
    animation: rt 5s infinite linear;
    box-shadow: 0 0 1px 0 darkmagenta, inset 0 0 10px 0 darkmagenta;
}
.loading-container .circle:nth-of-type(4) {
    width: 20%;
    height: 70%;
    animation: rt 15s infinite linear;
    box-shadow: 0 0 1px 0 magenta, inset 0 0 10px 0 magenta;
}

.loading-container .text{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.75rem;
    color: white;
}

@keyframes rt {
    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <!-- based on CSS Loading Screen by Jove Angelevski https://codepen.io/AlbertFeynman/pen/ejoMVG -->
    <div class="loading-container" v-if="loading">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="text">{{loading}}</div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "LoadingData",
    mounted(){
        console.log("LoadingData mounted")
    },
    computed: {
        ...mapState({
            loading: state => state.data.loading,
        }),
    }
}
</script>