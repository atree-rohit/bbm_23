<style scoped>

.butterfly-container .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.75rem;
    margin-top: 5rem;
    color: white;
}

.butterfly-container {
    height: 100vh;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}


#butterfly_wrapper {
    margin-top: -3rem;
    width: 5rem;
    height: 5rem;
    position: absolute;
}

.leftwings, .rightwings {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
}

.leftwings {
    left: 0;
}

.rightwings {
    right: 0;
}

.perspective {
    position: relative;
    width: 100%;
    height: 50%;
    perspective: 150px;
    perspective-origin: 50% 50%;
}

.upperwing, .lowerwing {
    background: linear-gradient(
		-45deg,
        hsl(0, 100%, 75%),
        hsl(50, 100%, 75%),
        hsl(100, 100%, 75%),
        hsl(150, 100%, 75%),
        hsl(200, 100%, 75%),
        hsl(150, 100%, 75%),
        hsl(100, 100%, 75%),
        hsl(50, 100%, 75%),
        hsl(0, 68%, 75%)

	);
    background-size: 200% 400%;
    border: .125rem solid rgba(255,255,255,.95);
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1, .5, .4, 1);
    animation-direction: alternate;
}

.upperwing {
    position: absolute;
    width: 100%;
    height: 100%;
}

.upperwing_left {
    
	/* animation: gradient 1s ease infinite; */
    border-top-left-radius: 10%;
    border-top-right-radius: 80%;
    border-bottom-right-radius: 0%;
    border-bottom-left-radius: 30%;
    transform-origin: 100% 50%;
    animation-name: movewing_left;
}

.upperwing_right {
    border-top-left-radius: 80%;
    border-top-right-radius: 10%;
    border-bottom-right-radius: 30%;
    border-bottom-left-radius: 0%;
    transform-origin: 0% 50%;
    animation-name: movewing_right;
}

/* .upperwing_left{
    
} */

.lowerwing {
    position: absolute;
    top: 0;
    width: 80%;
    height: 80%;
    z-index: -9;
}


.lowerwing_left {
    right: 0;
    border-top-left-radius: 30%;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 80%;
    border-bottom-left-radius: 10%;
    transform-origin: 100% 50%;
    animation-name: movewing_left;
}

.lowerwing_right {
    left: 0;
    border-top-left-radius: 0%;
    border-top-right-radius: 30%;
    border-bottom-right-radius: 10%;
    border-bottom-left-radius: 80%;
    transform-origin: 0% 50%;
    animation-name: movewing_right;
}



@keyframes movewing_left {
    from { 
        transform: rotateY(0deg); 
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
        opacity: .5;
    }
    to {
        transform: rotateY(75deg);
        background-position: 0% 50%;
        opacity: .75;
    }
}

@keyframes movewing_right {
    from { 
        transform: rotateY(0deg); 
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
        opacity: .5;
    }
    to {
        transform: rotateY(-75deg);
        background-position: 0% 50%;
        opacity: .75;
    }
}
</style>

<template>
    <div class="butterfly-container">
        <div id="butterfly_wrapper">
            <div class="leftwings">
                <div class="perspective">
                    <div class="upperwing upperwing_left">

                    </div>
                </div>
                <div class="perspective">
                    <div class="lowerwing lowerwing_left">

                    </div>
                </div>
            </div>
            <div class="rightwings">
                <div class="perspective">
                    <div class="upperwing upperwing_right">

                    </div>
                </div>
                <div class="perspective">
                    <div class="lowerwing lowerwing_right">

                    </div>
                </div>
            </div>
        </div>
        <div class="text">{{loading}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    name: 'ButterflyAnimation',
    computed: {
        ...mapState({
            loading: state => state.data.loading,
        }),
    }
}
</script>