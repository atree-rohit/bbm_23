import{_ as v,A as D,s as _,C as $,c as d,o as l,b as n,m as k,l as g,q as y,x as S,d as O,t as p,F as b,r as f,n as u,B,u as j,f as z}from"./_plugin-vue_export-helper-defcdde3.js";import{z as q,m as C,i as M,s as m,a as U,l as P,c as T,f as A}from"./indexRollupNext-9fa72974.js";import{B as F}from"./ButterflyAnimation-d9490281.js";const L={name:"MapData",props:{geojson:{type:Object,required:!0},data:{type:Object,required:!0},mode:{type:String,required:!0},tooltip_third_row_label:{type:String,default:""}},emits:["mode-change","polygon-clicked"],data(){return{polygons:null,path:null,svg:null,projection:null,colors:null,max:null,height:500,width:500,zoomTransform:0,tooltip:null,selected:null}},watch:{mode(t){this.$emit("mode-change",t)},data(){this.init()}},computed:{mapData(){return this.data[this.mode]},zoom(){return q().scaleExtent([.5,250]).translateExtent([[-.5*this.width,-.75*this.height],[2.5*this.width,2.5*this.height]]).on("zoom",this.handleZoom)},mode_key(){return this.mode.slice(0,-1)}},mounted(){console.log("Map mounted: initializing"),this.geojson&&this.mapData&&this.init()},updated(){console.log("Map updated: re-initializing"),this.init()},methods:{init(){this.mapData&&this.geojson[this.mode].features?(this.init_variables(),this.init_legend(),this.init_svg(),this.render_map()):console.log("No geojson")},init_variables(){this.polygons=null,this.path=null,this.svg={},window.innerWidth<800?(this.width=window.innerWidth*.95,this.height=window.innerHeight*.45,this.projection=C().scale(550).center([112.5,17.5])):(this.height=window.innerHeight*.9,this.width=window.innerWidth*.55,this.projection=C().scale(1e3).center([95,27.5])),this.path=M().projection(this.projection),this.tooltip=this.init_tooltip()},init_tooltip(){return m("body .d3-tooltip").empty()||m("body .d3-tooltip").remove(),m("body").append("div").attr("class","d3-tooltip").style("position","absolute").style("top","0").style("z-index","10").style("visibility","hidden").style("padding","10px").style("background","rgba(0,0,0,0.75)").style("border-radius","4px").style("color","#fff").text("a simple tooltip")},init_legend(){this.colors={},this.legend={};let t=this.mapData;this.selected!=null&&(t=this.data.districts),this.max=U(t,e=>e.value),this.colors=P().domain([0,1,this.max/3,this.max]).range(["#c33","#488","#fd0","#24ff00"]).clamp(!0),this.legend=T().shapeHeight(20).shapeWidth(60).scale(this.colors).labelFormat(A(",.0f")).orient("horizontal").labelOffset(-10).labelAlign("middle").cells(6)},init_svg(){m("#map-container svg.svg-content").empty()||m("#map-container svg.svg-content").remove(),this.svg=m("#map-container").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("width",this.width).attr("height",this.height).classed("svg-content",!0),this.zoomTransform||(this.zoomTransform=D(this.svg.node())),this.height>this.width&&this.legend.shapeWidth(35).cells(4)},render_map(){let t=this.svg.append("g").classed("map-boundary",!0).selectAll("path").append("g");this.svg.append("g").classed("map-labels",!0).selectAll("text").append("g"),this.polygons=t.append("g").classed("polygons",!0),this.selected!=null?this.geojson.districts.features.filter(s=>s.properties.state==this.selected).map(s=>this.drawPolygon(s)):this.geojson[this.mode].features.forEach(e=>{this.drawPolygon(e)}),this.svg.append("g").attr("class","legend").attr("transform","translate("+this.width*.55+", 25)").call(this.legend),this.svg.call(this.zoom),this.svg.call(this.zoom.transform,this.zoomTransform)},drawPolygon(t){this.polygons.append("g").data([t]).enter().append("path").attr("d",this.path).attr("id",this.getPolygonId(t.properties)).attr("fill",e=>this.color_polygon(t.properties)).on("mouseover",(e,s)=>{this.tooltip.html(this.hover_text(t.properties)).style("visibility","visible")}).on("mousemove",(e,s)=>{this.tooltip.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(e,s)=>this.clicked(s))},getPolygonId(t){let e=t.region,s=[" ","&","(",")","."];return t.state!=null&&(e=t.state),t.district!=null&&(e=t.district),s.forEach(i=>{e=e.replaceAll(i,"_")}),e},clicked(t){_.dispatch("data/setLoading","Working");let e={name:t.properties[this.mode_key],value:0,mode:this.mode_key},s=this.mapData.find(i=>i.name==e.name);e.value=s?s.value:0,this.zoomToPolygon(t),this.$emit("polygon-clicked",e),setTimeout(()=>_.dispatch("data/setLoading",null),500)},zoomToPolygon(t){let e=null;this.selected==null||this.selected!=t.properties[this.mode_key]?(e=t,this.selected=t.properties[this.mode_key]):(e=this.geojson[this.mode_key],this.selected=null);let[[s,i],[a,o]]=this.path.bounds(e);this.svg.transition().duration(1500).call(this.zoom.transform,$.translate(this.width/2,this.height/2).scale(Math.min(8,.9/Math.max((a-s)/this.width,(o-i)/this.height))).translate(-(s+a)/2,-(i+o)/2))},drawPolygonBoundary(t){this.polygons.append("g").data([t]).enter().append("path").classed("state-boundary",!0).classed("selected-polygon",e=>this.selected.state&&e.properties.state==this.selected.state||this.selected.region&&e.properties.region==this.selected.region).attr("properties",e=>JSON.stringify(e.properties)).attr("d",this.path).attr("id",this.getPolygonId(t.properties))},drawPolygonLabel(t,e){const s=this.regional_data[this.polygon_mode].find(a=>a[this.polygon_key]==e.properties[this.polygon_key]);let i="";s&&(i=this.format_number(s[this.data_mode])),t.append("g").data([e]).enter().append("text").classed("poly_text",!0).attr("x",a=>this.path.centroid(a)[0]).attr("y",a=>this.path.centroid(a)[1]).classed("small-text",!0).attr("text-anchor","middle").text(i).on("mouseover",()=>{this.tooltip.html(this.hover_text(e.properties)).style("visibility","visible")}).on("mousemove",(a,o)=>{this.tooltip.style("top",a.pageY-10+"px").style("left",a.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(a,o)=>this.clicked(o))},color_polygon(t){let e="states";t.district!=null&&(e="districts");let s=e=="states"?"state":"district",i=this.data[e].find(a=>a.name==t[s]);return i?this.colors(i.value):this.colors(0)},handleZoom(t){this.zoomTransform=t.transform;let e=1/t.transform.k*.8;this.svg.selectAll(".poly_text").attr("transform",t.transform).style("font-size",`${e}rem`),this.svg.selectAll("path").attr("transform",t.transform),this.svg.selectAll("circle").attr("transform",t.transform).attr("r",e)},hover_text(t){var s,i;let e=[];if(t.district!=null)e.push(`<tr><td>District</td><td>${t.district?t.district:"-"}</td></tr>`),e.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${((s=this.data.districts.find(a=>a.name==t.district))==null?void 0:s.value)||0}</td></tr>`);else{let a=this.geojson.districts.features.filter(o=>o.properties.state==t.state).length;e.push(`<tr><td>State</td><td>${t.state?t.state:"-"}</td></tr>`),e.push(`<tr><td>Districts</td><td>${a}</td></tr>`),e.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${((i=this.data.states.find(o=>o.name==t.state))==null?void 0:i.value)||0}</td></tr>`)}return`<table border='1' class='d3-tooltip'>${e.join(`
`)}</table>`},format_number(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},capitalizeWords(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}}},N={id:"map"},W=n("div",{id:"map-container"},null,-1),I=[W];function E(t,e,s,i,a,o){return l(),d("div",N,I)}const Y=v(L,[["render",E]]);const R={name:"LoadingData",components:{ButterflyAnimation:F},computed:{...k({loading:t=>t.data.loading})}},H={key:0,class:"loading-container"},J=n("div",{class:"circle"},null,-1),V=n("div",{class:"circle"},null,-1),X=n("div",{class:"circle"},null,-1),Z=n("div",{class:"circle"},null,-1),G={class:"loading-text"};function K(t,e,s,i,a,o){const c=g("ButterflyAnimation");return t.loading?(l(),d("div",H,[J,V,X,Z,y(c,null,{default:S(()=>[n("div",G,p(t.loading),1)]),_:1})])):O("",!0)}const Q=v(R,[["render",K]]);const tt={name:"MapBBMData",components:{MapData:Y,LoadingData:Q},data(){return{mode:"states",years:[2020,2021,2022,2023],selected_year:2023,selected:{states:null,districts:null}}},computed:{...k({district_coordinators:t=>t.district_coordinators.all_data,map_data:t=>t.data.map_data,geojson:t=>t.data.geojson}),filtered_map_data(){let t=JSON.parse(JSON.stringify(this.map_data));if(this.selected.state!=null){const e=this.geojson.districts.features.filter(s=>s.properties.state===this.selected.state).map(s=>s.properties.district);t.states=t.states.filter(s=>s.name===this.selected.state),t.districts=t.districts.filter(s=>e.includes(s.name))}return this.selected.district!=null&&(t.districts=t.districts.filter(e=>e.name===this.selected.district)),console.log("FMD",t),t}},mounted(){},watch:{map_data(t){console.log(t)}},methods:{valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},polygonClick(t){this.selected[t.mode]=this.selected[t.mode]===t.name?null:t.name,this.selected[t.mode==="state"?"district":"state"]=null,this.$emit("state-selected",this.selected)},selectYear(t){this.selected_year==t?this.selected_year=null:this.selected_year=t,_.dispatch("data/setFilter",{field:"year",value:this.selected_year})}}},et={class:"map-container"},st={class:"border border-danger d-flex justify-content-center py-1"},at=["onClick","textContent"];function it(t,e,s,i,a,o){const c=g("loading-data"),h=g("map-data");return l(),d("div",et,[n("div",st,[(l(!0),d(b,null,f(a.years,r=>(l(),d("button",{class:u(["btn btn-sm mx-1",{"btn-success":r===a.selected_year||a.selected_year==null,"btn-outline-light":r!==a.selected_year}]),key:r,onClick:x=>o.selectYear(r),textContent:p(r)},null,10,at))),128))]),y(c),y(h,{geojson:t.geojson,data:o.filtered_map_data,mode:a.mode,tooltip_third_row_label:"Observations",onModeChange:e[0]||(e[0]=r=>a.mode=r),onPolygonClicked:o.polygonClick},null,8,["geojson","data","mode","onPolygonClicked"])])}const ot=v(tt,[["render",it]]);const rt={name:"DataTable",props:{headers:{type:Array,required:!0},data:{type:Array,required:!0},total_row:{type:Boolean,required:!1,default:!1},hue:{type:String,required:!1,default:"success"}},data(){return{sort_key:this.headers.filter(t=>t.sortable)[0].name,sort_order:"desc"}},computed:{sorted_data(){let t=[],e=this.data;if(e.length)if(!this.total_row)t=this.sort_data(e);else{let s=e.pop();t=this.sort_data(e),t.push(s)}return t}},methods:{sort_data(t){return t.sort((e,s)=>{let i=e[this.sort_key],a=s[this.sort_key];return this.sort_order==="asc"?i<a?-1:i>a?1:0:i>a?-1:i<a?1:0})},cellText(t,e){let s=t[e.name];return typeof s=="number"&&(s=this.numberWithCommas(s)),s},numberWithCommas(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},headerSortClass(t){let e="";return t.sortable&&(e="sortable",t.name===this.sort_key&&(e+=" sort-"+this.sort_order)),e},headerClick(t){t.sortable&&(this.sort_key=t.name,this.sort_order=this.sort_order==="asc"?"desc":"asc")},totalRowClass(t,e){if(this.total_row&&e===this.sorted_data.length-1)return"total-row";if(Object.values(t).filter(s=>typeof s=="number").reduce((s,i)=>s+i,0)==0)return"empty-row"}}},lt={class:"table-container"},nt={class:"table table-sm table-hover"},dt=["textContent","onClick"],ct=["row_id"],ht=["textContent"];function ut(t,e,s,i,a,o){return l(),d("div",lt,[n("table",nt,[n("thead",{class:u(`bg-${s.hue} text-light`)},[n("tr",null,[(l(!0),d(b,null,f(s.headers,(c,h)=>(l(),d("th",{key:h,textContent:p(c.label),class:u(o.headerSortClass(c)),onClick:r=>o.headerClick(c)},null,10,dt))),128))])],2),n("tbody",{class:u(`table-${s.hue}`)},[(l(!0),d(b,null,f(o.sorted_data,(c,h)=>(l(),d("tr",{key:h,row_id:h,class:u(o.totalRowClass(c,h))},[(l(!0),d(b,null,f(s.headers,(r,x)=>(l(),d("td",{key:x,class:u(r==null?void 0:r.class),textContent:p(o.cellText(c,r))},null,10,ht))),128))],10,ct))),128))],2)])])}const pt=v(rt,[["render",ut],["__scopeId","data-v-66922171"]]);const mt={name:"DataComponent",components:{MapBBMData:ot,DataTable:pt},data(){return{filters:[{id:1,name:"Portals",active:!0,disabled:!1},{id:2,name:"Location",active:!1,disabled:!0},{id:3,name:"Taxa",active:!1,disabled:!1},{id:4,name:"Date",active:!1,disabled:!0},{id:5,name:"Users",active:!1,disabled:!0}],table_data:{portals:{headers:[{name:"portal",label:"Portals",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"states",label:"States",sortable:!0},{name:"districts",label:"Districts",sortable:!0}]},taxa:{headers:[{name:"common_name",label:"Name",sortable:!0,class:"nowrap"},{name:"scientific_name",label:"Scientific Name",sortable:!0,class:"nowrap"},{name:"rank",label:"Rank",sortable:!0,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"states",label:"States",sortable:!0},{name:"districts",label:"Districts",sortable:!0}]},state_portals:{headers:[{name:"portal",label:"Portals",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"districts",label:"Districts",sortable:!0}]},districts:{headers:[{name:"district",label:"District",sortable:!1,class:"nowrap"},{name:"observations",label:"Observations",sortable:!0},{name:"users",label:"Users",sortable:!0},{name:"taxa",label:"Taxa",sortable:!0},{name:"portals",label:"Portals",sortable:!1}]}},selected:null}},computed:{...k({filtered_observations:t=>t.data.filtered_observations,observations:t=>t.data.observations,taxa:t=>t.data.taxa,geojson:t=>t.data.geojson}),active_filter(){return this.filters.filter(t=>t.active)[0]},observation_stats(){return Object.keys(this.filtered_observations).length===0?{}:{counts:this.observationStats(this.filtered_observations.counts),inat:this.observationStats(this.filtered_observations.inats),ibp:this.observationStats(this.filtered_observations.ibps),ifb:this.observationStats(this.filtered_observations.ifbs),total:this.observationStats([].concat(...Object.values(this.filtered_observations)))}},portal_stats(){let t=[];console.log(this.observation_stats);for(let[e,s]of Object.entries(this.observation_stats))t.push({portal:e,observations:s.observations,users:s.users,states:s.states,districts:s.districts});return t},taxa_stats(){const t=Object.values(this.filtered_observations).flat();return B(t,s=>s[1]).map(s=>{let i=this.taxa.find(a=>a.id===s[0]);return i?{common_name:i.common_name,scientific_name:i.name,rank:i.rank,observations:s[1].length,users:this.countUnique(s[1].map(a=>a[0])),states:this.countUnique(s[1].map(a=>a[4])),districts:this.countUnique(s[1].map(a=>a[3]))}:{}}).sort((s,i)=>i.observations-s.observations)},state_table_data(){let t={portals:[],districts:[]},e={};return Object.keys(this.filtered_observations).map(i=>{e[i]=this.filtered_observations[i].filter(a=>a[4]===this.selected)}),Object.keys(e).map(i=>{t.portals.push({portal:i,observations:e[i].length,users:this.countUnique(e[i].map(a=>a[2])),districts:this.countUnique(e[i].map(a=>a[3]))})}),t.portals.push({portal:"total",observations:Object.values(e).flat().length,users:this.countUnique(Object.values(e).flat().map(i=>i[2])),districts:this.countUnique(Object.values(e).flat().map(i=>i[3]))}),this.geojson.districts.features.filter(i=>i.properties.state===this.selected).map(i=>i.properties.district).map(i=>{let a={};Object.keys(this.filtered_observations).map(o=>{a[o]=this.filtered_observations[o].filter(c=>c[3]===i)}),t.districts.push({district:i,observations:Object.values(a).flat().length,users:this.countUnique(Object.values(a).flat().map(o=>o[2])),taxa:this.countUnique(Object.values(a).flat().map(o=>o[1])),portals:Object.entries(a).filter(o=>o[1].length>0).map(o=>o[0]).join(", ").replace("inats","iNat").replace("ibps","IBP").replace("ifbs","IFB")})}),t}},created(){_.dispatch("data/getAllData"),console.log(this.observations)},methods:{observationStats(t){return{observations:t.length,users:this.countUnique(t.map(s=>s[0])),states:this.countUnique(t.map(s=>s[4])),districts:this.countUnique(t.map(s=>s[3]))}},getObservationsCount(t){let e=0;return t.map(s=>{Object.keys(this.filtered_observations).forEach(i=>{e+=this.filtered_observations[i].filter(a=>a[1]==s.id).length})}),e},countUnique(t){return[...new Set(t)].length},selectFilterTab(t){this.filters.map(e=>{e.active=!1}),t.active=!0},async stateSelected(t){this.selected=t.state,_.dispatch("data/setFilter",{field:"state",value:this.selected})}}},_t={class:"data-container"},bt={class:"canvas"},ft={class:"map"},gt={class:"tables-container"},vt={class:"nav nav-pills bg-light justify-content-center rounded"},yt=["textContent","onClick"],xt={class:"tables"},kt={class:"bg-warning text-center py-0"},wt={key:2};function jt(t,e,s,i,a,o){const c=g("MapBBMData"),h=g("data-table");return l(),d("div",_t,[n("div",bt,[n("div",ft,[y(c,{onStateSelected:o.stateSelected},null,8,["onStateSelected"])]),n("div",gt,[n("ul",vt,[(l(!0),d(b,null,f(a.filters,r=>(l(),d("li",{class:"nav-item",key:r.id},[n("a",{class:u(["nav-link",{active:r.active,disabled:r.disabled}]),"aria-current":"page",href:"#",textContent:p(r.name),onClick:x=>o.selectFilterTab(r)},null,10,yt)]))),128))]),n("div",xt,[n("h1",kt,p(a.selected),1),o.active_filter.name=="Taxa"?(l(),j(h,{key:0,headers:a.table_data.taxa.headers,data:o.taxa_stats,total_row:!1,hue:"info"},null,8,["headers","data"])):o.active_filter.name=="Portals"?(l(),j(h,{key:1,headers:a.table_data.portals.headers,data:o.portal_stats,total_row:!0,hue:"danger"},null,8,["headers","data"])):(l(),d("div",wt,p(o.active_filter),1))])])])])}const Ct=v(mt,[["render",jt],["__scopeId","data-v-a7597ed7"]]),w=z({});w.component("DataComponent",Ct);w.use(_);w.mount("#app");