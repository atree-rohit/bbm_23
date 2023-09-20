<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: rgb(150, 105, 168);
}

li {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    color: #f5f5f5;
    transition: all 450ms;
}

li:hover {
    background-color: #e0e0e0;
    color: rgb(167, 48, 214);
}
</style>

<template>
    <input
        type="text"
        v-model="searchText"
        placeholder="Enter Taxon"
        class="form-control"
        @input="handleInput"
        @keydown.enter="selectSuggestion"
    >
    <ul v-if="showSuggestions">
        <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "AutoComplete",
    props: {
        suggestions:{
            type: Array,
            required: true
        },
        value:{
            type: String,
            required: true
        }
    },
    emits: ["selected"],
    data() {
        return {
            searchText: "",
            showSuggestions: false,
            filteredSuggestions: [],
            typingTimer: null,
            typingTimeout: 300, // Adjust the delay as needed
        }
    },
    watch:{
        value(newVal, oldVal){
            this.searchText = newVal
            // console.log(newVal, oldVal, newVal.length - oldVal.length, this.showSuggestions)
            if(oldVal.length == 0){
                this.handleInput()
            } 
        }
    },
    methods: {
        handleInput() {
            clearTimeout(this.typingTimer)
            if (this.searchText.length >= 2) {
                this.typingTimeout = setTimeout(() => {
                    this.filteredSuggestions = this.suggestions.filter(suggestion =>
                        suggestion.toLowerCase().includes(this.searchText.toLowerCase())
                    )
                    this.showSuggestions = true                    
                }, this.typingTimeout)
            } else {
                this.filteredSuggestions = []
                this.showSuggestions = false
            }
        },
        selectSuggestion(suggestion) {
            this.searchText = suggestion
            this.showSuggestions = false
            this.$emit("selected", suggestion)
        }
    }
}
</script>