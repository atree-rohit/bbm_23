import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: []
    },
    getters: {
        data_with_classes(state){
            let op = []
            if(state.data && state.data.length){
                op = state.data.map((d) => {
                    let classes = {
                        date: validateDate(d.observed_on),
                        user: validateUser(d.user),
                        location: validateLocation(d),
                        taxon: validateTaxon(d),
                        all: false
                    }
                    classes.all = validateAll(classes)
                    return {
                        ...d,
                        classes
                    }
                })
            }
            return op
        }
    },
    mutations: {
        SET_DATA(state, data){
            state.data = data
        },
        UPDATE_DATA(state, data){
            state.data = state.data.map((d) => {
                if(d.id === data.id){
                    return data
                }
                return d
            })
        }
    },
    actions: {
        async getData({commit}, portal){
            let response = await axios.get("/api/data/portal_observations/" + portal)
            if(response){
                commit("SET_DATA", response.data)
            }
        }, async updateData({commit}, data){
            const { classes, ...data_without_classes } = data
            let response = await axios.post("/api/data/portal_observations/update", data_without_classes)
            if(response){
                console.log(response.data)
                commit("UPDATE_DATA", response.data)
            }
        }
    }
}

const validateDate = (date) => {
    return (!date || /^(202[0-3])-09-\d{2}$/.test(date)) 
}
const validateUser = (user) => {
    return (user && user.length > 0)
}
const validateLocation = (d) => {
    const isIndia = d.country === 'India';
    const op = {
        country: !!d.country,
        state: isIndia ? !!d.state : true,
        district: isIndia ? !!d.district : true,
        latitude: !isNaN(d.latitude) && !!d.latitude,
        longitude: !isNaN(d.longitude) && !!d.longitude,
        all: false
    }
    // op.all = ['country', 'state', 'district', 'latitude', 'longitude'].every(key => !!op[key])
    op.all = validateSetAll(op)
    return op
}
const validateTaxon = (d) => {
    let op = {
        taxa_id: !!d.taxa_id,
        species: !!d.species,
        all: false
    }
    // op.all = ['taxa_id', 'species'].every((key) => op[key] == true)
    op.all = validateSetAll(op)
    return op
}

const validateSetAll = (classes) => {
    for (const key in classes) {
        if(key !== 'all' && classes[key] !== true){
            return false
        }
    }
    return true
}
const validateAll = (classes) => {
    return (classes.date && classes.user && classes.location.all && classes.taxon.all)
}