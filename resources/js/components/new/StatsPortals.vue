<style scoped>
.portal-cards-container {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
}
.portal-card {
    border: 1px solid hsl(0, 0%, 50%);
    border-radius: 1rem;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.portal-card-value {
    padding: 0.125rem 0.5rem;
    font-size: 1.5rem;
}
.portal-card-label {
    flex-grow: 1;
    padding: auto 0;
    background: hsl(0, 0%, 50%);
    font-size: 0.6rem;
    padding: 0.15rem 0.75rem;
    color: white;
}
</style>
<template>
    <div class="portal-cards-container">
        <div class="portal-card" v-for="portal in data" :key="portal.portal">
            <div class="portal-card-value">{{ portal.observations }}</div>
            <div class="portal-card-label">
                {{ portalNames[portal.portal] }}
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
const portalNames = {
    inat: "iNaturalist",
    counts: "BBM Counts",
    ibp: "IBP",
    ifb: "IFB"
}
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
