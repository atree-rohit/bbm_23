<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
}

li:hover {
    background-color: #e0e0e0;
}
</style>

<template>
    <input
        type="text"
        v-model="searchText"
        :placeholder="`Enter ${question?.name}`"
        class="form-control"
        @input="handleInput"
        @keydown.enter="selectSuggestion"
    >
    <label
        :for="question.name"
        class="font-weight-bold"
        v-text="question.label"
    />
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
        question:{
            type: Object,
            required: true
        },
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
            filteredSuggestions: []
        }
    },
    watch:{
        value(newVal){
            this.searchText = newVal
        }
    },
    methods: {
        handleInput() {
            if (this.searchText.length >= 2) {
                this.filteredSuggestions = this.suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(this.searchText.toLowerCase())
                )
                this.showSuggestions = true
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