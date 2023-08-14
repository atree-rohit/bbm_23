import axios from "axios"
import butterfly_count_form from "../json/butterfly_count_form.json"
import butterfly_lists from "../json/butterfly_lists.json"

export default {
    namespaced: true,
    state: {
        quiestions: butterfly_count_form,
        species_lists: butterfly_lists,
        scientific_names: [],
        common_names: [],
    },
    getters:{
        all_data(state){
            return state.all_data
        }
    },
    mutations: {
        INIT_NAMES(state){
            state.scientific_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[0])).sort()
            state.common_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[1])).sort()
        },
    },
    actions: {
        initNames({commit}){
            commit("INIT_NAMES")
        },
        async submitForm({commit}, form){
            await axios.post("/api/butterfly-counts/submit-form", form)
        }
    }
}

function getUnique(array){
    return [...new Set(array)]
}