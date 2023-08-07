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
    .card{
        width: 13rem;
        position: relative;
        transition: all var(--transition-time);
        box-shadow: 0.2rem 0.2rem 0.33rem .2rem rgba(0,0,0,0.125);
        border-radius: 0.67rem;
        margin: 0.5rem;
    }

    
    .card .card-body{
        display: grid;
        align-items: end;
    }
    .card .card-badge{
        position: absolute;
        font-size: .75rem;
        bottom: 0.5rem;
        right: 0.5rem;
        font-weight: 300;
        opacity: 0;
        transition: all var(--transition-time);        
    }

    .hover-btns{
        opacity: 0;
        transition: all var(--transition-time);
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: .95rem;
        display: flex;
        gap: 0.25rem;
    }

    .hover-btns .badge{
        transition: all var(--transition-time);
    }

    .card:hover,
    .hover-btns .badge:hover{
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0.2rem 0.2rem .25rem .2rem rgba(0,0,0,0.5);
    }

    .card-img-top{
        width: auto;
        height: 10rem;
        object-fit: contain;
    }

    .card:hover .card-badge,
    .card:hover .hover-btns{
        opacity: 1;
    }

</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Partners</div>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-lg btn-success mx-5" @click="show_modal.add = true" title="Add Partner">+</button>
        </div>
    </div>
    
    <div class="main-container m-4">
        <div
            class="card"
            v-for="partner in all_data"
            :key="partner.id"
            @click="gotoLink(partner.link)"
        >
            <img
                :src="partner.image_path"
                class="card-img-top"
            >
            <div class="card-body">
                <h5 class="card-title">{{ partner.name }}</h5>
                <span class="card-badge badge" :class="badgeColor(partner.partner_type)">
                    {{ partner.partner_type }}
                </span>
                <div class="hover-btns">
                    <span
                        class="card-edit badge bg-primary"
                        v-if="user.user_type == 'super_admin'"
                        @click.stop="editPartner(partner.id)"
                        title="Edit Partner"
                        v-text="'✎'"
                    />
                    <span
                        class="card-delete badge bg-danger"
                        v-if="user.user_type == 'super_admin'"
                        @click.stop="deletePartner(partner.id)"
                        title="Delete Partner"
                        v-text="'X'"
                    />
                </div>
            </div>
            <div class="card-div-tags" v-if="partner.tags">
                <span
                    v-for="(tag, t) in get_tags(partner.tags)"
                    :key="t"
                    v-text="tag"
                    class="card-div-tag badge rounded-pill bg-secondary me-2 px-3 py-2"
                />
            </div>
        </div>
    </div>
    <modal-add-partner
        :show="show_modal.add"
        @close="show_modal.add=false"
    />
    <template
        v-for="partner in all_data"
        :key="partner.id"
    >
        <modal-edit-partner
            :show="show_modal.edit"
            :data="partner"
            @close="show_modal.edit=false"
        />
    </template>
    
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
import ModalAddPartner from './ModalAddPartner.vue'
import ModalEditPartner from './ModalEditPartner.vue'

export default defineComponent({
    name: 'Partners',
    components: {
        ModalAddPartner,
        ModalEditPartner,
    },
    data(){
        return {
            show_modal: {
                add: false,
                edit: false,
            },
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