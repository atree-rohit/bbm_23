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
                    <div class="count-forms-coutanier">
                        <count-form-row
                            v-for="form in user_data"
                            :key="form.id"
                            :count_form="form"
                        />
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
    created(){
        store.dispatch("butterfly_counts/getUserData")
    }
}
</script>