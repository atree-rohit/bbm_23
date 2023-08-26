import{_ as g,c as n,w as b,v as y,b as s,D as V,t as u,F as h,j as p,d as _,o,m as A,s as C,r as w,n as v,l as M,p as S,i as x,h as U,E as j,k as T,f as $}from"./_plugin-vue_export-helper-620fe847.js";/* empty css                        */const L={name:"AutoComplete",props:{question:{type:Object,required:!0},suggestions:{type:Array,required:!0},value:{type:String,required:!0}},emits:["selected"],data(){return{searchText:"",showSuggestions:!1,filteredSuggestions:[],typingTimer:null,typingTimeout:300}},watch:{value(e){this.searchText=e}},methods:{handleInput(){clearTimeout(this.typingTimer),this.searchText.length>=1?this.typingTimeout=setTimeout(()=>{this.filteredSuggestions=this.suggestions.filter(e=>e.toLowerCase().includes(this.searchText.toLowerCase())),this.showSuggestions=!0},this.typingTimeout):(this.filteredSuggestions=[],this.showSuggestions=!1)},selectSuggestion(e){this.searchText=e,this.showSuggestions=!1,this.$emit("selected",e)}}},N=["placeholder"],W=["for","textContent"],O={key:0},R=["onClick"];function P(e,t,d,k,a,l){var r;return o(),n(h,null,[b(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=c=>a.searchText=c),placeholder:`Enter ${(r=d.question)==null?void 0:r.name}`,class:"form-control",onInput:t[1]||(t[1]=(...c)=>l.handleInput&&l.handleInput(...c)),onKeydown:t[2]||(t[2]=V((...c)=>l.selectSuggestion&&l.selectSuggestion(...c),["enter"]))},null,40,N),[[y,a.searchText]]),s("label",{for:d.question.name,class:"font-weight-bold",textContent:u(d.question.label)},null,8,W),a.showSuggestions?(o(),n("ul",O,[(o(!0),n(h,null,p(a.filteredSuggestions,(c,f)=>(o(),n("li",{key:f,onClick:i=>l.selectSuggestion(c)},u(c),9,R))),128))])):_("",!0)],64)}const Y=g(L,[["render",P],["__scopeId","data-v-20384752"]]);const z={name:"CountForm",components:{AutoComplete:Y},data(){return{tabs:[{label:"User",value:"user_details"},{label:"Location",value:"location_details"},{label:"Checklist",value:"species_list"}],current_tab:"user_details",form_data:{},species_list:[],current_species:{}}},computed:{...A({quiestions:e=>e.butterfly_counts.quiestions,species_lists:e=>e.butterfly_counts.species_lists,scientific_names:e=>e.butterfly_counts.scientific_names,common_names:e=>e.butterfly_counts.common_names,user_details:e=>e.butterfly_counts.user_details,latitude:e=>e.locations.latitude,longitude:e=>e.locations.longitude}),page_questions(){let e=[];return e.push(this.quiestions.filter(t=>t.page==0)),e.push(this.quiestions.filter(t=>t.page==1)),e.push(this.quiestions.filter(t=>t.page==2)),e},completed(){let e={user_details:!0,location_details:!0,species_list:!0};return this.page_questions[0].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.user_details=!1)}),this.page_questions[1].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.location_details=!1)}),this.species_list.length==0&&(e.species_list=!1),e},current_species_completed(){var e,t;return((e=this.current_species.common_name)==null?void 0:e.length)>3||((t=this.current_species.scientific_name)==null?void 0:t.length)>3},form_completed(){return this.completed.user_details&&this.completed.location_details&&this.completed.species_list}},watch:{latitude(){this.form_data.coordinates=this.latitude+","+this.longitude},longitude(){this.form_data.coordinates=this.latitude+","+this.longitude}},created(){C.dispatch("locations/init"),C.dispatch("butterfly_counts/init"),this.initFormData()},methods:{initFormData(){let e="";this.page_questions[0].map(t=>{this.form_data[t.name]=t.required?e:null}),this.page_questions[1].map(t=>{this.form_data[t.name]=t.required?e:null}),this.form_data.open_access=!0,this.form_data.date=new Date().toISOString().slice(0,10),this.form_data.start_time=new Date().toLocaleTimeString(),this.species_list=[],this.initCurrentSpecies(),this.initTab()},initCurrentSpecies(){this.current_species={common_name:"",scientific_name:"",individuals:1,remarks:null}},initTab(){this.user_details&&Object.keys(this.user_details).length>0&&(Object.keys(this.user_details).forEach(e=>{this.form_data[e]=this.user_details[e]}),this.current_tab="location_details")},tabClass(e){let t=this.current_tab==e.value?"active":"";switch(e.value){case"location_details":t+=this.completed.user_details?"":" disabled";break;case"species_list":t+=this.completed.location_details?"":" disabled";break}return t},tabClick(e){this.current_tab=e.value},commonNameSelected(e){this.current_species.common_name=e;let t=this.species_lists.synoptic.find(d=>d[1]==e);if(t){this.current_species.scientific_name=t[0];return}t=this.species_lists.ifb.find(d=>d[1]==e),t&&(this.current_species.scientific_name=t[0])},scientificNameSelected(e){this.current_species.scientific_name=e;let t=this.species_lists.synoptic.find(d=>d[0]==e);if(t){this.current_species.common_name=t[1];return}t=this.species_lists.ifb.find(d=>d[0]==e),t&&(this.current_species.common_name=t[1])},decreaseIndividuals(){this.current_species.individuals>1&&this.current_species.individuals--},addSpecies(){if(!this.current_species_completed)return;const e=Object.assign({},this.current_species);console.log("addSpecies()",e),this.species_list.push(e),this.initCurrentSpecies()},deleteSpecies(e){confirm("Are you sure you want to delete this species?")&&this.species_list.splice(e,1)},getPoints(){C.dispatch("locations/getCurrentCoordinates")},changeIndividuals(e,t){t=="+"?this.species_list[e].individuals++:this.species_list[e].individuals>1&&this.species_list[e].individuals--},submitForm(){if(!this.form_completed)return;let e={...this.form_data,species_list:this.species_list};C.dispatch("butterfly_counts/submitForm",e),this.initFormData()}}},F=e=>(S("data-v-19c267f4"),e=e(),x(),e),G={class:"container-fluid form-container"},H={class:"nav nav-tabs"},J=["onClick","textContent"],K={class:"main-container"},Q={key:0,class:"questions-container"},X=["onUpdate:modelValue","placeholder"],Z=["onUpdate:modelValue","placeholder"],q=["onUpdate:modelValue","placeholder"],ee=["onUpdate:modelValue","placeholder"],te=["onUpdate:modelValue","placeholder"],se={key:5,class:"my-auto"},oe=["for","textContent"],ne={key:7,class:"form-check form-switch h1 ms-auto p-1 my-1"},ie=["checked"],ae=["onUpdate:modelValue","placeholder"],le=["onUpdate:modelValue","placeholder"],re=["for","textContent"],ce={key:5,class:"my-auto"},de={class:"btns-section"},ue={class:"border border-secondary rounded"},_e=F(()=>s("h3",{class:"bg-warning m-0 p-2 text-center"},"Species List",-1)),me={key:0,class:"table table-sm table-hover table-responsive border border-primary species-table"},he=F(()=>s("thead",null,[s("tr",{class:"bg-info"},[s("th",null,"No."),s("th",null,"Common"),s("th",null,"Scientific"),s("th",null,"Individuals"),s("th",null,"Actions")])],-1)),pe={class:"table-info"},fe=["textContent"],be=["textContent"],ye=["textContent"],ve={class:"individuals-cell"},ge={class:"container-fluid d-flex justify-content-around"},ke=["onClick"],Ce={class:"my-auto"},we=["onClick"],Se=["onClick"],xe={class:"btns-section"};function Me(e,t,d,k,a,l){const r=w("auto-complete");return o(),n("div",G,[s("ul",H,[(o(!0),n(h,null,p(a.tabs,c=>(o(),n("li",{class:"nav-item",key:c.value},[s("a",{class:v(["nav-link",l.tabClass(c)]),onClick:f=>l.tabClick(c),textContent:u(c.label),href:"#"},null,10,J)]))),128))]),s("div",K,[(o(!0),n(h,null,p(a.tabs,(c,f)=>(o(),n(h,{key:c.value},[c.value==a.current_tab?(o(),n("div",Q,[(o(!0),n(h,null,p(l.page_questions[f],i=>(o(),n("div",{key:i.name,class:"form-floating mb-2"},[f<2?(o(),n(h,{key:0},[i.type=="text"?b((o(),n("input",{key:0,type:"text","onUpdate:modelValue":m=>a.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,X)),[[y,a.form_data[i.name]]]):i.type=="textarea"?b((o(),n("textarea",{key:1,"onUpdate:modelValue":m=>a.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,Z)),[[y,a.form_data[i.name]]]):i.type=="date"?b((o(),n("input",{key:2,type:"date","onUpdate:modelValue":m=>a.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,q)),[[y,a.form_data[i.name]]]):i.type=="time"?b((o(),n("input",{key:3,type:"time","onUpdate:modelValue":m=>a.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,ee)),[[y,a.form_data[i.name]]]):_("",!0),i.type=="location"?b((o(),n("input",{key:4,type:"text","onUpdate:modelValue":m=>a.form_data[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control w-75"},null,8,te)),[[y,a.form_data[i.name]]]):_("",!0),i.type=="location"?(o(),n("div",se,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[0]||(t[0]=(...m)=>l.getPoints&&l.getPoints(...m))},"Get Coordinates")])):_("",!0),i.type!="location"?(o(),n("label",{key:6,for:i.name,class:v(["font-weight-bold",{required:i.required}]),textContent:u(i.label)},null,10,oe)):_("",!0),i.type=="checkbox"?(o(),n("div",ne,[s("input",{class:v(["form-check-input",a.form_data.open_access?"bg-success":"bg-danger"]),type:"checkbox",checked:a.form_data.open_access,onClick:t[1]||(t[1]=m=>a.form_data.open_access=!a.form_data.open_access)},null,10,ie)])):_("",!0)],64)):(o(),n(h,{key:1},[i.type=="autocomplete_common"?(o(),M(r,{key:0,question:i,suggestions:e.common_names,value:a.current_species.common_name,onSelected:l.commonNameSelected},null,8,["question","suggestions","value","onSelected"])):i.type=="autocomplete_scientific"?(o(),M(r,{key:1,question:i,suggestions:e.scientific_names,value:a.current_species.scientific_name,onSelected:l.scientificNameSelected},null,8,["question","suggestions","value","onSelected"])):_("",!0),i.type=="increment"?b((o(),n("input",{key:2,type:"number",min:"1","onUpdate:modelValue":m=>a.current_species[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control w-75"},null,8,ae)),[[y,a.current_species[i.name]]]):i.type=="textarea"?b((o(),n("textarea",{key:3,"onUpdate:modelValue":m=>a.current_species[i.name]=m,placeholder:`Enter ${i.name}`,class:"form-control"},null,8,le)),[[y,a.current_species[i.name]]]):_("",!0),i.type!="autocomplete_common"&&i.type!="autocomplete_scientific"?(o(),n("label",{key:4,for:i.name,class:v(["font-weight-bold",{required:i.required}]),textContent:u(i.label)},null,10,re)):_("",!0),i.type=="increment"?(o(),n("div",ce,[s("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[2]||(t[2]=m=>a.current_species.individuals++)},"+"),s("button",{class:"btn btn-outline-success px-3",onClick:t[3]||(t[3]=(...m)=>l.decreaseIndividuals&&l.decreaseIndividuals(...m))},"-")])):_("",!0)],64))]))),128)),a.current_tab=="species_list"?(o(),n(h,{key:0},[s("div",de,[a.current_tab=="species_list"?(o(),n("button",{key:0,class:v(["btn btn-lg",l.current_species_completed?"btn-success":"btn-disabled"]),onClick:t[4]||(t[4]=(...i)=>l.addSpecies&&l.addSpecies(...i))},"Add Species",2)):_("",!0)]),s("div",ue,[_e,a.species_list.length?(o(),n("table",me,[he,s("tbody",pe,[(o(!0),n(h,null,p(a.species_list,(i,m)=>(o(),n("tr",{key:m},[s("td",{textContent:u(m+1)},null,8,fe),s("td",{textContent:u(i.common_name)},null,8,be),s("td",{textContent:u(i.scientific_name)},null,8,ye),s("td",ve,[s("div",ge,[s("button",{class:"btn btn-sm btn-outline-success",onClick:B=>l.changeIndividuals(m,"-")},"-",8,ke),s("div",Ce,u(i.individuals),1),s("button",{class:"btn btn-sm btn-outline-success",onClick:B=>l.changeIndividuals(m,"+")},"+",8,we)])]),s("td",null,[s("button",{type:"button",class:"btn btn-danger btn-sm",textContent:"X",onClick:B=>l.deleteSpecies(m)},null,8,Se)])]))),128))])])):_("",!0)])],64)):_("",!0)])):_("",!0)],64))),128)),s("div",xe,[s("button",{class:v(["btn btn-lg",l.form_completed?"btn-success":"btn-disabled"]),onClick:t[5]||(t[5]=(...c)=>l.submitForm&&l.submitForm(...c))},"Submit Form",2)])])])}const Ae=g(z,[["render",Me],["__scopeId","data-v-19c267f4"]]);const Ie={name:"ModalAboutBBMApp",props:{show:{type:Boolean,default:!1}},emits:["close"],data(){return{points:[["🕒","Quick Counts, Big Fun","Each count takes just 30 minutes. Imagine, in just half an hour, you're uncovering the secrets of nature!"],["🚶‍♀️","Forget the Distance","It's not about how far you go, but what you discover along the way. Estimate your journey distance during each 30-minute count - a fascinating challenge!"],["🦋","One-Way Magic","Follow the butterflies from Point A to Point B. Capture the enchantment of their journey, and if you spot different species on the way back, note them too! Explore new routes for added thrill!"],["📸","Snap the Beauty","Get ready to photograph these incredible creatures. Even if you can't name them all, just record the group or genus. A Grass Yellow becomes an adventure in itself!"],["☀️","Sunshine Quest","Choose the perfect sunny moment when butterflies are most active. Feel the warmth, embrace the excitement!"],["📝","Easy Sheets, More Joy","Each 30-minute adventure gets its own sheet. Fill it up, submit, and let the discoveries flow!"],["🟡","Highlight Your Insights","Those golden questions with red stars? They're the key to our shared exploration. Required and rewarding - make sure to fill them in!"],["🚫","Stay Still, Dive Deep","Dive into the data without moving cells. Let the information flow while keeping everything organized."]]}},methods:{closeModal(){this.$emit("close")}}},Be=e=>(S("data-v-94c0aa94"),e=e(),x(),e),Te={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},Fe={class:"modal-dialog modal-lg"},De={class:"modal-content"},Ee={class:"modal-header"},Ve=Be(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"🦋 Join the Butterfly Adventure! Count and Explore! 🦋",-1)),Ue={class:"modal-body"},je={class:"px-2 fw-bold"},$e={class:"px-2"},Le={class:"modal-footer"},Ne={key:1,class:"modal-backdrop fade show"};function We(e,t,d,k,a,l){return o(),n(h,null,[d.show?(o(),n("div",Te,[s("div",Fe,[s("div",De,[s("div",Ee,[Ve,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...r)=>l.closeModal&&l.closeModal(...r))})]),s("div",Ue,[(o(!0),n(h,null,p(a.points,(r,c)=>(o(),n("div",{key:c,class:"py-2"},[s("span",null,u(r[0]),1),s("span",je,u(r[1]),1),s("span",$e,u(r[2]),1)]))),128))]),s("div",Le,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...r)=>l.closeModal&&l.closeModal(...r))},"Close")])])])])):_("",!0),d.show?(o(),n("div",Ne)):_("",!0)],64)}const Oe=g(Ie,[["render",We],["__scopeId","data-v-94c0aa94"]]);const Re={name:"CountFormRow",props:{count_form:{type:Object,required:!0}},data(){return{fields:{form:["name","affiliation","phone","email","team_members","open_access","location","state","district","latitude","longitude","date","start_time","end_time","altitude","distance","weather","photo_link","status","comments"],form_mini:["location","state","district","latitude","longitude","date","start_time","end_time"],species:["common_name","scientific_name","individuals","remarks","status"]},statuses:["pending","approved","duplicate","rejected"],show_details:!1}},computed:{...A({is_super_admin:e=>e.auth.is_super_admin,is_admin:e=>e.auth.is_admin,user:e=>e.auth.user}),admin(){return this.is_super_admin||this.is_admin},form_validate_flag(){let e=!1;return this.count_form.species_list.filter(t=>t.status=="approved").length>0&&(e=!0),e},unvalidated_species(){return this.count_form.species_list.filter(e=>e.status!="approved").length>0}},methods:{buttonText(){return this.show_details?"Hide Details":"Show Details"},rowClass(){return this.count_form.status=="approved"?"form-approved":"form-pending"},speciesRowClass(e){return e.status=="approved"?"table-success":"table-danger"},setFormStatus(e){let t={form_id:this.count_form.id,status:e};this.$store.dispatch("count_forms/setFormStatus",t)},setSpeciesStatus(e,t){let d={species_id:e.id,status:t};this.$store.dispatch("count_forms/setSpeciesStatus",d)},validateAllSpecies(){this.count_form.species_list.forEach(e=>{e.status!="approved"&&this.setSpeciesStatus(e,"approved")})}}},D=e=>(S("data-v-d5d1afb0"),e=e(),x(),e),Pe={class:"form-data-container"},Ye=["textContent"],ze=["textContent"],Ge={class:"text-center"},He=["textContent"],Je={key:0,class:"species-list container-fluid"},Ke={key:0,class:"border border-success text-center m-1 p-2 d-flex"},Qe=D(()=>s("span",null,"Set Count Form Status",-1)),Xe=["textContent","onClick"],Ze={class:"table table-sm"},qe=["textContent"],et=["textContent"],tt={key:1,class:"border border-success text-center m-1 p-2"},st={class:"table table-sm"},ot={class:"bg-dark text-light"},nt=D(()=>s("th",null,"Sl. No",-1)),it=["textContent"],at={key:0,class:"bg-success"},lt={key:0,class:"d-flex justify-content-around"},rt=["textContent","onClick"];function ct(e,t,d,k,a,l){return o(),n("div",{class:v(["form-row",l.rowClass()])},[s("div",Pe,[(o(!0),n(h,null,p(a.fields.form_mini,r=>(o(),n("div",{key:r,class:"form-field"},[s("span",{textContent:u(r)},null,8,Ye),s("span",{textContent:u(d.count_form[r])},null,8,ze)]))),128))]),s("div",Ge,[s("button",{class:"btn btn-success btn-sm m-1",onClick:t[0]||(t[0]=r=>a.show_details=!a.show_details),textContent:u(l.buttonText())},null,8,He)]),a.show_details?(o(),n("div",Je,[l.admin?(o(),n("div",Ke,[Qe,(o(!0),n(h,null,p(a.statuses,r=>(o(),n("div",{key:r,class:"mx-2"},[r!=d.count_form.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:u(r),onClick:c=>l.setFormStatus(r)},null,8,Xe)):_("",!0)]))),128))])):_("",!0),s("table",Ze,[s("tbody",null,[(o(!0),n(h,null,p(a.fields.form,r=>(o(),n("tr",{key:r},[s("td",{textContent:u(r)},null,8,qe),s("td",{textContent:u(d.count_form[r])},null,8,et)]))),128))])]),l.admin&&l.unvalidated_species?(o(),n("div",tt,[s("button",{class:"btn btn-success",onClick:t[1]||(t[1]=(...r)=>l.validateAllSpecies&&l.validateAllSpecies(...r))},"Validate All Species")])):_("",!0),s("table",st,[s("thead",ot,[s("tr",null,[nt,(o(!0),n(h,null,p(a.fields.species,r=>(o(),n("th",{key:r,textContent:u(r)},null,8,it))),128)),l.admin?(o(),n("th",at,"Validate")):_("",!0)])]),s("tbody",null,[(o(!0),n(h,null,p(d.count_form.species_list,(r,c)=>(o(),n("tr",{key:r.id,class:v(l.speciesRowClass(r))},[s("td",null,u(c+1),1),s("td",null,u(r.common_name),1),s("td",null,u(r.scientific_name),1),s("td",null,u(r.individuals),1),s("td",null,u(r.remarks),1),s("td",null,u(r.status),1),l.admin?(o(),n("td",lt,[(o(!0),n(h,null,p(a.statuses,f=>(o(),n("div",{key:f},[f!=r.status?(o(),n("button",{key:0,class:"btn btn-success btn-sm",textContent:u(f),onClick:i=>l.setSpeciesStatus(r,f)},null,8,rt)):_("",!0)]))),128))])):_("",!0)],2))),128))])])])):_("",!0)],2)}const dt=g(Re,[["render",ct],["__scopeId","data-v-d5d1afb0"]]);const ut={name:"ModalUserCountsData",props:{show:{type:Boolean,default:!1}},components:{CountFormRow:dt},emits:["close"],data(){return{}},computed:{...A({user_data:e=>e.butterfly_counts.user_data})},methods:{closeModal(){this.$emit("close")}}},_t=e=>(S("data-v-af270e38"),e=e(),x(),e),mt={key:0,class:"modal fade show","aria-modal":"true",role:"dialog"},ht={class:"modal-dialog modal-fullscreen"},pt={class:"modal-content"},ft={class:"modal-header"},bt=_t(()=>s("h3",{class:"modal-title",id:"exampleModalLiveLabel"},"Your Counts Data",-1)),yt={class:"modal-body"},vt={key:0,class:"count-forms-coutanier"},gt={key:1},kt=j("<p data-v-af270e38>🦋 Attention Butterfly Enthusiast! 🦋</p><p data-v-af270e38>We&#39;re thrilled you&#39;re participating in Big Butterfly Month and documenting these delicate creatures with us. However, it seems we&#39;re missing some crucial information on your end.</p><p data-v-af270e38>⚠️ We couldn&#39;t find your user details! ⚠️</p><p data-v-af270e38>Don&#39;t worry, your previously submitted forms are safe. If you&#39;ve already documented butterflies this month and they&#39;re not visible, here&#39;s what you can do:</p><p data-v-af270e38><b data-v-af270e38>1. Submit Another Form:</b> Simply submit another checklist of butterflies. This will help us locate and display your previous submissions.</p><p data-v-af270e38><b data-v-af270e38>2. Double-Check Email:</b> Make sure your email address is correctly stored. This ensures we can connect your submissions to you accurately.</p><p data-v-af270e38><b data-v-af270e38>3. Smooth Sailing Ahead:</b> Once you&#39;ve submitted another checklist, your previous forms should reappear like magic. We&#39;re working diligently to ensure your valuable contributions are counted.</p><p data-v-af270e38>Remember, every butterfly you document makes a difference in our understanding of these beautiful creatures and their habitats. Your dedication is greatly appreciated!</p><p data-v-af270e38>If you encounter any issues, don&#39;t hesitate to reach out to our support team at support@bigbutterflymonth.org. We&#39;re here to help you make your butterfly observations count.</p><p data-v-af270e38>Thank you for being a part of this citizen science event and helping us make a positive impact on the butterfly world. Flutter on!</p><p data-v-af270e38>Best regards,</p>",11),Ct={class:"modal-footer"},wt={key:1,class:"modal-backdrop fade show"};function St(e,t,d,k,a,l){const r=w("count-form-row");return o(),n(h,null,[d.show?(o(),n("div",mt,[s("div",ht,[s("div",pt,[s("div",ft,[bt,s("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...c)=>l.closeModal&&l.closeModal(...c))})]),s("div",yt,[e.user_data.length!=0?(o(),n("div",vt,[(o(!0),n(h,null,p(e.user_data,c=>(o(),M(r,{key:c.id,count_form:c},null,8,["count_form"]))),128))])):(o(),n("div",gt,[kt,U(" The Big Butterfly Month Team 🌼 ")]))]),s("div",Ct,[s("button",{type:"button",class:"btn btn-secondary",onClick:t[1]||(t[1]=(...c)=>l.closeModal&&l.closeModal(...c))},"Close")])])])])):_("",!0),d.show?(o(),n("div",wt)):_("",!0)],64)}const xt=g(ut,[["render",St],["__scopeId","data-v-af270e38"]]);const Mt={name:"ButterflyCounts",components:{CountForm:Ae,ModalAboutBBMApp:Oe,ModalUserCountsData:xt},data(){return{nav_links:[{label:"About",value:"about"},{label:"Add",value:"add"},{label:"Data",value:"data"}],current_nav:"add",show_modal:{about:!1,user_data:!1}}},methods:{navClick(e){this.current_nav=e.value}}},E=e=>(S("data-v-70ebe87f"),e=e(),x(),e),At={class:"container-fluid app-container"},It={class:"button-container d-flex justify-content-around my-2"},Bt=E(()=>s("i",{class:"bi bi-info-circle"},null,-1)),Tt=[Bt],Ft=E(()=>s("i",{class:"bi bi-database"},null,-1)),Dt=[Ft],Et={class:"tabs"};function Vt(e,t,d,k,a,l){const r=w("count-form"),c=w("ModalAboutBBMApp"),f=w("ModalUserCountsData");return o(),n("div",At,[s("div",It,[s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"About",onClick:t[0]||(t[0]=i=>a.show_modal.about=!0)},Tt),s("button",{class:"btn btn-outline-primary badge rounded-pill text-info",title:"Your Data",onClick:t[1]||(t[1]=i=>a.show_modal.user_data=!0)},Dt)]),s("div",Et,[a.current_nav=="add"?(o(),M(r,{key:0})):_("",!0)]),T(c,{show:a.show_modal.about,onClose:t[2]||(t[2]=i=>a.show_modal.about=!1)},null,8,["show"]),T(f,{show:a.show_modal.user_data,onClose:t[3]||(t[3]=i=>a.show_modal.user_data=!1)},null,8,["show"])])}const Ut=g(Mt,[["render",Vt],["__scopeId","data-v-70ebe87f"]]),I=$({});I.component("butterfly-counts",Ut);I.use(C);I.mount("#app");"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service Worker registered with scope:",e.scope)}).catch(e=>{console.error("Service Worker registration failed:",e)})});