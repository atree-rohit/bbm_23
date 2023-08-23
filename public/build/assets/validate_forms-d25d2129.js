import{m as b,_ as C,c as e,b as o,F as r,i,d as m,n as h,o as s,t as _,p as x,k as g,s as v,r as S,h as w,j as F,f as M}from"./_plugin-vue_export-helper-51dc1979.js";const A={name:"ModalShowCountForm",props:{show:{type:Boolean,default:!1},form_data:{type:Object,default:()=>{}}},emits:["close"],data(){return{fields:{form:["name","affiliation","phone","email","team_members","location","state","district","latitude","longitude","date","start_time","end_time","altitude","distance","weather","photo_link","status","comments"],species:["common_name","scientific_name","individuals","remarks","status"]},statuses:["pending","approved","duplicate","rejected"]}},computed:{...b({is_super_admin:t=>t.auth.is_super_admin,is_admin:t=>t.auth.is_admin,user:t=>t.auth.user}),admin(){return this.is_super_admin||this.is_admin},unvalidated_species_flag(){const t=[...new Set(this.form_data.species_list.map(d=>d.status))];return t.length==1&&t[0]=="approved"}},methods:{formClassColor(){let t="danger";return this.form_data.status=="approved"&&(t="info"),t},speciesTableClassColor(){return this.unvalidated_species_flag?"bg-success":"bg-danger"},speciesTableRowColor(t){return t.status=="approved"?"table-success":"table-danger"},setSpeciesStatus(t,d){let u={species_id:t.id,status:d};this.$store.dispatch("count_forms/setSpeciesStatus",u)},setFormStatus(t){let d={form_id:this.form_data.id,status:t};this.$store.dispatch("count_forms/setFormStatus",d)},validateAllSpecies(){this.form_data.species_list.filter(t=>t.status=="pending").forEach(t=>this.setSpeciesStatus(t,"approved"))},closeModal(){this.$emit("close")}}},y=t=>(x("data-v-2e2cdd3e"),t=t(),g(),t),I={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},T={class:"modal-dialog modal-xl"},V={class:"modal-content"},D={class:"modal-header"},j=y(()=>o("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"DATA SHEET",-1)),E={class:"modal-body"},B={class:"table table-sm form-table"},N=["textContent"],L=["textContent"],R={key:0,class:"border border-success text-center m-1 p-2"},z={key:0,class:"d-flex justify-content-around"},H=["textContent","onClick"],O={key:1,class:""},q={class:"table table-sm species-table"},G=["textContent"],J=y(()=>o("th",{class:"bg-dark"},"Actions",-1)),K=["textContent"],P={key:0,class:"d-flex justify-content-around bg-secondary"},Q=["textContent","onClick"],U={class:"modal-footer"},W={key:1,class:"modal-backdrop fade show"};function X(t,d,u,k,c,l){return s(),e(r,null,[u.show?(s(),e("div",I,[o("div",T,[o("div",V,[o("div",D,[j,o("button",{type:"button",class:"btn-close",onClick:d[0]||(d[0]=(...a)=>l.closeModal&&l.closeModal(...a))})]),o("div",E,[o("table",B,[o("tbody",null,[(s(!0),e(r,null,i(c.fields.form,a=>(s(),e("tr",{key:a},[o("th",{textContent:_(a),class:h(`bg-${l.formClassColor()}`)},null,10,N),o("td",{textContent:_(u.form_data[a]),class:h(`table-${l.formClassColor()}`)},null,10,L)]))),128))])]),l.admin?(s(),e("div",R,[l.unvalidated_species_flag?(s(),e("div",z,[(s(!0),e(r,null,i(c.statuses,a=>(s(),e("div",{key:a,class:"mx-2"},[a!=u.form_data.status?(s(),e("button",{key:0,class:"btn btn-success btn-sm",textContent:_(a),onClick:n=>l.setFormStatus(a)},null,8,H)):m("",!0)]))),128))])):(s(),e("div",O,[o("button",{class:"btn btn-success",onClick:d[1]||(d[1]=(...a)=>l.validateAllSpecies&&l.validateAllSpecies(...a))},"Validate All Species")]))])):m("",!0),o("table",q,[o("thead",{class:h(["text-light",l.speciesTableClassColor()])},[o("tr",null,[(s(!0),e(r,null,i(c.fields.species,a=>(s(),e("th",{key:a,textContent:_(a)},null,8,G))),128)),J])],2),o("tbody",null,[(s(!0),e(r,null,i(u.form_data.species_list,a=>(s(),e("tr",{key:a.id,class:h(l.speciesTableRowColor(a))},[(s(!0),e(r,null,i(c.fields.species,n=>(s(),e("td",{key:n,textContent:_(a[n])},null,8,K))),128)),l.admin?(s(),e("td",P,[(s(!0),e(r,null,i(c.statuses,n=>(s(),e("div",{key:n},[n!=a.status?(s(),e("button",{key:0,class:"btn btn-success btn-sm",textContent:_(n),onClick:f=>l.setSpeciesStatus(a,n)},null,8,Q)):m("",!0)]))),128))])):m("",!0)],2))),128))])])]),o("div",U,[o("button",{type:"button",class:"btn btn-secondary",onClick:d[2]||(d[2]=(...a)=>l.closeModal&&l.closeModal(...a))},"Close")])])])])):m("",!0),u.show?(s(),e("div",W)):m("",!0)],64)}const Y=C(A,[["render",X],["__scopeId","data-v-2e2cdd3e"]]);const Z={name:"ValidateForms",components:{ModalShowCountForm:Y},data(){return{headers:["name","location","state","district","latitude","longitude","date","start_time","end_time","status"],showModal:!1,selectedFormID:-1}},computed:{...b({user:t=>t.auth.user,all_data:t=>t.count_forms.all_data}),filtered_data(){return this.all_data},selected_form(){return this.selectedFormID==-1?{}:this.all_data.find(t=>t.id==this.selectedFormID)}},watch:{},mounted(){v.dispatch("count_forms/getAllData")},methods:{selectForm(t){this.selectedFormID=t,this.showModal=!0},closeModal(){this.selectedForm={},this.showModal=!1}}},$={class:"container-fluid validate-forms-container"},tt={class:"table table-sm"},et={class:"bg-success text-warning"},st=["textContent"],at={class:"table-secondary"},ot=["textContent","onClick"];function lt(t,d,u,k,c,l){const a=S("modal-show-count-form");return s(),e(r,null,[o("div",$,[w(" TEST "),o("table",tt,[o("thead",et,[o("tr",null,[(s(!0),e(r,null,i(c.headers,n=>(s(),e("th",{key:n,textContent:_(n)},null,8,st))),128))])]),o("tbody",at,[(s(!0),e(r,null,i(l.filtered_data,n=>(s(),e("tr",{key:n.id},[(s(!0),e(r,null,i(c.headers,f=>(s(),e("td",{key:f,textContent:_(n[f]),onClick:dt=>l.selectForm(n.id)},null,8,ot))),128))]))),128))])])]),F(a,{show:c.showModal,form_data:l.selected_form,onClose:l.closeModal},null,8,["show","form_data","onClose"])],64)}const nt=C(Z,[["render",lt],["__scopeId","data-v-4a55323d"]]),p=M({});p.component("ValidateForms",nt);p.use(v);p.mount("#app");
