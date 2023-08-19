<template>
    <table class="table">
        <tbody>
            <tr
                v-for="(item, index) in pending"
                :key="index"
            >
                <td>{{ item[1] }}</td>

            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import * as d3 from 'd3'
export default{
    name: "ValidateForms",
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.count_forms.all_data
        }),
        pending(){
            return d3.groups(this.all_data, d => d.status).filter((d) => d[0] == 'pending')
        }
    },
    mounted(){
        store.dispatch('count_forms/getAllData')
    },

}
</script>