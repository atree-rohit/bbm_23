import axios from "axios"
import butterfly_count_form from "../json/butterfly_count_form.json"
import butterfly_lists from "../json/butterfly_lists.json"

import { saveData, getData } from "../utils/idb_user.js"
import { saveForm, getForms } from "../utils/idb_count_forms"

export default {
    namespaced: true,
    state: {
        quiestions: butterfly_count_form,
        species_lists: butterfly_lists,
        scientific_names: [],
        common_names: [],
        user_details: {},
        user_data: [],
    },
    mutations: {
        INIT_NAMES(state){
            state.scientific_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[0])).sort()
            state.common_names = getUnique(Object.values(state.species_lists).flat().map((s) => s[1])).sort()
        },
        SET_USER_DETAILS(state, user_details){
            state.user_details = user_details
        },
        SET_USER_DATA(state, user_data){
            state.user_data = user_data
        }
    },
    actions: {
        init({dispatch}){
            // console.log("init")
            dispatch("initNames")
            dispatch("initUserDetails")
        },
        initNames({commit}){
            commit("INIT_NAMES")
        },
        async submitForm({commit, dispatch}, form){
            if(form.end_time == null){
                form.end_time = new Date().toLocaleTimeString()
            }
            await axios.post("/api/butterfly-counts/submit-form", form)
            dispatch("setUserDetails", form)
            await saveForm({...form, live:true})
        },
        setUserDetails({commit}, form){
            const user_details = {
                name: form.name,
                affiliation: form.affiliation,
                phone: form.phone,
                email: form.email,
                team_members: form.team_members,
                open_access: form.open_access,
            }
            commit("SET_USER_DETAILS", user_details)
            saveData(user_details)
        },
        async initUserDetails({commit, dispatch}){
            const user_details = await getData()
            if(user_details){
                commit("SET_USER_DETAILS", user_details)
                dispatch("getUserData")
            }
        },
        async getUserData({commit, state}){
            // let data = await getForms()
            // if(data.length){
            //     commit("SET_USER_DATA", data)
            // }
            const user_data = await axios.get("/api/user_count_forms", {params: state.user_details})
            if(user_data.data.length > 0){
                commit("SET_USER_DATA", user_data.data)
                user_data.data.forEach(async (d) => {
                    await saveForm(d)
                })
            }
        }
    }
}

function getUnique(array){
    return [...new Set(array)]
}