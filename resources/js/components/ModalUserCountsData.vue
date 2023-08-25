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
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">Your Counts Data</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="count-forms-coutanier" v-if="user_data.length != 0">
                        <count-form-row
                            v-for="form in user_data"
                            :key="form.id"
                            :count_form="form"
                        />
                    </div>
                    <div v-else>
                        <p>🦋 Attention Butterfly Enthusiast! 🦋</p>
                        <p>We're thrilled you're participating in Big Butterfly Month and documenting these delicate creatures with us. However, it seems we're missing some crucial information on your end.</p>
                        <p>⚠️ We couldn't find your user details! ⚠️</p>
                        <p>Don't worry, your previously submitted forms are safe. If you've already documented butterflies this month and they're not visible, here's what you can do:</p>
                        <p><b>1. Submit Another Form:</b> Simply submit another checklist of butterflies. This will help us locate and display your previous submissions.</p>
                        <p><b>2. Double-Check Email:</b> Make sure your email address is correctly stored. This ensures we can connect your submissions to you accurately.</p>
                        <p><b>3. Smooth Sailing Ahead:</b> Once you've submitted another checklist, your previous forms should reappear like magic. We're working diligently to ensure your valuable contributions are counted.</p>
                        <p>Remember, every butterfly you document makes a difference in our understanding of these beautiful creatures and their habitats. Your dedication is greatly appreciated!</p>
                        <p>If you encounter any issues, don't hesitate to reach out to our support team at support@bigbutterflymonth.org. We're here to help you make your butterfly observations count.</p>
                        <p>Thank you for being a part of this citizen science event and helping us make a positive impact on the butterfly world. Flutter on!</p>
                        <p>Best regards,</p>
                        The Big Butterfly Month Team 🌼

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
import store from "../store/index.js"
import { mapState } from "vuex"
import CountFormRow from "./CountFormRow.vue"
export default{
    name: 'ModalUserCountsData',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    components:{
        CountFormRow
    },
    emits: ["close"],
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            user_data: state => state.butterfly_counts.user_data,
        })
    },
    methods:{
        closeModal(){
            this.$emit('close')
        }
    },
}
</script>