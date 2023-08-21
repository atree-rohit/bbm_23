<template>
    <div class="validate-forms-container">
        <count-form-row
            v-for="form in pending"
            :key="form.id"
            :count_form="form"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import * as d3 from 'd3'
import CountFormRow from "./CountFormRow.vue"
export default{
    name: "ValidateForms",
    components: {
        CountFormRow
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            all_data: state => state.count_forms.all_data
        }),
        pending(){
            let op = []
            let pending = d3.groups(this.all_data, d => d.status).filter((d) => d[0] != 'approved')
            
            if(pending.length && pending[0][1].length > 0){
                op = pending[0][1]
            }
            console.log("pending", op)
            return op
        }
    },
    mounted(){
        store.dispatch('count_forms/getAllData')
    },

}
</script>