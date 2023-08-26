<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .btn-container{
        display: flex;
        gap: 0.5rem;
    }

    @media screen and (max-width: 768px){
        .btn-container .btn-lg{
            padding: 0.5rem;
        }
    }

</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Partners</div>
        <div class="btn-container">
            <button
                class="btn btn-lg btn-primary"
                @click="show_modal.poster=true"
                title="Show Partner Poster"
            >
                Partner Poster
            </button>
            <button
                class="btn btn-lg btn-success"
                v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
                @click="show_modal.add=true"
                title="Add Partner"
            >
                +
            </button>
        </div>
    </div>
    <carousel-partner />

    <modal-add-partner
        :show="show_modal.add"
        @close="show_modal.add=false"
    />
    <modal-edit-partner
        :show="show_modal.edit"
        :data="selectedPartner"
        @close="show_modal.edit=false"
    />
    <modal-partner-poster
        :show="show_modal.poster"
        @close="show_modal.poster=false"
    />
    
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
import ModalAddPartner from './ModalAddPartner.vue'
import ModalEditPartner from './ModalEditPartner.vue'
import ModalPartnerPoster from './ModalPartnerPoster.vue'
import CarouselPartner from './CarouselPartner.vue'

export default defineComponent({
    name: 'Partners',
    components: {
        ModalAddPartner,
        ModalEditPartner,
        ModalPartnerPoster,
        CarouselPartner,
    },
    data(){
        return {
            show_modal: {
                add: false,
                edit: false,
                poster: false,
            },
            selectedPartner: {},
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.partners.all_data,
            is_admin: state => state.auth.is_admin,
            is_super_admin: state => state.auth.is_super_admin,
        }),
    },
    mounted(){
        store.dispatch('partners/getAllData')
    },
    methods:{
        gotoLink(link){
            if(!link) return
            if(this.is_admin || this.is_super_admin){
                if(confirm('Do you want to visit the partner URL?')){
                    window.open(link, '_blank')
                }
            } else {
                window.open(link, '_blank')
            }
        },
        get_tags(tags){
            return tags.split(',').map((t) => t.trim())
        },
        badgeColor(type){
            switch(type){
                case 'ngo': return 'bg-info'
                    break
                case 'research_organization': return 'bg-info'
                    break
                case 'school': return 'bg-warning'
                    break
                case 'college': return 'bg-warning'
                    break
                case 'university': return 'bg-warning'
                    break
                case 'nature_club': return 'bg-success'
                    break
                case 'social_media_group': return 'bg-primary'
                    break
                case 'other': return 'bg-danger'
                    break
            }
        },
        editPartner(id){
            this.selectedPartner = this.all_data.find((p) => p.id == id)
            this.show_modal.edit = true
        },
        deletePartner(id){
            if(confirm('Are you sure you want to delete this partner?')){
                store.dispatch('partners/delete', id)
            }
        },
    }
})
</script>