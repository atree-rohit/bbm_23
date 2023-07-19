<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue JS File Upload Demo</div>
                    <div class="card-body">
                        <div v-if="success != ''" class="alert alert-success">
                            {{success}}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <input type="file" class="form-control" v-on:change="onChange">
                            <button class="btn btn-primary btn-block">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'FileUploadComponent',
    data() {
        return {
            name: '',
            file: '',
            success: ''
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
        }),
    },
    methods: {
        onChange(e) {
            this.file = e.target.files[0]
        },
        formSubmit(e) {
            e.preventDefault()
            let existingObj = this
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData()
            data.append('file', this.file)
            data.append('user_id', this.user.id)
            data.append('folder', "press_links")
            axios.post('/fileupload', data, config)
                .then(function (res) {
                    existingObj.success = res.data.success
                })
                .catch(function (err) {
                    existingObj.output = err
                })
        }
    }
}
</script>