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
            let pending = this.all_data.filter((d) => d.status != 'approved')
            return pending
        }
    },
    mounted(){
        store.dispatch('count_forms/getAllData')
    },

}
</script>