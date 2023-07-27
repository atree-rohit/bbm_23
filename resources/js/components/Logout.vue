<template>
    <h1>Logout</h1>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
export default defineComponent({
    name: 'Logout',
    methods: {
        ...mapActions({
            signOut: 'auth/logout'
        })
    },
    mounted(){
        this.signOut()
        window.location.href = window.location.origin
    }
})
</script>