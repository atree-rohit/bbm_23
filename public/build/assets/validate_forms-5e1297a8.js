import{m as k,s as m,_ as g,l as h,c as o,u as C,x as v,d,b as r,F as i,r as u,q as F,o as s,t as _,n as f,h as w,f as x}from"./_plugin-vue_export-helper-03bd5b95.js";import{M as A}from"./ModalShowCountForm-db715361.js";import{B}from"./ButterflyAnimation-d351bd09.js";const D={name:"ValidateForms",components:{ModalShowCountForm:A,ButterflyAnimation:B},data(){return{headers:["id","name","location","state","district","latitude","longitude","no_of_species","date","start_time","end_time","status"],statuses:["all","pending","approved","rejected","duplicate"],selected_status:"pending",showModal:!1,selectedFormID:-1}},computed:{...k({user:e=>e.auth.user,is_super_admin:e=>e.auth.is_super_admin,all_data:e=>e.count_forms.all_data,loading:e=>e.count_forms.loading}),filtered_data(){let e=[];return this.all_data.forEach(a=>{a.date.includes("2023-09")&&e.push({...a,no_of_species:a.species_list.length})}),this.selected_status!="all"&&(e=e.filter(a=>a.status==this.selected_status)),e},selected_form(){return this.selectedFormID==-1?{}:this.all_data.find(e=>e.id==this.selectedFormID)}},watch:{},mounted(){m.dispatch("count_forms/getAllData")},methods:{selectForm(e){this.selectedFormID=e,this.showModal=!0},showApproveBtn(e){return e.status=="pending"},showDeleteBtn(e){return e.status!="approved"},tableRowColor(e){let a="table-secondary";switch(e.status){case"pending":a="table-primary";break;case"approved":a="table-success text-success";break;case"duplicate":a="table-warning";break;case"rejected":a="table-danger text-danger";break}return a},async approveForm(e){confirm("Are you sure you want to Approve this Form?")&&await m.dispatch("count_forms/approveForm",e)},async deleteForm(e){confirm("Are you sure you want to delete this Form?")&&await m.dispatch("count_forms/deleteForm",e)},closeModal(){this.selectedForm={},this.showModal=!1}}},M={class:"text"},V={class:"container-fluid validate-forms-container"},I={class:"d-flex justify-content-center bg-dark p-2"},j=["textContent","onClick"],N={class:"table table-sm"},S={class:"bg-success text-warning"},E=["textContent"],R={key:0},q={class:"table-secondary"},z=["textContent","onClick"],L={key:0,class:"bg-secondary d-flex justify-content-around"},T=["onClick"],G=["onClick"];function H(e,a,K,O,l,n){const b=h("ButterflyAnimation"),y=h("modal-show-count-form");return s(),o(i,null,[e.loading?(s(),C(b,{key:0},{default:v(()=>[r("div",M,_(e.loading),1)]),_:1})):d("",!0),r("div",V,[r("div",I,[(s(!0),o(i,null,u(l.statuses,t=>(s(),o("button",{key:t,class:f(["btn btn-sm",t==l.selected_status?"btn-success":"btn-outline-success bg-light"]),textContent:_(t),onClick:c=>l.selected_status=t},null,10,j))),128))]),r("table",N,[r("thead",S,[r("tr",null,[(s(!0),o(i,null,u(l.headers,t=>(s(),o("th",{key:t,textContent:_(t)},null,8,E))),128)),e.is_super_admin?(s(),o("th",R,"Actions")):d("",!0)])]),r("tbody",q,[(s(!0),o(i,null,u(n.filtered_data,t=>(s(),o("tr",{key:t.id,class:f(n.tableRowColor(t))},[(s(!0),o(i,null,u(l.headers,c=>(s(),o("td",{key:c,textContent:_(t[c]),onClick:P=>n.selectForm(t.id)},null,8,z))),128)),e.is_super_admin?(s(),o("td",L,[n.showApproveBtn(t)?(s(),o("button",{key:0,class:"btn btn-sm btn-success",onClick:c=>n.approveForm(t)}," Approve ",8,T)):d("",!0),w("   "),n.showDeleteBtn(t)?(s(),o("button",{key:1,class:"btn btn-sm btn-danger",onClick:c=>n.deleteForm(t)}," Delete ",8,G)):d("",!0)])):d("",!0)],2))),128))])])]),F(y,{show:l.showModal,form_data:n.selected_form,onClose:n.closeModal},null,8,["show","form_data","onClose"])],64)}const J=g(D,[["render",H],["__scopeId","data-v-952ddbf0"]]),p=x({});p.component("ValidateForms",J);p.use(m);p.mount("#app");