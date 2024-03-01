<style scoped>
.year-cards-container {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
}
.year-card {
    border: 1px solid hsl(0, 0%, 50%);
    border-radius: 1rem;
    text-align: center;
    overflow: hidden;
}
.year-card-value {
    padding: 0.125rem 0.5rem;
    font-size: 1.5rem;
}
.year-card-label {
    background: hsl(0, 0%, 50%);
    color: white;
}
</style>
<template>
    <div class="year-cards-container">
        <div class="year-card" v-for="year in data" :key="year.year">
            <div class="year-card-value">{{ year.observations }}</div>
            <div class="year-card-label">{{ year.year }}</div>
        </div>
    </div>
</template>

<script lang="js" setup>

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
