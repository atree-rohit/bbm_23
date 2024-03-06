<style scoped>
.img-container {
    /* border: 2px solid teal; */
    overflow: hidden;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-container img {
    /* border-radius: 1.5rem; */
    /* object-fit: scale-down; */
    /* max-height: 30vh; */
    max-height: 100%;
    max-width: 100%;
}
</style>

<template>
    <div class="img-container">
        <template v-if="url">
            <img :src="url" :style="imageStyle" />
            <!-- <cropper :image="species_data" /> -->
        </template>
        <modal-select-species-photo
            :images="observation_images"
            :header="`${species_data.common_name} (${species_data.name})`"
            @selectedImage="selectedImage"
            v-else
        />
    </div>
</template>

<script lang="js" setup>
import { ref, computed } from "vue";
import { useStore } from 'vuex'
import * as d3 from "d3";


import ModalSelectSpeciesPhoto from "./ModalSelectSpeciesPhoto.vue";


const props = defineProps({
    species_data: {
        type: Object,
        required: true
    }
})
const store = useStore()
const species_image = computed(() => store.state.new_data.species_images.find((i) => i.url == url.value))
const imageStyle = computed(() => {
    let op = ""
    const {transform, translate} = species_image.value
    if(transform){
        op += `transform: ${transform};`
    }
    if(translate){
        op += `translate: ${translate};`
    }
    return op
});

const INAT_IMAGE_SIZE = "medium";

const emit = defineEmits(["selectedImage"])

const selected_image = ref(null);

const url = computed(() => {
    if(props.species_data.url.length > 0){
        return props.species_data.url
    } else if (selected_image.value){
        return selected_image.value.url
    } else {
        return
    }
})

const observation_images = computed(() => {
    const observations_with_images = props.species_data.observations.filter((observation) => observation.url)
    const portal_groups = d3.groups(observations_with_images, (o) => o.portal)
    const image_urls = []
    portal_groups.forEach(([portal, observations]) => {
        if(portal == "inat"){
            observations.forEach((observation) => {
                image_urls.push({
                    id: observation.id,
                    url: observation.url.replace("square", INAT_IMAGE_SIZE),
                    portal: portal
                })
            })
        } else if (portal == "ibp") {
            observations.forEach((observation) => {
                image_urls.push({
                    id: observation.id,
                    url: "https://indiabiodiversity.org/files-api/api/get/raw/observations/"+ observation.url,
                    portal: portal
                })
            })

        }
    })
    return image_urls
})

const selectedImage = (image) => {
    selected_image.value = JSON.parse(JSON.stringify(image))
    if(selected_image.value && image.portal == 'inat'){
        selected_image.value.url = image.url.replace(INAT_IMAGE_SIZE, 'large')
    }
    console.log(selected_image.value)
    emit("selectedImage", selected_image.value)
}
</script>
