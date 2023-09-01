import{_ as g,c as n,w as b,v,b as s,A as V,t as d,F as h,j as p,d as _,o,m as A,s as C,r as w,n as y,l as M,p as x,i as S,k as B,f as E}from"./_plugin-vue_export-helper-a532bba2.js";/* empty css                        */const j={name:"AutoComplete",props:{question:{type:Object,required:!0},suggestions:{type:Array,required:!0},value:{type:String,required:!0}},emits:["selected"],data(){return{searchText:"",showSuggestions:!1,filteredSuggestions:[],typingTimer:null,typingTimeout:300}},watch:{value(e){this.searchText=e}},methods:{handleInput(){clearTimeout(this.typingTimer),this.searchText.length>=1?this.typingTimeout=setTimeout(()=>{this.filteredSuggestions=this.suggestions.filter(e=>e.toLowerCase().includes(this.searchText.toLowerCase())),this.showSuggestions=!0},this.typingTimeout):(this.filteredSuggestions=[],this.showSuggestions=!1)},selectSuggestion(e){this.searchText=e,this.showSuggestions=!1,this.$emit("selected",e)}}},$=["placeholder"],L=["for","textContent"],N={key:0},O=["onClick"];function R(e,t,u,k,l,a){var c;return o(),n(h,null,[b(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=r=>l.searchText=r),placeholder:`Enter ${(c=u.question)==null?void 0:c.name}`,class:"form-control",onInput:t[1]||(t[1]=(...r)=>a.handleInput&&a.handleInput(...r)),onKeydown:t[2]||(t[2]=V((...r)=>a.selectSuggestion&&a.selectSuggestion(...r),["enter"]))},null,40,$),[[v,l.searchText]]),s("label",{for:u.question.name,class:"font-weight-bold",textContent:d(u.question.label)},null,8,L),l.showSuggestions?(o(),n("ul",N,[(o(!0),n(h,null,p(l.filteredSuggestions,(r,f)=>(o(),n("li",{key:f,onClick:i=>a.selectSuggestion(r)},d(r),9,O))),128))])):_("",!0)],64)}const P=g(j,[["render",R],["__scopeId","data-v-20384752"]]);const W={name:"CountForm",components:{AutoComplete:P},data(){return{tabs:[{label:"User",value:"user_details"},{label:"Location",value:"location_details"},{label:"Checklist",value:"species_list"}],current_tab:"user_details",form_data:{},species_list:[],current_species:{}}},computed:{...A({quiestions:e=>e.butterfly_counts.quiestions,species_lists:e=>e.butterfly_counts.species_lists,scientific_names:e=>e.butterfly_counts.scientific_names,common_names:e=>e.butterfly_counts.common_names,user_details:e=>e.butterfly_counts.user_details,latitude:e=>e.locations.latitude,longitude:e=>e.locations.longitude}),page_questions(){let e=[];return e.push(this.quiestions.filter(t=>t.page==0)),e.push(this.quiestions.filter(t=>t.page==1)),e.push(this.quiestions.filter(t=>t.page==2)),e},completed(){let e={user_details:!0,location_details:!0,species_list:!0};return this.page_questions[0].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.user_details=!1)}),this.page_questions[1].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.location_details=!1)}),this.species_list.length==0&&(e.species_list=!1),e},current_species_completed(){var e,t;return((e=this.current_species.common_name)==null?void 0:e.length)>3||((t=this.current_species.scientific_name)==null?void 0:t.length)>3},form_completed(){return this.completed.user_details&&this.completed.location_details&&this.completed.species_list}},watch:{latitude(){this.form_data.coordinates=this.latitude+","+this.longitude},longitude(){this.form_data.coordinates=this.latitude+","+this.longitude}},created(){C.dispatch("locations/init"),C.dispatch("butterfly_counts/init"),this.initFormData()},methods:{initFormData(){let e="";this.page_questions[0].map(t=>{this.form_data[t.name]=t.required?e:null}),this.page_questions[1].map(t=>{this.form_data[t.name]=t.required?e:null}),this.form_data.open_access=!0,this.form_data.date=new Date().toISOString().slice(0,10),this.form_data.start_time=new Date().toLocaleTimeString(),this.species_list=[],this.initCurrentSpecies(),this.initTab()},initCurrentSpecies(){this.current_species={common_name:"",scientific_name:"",individuals:1,remarks:null}},initTab(){this.user_details&&Object.keys(this.user_details).length>0&&(Object.keys(this.user_details).forEach(e=>{this.form_data[e]=this.user_details[e]}),this.current_tab="location_details")},tabClass(e){let t=this.current_tab==e.value?"active":"";switch(e.value){case"location_details":t+=this.completed.user_details?"":" disabled";break;case"species_list":t+=this.completed.location_details?"":" disabled";break}return t},tabClick(e){this.current_tab=e.value},commonNameSelected(e){this.current_species.common_name=e;let t=this.species_lists.synoptic.find(u=>u[1]==e);if(t){this.current_species.scientific_name=t[0];return}t=this.species_lists.ifb.find(u=>u[1]==e),t&&(this.current_species.scientific_name=t[0])},scientificNameSelected(e){this.current_species.scientific_name=e;let t=this.species_lists.synoptic.find(u=>u[0]==e);if(t){this.current_species.common_name=t[1];return}t=this.species_lists.ifb.find(u=>u[0]==e),t&&(this.current_species.common_name=t[1])},decreaseIndividuals(){this.current_species.individuals>1&&this.current_species.individuals--},addSpecies(){if(!this.current_species_completed)return;const e=Object.assign({},this.current_species);console.log("addSpecies()",e),this.species_list.push(e),this.initCurrentSpecies()},deleteSpecies(e){confirm("Are you sure you want to delete this species?")&&this.species_list.splice(e,1)},getPoints(){C.dispatch("locations/getCurrentCoordinates")},changeIndividuals(e,t){t=="+"?this.species_list[e].individuals++:this.species_list[e].individuals>1&&this.species_list[e].individuals--},submitForm(){if(!this.form_completed)return;let e={...this.form_data,species_list:this.species_list};C.dispatch("butterfly_counts/submitForm",e),this.initFormData()}}},T=e=>(x("data-v-19c267f4"),e=e(),S(),e),Y={class:"container-fluid form-container"},G={class:"nav nav-tabs"},z=["onClick","textContent"],H={class:"main-container"},J={key:0,class:"questions-container"},K=["onUpdate:modelValue","placeholder"],Q=["onUpdate:modelValue","placeholder"],X=["onUpdate:modelValue","placeholder"],Z=["onUpdate:modelValue","placeholder"],q=["onUpdate:modelValue","placeholder"],ee={key:5,class:"my-auto"},te=["for","textContent"],se={key:7,class:"form-check form-switch h1 ms-auto p-1 my-1"},oe=["checked"],ne=["onUpdate:modelValue","placeholder"],ie=["onUpdate:modelValue","placeholder"],le=["for","textContent"],ae={key:5,class:"my-auto"},ce={class:"btns-section"},re={class:"border border-secondary rounded"},de=T(()=>s("h3",{class:"bg-warning m-0 p-2 text-center"},"Species List",-1)),ue={key:0,class:"table table-sm table-hover table-responsive border border-primary species-table"},_e=T(()=>s("thead",null,[s("tr",{class:"bg-info"},[s("th",null,"No."),s("th",null,"Common"),s("th",null,"Scientific"),s("th",null,"Individuals"),s("th",null,"Actions")])],-1)),me={class:"table-info"},he=["textContent"],pe=["textContent"],fe=["textContent"],be={class:"individuals-cell"},ve={class:"container-fluid d-flex justify-content-around"},ye=["onClick"],ge={class:"my-auto"},ke=["onClick"],Ce=["onClick"],we={class:"btns-section"};function xe(e,t,u,k,l,a){const c=w("auto-complete");return o(),n("div",Y,[s("ul",G,[(o(!0),n(h,null,p(l.tabs,r=>(o(),n("li",{class:"nav-item",key:r.value},[s("a",{class:y(["nav-link",a.tabClass(r)]),onClick:f=>a.tabClick(r),textContent:d(r.label),href:"#"},null,10,z)]))),128))]),s("div",H,[(o(!0),n(h,null,p(l.tabs,(r,f)=>(o(),n(h,{key:r.value},[r.value==l.current_tab?(o(),n("div",J,[(o(!0),n(h,null,p(a.page_questions[f],i=>(o(),n("div",{key:i.name,class:"form-floating mb-2"},[f<2?(o(),n(h,{key:0},[i.type=="text"?b((o(),n("input",{key:0,type:"text","onUpdate:modelValue":m=>l.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,K)),[[v,l.form_data[i.name]]]):i.type=="textarea"?b((o(),n("textarea",{key:1,"onUpdate:modelValue":m=>l.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,Q)),[[v,l.form_data[i.name]]]):i.type=="date"?b((o(),n("input",{key:2,type:"date","onUpdate:modelValue":m=>l.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,X)),[[v,l.form_data[i.name]]]):i.type=="time"?b((o(),n("input",{key:3,type:"time","onUpdate:modelValue":m=>l.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,Z)),[[v,l.form_data[i.name]]]):_("",!0),i.type=="location"?b((o(),n("input",{key:4,type:"text","onUpdate:modelValue":m=>l.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control w-75"},null,8,q)),[[v,l.form_data[i.name]]]):_("",!0),i.type=="location"?(o(),n("div",ee,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[0]||(t[0]=(...m)=>a.getPoints&&a.getPoints(...m))},"Get Coordinates")])):_("",!0),i.type!="location"?(o(),n("label",{key:6,for:i.name,class:y(["font-weight-bold",{required:i.required}]),textContent:d(i.label)},null,10,te)):_("",!0),i.type=="checkbox"?(o(),n("div",se,[s("input",{class:y(["form-check-input",l.form_data.open_access?"bg-success":"bg-danger"]),type:"checkbox",checked:l.form_data.open_access,onClick:t[1]||(t[1]=m=>l.form_data.open_access=!l.form_data.open_access)},null,10,oe)])):_("",!0)],64)):(o(),n(h,{key:1},[i.type=="autocomplete_common"?(o(),M(c,{key:0,question:i,suggestions:e.common_names,value:l.current_species.common_name,onSelected:a.commonNameSelected},null,8,["question","suggestions","value","onSelected"])):i.type=="autocomplete_scientific"?(o(),M(c,{key:1,question:i,suggestions:e.scientific_names,value:l.current_species.scientific_name,onSelected:a.scientificNameSelected},null,8,["question","suggestions","value","onSelected"])):_("",!0),i.type=="increment"?b((o(),n("input",{key:2,type:"number",min:"1","onUpdate:modelValue":m=>l.current_species[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control w-75"},null,8,ne)),[[v,l.current_species[i.name]]]):i.type=="textarea"?b((o(),n("textarea",{key:3,"onUpdate:modelValue":m=>l.current_species[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,ie)),[[v,l.current_species[i.name]]]):_("",!0),i.type!="autocomplete_common"&&i.type!="autocomplete_scientific"?(o(),n("label",{key:4,for:i.name,class:y(["font-weight-bold",{required:i.required}]),textContent:d(i.label)},null,10,le)):_("",!0),i.type=="increment"?(o(),n("div",ae,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[2]||(t[2]=m=>l.current_species.individuals++)},"+"),s("button",{class:"btn btn-outline-success px-3",onClick:t[3]||(t[3]=(...m)=>a.decreaseIndividuals&&a.decreaseIndividuals(...m))},"-")])):_("",!0)],64))]))),128)),l.current_tab=="species_list"?(o(),n(h,{key:0},[s("div",ce,[l.current_tab=="species_list"?(o(),n("button",{key:0,class:y(["btn btn-lg",a.current_species_completed?"btn-success":"btn-disabled"]),onClick:t[4]||(t[4]=(...i)=>a.addSpecies&&a.addSpecies(...i))},"Add Species",2)):_("",!0)]),s("div",re,[de,l.species_list.length?(o(),n("table",ue,[_e,s("tbody",me,[(o(!0),n(h,null,p(l.species_list,(i,m)=>(o(),n("tr",{key:m},[s("td",{textContent:d(m+1)},null,8,he),s("td",{textContent:d(i.common_name)},null,8,pe),s("td",{textContent:d(i.scientific_name)},null,8,fe),s("td",be,[s("div",ve,[s("button",{class:"btn btn-sm btn-outline-success",onClick:F=>a.changeIndividuals(m,"-")},"-",8,ye),s("div",ge,d(i.individuals),1),s("button",{class:"btn btn-sm btn-outline-success",onClick:F=>a.changeIndividuals(m,"+")},"+",8,ke)])]),s("td",null,[s("button",{type:"button",class:"btn btn-danger btn-sm",textContent:"X",onClick:F=>a.deleteSpecies(m)},null,8,Ce)])]))),128))])])):_("",!0)])],64)):_("",!0)])):_("",!0)],64))),128)),s("div",we,[s("button",{class:y(["btn btn-lg",a.form_completed?"btn-success":"btn-disabled"]),onClick:t[5]||(t[5]=(...r)=>a.submitForm&&a.submitForm(...r))},"Submit Form",2)])])])}const Se=g(W,[["render",xe],["__scopeId","data-v-19c267f4"]]);const Me={name:"ModalAboutBBMApp",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{points:[["🕒","Quick Counts, Big Fun","Each count takes just 30 minutes. Imagine, in just half an hour, you're uncovering the secrets of nature!"],["🚶‍♀️","Forget the Distance","It's not about how far you go, but what you discover along the way. Estimate your journey distance during each 30-minute count - a fascinating challenge!"],["🦋","One-Way Magic","Follow the butterflies from Point A to Point B. Capture the enchantment of their journey, and if you spot different species on the way back, note them too! Explore new routes for added thrill!"],["📸","Snap the Beauty","Get ready to photograph these incredible creatures. Even if you can't name them all, just record the group or genus. A Grass Yellow becomes an adventure in itself!"],["☀️","Sunshine Quest","Choose the perfect sunny moment when butterflies are most active. Feel the warmth, embrace the excitement!"],["📝","Easy Sheets, More Joy","Each 30-minute adventure gets its own sheet. Fill it up, submit, and let the discoveries flow!"],["🟡","Highlight Your Insights","Those golden questions with red stars? They're the key to our shared exploration. Required and rewarding - make sure to fill them in!"],["🚫","Stay Still, Dive Deep","Dive into the data without moving cells. Let the information flow while keeping everything organized."]]}},methods:{closeModal(){this.$emit("close")}}},Ae=e=>(x("data-v-94c0aa94"),e=e(),S(),e),Ie={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},Fe={class:"modal-dialog modal-lg"},Be={class:"modal-content"},Te={class:"modal-header"},De=Ae(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"🦋 Join the Butterfly Adventure! Count and Explore! 🦋",-1)),Ue={class:"modal-body"},Ve={class:"px-2 fw-bold"},Ee={class:"px-2"},je={class:"modal-footer"},$e={key:1,class:"modal-backdrop fade show"};function Le(e,t,u,k,l,a){return o(),n(h,null,[u.show?(o(),n("div",Ie,[s("div",Fe,[s("div",Be,[s("div",Te,[De,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...c)=>a.closeModal&&a.closeModal(...c))})]),s("div",Ue,[(o(!0),n(h,null,p(l.points,(c,r)=>(o(),n("div",{key:r,class:"py-2"},[s("span",null,d(c[0]),1),s("span",Ve,d(c[1]),1),s("span",Ee,d(c[2]),1)]))),128))]),s("div",je,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...c)=>a.closeModal&&a.closeModal(...c))},"Close")])])])])):_("",!0),u.show?(o(),n("div",$e)):_("",!0)],64)}const Ne=g(Me,[["render",Le],["__scopeId","data-v-94c0aa94"]]);const Oe={name:"CountFormRow",props:{count_form:{type:Object,required:!0}},data(){return{fields:{form:["name","affiliation","phone","email","team_members","open_access","location","state","district","latitude","longitude","date","start_time","end_time","altitude","distance","weather","photo_link","status","comments"],form_mini:["location","state","district","latitude","longitude","date","start_time","end_time"],species:["common_name","scientific_name","individuals","remarks","status"]},statuses:["pending","approved","duplicate","rejected"],show_details:!1}},computed:{...A({is_super_admin:e=>e.auth.is_super_admin,is_admin:e=>e.auth.is_admin,user:e=>e.auth.user}),admin(){return this.is_super_admin||this.is_admin},form_validate_flag(){let e=!1;return this.count_form.species_list.filter(t=>t.status=="approved").length>0&&(e=!0),e},unvalidated_species(){return this.count_form.species_list.filter(e=>e.status!="approved").length>0}},methods:{buttonText(){return this.show_details?"Hide Details":"Show Details"},rowClass(){return this.count_form.status=="approved"?"form-approved":"form-pending"},speciesRowClass(e){return e.status=="approved"?"table-success":"table-danger"},setFormStatus(e){let t={form_id:this.count_form.id,status:e};this.$store.dispatch("count_forms/setFormStatus",t)},setSpeciesStatus(e,t){let u={species_id:e.id,status:t};this.$store.dispatch("count_forms/setSpeciesStatus",u)},validateAllSpecies(){this.count_form.species_list.forEach(e=>{e.status!="approved"&&this.setSpeciesStatus(e,"approved")})}}},D=e=>(x("data-v-d5d1afb0"),e=e(),S(),e),Re={class:"form-data-container"},Pe=["textContent"],We=["textContent"],Ye={class:"text-center"},Ge=["textContent"],ze={key:0,class:"species-list container-fluid"},He={key:0,class:"border border-success text-center m-1 p-2 d-flex"},Je=D(()=>s("span",null,"Set Count Form Status",-1)),Ke=["textContent","onClick"],Qe={class:"table table-sm"},Xe=["textContent"],Ze=["textContent"],qe={key:1,class:"border border-success text-center m-1 p-2"},et={class:"table table-sm"},tt={class:"bg-dark text-light"},st=D(()=>s("th",null,"Sl. No",-1)),ot=["textContent"],nt={key:0,class:"bg-success"},it={key:0,class:"d-flex justify-content-around"},lt=["textContent","onClick"];function at(e,t,u,k,l,a){return o(),n("div",{class:y(["form-row",a.rowClass()])},[s("div",Re,[(o(!0),n(h,null,p(l.fields.form_mini,c=>(o(),n("div",{key:c,class:"form-field"},[s("span",{textContent:d(c)},null,8,Pe),s("span",{textContent:d(u.count_form[c])},null,8,We)]))),128))]),s("div",Ye,[s("button",{class:"btn btn-success btn-sm m-1",onClick:t[0]||(t[0]=c=>l.show_details=!l.show_details),textContent:d(a.buttonText())},null,8,Ge)]),l.show_details?(o(),n("div",ze,[a.admin?(o(),n("div",He,[Je,(o(!0),n(h,null,p(l.statuses,c=>(o(),n("div",{key:c,class:"mx-2"},[c!=u.count_form.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:d(c),onClick:r=>a.setFormStatus(c)},null,8,Ke)):_("",!0)]))),128))])):_("",!0),s("table",Qe,[s("tbody",null,[(o(!0),n(h,null,p(l.fields.form,c=>(o(),n("tr",{key:c},[s("td",{textContent:d(c)},null,8,Xe),s("td",{textContent:d(u.count_form[c])},null,8,Ze)]))),128))])]),a.admin&&a.unvalidated_species?(o(),n("div",qe,[s("button",{class:"btn btn-success",onClick:t[1]||(t[1]=(...c)=>a.validateAllSpecies&&a.validateAllSpecies(...c))},"Validate All Species")])):_("",!0),s("table",et,[s("thead",tt,[s("tr",null,[st,(o(!0),n(h,null,p(l.fields.species,c=>(o(),n("th",{key:c,textContent:d(c)},null,8,ot))),128)),a.admin?(o(),n("th",nt,"Validate")):_("",!0)])]),s("tbody",null,[(o(!0),n(h,null,p(u.count_form.species_list,(c,r)=>(o(),n("tr",{key:c.id,class:y(a.speciesRowClass(c))},[s("td",null,d(r+1),1),s("td",null,d(c.common_name),1),s("td",null,d(c.scientific_name),1),s("td",null,d(c.individuals),1),s("td",null,d(c.remarks),1),s("td",null,d(c.status),1),a.admin?(o(),n("td",it,[(o(!0),n(h,null,p(l.statuses,f=>(o(),n("div",{key:f},[f!=c.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:d(f),onClick:i=>a.setSpeciesStatus(c,f)},null,8,lt)):_("",!0)]))),128))])):_("",!0)],2))),128))])])])):_("",!0)],2)}const ct=g(Oe,[["render",at],["__scopeId","data-v-d5d1afb0"]]);const rt={name:"ModalUserCountsData",props:{show:{type:Boolean,default:!1}},components:{CountFormRow:ct},emits:["close"],data(){return{}},computed:{...A({user_data:e=>e.butterfly_counts.user_data})},methods:{closeModal(){this.$emit("close")}}},dt=e=>(x("data-v-2cfaf88a"),e=e(),S(),e),ut={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},_t={class:"modal-dialog modal-fullscreen"},mt={class:"modal-content"},ht={class:"modal-header"},pt=dt(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Your Counts Data",-1)),ft={class:"modal-body"},bt={key:0,class:"count-forms-coutanier"},vt={key:1},yt={class:"modal-footer"},gt={key:1,class:"modal-backdrop fade show"};function kt(e,t,u,k,l,a){const c=w("count-form-row");return o(),n(h,null,[u.show?(o(),n("div",ut,[s("div",_t,[s("div",mt,[s("div",ht,[pt,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...r)=>a.closeModal&&a.closeModal(...r))})]),s("div",ft,[e.user_data.length!=0?(o(),n("div",bt,[(o(!0),n(h,null,p(e.user_data,r=>(o(),M(c,{key:r.id,count_form:r},null,8,["count_form"]))),128))])):(o(),n("div",vt,d(e.user_data),1))]),s("div",yt,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...r)=>a.closeModal&&a.closeModal(...r))},"Close")])])])])):_("",!0),u.show?(o(),n("div",gt)):_("",!0)],64)}const Ct=g(rt,[["render",kt],["__scopeId","data-v-2cfaf88a"]]);const wt={name:"ButterflyCounts",components:{CountForm:Se,ModalAboutBBMApp:Ne,ModalUserCountsData:Ct},data(){return{nav_links:[{label:"About",value:"about"},{label:"Add",value:"add"},{label:"Data",value:"data"}],current_nav:"add",show_modal:{about:!1,user_data:!1}}},methods:{navClick(e){this.current_nav=e.value}}},U=e=>(x("data-v-70ebe87f"),e=e(),S(),e),xt={class:"container-fluid app-container"},St={class:"button-container d-flex justify-content-around my-2"},Mt=U(()=>s("i",{class:"bi bi-info-circle"},null,-1)),At=[Mt],It=U(()=>s("i",{class:"bi bi-database"},null,-1)),Ft=[It],Bt={class:"tabs"};function Tt(e,t,u,k,l,a){const c=w("count-form"),r=w("ModalAboutBBMApp"),f=w("ModalUserCountsData");return o(),n("div",xt,[s("div",St,[s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"About",onClick:t[0]||(t[0]=i=>l.show_modal.about=!0)},At),s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"Your Data",onClick:t[1]||(t[1]=i=>l.show_modal.user_data=!0)},Ft)]),s("div",Bt,[l.current_nav=="add"?(o(),M(c,{key:0})):_("",!0)]),B(r,{show:l.show_modal.about,onClose:t[2]||(t[2]=i=>l.show_modal.about=!1)},null,8,["show"]),B(f,{show:l.show_modal.user_data,onClose:t[3]||(t[3]=i=>l.show_modal.user_data=!1)},null,8,["show"])])}const Dt=g(wt,[["render",Tt],["__scopeId","data-v-70ebe87f"]]),I=E({});I.component("butterfly-counts",Dt);I.use(C);I.mount("#app");"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service Worker registered with scope:",e.scope)}).catch(e=>{console.error("Service Worker registration failed:",e)})});
