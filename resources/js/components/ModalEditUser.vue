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
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">Edit User Details</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form action="javascript:void(0)" @submit="submit" class="row" method="post">
                        <div v-for="question in form_questions" :key="question.name" class="form-group col-12">
                            <label :for="question.name" class="font-weight-bold" v-text="question.label" />
                            <input
                                type="text"
                                v-if="question.type == 'text'"
                                v-model="form_data[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            >
                            <input
                                type="number"
                                v-if="question.type == 'number'"
                                v-model="form_data[question.name]"
                                :placeholder="`Enter ${question.name}`"
                                class="form-control"
                            >
                            <select
                                v-else-if="question.type == 'select'"
                                v-model="form_data[question.name]"
                                class="form-select"
                                :disabled="(auth_user.user_type != 'super_admin' || auth_user.id == data.id )"
                            >
                                <option>Select Link Type</option>
                                <option
                                    v-for="option in question.options"
                                    :key="option.value"
                                    :value="option.value"
                                    v-text="option.label"
                                    :selected="option.value == 'newspaper_print'"
                                />
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-success" @click="submit">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
    name: 'ModalEditUser',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    emits: ["close"],
    data(){
        return {
            form_questions: [
                {
                    type: 'text',
                    label: 'Name',
                    name: 'name',
                    required: true
                },{
                    type: 'text',
                    label: 'Email',
                    name: 'email',
                    required: true
                },{
                    type: 'select',
                    label: 'User Type',
                    name: 'user_type',
                    required: true,
                    options: [
                        {
                            label: 'User',
                            value: 'user'
                        },{
                            label: 'Admin',
                            value: 'admin'
                        },{
                            label: 'Super Admin',
                            value: 'super_admin'
                        }
                    ]
                }
            ],
            form_data: {}
        }
    },
    computed:{
        ...mapState({
            auth_user: state => state.auth.user
        })
    },
    watch:{
        show(newVal){
            this.form_data = this.data
            let body = document.querySelector('body')
            if(newVal == true){
                body.classList.add('modal-open')
            } else {
                body.classList.remove('modal-open')
            }
        }
    },
    methods:{
        ...mapActions({
            update:'manage_users/update'
        }),
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        submit(){
            let payload = {
                form_data: this.form_data,
                user: this.auth_user
            }
            this.update(payload)
            this.closeModal()
        },
        closeModal(){
            this.$emit('close')
        },
    }
})
</script>