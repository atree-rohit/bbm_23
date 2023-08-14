import{g as b,m as h,e as S,_ as y,r as g,c as l,b as a,F as n,i as c,d as r,o as s,t as i,w as p,v as f,q as F,l as L,p as v,k,s as m,j as V,n as A,u as I,f as D}from"./_plugin-vue_export-helper-ecf7da26.js";import{F as B}from"./FileUploadComponent-fd0120f7.js";const T=b({name:"ModalAddResource",props:{show:{type:Boolean,default:!1}},components:{FileUploadComponent:B},emits:["close"],data(){return{form_questions:[{type:"text",label:"Title",name:"title",required:!0},{type:"textarea",label:"Link URL",name:"link",required:!0},{type:"select",label:"Resource Type",name:"resource_type",required:!0,options:[{label:"Video",value:"video"},{label:"Presentation",value:"presentation"},{label:"E-book",value:"e-book"},{label:"Website",value:"website"},{label:"Other",value:"other"}]},{type:"file",label:"Image / File (max 2MB)",name:"image",required:!1},{type:"textarea",label:"Description",name:"description",required:!1},{type:"text",label:"Tags",name:"tags",required:!1}],form_data:{},upload_file_flag:!1}},created(){this.initFormData()},watch:{show(e){let o=document.querySelector("body");e==!0?o.classList.add("modal-open"):o.classList.remove("modal-open")}},computed:{...h({user:e=>e.auth.user})},methods:{...S({store:"resources/store"}),initFormData(){this.form_data={title:"",link:"",resource_type:"video",image:null,description:"",tags:"",user:this.user}},closeModal(){this.$emit("close")},handleUploadedFileId(e){e!=null&&(this.form_data.image=e.data.id);try{this.store(this.form_data),this.closeModal(),this.initFormData(),this.upload_file_flag=!1}catch(o){console.error(o)}},submit(){this.upload_file_flag=!0}}}),w=e=>(v("data-v-1ccba9bb"),e=e(),k(),e),E={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},N={class:"modal-dialog modal-lg"},j={class:"modal-content"},z={class:"modal-header"},O=w(()=>a("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add Resource",-1)),P={class:"modal-body"},W=["for","textContent"],X=["onUpdate:modelValue","placeholder"],G=["onUpdate:modelValue","placeholder"],H=["onUpdate:modelValue"],J=w(()=>a("option",null,"Select Link Type",-1)),K=["value","textContent","selected"],Q={class:"modal-footer"},Y={key:1,class:"modal-backdrop fade show"};function Z(e,o,$,C,M,R){const u=g("file-upload-component");return s(),l(n,null,[e.show?(s(),l("div",E,[a("div",N,[a("div",j,[a("div",z,[O,a("button",{type:"button",class:"btn-close",onClick:o[0]||(o[0]=(...t)=>e.closeModal&&e.closeModal(...t))})]),a("div",P,[a("form",{action:"javascript:void(0)",onSubmit:o[1]||(o[1]=(...t)=>e.submit&&e.submit(...t)),class:"row",method:"post"},[(s(!0),l(n,null,c(e.form_questions,t=>(s(),l("div",{key:t.name,class:"form-group col-12"},[a("label",{for:t.name,class:"font-weight-bold",textContent:i(t.label)},null,8,W),t.type=="text"?p((s(),l("input",{key:0,type:"text","onUpdate:modelValue":d=>e.form_data[t.name]=d,placeholder:`Enter ${t.name}`,class:"form-control"},null,8,X)),[[f,e.form_data[t.name]]]):t.type=="textarea"?p((s(),l("textarea",{key:1,"onUpdate:modelValue":d=>e.form_data[t.name]=d,placeholder:`Enter ${t.name}`,class:"form-control"},null,8,G)),[[f,e.form_data[t.name]]]):t.type=="select"?p((s(),l("select",{key:2,"onUpdate:modelValue":d=>e.form_data[t.name]=d,class:"form-select"},[J,(s(!0),l(n,null,c(t.options,d=>(s(),l("option",{key:d.value,value:d.value,textContent:i(d.label),selected:d.value=="newspaper_print"},null,8,K))),128))],8,H)),[[F,e.form_data[t.name]]]):t.type=="file"?(s(),L(u,{key:3,class:"form-control",type:"file",upload_file:e.upload_file_flag,folder:"resources",onUploaded_file_id:e.handleUploadedFileId},null,8,["upload_file","onUploaded_file_id"])):r("",!0)]))),128))],32)]),a("div",Q,[a("button",{type:"button",class:"btn btn-secondary",onClick:o[2]||(o[2]=(...t)=>e.closeModal&&e.closeModal(...t))},"Close"),a("button",{type:"button",class:"btn btn-success",onClick:o[3]||(o[3]=(...t)=>e.submit&&e.submit(...t))},"Save changes")])])])])):r("",!0),e.show?(s(),l("div",Y)):r("",!0)],64)}const q=y(T,[["render",Z],["__scopeId","data-v-1ccba9bb"]]);const x=b({name:"Resources",components:{ModalAddResource:q},data(){return{show_modal:!1}},computed:{...h({user:e=>e.auth.user,all_data:e=>e.resources.all_data})},mounted(){m.dispatch("resources/getAllData")},methods:{gotoLink(e){e.link?window.open(e.link,"_blank"):window.open(e.image_path,"_blank")},get_tags(e){return e.split(",").map(o=>o.trim())},badgeColor(e){switch(e){case"video":return"bg-info";case"presentation":return"bg-success";case"e-book":return"bg-primary";case"website":return"bg-warning";case"other":return"bg-danger"}},deleteResource(e){confirm("Are you sure you want to delete this Resource?")&&m.dispatch("resources/delete",e)}}}),ee=e=>(v("data-v-f6f22867"),e=e(),k(),e),te={class:"header d-flex px-2"},oe=ee(()=>a("div",{class:"h1"},"Resources",-1)),ae={key:0},se={class:"main-container m-4"},le=["onClick"],de=["src"],ne={class:"card-body"},re={class:"card-title"},ie=["onClick"],ce={key:0,class:"press-link-tags"},ue=["textContent"];function pe(e,o,$,C,M,R){const u=g("modal-add-resource");return s(),l(n,null,[a("div",te,[oe,e.user&&(e.user.user_type=="super_admin"||e.user.user_type=="admin")?(s(),l("div",ae,[a("button",{class:"btn btn-lg btn-success mx-5",onClick:o[0]||(o[0]=t=>e.show_modal=!0),title:"Add Resource"},"+")])):r("",!0)]),a("div",se,[(s(!0),l(n,null,c(e.all_data,t=>(s(),l("div",{class:"card",key:t.id,onClick:d=>e.gotoLink(t)},[a("img",{src:t.image_path,class:"card-img-top"},null,8,de),a("div",ne,[a("h5",re,i(t.title),1),a("span",{class:A(["card-badge badge",e.badgeColor(t.resource_type)])},i(t.resource_type),3),e.user.user_type=="super_admin"?(s(),l("span",{key:0,class:"card-delete badge bg-danger",onClick:I(d=>e.deleteResource(t.id),["stop"])}," X ",8,ie)):r("",!0)]),t.tags?(s(),l("div",ce,[(s(!0),l(n,null,c(e.get_tags(t.tags),(d,U)=>(s(),l("span",{key:U,textContent:i(d),class:"press-link-tag badge rounded-pill bg-secondary me-2 px-3 py-2"},null,8,ue))),128))])):r("",!0)],8,le))),128))]),V(u,{show:e.show_modal,onClose:o[1]||(o[1]=t=>e.show_modal=!1)},null,8,["show"])],64)}const me=y(x,[["render",pe],["__scopeId","data-v-f6f22867"]]),_=D({});_.component("resources",me);_.use(m);_.mount("#app");
