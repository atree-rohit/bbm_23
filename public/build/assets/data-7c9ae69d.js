import{_ as g,x as D,s as b,z as C,c as r,o as l,b as c,m as w,t as v,d as S,A as $,r as f,k as p,n as m,F as _,j as y,y as O,f as z}from"./_plugin-vue_export-helper-d9524ff1.js";import{z as q,m as k,i as M,s as u,a as B,l as P,c as U,f as T}from"./indexRollupNext-d49db328.js";const A={name:"MapData",props:{geojson:{type:Object,required:!0},data:{type:Object,required:!0},mode:{type:String,required:!0},tooltip_third_row_label:{type:String,default:""}},emits:["mode-change","polygon-clicked"],data(){return{polygons:null,path:null,svg:null,projection:null,colors:null,max:null,height:500,width:500,zoomTransform:0,tooltip:null,selected:null}},watch:{mode(t){this.$emit("mode-change",t)},data(){this.init()}},computed:{mapData(){return this.data[this.mode]},zoom(){return q().scaleExtent([.5,250]).translateExtent([[-.5*this.width,-.75*this.height],[2.5*this.width,2.5*this.height]]).on("zoom",this.handleZoom)},mode_key(){return this.mode.slice(0,-1)}},mounted(){console.log("Map mounted: initializing"),this.geojson&&this.mapData&&this.init()},updated(){console.log("Map updated: re-initializing"),this.init()},methods:{init(){this.mapData&&this.geojson[this.mode].features?(this.init_variables(),this.init_legend(),this.init_svg(),this.render_map()):console.log("No geojson")},init_variables(){this.polygons=null,this.path=null,this.svg={},window.innerWidth<800?(this.width=window.innerWidth*.95,this.height=window.innerHeight*.66,this.projection=k().scale(600).center([110,20])):(this.height=window.innerHeight*.9,this.width=window.innerWidth*.7,this.projection=k().scale(1e3).center([80,27.5])),this.path=M().projection(this.projection),this.tooltip=this.init_tooltip()},init_tooltip(){return u("body .d3-tooltip").empty()||u("body .d3-tooltip").remove(),u("body").append("div").attr("class","d3-tooltip").style("position","absolute").style("top","0").style("z-index","10").style("visibility","hidden").style("padding","10px").style("background","rgba(0,0,0,0.75)").style("border-radius","4px").style("color","#fff").text("a simple tooltip")},init_legend(){this.colors={},this.legend={};let t=this.mapData;this.selected!=null&&(t=this.data.districts),this.max=B(t,e=>e.value),this.colors=P().domain([0,1,this.max/3,this.max]).range(["#c33","#488","#fd0","#24ff00"]).clamp(!0),this.legend=U().shapeHeight(20).shapeWidth(60).scale(this.colors).labelFormat(T(",.0f")).orient("horizontal").labelOffset(-10).labelAlign("middle").cells(6)},init_svg(){u("#map-container svg.svg-content").empty()||u("#map-container svg.svg-content").remove(),this.svg=u("#map-container").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("width",this.width).attr("height",this.height).classed("svg-content",!0),this.zoomTransform||(this.zoomTransform=D(this.svg.node())),this.height>this.width&&this.legend.shapeWidth(35).cells(4)},render_map(){let t=this.svg.append("g").classed("map-boundary",!0).selectAll("path").append("g");this.svg.append("g").classed("map-labels",!0).selectAll("text").append("g"),this.polygons=t.append("g").classed("polygons",!0),this.selected!=null?this.geojson.districts.features.filter(s=>s.properties.state==this.selected).map(s=>this.drawPolygon(s)):this.geojson[this.mode].features.forEach(e=>{this.drawPolygon(e)}),this.svg.append("g").attr("class","legend").attr("transform","translate("+this.width*.55+", 25)").call(this.legend),this.svg.call(this.zoom),this.svg.call(this.zoom.transform,this.zoomTransform)},drawPolygon(t){this.polygons.append("g").data([t]).enter().append("path").attr("d",this.path).attr("id",this.getPolygonId(t.properties)).attr("fill",e=>this.color_polygon(t.properties)).on("mouseover",(e,s)=>{this.tooltip.html(this.hover_text(t.properties)).style("visibility","visible")}).on("mousemove",(e,s)=>{this.tooltip.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(e,s)=>this.clicked(s))},getPolygonId(t){let e=t.region,s=[" ","&","(",")","."];return t.state!=null&&(e=t.state),t.district!=null&&(e=t.district),s.forEach(a=>{e=e.replaceAll(a,"_")}),e},clicked(t){b.dispatch("data/setLoading","Working");let e={name:t.properties[this.mode_key],value:0,mode:this.mode_key},s=this.mapData.find(a=>a.name==e.name);e.value=s?s.value:0,this.zoomToPolygon(t),this.$emit("polygon-clicked",e),setTimeout(()=>b.dispatch("data/setLoading",null),500)},zoomToPolygon(t){let e=null;this.selected==null||this.selected!=t.properties[this.mode_key]?(e=t,this.selected=t.properties[this.mode_key]):(e=this.geojson[this.mode_key],this.selected=null);let[[s,a],[i,o]]=this.path.bounds(e);this.svg.transition().duration(1500).call(this.zoom.transform,C.translate(this.width/2,this.height/2).scale(Math.min(8,.9/Math.max((i-s)/this.width,(o-a)/this.height))).translate(-(s+i)/2,-(a+o)/2))},drawPolygonBoundary(t){this.polygons.append("g").data([t]).enter().append("path").classed("state-boundary",!0).classed("selected-polygon",e=>this.selected.state&&e.properties.state==this.selected.state||this.selected.region&&e.properties.region==this.selected.region).attr("properties",e=>JSON.stringify(e.properties)).attr("d",this.path).attr("id",this.getPolygonId(t.properties))},drawPolygonLabel(t,e){const s=this.regional_data[this.polygon_mode].find(i=>i[this.polygon_key]==e.properties[this.polygon_key]);let a="";s&&(a=this.format_number(s[this.data_mode])),t.append("g").data([e]).enter().append("text").classed("poly_text",!0).attr("x",i=>this.path.centroid(i)[0]).attr("y",i=>this.path.centroid(i)[1]).classed("small-text",!0).attr("text-anchor","middle").text(a).on("mouseover",()=>{this.tooltip.html(this.hover_text(e.properties)).style("visibility","visible")}).on("mousemove",(i,o)=>{this.tooltip.style("top",i.pageY-10+"px").style("left",i.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(i,o)=>this.clicked(o))},color_polygon(t){let e="states";t.district!=null&&(e="districts");let s=e=="states"?"state":"district",a=this.data[e].find(i=>i.name==t[s]);return a?this.colors(a.value):this.colors(0)},handleZoom(t){this.zoomTransform=t.transform;let e=1/t.transform.k*.8;this.svg.selectAll(".poly_text").attr("transform",t.transform).style("font-size",`${e}rem`),this.svg.selectAll("path").attr("transform",t.transform),this.svg.selectAll("circle").attr("transform",t.transform).attr("r",e)},hover_text(t){var s;let e=[];if(t.district!=null)e.push(`<tr><td>District</td><td>${t.district?t.district:"-"}</td></tr>`);else{let a=this.geojson.districts.features.filter(i=>i.properties.state==t.state).length;e.push(`<tr><td>State</td><td>${t.state?t.state:"-"}</td></tr>`),e.push(`<tr><td>Districts</td><td>${a}</td></tr>`)}return e.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${((s=this.data[this.mode].find(a=>a.name==t[this.mode_key]))==null?void 0:s.value)||0}</td></tr>`),`<table border='1' class='d3-tooltip'>${e.join(`
`)}</table>`},format_number(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},capitalizeWords(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}}},L={id:"map"},N=c("div",{id:"map-container"},null,-1),W=[N];function I(t,e,s,a,i,o){return l(),r("div",L,W)}const E=g(A,[["render",I]]);const F={name:"LoadingData",computed:{...w({loading:t=>t.data.loading})}},R={key:0,class:"loading-container"},V=$('<div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="butterfly-container"><div id="butterfly_wrapper"><div class="leftwings"><div class="perspective"><div class="upperwing upperwing_left"></div></div><div class="perspective"><div class="lowerwing lowerwing_left"></div></div></div><div class="rightwings"><div class="perspective"><div class="upperwing upperwing_right"></div></div><div class="perspective"><div class="lowerwing lowerwing_right"></div></div></div></div></div>',5),H={class:"text"};function J(t,e,s,a,i,o){return t.loading?(l(),r("div",R,[V,c("div",H,v(t.loading),1)])):S("",!0)}const Y=g(F,[["render",J]]);const X={name:"MapBBMData",components:{MapData:E,LoadingData:Y},data(){return{mode:"states",selected:{states:null,districts:null}}},computed:{...w({district_coordinators:t=>t.district_coordinators.all_data,map_data:t=>t.data.map_data,geojson:t=>t.data.geojson}),filtered_map_data(){let t=JSON.parse(JSON.stringify(this.map_data));if(this.selected.state!=null){const e=this.geojson.districts.features.filter(s=>s.properties.state===this.selected.state).map(s=>s.properties.district);t.states=t.states.filter(s=>s.name===this.selected.state),t.districts=t.districts.filter(s=>e.includes(s.name))}return this.selected.district!=null&&(t.districts=t.districts.filter(e=>e.name===this.selected.district)),console.log("FMD",t),t}},mounted(){},watch:{},methods:{valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},polygonClick(t){this.selected[t.mode]=this.selected[t.mode]===t.name?null:t.name,this.selected[t.mode==="state"?"district":"state"]=null,this.$emit("state-selected",this.selected)}}},Z={class:"map-container"};function G(t,e,s,a,i,o){const n=f("loading-data"),d=f("map-data");return l(),r("div",Z,[p(n),p(d,{geojson:t.geojson,data:o.filtered_map_data,mode:i.mode,tooltip_third_row_label:"Observations",onModeChange:e[0]||(e[0]=h=>i.mode=h),onPolygonClicked:o.polygonClick},null,8,["geojson","data","mode","onPolygonClicked"])])}const K=g(X,[["render",G]]);const Q={name:"DataTable",props:{headers:{type:Array,required:!0},data:{type:Array,required:!0},total_row:{type:Boolean,required:!1,default:!1},hue:{type:String,required:!1,default:"success"}},data(){return{sort_key:this.headers.filter(t=>t.sortable)[0].name,sort_order:"desc"}},computed:{sorted_data(){let t=[],e=this.data;if(e.length)if(!this.total_row)t=this.sort_data(e);else{let s=e.pop();t=this.sort_data(e),t.push(s)}return t}},methods:{sort_data(t){return t.sort((e,s)=>{let a=e[this.sort_key],i=s[this.sort_key];return this.sort_order==="asc"?a<i?-1:a>i?1:0:a>i?-1:a<i?1:0})},cellText(t,e){let s=t[e.name];return typeof s=="number"&&(s=this.numberWithCommas(s)),s},numberWithCommas(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},headerSortClass(t){let e="";return t.sortable&&(e="sortable",t.name===this.sort_key&&(e+=" sort-"+this.sort_order)),e},headerClick(t){t.sortable&&(this.sort_key=t.name,this.sort_order=this.sort_order==="asc"?"desc":"asc")},totalRowClass(t,e){if(this.total_row&&e===this.sorted_data.length-1)return"total-row";if(Object.values(t).filter(s=>typeof s=="number").reduce((s,a)=>s+a,0)==0)return"empty-row"}}},tt={class:"table-container"},et={class:"table table-sm table-hover"},st=["textContent","onClick"],at=["row_id"],it=["textContent"];function ot(t,e,s,a,i,o){return l(),r("div",tt,[c("table",et,[c("thead",{class:m(`bg-${s.hue} text-light`)},[c("tr",null,[(l(!0),r(_,null,y(s.headers,(n,d)=>(l(),r("th",{key:d,textContent:v(n.label),class:m(o.headerSortClass(n)),onClick:h=>o.headerClick(n)},null,10,st))),128))])],2),c("tbody",{class:m(`table-${s.hue}`)},[(l(!0),r(_,null,y(o.sorted_data,(n,d)=>(l(),r("tr",{row_id:d,class:m(o.totalRowClass(n,d))},[(l(!0),r(_,null,y(s.headers,(h,j)=>(l(),r("td",{key:j,class:m(h==null?void 0:h.class),textContent:v(o.cellText(n,h))},null,10,it))),128))],10,at))),256))],2)])])}const rt=g(Q,[["render",ot],["__scopeId","data-v-bf3432da"]]);const lt={name:"DataComponent",components:{MapBBMData:K,DataTable:rt},data(){return{filters:[{id:1,name:"Portals",active:!1},{id:2,name:"Location",active:!1},{id:3,name:"Taxa",active:!1},{id:4,name:"Date",active:!1},{id:5,name:"Users",active:!0}],table_data:{portals:{headers:[{name:"portal",label:"Portals",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"states",label:"States",sortable:!0},{name:"districts",label:"Districts",sortable:!0}]},taxa:{headers:[{name:"rank",label:"Rank",sortable:!1,class:"nowrap"},{name:"count",label:"Count",sortable:!0},{name:"unique",label:"Unique",sortable:!0}]},state_portals:{headers:[{name:"portal",label:"Portals",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"districts",label:"Districts",sortable:!0}]},districts:{headers:[{name:"district",label:"District",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"taxa",label:"Taxa",sortable:!0},{name:"portals",label:"Portals",sortable:!1}]}},selected:null}},computed:{...w({observations:t=>t.data.observations,taxa:t=>t.data.taxa,geojson:t=>t.data.geojson}),observation_stats(){return Object.keys(this.observations).length===0?{}:{counts:this.observationStats(this.observations.counts),inat:this.observationStats(this.observations.inats),ibp:this.observationStats(this.observations.ibps),ifb:this.observationStats(this.observations.ifbs),total:this.observationStats([].concat(...Object.values(this.observations)))}},portal_stats(){let t=[];for(let[e,s]of Object.entries(this.observation_stats))t.push({portal:e,observations:s.observations,users:s.users,states:s.states,districts:s.districts});return t},taxa_stats(){const t=Object.values(this.observations).flat();return O(this.taxa,s=>s.rank).map(s=>({rank:s[0],count:t.filter(a=>s[1].map(i=>i.id).includes(a[1])).length,unique:this.countUnique(s[1].map(a=>a.name))})).filter(s=>s.count>0)},state_table_data(){let t={portals:[],districts:[]},e={};return Object.keys(this.observations).map(a=>{e[a]=this.observations[a].filter(i=>i[4]===this.selected)}),Object.keys(e).map(a=>{t.portals.push({portal:a,observations:e[a].length,users:this.countUnique(e[a].map(i=>i[2])),districts:this.countUnique(e[a].map(i=>i[3]))})}),t.portals.push({portal:"total",observations:Object.values(e).flat().length,users:this.countUnique(Object.values(e).flat().map(a=>a[2])),districts:this.countUnique(Object.values(e).flat().map(a=>a[3]))}),this.geojson.districts.features.filter(a=>a.properties.state===this.selected).map(a=>a.properties.district).map(a=>{let i={};Object.keys(this.observations).map(o=>{i[o]=this.observations[o].filter(n=>n[3]===a)}),t.districts.push({district:a,observations:Object.values(i).flat().length,users:this.countUnique(Object.values(i).flat().map(o=>o[2])),taxa:this.countUnique(Object.values(i).flat().map(o=>o[1])),portals:Object.entries(i).filter(o=>o[1].length>0).map(o=>o[0]).join(", ").replace("inats","iNat").replace("ibps","IBP").replace("ifbs","IFB")})}),t}},created(){b.dispatch("data/getAllData")},methods:{observationStats(t){return{observations:t.length,users:this.countUnique(t.map(s=>s[2])),states:this.countUnique(t.map(s=>s[4])),districts:this.countUnique(t.map(s=>s[5]))}},getObservationsCount(t){let e=0;return t.map(s=>{Object.keys(this.observations).forEach(a=>{e+=this.observations[a].filter(i=>i[1]==s.id).length})}),e},countUnique(t){return[...new Set(t)].length},async stateSelected(t){this.selected=t.state}}},nt={class:"data-container"},dt={class:"canvas"},ct={class:"map"},ht={class:"tables"},pt={class:"bg-warning text-center py-0"};function ut(t,e,s,a,i,o){const n=f("MapBBMData"),d=f("data-table");return l(),r("div",nt,[c("div",dt,[c("div",ct,[p(n,{onStateSelected:o.stateSelected},null,8,["onStateSelected"])]),c("div",ht,[i.selected?(l(),r(_,{key:1},[c("h1",pt,v(i.selected),1),p(d,{headers:i.table_data.state_portals.headers,data:o.state_table_data.portals,total_row:!0,hue:"success"},null,8,["headers","data"]),p(d,{headers:i.table_data.districts.headers,data:o.state_table_data.districts,total_row:!1,hue:"danger"},null,8,["headers","data"])],64)):(l(),r(_,{key:0},[p(d,{headers:i.table_data.portals.headers,data:o.portal_stats,total_row:!0,hue:"danger"},null,8,["headers","data"]),p(d,{headers:i.table_data.taxa.headers,data:o.taxa_stats,total_row:!1,hue:"primary"},null,8,["headers","data"])],64))])])])}const mt=g(lt,[["render",ut],["__scopeId","data-v-ba6014b0"]]),x=z({});x.component("DataComponent",mt);x.use(b);x.mount("#app");
