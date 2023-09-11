import{_ as k,c as n,g as v,v as g,b as s,E as B,t as _,F as h,l as f,d as m,o,m as D,s as b,r as C,n as y,x as F,p as x,k as S,e as M,h as L}from"./_plugin-vue_export-helper-91cf5b34.js";/* empty css                        */import{M as V}from"./ModalShowCountForm-1f67ab98.js";import{L as j}from"./LoadingData-f63e5381.js";import"./ButterflyAnimation-602d65b0.js";const O={name:"AutoComplete",props:{question:{type:Object,required:!0},suggestions:{type:Array,required:!0},value:{type:String,required:!0}},emits:["selected"],data(){return{searchText:"",showSuggestions:!1,filteredSuggestions:[],typingTimer:null,typingTimeout:300}},watch:{value(e){this.searchText=e}},methods:{handleInput(){clearTimeout(this.typingTimer),this.searchText.length>=2?this.typingTimeout=setTimeout(()=>{this.filteredSuggestions=this.suggestions.filter(e=>e.toLowerCase().includes(this.searchText.toLowerCase())),this.showSuggestions=!0},this.typingTimeout):(this.filteredSuggestions=[],this.showSuggestions=!1)},selectSuggestion(e){this.searchText=e,this.showSuggestions=!1,this.$emit("selected",e)}}},N=["placeholder"],$=["for","textContent"],R={key:0},J=["onClick"];function P(e,t,c,w,i,l){var r;return o(),n(h,null,[v(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=d=>i.searchText=d),placeholder:`Enter ${(r=c.question)==null?void 0:r.name}`,class:"form-control",onInput:t[1]||(t[1]=(...d)=>l.handleInput&&l.handleInput(...d)),onKeydown:t[2]||(t[2]=B((...d)=>l.selectSuggestion&&l.selectSuggestion(...d),["enter"]))},null,40,N),[[g,i.searchText]]),s("label",{for:c.question.name,class:"font-weight-bold",textContent:_(c.question.label)},null,8,$),i.showSuggestions?(o(),n("ul",R,[(o(!0),n(h,null,f(i.filteredSuggestions,(d,p)=>(o(),n("li",{key:p,onClick:a=>l.selectSuggestion(d)},_(d),9,J))),128))])):m("",!0)],64)}const W=k(O,[["render",P],["__scopeId","data-v-a5b67501"]]);const Y={name:"CountForm",components:{AutoComplete:W},data(){return{tabs:[{label:"User",value:"user_details"},{label:"Location",value:"location_details"},{label:"Checklist",value:"species_list"}],current_tab:"user_details",form_data:{},species_list:[],current_species:{},initial:{form_data:{},current_species:{},species_list_length:0}}},computed:{...D({quiestions:e=>e.butterfly_counts.quiestions,species_lists:e=>e.butterfly_counts.species_lists,scientific_names:e=>e.butterfly_counts.scientific_names,common_names:e=>e.butterfly_counts.common_names,user_details:e=>e.butterfly_counts.user_details,latitude:e=>e.locations.latitude,longitude:e=>e.locations.longitude,store_form_data:e=>e.butterfly_counts.form_data,store_current_species:e=>e.butterfly_counts.current_species,store_species_list:e=>e.butterfly_counts.species_list}),page_questions(){let e=[];return e.push(this.quiestions.filter(t=>t.page==0)),e.push(this.quiestions.filter(t=>t.page==1)),e.push(this.quiestions.filter(t=>t.page==2)),e},completed(){let e={user_details:!0,location_details:!0,species_list:!0};return this.page_questions[0].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.user_details=!1)}),this.page_questions[1].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.location_details=!1)}),this.species_list.length==0&&(e.species_list=!1),e},current_species_completed(){var e,t;return((e=this.current_species.common_name)==null?void 0:e.length)>3||((t=this.current_species.scientific_name)==null?void 0:t.length)>3},form_completed(){return this.completed.user_details&&this.completed.location_details&&this.completed.species_list},user_details_match(){let e=!0;return["name","affiliation","phone","email","team_members","open_access"].forEach(c=>{this.form_data[c]!=this.user_details[c]&&(e=!1)}),e}},watch:{form_data:{handler(){this.updateFormData()},deep:!0},current_species:{handler(){this.updateCurrentSpecies()},deep:!0},species_list:{handler(){this.updateSpeciesList()},deep:!0},store_form_data(){this.initFormData()},store_species_list(e,t){t.length!=e.length&&(this.species_list=this.store_species_list)},latitude(){this.form_data.coordinates=this.latitude+","+this.longitude},longitude(){this.form_data.coordinates=this.latitude+","+this.longitude},user_details(){this.initUserDetails()}},created(){b.dispatch("locations/init"),b.dispatch("butterfly_counts/init"),this.initFormData(),this.initUserDetails()},methods:{initFormData(){if(this.store_form_data&&this.store_form_data.name)Object.keys(this.store_form_data).forEach(e=>{this.form_data[e]=this.store_form_data[e]});else{let e="";this.page_questions[0].map(t=>{this.form_data[t.name]=t.required?e:null}),this.page_questions[1].map(t=>{this.form_data[t.name]=t.required?e:null}),this.form_data.open_access=!0,this.form_data.date=new Date().toISOString().slice(0,10),this.form_data.start_time=new Date().toLocaleTimeString(),this.initial.form_data=JSON.parse(JSON.stringify(this.form_data))}this.initCurrentSpecies(),this.initTab()},initCurrentSpecies(){this.current_species={common_name:"",scientific_name:"",individuals:1,remarks:null},this.initial.current_species=JSON.parse(JSON.stringify(this.current_species))},initTab(){this.user_details&&Object.keys(this.user_details).length>0&&(Object.keys(this.user_details).forEach(e=>{this.form_data[e]=this.user_details[e]}),this.current_tab="location_details")},initUserDetails(){this.user_details&&Object.keys(this.user_details).length>0&&(Object.keys(this.user_details).forEach(e=>{this.form_data[e]=this.user_details[e]}),this.completed.user_details&&this.tabClick({label:"Location",value:"location_details"}))},tabClass(e){let t=this.current_tab==e.value?"active":"";switch(e.value){case"location_details":t+=this.completed.user_details?"":" disabled";break;case"species_list":t+=this.completed.location_details?"":" disabled";break}return t},tabClick(e){e.value=="location_details"&&!this.user_details_match&&this.storeUserDetails(),this.current_tab=e.value},storeUserDetails(){const e=["name","affiliation","phone","email","team_members","open_access"];let t={};e.forEach(c=>{t[c]=this.form_data[c]}),b.dispatch("butterfly_counts/setUserDetails",t)},commonNameSelected(e){this.current_species.common_name=e;let t=this.species_lists.synoptic.find(c=>c[1]==e);if(t){this.current_species.scientific_name=t[0];return}t=this.species_lists.ifb.find(c=>c[1]==e),t&&(this.current_species.scientific_name=t[0])},scientificNameSelected(e){this.current_species.scientific_name=e;let t=this.species_lists.synoptic.find(c=>c[0]==e);if(t){this.current_species.common_name=t[1];return}t=this.species_lists.ifb.find(c=>c[0]==e),t&&(this.current_species.common_name=t[1])},decreaseIndividuals(){this.current_species.individuals>1&&this.current_species.individuals--},addSpecies(){this.current_species_completed&&(Object.assign({},this.current_species),b.dispatch("butterfly_counts/addCurrentSpeciesToList"),this.initCurrentSpecies())},deleteSpecies(e){confirm("Are you sure you want to delete this species?")&&this.species_list.splice(e,1)},getPoints(){b.dispatch("locations/getCurrentCoordinates")},changeIndividuals(e,t){t=="+"?this.species_list[e].individuals++:this.species_list[e].individuals>1&&this.species_list[e].individuals--},async submitForm(){if(!this.form_completed)return;let e={...this.form_data,species_list:this.species_list};b.dispatch("data/setLoading","Submitting Form");let t=await b.dispatch("butterfly_counts/submitForm",e);b.dispatch("data/setLoading",null),await new Promise(c=>setTimeout(c,100)),this.initFormData(),alert(t.message)},updateFormData(){const e=["name","affiliation","phone","email","team_members","open_access","date","start_time","end_time","location","coordinates","altitude","distance","weather","photo_link","comments"];let t=[];e.forEach(c=>{this.form_data[c]!=this.initial.form_data[c]&&t.push(c)}),t.length>0&&b.dispatch("butterfly_counts/saveCurrentFormData",this.form_data)},updateCurrentSpecies(){const e=["common_name","scientific_name","individuals","remarks"];let t=[];e.forEach(c=>{this.current_species[c]!=this.initial.current_species[c]&&t.push(c)}),t.length>0&&b.dispatch("butterfly_counts/saveCurrentSpeciesData",this.current_species)},updateSpeciesList(){this.species_list.length!=0&&b.dispatch("butterfly_counts/saveCurrentSpeciesList",this.species_list)}}},E=e=>(x("data-v-2992cfb2"),e=e(),S(),e),G={class:"container-fluid form-container"},z={class:"nav nav-tabs"},H=["onClick","textContent"],K={class:"main-container"},Q={key:0,class:"questions-container"},X=["onUpdate:modelValue","placeholder"],Z=["onUpdate:modelValue","placeholder"],q=["onUpdate:modelValue","placeholder"],ee=["onUpdate:modelValue","placeholder"],te=["onUpdate:modelValue","placeholder"],se={key:5,class:"my-auto"},oe=["for","textContent"],ne={key:7,class:"form-check form-switch h1 ms-auto p-1 my-1"},ie=["checked"],ae=["onUpdate:modelValue","placeholder"],le=["onUpdate:modelValue","placeholder"],re=["for","textContent"],ce={key:5,class:"my-auto"},de={class:"btns-section"},ue={class:"border border-secondary rounded"},_e=E(()=>s("h3",{class:"bg-warning m-0 p-2 text-center"},"Species List",-1)),me={key:0,class:"table table-sm table-hover table-responsive border border-primary species-table"},he=E(()=>s("thead",null,[s("tr",{class:"bg-info"},[s("th",null,"No."),s("th",null,"Common"),s("th",null,"Scientific"),s("th",null,"Individuals"),s("th",null,"Actions")])],-1)),pe={class:"table-info"},fe=["textContent"],be=["textContent"],ye=["textContent"],ve={class:"individuals-cell"},ge={class:"container-fluid d-flex justify-content-around"},Ce=["onClick"],ke={class:"my-auto"},we=["onClick"],xe=["onClick"],Se={class:"btns-section"};function Me(e,t,c,w,i,l){const r=C("auto-complete");return o(),n("div",G,[s("ul",z,[(o(!0),n(h,null,f(i.tabs,d=>(o(),n("li",{class:"nav-item",key:d.value},[s("a",{class:y(["nav-link",l.tabClass(d)]),onClick:p=>l.tabClick(d),textContent:_(d.label),href:"#"},null,10,H)]))),128))]),s("div",K,[(o(!0),n(h,null,f(i.tabs,(d,p)=>(o(),n(h,{key:d.value},[d.value==i.current_tab?(o(),n("div",Q,[(o(!0),n(h,null,f(l.page_questions[p],a=>(o(),n("div",{key:a.name,class:"form-floating mb-2"},[p<2?(o(),n(h,{key:0},[a.type=="text"?v((o(),n("input",{key:0,type:"text","onUpdate:modelValue":u=>i.form_data[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control"},null,8,X)),[[g,i.form_data[a.name]]]):a.type=="textarea"?v((o(),n("textarea",{key:1,"onUpdate:modelValue":u=>i.form_data[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control"},null,8,Z)),[[g,i.form_data[a.name]]]):a.type=="date"?v((o(),n("input",{key:2,type:"date","onUpdate:modelValue":u=>i.form_data[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control"},null,8,q)),[[g,i.form_data[a.name]]]):a.type=="time"?v((o(),n("input",{key:3,type:"time","onUpdate:modelValue":u=>i.form_data[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control"},null,8,ee)),[[g,i.form_data[a.name]]]):m("",!0),a.type=="location"?v((o(),n("input",{key:4,type:"text","onUpdate:modelValue":u=>i.form_data[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control w-75"},null,8,te)),[[g,i.form_data[a.name]]]):m("",!0),a.type=="location"?(o(),n("div",se,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[0]||(t[0]=(...u)=>l.getPoints&&l.getPoints(...u))},"Get Coordinates")])):m("",!0),a.type!="location"?(o(),n("label",{key:6,for:a.name,class:y(["font-weight-bold",{required:a.required}]),textContent:_(a.label)},null,10,oe)):m("",!0),a.type=="checkbox"?(o(),n("div",ne,[s("input",{class:y(["form-check-input",i.form_data.open_access?"bg-success":"bg-danger"]),type:"checkbox",checked:i.form_data.open_access,onClick:t[1]||(t[1]=u=>i.form_data.open_access=!i.form_data.open_access)},null,10,ie)])):m("",!0)],64)):(o(),n(h,{key:1},[a.type=="autocomplete_common"?(o(),F(r,{key:0,question:a,suggestions:e.common_names,value:i.current_species.common_name,onSelected:l.commonNameSelected},null,8,["question","suggestions","value","onSelected"])):a.type=="autocomplete_scientific"?(o(),F(r,{key:1,question:a,suggestions:e.scientific_names,value:i.current_species.scientific_name,onSelected:l.scientificNameSelected},null,8,["question","suggestions","value","onSelected"])):m("",!0),a.type=="increment"?v((o(),n("input",{key:2,type:"number",min:"1","onUpdate:modelValue":u=>i.current_species[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control w-75"},null,8,ae)),[[g,i.current_species[a.name]]]):a.type=="textarea"?v((o(),n("textarea",{key:3,"onUpdate:modelValue":u=>i.current_species[a.name]=u,placeholder:`Enter ${a.name}`,class:"form-control"},null,8,le)),[[g,i.current_species[a.name]]]):m("",!0),a.type!="autocomplete_common"&&a.type!="autocomplete_scientific"?(o(),n("label",{key:4,for:a.name,class:y(["font-weight-bold",{required:a.required}]),textContent:_(a.label)},null,10,re)):m("",!0),a.type=="increment"?(o(),n("div",ce,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[2]||(t[2]=u=>i.current_species.individuals++)},"+"),s("button",{class:"btn btn-outline-success px-3",onClick:t[3]||(t[3]=(...u)=>l.decreaseIndividuals&&l.decreaseIndividuals(...u))},"-")])):m("",!0)],64))]))),128)),i.current_tab=="species_list"?(o(),n(h,{key:0},[s("div",de,[i.current_tab=="species_list"?(o(),n("button",{key:0,class:y(["btn btn-lg",l.current_species_completed?"btn-success":"btn-disabled"]),onClick:t[4]||(t[4]=(...a)=>l.addSpecies&&l.addSpecies(...a))},"Add Species",2)):m("",!0)]),s("div",ue,[_e,i.species_list.length?(o(),n("table",me,[he,s("tbody",pe,[(o(!0),n(h,null,f(i.species_list,(a,u)=>(o(),n("tr",{key:u},[s("td",{textContent:_(u+1)},null,8,fe),s("td",{textContent:_(a.common_name)},null,8,be),s("td",{textContent:_(a.scientific_name)},null,8,ye),s("td",ve,[s("div",ge,[s("button",{class:"btn btn-sm btn-outline-success",onClick:I=>l.changeIndividuals(u,"-")},"-",8,Ce),s("div",ke,_(a.individuals),1),s("button",{class:"btn btn-sm btn-outline-success",onClick:I=>l.changeIndividuals(u,"+")},"+",8,we)])]),s("td",null,[s("button",{type:"button",class:"btn btn-danger btn-sm",textContent:"X",onClick:I=>l.deleteSpecies(u)},null,8,xe)])]))),128))])])):m("",!0)])],64)):m("",!0)])):m("",!0)],64))),128)),s("div",Se,[s("button",{class:y(["btn btn-lg",l.form_completed?"btn-success":"btn-disabled"]),onClick:t[5]||(t[5]=(...d)=>l.submitForm&&l.submitForm(...d))},"Submit Form",2)])])])}const Fe=k(Y,[["render",Me],["__scopeId","data-v-2992cfb2"]]);const De={name:"ModalAboutBBMApp",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{points:[["🕒","Quick Counts, Big Fun","Each count takes just 30 minutes. Imagine, in just half an hour, you're uncovering the secrets of nature!"],["🚶‍♀️","Forget the Distance","It's not about how far you go, but what you discover along the way. Estimate your journey distance during each 30-minute count - a fascinating challenge!"],["🦋","One-Way Magic","Follow the butterflies from Point A to Point B. Capture the enchantment of their journey, and if you spot different species on the way back, note them too! Explore new routes for added thrill!"],["📸","Snap the Beauty","Get ready to photograph these incredible creatures. Even if you can't name them all, just record the group or genus. A Grass Yellow becomes an adventure in itself!"],["☀️","Sunshine Quest","Choose the perfect sunny moment when butterflies are most active. Feel the warmth, embrace the excitement!"],["📝","Easy Sheets, More Joy","Each 30-minute adventure gets its own sheet. Fill it up, submit, and let the discoveries flow!"],["🟡","Highlight Your Insights","Those golden questions with red stars? They're the key to our shared exploration. Required and rewarding - make sure to fill them in!"],["🚫","Stay Still, Dive Deep","Dive into the data without moving cells. Let the information flow while keeping everything organized."]]}},methods:{closeModal(){this.$emit("close")}}},Ae=e=>(x("data-v-94c0aa94"),e=e(),S(),e),Ie={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},Ee={class:"modal-dialog modal-lg"},Ue={class:"modal-content"},Te={class:"modal-header"},Be=Ae(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"🦋 Join the Butterfly Adventure! Count and Explore! 🦋",-1)),Le={class:"modal-body"},Ve={class:"px-2 fw-bold"},je={class:"px-2"},Oe={class:"modal-footer"},Ne={key:1,class:"modal-backdrop fade show"};function $e(e,t,c,w,i,l){return o(),n(h,null,[c.show?(o(),n("div",Ie,[s("div",Ee,[s("div",Ue,[s("div",Te,[Be,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...r)=>l.closeModal&&l.closeModal(...r))})]),s("div",Le,[(o(!0),n(h,null,f(i.points,(r,d)=>(o(),n("div",{key:d,class:"py-2"},[s("span",null,_(r[0]),1),s("span",Ve,_(r[1]),1),s("span",je,_(r[2]),1)]))),128))]),s("div",Oe,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...r)=>l.closeModal&&l.closeModal(...r))},"Close")])])])])):m("",!0),c.show?(o(),n("div",Ne)):m("",!0)],64)}const Re=k(De,[["render",$e],["__scopeId","data-v-94c0aa94"]]);const Je={name:"CountFormRow",props:{count_form:{type:Object,required:!0}},data(){return{fields:{form:["name","affiliation","phone","email","team_members","open_access","location","state","district","latitude","longitude","date","start_time","end_time","altitude","distance","weather","photo_link","status","comments"],form_mini:["location","state","district","latitude","longitude","date","start_time","end_time"],species:["common_name","scientific_name","individuals","remarks","status"]},statuses:["pending","approved","duplicate","rejected"],show_details:!1}},computed:{...D({is_super_admin:e=>e.auth.is_super_admin,is_admin:e=>e.auth.is_admin,user:e=>e.auth.user}),admin(){return this.is_super_admin||this.is_admin},form_validate_flag(){let e=!1;return this.count_form.species_list.filter(t=>t.status=="approved").length>0&&(e=!0),e},unvalidated_species(){return this.count_form.species_list.filter(e=>e.status!="approved").length>0}},methods:{buttonText(){return this.show_details?"Hide Details":"Show Details"},rowClass(){return this.count_form.status=="approved"?"form-approved":"form-pending"},speciesRowClass(e){return e.status=="approved"?"table-success":"table-danger"},setFormStatus(e){let t={form_id:this.count_form.id,status:e};this.$store.dispatch("count_forms/setFormStatus",t)},setSpeciesStatus(e,t){let c={species_id:e.id,status:t};this.$store.dispatch("count_forms/setSpeciesStatus",c)},validateAllSpecies(){this.count_form.species_list.forEach(e=>{e.status!="approved"&&this.setSpeciesStatus(e,"approved")})}}},U=e=>(x("data-v-d5d1afb0"),e=e(),S(),e),Pe={class:"form-data-container"},We=["textContent"],Ye=["textContent"],Ge={class:"text-center"},ze=["textContent"],He={key:0,class:"species-list container-fluid"},Ke={key:0,class:"border border-success text-center m-1 p-2 d-flex"},Qe=U(()=>s("span",null,"Set Count Form Status",-1)),Xe=["textContent","onClick"],Ze={class:"table table-sm"},qe=["textContent"],et=["textContent"],tt={key:1,class:"border border-success text-center m-1 p-2"},st={class:"table table-sm"},ot={class:"bg-dark text-light"},nt=U(()=>s("th",null,"Sl. No",-1)),it=["textContent"],at={key:0,class:"bg-success"},lt={key:0,class:"d-flex justify-content-around"},rt=["textContent","onClick"];function ct(e,t,c,w,i,l){return o(),n("div",{class:y(["form-row",l.rowClass()])},[s("div",Pe,[(o(!0),n(h,null,f(i.fields.form_mini,r=>(o(),n("div",{key:r,class:"form-field"},[s("span",{textContent:_(r)},null,8,We),s("span",{textContent:_(c.count_form[r])},null,8,Ye)]))),128))]),s("div",Ge,[s("button",{class:"btn btn-success btn-sm m-1",onClick:t[0]||(t[0]=r=>i.show_details=!i.show_details),textContent:_(l.buttonText())},null,8,ze)]),i.show_details?(o(),n("div",He,[l.admin?(o(),n("div",Ke,[Qe,(o(!0),n(h,null,f(i.statuses,r=>(o(),n("div",{key:r,class:"mx-2"},[r!=c.count_form.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:_(r),onClick:d=>l.setFormStatus(r)},null,8,Xe)):m("",!0)]))),128))])):m("",!0),s("table",Ze,[s("tbody",null,[(o(!0),n(h,null,f(i.fields.form,r=>(o(),n("tr",{key:r},[s("td",{textContent:_(r)},null,8,qe),s("td",{textContent:_(c.count_form[r])},null,8,et)]))),128))])]),l.admin&&l.unvalidated_species?(o(),n("div",tt,[s("button",{class:"btn btn-success",onClick:t[1]||(t[1]=(...r)=>l.validateAllSpecies&&l.validateAllSpecies(...r))},"Validate All Species")])):m("",!0),s("table",st,[s("thead",ot,[s("tr",null,[nt,(o(!0),n(h,null,f(i.fields.species,r=>(o(),n("th",{key:r,textContent:_(r)},null,8,it))),128)),l.admin?(o(),n("th",at,"Validate")):m("",!0)])]),s("tbody",null,[(o(!0),n(h,null,f(c.count_form.species_list,(r,d)=>(o(),n("tr",{key:r.id,class:y(l.speciesRowClass(r))},[s("td",null,_(d+1),1),s("td",null,_(r.common_name),1),s("td",null,_(r.scientific_name),1),s("td",null,_(r.individuals),1),s("td",null,_(r.remarks),1),s("td",null,_(r.status),1),l.admin?(o(),n("td",lt,[(o(!0),n(h,null,f(i.statuses,p=>(o(),n("div",{key:p},[p!=r.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:_(p),onClick:a=>l.setSpeciesStatus(r,p)},null,8,rt)):m("",!0)]))),128))])):m("",!0)],2))),128))])])])):m("",!0)],2)}const dt=k(Je,[["render",ct],["__scopeId","data-v-d5d1afb0"]]);const ut={name:"ModalUserCountsData",props:{show:{type:Boolean,default:!1}},components:{CountFormRow:dt,ModalShowCountForm:V},emits:["close"],data(){return{showModal:!1,form_data:{},headers:["id","name","location","state","district","latitude","longitude","no_of_species","date","start_time","end_time","status"]}},computed:{...D({user_data:e=>e.butterfly_counts.user_data}),filtered_data(){let e=[];return this.user_data.forEach(t=>{t.date.includes("2023-09")&&e.push({...t,no_of_species:t.species_list.length})}),e}},methods:{selectForm(e){this.form_data=e,this.showModal=!0},tableRowColor(e){let t="table-secondary";switch(e.status){case"pending":t="table-primary";break;case"approved":t="table-success text-success";break;case"duplicate":t="table-warning";break;case"rejected":t="table-danger text-danger";break}return t},closeModal(){this.$emit("close")},closeFormModal(){this.showModal=!1}}},_t=e=>(x("data-v-5a18a7c1"),e=e(),S(),e),mt={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},ht={class:"modal-dialog modal-fullscreen"},pt={class:"modal-content"},ft={class:"modal-header"},bt=_t(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Your Counts Data",-1)),yt={class:"modal-body"},vt={key:0,class:"count-forms-coutanier"},gt={class:"table"},Ct={class:"bg-success text-warning"},kt=["textContent"],wt={class:"table-secondary"},xt=["textContent","onClick"],St={key:1},Mt={class:"modal-footer"},Ft={key:1,class:"modal-backdrop fade show"};function Dt(e,t,c,w,i,l){const r=C("modal-show-count-form");return o(),n(h,null,[c.show?(o(),n("div",mt,[s("div",ht,[s("div",pt,[s("div",ft,[bt,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...d)=>l.closeModal&&l.closeModal(...d))})]),s("div",yt,[e.user_data.length!=0?(o(),n("div",vt,[s("table",gt,[s("thead",Ct,[s("tr",null,[(o(!0),n(h,null,f(i.headers,d=>(o(),n("th",{key:d,textContent:_(d)},null,8,kt))),128))])]),s("tbody",wt,[(o(!0),n(h,null,f(l.filtered_data,d=>(o(),n("tr",{key:d.id,class:y(l.tableRowColor(d))},[(o(!0),n(h,null,f(i.headers,p=>(o(),n("td",{key:p,textContent:_(d[p]),onClick:a=>l.selectForm(d)},null,8,xt))),128))],2))),128))])])])):(o(),n("div",St,_(e.user_data),1))]),s("div",Mt,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...d)=>l.closeModal&&l.closeModal(...d))},"Close")])])])])):m("",!0),c.show?(o(),n("div",Ft)):m("",!0),M(r,{show:i.showModal,form_data:i.form_data,onClose:l.closeFormModal},null,8,["show","form_data","onClose"])],64)}const At=k(ut,[["render",Dt],["__scopeId","data-v-5a18a7c1"]]);const It={name:"ButterflyCounts",components:{CountForm:Fe,ModalAboutBBMApp:Re,ModalUserCountsData:At,LoadingData:j},data(){return{nav_links:[{label:"About",value:"about"},{label:"Add",value:"add"},{label:"Data",value:"data"}],current_nav:"add",show_modal:{about:!1,user_data:!1}}},methods:{navClick(e){this.current_nav=e.value}}},T=e=>(x("data-v-44d3a863"),e=e(),S(),e),Et={class:"container-fluid app-container"},Ut={class:"button-container d-flex justify-content-around my-2"},Tt=T(()=>s("i",{class:"bi bi-info-circle"},null,-1)),Bt=[Tt],Lt=T(()=>s("i",{class:"bi bi-database"},null,-1)),Vt=[Lt],jt={class:"tabs"};function Ot(e,t,c,w,i,l){const r=C("count-form"),d=C("ModalAboutBBMApp"),p=C("ModalUserCountsData"),a=C("loading-data");return o(),n(h,null,[s("div",Et,[s("div",Ut,[s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"About",onClick:t[0]||(t[0]=u=>i.show_modal.about=!0)},Bt),s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"Your Data",onClick:t[1]||(t[1]=u=>i.show_modal.user_data=!0)},Vt)]),s("div",jt,[i.current_nav=="add"?(o(),F(r,{key:0})):m("",!0)]),M(d,{show:i.show_modal.about,onClose:t[2]||(t[2]=u=>i.show_modal.about=!1)},null,8,["show"]),M(p,{show:i.show_modal.user_data,onClose:t[3]||(t[3]=u=>i.show_modal.user_data=!1)},null,8,["show"])]),M(a)],64)}const Nt=k(It,[["render",Ot],["__scopeId","data-v-44d3a863"]]),A=L({});A.component("butterfly-counts",Nt);A.use(b);A.mount("#app");"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service Worker registered with scope:",e.scope)}).catch(e=>{console.error("Service Worker registration failed:",e)})});
