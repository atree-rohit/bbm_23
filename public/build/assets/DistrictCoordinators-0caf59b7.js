import{g as L,y as u,z as $,A as S,B as K,c as _,C as Q,D as tt,o as g,b as i,m as et,_ as st,r as at,j as ot,t as h,F as z,l as D,h as nt,d as E,n as lt,p as it,k as rt}from"./_plugin-vue_export-helper-2bfc9827.js";import{m as F,i as dt,s as y,z as ct}from"./viridis-6b76cdf6.js";import{m as ut,l as pt,c as mt,f as vt}from"./indexRollupNext-c95ac0ff.js";const ht={class:"map-component"},_t=i("div",{id:"map"},[i("div",{id:"map-container"})],-1),gt=[_t],ft=L({__name:"MapComponent",props:{geojson:{type:Object,required:!0},data:{type:Object,required:!0},mode:{type:String,required:!0},tooltip_third_row_label:{type:String,default:""}},emits:["mode-change","polygon-clicked"],setup(e,{emit:o}){const s=e,r=u(null),f=u(null),c=u({}),b=u(null),n=u({}),v=u({}),p=u(0),m=u(0),C=u(null),x=u({}),j=$(()=>s.data[s.mode]),k=$(()=>ct().scaleExtent([.5,250]).translateExtent([[-.5*m.value,-.75*p.value],[2.5*m.value,2.5*p.value]]).on("zoom",T)),w=$(()=>s.mode.slice(0,-1)),M=()=>{console.log("init"),s.geojson.features?(W(),I(),B(),P(),V(),U()):console.log("No geojson",s)},W=()=>{r.value=null,f.value=null,c.value={},window.innerWidth<800?(m.value=window.innerWidth,p.value=window.innerHeight*.6,b.value=F().scale(600).center([110,20])):(m.value=window.innerWidth*.5,p.value=window.innerHeight*.8,b.value=F().scale(1e3).center([80,27.5])),f.value=dt().projection(b.value)},I=()=>{y("body .d3-tooltip").empty()||y("body .d3-tooltip").remove(),x.value=y("body").append("div").attr("class","d3-tooltip").style("position","absolute").style("top","0").style("z-index","10").style("visibility","hidden").style("padding","10px").style("background","rgba(0,0,0,0.75)").style("border-radius","4px").style("color","#fff").text("a simple tooltip")},B=()=>{n.value={},v.value={};const t=ut(j.value,a=>a.value);n.value=pt().domain([0,1,t/3,t]).range(["#c33","#488","#fd0","#24ff00"]).clamp(!0),v.value=mt().shapeHeight(20).shapeWidth(60).scale(n.value).labelFormat(vt(",.0f")).orient("horizontal").labelOffset(-10).labelAlign("middle").cells(6)},P=()=>{var t;y("#map-container svg.svg-content").empty()||y("#map-container svg.svg-content").remove(),c.value=y("#map-container").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("width",m.value).attr("height",p.value).classed("svg-content",!0),C.value||(C.value=Q(c.value.node())),p.value>m.value&&((t=v.value)==null||t.shapeWidth(35).cells(4))},V=()=>{let t=c.value.append("g").classed("map-boundary",!0).selectAll("path").append("g");c.value.append("g").classed("map-labels",!0).selectAll("text").append("g"),r.value=t.append("g").classed("polygons",!0),s.geojson.features.forEach(a=>{q(a)}),c.value.append("g").attr("class","legend").attr("transform","translate("+m.value*.55+", 25)").call(v.value),c.value.call(k.value),c.value.call(k.value.transform,C.value)},q=t=>{const a=r.value.append("g").data([t]).enter().append("path").attr("d",f.value).attr("id",H(t.properties)).attr("fill",l=>R(t.properties));G(a,t.properties)},G=(t,a)=>{t.on("mouseover",(l,d)=>{x.value.html(J(a)).style("visibility","visible")}).on("mousemove",(l,d)=>{x.value.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",()=>x.value.html("").style("visibility","hidden")).on("click",l=>O(a))},H=t=>{let a=t.region,l=[" ","&","(",")","."];return t.state!=null&&(a=t.state),t.district!=null&&(a=t.district),l.forEach(d=>{a=a.replaceAll(d,"_")}),a},O=t=>{let a={name:t[w.value],value:0,mode:s.mode};s.mode=="districts"&&(a.state=t.state);let l=j.value.find(d=>d.name==a.name);a.value=l?l.value:0,o("polygon-clicked",a)},R=t=>{let a=j.value.find(l=>l.name==t[w.value]);return a?n.value(a.value):n.value(0)},T=t=>{C.value=t.transform;let a=1/t.transform.k*.8;c.value.selectAll(".poly_text").attr("transform",t.transform).style("font-size",`${a}rem`),c.value.selectAll("path").attr("transform",t.transform),c.value.selectAll("circle").attr("transform",t.transform).attr("r",a)},J=t=>{var l;let a=["state","district"].map(d=>`<tr><td>${Y(d)}</td><td>${t[d]?t[d]:"-"}</td></tr>`);return a.push(`<tr><td>${s.tooltip_third_row_label}</td><td>${((l=j.value.find(d=>d.name==t[w.value]))==null?void 0:l.value)||0}</td></tr>`),`<table border='1' class='d3-tooltip'>${a.join(`
`)}</table>`},Y=t=>t?t.charAt(0).toUpperCase()+t.slice(1):"",U=()=>{const t=f.value.bounds(s.geojson),a=t[1][0]-t[0][0],l=t[1][1]-t[0][1],d=Math.max(1,Math.min(250,.9/Math.max(a/m.value,l/p.value))),X=(t[0][0]+t[1][0])/2,Z=(t[0][1]+t[1][1])/2,A=[m.value/2-d*X,p.value/2-d*Z];c.value.transition().duration(750).call(k.value.transform,tt.translate(A[0],A[1]).scale(d))};return S(()=>s.mode,t=>o("mode-change",t)),S([()=>s.data,()=>s.geojson],()=>M()),K(()=>M()),(t,a)=>(g(),_("div",ht,gt))}});const yt=L({name:"MapDistrictCoordinator",components:{MapComponent:ft},emits:["polygon-clicked"],data(){return{mode:"states",selected_state:""}},computed:{...et({district_coordinators:e=>e.district_coordinators.all_data,geojson:e=>e.data.geojson}),mapGeoJson(){if(console.log(this.geojson),this.selected_state=="")return this.geojson[this.mode];{const{features:e,...o}=this.geojson.districts,s=e.filter(r=>r.properties.state==this.selected_state);return o.features=s,o}},map_data(){let e={};if(this.geojson.states.features){let o={states:this.geojson.states.features.map(s=>s.properties.state),districts:this.geojson.districts.features.map(s=>({district:s.properties.district,state:s.properties.state}))};e={states:o.states.map(s=>({name:s,value:0})),districts:o.districts.map(s=>({name:s.district,state:s.state,value:0}))},this.selected_state!=""&&(e.districts=e.districts.filter(s=>s.state==this.selected_state)),this.district_coordinators.forEach(s=>{e.states.find((r,f)=>s.state==this.valueFromLabel(r.name)).value+=1,e.districts.forEach(r=>{s.district==this.valueFromLabel(r.name)&&(r.value+=1)})}),e.states.sort((s,r)=>r.value-s.value),e.districts.sort((s,r)=>r.value-s.value)}return e}},mounted(){},methods:{getStateName(e){var o;return e==-1||this.geojson.states.features==null?"":(o=this.geojson.states.features.find(s=>this.valueFromLabel(s.properties.state)==e))==null?void 0:o.properties.state},getDistrictName(e){var o;return e==-1||this.geojson.districts.features==null?"":(o=this.geojson.districts.features.find(s=>this.valueFromLabel(s.properties.district)==e))==null?void 0:o.properties.district},valueFromLabel(e){return e.replace(/\s/g,"_").toLowerCase()},tableRowClick(e){this.polygonClick({...e,mode:this.mode})},polygonClick(e){const o=this.mode=="states"?e.name:e.state;this.selected_state==o?(this.selected_state="",this.mode="states"):(this.selected_state=o,this.mode="districts")}}}),N=e=>(it("data-v-d07dda33"),e=e(),rt(),e),bt={class:"switcher switcher-sm text-center py-2 bg-dark text-danger"},Ct=["onClick","textContent"],xt={class:"map-container"},jt={class:"table-container"},kt={class:"table table-primary table-sm"},wt=N(()=>i("th",{class:"bg-primary text-light"},"#",-1)),$t={class:"bg-primary text-light"},zt={key:0,class:"bg-primary text-light"},Mt=N(()=>i("th",{class:"bg-primary text-light"},"Coordinators",-1)),At=["onClick"],St=["textContent"],Dt=["textContent"],Et=["textContent"],Ft=["textContent"];function Lt(e,o,s,r,f,c){const b=at("map-component");return g(),_(z,null,[i("div",bt,[ot(h(e.selected_state)+" ",1),(g(),_(z,null,D(["states","districts"],n=>i("button",{class:lt(["btn mx-1",n===e.mode?"btn-success":"btn-outline-success bg-light"]),key:n,onClick:v=>e.mode=n,textContent:h(n)},null,10,Ct)),64))]),i("div",xt,[nt(b,{geojson:e.mapGeoJson,data:e.map_data,mode:e.mode,tooltip_third_row_label:"Coordinator(/s)",onModeChange:o[0]||(o[0]=n=>e.mode=n),onPolygonClicked:e.polygonClick},null,8,["geojson","data","mode","onPolygonClicked"]),i("div",jt,[i("table",kt,[i("thead",null,[i("tr",null,[wt,i("th",$t,h(e.mode),1),e.mode=="districts"?(g(),_("th",zt," State ")):E("",!0),Mt])]),i("tbody",null,[(g(!0),_(z,null,D(e.map_data[e.mode],(n,v)=>(g(),_("tr",{key:v,onClick:p=>e.tableRowClick(n)},[i("td",{textContent:h(v+1)},null,8,St),i("td",{textContent:h(n.name)},null,8,Dt),e.mode=="districts"?(g(),_("td",{key:0,textContent:h(n.state)},null,8,Et)):E("",!0),i("td",{textContent:h(n.value)},null,8,Ft)],8,At))),128))])])])])],64)}const Bt=st(yt,[["render",Lt],["__scopeId","data-v-d07dda33"]]);export{Bt as D};
