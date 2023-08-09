<style>
:root{
    --animation-speed: 2.5s;
}
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
    background:rgba(0,0,0,.95);
}
.loading-container .circle {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    background: rgba(138, 43, 226, 0.05);
}
.loading-container .circle:nth-of-type(1) {
    width: 30%;
    height: 40%;
    animation: rt var(--animation-speed) infinite linear;
    box-shadow: 0 0 1rem 0 blueviolet, inset 0 0 10px 0 blueviolet;
}
.loading-container .circle:nth-of-type(2) {
    width: 35%;
    height: 45%;
    animation: rt calc(var(--animation-speed) * 1.5)  infinite linear;
    box-shadow: 0 0 1rem 0 rgb(4, 0, 211), inset 0 0 10px 0 rgb(4, 0, 211);
}
.loading-container .circle:nth-of-type(3) {
    width: 40%;
    height: 50%;
    animation: rt calc(var(--animation-speed) * 2) infinite linear;
    box-shadow: 0 0 1rem 0 rgb(0, 139, 74), inset 0 0 10px 0 rgb(0, 139, 74);
}
.loading-container .circle:nth-of-type(4) {
    width: 45%;
    height: 55%;
    animation: rt calc(var(--animation-speed) * 3) infinite linear;
    box-shadow: 0 0 1rem 0 rgb(255, 238, 0), inset 0 0 10px 0 rgb(255, 238, 0);
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
    <div class="loading-container" v-if="loading" >
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
    computed: {
        ...mapState({
            loading: state => state.data.loading,
        }),
    }
}
</script>