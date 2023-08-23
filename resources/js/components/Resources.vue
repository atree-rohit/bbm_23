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
        overflow: visible !important;
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
    .card:hover .hover-btns{
        opacity: 1;
    }

</style>

<template>
    <div class="header d-flex px-2">
        <div class="h1">Resources</div>
        <div
            v-if="user && (user.user_type == 'super_admin' || user.user_type == 'admin')"
        >
            <button class="btn btn-lg btn-success mx-5" @click="show_modal.add = true" title="Add Resource">+</button>
        </div>
    </div>
    
    <div class="main-container m-4">
        <div
            class="card border"
            v-for="resource in all_data"
            :key="resource.id"
            @click="gotoLink(resource)"
        >
            <img
                :src="youtubeThumbnail(resource)"
                class="card-img-top"
                v-if="resource.resource_type == 'video'"
            >
            <div v-else-if="resource.title == 'BBM Count App'">
                <div class="py-5 bg-warning text-center">
                    <h1 class="h1">{{resource.title}}</h1>
                </div>
            </div>
            <img
                v-else
                :src="resource.image_path"
                class="card-img-top"
            >
            <div class="card-body">
                <h5 class="card-title">{{ resource.title }}</h5>
                
                <span class="card-badge badge" :class="badgeColor(resource.resource_type)">
                    {{ resource.resource_type }}
                </span>
                <div class="hover-btns">
                    <span
                            class="card-edit badge bg-primary"
                            v-if="user.user_type == 'super_admin'"
                            @click.stop="editResource(resource.id)"
                            title="Edit Resource"
                            v-text="'✎'"
                        />
                    <span
                        class="card-delete badge bg-danger"
                        v-if="user.user_type == 'super_admin'"
                        @click.stop="deleteResource(resource.id)"
                    >
                        X
                    </span>

                </div>
            </div>
            <div class="press-link-tags" v-if="resource.tags">
                <span
                    v-for="(tag, t) in get_tags(resource.tags)"
                    :key="t"
                    v-text="tag"
                    class="press-link-tag badge rounded-pill bg-secondary me-2 px-3 py-2"
                />
            </div>
        </div>
    </div>
    <modal-edit-resource
        :show="show_modal.edit"
        :data="selected_resource"
        @close="show_modal.edit=false"
    />
    <modal-add-resource
        :show="show_modal.add"
        @close="show_modal.add=false"
    />
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import ModalAddResource from './ModalAddResource.vue'
import ModalEditResource from './ModalEditResource.vue'
export default {
    name: 'Resources',
    components: {
        ModalAddResource,
        ModalEditResource
    },
    data(){
        return {
            show_modal: {
                add: false,
                edit: false,
            },
            selected_resource: {}
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.resources.all_data
        }),
    },
    mounted(){
        store.dispatch('resources/getAllData')
    },
    methods:{
        isImage(path){
            [".jpg", ".jpeg", ".gif", ".png"].map((e) => {
                if(path.includes(e)){
                    return true
                }
            })
            
            return false
        },
        gotoLink(resource){
            if(resource.link){
                window.open(resource.link, '_blank')
            } else {
                window.open(resource.image_path, '_blank')
            }
        },
        get_tags(tags){
            return tags.split(',').map((t) => t.trim())
        },
        badgeColor(type){
            switch(type){
                case 'video': return 'bg-info'
                    break
                case 'presentation': return 'bg-success'
                    break
                case 'e-book': return 'bg-primary'
                    break
                case 'website': return 'bg-warning'
                    break
                case 'other': return 'bg-danger'
                    break
            }
        },
        youtubeThumbnail(resource){
            let op = ""
            if(resource.link.includes("youtube.com")){
                const regExp = /[?&]v=([^&#]+)/;
                let stub = ""
  
                // Extract the matched group
                const match = resource.link.match(regExp);
                
                // Check if a match was found and return the video ID
                if (match && match[1]) {
                    stub =  match[1];
                } 
                op = `https://img.youtube.com/vi/${stub}/0.jpg`
            }
            console.log(op)
            return op
        },
        editResource(id){
            this.selected_resource = this.all_data.find((r) => r.id == id)
            this.show_modal.edit = true
        },
        deleteResource(id){
            if(confirm('Are you sure you want to delete this Resource?')){
                store.dispatch('resources/delete', id)
            }
        }
    }
}
</script>
