<template>
    <div>
        <img ref="image" :src="image.url" alt="Image" />
        <div ref="cropper"></div>
        <button @click="saveTransforms">Save Transforms</button>
    </div>
</template>

<script>
import Cropper from "cropperjs";

export default {
    props: ["image"],
    mounted() {
        // Initialize Cropper.js
        this.cropper = new Cropper(this.$refs.image, {
            aspectRatio: 4 / 3,
            crop(event) {
                // You can access the crop box data here if needed
                console.log(event.detail);
            },
        });
    },
    methods: {
        saveTransforms() {
            // Calculate transforms
            const cropData = this.cropper.getData();
            const cropWidth = cropData.width;
            const cropHeight = cropData.height;
            const scaleFactor = 4 / 3;
            let newWidth = cropWidth;
            let newHeight = cropHeight;
            if (cropWidth / cropHeight > scaleFactor) {
                newWidth = cropHeight * scaleFactor;
            } else {
                newHeight = cropWidth / scaleFactor;
            }
            const x = cropData.x + (cropWidth - newWidth) / 2;
            const y = cropData.y + (cropHeight - newHeight) / 2;

            // Store transforms in the image object
            this.$emit("saveTransforms", {
                id: this.image.id,
                transforms: {
                    crop: {
                        x,
                        y,
                        width: newWidth,
                        height: newHeight,
                    },
                },
            });
        },
    },
    beforeDestroy() {
        // Destroy Cropper instance
        if (this.cropper) {
            this.cropper.destroy();
        }
    },
};
</script>
