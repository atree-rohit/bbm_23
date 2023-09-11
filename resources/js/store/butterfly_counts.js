import axios from "axios"
import butterfly_count_form from "../json/butterfly_count_form.json"
import butterfly_lists from "../json/butterfly_lists.json"

import { saveData, getData } from "../utils/idb_user.js"
import { saveForm, getForms } from "../utils/idb_count_forms"
import { saveCurrentFormData, getCurrentFormData, clearCurrentForm } from "../utils/idb_current_form"
import { saveCurrentSpeciesData, getCurrentSpeciesData, clearCurrentSpeciesData } from "../utils/idb_current_species"
import { saveSpeciesList, getSpeciesList, clearSpeciesList } from "../utils/idb_species_list"

export default {
    namespaced: true,
    state: {
        quiestions: butterfly_count_form,
        species_lists: butterfly_lists,
        scientific_names: [],
        common_names: [],
        user_details: {},
        user_data: [],
        form_data:{},
        current_species: {},
        species_list: [],
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
        },
        SET_CURRENT_FORM_DATA(state, data){
            state.form_data = data
        },
        SET_CURRENT_SPECIES_DATA(state, data){
            state.current_species = data
        },
        SET_SPECIES_LIST(state, list){
            state.species_list = list
        },
        ADD_SPECIES_TO_LIST(state){
            state.species_list.push(state.current_species)
            state.current_species = {}
        }
    },
    actions: {
        init({dispatch}){
            // console.log("init")
            dispatch("initNames")
            dispatch("initUserDetails")
            dispatch("getCurrentFormData")
            dispatch("getCurrentSpeciesData")
            dispatch("getCurrentSpeciesList")
        },
        initNames({commit}){
            commit("INIT_NAMES")
        },
        async submitForm({commit, dispatch}, form){
            if(form.end_time == null){
                form.end_time = new Date().toLocaleTimeString()
            }
            let response = await axios.post("/api/butterfly-counts/submit-form", form)
            if(response){
                dispatch("setUserDetails", form)
                await saveForm({...form, live:true})
                await clearCurrentForm()
                await clearCurrentSpeciesData()
                await clearSpeciesList()

                return response.data
            }
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
        },
        async getCurrentFormData({commit}){
            const data = await getCurrentFormData()
            if(data){
                commit("SET_CURRENT_FORM_DATA", data)
            }
        },
        async saveCurrentFormData({commit}, data){
            await saveCurrentFormData({id: 1, ...data})
            commit("SET_CURRENT_FORM_DATA", )
        },
        async getCurrentSpeciesData({commit}){
            const data = await getCurrentSpeciesData()
            if(data){
                commit("SET_CURRENT_SPECIES_DATA", data)
            }
        },
        async saveCurrentSpeciesData({commit}, data){
            await saveCurrentSpeciesData({id: 1, ...data})
            commit("SET_CURRENT_SPECIES_DATA", data)
        },
        async addCurrentSpeciesToList({commit}){
            commit("ADD_SPECIES_TO_LIST")
            await clearCurrentSpeciesData()
        },
        async getCurrentSpeciesList({commit}){
            const data = await getSpeciesList()
            if(data){
                commit("SET_SPECIES_LIST", JSON.parse(data.data))
            }
        },
        async saveCurrentSpeciesList({commit}, data){
            await saveSpeciesList(data)
            commit("SET_SPECIES_LIST", data)
        }
    }
}

function getUnique(array){
    return [...new Set(array)]
}