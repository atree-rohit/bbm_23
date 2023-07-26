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
        <div class="h1">Manage Users</div>
    </div>
    
    <div class="main-container m-4">
        <table class="table table-bordered table-hoverable" v-if="is_admin || is_super_admin">
            <thead class="bg-info">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in all_data"
                    :key="user.id"
                >
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.user_type }}</td>
                    <td class="text-center d-flex justify-content-around">
                        <span
                            class="btn btn-primary badge"
                            v-if="(auth_user.id == user.id || is_super_admin)"
                        >
                            &#x270E;
                        </span>
                        <span
                            class="btn btn-danger badge"
                            v-if="(auth_user.id != user.id && is_super_admin)"
                            @click="deleteUser(user.id)"
                        >
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="bg-danger p-5 h1 text-light w-100" v-else>
            You Need to be an Admin or Super-Admin to view this page
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
export default defineComponent({
    name: 'ManageUsers',
    components: {
    },
    data(){
        return {
            show_modal: false,
        }
    },
    computed: {
        ...mapState({
            auth_user: state => state.auth.user,
            is_admin: state => state.auth.is_admin,
            is_super_admin: state => state.auth.is_super_admin,
            all_data: state => state.manage_users.all_data
        }),
    },
    mounted(){
        store.dispatch('manage_users/getAllData')
    },
    methods:{
        deleteUser(id){
            if(confirm('Are you sure you want to delete this user?')){
                store.dispatch('manage_users/delete', id)
            }
        }
    }
})
</script>