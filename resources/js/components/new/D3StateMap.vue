<style>
.switcher-sm .btn {
    font-size: 0.9rem !important;
}
#map {
    display: flex;
    justify-content: space-around;
}
.map-controls {
    display: grid;
    grid-template-rows: 1fr 1fr;
}
.map-controls .switcher {
    display: flex;
    justify-content: center;
    align-items: center;
}
.switcher {
    margin: 0.25rem;
}
.switcher .btn {
    cursor: pointer;
    border-radius: 0 0 0 0;
    border: 1px solid #aaa;
    padding: 0.25rem 1rem;
}
.switcher .btn:first-child {
    border-radius: 1rem 0 0 1rem;
}
.switcher .btn:last-child {
    border-radius: 0 1rem 1rem 0;
}
.switcher .btn.selected {
    background: green;
    color: white;
}
#map #map-stats {
    border: 1px solid pink;
    width: 50%;
    margin: 0 5px;
    max-height: 80vh;
    overflow: scroll;
}
.map-container {
    background-color: hsl(225, 25%, 40%);
    display: flex;
    justify-content: center;
}
.map-boundary path.state-boundary {
    stroke-linejoin: round;
    stroke-width: 0.5;
    stroke: rgba(0, 0, 0, 1);
    fill: none;
}
.map-boundary path:not(.state-boundary) {
    stroke-linejoin: round;
    stroke-width: 0.25;
    stroke: rgba(0, 0, 0, 0.5);
}
.map-boundary path:not(.state-boundary):hover {
    cursor: pointer;
    fill: beige;
}
.map-boundary .current-state {
    stroke: rgba(0, 50, 255, 0.75);
    stroke-width: 0.25px;
    filter: brightness(1.25);
}
.map-boundary .selected-polygon {
    /*fill: #afa;*/
    fill: #ffff55;
    stroke: rgba(255, 50, 0, 0.75);
    stroke-width: 0.5px;
}
.poly_text {
    fill: #545;
    font-size: 0.1rem;
    transition: fill 0.125s;
    text-shadow: 0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white;
}
.poly_text:hover {
    fill: #00c;
    text-shadow: 0px 0px 5px #fff;
    cursor: pointer;
    font-weight: 1000;
}
.map-points circle {
    stroke-width: 0.5px;
    stroke: rgba(0, 0, 0, 0.25);
    fill: transparent;
}
.map-points circle:hover {
    cursor: pointer;
    stroke: rgba(0, 255, 0, 0.5);
}
#svg-container {
    position: relative;
}

.controls-container {
    background: rgba(0, 0, 0, 0.33);
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem 1.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(100, 100, 100, 0.5);
    border-radius: 0.5rem;
    opacity: 0;
    transition: all 450ms;
}

#svg-container:hover .controls-container {
    opacity: 1;
}

#svg-container .controls-container .btn {
    text-transform: capitalize;
}

.small-text {
    font-size: 0.85rem;
}
.legendCells:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border: 1px solid black;
}
.selected-polygon {
    stroke: red !important;
    stroke-width: 1.5px !important;
    z-index: 100;
}
.legendCells .cell text {
    display: flex;
    align-items: center;
}
table {
    border-collapse: collapse;
}
th,
td {
    border: 1px solid white;
}
th {
    white-space: nowrap;
    border: 1px solid #555;
    cursor: pointer;
}
td {
    padding: 0.5rem 1rem;
}
tbody tr:hover td {
    background: #ffa;
}

.d3-tooltip {
    position: absolute;
    top: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    color: #fff;
}
@media screen and (max-width: 800px) {
    .poly_text {
        font-size: 3.5vw;
    }
}
</style>

