import axios from "axios"
import butterfly_count_form from "../json/butterfly_count_form.json"
import butterfly_lists from "../json/butterfly_lists.json"

import { saveUserDetails, getUserDetails } from "../utils/idb"

export default {
    namespaced: true,
    state: {
        quiestions: butterfly_count_form,
        species_lists: butterfly_lists,
        scientific_names: [],
        common_names: [],
        user_details: {},
    },
    mutations: {
        INIT_NAMES(state){
            state.scientific_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[0])).sort()
            state.common_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[1])).sort()
        },
        SET_USER_DETAILS(state, user_details){
            state.user_details = user_details
            saveUserDetails(user_details)
        }
    },
    actions: {
        init({dispatch}){
            dispatch("initNames")
            dispatch("initUserDetails")
        },
        initNames({commit}){
            commit("INIT_NAMES")
        },
        async submitForm({commit, dispatch}, form){
            // await axios.post("/api/butterfly-counts/submit-form", form)
            dispatch("setUserDetails", form)
        },
        setUserDetails({commit}, form){
            const user_details = {
                name: form.name,
                affiliation: form.affiliation,
                phone: form.phone,
                email: form.email,
                team_members: form.team_members,
            }
            commit("SET_USER_DETAILS", user_details)
        },
        async initUserDetails({commit}){
            const user_details = await getUserDetails()
            if(user_details){
                commit("SET_USER_DETAILS", user_details)
            }
        }
    }
}

function getUnique(array){
    return [...new Set(array)]
}