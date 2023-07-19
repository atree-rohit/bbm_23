<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div v-if="success != ''" class="alert alert-success">
                            {{success}}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <input type="file" class="form-control" v-on:change="onChange">
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
    props: {
        folder: {
            type: String,
            default: 'uploaded_files'
        },
        upload_file: {
            type: Boolean,
            default: false
        }
    },
    emits: ["uploaded_file_id"],
    data() {
        return {
            name: '',
            file: '',
            success: '',
            submitting_form: this.upload_file,
            element: null,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
        }),
    },
    watch: {
        upload_file(newVal) {
            if (newVal) {
                this.submitting_form = true
                this.formSubmit()
            }
        }
    },
    methods: {
        onChange(e) {
            this.element = e
            this.file = e.target.files[0]
        },
        formSubmit() {
            this.element.preventDefault()
            let existingObj = this
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData()
            data.append('file', this.file)
            data.append('user_id', this.user.id)
            data.append('folder', this.folder)
            axios.post('/fileupload', data, config)
                .then((res) => {
                    existingObj.success = res.data.success
                    this.$emit('uploaded_file_id', res.data)
                    this.submitting_form = false
                })
                .catch((err) => {
                    existingObj.output = err
                    this.submitting_form = false
                })
        }
    }
}
</script>