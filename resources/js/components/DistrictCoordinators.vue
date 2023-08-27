<style scoped>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .table td{
        vertical-align: middle !important;
    }
    .table-image img{
        max-height: 5rem;
        border-radius: 1rem;
        box-shadow: 0.1rem 0.1rem 0.33rem .1rem rgba(225,225,0,0.25);
    }

    th.sort-asc::after{
        content: '▲';
        padding-left: 0.25rem;
    }
    th.sort-desc::after{
        content: '▼';
        padding-left: 0.25rem;
    }

    .card{
        width: 13rem;
        position: relative;
        transition: all var(--transition-time);
        box-shadow: 0.2rem 0.2rem 0.33rem .2rem rgba(0,0,0,0.125);
        border-radius: 0.67rem;
    }

    
    .card .card-body{
        display: grid;
        align-items: end;
    }
    .card .card-badge{
        position: absolute;
        font-size: .75rem;
        bottom: 0;
        right: 0;
        font-weight: 300;
        opacity: 0;
        transition: all var(--transition-time);        
    }

    .card-delete{
        content: '🗑';
        position: absolute;
        top: 0;
        right: 0;
        font-size: .75rem;
        opacity: 0;
        transition: all var(--transition-time);
    }

    .card:hover{
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0.2rem 0.2rem .25rem .2rem rgba(0,0,0,0.5);
    }

    .card-img-top{
        width: auto;
        height: 10rem;
        object-fit: contain;
    }

    .card:hover .card-badge,
    .card:hover .card-delete{
        opacity: 1;
    }

</style>

<template>
    <div class="container-fluid">
        <div class="header d-flex px-2">
            <div class="h1">District Coordinators</div>
            <div
                v-if="auth"
            >
                <button class="btn btn-lg btn-success mx-5" @click="show_add_modal = true" title="Add District Coordinator">+</button>
            </div>
        </div>
        
        <div class="main-container m-4">
            <table class="table table-primary">
                <thead>
                    <tr>
                        <th
                            v-for="header in headers"
                            :key="header.value"
                            v-text="header.label"
                            class="bg-primary"
                            :class="headerSortClass(header.value)"
                            @click="headerClick(header.value)"
                        />
                        <th class="bg-warning  text-center" v-if="auth">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="district_coordinator in table_data"
                        :key="district_coordinator.id"
                        @click="showViewModal(district_coordinator)"
                    >
                        <td v-text="district_coordinator.id"/>
                        <td v-text="district_coordinator.name"/>
                        <td v-text="getStateName(district_coordinator.state)"/>
                        <td v-text="getDistrictName(district_coordinator.district)"/>
                        <td v-if="auth" class="table-warning text-center">
                            <button
                                class="btn delete-btn badge btn-danger"
                                @click.stop="deleteDistrictCoordinator(district_coordinator.id)"
                                title="Delete District Coordinator"
                            >
                                X
                            </button>
                        </td>
    
                    </tr>
                </tbody>
            </table>
            <map-district-coordinator @polygon-clicked="polygonClick"/>
            <modal-view-district-coordinators
                :show="show_view_modal"
                :data="selected_district_coordinator"
                @close="show_view_modal=false"
            />
        </div>
        <modal-add-district-coordinator
            :show="show_add_modal"
            @close="show_add_modal=false"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import store from '../store'
import ModalAddDistrictCoordinator from './ModalAddDistrictCoordinator.vue'
import ModalViewDistrictCoordinators from './ModalViewDistrictCoordinators.vue'
import MapDistrictCoordinator from './MapDistrictCoordinator.vue'

export default defineComponent({
    name: 'DistrictCoordinators',
    components: {
        ModalAddDistrictCoordinator,
        ModalViewDistrictCoordinators,
        MapDistrictCoordinator
    },
    data(){
        return {
            show_add_modal: false,
            show_view_modal: false,
            headers: [{
                    value: 'id',
                    label: "Sl. No.",
                },{
                    value: 'name',
                    label: "Name",
                },{
                    value: 'state',
                    label: "State",
                },{
                    value: 'district',
                    label: "District",
                }],
            sort_col: 'id',
            sort_dir: 'asc',
            selected_district_coordinator: null
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.district_coordinators.all_data,
            geojson: state => state.data.geojson,
        }),
        auth(){
            return this.user && (this.user.user_type == 'super_admin' || this.user.user_type == 'admin')
        },
        table_data(){
            return this.all_data.sort((a,b) => {
                if(this.sort_dir == 'asc'){
                    return a[this.sort_col] > b[this.sort_col] ? 1 : -1
                }else{
                    return a[this.sort_col] < b[this.sort_col] ? 1 : -1
                }
            })
        }
    },
    created(){
        store.dispatch('data/getMaps')
        store.dispatch('district_coordinators/getAllData')
    },
    methods:{
        polygonClick(polygon){
            let district_coordinators = this.all_data.filter((d) => d.state == this.valueFromLabel(polygon.name) || d.district == this.valueFromLabel(polygon.name))
            if(district_coordinators.length == 0){
                alert(`Current No Coordinators set for ${polygon.name}`)
                return
            }
            this.selected_district_coordinator = district_coordinators
            this.show_view_modal = true
        },
        showViewModal(district_coordinator){
            this.selected_district_coordinator = [district_coordinator]
            this.show_view_modal = true
        },
        valueFromLabel(str){
            return str.replace(/\s/g, '_').toLowerCase()
        },
        getStateName(state_code){
            if(state_code == -1 || this.geojson.states.features == undefined){
                return ''
            }
            
            return this.geojson.states?.features.find((s) => this.valueFromLabel(s.properties.state) == state_code)?.properties.state
        },
        getDistrictName(district_code){
            if(district_code == -1 || this.geojson.districts.features == undefined){
                return ''
            }
            return this.geojson.districts?.features.find((s) => this.valueFromLabel(s.properties.district) == district_code)?.properties.district
        },
        headerSortClass(header){
            if(header == this.sort_col){
                return this.sort_dir == 'asc' ? 'sort-asc' : 'sort-desc'
            }
        },
        headerClick(header){
            if(header == this.sort_col){
                this.sort_dir = this.sort_dir == 'asc' ? 'desc' : 'asc'
            } else {
                this.sort_col = header
                this.sort_dir = 'asc'
            }
        },
        deleteDistrictCoordinator(id){
            if(confirm('Are you sure you want to delete this District Coordinator?')){
                store.dispatch('district_coordinators/delete', id)
            }
        }
    }
})
</script>