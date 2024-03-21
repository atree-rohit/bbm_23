import{g,m as w,e as j,_ as k,c as o,b as t,F as p,l as _,d as u,o as n,t as d,w as c,v as y,E as D,p as C,k as $,G as L,s as i,r as f,h as v,f as E}from"./_plugin-vue_export-helper-2bfc9827.js";import{L as V}from"./LoadingData-95ece2e2.js";import"./ButterflyAnimation-0b3e36f8.js";const N=g({name:"ModalEditUser",props:{show:{type:Boolean,default:!1},data:{type:Object,default:()=>{}}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"text",label:"Email",name:"email",required:!0},{type:"select",label:"User Type",name:"user_type",required:!0,options:[{label:"User",value:"user"},{label:"Admin",value:"admin"},{label:"Super Admin",value:"super_admin"}]}],form_data:{}}},computed:{...w({auth_user:e=>e.auth.user})},watch:{show(e){this.form_data=this.data;let a=document.querySelector("body");e==!0?a.classList.add("modal-open"):a.classList.remove("modal-open")}},methods:{...j({update:"manage_users/update"}),valueFromLabel(e){return e.replace(/\s/g,"_").toLowerCase()},submit(){let e={form_data:this.form_data,user:this.auth_user};this.update(e),this.closeModal()},closeModal(){this.$emit("close")}}}),U=e=>(C("data-v-5bbb77cb"),e=e(),$(),e),P={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},T={class:"modal-dialog modal-lg"},K={class:"modal-content"},B={class:"modal-header"},F=U(()=>t("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Edit User Details",-1)),G={class:"modal-body"},z=["for","textContent"],O=["onUpdate:modelValue","placeholder"],X=["onUpdate:modelValue","placeholder"],Y=["onUpdate:modelValue","disabled"],H=U(()=>t("option",null,"Select Link Type",-1)),J=["value","textContent","selected"],Q={class:"modal-footer"},R={key:1,class:"modal-backdrop fade show"};function W(e,a,m,I,M,S){return n(),o(p,null,[e.show?(n(),o("div",P,[t("div",T,[t("div",K,[t("div",B,[F,t("button",{type:"button",class:"btn-close",onClick:a[0]||(a[0]=(...s)=>e.closeModal&&e.closeModal(...s))})]),t("div",G,[t("form",{action:"javascript:void(0)",onSubmit:a[1]||(a[1]=(...s)=>e.submit&&e.submit(...s)),class:"row",method:"post"},[(n(!0),o(p,null,_(e.form_questions,s=>(n(),o("div",{key:s.name,class:"form-group col-12"},[t("label",{for:s.name,class:"font-weight-bold",textContent:d(s.label)},null,8,z),s.type=="text"?c((n(),o("input",{key:0,type:"text","onUpdate:modelValue":r=>e.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,O)),[[y,e.form_data[s.name]]]):u("",!0),s.type=="number"?c((n(),o("input",{key:1,type:"number","onUpdate:modelValue":r=>e.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,X)),[[y,e.form_data[s.name]]]):s.type=="select"?c((n(),o("select",{key:2,"onUpdate:modelValue":r=>e.form_data[s.name]=r,class:"form-select",disabled:e.auth_user.user_type!="super_admin"||e.auth_user.id==e.data.id},[H,(n(!0),o(p,null,_(s.options,r=>(n(),o("option",{key:r.value,value:r.value,textContent:d(r.label),selected:r.value=="newspaper_print"},null,8,J))),128))],8,Y)),[[D,e.form_data[s.name]]]):u("",!0)]))),128))],32)]),t("div",Q,[t("button",{type:"button",class:"btn btn-secondary",onClick:a[2]||(a[2]=(...s)=>e.closeModal&&e.closeModal(...s))},"Close"),t("button",{type:"button",class:"btn btn-success",onClick:a[3]||(a[3]=(...s)=>e.submit&&e.submit(...s))},"Save changes")])])])])):u("",!0),e.show?(n(),o("div",R)):u("",!0)],64)}const Z=k(N,[["render",W],["__scopeId","data-v-5bbb77cb"]]);const x=g({name:"ManageUsers",components:{ModalEditUser:Z,LoadingData:V},data(){return{show_modal:!1,modal_data:{},a_key_pressed:!1}},computed:{...w({auth_user:e=>e.auth.user,is_admin:e=>e.auth.is_admin,is_super_admin:e=>e.auth.is_super_admin,all_users:e=>e.manage_users.all_data,all_logs:e=>e.logs.all_data}),...L({inat_new_total:"data/inat_new_total"}),log_table_data(){let e=[];for(let a of this.all_logs)e.push({id:a.id,subject_type:a.subject_type.replace("App\\Models\\",""),subject_id:a.subject_id,causer_id:a.causer_id,event:a.event,properties:a.properties.attributes,created_at:a.created_at,updated_at:a.updated_at});return e.reverse()}},mounted(){i.dispatch("data/initInatPull"),i.dispatch("manage_users/getAllData"),i.dispatch("logs/getAllData")},methods:{showModal(e){this.modal_data=e,this.show_modal=!0},getUserName(e){let a=this.all_users.find(m=>m.id==e);return a?a.name:"Unknown"},deleteUser(e){confirm("Are you sure you want to delete this user?")&&i.dispatch("manage_users/delete",e)},pullInat(){let e=!1;i.dispatch("data/pullInat",e)},pullInatAll(e){if(e.key==="a"&&this.a_key_pressed==!1){let a=!0;i.dispatch("data/pullInat",a),this.a_key_pressed=!0}},resetAKeyPressed(){this.a_key_pressed=!1},addStoredData(){i.dispatch("data/addStoredData")}}}),h=e=>(C("data-v-014ebca7"),e=e(),$(),e),q={key:0,class:"main-container m-4"},ee=h(()=>t("div",{class:"header d-flex px-2"},[t("div",{class:"h1"},"Manage Users")],-1)),te={class:"table table-bordered table-hover"},ae=h(()=>t("thead",{class:"bg-info"},[t("tr",null,[t("th",null,"ID"),t("th",null,"Name"),t("th",null,"Email"),t("th",null,"User Type"),t("th",null,"Actions")])],-1)),se=["onClick"],le={class:"text-center d-flex justify-content-around h4"},oe={key:0,class:"btn btn-primary badge",title:"Edit User"},ne=["onClick"],de={key:0,class:"w-100 d-flex justify-content-center py-3 my-2 border border-danger"},re={class:"w-100 log-table-container"},ie={class:"table table-sm table-hover"},ue=h(()=>t("thead",{class:"bg-secondary text-light"},[t("tr",null,[t("th",null,"ID"),t("th",null,"Subject"),t("th",null,"Subject ID"),t("th",null,"Causer ID"),t("th",null,"Properties"),t("th",null,"Log Type")])],-1)),pe={class:"table-secondary"},_e=["textContent"],me=["textContent"],ce=["textContent"],he=["textContent"],be=["textContent"],ye=["textContent"],fe={key:1,class:"main-container btn-danger d-flex justify-content-center align-items-center",style:{height:"20rem","font-size":"3.5vw","font-weight":"100"}};function ve(e,a,m,I,M,S){const s=f("modal-edit-user"),r=f("loading-data");return n(),o(p,null,[e.is_admin||e.is_super_admin?(n(),o("div",q,[ee,t("table",te,[ae,t("tbody",null,[(n(!0),o(p,null,_(e.all_users,l=>(n(),o("tr",{key:l.id,onClick:A=>e.showModal(l)},[t("td",null,d(l.id),1),t("td",null,d(l.name),1),t("td",null,d(l.email),1),t("td",null,d(l.user_type),1),t("td",le,[e.auth_user.id==l.id||e.is_super_admin?(n(),o("span",oe," ✎ ")):u("",!0),e.auth_user.id!=l.id&&e.is_super_admin?(n(),o("span",{key:1,class:"btn btn-danger badge",onClick:A=>e.deleteUser(l.id),title:"Delete User"}," X ",8,ne)):u("",!0)])],8,se))),128))])]),e.is_super_admin?(n(),o("div",de,[t("button",{class:"btn btn-sm btn-outline-secondary mx-3",onClick:a[0]||(a[0]=(...l)=>e.pullInat&&e.pullInat(...l)),onKeydown:a[1]||(a[1]=(...l)=>e.pullInatAll&&e.pullInatAll(...l)),onKeyup:a[2]||(a[2]=(...l)=>e.resetAKeyPressed&&e.resetAKeyPressed(...l))},"Pull Inat ("+d(e.inat_new_total)+")",33)])):u("",!0),t("div",re,[t("table",ie,[ue,t("tbody",pe,[(n(!0),o(p,null,_(e.log_table_data,l=>(n(),o("tr",{key:l.id},[t("td",{textContent:d(l.id)},null,8,_e),t("td",{textContent:d(l.subject_type)},null,8,me),t("td",{textContent:d(l.subject_id)},null,8,ce),t("td",{textContent:d(e.getUserName(l.causer_id))},null,8,he),t("td",{class:"text-small",textContent:d(l.properties)},null,8,be),t("td",{textContent:d(l.event)},null,8,ye)]))),128))])])]),v(s,{show:e.show_modal,data:e.modal_data,onClose:a[3]||(a[3]=l=>e.show_modal=!1)},null,8,["show","data"])])):(n(),o("div",fe," You Need to be Logged In to View This Page ")),v(r)],64)}const ge=k(x,[["render",ve],["__scopeId","data-v-014ebca7"]]),b=E({});b.component("manage-users",ge);b.use(i);b.mount("#app");