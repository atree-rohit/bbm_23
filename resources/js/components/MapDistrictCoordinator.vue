<style>
.map-container{
    width: 100%;
}
</style>

<template>
    <div class="map-container bg-danger">
        <div class="title h1 text-center p-3 m-0 text-light">MAP : District Coordinator</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
    name: "MapDistrictCoordinator",
})
</script>
