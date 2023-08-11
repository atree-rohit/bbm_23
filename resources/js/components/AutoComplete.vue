<template>
    <div>
        <input type="text" v-model="searchText" @input="handleInput" @keydown.enter="selectSuggestion" />
        <ul v-if="showSuggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: "AutoComplete",
    data() {
        return {
            searchText: "",
            suggestions: ["apple", "banana", "cherry", "date", "elderberry"],
            showSuggestions: false,
            filteredSuggestions: []
        };
    },
    methods: {
        handleInput() {
            if (this.searchText.length >= 2) {
                this.filteredSuggestions = this.suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(this.searchText.toLowerCase())
                );
                this.showSuggestions = true;
            } else {
                this.filteredSuggestions = [];
                this.showSuggestions = false;
            }
        },
        selectSuggestion(suggestion) {
            this.searchText = suggestion;
            this.showSuggestions = false;
        }
    }
};
</script>
  
<style>
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
  