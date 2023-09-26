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

.observation-modal{
    width: auto;
    max-width: 90vw;
}
.btn-close{
    /* background: rgba(200,0,0,.5); */
    padding: 1rem;
}
</style>
<template>
    <div v-if="show" class="modal fade show" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg observation-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLiveLabel">Observation Details [{{ data.portal }} # {{ data.id }}]</h3>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex">
                        <div class="left">
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
        
        
        
                            <div class="taxa-lookup-container p-2 row mx-0" style="background-color: #aaa;">
                                <div class="col">
                                    <auto-complete-taxon
                                        :suggestions="allTaxa"
                                        :value="selectedTaxa"
                                        @selected="scientificNameSelected"
                                    />
                                </div>
                                <div class="col-2">
                                    <button class="btn btn-success px-2 ms-3" @click="copySpecies">📋</button>
                                </div>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" v-model="form_values.validated">
                                <label class="form-check-label" for="flexSwitchCheckChecked">validated</label>
                            </div>
                        </div>
                        <div class="right">
                            <MapCleanData
                                :data="map_data"
                                :modes="['countries', 'states', 'districts']"
                                @polygon-clicked="polygonClicked"
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-success" @click="submit">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { capitalizeWords } from '../utils/string_fns.js'

import MapCleanData from './MapCleanData.vue'
import AutoCompleteTaxon from './AutoCompleteTaxon.vue'

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


const map_data = computed(() => {
    const {latitude, longitude} = form_values.value
    return [{latitude, longitude}]

}) 

const emit = defineEmits(['close'])
const closeModal = () => {
    selectedTaxa.value = ''
    emit('close')
}

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

const submit = async () => {
    const stored = await store.dispatch('clean_data/updateData', form_values.value)
    if(stored){
        closeModal()
    }
}





onMounted(() => {
    store.dispatch('data/getTaxa', form_values.value)
})




const allTaxa = computed(() =>  store.state.data.taxa.map((t) => `${t.name}-${t.id}`))

const selectedTaxa = ref('')
const scientificNameSelected = (taxa) => {
    const nameParts = taxa.split('-')
    console.log(form_values.value, nameParts)
    if(form_values.value.species === nameParts[0] && form_values.value.taxa_id == null){
        form_values.value.taxa_id = nameParts[1]
    }    
    selectedTaxa.value = taxa
}

const copySpecies = () => {
    selectedTaxa.value = form_values.value.species
    // console.log(form_values.value, selectedTaxa.value)
}

const polygonClicked = (data) => {
    console.log(data, form_values.value)
    if(form_values.value.country == null){
        form_values.value.country = data.country
    }
    if(form_values.value.state == null){
        form_values.value.state = data.state
    }

    if(form_values.value.district == null){
        form_values.value.district = data.district
    }
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