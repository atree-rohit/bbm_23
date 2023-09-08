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

    .table-sm{
        font-size: 0.67rem;
    }

    .table-sm th{
        white-space: nowrap;
        border-left: 1px solid rgba(255,255,255,.67);
    }

    .log-table-container{
        max-height: 50vh;
        overflow: scroll;
    }
</style>

<template>
    
    <div class="main-container m-4" v-if="is_admin || is_super_admin">
        <div class="header d-flex px-2">
            <div class="h1">Manage Users</div>
        </div>
        <table class="table table-bordered table-hover">
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
                    v-for="user in all_users"
                    :key="user.id"
                    @click="showModal(user)"
                >
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.user_type }}</td>
                    <td class="text-center d-flex justify-content-around h4">
                        <span
                            class="btn btn-primary badge"
                            v-if="(auth_user.id == user.id || is_super_admin)"
                            title="Edit User"
                        >
                            &#x270E;
                        </span>
                        <span
                            class="btn btn-danger badge"
                            v-if="(auth_user.id != user.id && is_super_admin)"
                            @click="deleteUser(user.id)"
                            title="Delete User"
                        >
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="w-100 log-table-container">
            <table class="table table-sm table-hover">
                <thead class="bg-secondary text-light">
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Subject ID</th>
                        <th>Causer ID</th>
                        <th>Properties</th>
                        <th>Log Type</th>
                    </tr>
                </thead>
                <tbody class="table-secondary">
                    <tr
                        v-for="log in log_table_data"
                        :key="log.id"
                    >
                        <td v-text="log.id" />
                        <td v-text="log.subject_type" />
                        <td v-text="log.subject_id" />
                        <td v-text="getUserName(log.causer_id)" />
                        <td class='text-small' v-text="log.properties" />
                        <td v-text="log.event" />
                    </tr>

                </tbody>
            </table>
        </div>
        <modal-edit-user
            :show="show_modal"
            :data="modal_data"
            @close="show_modal=false"
        />
        
        <br><hr><br>
        {{ inat_new_total }}
        <br><hr><br>
        <div v-if="is_super_admin" class="w-100 d-flex justify-content-center py-3 my-2 border border-danger">
            <button
                class="btn btn-sm btn-outline-secondary mx-3"
                @click="pullInat"
                @keydown="pullInatAll"
                @keyup="resetAKeyPressed"
            >Pull Inat ({{ inat_new_total }})</button>
    
            <button
                class="btn btn-sm btn-danger mx-3"
                @click="addStoredData"
            >addStoredData</button>
        </div>
 
    </div>
    <div class="main-container btn-danger d-flex justify-content-center align-items-center" style="height: 20rem; font-size: 3.5vw; font-weight: 100;" v-else>
        You Need to be Logged In to View This Page
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import store from '../store'
import ModalEditUser from './ModalEditUser.vue'

export default defineComponent({
    name: 'ManageUsers',
    components: {
        ModalEditUser
    },
    data(){
        return {
            show_modal: false,
            modal_data: {},
            a_key_pressed: false,
        }
    },
    computed: {
        ...mapState({
            auth_user: state => state.auth.user,
            is_admin: state => state.auth.is_admin,
            is_super_admin: state => state.auth.is_super_admin,
            all_users: state => state.manage_users.all_data,
            all_logs: state => state.logs.all_data,
        }),
        ...mapGetters({
            inat_new_total: 'data/inat_new_total',
        }),
        log_table_data(){
            let op = []
            for(let log of this.all_logs){
                op.push({
                    id: log.id,
                    subject_type: log.subject_type.replace("App\\Models\\", ""),
                    subject_id: log.subject_id,
                    causer_id: log.causer_id,
                    event: log.event,
                    properties: log.properties.attributes,
                    created_at: log.created_at,
                    updated_at: log.updated_at,
                })
            }
            return op.reverse()
        }
    },
    mounted(){
        store.dispatch('data/initInatPull')
        store.dispatch('manage_users/getAllData')
        store.dispatch('logs/getAllData')
    },
    methods:{
        showModal(user){
            this.modal_data = user
            this.show_modal = true
        },
        getUserName(id){
            let user = this.all_users.find(user => user.id == id)
            if(user){
                return user.name
            }
            return "Unknown"
        },
        deleteUser(id){
            if(confirm('Are you sure you want to delete this user?')){
                store.dispatch('manage_users/delete', id)
            }
        },
        pullInat(){
            let pull_all = false
            store.dispatch('data/pullInat', pull_all)
        },
        pullInatAll(event) {
            if (event.key === 'a' && this.a_key_pressed == false) {
                let pull_all = true
                store.dispatch('data/pullInat', pull_all)
                this.a_key_pressed = true
            }
        },
        resetAKeyPressed(){
            this.a_key_pressed = false
        },
        addStoredData(){
            store.dispatch('data/addStoredData')
        }
    }
})
</script>