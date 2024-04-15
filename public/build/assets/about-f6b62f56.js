import{e as L,_ as y,c as a,a as o,F as h,j as p,b as m,o as i,t as u,w as v,v as M,y as S,p as C,i as w,r as b,f,n as F,z as j,d as A}from"./_plugin-vue_export-helper-c00cf4a5.js";import{m as D,b as N,g as V,s as g}from"./index-59ab4275.js";import{D as B}from"./DistrictCoordinators-1e28a292.js";import{F as I}from"./Footer-3584132a.js";import"./viridis-a50779c7.js";import"./indexRollupNext-7720f1bf.js";/* empty css                        */const z=L({name:"ModalAddPartner",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"text",label:"Organization / Designation",name:"designation",required:!1},{type:"select",label:"State",name:"state",required:!0,options:[]},{type:"select",label:"District",name:"district",required:!0,options:[]},{type:"text",label:"Coordinates (Latitude, Longitude)",name:"coordinates",required:!1},{type:"text",label:"Email",name:"email",required:!1},{type:"text",label:"Phone Number",name:"phone",required:!1}],form_data:{}}},created(){this.initFormData()},watch:{show(t){let e=document.querySelector("body");t==!0?e.classList.add("modal-open"):e.classList.remove("modal-open")},geojson(){this.initSelectOptions(),(this.user.user_type=="admin"||this.user.user_type=="super_admin")&&(this.form_data.state="jammu_&_kashmir",this.form_data.state=-1)}},computed:{...D({user:t=>t.auth.user,geojson:t=>t.data.geojson}),select_district_options(){let t=[];if(this.form_data.state=="-1")t.push({label:"Select State First",value:"-1"});else{t.push({label:"Select District",value:"-1"});let e=[];this.geojson.districts.features.map(r=>{this.valueFromLabel(r.properties.state)==this.form_data.state&&e.push({label:r.properties.district.trim(),value:this.valueFromLabel(r.properties.district.trim())})}),t=t.concat(e.sort((r,_)=>r.label<_.label?-1:r.label>_.label?1:0))}return t}},methods:{...N({store:"district_coordinators/store",importDC:"district_coordinators/importDC"}),initSelectOptions(){this.form_questions[2].options=this.geojson.states.features.map(t=>({label:t.properties.state.trim(),value:this.valueFromLabel(t.properties.state.trim())})).sort((t,e)=>t.label<e.label?-1:t.label>e.label?1:0)},initFormData(){this.form_data={name:"",designation:"",district:"-1",state:"-1",coordinates:"",email:"",phone:"",user:this.user}},valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},closeModal(){this.$emit("close")},submit(){this.store(this.form_data),this.initFormData(),this.closeModal()}}}),U=t=>(C("data-v-130b467e"),t=t(),w(),t),E={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},O={class:"modal-dialog modal-lg"},T={class:"modal-content"},P={class:"modal-header"},J=U(()=>o("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add District Coordinator",-1)),W={class:"modal-body"},X=["for","textContent"],Y=["onUpdate:modelValue","placeholder"],q=["onUpdate:modelValue","placeholder"],G=["onUpdate:modelValue"],H={selected:"true",value:"-1"},K=["value","textContent"],Q=["onUpdate:modelValue"],R=["value","textContent"],Z={class:"modal-footer"},tt={key:1,class:"modal-backdrop fade show"};function et(t,e,r,_,d,n){return i(),a(h,null,[t.show?(i(),a("div",E,[o("div",O,[o("div",T,[o("div",P,[J,o("button",{type:"button",class:"btn-close",onClick:e[0]||(e[0]=(...s)=>t.closeModal&&t.closeModal(...s))})]),o("div",W,[o("form",{action:"javascript:void(0)",onSubmit:e[1]||(e[1]=(...s)=>t.submit&&t.submit(...s)),class:"row",method:"post"},[(i(!0),a(h,null,p(t.form_questions,s=>(i(),a("div",{key:s.name,class:"form-group col-12"},[o("label",{for:s.name,class:"font-weight-bold",textContent:u(s.label)},null,8,X),s.type=="text"?v((i(),a("input",{key:0,type:"text","onUpdate:modelValue":l=>t.form_data[s.name]=l,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,Y)),[[M,t.form_data[s.name]]]):s.type=="textarea"?v((i(),a("textarea",{key:1,"onUpdate:modelValue":l=>t.form_data[s.name]=l,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,q)),[[M,t.form_data[s.name]]]):s.name=="state"?v((i(),a("select",{key:2,"onUpdate:modelValue":l=>t.form_data[s.name]=l,class:"form-select"},[o("option",H,"Select "+u(s.label),1),(i(!0),a(h,null,p(s.options,l=>(i(),a("option",{key:l.value,value:l.value,textContent:u(l.label)},null,8,K))),128))],8,G)),[[S,t.form_data[s.name]]]):s.name=="district"?v((i(),a("select",{key:3,"onUpdate:modelValue":l=>t.form_data[s.name]=l,class:"form-select"},[(i(!0),a(h,null,p(t.select_district_options,l=>(i(),a("option",{key:l.value,value:l.value,textContent:u(l.label)},null,8,R))),128))],8,Q)),[[S,t.form_data[s.name]]]):m("",!0)]))),128))],32)]),o("div",Z,[o("button",{type:"button",class:"btn btn-secondary",onClick:e[2]||(e[2]=(...s)=>t.closeModal&&t.closeModal(...s))},"Close"),o("button",{type:"button",class:"btn btn-success",onClick:e[3]||(e[3]=(...s)=>t.submit&&t.submit(...s))},"Save changes")])])])])):m("",!0),t.show?(i(),a("div",tt)):m("",!0)],64)}const ot=y(z,[["render",et],["__scopeId","data-v-130b467e"]]);const st={name:"ModalViewDistrictCoordinators",props:{show:{type:Boolean,default:!1},data:{type:Array,default:()=>[]}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"text",label:"Organization / Designation",name:"designation",required:!1},{type:"select",label:"State",name:"state_name",required:!0,options:[]},{type:"select",label:"District",name:"district_name",required:!0,options:[]},{type:"text",label:"Coordinates (Latitude, Longitude)",name:"coordinates",required:!1},{type:"text",label:"Email",name:"email",required:!1}],current_district_coordinator_id:0}},created(){},watch:{show(t){this.current_district_coordinator_id=0;let e=document.querySelector("body");t==!0?e.classList.add("modal-open"):e.classList.remove("modal-open")}},methods:{valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},closeModal(){this.$emit("close")}}},at=t=>(C("data-v-715e480c"),t=t(),w(),t),it={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},rt={class:"modal-dialog modal-lg"},nt={class:"modal-content"},lt={class:"modal-header"},dt=at(()=>o("h3",{class:"modal-title",id:"exampleModalLiveLabel"}," View District Coordinators ",-1)),ct={class:"modal-body"},ut={key:0,class:"btn-group mx-auto d-flex justify-content-center"},_t={class:"my-0 mx-5 h3"},mt={class:"table"},ht={class:"modal-footer"},pt={key:1,class:"modal-backdrop fade show"};function bt(t,e,r,_,d,n){return i(),a(h,null,[r.show?(i(),a("div",it,[o("div",rt,[o("div",nt,[o("div",lt,[dt,o("button",{type:"button",class:"btn-close",onClick:e[0]||(e[0]=(...s)=>n.closeModal&&n.closeModal(...s))})]),o("div",ct,[r.data.length>=1?(i(),a("div",ut,[o("div",null,[d.current_district_coordinator_id>0?(i(),a("button",{key:0,class:"btn btn-outline-secondary",onClick:e[1]||(e[1]=s=>d.current_district_coordinator_id--)}," < ")):m("",!0)]),o("div",_t,u(d.current_district_coordinator_id+1),1),o("div",null,[d.current_district_coordinator_id<r.data.length-1?(i(),a("button",{key:0,class:"btn btn-outline-secondary",onClick:e[2]||(e[2]=s=>d.current_district_coordinator_id++)}," > ")):m("",!0)])])):m("",!0),o("table",mt,[o("tbody",null,[(i(!0),a(h,null,p(d.form_questions,s=>(i(),a("tr",{key:s.name},[o("td",null,u(s.label),1),o("td",null,u(r.data[d.current_district_coordinator_id][s.name]),1)]))),128))])])]),o("div",ht,[o("button",{type:"button",class:"btn btn-secondary",onClick:e[3]||(e[3]=(...s)=>n.closeModal&&n.closeModal(...s))}," Close ")])])])])):m("",!0),r.show?(i(),a("div",pt)):m("",!0)],64)}const ft=y(st,[["render",bt],["__scopeId","data-v-715e480c"]]);const vt={name:"DistrictCoordinatorsComponent",components:{ModalAddDistrictCoordinator:ot,ModalViewDistrictCoordinators:ft,DistrictCoordinators:B},data(){return{show_add_modal:!1,show_view_modal:!1,headers:[{value:"id",label:"Sl. No."},{value:"name",label:"Name"},{value:"state",label:"State"},{value:"district",label:"District"}],sort_col:"id",sort_dir:"asc",selected_district_coordinator:null}},computed:{...D({user:t=>t.auth.user,all_data:t=>t.district_coordinators.all_data,geojson:t=>t.data.geojson}),auth(){return this.user&&(this.user.user_type=="super_admin"||this.user.user_type=="admin")},table_data(){return this.all_data.sort((t,e)=>this.sort_dir=="asc"?t[this.sort_col]>e[this.sort_col]?1:-1:t[this.sort_col]<e[this.sort_col]?1:-1)},chip_data(){return V(this.all_data,t=>t.state)},chips(){return this.chip_data.map(t=>({state:t[0],coordinators:t[1].length})).sort((t,e)=>e.coordinators-t.coordinators)}},created(){g.dispatch("data/getMaps"),g.dispatch("district_coordinators/getAllData")},methods:{polygonClick(t){let e=this.all_data.filter(_=>_.state==this.valueFromLabel(t.name)||_.district==this.valueFromLabel(t.name));if(e.length==0){alert(`Current No Coordinators set for ${t.name}`);return}const r=e.map(_=>({..._,state_name:this.getStateName(_.state),district_name:this.getDistrictName(_.district)}));this.selected_district_coordinator=r,this.show_view_modal=!0},showViewModal(t){let e={...t,state_name:this.getStateName(t.state),district_name:this.getDistrictName(t.district)};this.selected_district_coordinator=[e],this.show_view_modal=!0},valueFromLabel(t){return t.replace(/\s/g,"_").toLowerCase()},getStateName(t){var e;return t==-1||this.geojson.states.features==null?"":(e=this.geojson.states.features.find(r=>this.valueFromLabel(r.properties.state)==t))==null?void 0:e.properties.state},getDistrictName(t){var e;return t==-1||this.geojson.districts.features==null?"":(e=this.geojson.districts.features.find(r=>this.valueFromLabel(r.properties.district)==t))==null?void 0:e.properties.district},headerSortClass(t){if(t==this.sort_col)return this.sort_dir=="asc"?"sort-asc":"sort-desc"},headerClick(t){t==this.sort_col?this.sort_dir=this.sort_dir=="asc"?"desc":"asc":(this.sort_col=t,this.sort_dir="asc")},deleteDistrictCoordinator(t){confirm("Are you sure you want to delete this District Coordinator?")&&g.dispatch("district_coordinators/delete",t)}}},gt=t=>(C("data-v-43ca885b"),t=t(),w(),t),yt={class:"container-fluid"},Ct={class:"header d-flex px-2"},wt={class:"h1"},kt={key:0},Dt={key:1},$t=gt(()=>o("a",{href:"https://forms.gle/vyMg69M253TkEFd19",target:"”_blank”",class:"btn btn-lg btn-success"},"Become A District Coordinator",-1)),xt=[$t],Mt={class:"map-container"},St={key:0,class:"admin-container"},Lt={class:"table table-primary"},Ft=["textContent","onClick"],jt={key:0,class:"bg-warning text-center"},At=["onClick"],Nt=["textContent"],Vt=["textContent"],Bt=["textContent"],It=["textContent"],zt={key:0,class:"table-warning text-center"},Ut=["onClick"];function Et(t,e,r,_,d,n){const s=b("district-coordinators"),l=b("modal-view-district-coordinators"),k=b("modal-add-district-coordinator");return i(),a("div",yt,[o("div",Ct,[o("div",wt,"District Coordinators ["+u(t.all_data.length)+"]",1),n.auth?(i(),a("div",kt,[o("button",{class:"btn btn-lg btn-success mx-5",onClick:e[0]||(e[0]=c=>d.show_add_modal=!0),title:"Add District Coordinator"}," + ")])):(i(),a("div",Dt,xt))]),o("div",Mt,[f(s,{onPolygonClicked:n.polygonClick},null,8,["onPolygonClicked"]),f(l,{show:d.show_view_modal,data:d.selected_district_coordinator,onClose:e[1]||(e[1]=c=>d.show_view_modal=!1)},null,8,["show","data"])]),n.auth?(i(),a("div",St,[o("table",Lt,[o("thead",null,[o("tr",null,[(i(!0),a(h,null,p(d.headers,c=>(i(),a("th",{key:c.value,textContent:u(c.label),class:F(["bg-primary",n.headerSortClass(c.value)]),onClick:x=>n.headerClick(c.value)},null,10,Ft))),128)),n.auth?(i(),a("th",jt," Actions ")):m("",!0)])]),o("tbody",null,[(i(!0),a(h,null,p(n.table_data,c=>(i(),a("tr",{key:c.id,onClick:x=>n.showViewModal(c)},[o("td",{textContent:u(c.id)},null,8,Nt),o("td",{textContent:u(c.name)},null,8,Vt),o("td",{textContent:u(n.getStateName(c.state))},null,8,Bt),o("td",{textContent:u(n.getDistrictName(c.district))},null,8,It),n.auth?(i(),a("td",zt,[o("button",{class:"btn delete-btn badge btn-danger",onClick:j(x=>n.deleteDistrictCoordinator(c.id),["stop"]),title:"Delete District Coordinator"}," X ",8,Ut)])):m("",!0)],8,At))),128))])])])):m("",!0),f(k,{show:d.show_add_modal,onClose:e[2]||(e[2]=c=>d.show_add_modal=!1)},null,8,["show"])])}const Ot=y(vt,[["render",Et],["__scopeId","data-v-43ca885b"]]);const Tt=L({name:"About",components:{DistrictCoordinatorsComponent:Ot,Footer:I},data(){return{paragraphs:["Big Butterfly Month is a citizen science initiative dedicated to celebrating and conserving butterflies. Our mission is to unite butterfly enthusiasts, students, families, and nature lovers in contributing valuable data that enhances our understanding of these delicate wonders of nature. By participating in butterfly walks, submitting observations, and engaging in various activities, you become an integral part of our journey to safeguard butterflies and their habitats.","At Big Butterfly Month, we believe in the power of community and collaboration. We actively seek partnerships with educational institutions, nature clubs, wildlife organizations, and local communities to organize awareness programs, workshops, and events focused on butterfly conservation and citizen science. By building a strong community of participants and allies, we can amplify our impact and foster a collective passion for preserving butterfly populations throughout India.","Citizen scientists can upload their observations and engage with experts and fellow enthusiasts. This process empowers contributors, offering feedback and guidance to hone butterfly identification skills and build confidence. The platforms also serve as valuable learning tools, inspiring individuals to actively participate in butterfly conservation initiatives and nurturing a deeper appreciation for these magnificent creatures.","Join us on this exciting journey of discovery and conservation! Together, we can make a difference for butterflies, ensuring a brighter future for these enchanting insects and the ecosystems they inhabit. Your participation and support are vital in advancing our cause, and we eagerly anticipate celebrating the beauty and significance of butterflies with you during Big Butterfly Month and beyond."]}},computed:{...D({user:t=>t.auth.user,all_data:t=>t.resources.all_data})},mounted(){},methods:{gotoLink(t){window.open(t,"_blank")}}}),Pt=t=>(C("data-v-ce4227dc"),t=t(),w(),t),Jt=Pt(()=>o("div",{class:"header d-flex px-2"},[o("div",{class:"h1"},"About Us")],-1)),Wt={class:"main-container m-1"},Xt={class:"section paragraphs-container"},Yt=["textContent"],qt={class:"section"};function Gt(t,e,r,_,d,n){const s=b("district-coordinators-component"),l=b("Footer");return i(),a(h,null,[Jt,o("div",Wt,[o("div",Xt,[(i(!0),a(h,null,p(t.paragraphs,(k,c)=>(i(),a("p",{key:c,class:"section-text fs-5",textContent:u(k)},null,8,Yt))),128))]),o("div",qt,[f(s)])]),f(l)],64)}const Ht=y(Tt,[["render",Gt],["__scopeId","data-v-ce4227dc"]]),$=A({});$.component("about",Ht);$.use(g);$.mount("#app");