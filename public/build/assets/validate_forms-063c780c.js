import{m as y,_ as C,c as t,b as n,F as r,j as u,d as i,n as f,o as s,t as m,p as k,i as F,s as p,r as g,k as w,h as x,f as S}from"./_plugin-vue_export-helper-13c6137d.js";const A={name:"ModalShowCountForm",props:{show:{type:Boolean,default:!1},form_data:{type:Object,default:()=>{}}},emits:["close"],data(){return{fields:{form:["name","affiliation","phone","email","team_members","open_access","location","state","district","latitude","longitude","date","start_time","end_time","altitude","distance","weather","photo_link","status","comments"],species:["common_name","scientific_name","individuals","remarks","status"]},statuses:["pending","approved","duplicate","rejected"]}},computed:{...y({is_super_admin:e=>e.auth.is_super_admin,is_admin:e=>e.auth.is_admin,user:e=>e.auth.user}),admin(){return this.is_super_admin||this.is_admin},unvalidated_species_flag(){const e=[...new Set(this.form_data.species_list.map(l=>l.status))];return e.length==1&&e[0]=="approved"}},methods:{formClassColor(){let e="danger";return this.form_data.status=="approved"&&(e="info"),e},speciesTableClassColor(){return this.unvalidated_species_flag?"bg-success":"bg-danger"},speciesTableRowColor(e){return e.status=="approved"?"table-success":"table-danger"},setSpeciesStatus(e,l){let _={species_id:e.id,status:l};this.$store.dispatch("count_forms/setSpeciesStatus",_)},setFormStatus(e){let l={form_id:this.form_data.id,status:e};this.$store.dispatch("count_forms/setFormStatus",l)},validateAllSpecies(){this.form_data.species_list.filter(e=>e.status=="pending").forEach(e=>this.setSpeciesStatus(e,"approved"))},async deleteForm(){confirm("Are you sure you want to delete this Form?")&&(this.$emit("close"),await this.$store.dispatch("count_forms/deleteForm",this.form_data))},closeModal(){this.$emit("close")}}},M=e=>(k("data-v-4d341abe"),e=e(),F(),e),D={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},I={class:"modal-dialog modal-xl"},V={class:"modal-content"},B={class:"modal-header"},j={key:0,class:"border border-success text-center m-1 p-2 w-75"},T={key:0,class:"d-flex justify-content-center"},N=["textContent","onClick"],E={key:1,class:""},R={class:"modal-body"},z={class:"table table-sm form-table"},L=["textContent"],O=["textContent"],q={class:"table table-sm species-table"},G=["textContent"],H=M(()=>n("th",{class:"bg-dark"},"Actions",-1)),J=["textContent"],K={key:0,class:"d-flex justify-content-around bg-secondary"},P=["textContent","onClick"],Q={class:"modal-footer"},U={key:1,class:"modal-backdrop fade show"};function W(e,l,_,v,c,a){return s(),t(r,null,[_.show?(s(),t("div",D,[n("div",I,[n("div",V,[n("div",B,[a.admin?(s(),t("div",j,[a.unvalidated_species_flag?(s(),t("div",T,[(s(!0),t(r,null,u(c.statuses,o=>(s(),t("div",{key:o,class:"mx-2"},[o!=_.form_data.status?(s(),t("button",{key:0,class:"btn btn-success btn-sm",textContent:m(o),onClick:d=>a.setFormStatus(o)},null,8,N)):i("",!0)]))),128))])):(s(),t("div",E,[n("button",{class:"btn btn-success",onClick:l[0]||(l[0]=(...o)=>a.validateAllSpecies&&a.validateAllSpecies(...o))},"Validate All Species")])),n("button",{class:"btn btn-danger",onClick:l[1]||(l[1]=(...o)=>a.deleteForm&&a.deleteForm(...o))},"Delete Form")])):i("",!0),n("button",{type:"button",class:"btn-close",onClick:l[2]||(l[2]=(...o)=>a.closeModal&&a.closeModal(...o))})]),n("div",R,[n("table",z,[n("tbody",null,[(s(!0),t(r,null,u(c.fields.form,o=>(s(),t("tr",{key:o},[n("th",{textContent:m(o),class:f(`bg-${a.formClassColor()}`)},null,10,L),n("td",{textContent:m(_.form_data[o]),class:f(`table-${a.formClassColor()}`)},null,10,O)]))),128))])]),n("table",q,[n("thead",{class:f(["text-light",a.speciesTableClassColor()])},[n("tr",null,[(s(!0),t(r,null,u(c.fields.species,o=>(s(),t("th",{key:o,textContent:m(o)},null,8,G))),128)),H])],2),n("tbody",null,[(s(!0),t(r,null,u(_.form_data.species_list,o=>(s(),t("tr",{key:o.id,class:f(a.speciesTableRowColor(o))},[(s(!0),t(r,null,u(c.fields.species,d=>(s(),t("td",{key:d,textContent:m(o[d])},null,8,J))),128)),a.admin?(s(),t("td",K,[(s(!0),t(r,null,u(c.statuses,d=>(s(),t("div",{key:d},[d!=o.status?(s(),t("button",{key:0,class:"btn btn-success btn-sm",textContent:m(d),onClick:h=>a.setSpeciesStatus(o,d)},null,8,P)):i("",!0)]))),128))])):i("",!0)],2))),128))])])]),n("div",Q,[n("button",{type:"button",class:"btn btn-secondary",onClick:l[3]||(l[3]=(...o)=>a.closeModal&&a.closeModal(...o))},"Close")])])])])):i("",!0),_.show?(s(),t("div",U)):i("",!0)],64)}const X=C(A,[["render",W],["__scopeId","data-v-4d341abe"]]);const Y={name:"ValidateForms",components:{ModalShowCountForm:X},data(){return{headers:["name","location","state","district","latitude","longitude","no_of_species","date","start_time","end_time","status"],showModal:!1,selectedFormID:-1}},computed:{...y({user:e=>e.auth.user,is_super_admin:e=>e.auth.is_super_admin,all_data:e=>e.count_forms.all_data}),filtered_data(){let e=[];return this.all_data.forEach(l=>{l.date.includes("2023-09")&&e.push({...l,no_of_species:l.species_list.length})}),e},selected_form(){return this.selectedFormID==-1?{}:this.all_data.find(e=>e.id==this.selectedFormID)}},watch:{},mounted(){p.dispatch("count_forms/getAllData")},methods:{selectForm(e){this.selectedFormID=e,this.showModal=!0},showApproveBtn(e){return e.status=="pending"},showDeleteBtn(e){return e.status!="approved"},async approveForm(e){confirm("Are you sure you want to Approve this Form?")&&await p.dispatch("count_forms/approveForm",e)},async deleteForm(e){confirm("Are you sure you want to delete this Form?")&&await p.dispatch("count_forms/deleteForm",e)},closeModal(){this.selectedForm={},this.showModal=!1}}},Z={class:"container-fluid my-2 validate-forms-container"},$={class:"table table-sm"},ee={class:"bg-success text-warning"},te=["textContent"],se={key:0},oe={class:"table-secondary"},ae=["textContent","onClick"],ne={key:0,class:"bg-secondary d-flex justify-content-around"},le=["onClick"],de=["onClick"];function re(e,l,_,v,c,a){const o=g("modal-show-count-form");return s(),t(r,null,[n("div",Z,[n("table",$,[n("thead",ee,[n("tr",null,[(s(!0),t(r,null,u(c.headers,d=>(s(),t("th",{key:d,textContent:m(d)},null,8,te))),128)),e.is_super_admin?(s(),t("th",se,"Actions")):i("",!0)])]),n("tbody",oe,[(s(!0),t(r,null,u(a.filtered_data,d=>(s(),t("tr",{key:d.id},[(s(!0),t(r,null,u(c.headers,h=>(s(),t("td",{key:h,textContent:m(d[h]),onClick:ce=>a.selectForm(d.id)},null,8,ae))),128)),e.is_super_admin?(s(),t("td",ne,[a.showApproveBtn(d)?(s(),t("button",{key:0,class:"btn btn-sm btn-success",onClick:h=>a.approveForm(d)}," Approve ",8,le)):i("",!0),x("   "),a.showDeleteBtn(d)?(s(),t("button",{key:1,class:"btn btn-sm btn-danger",onClick:h=>a.deleteForm(d)}," Delete ",8,de)):i("",!0)])):i("",!0)]))),128))])])]),w(o,{show:c.showModal,form_data:a.selected_form,onClose:a.closeModal},null,8,["show","form_data","onClose"])],64)}const ie=C(Y,[["render",re],["__scopeId","data-v-23fe498f"]]),b=S({});b.component("ValidateForms",ie);b.use(p);b.mount("#app");
