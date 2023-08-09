import{g as f,m as y,e as D,_ as v,r as h,c as n,b as t,F as c,i as m,d as i,o as s,t as u,w as p,v as b,q as V,l as E,p as g,k as $,s as L,j as M,n as N,u as U}from"./_plugin-vue_export-helper-5f9bfec6.js";import{F as A}from"./FileUploadComponent-f9cc15af.js";const O=f({name:"ModalAddPartner",props:{show:{type:Boolean,default:!1}},components:{FileUploadComponent:A},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"select",label:"Partner Type",name:"partner_type",required:!0,options:[{label:"NGO",value:"ngo"},{label:"Research Organization",value:"research_organization"},{label:"School",value:"school"},{label:"College",value:"college"},{label:"University",value:"university"},{label:"Nature Club",value:"nature_club"},{label:"Social Media Group",value:"social_media_group"},{label:"Other",value:"other"}]},{type:"textarea",label:"Description",name:"description",required:!0},{type:"text",label:"Contact Person",name:"contact_person",required:!1},{type:"file",label:"Image",name:"image",required:!1},{type:"textarea",label:"Link",name:"link",required:!1}],form_data:{},upload_file_flag:!1}},created(){this.initFormData()},watch:{show(e){let a=document.querySelector("body");e==!0?a.classList.add("modal-open"):a.classList.remove("modal-open")}},computed:{...y({user:e=>e.auth.user})},methods:{...D({store:"partners/store"}),initFormData(){this.form_data={name:"",partner_type:"ngo",description:"",contact_person:"",image:"",link:"",user:this.user}},closeModal(){this.$emit("close")},handleUploadedFileId(e){this.form_data.image=e.data.id;try{this.store(this.form_data),this.initFormData(),this.closeModal(),this.upload_file_flag=!1}catch(a){console.error(a)}},submit(){this.upload_file_flag=!0}}}),F=e=>(g("data-v-681ee7e2"),e=e(),$(),e),j={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},z={class:"modal-dialog modal-lg"},T={class:"modal-content"},G={class:"modal-header"},R=F(()=>t("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Add Partner",-1)),X={class:"modal-body"},H=["for","textContent"],J=["onUpdate:modelValue","placeholder"],K=["onUpdate:modelValue","placeholder"],Q=["onUpdate:modelValue"],W=F(()=>t("option",null,"Select Link Type",-1)),Y=["value","textContent","selected"],Z={class:"modal-footer"},q={key:1,class:"modal-backdrop fade show"};function x(e,a,w,k,C,P){const l=h("file-upload-component");return s(),n(c,null,[e.show?(s(),n("div",j,[t("div",z,[t("div",T,[t("div",G,[R,t("button",{type:"button",class:"btn-close",onClick:a[0]||(a[0]=(...o)=>e.closeModal&&e.closeModal(...o))})]),t("div",X,[t("form",{action:"javascript:void(0)",onSubmit:a[1]||(a[1]=(...o)=>e.submit&&e.submit(...o)),class:"row",method:"post"},[(s(!0),n(c,null,m(e.form_questions,o=>(s(),n("div",{key:o.name,class:"form-group col-12"},[t("label",{for:o.name,class:"font-weight-bold",textContent:u(o.label)},null,8,H),o.type=="text"?p((s(),n("input",{key:0,type:"text","onUpdate:modelValue":r=>e.form_data[o.name]=r,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,J)),[[b,e.form_data[o.name]]]):o.type=="textarea"?p((s(),n("textarea",{key:1,"onUpdate:modelValue":r=>e.form_data[o.name]=r,placeholder:`Enter ${o.name}`,class:"form-control"},null,8,K)),[[b,e.form_data[o.name]]]):o.type=="select"?p((s(),n("select",{key:2,"onUpdate:modelValue":r=>e.form_data[o.name]=r,class:"form-select"},[W,(s(!0),n(c,null,m(o.options,r=>(s(),n("option",{key:r.value,value:r.value,textContent:u(r.label),selected:r.value=="newspaper_print"},null,8,Y))),128))],8,Q)),[[V,e.form_data[o.name]]]):o.type=="file"?(s(),E(l,{key:3,class:"form-control",type:"file",upload_file:e.upload_file_flag,folder:"partners",onUploaded_file_id:e.handleUploadedFileId},null,8,["upload_file","onUploaded_file_id"])):i("",!0)]))),128))],32)]),t("div",Z,[t("button",{type:"button",class:"btn btn-secondary",onClick:a[2]||(a[2]=(...o)=>e.closeModal&&e.closeModal(...o))},"Close"),t("button",{type:"button",class:"btn btn-success",onClick:a[3]||(a[3]=(...o)=>e.submit&&e.submit(...o))},"Save changes")])])])])):i("",!0),e.show?(s(),n("div",q)):i("",!0)],64)}const ee=v(O,[["render",x],["__scopeId","data-v-681ee7e2"]]);const te=f({name:"ModalEditPartner",props:{show:{type:Boolean,default:!1},data:{type:Object,default:()=>{}}},emits:["close"],data(){return{form_questions:[{type:"text",label:"Name",name:"name",required:!0},{type:"select",label:"Partner Type",name:"partner_type",required:!0,options:[{label:"NGO",value:"ngo"},{label:"Research Organization",value:"research_organization"},{label:"School",value:"school"},{label:"College",value:"college"},{label:"University",value:"university"},{label:"Nature Club",value:"nature_club"},{label:"Social Media Group",value:"social_media_group"},{label:"Other",value:"other"}]},{type:"textarea",label:"Description",name:"description",required:!0},{type:"text",label:"Contact Person",name:"contact_person",required:!1},{type:"textarea",label:"Link",name:"link",required:!1}],form_data:{},upload_file_flag:!1}},created(){this.initFormData()},watch:{show(e){this.initFormData();let a=document.querySelector("body");e==!0?a.classList.add("modal-open"):a.classList.remove("modal-open")}},computed:{...y({user:e=>e.auth.user})},methods:{...D({update:"partners/update"}),initFormData(){this.form_data={id:this.data.id,name:this.data.name,partner_type:this.data.partner_type,description:this.data.description,contact_person:this.data.contact_person,image:this.data.image,link:this.data.link,user:this.data.user}},closeModal(){this.$emit("close")},submit(){try{this.update(this.form_data),this.initFormData(),this.closeModal()}catch(e){console.error(e)}}}}),I=e=>(g("data-v-c8fcdb3b"),e=e(),$(),e),ae={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},oe={class:"modal-dialog modal-lg"},se={class:"modal-content"},le={class:"modal-header"},ne=I(()=>t("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Edit Partner",-1)),de={class:"modal-body"},re=["for","textContent"],ie=["onUpdate:modelValue","placeholder"],ce=["onUpdate:modelValue","placeholder"],ue=["onUpdate:modelValue"],me=I(()=>t("option",null,"Select Link Type",-1)),pe=["value","textContent","selected"],_e={class:"modal-footer"},he={key:1,class:"modal-backdrop fade show"};function be(e,a,w,k,C,P){return s(),n(c,null,[e.show?(s(),n("div",ae,[t("div",oe,[t("div",se,[t("div",le,[ne,t("button",{type:"button",class:"btn-close",onClick:a[0]||(a[0]=(...l)=>e.closeModal&&e.closeModal(...l))})]),t("div",de,[t("form",{action:"javascript:void(0)",onSubmit:a[1]||(a[1]=(...l)=>e.submit&&e.submit(...l)),class:"row",method:"post"},[(s(!0),n(c,null,m(e.form_questions,l=>(s(),n("div",{key:l.name,class:"form-group col-12"},[t("label",{for:l.name,class:"font-weight-bold",textContent:u(l.label)},null,8,re),l.type=="text"?p((s(),n("input",{key:0,type:"text","onUpdate:modelValue":o=>e.form_data[l.name]=o,placeholder:`Enter ${l.name}`,class:"form-control"},null,8,ie)),[[b,e.form_data[l.name]]]):l.type=="textarea"?p((s(),n("textarea",{key:1,"onUpdate:modelValue":o=>e.form_data[l.name]=o,placeholder:`Enter ${l.name}`,class:"form-control"},null,8,ce)),[[b,e.form_data[l.name]]]):l.type=="select"?p((s(),n("select",{key:2,"onUpdate:modelValue":o=>e.form_data[l.name]=o,class:"form-select"},[me,(s(!0),n(c,null,m(l.options,o=>(s(),n("option",{key:o.value,value:o.value,textContent:u(o.label),selected:o.value=="newspaper_print"},null,8,pe))),128))],8,ue)),[[V,e.form_data[l.name]]]):i("",!0)]))),128))],32)]),t("div",_e,[t("button",{type:"button",class:"btn btn-secondary",onClick:a[2]||(a[2]=(...l)=>e.closeModal&&e.closeModal(...l))},"Close"),t("button",{type:"button",class:"btn btn-success",onClick:a[3]||(a[3]=(...l)=>e.submit&&e.submit(...l))},"Save changes")])])])])):i("",!0),e.show?(s(),n("div",he)):i("",!0)],64)}const fe=v(te,[["render",be],["__scopeId","data-v-c8fcdb3b"]]);const ye=f({name:"ModalPartnerPoster",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{}},watch:{show(e){let a=document.querySelector("body");e==!0?a.classList.add("modal-open"):a.classList.remove("modal-open")}},computed:{...y({partners:e=>e.partners.all_data})},methods:{closeModal(){this.$emit("close")},download(){}}}),S=e=>(g("data-v-8bb541f8"),e=e(),$(),e),ve={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},ge={class:"modal-dialog modal-fullscreen"},$e={class:"modal-content"},we=S(()=>t("div",{class:"modal-header"},[t("div",{class:"logo"},[t("img",{src:"/img/mormon.jpg",alt:""})]),t("h1",{class:"modal-title",id:"exampleModalLiveLabel"},"Big Buttefly Month")],-1)),ke={class:"modal-body"},Ce=S(()=>t("div",{class:"banner"},[t("h3",null,"Celebrate the Big Butterfly Month - September 2023"),t("div",null,"Plan your events"),t("div",null,"Discuss with Collaborators"),t("div",null,"Come together for the cause of Butterflies"),t("h5",null,"Plan - Suggest - Collaborate")],-1)),Pe={class:"logo-container"},Me=["src"],Se=S(()=>t("div",{class:"footer bg-light"},[t("span",null,"bigbutterflymonth@gmail.com"),t("span",null,"bigbutterflymonth.in")],-1)),Le={class:"modal-footer d-flex justify-content-center bg-secondary"},Ue={key:1,class:"modal-backdrop fade show"};function De(e,a,w,k,C,P){return s(),n(c,null,[e.show?(s(),n("div",ve,[t("div",ge,[t("div",$e,[we,t("div",ke,[Ce,t("div",Pe,[(s(!0),n(c,null,m(e.partners,l=>(s(),n("img",{key:l.id,src:l.image_path,class:"img-fluid bg-light",alt:""},null,8,Me))),128))])]),Se,t("div",Le,[t("button",{type:"button",class:"btn btn-dark",onClick:a[0]||(a[0]=(...l)=>e.closeModal&&e.closeModal(...l))},"Close"),t("button",{type:"button",class:"btn btn-success",onClick:a[1]||(a[1]=(...l)=>e.download&&e.download(...l))},"Download")])])])])):i("",!0),e.show?(s(),n("div",Ue)):i("",!0)],64)}const Ve=v(ye,[["render",De],["__scopeId","data-v-8bb541f8"]]);const Fe=f({name:"Partners",components:{ModalAddPartner:ee,ModalEditPartner:fe,ModalPartnerPoster:Ve},data(){return{show_modal:{add:!1,edit:!1,poster:!1},selectedPartner:{}}},computed:{...y({user:e=>e.auth.user,all_data:e=>e.partners.all_data,is_admin:e=>e.auth.is_admin,is_super_admin:e=>e.auth.is_super_admin})},mounted(){L.dispatch("partners/getAllData")},methods:{gotoLink(e){e&&(this.is_admin||this.is_super_admin?confirm("Do you want to visit the partner URL?")&&window.open(e,"_blank"):window.open(e,"_blank"))},get_tags(e){return e.split(",").map(a=>a.trim())},badgeColor(e){switch(e){case"ngo":return"bg-info";case"research_organization":return"bg-info";case"school":return"bg-warning";case"college":return"bg-warning";case"university":return"bg-warning";case"nature_club":return"bg-success";case"social_media_group":return"bg-primary";case"other":return"bg-danger"}},editPartner(e){this.selectedPartner=this.all_data.find(a=>a.id==e),this.show_modal.edit=!0},deletePartner(e){confirm("Are you sure you want to delete this partner?")&&L.dispatch("partners/delete",e)}}}),Ie=e=>(g("data-v-c3bddb4c"),e=e(),$(),e),Be={class:"header d-flex px-2"},Ee=Ie(()=>t("div",{class:"h1"},"Partners",-1)),Ne={key:0},Ae={class:"main-container m-4"},Oe=["onClick"],je=["src"],ze={class:"card-body"},Te={class:"card-title"},Ge={class:"hover-btns"},Re=["onClick"],Xe=["onClick"],He={key:0,class:"card-div-tags"},Je=["textContent"];function Ke(e,a,w,k,C,P){const l=h("modal-add-partner"),o=h("modal-edit-partner"),r=h("modal-partner-poster");return s(),n(c,null,[t("div",Be,[Ee,e.user&&(e.user.user_type=="super_admin"||e.user.user_type=="admin")?(s(),n("div",Ne,[t("button",{class:"btn btn-lg btn-primary mx-5",onClick:a[0]||(a[0]=d=>e.show_modal.poster=!0),title:"Show Partner Poster"},"Partner Poster"),t("button",{class:"btn btn-lg btn-success mx-5",onClick:a[1]||(a[1]=d=>e.show_modal.add=!0),title:"Add Partner"},"+")])):i("",!0)]),t("div",Ae,[(s(!0),n(c,null,m(e.all_data,d=>(s(),n("div",{class:"card",key:d.id,onClick:_=>e.gotoLink(d.link)},[t("img",{src:d.image_path,class:"card-img-top"},null,8,je),t("div",ze,[t("h5",Te,u(d.name),1),t("span",{class:N(["card-badge badge",e.badgeColor(d.partner_type)])},u(d.partner_type),3),t("div",Ge,[e.user.user_type=="super_admin"?(s(),n("span",{key:0,class:"card-edit badge bg-primary",onClick:U(_=>e.editPartner(d.id),["stop"]),title:"Edit Partner",textContent:"✎"},null,8,Re)):i("",!0),e.user.user_type=="super_admin"?(s(),n("span",{key:1,class:"card-delete badge bg-danger",onClick:U(_=>e.deletePartner(d.id),["stop"]),title:"Delete Partner",textContent:"X"},null,8,Xe)):i("",!0)])]),d.tags?(s(),n("div",He,[(s(!0),n(c,null,m(e.get_tags(d.tags),(_,B)=>(s(),n("span",{key:B,textContent:u(_),class:"card-div-tag badge rounded-pill bg-secondary me-2 px-3 py-2"},null,8,Je))),128))])):i("",!0)],8,Oe))),128))]),M(l,{show:e.show_modal.add,onClose:a[2]||(a[2]=d=>e.show_modal.add=!1)},null,8,["show"]),M(o,{show:e.show_modal.edit,data:e.selectedPartner,onClose:a[3]||(a[3]=d=>e.show_modal.edit=!1)},null,8,["show","data"]),M(r,{show:e.show_modal.poster,onClose:a[4]||(a[4]=d=>e.show_modal.poster=!1)},null,8,["show"])],64)}const Ye=v(Fe,[["render",Ke],["__scopeId","data-v-c3bddb4c"]]);export{Ye as P};
