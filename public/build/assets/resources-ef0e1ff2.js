import{g as E,m as k,e as x,_ as w,r as v,c as l,b as s,F as u,i as h,d as c,o as a,t as m,w as _,v as y,q as L,l as D,p as C,k as $,s as g,j as R,n as I,u as U,f as T}from"./_plugin-vue_export-helper-b37af2af.js";import{F as A}from"./FileUploadComponent-a1f20a29.js";const B=E({name:"ModalAddResource",props:{show:{type:Boolean,default:!1}},components:{FileUploadComponent:A},emits:["close"],data(){return{form_questions:[{type:"text",label:"Title",name:"title",required:!0},{type:"textarea",label:"Link URL",name:"link",required:!0},{type:"select",label:"Resource Type",name:"resource_type",required:!0,options:[{label:"Video",value:"video"},{label:"Presentation",value:"presentation"},{label:"E-book",value:"e-book"},{label:"Website",value:"website"},{label:"Other",value:"other"}]},{type:"file",label:"Image / File (max 2MB)",name:"image",required:!1},{type:"textarea",label:"Description",name:"description",required:!1},{type:"text",label:"Tags",name:"tags",required:!1}],form_data:{},upload_file_flag:!1}},created(){this.initFormData()},watch:{show(e){let t=document.querySelector("body");e==!0?t.classList.add("modal-open"):t.classList.remove("modal-open")}},computed:{...k({user:e=>e.auth.user})},methods:{...x({store:"resources/store"}),initFormData(){this.form_data={title:"",link:"",resource_type:"video",image:null,description:"",tags:"",user:this.user}},closeModal(){this.$emit("close")},handleUploadedFileId(e){e!=null&&(this.form_data.image=e.data.id);try{this.store(this.form_data),this.closeModal(),this.initFormData(),this.upload_file_flag=!1}catch(t){console.error(t)}},submit(){this.upload_file_flag=!0}}}),V=e=>(C("data-v-1ccba9bb"),e=e(),$(),e),j={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},N={class:"modal-dialog modal-lg"},O={class:"modal-content"},P={class:"modal-header"},W=V(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add Resource",-1)),z={class:"modal-body"},X=["for","textContent"],G=["onUpdate:modelValue","placeholder"],H=["onUpdate:modelValue","placeholder"],J=["onUpdate:modelValue"],K=V(()=>s("option",null,"Select Link Type",-1)),Q=["value","textContent","selected"],Y={class:"modal-footer"},Z={key:1,class:"modal-backdrop fade show"};function q(e,t,p,b,r,i){const d=v("file-upload-component");return a(),l(u,null,[e.show?(a(),l("div",j,[s("div",N,[s("div",O,[s("div",P,[W,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...o)=>e.closeModal&&e.closeModal(...o))})]),s("div",z,[s("form",{action:"javascript:void(0)",onSubmit:t[1]||(t[1]=(...o)=>e.submit&&e.submit(...o)),class:"row",method:"post"},[(a(!0),l(u,null,h(e.form_questions,o=>(a(),l("div",{key:o.name,class:"form-group col-12"},[s("label",{for:o.name,class:"font-weight-bold",textContent:m(o.label)},null,8,X),o.type=="text"?_((a(),l("input",{key:0,type:"text","onUpdate:modelValue":n=>e.form_data[o.name]=n,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,G)),[[y,e.form_data[o.name]]]):o.type=="textarea"?_((a(),l("textarea",{key:1,"onUpdate:modelValue":n=>e.form_data[o.name]=n,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,H)),[[y,e.form_data[o.name]]]):o.type=="select"?_((a(),l("select",{key:2,"onUpdate:modelValue":n=>e.form_data[o.name]=n,class:"form-select"},[K,(a(!0),l(u,null,h(o.options,n=>(a(),l("option",{key:n.value,value:n.value,textContent:m(n.label),selected:n.value=="newspaper_print"},null,8,Q))),128))],8,J)),[[L,e.form_data[o.name]]]):o.type=="file"?(a(),D(d,{key:3,class:"form-control",type:"file",upload_file:e.upload_file_flag,folder:"resources",onUploaded_file_id:e.handleUploadedFileId},null,8,["upload_file","onUploaded_file_id"])):c("",!0)]))),128))],32)]),s("div",Y,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[2]||(t[2]=(...o)=>e.closeModal&&e.closeModal(...o))},"Close"),s("button",{type:"button",class:"btn btn-success",onClick:t[3]||(t[3]=(...o)=>e.submit&&e.submit(...o))},"Save changes")])])])])):c("",!0),e.show?(a(),l("div",Z)):c("",!0)],64)}const ee=w(B,[["render",q],["__scopeId","data-v-1ccba9bb"]]);const te={name:"ModalEditResource",props:{show:{type:Boolean,default:!1},data:{type:Object,default:()=>{}}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Title",name:"title",required:!0},{type:"textarea",label:"Link URL",name:"link",required:!0},{type:"select",label:"Resource Type",name:"resource_type",required:!0,options:[{label:"Video",value:"video"},{label:"Presentation",value:"presentation"},{label:"E-book",value:"e-book"},{label:"Website",value:"website"},{label:"Other",value:"other"}]},{type:"textarea",label:"Description",name:"description",required:!1},{type:"text",label:"Tags",name:"tags",required:!1}],form_data:{}}},mounted(){this.initFormData()},watch:{show(e){this.initFormData();let t=document.querySelector("body");e==!0?t.classList.add("modal-open"):t.classList.remove("modal-open")}},computed:{...k({user:e=>e.auth.user})},methods:{...x({update:"resources/update"}),initFormData(){this.form_data={id:this.data.id,title:this.data.title,link:this.data.link,resource_type:this.data.resource_type,description:this.data.description,tags:this.data.tags,user:this.data.user}},closeModal(){this.$emit("close")},submit(){try{this.update(this.form_data),this.initFormData(),this.closeModal()}catch(e){console.error(e)}}}},S=e=>(C("data-v-f795701d"),e=e(),$(),e),oe={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},ae={class:"modal-dialog modal-lg"},se={class:"modal-content"},le={class:"modal-header"},de=S(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Edit Resource",-1)),ne={class:"modal-body"},re=["for","textContent"],ie=["onUpdate:modelValue","placeholder"],ce=["onUpdate:modelValue","placeholder"],ue=["onUpdate:modelValue"],me=S(()=>s("option",null,"Select Link Type",-1)),pe=["value","textContent","selected"],_e={class:"modal-footer"},he={key:1,class:"modal-backdrop fade show"};function be(e,t,p,b,r,i){return a(),l(u,null,[p.show?(a(),l("div",oe,[s("div",ae,[s("div",se,[s("div",le,[de,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...d)=>i.closeModal&&i.closeModal(...d))})]),s("div",ne,[s("form",{action:"javascript:void(0)",onSubmit:t[1]||(t[1]=(...d)=>i.submit&&i.submit(...d)),class:"row",method:"post"},[(a(!0),l(u,null,h(r.form_questions,d=>(a(),l("div",{key:d.name,class:"form-group col-12"},[s("label",{for:d.name,class:"font-weight-bold",textContent:m(d.label)},null,8,re),d.type=="text"?_((a(),l("input",{key:0,type:"text","onUpdate:modelValue":o=>r.form_data[d.name]=o,placeholder:`Enter ${d.name}`,class:"form-control"},null,8,ie)),[[y,r.form_data[d.name]]]):d.type=="textarea"?_((a(),l("textarea",{key:1,"onUpdate:modelValue":o=>r.form_data[d.name]=o,placeholder:`Enter ${d.name}`,class:"form-control"},null,8,ce)),[[y,r.form_data[d.name]]]):d.type=="select"?_((a(),l("select",{key:2,"onUpdate:modelValue":o=>r.form_data[d.name]=o,class:"form-select"},[me,(a(!0),l(u,null,h(d.options,o=>(a(),l("option",{key:o.value,value:o.value,textContent:m(o.label),selected:o.value=="newspaper_print"},null,8,pe))),128))],8,ue)),[[L,r.form_data[d.name]]]):c("",!0)]))),128))],32)]),s("div",_e,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[2]||(t[2]=(...d)=>i.closeModal&&i.closeModal(...d))},"Close"),s("button",{type:"button",class:"btn btn-success",onClick:t[3]||(t[3]=(...d)=>i.submit&&i.submit(...d))},"Save changes")])])])])):c("",!0),p.show?(a(),l("div",he)):c("",!0)],64)}const fe=w(te,[["render",be],["__scopeId","data-v-f795701d"]]);const ye={name:"Resources",components:{ModalAddResource:ee,ModalEditResource:fe},data(){return{show_modal:{add:!1,edit:!1},selected_resource:{}}},computed:{...k({user:e=>e.auth.user,all_data:e=>e.resources.all_data})},mounted(){g.dispatch("resources/getAllData")},methods:{gotoLink(e){e.link?window.open(e.link,"_blank"):window.open(e.image_path,"_blank")},get_tags(e){return e.split(",").map(t=>t.trim())},badgeColor(e){switch(e){case"video":return"bg-info";case"presentation":return"bg-success";case"e-book":return"bg-primary";case"website":return"bg-warning";case"other":return"bg-danger"}},youtubeThumbnail(e){let t="";if(e.link.includes("youtube.com")){const p=/[?&]v=([^&#]+)/;let b="";const r=e.link.match(p);r&&r[1]&&(b=r[1]),t=`https://img.youtube.com/vi/${b}/0.jpg`}return console.log(t),t},editResource(e){this.selected_resource=this.all_data.find(t=>t.id==e),this.show_modal.edit=!0},deleteResource(e){confirm("Are you sure you want to delete this Resource?")&&g.dispatch("resources/delete",e)}}},ve=e=>(C("data-v-5fbe245f"),e=e(),$(),e),ge={class:"header d-flex px-2"},ke=ve(()=>s("div",{class:"h1"},"Resources",-1)),we={key:0},Ce={class:"main-container m-4"},$e=["onClick"],Me=["src"],Re=["src"],Ue={class:"card-body"},xe={class:"card-title"},Le={class:"hover-btns"},Ve=["onClick"],Se=["onClick"],Fe={key:2,class:"press-link-tags"},Ee=["textContent"];function De(e,t,p,b,r,i){const d=v("modal-edit-resource"),o=v("modal-add-resource");return a(),l(u,null,[s("div",ge,[ke,e.user&&(e.user.user_type=="super_admin"||e.user.user_type=="admin")?(a(),l("div",we,[s("button",{class:"btn btn-lg btn-success mx-5",onClick:t[0]||(t[0]=n=>r.show_modal.add=!0),title:"Add Resource"},"+")])):c("",!0)]),s("div",Ce,[(a(!0),l(u,null,h(e.all_data,n=>(a(),l("div",{class:"card",key:n.id,onClick:f=>i.gotoLink(n)},[n.resource_type=="video"?(a(),l("img",{key:0,src:i.youtubeThumbnail(n),class:"card-img-top"},null,8,Me)):(a(),l("img",{key:1,src:n.image_path,class:"card-img-top"},null,8,Re)),s("div",Ue,[s("h5",xe,m(n.title),1),s("span",{class:I(["card-badge badge",i.badgeColor(n.resource_type)])},m(n.resource_type),3),s("div",Le,[e.user.user_type=="super_admin"?(a(),l("span",{key:0,class:"card-edit badge bg-primary",onClick:U(f=>i.editResource(n.id),["stop"]),title:"Edit Resource",textContent:"✎"},null,8,Ve)):c("",!0),e.user.user_type=="super_admin"?(a(),l("span",{key:1,class:"card-delete badge bg-danger",onClick:U(f=>i.deleteResource(n.id),["stop"])}," X ",8,Se)):c("",!0)])]),n.tags?(a(),l("div",Fe,[(a(!0),l(u,null,h(i.get_tags(n.tags),(f,F)=>(a(),l("span",{key:F,textContent:m(f),class:"press-link-tag badge rounded-pill bg-secondary me-2 px-3 py-2"},null,8,Ee))),128))])):c("",!0)],8,$e))),128))]),R(d,{show:r.show_modal.edit,data:r.selected_resource,onClose:t[1]||(t[1]=n=>r.show_modal.edit=!1)},null,8,["show","data"]),R(o,{show:r.show_modal.add,onClose:t[2]||(t[2]=n=>r.show_modal.add=!1)},null,8,["show"])],64)}const Ie=w(ye,[["render",De],["__scopeId","data-v-5fbe245f"]]),M=T({});M.component("resources",Ie);M.use(g);M.mount("#app");
