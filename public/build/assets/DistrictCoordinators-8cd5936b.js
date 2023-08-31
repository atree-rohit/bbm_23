import{g as f,m as k,e as A,_ as b,c as i,b as s,F as p,j as u,d as m,o as r,t as c,w as v,v as M,q as L,p as D,i as j,x as F,n as x,r as y,k as C,y as V,s as w,u as N}from"./_plugin-vue_export-helper-00efc718.js";import{z as P,m as S,i as E,s as g,a as I,l as U,c as O,f as B}from"./indexRollupNext-fab2b8ab.js";const T=f({name:"ModalAddPartner",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"text",label:"Organization / Designation",name:"designation",required:!1},{type:"select",label:"State",name:"state",required:!0,options:[]},{type:"select",label:"District",name:"district",required:!0,options:[]},{type:"text",label:"Coordinates (Latitude, Longitude)",name:"coordinates",required:!1},{type:"text",label:"Email",name:"email",required:!1},{type:"text",label:"Phone Number",name:"phone",required:!1}],form_data:{}}},created(){this.initFormData()},watch:{show(t){let e=document.querySelector("body");t==!0?e.classList.add("modal-open"):e.classList.remove("modal-open")},geojson(){this.initSelectOptions(),(this.user.user_type=="admin"||this.user.user_type=="super_admin")&&(this.form_data.state="jammu_&_kashmir",this.form_data.state=-1)}},computed:{...k({user:t=>t.auth.user,geojson:t=>t.data.geojson}),select_district_options(){let t=[];if(this.form_data.state=="-1")t.push({label:"Select State First",value:"-1"});else{t.push({label:"Select District",value:"-1"});let e=[];this.geojson.districts.features.map(a=>{this.valueFromLabel(a.properties.state)==this.form_data.state&&e.push({label:a.properties.district.trim(),value:this.valueFromLabel(a.properties.district.trim())})}),t=t.concat(e.sort((a,n)=>a.label<n.label?-1:a.label>n.label?1:0))}return t}},methods:{...A({store:"district_coordinators/store",importDC:"district_coordinators/importDC"}),initSelectOptions(){this.form_questions[2].options=this.geojson.states.features.map(t=>({label:t.properties.state.trim(),value:this.valueFromLabel(t.properties.state.trim())})).sort((t,e)=>t.label<e.label?-1:t.label>e.label?1:0)},initFormData(){this.form_data={name:"",designation:"",district:"-1",state:"-1",coordinates:"",email:"",phone:"",user:this.user}},valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},closeModal(){this.$emit("close")},submit(){this.store(this.form_data),this.initFormData(),this.closeModal()}}}),W=t=>(D("data-v-130b467e"),t=t(),j(),t),q={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},H={class:"modal-dialog modal-lg"},X={class:"modal-content"},Y={class:"modal-header"},Z=W(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add District Coordinator",-1)),J={class:"modal-body"},R=["for","textContent"],G=["onUpdate:modelValue","placeholder"],K=["onUpdate:modelValue","placeholder"],Q=["onUpdate:modelValue"],tt={selected:"true",value:"-1"},et=["value","textContent"],ot=["onUpdate:modelValue"],st=["value","textContent"],at={class:"modal-footer"},it={key:1,class:"modal-backdrop fade show"};function rt(t,e,a,n,h,_){return r(),i(p,null,[t.show?(r(),i("div",q,[s("div",H,[s("div",X,[s("div",Y,[Z,s("button",{type:"button",class:"btn-close",onClick:e[0]||(e[0]=(...o)=>t.closeModal&&t.closeModal(...o))})]),s("div",J,[s("form",{action:"javascript:void(0)",onSubmit:e[1]||(e[1]=(...o)=>t.submit&&t.submit(...o)),class:"row",method:"post"},[(r(!0),i(p,null,u(t.form_questions,o=>(r(),i("div",{key:o.name,class:"form-group col-12"},[s("label",{for:o.name,class:"font-weight-bold",textContent:c(o.label)},null,8,R),o.type=="text"?v((r(),i("input",{key:0,type:"text","onUpdate:modelValue":l=>t.form_data[o.name]=l,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,G)),[[M,t.form_data[o.name]]]):o.type=="textarea"?v((r(),i("textarea",{key:1,"onUpdate:modelValue":l=>t.form_data[o.name]=l,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,K)),[[M,t.form_data[o.name]]]):o.name=="state"?v((r(),i("select",{key:2,"onUpdate:modelValue":l=>t.form_data[o.name]=l,class:"form-select"},[s("option",tt,"Select "+c(o.label),1),(r(!0),i(p,null,u(o.options,l=>(r(),i("option",{key:l.value,value:l.value,textContent:c(l.label)},null,8,et))),128))],8,Q)),[[L,t.form_data[o.name]]]):o.name=="district"?v((r(),i("select",{key:3,"onUpdate:modelValue":l=>t.form_data[o.name]=l,class:"form-select"},[(r(!0),i(p,null,u(t.select_district_options,l=>(r(),i("option",{key:l.value,value:l.value,textContent:c(l.label)},null,8,st))),128))],8,ot)),[[L,t.form_data[o.name]]]):m("",!0)]))),128))],32)]),s("div",at,[s("button",{type:"button",class:"btn btn-secondary",onClick:e[2]||(e[2]=(...o)=>t.closeModal&&t.closeModal(...o))},"Close"),s("button",{type:"button",class:"btn btn-success",onClick:e[3]||(e[3]=(...o)=>t.submit&&t.submit(...o))},"Save changes")])])])])):m("",!0),t.show?(r(),i("div",it)):m("",!0)],64)}const nt=b(T,[["render",rt],["__scopeId","data-v-130b467e"]]);const lt=f({name:"ModalViewDistrictCoordinators",props:{show:{type:Boolean,default:!1},data:{type:Array,default:()=>[]}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"text",label:"Organization / Designation",name:"designation",required:!1},{type:"select",label:"State",name:"state",required:!0,options:[]},{type:"select",label:"District",name:"district",required:!0,options:[]},{type:"text",label:"Coordinates (Latitude, Longitude)",name:"coordinates",required:!1},{type:"text",label:"Email",name:"email",required:!1}],current_district_coordinator_id:0}},created(){},watch:{show(t){let e=document.querySelector("body");t==!0?e.classList.add("modal-open"):e.classList.remove("modal-open")}},methods:{valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},closeModal(){this.$emit("close")}}}),dt=t=>(D("data-v-ac41bdf2"),t=t(),j(),t),ct={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},ht={class:"modal-dialog modal-lg"},mt={class:"modal-content"},pt={class:"modal-header"},ut=dt(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"View District Coordinator",-1)),_t={class:"modal-body"},gt={key:0,class:"btn-group mx-auto d-flex justify-content-center"},ft={class:"my-0 mx-5 h3"},bt={class:"table"},vt={class:"modal-footer"},yt={key:1,class:"modal-backdrop fade show"};function Ct(t,e,a,n,h,_){return r(),i(p,null,[t.show?(r(),i("div",ct,[s("div",ht,[s("div",mt,[s("div",pt,[ut,s("button",{type:"button",class:"btn-close",onClick:e[0]||(e[0]=(...o)=>t.closeModal&&t.closeModal(...o))})]),s("div",_t,[t.data.length>=1?(r(),i("div",gt,[s("div",null,[t.current_district_coordinator_id>0?(r(),i("button",{key:0,class:"btn btn-outline-secondary",onClick:e[1]||(e[1]=o=>t.current_district_coordinator_id--)}," < ")):m("",!0)]),s("div",ft,c(t.current_district_coordinator_id+1),1),s("div",null,[t.current_district_coordinator_id<t.data.length-1?(r(),i("button",{key:0,class:"btn btn-outline-secondary",onClick:e[2]||(e[2]=o=>t.current_district_coordinator_id++)}," > ")):m("",!0)])])):m("",!0),s("table",bt,[s("tbody",null,[(r(!0),i(p,null,u(t.form_questions,o=>(r(),i("tr",{key:o.name},[s("td",null,c(o.label),1),s("td",null,c(t.data[t.current_district_coordinator_id][o.name]),1)]))),128))])])]),s("div",vt,[s("button",{type:"button",class:"btn btn-secondary",onClick:e[3]||(e[3]=(...o)=>t.closeModal&&t.closeModal(...o))},"Close"),s("button",{type:"button",class:"btn btn-success",onClick:e[4]||(e[4]=(...o)=>t.submit&&t.submit(...o))},"Save changes")])])])])):m("",!0),t.show?(r(),i("div",yt)):m("",!0)],64)}const $t=b(lt,[["render",Ct],["__scopeId","data-v-ac41bdf2"]]);const wt=f({name:"MapComponent",props:{geojson:{type:Object,required:!0},data:{type:Object,required:!0},modes:{type:Array,required:!0},tooltip_third_row_label:{type:String,default:""}},emits:["mode-change","polygon-clicked"],data(){return{mode:this.modes[0],polygons:null,path:null,svg:null,projection:null,colors:null,max:null,height:500,width:500,zoomTransform:0,tooltip:null}},watch:{mode(t){this.$emit("mode-change",t)},data(t){console.log("data changed"),this.init()}},computed:{mapData(){return this.data[this.mode]},zoom(){return P().scaleExtent([.5,250]).translateExtent([[-.5*this.width,-.75*this.height],[2.5*this.width,2.5*this.height]]).on("zoom",this.handleZoom)},mode_key(){return this.mode.slice(0,-1)}},mounted(){},updated(){console.log("updated: re-initializing"),this.init()},methods:{init(){console.log("init"),this.geojson.features?(this.init_variables(),this.init_legend(),this.init_svg(),this.render_map()):console.log("No geojson")},init_variables(){this.polygons=null,this.path=null,this.svg={},this.height=window.innerHeight*.8,this.width=window.innerWidth,window.innerWidth<800?(this.height=window.innerHeight*.6,this.projection=S().scale(600).center([110,20])):this.projection=S().scale(1e3).center([80,27.5]),this.path=E().projection(this.projection),this.tooltip=this.init_tooltip()},init_tooltip(){return g("body .d3-tooltip").empty()||g("body .d3-tooltip").remove(),g("body").append("div").attr("class","d3-tooltip").style("position","absolute").style("top","0").style("z-index","10").style("visibility","hidden").style("padding","10px").style("background","rgba(0,0,0,0.75)").style("border-radius","4px").style("color","#fff").text("a simple tooltip")},init_legend(){this.colors={},this.legend={},this.max=I(this.mapData,t=>t.value),this.colors=U().domain([0,1,this.max/3,this.max]).range(["#c33","#488","#fd0","#24ff00"]).clamp(!0),this.legend=O().shapeHeight(20).shapeWidth(60).scale(this.colors).labelFormat(B(",.0f")).orient("horizontal").labelOffset(-10).labelAlign("middle").cells(6)},init_svg(){g("#map-container svg.svg-content").empty()||g("#map-container svg.svg-content").remove(),this.svg=g("#map-container").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("width",this.width).attr("height",this.height).classed("svg-content",!0),this.zoomTransform||(this.zoomTransform=F(this.svg.node())),this.height>this.width&&this.legend.shapeWidth(35).cells(4)},render_map(){let t=this.svg.append("g").classed("map-boundary",!0).selectAll("path").append("g");this.svg.append("g").classed("map-labels",!0).selectAll("text").append("g"),this.polygons=t.append("g").classed("polygons",!0),this.geojson.features.forEach(e=>{this.drawPolygon(e)}),this.svg.append("g").attr("class","legend").attr("transform","translate("+this.width*.55+", 25)").call(this.legend),this.svg.call(this.zoom),this.svg.call(this.zoom.transform,this.zoomTransform)},drawPolygon(t){this.polygons.append("g").data([t]).enter().append("path").attr("d",this.path).attr("id",this.getPolygonId(t.properties)).attr("fill",e=>this.color_polygon(t.properties)).on("mouseover",(e,a)=>{this.tooltip.html(this.hover_text(t.properties)).style("visibility","visible")}).on("mousemove",(e,a)=>{this.tooltip.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(e,a)=>this.clicked(a))},getPolygonId(t){let e=t.region,a=[" ","&","(",")","."];return t.state!=null&&(e=t.state),t.district!=null&&(e=t.district),a.forEach(n=>{e=e.replaceAll(n,"_")}),e},clicked(t){let e={name:t.properties[this.mode_key],value:0,mode:this.mode},a=this.mapData.find(n=>n.name==e.name);e.value=a?a.value:0,this.$emit("polygon-clicked",e)},drawPolygonBoundary(t){this.polygons.append("g").data([t]).enter().append("path").classed("state-boundary",!0).classed("selected-polygon",e=>this.selected.state&&e.properties.state==this.selected.state||this.selected.region&&e.properties.region==this.selected.region).attr("properties",e=>JSON.stringify(e.properties)).attr("d",this.path).attr("id",this.getPolygonId(t.properties))},drawPolygonLabel(t,e){const a=this.regional_data[this.polygon_mode].find(h=>h[this.polygon_key]==e.properties[this.polygon_key]);let n="";a&&(n=this.format_number(a[this.data_mode])),t.append("g").data([e]).enter().append("text").classed("poly_text",!0).attr("x",h=>this.path.centroid(h)[0]).attr("y",h=>this.path.centroid(h)[1]).classed("small-text",!0).attr("text-anchor","middle").text(n).on("mouseover",()=>{this.tooltip.html(this.hover_text(e.properties)).style("visibility","visible")}).on("mousemove",(h,_)=>{this.tooltip.style("top",h.pageY-10+"px").style("left",h.pageX+10+"px")}).on("mouseout",()=>this.tooltip.html("").style("visibility","hidden")).on("click",(h,_)=>this.clicked(_))},color_polygon(t){let e=this.mapData.find(a=>a.name==t[this.mode_key]);return e?this.colors(e.value):this.colors(0)},handleZoom(t){this.zoomTransform=t.transform;let e=1/t.transform.k*.8;this.svg.selectAll(".poly_text").attr("transform",t.transform).style("font-size",`${e}rem`),this.svg.selectAll("path").attr("transform",t.transform),this.svg.selectAll("circle").attr("transform",t.transform).attr("r",e)},hover_text(t){var a;let e=["state","district"].map(n=>`<tr><td>${this.capitalizeWords(n)}</td><td>${t[n]?t[n]:"-"}</td></tr>`);return e.push(`<tr><td>${this.tooltip_third_row_label}</td><td>${((a=this.mapData.find(n=>n.name==t[this.mode_key]))==null?void 0:a.value)||0}</td></tr>`),`<table border='1' class='d3-tooltip'>${e.join(`
`)}</table>`},format_number(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},capitalizeWords(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}}}),kt={class:"switcher switcher-sm text-center py-2 bg-dark"},Dt=["onClick","textContent"],jt=s("div",{id:"map"},[s("div",{id:"map-container"})],-1);function Mt(t,e,a,n,h,_){return r(),i(p,null,[s("div",kt,[(r(!0),i(p,null,u(t.modes,o=>(r(),i("button",{class:x(["btn mx-1",o===t.mode?"btn-success":"btn-outline-success bg-light"]),key:o,onClick:l=>t.mode=o,textContent:c(o)},null,10,Dt))),128))]),jt],64)}const Lt=b(wt,[["render",Mt]]);const St=f({name:"MapDistrictCoordinator",components:{MapComponent:Lt},emits:["polygon-clicked"],data(){return{mode:"states"}},computed:{...k({district_coordinators:t=>t.district_coordinators.all_data,geojson:t=>t.data.geojson}),map_data(){let t={};if(this.geojson.states.features){let e={states:this.geojson.states.features.map(a=>a.properties.state),districts:this.geojson.districts.features.map(a=>a.properties.district)};t={states:e.states.map(a=>({name:a,value:0})),districts:e.districts.map(a=>({name:a,value:0}))},this.district_coordinators.forEach(a=>{t.states.find((n,h)=>a.state==this.valueFromLabel(n.name)).value+=1,t.districts.forEach(n=>{a.district==this.valueFromLabel(n.name)&&(n.value+=1)})})}return t}},mounted(){},methods:{valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},polygonClick(t){this.$emit("polygon-clicked",t)}}}),xt={class:"map-container rounded"};function zt(t,e,a,n,h,_){const o=y("map-component");return r(),i("div",xt,[C(o,{geojson:t.geojson[t.mode],data:t.map_data,modes:["states","districts"],tooltip_third_row_label:"Coordinator(/s)",onModeChange:e[0]||(e[0]=l=>t.mode=l),onPolygonClicked:t.polygonClick},null,8,["geojson","data","onPolygonClicked"])])}const At=b(St,[["render",zt]]);const Ft=f({name:"DistrictCoordinators",components:{ModalAddDistrictCoordinator:nt,ModalViewDistrictCoordinators:$t,MapDistrictCoordinator:At},data(){return{show_add_modal:!1,show_view_modal:!1,headers:[{value:"id",label:"Sl. No."},{value:"name",label:"Name"},{value:"state",label:"State"},{value:"district",label:"District"}],sort_col:"id",sort_dir:"asc",selected_district_coordinator:null}},computed:{...k({user:t=>t.auth.user,all_data:t=>t.district_coordinators.all_data,geojson:t=>t.data.geojson}),auth(){return this.user&&(this.user.user_type=="super_admin"||this.user.user_type=="admin")},table_data(){return this.all_data.sort((t,e)=>this.sort_dir=="asc"?t[this.sort_col]>e[this.sort_col]?1:-1:t[this.sort_col]<e[this.sort_col]?1:-1)},chip_data(){return V(this.all_data,t=>t.state)},chips(){return this.chip_data.map(t=>({state:t[0],coordinators:t[1].length})).sort((t,e)=>e.coordinators-t.coordinators)}},created(){w.dispatch("data/getMaps"),w.dispatch("district_coordinators/getAllData")},methods:{polygonClick(t){let e=this.all_data.filter(a=>a.state==this.valueFromLabel(t.name)||a.district==this.valueFromLabel(t.name));if(e.length==0){alert(`Current No Coordinators set for ${t.name}`);return}this.selected_district_coordinator=e,this.show_view_modal=!0},showViewModal(t){this.selected_district_coordinator=[t],this.show_view_modal=!0},valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},getStateName(t){var e;return t==-1||this.geojson.states.features==null?"":(e=this.geojson.states.features.find(a=>this.valueFromLabel(a.properties.state)==t))==null?void 0:e.properties.state},getDistrictName(t){var e;return t==-1||this.geojson.districts.features==null?"":(e=this.geojson.districts.features.find(a=>this.valueFromLabel(a.properties.district)==t))==null?void 0:e.properties.district},headerSortClass(t){if(t==this.sort_col)return this.sort_dir=="asc"?"sort-asc":"sort-desc"},headerClick(t){t==this.sort_col?this.sort_dir=this.sort_dir=="asc"?"desc":"asc":(this.sort_col=t,this.sort_dir="asc")},deleteDistrictCoordinator(t){confirm("Are you sure you want to delete this District Coordinator?")&&w.dispatch("district_coordinators/delete",t)}}}),Vt=t=>(D("data-v-a8b8615c"),t=t(),j(),t),Nt={class:"container-fluid"},Pt={class:"header d-flex px-2"},Et={class:"h1"},It={key:0},Ut={class:"main-container"},Ot={class:"chip-container"},Bt=["onClick"],Tt=["textContent"],Wt=["textContent"],qt=Vt(()=>s("div",{class:"coordinator-container"},null,-1)),Ht={key:0,class:"admin-container"},Xt={class:"table table-primary"},Yt=["textContent","onClick"],Zt={key:0,class:"bg-warning text-center"},Jt=["onClick"],Rt=["textContent"],Gt=["textContent"],Kt=["textContent"],Qt=["textContent"],te={key:0,class:"table-warning text-center"},ee=["onClick"];function oe(t,e,a,n,h,_){const o=y("map-district-coordinator"),l=y("modal-view-district-coordinators"),z=y("modal-add-district-coordinator");return r(),i("div",Nt,[s("div",Pt,[s("div",Et,"District Coordinators ["+c(t.all_data.length)+"]",1),t.auth?(r(),i("div",It,[s("button",{class:"btn btn-lg btn-success mx-5",onClick:e[0]||(e[0]=d=>t.show_add_modal=!0),title:"Add District Coordinator"},"+")])):m("",!0)]),s("div",Ut,[s("div",Ot,[(r(!0),i(p,null,u(t.chips,d=>(r(),i("div",{class:"chip",key:d.state,onClick:$=>t.polygonClick({name:d.state})},[s("span",{class:"chip-state",textContent:c(t.getStateName(d.state))},null,8,Tt),s("span",{class:"chip-coordinator",textContent:c(d.coordinators)},null,8,Wt),qt],8,Bt))),128))]),C(o,{onPolygonClicked:t.polygonClick},null,8,["onPolygonClicked"]),C(l,{show:t.show_view_modal,data:t.selected_district_coordinator,onClose:e[1]||(e[1]=d=>t.show_view_modal=!1)},null,8,["show","data"])]),t.auth?(r(),i("div",Ht,[s("table",Xt,[s("thead",null,[s("tr",null,[(r(!0),i(p,null,u(t.headers,d=>(r(),i("th",{key:d.value,textContent:c(d.label),class:x(["bg-primary",t.headerSortClass(d.value)]),onClick:$=>t.headerClick(d.value)},null,10,Yt))),128)),t.auth?(r(),i("th",Zt,"Actions")):m("",!0)])]),s("tbody",null,[(r(!0),i(p,null,u(t.table_data,d=>(r(),i("tr",{key:d.id,onClick:$=>t.showViewModal(d)},[s("td",{textContent:c(d.id)},null,8,Rt),s("td",{textContent:c(d.name)},null,8,Gt),s("td",{textContent:c(t.getStateName(d.state))},null,8,Kt),s("td",{textContent:c(t.getDistrictName(d.district))},null,8,Qt),t.auth?(r(),i("td",te,[s("button",{class:"btn delete-btn badge btn-danger",onClick:N($=>t.deleteDistrictCoordinator(d.id),["stop"]),title:"Delete District Coordinator"}," X ",8,ee)])):m("",!0)],8,Jt))),128))])])])):m("",!0),C(z,{show:t.show_add_modal,onClose:e[2]||(e[2]=d=>t.show_add_modal=!1)},null,8,["show"])])}const ie=b(Ft,[["render",oe],["__scopeId","data-v-a8b8615c"]]);export{ie as D};