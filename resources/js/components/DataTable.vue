<style scoped>
.table-container .table thead tr th{
    padding: 0.25rem 0.5rem !important;
}

.table-container .table-sm{
    font-size: 0.85vw;
}
.nowrap{
    white-space: nowrap;
}
th.sortable {
    cursor: pointer;
    transition: all 800ms;
}

th.sortable:hover{
    background-color: rgba(100,20,20,.5);
}
th.sort-asc::after{
    content: "▲";
    margin-left: 0.5rem;
}
th.sort-desc::after{
    content:"▼";
    margin-left: 0.5rem;
}
.total-row{
    font-weight: bold;
    filter: invert(1);
}

tr.empty-row > td{
    background: rgb(255, 100, 100, .75);
    /* color: yellowgreen; */
}
</style>

<template>
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
                    :row_id="row_id"
                    :class="totalRowClass(row, row_id)"
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
</template>

<script>
export default{
    name: "DataTable",
    props: {
        headers: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        total_row:{
            type: Boolean,
            required: false,
            default: false
        },
        hue:{
            type: String,
            required: false,
            default: "success"
        }
    },
    data(){
        return {
            sort_key: this.headers.filter(h => h.sortable)[0].name,
            sort_order: "desc",
        }
    },
    computed:{
        sorted_data(){
            let op = []
            let data = this.data
            if(data.length){
                if(!this.total_row){
                    op = this.sort_data(data)                             
                } else {
                    let last_row = data.pop()
                    op = this.sort_data(data)
                    op.push(last_row)
                }
            }
            return op
        }
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
        }
    }
}
</script>