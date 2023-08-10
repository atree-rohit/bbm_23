import axios from "axios"
import butterfly_count_form from "../json/butterfly_count_form.json"

export default {
    namespaced: true,
    state: {
        quiestions: butterfly_count_form,
    },
    getters:{
        all_data(state){
            return state.all_data
        }
    },
    mutations: {
    },
    actions: {
    }
}