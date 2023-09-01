const tolerance = { accuracy: 50, repeats: 10, refresh_rate: 1000 }

const handleCoordinateError = (commit, error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.")
            break
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.")
            break
        case error.TIMEOUT:
            console.error("The request to get user location timed out.")
            break
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.")
            break
    }
    console.error(error)
    commit("SET_GETTING_COORDINATES", false)
}

export default {
    namespaced: true,
    state: () => ({
        latitude: null,
        longitude: null,
        accuracy: null,
        start_time: null,
        points: [],
        gettingCoordinates: false,
        shouldPersist: false,
    }),
    mutations: {
        SET_GETTING_COORDINATES(state, gettingCoordinates) {
            state.gettingCoordinates = gettingCoordinates
        },
        SET_START_TIME(state, start_time) {
            state.start_time = start_time
        },
        ADD_COORDINATES(state, coordinates) {
            state.points.push({
                timestamp: new Date(Date.now()).toLocaleString(),
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                accuracy: coordinates.accuracy,
            })
            let most_accurate = state.points.reduce((a, b) => (a.accuracy < b.accuracy) ? a : b)
            
            state.latitude = most_accurate.latitude
            state.longitude = most_accurate.longitude
            state.accuracy = most_accurate.accuracy
        },
        INIT_POINTS(state){
            state.points = []
        }
    },
    actions: {
        async getCurrentCoordinates({ commit, state, dispatch }) {
            if(state.points.length == 0 || state.accuracy > tolerance.accuracy){
                await dispatch("getCoordinates")
            }
        },
        async getCoordinates({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                commit("SET_GETTING_COORDINATES", true)
                if (!navigator.geolocation) {
                    console.error("Geolocation is not supported by this browser.")
                    reject("Geolocation is not supported by this browser.")
                }
                navigator.geolocation.getCurrentPosition((position) => {
                    commit("SET_START_TIME", new Date())
                    commit("ADD_COORDINATES", position.coords)
                    if (
                        position.coords.accuracy <= tolerance.accuracy ||
                        state.points.length >= tolerance.repeats
                    ) {
                        commit("SET_GETTING_COORDINATES", false)
                        // console.log(state.points)
                    } else {
                    setTimeout(() => {
                        dispatch("getCoordinates")
                    }, tolerance.refresh_rate)
                    }
                },
                (error) => handleCoordinateError(commit, error),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                })
            })
        },
        init({commit}){
            commit("SET_GETTING_COORDINATES", false);
            commit("ADD_COORDINATES", {latitude: null, longitude: null, accuracy: null});
            commit("INIT_POINTS");
        }
    },
}