<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .main-container .card-div{
        font-size: 1.2rem;
        background: rgba(225, 225, 225, .75);
        border-radius: 1rem;
        border: 1px solid transparent;
        transition: all 250ms;
    }
    .main-container .card-div .card-div-title{
        font-weight: 100;
        color: #444;
        text-align: justify;
    }
    .main-container .card-div:hover{
        background: rgba(225,225,255,1);
        border: 1px solid rgb(50, 50, 200);
        cursor: pointer;
    }

    .card-div-tag{
        font-weight: 100;
        font-size: .8rem;
    }
</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Partners</div>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-lg btn-success mx-5" @click="show_modal = true">Add Partner</button>
        </div>
    </div>
    
    <div class="main-container m-4">
        <div
            class="card-div my-4 p-4"
            v-for="partner in all_data"
            :key="partner.id"
            @click="gotoLink(partner.link)"
        >
            <div class="card-div-title h3">{{ partner.name }}</div>
            <div class="card-div-image pt-4" v-if="partner.image">
                <img :src="partner.image" alt="">
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
    <modal-add-press-link
        :show="show_modal"
        :user="user"
        @close="show_modal=false"
    />
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
import ModalAddPressLink from './ModalAddPressLink.vue'
export default defineComponent({
    name: 'Partners',
    components: {
        ModalAddPressLink
    },
    data(){
        return {
            show_modal: false,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.partners.all_data
        }),
    },
    mounted(){
        store.dispatch('partners/getAllData')
    },
    methods:{
        gotoLink(link){
            window.open(link, '_blank')
        },
        get_tags(tags){
            return tags.split(',').map((t) => t.trim())
        }
    }
})
</script>