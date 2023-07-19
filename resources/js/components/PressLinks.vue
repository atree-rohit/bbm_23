<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .press-links-container .press-link{
        font-size: 1.2rem;
        background: rgba(225, 225, 225, .75);
        border-radius: 1rem;
        border: 1px solid transparent;
        transition: all var(--transition-time);
    }
    .press-links-container .press-link .press-link-title{
        font-weight: 100;
        color: #444;
        text-align: justify;
    }
    .press-links-container .press-link:hover{
        background: rgba(225,225,255,1);
        border: 1px solid rgb(50, 50, 200);
        cursor: pointer;
    }

    .press-link-image img{
        width: 15rem;
        height: auto;
    }
    .press-link-tag{
        font-weight: 100;
        font-size: .8rem;
    }
</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Press Links</div>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-lg btn-success mx-5" @click="show_modal = true">Add Press Link</button>
        </div>
    </div>
    
    <div class="press-links-container m-4">
        <div
            class="press-link my-4 p-4"
            v-for="press_link in all_data"
            :key="press_link.id"
            @click="gotoLink(press_link.link)"
        >
            <div class="press-link-title h3">{{ press_link.title }}</div>
            <div class="press-link-image pt-4" v-if="press_link.image">
                <img :src="press_link.press_link_image.path" alt="">
            </div>
            <div class="press-link-tags" v-if="press_link.tags">
                <span
                    v-for="(tag, t) in get_tags(press_link.tags)"
                    :key="t"
                    v-text="tag"
                    class="press-link-tag badge rounded-pill bg-secondary me-2 px-3 py-2"
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
    name: 'PressLinks',
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
            all_data: state => state.press_links.all_data
        }),
    },
    mounted(){
        store.dispatch('press_links/getAllData')
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