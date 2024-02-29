<style scoped>
.images-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
}
.image-container {
    display: flex;
    border: 0.2rem solid transparent;
    border-radius: 1rem;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.image-container.border-inat {
    border-color: hsl(115, 50%, 50%);
    background-color: hsla(115, 50%, 50%, 0.25);
}
.image-container.border-ibp {
    border-color: hsl(41, 50%, 50%);
    background-color: hsl(41, 50%, 50%, 0.25);
}

.image-container.border-selected {
    /* border-width: 1rem; */
    outline: 0.5rem solid hsl(295, 50%, 50%);
    background: hsl(295, 50%, 50%, 0.75);
}
.images-container img {
    max-width: 100%;
    height: auto !important;
    max-height: 30vh;
}
</style>
<template>
    <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        :data-bs-target="`#${divID}`"
        :class="selected_image ? 'btn-success' : 'btn-primary'"
    >
        Select Image
    </button>

    <!-- Modal -->
    <div
        class="modal fade"
        :id="divID"
        tabindex="-1"
        :aria-labelledby="`Label${divID}`"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header bg-secondary text-light">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        {{ header }}
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div class="images-container">
                        <div
                            class="image-container"
                            v-for="image in images.slice(
                                pageStart,
                                pageStart + perPage
                            )"
                            :key="image.id"
                            :class="imageContainerClass(image)"
                            @click="selectImage(image)"
                        >
                            <img :src="image.url" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-dark">
                    <div class="footer-nav mx-auto d-flex gap-1">
                        <button
                            class="btn"
                            v-text="`<`"
                            :disabled="currentPage <= 1"
                            :class="
                                currentPage > 1
                                    ? 'btn-outline-success'
                                    : 'btn-outline-danger'
                            "
                            @click="
                                currentPage =
                                    currentPage > 1
                                        ? currentPage - 1
                                        : currentPage
                            "
                        />
                        <div class="bg-light py-2 px-4">
                            {{ currentPage }} of {{ totalPages }}
                        </div>
                        <button
                            class="btn"
                            v-text="`>`"
                            :disabled="currentPage == totalPages"
                            :class="
                                currentPage == totalPages
                                    ? 'btn-outline-danger'
                                    : 'btn-outline-success'
                            "
                            @click="
                                currentPage =
                                    currentPage == totalPages
                                        ? currentPage
                                        : currentPage + 1
                            "
                        />
                    </div>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="save">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
import { ref, computed } from "vue";
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    header: {
        type: String,
        default: "Header"
    }
})

const emit = defineEmits(["selectedImage"])

const currentPage = ref(1);
const perPage = ref(25);
const totalPages = computed(() =>  Math.ceil(props.images.length / perPage.value));
const pageStart = computed(() => perPage.value * (currentPage.value - 1));
const divID = computed(() => props.header.toLowerCase().replace(/\s+/g, '_').replace(/[()']/g, ''));

const selected_image = ref(null);

const selectImage = (image) => {
    if(selected_image.value?.id == image.id){
        selected_image.value = null
    } else {
        selected_image.value = image
    }
}

const imageContainerClass = (image) => {
    let op = ""
    if(selected_image.value?.id == image.id){
        op += "border-selected"
    }
    op += ` border-${image.portal}`
    return op
}

const save = () => {
    emit("selectedImage", selected_image.value)
    const modalElement = document.getElementById(divID.value);
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}
</script>
