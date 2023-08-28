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
        .mobile-hide{
        display: none;
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
                v-if="auth"
                @click="show_modal.add=true"
                title="Add Partner"
            >
                +
            </button>
        </div>
    </div>
    <carousel-partner />
    <div v-if="auth" class="mt-3">
        <table class="table table-sm table-hover">
            <thead class="bg-info">
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Contact Person</th>
                    <th class="modile-hide">Link</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="table-info">
                <tr
                    v-for="partner in all_data"
                    :key="partner.id"
                >
                    <td v-text="partner.name"/>
                    <td v-text="partner.partner_type"/>
                    <td v-text="partner.contact_person"/>
                    <td class="mobile-hide" v-text="partner.link"/>
                    <td class="d-flex justify-content-around bg-secondary">
                        <button class="btn btn-sm btn-primary" @click="editPartner(partner.id)">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="deletePartner(partner.id)">Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>

    </div>

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
        }),
        auth(){
            return this.user && (this.user.user_type == 'super_admin' || this.user.user_type == 'admin')
        }
    },
    mounted(){
        store.dispatch('partners/getAllData')
    },
    methods:{
        gotoLink(link){
            if(!link) return
            if(this.auth){
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