import{h as f,m as b,e as S,_ as y,i as g,c as l,b as s,F as n,r as c,d as r,o as a,t as i,w as p,v as h,n as L,l as V,p as v,k,s as m,j as A,q as F,u as I,g as D}from"./_plugin-vue_export-helper-644e73f6.js";import{F as B}from"./FileUploadComponent-ab9a4621.js";const T=f({name:"ModalAddResource",props:{show:{type:Boolean,default:!1}},components:{FileUploadComponent:B},emits:["close"],data(){return{form_questions:[{type:"text",label:"Title",name:"title",required:!0},{type:"textarea",label:"Link URL",name:"link",required:!0},{type:"select",label:"Resource Type",name:"resource_type",required:!0,options:[{label:"Video",value:"video"},{label:"Presentation",value:"presentation"},{label:"E-book",value:"e-book"},{label:"Website",value:"website"},{label:"Other",value:"other"}]},{type:"file",label:"Image",name:"image",required:!1},{type:"textarea",label:"Description",name:"description",required:!1},{type:"text",label:"Tags",name:"tags",required:!1}],form_data:{},upload_file_flag:!1}},created(){this.initFormData()},watch:{show(e){let t=document.querySelector("body");e==!0?t.classList.add("modal-open"):t.classList.remove("modal-open")}},computed:{...b({user:e=>e.auth.user})},methods:{...S({store:"resources/store"}),initFormData(){this.form_data={title:"",link:"",resource_type:"video",image:null,description:"",tags:"",user:this.user}},closeModal(){this.$emit("close")},handleUploadedFileId(e){e!=null&&(this.form_data.image=e.data.id);try{this.store(this.form_data),this.closeModal(),this.initFormData(),this.upload_file_flag=!1}catch(t){console.error(t)}},submit(){this.upload_file_flag=!0}}}),$=e=>(v("data-v-ae0bd91d"),e=e(),k(),e),E={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},N={class:"modal-dialog modal-lg"},j={class:"modal-content"},z={class:"modal-header"},O=$(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add Resource",-1)),P={class:"modal-body"},W=["for","textContent"],X=["onUpdate:modelValue","placeholder"],G=["onUpdate:modelValue","placeholder"],H=["onUpdate:modelValue"],J=$(()=>s("option",null,"Select Link Type",-1)),K=["value","textContent","selected"],Q={class:"modal-footer"},Y={key:1,class:"modal-backdrop fade show"};function Z(e,t,w,C,R,M){const u=g("file-upload-component");return a(),l(n,null,[e.show?(a(),l("div",E,[s("div",N,[s("div",j,[s("div",z,[O,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...o)=>e.closeModal&&e.closeModal(...o))})]),s("div",P,[s("form",{action:"javascript:void(0)",onSubmit:t[1]||(t[1]=(...o)=>e.submit&&e.submit(...o)),class:"row",method:"post"},[(a(!0),l(n,null,c(e.form_questions,o=>(a(),l("div",{key:o.name,class:"form-group col-12"},[s("label",{for:o.name,class:"font-weight-bold",textContent:i(o.label)},null,8,W),o.type=="text"?p((a(),l("input",{key:0,type:"text","onUpdate:modelValue":d=>e.form_data[o.name]=d,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,X)),[[h,e.form_data[o.name]]]):o.type=="textarea"?p((a(),l("textarea",{key:1,"onUpdate:modelValue":d=>e.form_data[o.name]=d,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,G)),[[h,e.form_data[o.name]]]):o.type=="select"?p((a(),l("select",{key:2,"onUpdate:modelValue":d=>e.form_data[o.name]=d,class:"form-select"},[J,(a(!0),l(n,null,c(o.options,d=>(a(),l("option",{key:d.value,value:d.value,textContent:i(d.label),selected:d.value=="newspaper_print"},null,8,K))),128))],8,H)),[[L,e.form_data[o.name]]]):o.type=="file"?(a(),V(u,{key:3,class:"form-control",type:"file",upload_file:e.upload_file_flag,folder:"resources",onUploaded_file_id:e.handleUploadedFileId},null,8,["upload_file","onUploaded_file_id"])):r("",!0)]))),128))],32)]),s("div",Q,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[2]||(t[2]=(...o)=>e.closeModal&&e.closeModal(...o))},"Close"),s("button",{type:"button",class:"btn btn-success",onClick:t[3]||(t[3]=(...o)=>e.submit&&e.submit(...o))},"Save changes")])])])])):r("",!0),e.show?(a(),l("div",Y)):r("",!0)],64)}const q=y(T,[["render",Z],["__scopeId","data-v-ae0bd91d"]]);const x=f({name:"Resources",components:{ModalAddResource:q},data(){return{show_modal:!1}},computed:{...b({user:e=>e.auth.user,all_data:e=>e.resources.all_data})},mounted(){m.dispatch("resources/getAllData")},methods:{gotoLink(e){window.open(e,"_blank")},get_tags(e){return e.split(",").map(t=>t.trim())},badgeColor(e){switch(e){case"video":return"bg-info";case"presentation":return"bg-success";case"e-book":return"bg-primary";case"website":return"bg-warning";case"other":return"bg-danger"}},deleteResource(e){confirm("Are you sure you want to delete this Resource?")&&m.dispatch("resources/delete",e)}}}),ee=e=>(v("data-v-9648a917"),e=e(),k(),e),oe={class:"header d-flex px-2"},te=ee(()=>s("div",{class:"h1"},"Resources",-1)),se={key:0},ae={class:"main-container m-4"},le=["onClick"],de=["src"],ne={class:"card-body"},re={class:"card-title"},ie=["onClick"],ce={key:0,class:"press-link-tags"},ue=["textContent"];function pe(e,t,w,C,R,M){const u=g("modal-add-resource");return a(),l(n,null,[s("div",oe,[te,e.user&&(e.user.user_type=="super_admin"||e.user.user_type=="admin")?(a(),l("div",se,[s("button",{class:"btn btn-lg btn-success mx-5",onClick:t[0]||(t[0]=o=>e.show_modal=!0)},"Add Resource")])):r("",!0)]),s("div",ae,[(a(!0),l(n,null,c(e.all_data,o=>(a(),l("div",{class:"card",key:o.id,onClick:d=>e.gotoLink(o.link)},[s("img",{src:o.image_path,class:"card-img-top"},null,8,de),s("div",ne,[s("h5",re,i(o.title),1),s("span",{class:F(["card-badge badge",e.badgeColor(o.resource_type)])},i(o.resource_type),3),e.user.user_type=="super_admin"?(a(),l("span",{key:0,class:"card-delete badge bg-danger",onClick:I(d=>e.deleteResource(o.id),["stop"])}," X ",8,ie)):r("",!0)]),o.tags?(a(),l("div",ce,[(a(!0),l(n,null,c(e.get_tags(o.tags),(d,U)=>(a(),l("span",{key:U,textContent:i(d),class:"press-link-tag badge rounded-pill bg-secondary me-2 px-3 py-2"},null,8,ue))),128))])):r("",!0)],8,le))),128))]),A(u,{show:e.show_modal,onClose:t[1]||(t[1]=o=>e.show_modal=!1)},null,8,["show"])],64)}const me=y(x,[["render",pe],["__scopeId","data-v-9648a917"]]),_=D({});_.component("resources",me);_.use(m);_.mount("#app");