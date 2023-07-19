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
        width: 20rem;
        position: relative;
        transition: all var(--transition-time);
        box-shadow: 0.2rem 0.2rem 0.33rem .2rem rgba(0,0,0,0.125);
        border-radius: 0.67rem;
    }

    
    .card .card-body{
        display: grid;
        align-items: end;
    }
    .card .card-badge{
        position: absolute;
        font-size: .75rem;
        bottom: 0;
        right: 0;
        font-weight: 300;
        opacity: 0;
        transition: all var(--transition-time);        
    }

    .card-delete{
        content: '🗑';
        position: absolute;
        top: 0;
        right: 0;
        font-size: .75rem;
        opacity: 0;
        transition: all var(--transition-time);
    }

    .card:hover{
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
    .card:hover .card-delete{
        opacity: 1;
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
    
    <div class="main-container m-4">
        <div
            class="card"
            v-for="press_link in all_data"
            :key="press_link.id"
            @click="gotoLink(press_link.link)"
        >
            <img
                :src="press_link.image_path"
                class="card-img-top"
            >
            <div class="card-body">
                <h5 class="card-title">{{ press_link.title }}</h5>
                <span class="card-badge badge" :class="badgeColor(press_link.link_type)">
                    {{ press_link.link_type }}
                </span>
                <span
                    class="card-delete badge bg-danger"
                    v-if="user.user_type == 'super_admin'"
                    @click.stop="deletePressLink(press_link.id)"
                >
                    X
                </span>
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
        },
        badgeColor(type){
            switch(type){
                case 'newspaper_print': return 'bg-info'
                    break
                case 'newspaper_online': return 'bg-info'
                    break
                case 'journal': return 'bg-warning'
                    break
                case 'magazine': return 'bg-warning'
                    break
                case 'socialmedia': return 'bg-success'
                    break
                case 'blog': return 'bg-success'
                    break
                case 'other': return 'bg-danger'
                    break
            }
        },
        deletePressLink(id){
            if(confirm('Are you sure you want to delete this Press Link?')){
                store.dispatch('press_links/delete', id)
            }
        }
    }
})
</script>