<style scoped>
.modal {
    display: block !important;
}

.modal textarea {
    min-height: 10rem;
}

.form-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}

.form-container input{
    border-width: 2px!important;
}

.form-switch{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: #aaa;
}

.form-check-input:checked {
    background-color: green!important;
    border-color: green!important;
}
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">Observation Details [{{ data.portal }} # {{ data.id }}]</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="form-container">
                        <div
                            class="form-floating"
                            v-for="field in fields"
                            :key="field"
                        >
                            <input class="form-control" v-model="form_values[field]" :class="fieldClass(field)">
                            <label for="exampleInputEmail1" class="form-label">{{capitalizeWords(field)}}</label>
                        </div>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" v-model="form_values.validated">
                        <label class="form-check-label" for="flexSwitchCheckChecked">validated</label>
                    </div>
                    <div>
                        <MapCleanData
                            :data="[form_values]"
                            :modes="['countries', 'states', 'districts']"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-success" @click="submit">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { capitalizeWords } from '../utils/string_fns.js'
import MapCleanData from './MapCleanData.vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])
const closeModal = () => emit('close')

const form_values = ref({})

const levels = ["countries", "states", "districts"]

const fields = ["user", "observed_on", "place", "country", "state", "district", "latitude", "longitude", "taxa_id", "species"]

const location_missing = computed(() =>  (props.data.state == null || props.data.district == null))

watch(() => props.data, (newVal) => {
    form_values.value = JSON.parse(JSON.stringify(newVal))
    
})

const fieldClass = (field) => {
    const COLORS = {
        present: 'border border-success',
        absent: 'border border-danger',
    }
    if (field === 'place' || field === 'species') {
        return 'border border-secondary'
    }
    
    const value = form_values.value[field]
    if(field === 'observed_on'){
        return dateClass(value) ? COLORS.present : COLORS.absent
    }
    return (value && (typeof value === 'string' && value.length > 1) || (typeof value === 'number' && value > 0)) ? COLORS.present : COLORS.absent
}

const dateClass = (date) =>  (!date || /^(202[0-3])-09-\d{2}$/.test(date))

const submit = () => {
    store.dispatch('clean_data/updateData', form_values.value)
    closeModal()
}

</script>

<script>


export default {
    name: 'ModalEditObservation',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            required: true
        }
    },
    mounted() {
    },
    computed: {
        show_map() {
            return (this.data.latitude && this.data.longitude) && (this.data.state == null || this.data.district == null)
        }
    },
    watch: {
        show(newVal) {
            this.current_district_coordinator_id = 0
            let body = document.querySelector('body')
            if (newVal == true) {
                body.classList.add('modal-open')
            } else {
                body.classList.remove('modal-open')
            }
        }
    },
    methods: {
    }
}
</script>