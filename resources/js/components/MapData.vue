<style>
	.switcher-sm .btn{
		font-size: 0.9rem !important;
	}
	#map{
		display: flex;
		justify-content: space-around;
	}
	#map #map-stats{
		border: 1px solid pink;
		width: 50%;
		margin: 0 5px;
		max-height: 80vh;
		overflow:hidden;
	}
	#map-container {
		display:flex;
		justify-content: center;
	}
	.map-boundary path.state-boundary{
		stroke-linejoin: round;
		stroke-width: 0.5;
		stroke:rgba(0, 0, 0, 1);
		fill: none;
	}
	.map-boundary path:not(.state-boundary){
		stroke-linejoin: round;
		stroke-width: .25;
		stroke:rgba(0, 0, 0, 0.5);
	}
	.map-boundary path:not(.state-boundary):hover{
		cursor: pointer;
		fill: beige;
	}
	.map-boundary .current-state{
		stroke: rgba(0,50,255,.75);
		stroke-width:.25px;
		filter: brightness(1.25)
	}
	.map-boundary .selected-polygon{
		/*fill: #afa;*/
		fill: #ffff55;
		stroke: rgba(255,50,0,.75);
		stroke-width:.5px;
	}
	.poly_text{
		fill: #545;
		font-size: 0.85rem;
		transition: fill .125s;
		text-shadow: 
		0px 0px 1px white,
		0px 0px 2px white,
		0px 0px 3px white,
		0px 0px 4px white,
		0px 0px 5px white;
	}
	.poly_text:hover{
		fill: #00c;
		text-shadow: 0px 0px 5px #fff;
		cursor: pointer;
		font-weight: 1000;
	}
    .map-points circle{
		stroke-width: .5px;
		stroke: rgba(0,0,0,.25);
		fill: transparent;
	}
	.map-points circle:hover{
		cursor:pointer;
		stroke: rgba(0,255,0,.5);
	}
	svg{
		background: hsl(200, 50%, 75%);
	}
	.small-text{
		font-size: .85rem;
	}
	.legendCells:after{
		content: "";
		display:block;
		width: 100%;
		height: 100%;
		background-color: #ffffff;
  		border: 1px solid black;
	}
	.selected-polygon{
		stroke: red !important;
		stroke-width: 1.5px !important;
		z-index: 100;
	}
	.legendCells .cell text{
		display: flex;
  		align-items: center;
	}
    .d3-tooltip table,
    .d3-tooltip tr,
    .d3-tooltip td{
        font-size: 0.85rem;
        border: 1px solid white;
        background: black;
    }
    .d3-tooltip td{
        padding: .5rem 1rem;
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
import * as d3 from 'd3'
import * as d3Legend from 'd3-svg-legend'


export default defineComponent({
    name: "MapData",
    props: {
        geojson: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
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
            selected: null,
        }      
    },
    watch:{
        mode(newVal){
            this.$emit('mode-change', newVal)
        },
		data(){
			this.init()
		}
    },
    computed:{
        mapData(){
            return this.data[this.mode]
        },
        zoom(){
            return d3.zoom()
                .scaleExtent([0.5, 250])
                .translateExtent([[-0.5 * this.width,-0.75 * this.height],[2.5 * this.width, 2.5 * this.height]])
				.on('zoom', this.handleZoom)
        },
    },
	mounted(){
		console.log("Map mounted: initializing")
		if(this.geojson){
			this.init()
		}
	},
    updated(){
		console.log("Map updated: re-initializing")
		this.init()
	},
    methods: {
        init(){
			if(this.geojson.features){
                this.init_variables()
                this.init_legend()
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
            this.width = window.innerWidth * 0.65
            if(window.innerWidth < 800){
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
        init_legend(){
            this.colors = {}
            this.legend = {}
            this.max = d3.max(this.mapData, (d) => d.value) 
            this.colors = d3.scaleLinear()
                .domain([0,1, this.max/3, this.max])
                .range(["#c33", "#488", "#fd0", "#24ff00"])
                .clamp(true)
            this.legend = d3Legend.legendColor()
								.shapeHeight(20)
								.shapeWidth(60)
								.scale(this.colors)
								.labelFormat(d3.format(",.0f"))
								.orient('horizontal')
								.labelOffset(-10)
								.labelAlign("middle")
								.cells(6)
        },
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
			
			this.geojson.features.forEach((polygon) => {
				this.drawPolygon(polygon)
			})
			
			this.svg.append("g")
				.attr("class", "legend")
				.attr("transform", "translate("+this.width*.55+", 25)")
				.call(this.legend)
			this.svg.call(this.zoom)

			this.svg.call(this.zoom.transform, this.zoomTransform)
        },
        drawPolygon(polygon){
			this.polygons.append("g")
				.data([polygon])
				.enter().append("path")
				.attr("d", this.path)
				.attr("id", this.getPolygonId(polygon.properties))
				.attr("fill", (d) => this.color_polygon(polygon.properties))
				.on('mouseover', (d, i) => {
					this.tooltip.html(this.hover_text(polygon.properties))
						.style('visibility', 'visible')
				})
				.on('mousemove', (event, d) => {
					this.tooltip
						.style('top', event.pageY - 10 + 'px')
						.style('left', event.pageX + 10 + 'px')
				})
				.on('mouseout', () => this.tooltip.html(``).style('visibility', 'hidden'))
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
			let op = {
				name: polygon_details.properties[this.mode],
				value: 0,
				mode: this.mode
			}
			let polygon_data = this.mapData.find((d) => d.name == op.name)
			op.value = polygon_data ? polygon_data.value : 0
			
            this.zoomToPolygon(polygon_details)
			this.$emit('polygon-clicked', op)
		},
		zoomToPolygon(polygon_details) {
            let target_polygon = null
            if(this.selected == null || this.selected != polygon_details.properties[this.mode]){
                target_polygon = polygon_details
                this.selected = polygon_details.properties[this.mode]
            } else {
                target_polygon = this.geojson
                this.selected = null
            }
			let [[x0, y0], [x1, y1]] = this.path.bounds(target_polygon)

			this.svg.transition().duration(1500).call(
				this.zoom.transform,
				d3.zoomIdentity
				.translate(this.width / 2, this.height / 2)
				.scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
				.translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
			)
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
            let polygon_data = this.mapData.find((d) => d.name == polygon[this.mode])
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
				.attr("r", text_size)
        },
        hover_text(properties){
            
			let op = ["state", "district"].map((key) => `<tr><td>${this.capitalizeWords(key)}</td><td>${properties[key] ? properties[key]: "-"}</td></tr>`)	
            op.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${this.mapData.find((d) => d.name == properties[this.mode])?.value || 0}</td></tr>`)
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