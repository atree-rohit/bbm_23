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
                    <h3 class="modal-title" id="exampleModalLiveLabel">🦋 Big Butterfly Month: Data Policy 🦋</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div
                        v-for="(point, p) in points"
                        :key="p"
                        class="py-2"
                    >
                        <span>{{ point[0] }}</span>
                        <span class="px-2 fw-bold">{{ point[1] }}</span>
                        <span class="px-2">{{ point[2] }}</span>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script>

export default{
    name: 'DataPolicy',
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    data(){
        return {
            points: [
                ["🦋", "Open Access", "Big Butterfly Month emphasizes Open Access to compiled data, both from BBM and other sources."],
                ["🌐", "Credible Data Portals", "While BBM doesn't endorse a specific platform, it provides a list of credible data portals which would lead to Open Access and ethical use."],
                ["📜", "Data Alignment", "All data shared on these platforms align with the policies of each respective data portal."],
                ["👩‍🔬", "Citizen Scientist Focus", "BBM actively encourages and oversees butterfly count data collection, focusing on structured counts by citizen scientists."],
                ["🗺️", "Future Plants", "Future plans include publishing BBM count data on GBIF, until then exclusively use it for display on the BBM data page."]
            ]
        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        }
    }
}
</script>