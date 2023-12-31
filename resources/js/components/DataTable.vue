<style scoped>

.table-wrapper {
    max-height: 50vh; /* You can adjust this value as needed */
    margin-top: 2rem;
    padding: 1rem;
}
.table-container{
    max-height: 50vh; /* You can adjust this value as needed */
    overflow: auto;
    width: 100%;
    flex-grow: 10;
}

/* Sticky Table Header */
.table-container .table thead {
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure it's on top of the table cells */
}

.table-container .table tbody tr:first-child {
    margin-top: 2rem; /* Adjust this value as needed to match the height of your header */
}


/* Table Header Styles */
.table-container .table thead tr th {
    padding: 0.25rem 0.5rem !important;
}

/* Small Table Font Size */
.table-container .table-sm {
    font-size: 1rem;
}

table tr th:first-child,
table tr td:first-child {
    text-align: left;
}

table tr th:not(:first-child),
table tr td:not(:first-child) {
    text-align: center;
}

/* Prevent Text Wrapping */
.nowrap {
    white-space: nowrap;
}

/* Sortable Table Headers */
th.sortable {
    cursor: pointer;
    transition: background-color 800ms;
}

th.sortable:hover {
    background-color: rgba(100, 20, 20, 0.5);
}

/* Sort Icons */
th.sort-asc::after,
th.sort-desc::after {
    content: "▲";
    margin-left: 0.5rem;
}

th.sort-desc::after {
    content: "▼";
}

/* Total Row Styles */
.total-row {
    font-weight: bold;
    filter: invert(1);
}

/* Empty Row Styles */
tr.empty-row > td {
    background: rgba(255, 100, 100, 0.75);
}

/* Responsive Font Size */
@media screen and (max-width: 768px) {
    .table-container{
        padding: .25rem;
    }
    .table-container .table-sm {
        font-size: 0.75rem;
    }
}

</style>

<template>
    <div class="table-wrapper">
        <div class="table-container">
            <table class="table table-sm table-hover">
                <thead :class="`bg-${hue} text-light`">
                    <tr>
                        <th
                            v-for="(header, h) in headers"
                            :key="h"
                            v-text="header.label"
                            :class="headerSortClass(header)"
                            @click="headerClick(header)"
                        />
                    </tr>
                </thead>
                <tbody :class="`table-${hue}`">
                    <tr
                        v-for="(row, row_id) in sorted_data"
                        :key="row_id"
                        :row_id="row_id"
                        :class="totalRowClass(row, row_id)"
                        @click="rowClick(row, row_id)"
                    >
                        <td
                            v-for="(header, h) in headers"
                            :key="h"
                            :class="header?.class"
                            v-text="cellText(row, header)"
                        />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import store from '../store'
export default{
    name: "DataTable",
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            sort_key: null,
            sort_order: "desc",
        }
    },
    computed:{
        sorted_data(){
            let op = []
            if(this.data && this.data.length){
                if(!this.total_row){
                    op = this.sort_data(this.data)                             
                } else {
                    let last_row = this.data.pop()
                    op = this.sort_data(this.data)
                    op.push(last_row)
                }
            }
            return op
        },
        headers(){
            if(!this.content){
                return []
            }
            return this.content.headers
        },
        data(){
            if(!this.content){
                return []
            } 
            if(this.sort_key == null){
                this.sort_key = this.headers[this.content.sort_col].name
            }
            return this.content.rows
        },
        total_row(){
            return this.content.total_row
        },
        hue(){
            return this.content.hue
        },
    },
    methods:{
        sort_data(data){
            return data.sort((a, b) => {
                let x = a[this.sort_key];
                let y = b[this.sort_key];
                if (this.sort_order === "asc"){
                    return x < y ? -1 : x > y ? 1 : 0;
                } else {
                    return x > y ? -1 : x < y ? 1 : 0;
                }
            })   
        },
        cellText(row, header){
            let op = row[header.name]
            if(typeof(op) == 'number'){
                op = this.numberWithCommas(op)
            }
            return op
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        headerSortClass(header){
            let op = ""
            if(header.sortable){
                op = "sortable"
                if(header.name === this.sort_key){
                    op += " sort-" + this.sort_order
                }
            }
            return op
        },
        headerClick(header){
            if(header.sortable){
                this.sort_key = header.name
                this.sort_order = this.sort_order === 'asc' ? 'desc' : 'asc'
            }
        },
        totalRowClass(row, row_id){
            if(this.total_row && row_id === this.sorted_data.length - 1){
                return `total-row` 
            } else if(Object.values(row).filter((v) => typeof(v) == 'number').reduce((a, b) => a + b, 0) == 0) {
                return `empty-row`
            }
            return
        },
        rowClick(row, row_id){
            if(this.content.click != null && (this.content.total_row == false || row_id < this.content.rows.length - 1)){
                if(['state', 'district'].indexOf(this.content.click) != -1){
                    let payload = null
                    if(this.content.click == 'state'){
                        payload = row[this.content.click]
                    }
                    store.dispatch('data/setFilter', {field:"state", value: payload})
                } else {
                    let payload = {
                        field: this.content.click,
                        value: row[this.content.click]
                    }
                    store.dispatch('data/setFilter', payload)
                }
            } else {
                console.log(this.content.click, this.content.total_row, row_id, this.content.rows.length)
            }
            
        }
    }
}
</script>