<style scoped>
    .modal{
        display: block !important;
    }
    .modal textarea{
        min-height: 10rem;
    }

    .modal-header{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .modal-header img{
        max-height: 10rem;
        position: absolute;
        top: 0.125rem;
        left: 0.5rem;
        z-index: 10;
    }

    .modal-header h1.modal-title{
        margin-left: 7.5rem;
        font-family: 'Times New Roman', Times, serif;
        flex: 2 1 0;
        font-size: 5rem;
        line-height: 4.5rem;
        text-align: center;
    }

    .modal-body{
        display:flex;
        flex-direction: column;
        background: rgb(8,66,6);
        background: linear-gradient(90deg, rgba(8,66,6,1) 0%, rgba(255,255,255,1) 100%);
    }
    .modal-body .banner{
        flex-shrink: 5;
        background: lightblue;
        padding: .5rem 1rem;
        border-radius: 2rem;
        border: 2px solid rgb(145, 192, 235);
        text-align: center;
        margin: auto;
    }

    .logo-container{
        flex-grow: 5;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
    }

    .logo-container img{
        /* min-height: 4rem; */
        border: 2px solid rgba(0,0,0,0.25);
        border-radius: 0.5rem;
        padding: .25rem;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        font-size: 1.125rem;
        color: rgb(59, 6, 59);
        font-weight: 900 !important;
        padding: 0 1rem;
    }
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" id="partner-poster">
                <div class="modal-header">
                    <div class="logo">
                        <img src="/img/mormon.jpg" alt="">
                    </div>
                    <h1 class="modal-title" id="exampleModalLiveLabel">Big Butterfly Month</h1>
                    
                </div>
                <div class="modal-body">
                    <div class="banner">
                        <h3>Celebrate the Big Butterfly Month - September 2023</h3>
                        <div>Plan your events</div>
                        <div>Discuss with Collaborators</div>
                        <div>Come together for the cause of Butterflies</div>
                        <h5>Plan - Suggest - Collaborate</h5>
                    </div>
                    <div class="logo-container">
                        <img
                            v-for="partner in partners"
                            :key="partner.id"
                            :src="partner.image_path"
                            :style="{ 'max-width': `${logo_width}rem` }"
                            class="img-fluid bg-light"
                            alt=""
                        >
                    </div>
                </div>
                <div class="footer bg-light">
                    <span>bigbutterflymonth@gmail.com</span>
                    <span>bigbutterflymonth.in</span>
                </div>
            </div>
        </div>
        <div class="modal-footer d-flex justify-content-center bg-secondary p-0">
            <button type="button" class="btn btn-dark btn-sm" @click="closeModal">Close</button>
            <button type="button" class="btn btn-success btn-lg" @click="download">Download</button>
            <br>
            <button type="button" class="btn btn-primary btn-sm" @click="logoSize('-')">Decrease Logo Size</button>
            {{ logo_width }}rem
            <button type="button" class="btn btn-primary btn-sm" @click="logoSize('+')">Increase Logo Size</button>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import html2canvas from 'html2canvas'

export default defineComponent({
    name: 'ModalPartnerPoster',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    data(){
        return {
            logo_width: 7,
        }
    },
    watch:{
        show(newVal){
            let body = document.querySelector('body')
            if(newVal == true){
                body.classList.add('modal-open')
            } else {
                body.classList.remove('modal-open')
            }
        }
    },
    computed:{
        ...mapState({
            partners: state => state.partners.all_data,
        }),
        logo_width_style(){
            return `min-width: ${this.logo_width}rem;`
        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        },
        logoSize(type){
            if(type == "-" && this.logo_width > 6){
                this.logo_width -= 0.25                    
            } else if(type == "+" && this.logo_width < 10) {
                this.logo_width += 0.25
            }
        },
        download(){
            const div = document.getElementById('partner-poster')
            const divWidth = div.offsetWidth
            const divHeight = div.offsetHeight

            const canvas = document.createElement('canvas')
            canvas.width = divWidth
            canvas.height = divHeight
            const context = canvas.getContext('2d')

            html2canvas(div).then(canvas => {
                context.drawImage(canvas, 0, 0, divWidth, divHeight);
                
                // Convert the canvas to a data URL
                const dataUrl = canvas.toDataURL('image/jpeg');

                // Create a temporary anchor
                const anchor = document.createElement('a');
                anchor.href = dataUrl;
                anchor.download = 'poster.jpg';
                
                // Click the anchor to trigger the download
                anchor.click();
                
                // Remove the anchor after the download
                document.body.removeChild(anchor);
            }).catch(error => {
                console.error('Error capturing content:', error);
                // Handle the error if needed
            });

            // html2canvas(div).then(canvas => {
            //     const dataUrl = canvas.toDataURL('image/jpeg')
            //     const anchor = document.createElement('a')
            //     anchor.href = dataUrl
            //     anchor.download = 'poster.jpg'
            //     anchor.click()
            //     anchor.remove()
            // })
        }

    }
})
</script>