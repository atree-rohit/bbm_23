<style scoped>
.map-container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    justify-content: center;
}

.map-container .table-container {
    /* outline: 1rem solid rgba(255, 0, 0, 0.5); */
    height: 80vh;
    overflow-y: auto;
}

.map-container .table-container th {
    text-transform: capitalize;
}

@media (max-width: 500px) {
    .map-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
    }

    .map-container .table-container {
        height: auto;
        overflow-y: none;
    }
}
</style>

<template>
    <div class="switcher switcher-sm text-center py-2 bg-dark text-danger">
        {{ selected_state }}
        <button
            class="btn mx-1"
            v-for="pm in ['states', 'districts']"
            :key="pm"
            :class="
                pm === mode ? 'btn-success' : 'btn-outline-success bg-light'
            "
            @click="mode = pm"
            v-text="pm"
        />
    </div>
    <div class="map-container">
        <map-component
            :geojson="mapGeoJson"
            :data="map_data"
            :mode="mode"
            tooltip_third_row_label="Coordinator(/s)"
            @mode-change="mode = $event"
            @polygon-clicked="polygonClick"
        />
        <div class="table-container">
            <table class="table table-primary table-sm">
                <thead>
                    <tr>
                        <th class="bg-primary text-light">#</th>
                        <th class="bg-primary text-light">{{ mode }}</th>
                        <th
                            class="bg-primary text-light"
                            v-if="mode == 'districts'"
                        >
                            State
                        </th>
                        <th class="bg-primary text-light">Coordinators</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, rid) in map_data[mode]"
                        :key="rid"
                        @click="tableRowClick(row)"
                    >
                        <td v-text="rid + 1" />
                        <td v-text="row.name" />
                        <td v-text="row.state" v-if="mode == 'districts'" />
                        <td v-text="row.value" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import MapComponent from "./MapComponent.vue";
import * as d3 from "d3";

export default defineComponent({
    name: "MapDistrictCoordinator",
    components: {
        MapComponent,
    },
    emits: ["polygon-clicked"],
    data() {
        return {
            mode: "states",
            selected_state: "",
        };
    },
    computed: {
        ...mapState({
            district_coordinators: (state) =>
                state.district_coordinators.all_data,
            geojson: (state) => state.data.geojson,
        }),
        mapGeoJson() {
            console.log(this.geojson);
            if (this.selected_state == "") {
                return this.geojson[this.mode];
            } else {
                const { features, ...g } = this.geojson.districts;
                const district_features = features.filter(
                    (f) => f.properties.state == this.selected_state
                );
                g.features = district_features;
                return g;
            }
        },
        map_data() {
            let op = {};
            if (this.geojson.states.features) {
                let all = {
                    states: this.geojson.states.features.map(
                        (f) => f.properties.state
                    ),
                    districts: this.geojson.districts.features.map((f) => {
                        return {
                            district: f.properties.district,
                            state: f.properties.state,
                        };
                    }),
                };
                op = {
                    states: all.states.map((s) => {
                        return {
                            name: s,
                            value: 0,
                        };
                    }),
                    districts: all.districts.map((d) => {
                        return {
                            name: d.district,
                            state: d.state,
                            value: 0,
                        };
                    }),
                };

                if (this.selected_state != "") {
                    op.districts = op.districts.filter(
                        (d) => d.state == this.selected_state
                    );
                }

                this.district_coordinators.forEach((d) => {
                    op.states.find(
                        (s, i) => d.state == this.valueFromLabel(s.name)
                    ).value += 1;
                    op.districts.forEach((s) => {
                        if (d.district == this.valueFromLabel(s.name)) {
                            s.value += 1;
                        }
                    });
                });
                op.states.sort((a, b) => b.value - a.value);
                op.districts.sort((a, b) => b.value - a.value);
            }
            return op;
        },
    },
    mounted() {},
    methods: {
        getStateName(state_code) {
            if (state_code == -1 || this.geojson.states.features == undefined) {
                return "";
            }

            return this.geojson.states.features.find(
                (s) => this.valueFromLabel(s.properties.state) == state_code
            )?.properties.state;
        },
        getDistrictName(district_code) {
            if (
                district_code == -1 ||
                this.geojson.districts.features == undefined
            ) {
                return "";
            }
            return this.geojson.districts.features.find(
                (s) =>
                    this.valueFromLabel(s.properties.district) == district_code
            )?.properties.district;
        },
        valueFromLabel(str) {
            return str.replace(/\s/g, "_").toLowerCase();
        },
        tableRowClick(row) {
            this.polygonClick({
                ...row,
                mode: this.mode,
            });
        },
        polygonClick(data) {
            // console.log(data);
            const new_name = this.mode == "states" ? data.name : data.state;
            if (this.selected_state == new_name) {
                this.selected_state = "";
                this.mode = "states";
            } else {
                this.selected_state = new_name;
                this.mode = "districts";
            }

            // this.$emit("polygon-clicked", data);
        },
    },
});
</script>
