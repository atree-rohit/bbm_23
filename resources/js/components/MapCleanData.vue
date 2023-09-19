<style>
    .point{
        fill: red;
        stroke: yellow;
        stroke-width: 1rem;;
    }
</style>
<template>
    <div class="switcher switcher-sm text-center py-2 bg-dark">
        <button
            class="btn mx-1"
            v-for="pm in modes"
            :key="pm"
            :class="pm === mode ? 'btn-success' : 'btn-outline-success bg-light'"
            @click="mode = pm"
            v-text="pm"
        />
    </div>
    <div id="map">
        <div id="map-container"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import * as d3 from 'd3'
import * as d3Legend from 'd3-svg-legend'


export default defineComponent({
    name: "MapCleanData",
    props: {
        data: {
            type: Array,
            required: true
        },
        modes:{
            type: Array,
            required: true
        },
		tooltip_third_row_label: {
			type: String,
			default: ""
		},
    },
    emits: ['mode-change', 'polygon-clicked'],
    data() {
        return {
            mode: this.modes[0],
            polygons: null,
            path: null,
            svg: null,
            projection: null,
            colors: null,
            max: null,
            height: 500,
            width: 500,
            zoomTransform: 0,
            tooltip: null,
        }      
    },
    watch:{
        mode(newVal){
            this.$emit('mode-change', newVal)
        },
		data(newVal){
			console.log("data changed")
			this.init()
		}
    },
    computed:{
        ...mapState({
            geojson: state => state.data.geojson,
        }),
        current_geojson(){
            return this.geojson[this.mode]
        },
        zoom(){
            return d3.zoom()
                .scaleExtent([0.5, 250])
                .translateExtent([[-0.5 * this.width,-0.75 * this.height],[2.5 * this.width, 2.5 * this.height]])
				.on('zoom', this.handleZoom)
        },
		mode_key(){
            let op = {
                countries: "country",
                states: "state",
                districts: "district"
            }
			return op[this.mode]
		}
    },
	mounted(){
		// console.log("mounted: initializing")
		// if(this.geojson && this.geojson.features){
		// 	this.init()
		// }
	},
    updated(){
		console.log("updated: re-initializing")
		this.init()
	},
    methods: {
        init(){
			console.log("init")
            if(this.current_geojson.features){
				this.init_variables()
                // this.init_legend()
                this.init_svg()
                this.render_map()
            } else {
                console.log("No geojson")
            }
        },
        init_variables(){
            this.polygons = null
            this.path = null
            this.svg = {}
            this.height = window.innerHeight * 0.8
            this.width = window.innerWidth
            if(window.innerWidth < 800){
				this.height = window.innerHeight * 0.6
				this.projection = d3.geoMercator().scale(600).center([110, 20])
			} else {
				this.projection = d3.geoMercator().scale(1000).center([80, 27.5])
			}
			this.path = d3.geoPath().projection(this.projection)
            this.tooltip = this.init_tooltip()
        },
		init_tooltip(){
			if (!d3.select("body .d3-tooltip").empty()) {
				d3.select("body .d3-tooltip").remove()
			}

			return d3.select('body')
						.append('div')
						.attr('class', 'd3-tooltip')
						.style('position', 'absolute')
						.style('top', '0')
						.style('z-index', '10')
						.style('visibility', 'hidden')
						.style('padding', '10px')
						.style('background', 'rgba(0,0,0,0.75)')
						.style('border-radius', '4px')
						.style('color', '#fff')
						.text('a simple tooltip')
		},
        // init_legend(){
        //     this.colors = {}
        //     this.legend = {}
        //     this.max = d3.max(this.mapData, (d) => d.value) 
        //     this.colors = d3.scaleLinear()
        //         .domain([0,1, this.max/3, this.max])
        //         .range(["#c33", "#488", "#fd0", "#24ff00"])
        //         .clamp(true)
        //     this.legend = d3Legend.legendColor()
		// 						.shapeHeight(20)
		// 						.shapeWidth(60)
		// 						.scale(this.colors)
		// 						.labelFormat(d3.format(",.0f"))
		// 						.orient('horizontal')
		// 						.labelOffset(-10)
		// 						.labelAlign("middle")
		// 						.cells(6)
        // },
        init_svg(){
            if (!d3.select("#map-container svg.svg-content").empty()) {
				d3.select("#map-container svg.svg-content").remove()
			}
			this.svg = d3.select("#map-container")
						.append("svg")
							.attr("preserveAspectRatio", "xMinYMin meet")
							.attr("width", this.width)
							.attr("height", this.height)
							.classed("svg-content", true)
			if(!this.zoomTransform){
				this.zoomTransform =  d3.zoomTransform(this.svg.node())
			}

			if(this.height > this.width){
				this.legend.shapeWidth(35)
				.cells(4)
			}
        },
        render_map(){
            let base = this.svg.append("g")
				.classed("map-boundary", true)
				.selectAll("path").append("g")
			let base_text = this.svg.append("g")
				.classed("map-labels", true)
				.selectAll("text").append("g")
			this.polygons = base.append("g")
				.classed("polygons", true)
			
			this.current_geojson.features.forEach((polygon) => {
				this.drawPolygon(polygon)
			})

            this.drawPoints()
			
			this.svg.call(this.zoom)
            
			this.svg.call(this.zoom.transform, this.zoomTransform)
        },
        drawPoints() {
            // Create a new group for the points
            const pointsGroup = this.svg.append("g")
            	.classed("points", true)
			const missing_coordinates = []
            
            // Loop through the pointsArray and add circles for each point
            this.data.forEach((point) => {
                const {longitude, latitude} = point
				
				if(latitude && !isNaN(latitude) && longitude&& !isNaN(longitude)){
					// Convert latitude and longitude to screen coordinates
					const [x, y] = this.projection([longitude, latitude])
	
					// Add a circle for each point
					
					pointsGroup.append("circle")
						.attr("cx", x)
						.attr("cy", y)
						.attr("r", "0.15rem") // Adjust the radius as needed
						.classed("point", true)
				} else {
					missing_coordinates.push(point)
				}
            })
			if(missing_coordinates.length){
				console.warn("Missing Coordinates:", missing_coordinates)
			}

        },
        drawPolygon(polygon){
			this.polygons.append("g")
				.data([polygon])
				.enter().append("path")
				.attr("d", this.path)
				// .attr("id", this.getPolygonId(polygon.properties))
				// .attr("fill", (d) => this.color_polygon(polygon.properties))
				// .on('mouseover', (d, i) => {
				// 	this.tooltip.html(this.hover_text(polygon.properties))
				// 		.style('visibility', 'visible')
				// })
				// .on('mousemove', (event, d) => {
				// 	this.tooltip
				// 		.style('top', event.pageY - 10 + 'px')
				// 		.style('left', event.pageX + 10 + 'px')
				// })
				// .on('mouseout', () => this.tooltip.html(``).style('visibility', 'hidden'))
				.on("click", (d, polygon_details) => this.clicked(polygon_details))
		},
        getPolygonId(polygon){
            let op = polygon.region
			let replace_chars = [" ", "&", "(", ")", "."]
			if(polygon.state != undefined){
				op = polygon.state
			}
			if(polygon.district != undefined){
				op = polygon.district
			}
			replace_chars.forEach((c) => {
				op = op.replaceAll(c, "_")
			})
			return op
		},
        clicked(polygon_details) {
            console.log(polygon_details)
			let op = {
				name: polygon_details.properties[this.mode_key],
				mode: this.mode
			}
            console.log(op)
			this.$emit('polygon-clicked', op)
		},

        drawPolygonBoundary(polygon){
			this.polygons.append("g")
				.data([polygon])
				.enter().append("path")
				.classed("state-boundary", true)
				.classed("selected-polygon", (d) => {
					return ((this.selected.state && d.properties.state == this.selected.state) 
					|| (this.selected.region && d.properties.region == this.selected.region))
				})
				.attr("properties", (d) => JSON.stringify(d.properties))
				.attr("d", this.path)
				.attr("id", this.getPolygonId(polygon.properties))
		},
		drawPolygonLabel(base_text, polygon){
			const polygon_data = this.regional_data[this.polygon_mode].find((d) => d[this.polygon_key] == polygon.properties[this.polygon_key])
			let data = ""
			if(polygon_data){
				data = this.format_number(polygon_data[this.data_mode])
			}
			
			base_text.append("g")
				.data([polygon])
				.enter().append("text")
				.classed("poly_text", true)
				.attr("x", (h) => this.path.centroid(h)[0] )
				.attr("y", (h) => this.path.centroid(h)[1] )
				.classed("small-text", true)
				.attr("text-anchor", "middle")
				.text(data)
				.on('mouseover', () => {
					this.tooltip.html(this.hover_text(polygon.properties))
						.style('visibility', 'visible');
				})
				.on('mousemove', (event, d) => {
					this.tooltip
						.style('top', event.pageY - 10 + 'px')
						.style('left', event.pageX + 10 + 'px')
				})
				.on('mouseout', () => this.tooltip.html(``).style('visibility', 'hidden'))
				.on("click", (d, polygon_details) => this.clicked(polygon_details))
		},
        


        color_polygon(polygon) {
			let polygon_data = this.mapData.find((d) => d.name == polygon[this.mode_key])
			if(polygon_data){
                return this.colors(polygon_data.value)
			}
            return this.colors(0)
        },
        handleZoom(e){
			this.zoomTransform = e.transform
			let text_size = (1/e.transform.k * .8)
            this.svg.selectAll('.poly_text')
                .attr('transform', e.transform)
				.style('font-size', `${text_size}rem`)
            this.svg.selectAll('path')
                .attr('transform', e.transform)
            this.svg.selectAll('circle')
                .attr('transform', e.transform)
				// .attr("r", text_size)
        },
        hover_text(properties){
			let op = ["state", "district"].map((key) => `<tr><td>${this.capitalizeWords(key)}</td><td>${properties[key] ? properties[key]: "-"}</td></tr>`)	
            op.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${this.mapData.find((d) => d.name == properties[this.mode_key])?.value || 0}</td></tr>`)
			return `<table border='1' class='d3-tooltip'>${op.join('\n')}</table>`
			
		},
        format_number(num){
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
        capitalizeWords(str){
			return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
		},
    }
})
</script>