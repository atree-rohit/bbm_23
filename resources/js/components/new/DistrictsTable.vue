<style scoped>
.table-container {
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;
}

table,
thead,
tbody {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid rgb(103, 49, 110);
}
td,
th {
    text-align: center;
    /* outline: 1px solid rgba(0, 0, 0, 0.25); */
    font-size: 0.75rem;
}

th {
    text-align: center;
    padding: 0.25rem 1rem;
    border: none;
    background: rgb(103, 49, 110);
    color: white;
}

td {
    padding: 0.25rem 0.5rem;
    border-bottom: 1px solid rgb(103, 49, 110);
}

.bbms-cell,
.portals-cell {
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.1rem;
    justify-content: center;
    /* padding: 0.5rem; */
}
</style>

<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>District</th>
                    <th>Observations</th>
                    <th>Users</th>
                    <th>Taxa</th>
                    <th>Species</th>
                    <th>BBMs</th>
                    <th>Portals</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.name">
                    <td v-text="row.name" />
                    <td v-text="row.observations" />
                    <td v-text="row.users" />
                    <td v-text="row.taxa" />
                    <td v-text="row.species" />
                    <td>
                        <div class="bbms-cell">
                            <span
                                class="badge rounded-pill bg-primary text-bg-primary"
                                v-for="bbm in row.bbms"
                                :key="bbm"
                                v-text="bbm"
                            />
                        </div>
                    </td>
                    <td>
                        <div class="portals-cell">
                            <span
                                class="badge rounded-pill"
                                v-for="portal in row.portals"
                                :key="portal"
                                :class="portalClass(portal)"
                                v-text="portal"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="js" setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const portalClass = (portal) => {
    let op = "info"
    switch(portal){
        case "counts": op = "primary"
            break;
        case "inat": op = "success"
            break;
        case "ibp": op = "danger"
            break;
        case "ifb": op = "warning"
            break;
    }

    return `bg-${op} text-bg-$op}`
}
</script>
