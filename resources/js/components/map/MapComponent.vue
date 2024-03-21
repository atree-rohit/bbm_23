<style>
.switcher-sm .btn {
    font-size: 0.9rem !important;
}
#map {
    /* display: flex;
		justify-content: space-around; */
}
#map #map-stats {
    border: 1px solid pink;
    width: 50%;
    margin: 0 5px;
    max-height: 80vh;
    overflow: hidden;
}
#map-container {
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
    font-size: 0.85rem;
    transition: fill 0.125s;
    text-shadow: 0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white,
        0px 0px 4px white, 0px 0px 5px white;
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
svg {
    background: hsl(200, 50%, 75%);
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
.d3-tooltip table,
.d3-tooltip tr,
.d3-tooltip td {
    font-size: 0.85rem;
    border: 1px solid white;
    background: black;
}
.d3-tooltip td {
    padding: 0.5rem 1rem;
}
</style>

<template>
    <div class="map-component">
        <div id="map">
            <div id="map-container"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import * as d3 from "d3";
import * as d3Legend from "d3-svg-legend";

const props = defineProps({
    geojson: {
        type: Object,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    tooltip_third_row_label: {
        type: String,
        default: "",
    },
});

const emits = defineEmits(["mode-change", "polygon-clicked"]);

const polygons = ref(null);
const path = ref(null);
const svg = ref({});
const projection = ref(null);
const colors = ref({});
const legend = ref({});
const height = ref(0);
const width = ref(0);
const zoomTransform = ref(null);
const tooltip = ref({});

const mapData = computed(() => props.data[props.mode]);
const zoom = computed(() =>
    d3
        .zoom()
        .scaleExtent([0.5, 250])
        .translateExtent([
            [-0.5 * width.value, -0.75 * height.value],
            [2.5 * width.value, 2.5 * height.value],
        ])
        .on("zoom", handleZoom)
);
const mode_key = computed(() => props.mode.slice(0, -1));

const init = () => {
    console.log("init");
    if (props.geojson.features) {
        init_variables();
        init_tooltip();
        init_legend();
        init_svg();
        render_map();
        zoomToContent();
    } else {
        console.log("No geojson", props);
    }
};

const init_variables = () => {
    polygons.value = null;
    path.value = null;
    svg.value = {};
    if (window.innerWidth < 800) {
        width.value = window.innerWidth;
        height.value = window.innerHeight * 0.6;
        projection.value = d3.geoMercator().scale(600).center([110, 20]);
    } else {
        width.value = window.innerWidth * 0.5;
        height.value = window.innerHeight * 0.8;
        projection.value = d3.geoMercator().scale(1000).center([80, 27.5]);
    }
    path.value = d3.geoPath().projection(projection.value);
};

const init_tooltip = () => {
    if (!d3.select("body .d3-tooltip").empty()) {
        d3.select("body .d3-tooltip").remove();
    }

    tooltip.value = d3
        .select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("top", "0")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background", "rgba(0,0,0,0.75)")
        .style("border-radius", "4px")
        .style("color", "#fff")
        .text("a simple tooltip");
};

const init_legend = () => {
    colors.value = {};
    legend.value = {};
    const max = d3.max(mapData.value, (d) => d.value);
    colors.value = d3
        .scaleLinear()
        .domain([0, 1, max / 3, max])
        .range(["#c33", "#488", "#fd0", "#24ff00"])
        .clamp(true);
    legend.value = d3Legend
        .legendColor()
        .shapeHeight(20)
        .shapeWidth(60)
        .scale(colors.value)
        .labelFormat(d3.format(",.0f"))
        .orient("horizontal")
        .labelOffset(-10)
        .labelAlign("middle")
        .cells(6);
};

const init_svg = () => {
    if (!d3.select("#map-container svg.svg-content").empty()) {
        d3.select("#map-container svg.svg-content").remove();
    }
    svg.value = d3
        .select("#map-container")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("width", width.value)
        .attr("height", height.value)
        .classed("svg-content", true);
    if (!zoomTransform.value) {
        zoomTransform.value = d3.zoomTransform(svg.value.node());
    }

    if (height.value > width.value) {
        legend.value?.shapeWidth(35).cells(4);
    }
};

const render_map = () => {
    let base = svg.value
        .append("g")
        .classed("map-boundary", true)
        .selectAll("path")
        .append("g");
    let base_text = svg.value
        .append("g")
        .classed("map-labels", true)
        .selectAll("text")
        .append("g");
    polygons.value = base.append("g").classed("polygons", true);

    props.geojson.features.forEach((polygon) => {
        drawPolygon(polygon);
    });

    svg.value
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + width.value * 0.55 + ", 25)")
        .call(legend.value);
    svg.value.call(zoom.value);

    svg.value.call(zoom.value.transform, zoomTransform.value);
};

const drawPolygon = (polygon) => {
    const polygonGroup = polygons.value
        .append("g")
        .data([polygon])
        .enter()
        .append("path")
        .attr("d", path.value)
        .attr("id", getPolygonId(polygon.properties))
        .attr("fill", (d) => color_polygon(polygon.properties));

    setupMouseEvents(polygonGroup, polygon.properties);
};

const setupMouseEvents = (polygonGroup, properties) => {
    polygonGroup
        .on("mouseover", (d, i) => {
            tooltip.value
                .html(hover_text(properties))
                .style("visibility", "visible");
        })
        .on("mousemove", (event, d) => {
            tooltip.value
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", () =>
            tooltip.value.html(``).style("visibility", "hidden")
        )
        .on("click", (d) => clicked(properties));
};

const getPolygonId = (polygon) => {
    let op = polygon.region;
    let replace_chars = [" ", "&", "(", ")", "."];
    if (polygon.state != undefined) {
        op = polygon.state;
    }
    if (polygon.district != undefined) {
        op = polygon.district;
    }
    replace_chars.forEach((c) => {
        op = op.replaceAll(c, "_");
    });
    return op;
};

const clicked = (polygon_details) => {
    let op = {
        name: polygon_details[mode_key.value],
        value: 0,
        mode: props.mode,
    };

    if (props.mode == "districts") {
        op.state = polygon_details.state;
    }
    let polygon_data = mapData.value.find((d) => d.name == op.name);
    op.value = polygon_data ? polygon_data.value : 0;
    emits("polygon-clicked", op);
};

const color_polygon = (polygon) => {
    let polygon_data = mapData.value.find(
        (d) => d.name == polygon[mode_key.value]
    );
    if (polygon_data) {
        return colors.value(polygon_data.value);
    }
    return colors.value(0);
};

const handleZoom = (e) => {
    zoomTransform.value = e.transform;
    let text_size = (1 / e.transform.k) * 0.8;
    svg.value
        .selectAll(".poly_text")
        .attr("transform", e.transform)
        .style("font-size", `${text_size}rem`);
    svg.value.selectAll("path").attr("transform", e.transform);
    svg.value
        .selectAll("circle")
        .attr("transform", e.transform)
        .attr("r", text_size);
};

const hover_text = (properties) => {
    let op = ["state", "district"].map(
        (key) =>
            `<tr><td>${capitalizeWords(key)}</td><td>${
                properties[key] ? properties[key] : "-"
            }</td></tr>`
    );
    op.push(
        `<tr><td>${props.tooltip_third_row_label}</td><td>${
            mapData.value.find((d) => d.name == properties[mode_key.value])
                ?.value || 0
        }</td></tr>`
    );
    return `<table border='1' class='d3-tooltip'>${op.join("\n")}</table>`;
};

const capitalizeWords = (str: String) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const zoomToContent = () => {
    // Calculate the bounding box of all features
    const bounds = path.value.bounds(props.geojson);

    // Calculate the scale factor to fit the map to the screen
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const scale = Math.max(
        1,
        Math.min(250, 0.9 / Math.max(dx / width.value, dy / height.value))
    );

    // Calculate the translation to center the map
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const translate = [
        width.value / 2 - scale * x,
        height.value / 2 - scale * y,
    ];

    // Apply zoom transformation to the SVG
    svg.value
        .transition()
        .duration(750)
        .call(
            zoom.value.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
};
watch(
    () => props.mode,
    (nVal) => emits("mode-change", nVal)
);
watch([() => props.data, () => props.geojson], () => init());
</script>