<template>
    <div class="map-container" :id="mapID">
        <div id="svg-container">
            <div class="controls-container">
                <button
                    class="btn btn-sm"
                    :class="showLabels ? 'btn-success' : 'btn-outline-danger'"
                    @click="showLabels = !showLabels"
                >
                    Labels
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
import {ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import * as d3 from 'd3'
import * as d3Legend from "d3-svg-legend"

const store = useStore();

const props = defineProps({
	data: {
		type: Object,
        required: true,
	},
    state: {
        type: String,
        required: true,
    }
});
const mapID = computed(() => `map_${props.state.toLowerCase().replaceAll(" ", "_").replaceAll("&", "_").replaceAll(",", "_")}`)

const json = computed(() => {
    let state_districts = store.state.maps.districts.features.filter((d) => d.properties.state == props.state)
    if(mapID.value == "map_dadra_nagar_haveli_daman___diu"){
        state_districts = store.state.maps.districts.features.filter((d) => d.properties.state == "Dadra and Nagar Haveli and Daman and Diu")
    }
    return {
        type: "FeatureCollection",
        name: `${props.state}_districts`,
        features: state_districts,
    }
});

const map_modes = ["states", "districts"]
const selected_mode = ref(0)
const selected_map_level = computed(() => map_modes[selected_mode.value])
const showLabels = ref(true);
const polygons = ref(null);
const path = ref(null);
const svg = ref({});
const projection = ref({});
const colors = ref(null);
const legend = ref({});
const height = ref(0);
const width = ref(0);
const tooltip = ref(null);

watch(() => props.data, (newVal, oldVal) => {
	if(Object.keys(oldVal).length ==0) {
		init()
	} else {
		updateMap()
	}
});
watch(() => selected_map_level.value, () => init());
watch(() => showLabels.value, () => init());
onMounted(() => {
	init();
	window.addEventListener('resize', handleResize);
});

const handleResize = () => {
    console.log("Re-run the init function when the page width changes")
    init();
};

const zoom = () => d3.zoom().scaleExtent([1, 50]).on("zoom", handleZoom)

const handleZoom = (event) => {
	svg.value.selectAll(".map-boundary, .polygons")
		.attr('transform', event.transform)
    svg.value.selectAll(".map-labels text")
        .attr("transform", event.transform)
        .attr("font-size", 10 / event.transform.k);
}
const format_number = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const capitalizeWords = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const getMatchingPolygon = (polygon) => {
	return props.data.find((d) => d.name == polygon.district)
}

const color_polygon = (polygon) => colors.value(getMatchingPolygon(polygon)?.value ?? 0)

const init = ()  => {
	init_vars()
	init_tooltip()
	init_colors()
	init_legend()
	init_svg()
	renderMap()
    zoomToFit()
}

const zoomToFit = () => {
    const bounds = path.value.bounds(json.value);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const scale = 0.85 / Math.max(dx / width.value, dy / height.value); // Adjust the scale factor if needed
    const translate = [(width.value - scale * (bounds[1][0] + bounds[0][0])) / 2, (height.value - scale * (bounds[1][1] + bounds[0][1])) / 2];
    svg.value.call(
        zoom().transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    );
};
const init_vars = ()  => {
	polygons.value = null
	path.value = null
	svg.value = {}
	width.value = window.innerWidth * 0.5
	height.value = window.innerHeight * 0.5
	projection.value = d3.geoMercator().scale(550).center([105, 17.5])
	path.value = d3.geoPath().projection(projection.value)
}

const init_tooltip = () => {
	const existingTooltip = d3.select('.d3-tooltip');
    if (!existingTooltip.empty()) {
        tooltip.value = existingTooltip
        return;
    }
	tooltip.value = d3.select('body')
				.append('div')
				.attr('class', 'd3-tooltip')
				.style('visibility', 'hidden')
				.text('a simple tooltip')
}
const init_legend = () => {
	legend.value = d3Legend.legendColor()
					.shapeHeight(20)
					.shapeWidth(45)
					.scale(colors.value)
					.labelFormat(d3.format(",.0f"))
					.orient('horizontal')
					.labelOffset(-10)
					.labelAlign("middle")
					.cells(5)
}

const init_colors = () => {
	const max = Math.max(...props.data.map((d) => d.value))
    colors.value = d3.scaleLinear()
		.domain([0, 1, max * 0.25, max])
		.range(["#f77", "#ca0", "#ada", "#3d3"])
		.clamp(true)
}

const init_svg = () => {
	if (!d3.select(`#${mapID.value} #svg-container svg.svg-content`).empty()) {
		d3.select(`#${mapID.value} #svg-container svg.svg-content`).remove()
	}
	svg.value = d3.select(`#${mapID.value} #svg-container`)
				.append("svg")
					.attr("preserveAspectRatio", "xMinYMin meet")
					.attr("width", width.value)
					.attr("height", height.value)
					.classed("svg-content", true)
}
const renderMap = () => {
	let base = svg.value.append("g")
		.classed("map-boundary", true)
		.selectAll("path").append("g")

	let legendGroup = svg.value.append("g")
        .classed("map-legend", true)
        .attr("transform", "translate(" + (width.value /1.6 ) + ", 25)"); // Adjust the position as needed


	let base_text = svg.value.append("g")
		.classed("map-labels", true)

	polygons.value = base.append("g")
		.classed("polygons", true)

	json.value.features.forEach((polygon) => {
		drawPolygon(polygon)
		drawPolygonLabel(base_text, polygon)
	})

	svg.value.call(zoom())
	legendGroup.call(legend.value);
}

const updateMap = () => {
    init_colors()
	init_legend()

	svg.value.select(".map-legend").call(legend.value);
	updateColors()
	updateLabels()
};

const updateColors = () => {
    const path = svg.value.selectAll("path")
        .data(json.value.features)
	path.transition()
        .duration(350)
        .attr("fill", (d) => color_polygon(d.properties));
};

const updateLabels = () => {
    const base_text = svg.value.select(".map-labels");
    base_text.selectAll("text").remove();

    if (showLabels.value) {
        json.value.features.forEach((polygon) => {
            drawPolygonLabel(base_text, polygon);
        });
		base_text.selectAll("text")
            .transition()
            .duration(1350);
    }
};

const drawPolygon = (polygon) => {
	polygons.value.append("g")
		.data([polygon])
		.enter().append("path")
		.classed("map-polygon", true)
		.attr("d", path.value)
		.attr("fill", (d) => color_polygon(polygon.properties))
		.on('mouseover', (d, i) => {
			tooltip.value.html(hover_text(polygon.properties))
				.style('visibility', 'visible')
		})
		.on('mousemove', (event, d) => {
			tooltip.value
				.style('top', event.pageY - 10 + 'px')
				.style('left', event.pageX + 10 + 'px')
		})
		.on('mouseout', () => tooltip.value.html(``).style('visibility', 'hidden'))
}

const drawPolygonLabel = (base_text, polygon) => {
	if(!showLabels.value) return
	let polygon_data = getMatchingPolygon(polygon.properties)
	let label_text = ""
	const centroid = projection.value(d3.geoCentroid(polygon));
	if(polygon_data){
		label_text = format_number(parseInt(polygon_data.value))
	}


	base_text.append("text")
	.classed("poly_text", true)
        .attr("x", centroid[0])
        .attr("y", centroid[1])
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(label_text)
		.on('mouseover', () => {
			tooltip.value.html(hover_text(polygon.properties))
				.style('visibility', 'visible');
		})
		.on('mousemove', (event, d) => {
			tooltip.value
				.style('top', event.pageY - 10 + 'px')
				.style('left', event.pageX + 10 + 'px')
		})
		.on('mouseout', () => tooltip.value.html(``).style('visibility', 'hidden'))
}

const hover_text = (properties) => {
	let polygon_data = props.data.find((d) => d.name == properties.district) || {
		name: properties.district,
		value: 0
	};
	return `<table><tr><td>${polygon_data.name}</td><td>${polygon_data.value}</td></tr></table>`;
}
</script>
