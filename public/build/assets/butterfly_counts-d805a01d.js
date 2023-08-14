import{_ as k,c as i,w as h,v as f,b as o,x as U,t as _,F as m,i as y,d as u,o as n,m as I,s as v,r as w,n as g,l as C,p as F,k as A,f as E}from"./_plugin-vue_export-helper-ecf7da26.js";import{d as T}from"./districts-fe2f3589.js";const D={name:"AutoComplete",props:{question:{type:Object,required:!0},suggestions:{type:Array,required:!0},value:{type:String,required:!0}},emits:["selected"],data(){return{searchText:"",showSuggestions:!1,filteredSuggestions:[]}},watch:{value(e){this.searchText=e}},methods:{handleInput(){this.searchText.length>=1?(this.filteredSuggestions=this.suggestions.filter(e=>e.toLowerCase().includes(this.searchText.toLowerCase())),this.showSuggestions=!0):(this.filteredSuggestions=[],this.showSuggestions=!1)},selectSuggestion(e){this.searchText=e,this.showSuggestions=!1,this.$emit("selected",e)}}},N=["placeholder"],B=["for","textContent"],L={key:0},j=["onClick"];function O(e,t,d,x,l,a){var p;return n(),i(m,null,[h(o("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=c=>l.searchText=c),placeholder:`Enter ${(p=d.question)==null?void 0:p.name}`,class:"form-control",onInput:t[1]||(t[1]=(...c)=>a.handleInput&&a.handleInput(...c)),onKeydown:t[2]||(t[2]=U((...c)=>a.selectSuggestion&&a.selectSuggestion(...c),["enter"]))},null,40,N),[[f,l.searchText]]),o("label",{for:d.question.name,class:"font-weight-bold",textContent:_(d.question.label)},null,8,B),l.showSuggestions?(n(),i("ul",L,[(n(!0),i(m,null,y(l.filteredSuggestions,(c,b)=>(n(),i("li",{key:b,onClick:s=>a.selectSuggestion(c)},_(c),9,j))),128))])):u("",!0)],64)}const P=k(D,[["render",O],["__scopeId","data-v-e54895dc"]]);const K={name:"CountForm",components:{AutoComplete:P},data(){return{tabs:[{label:"User",value:"user_details"},{label:"Location",value:"location_details"},{label:"Checklist",value:"species_list"}],current_tab:"user_details",form_data:{},species_list:[],current_species:{},states:[]}},computed:{...I({quiestions:e=>e.butterfly_counts.quiestions,species_lists:e=>e.butterfly_counts.species_lists,scientific_names:e=>e.butterfly_counts.scientific_names,common_names:e=>e.butterfly_counts.common_names,latitude:e=>e.locations.latitude,longitude:e=>e.locations.longitude}),page_questions(){let e=[];return e.push(this.quiestions.filter(t=>t.page==0)),e.push(this.quiestions.filter(t=>t.page==1)),e.push(this.quiestions.filter(t=>t.page==2)),console.log(11,e),e},completed(){let e={user_details:!0,location_details:!0,species_list:!0};return this.page_questions[0].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.user_details=!1)}),this.page_questions[1].filter(t=>t.required).map(t=>{this.form_data[t.name]==""&&(e.location_details=!1)}),this.species_list.length==0&&(e.species_list=!1),e},current_species_completed(){var e,t;return((e=this.current_species.common_name)==null?void 0:e.length)>3||((t=this.current_species.scientific_name)==null?void 0:t.length)>3},form_completed(){return this.completed.user_details&&this.completed.location_details&&this.completed.species_list}},watch:{latitude(){this.form_data.coordinates=this.latitude+","+this.longitude},longitude(){this.form_data.coordinates=this.latitude+","+this.longitude}},created(){v.dispatch("locations/init"),v.dispatch("butterfly_counts/initNames"),this.initFormData()},methods:{initFormData(){let e="";this.page_questions[0].map(t=>{this.form_data[t.name]=t.required?e:null}),this.page_questions[1].map(t=>{this.form_data[t.name]=t.required?e:null}),this.form_data.date=new Date().toISOString().slice(0,10),this.form_data.start_time=new Date().toLocaleTimeString(),this.form_data.state="",this.states=[...new Set(T.features.map(t=>t.properties.state))],this.species_list=[],this.initCurrentSpecies()},initCurrentSpecies(){this.current_species={common_name:"",scientific_name:"",individuals:1,remarks:null}},tabClass(e){let t=this.current_tab==e.value?"active":"";switch(e.value){case"location_details":t+=this.completed.user_details?"":" disabled";break;case"species_list":t+=this.completed.location_details?"":" disabled";break}return t},tabClick(e){this.current_tab=e.value},stateSelected(e){this.form_data.state_name=e},commonNameSelected(e){this.current_species.common_name=e;let t=this.species_lists.synoptic.find(d=>d[1]==e);if(t){this.current_species.scientific_name=t[0];return}t=this.species_lists.ifb.find(d=>d[1]==e),t&&(this.current_species.scientific_name=t[0])},scientificNameSelected(e){this.current_species.scientific_name=e;let t=this.species_lists.synoptic.find(d=>d[0]==e);if(t){this.current_species.common_name=t[1];return}t=this.species_lists.ifb.find(d=>d[0]==e),t&&(this.current_species.common_name=t[1])},decreaseIndividuals(){this.current_species.individuals>0&&this.current_species.individuals--},addSpecies(){const e=Object.assign({},this.current_species);console.log(e),this.species_list.push(e),this.initCurrentSpecies()},deleteSpecies(e){confirm("Are you sure you want to delete this species?")&&this.species_list.splice(e,1)},getPoints(){v.dispatch("locations/getCurrentCoordinates")},submitForm(){let e={...this.form_data,species_list:this.species_list};v.dispatch("butterfly_counts/submitForm",e),this.initFormData()}}},V=e=>(F("data-v-785daf4f"),e=e(),A(),e),z={class:"container-fluid form-container"},G={class:"nav nav-tabs"},M=["onClick","textContent"],X={class:"main-container"},H={key:0,class:"questions-container"},J={key:0},Q=V(()=>o("h1",{class:"bg-danger"},"Species List",-1)),R={key:0,class:"table table-sm table-hover table-responsive border border-primary"},W=V(()=>o("thead",null,[o("tr",{class:"bg-info"},[o("th",null,"No."),o("th",null,"Common"),o("th",null,"Scientific"),o("th",null,"Individuals"),o("th",null,"Actions")])],-1)),Y={class:"table-info"},Z=["textContent"],q=["textContent"],$=["textContent"],ee=["textContent"],te=["onClick"],se=["onUpdate:modelValue","placeholder"],ne=["onUpdate:modelValue","placeholder"],le=["onUpdate:modelValue","placeholder"],ie=["onUpdate:modelValue","placeholder"],oe=["onUpdate:modelValue","placeholder"],ae={key:6,class:"my-auto"},ce=["for","textContent"],re=["onUpdate:modelValue","placeholder"],ue=["onUpdate:modelValue","placeholder"],de=["for","textContent"],_e={key:5,class:"my-auto"},me={class:"btns-section"};function pe(e,t,d,x,l,a){const p=w("auto-complete");return n(),i("div",z,[o("ul",G,[(n(!0),i(m,null,y(l.tabs,c=>(n(),i("li",{class:"nav-item",key:c.value},[o("a",{class:g(["nav-link",a.tabClass(c)]),onClick:b=>a.tabClick(c),textContent:_(c.label),href:"#"},null,10,M)]))),128))]),o("div",X,[(n(!0),i(m,null,y(l.tabs,(c,b)=>(n(),i(m,{key:c.value},[c.value==l.current_tab?(n(),i("div",H,[l.current_tab=="species_list"?(n(),i("div",J,[Q,l.species_list.length?(n(),i("table",R,[W,o("tbody",Y,[(n(!0),i(m,null,y(l.species_list,(s,r)=>(n(),i("tr",{key:r},[o("td",{textContent:_(r+1)},null,8,Z),o("td",{textContent:_(s.common_name)},null,8,q),o("td",{textContent:_(s.scientific_name)},null,8,$),o("td",{textContent:_(s.individuals)},null,8,ee),o("td",null,[o("button",{type:"button",class:"btn btn-danger btn-sm",textContent:"X",onClick:we=>a.deleteSpecies(r)},null,8,te)])]))),128))])])):u("",!0)])):u("",!0),(n(!0),i(m,null,y(a.page_questions[b],s=>(n(),i("div",{key:s.name,class:"form-floating mb-2"},[b<2?(n(),i(m,{key:0},[s.type=="text"?h((n(),i("input",{key:0,type:"text","onUpdate:modelValue":r=>l.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,se)),[[f,l.form_data[s.name]]]):s.type=="textarea"?h((n(),i("textarea",{key:1,"onUpdate:modelValue":r=>l.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,ne)),[[f,l.form_data[s.name]]]):s.type=="date"?h((n(),i("input",{key:2,type:"date","onUpdate:modelValue":r=>l.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,le)),[[f,l.form_data[s.name]]]):s.type=="time"?h((n(),i("input",{key:3,type:"time","onUpdate:modelValue":r=>l.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,ie)),[[f,l.form_data[s.name]]]):u("",!0),s.type=="location"?h((n(),i("input",{key:4,type:"text","onUpdate:modelValue":r=>l.form_data[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control w-75"},null,8,oe)),[[f,l.form_data[s.name]]]):s.type=="autocomplete_state"?(n(),C(p,{key:5,question:s,suggestions:l.states,value:l.form_data.state_name,onSelected:a.stateSelected},null,8,["question","suggestions","value","onSelected"])):u("",!0),s.type=="location"?(n(),i("div",ae,[o("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[0]||(t[0]=(...r)=>a.getPoints&&a.getPoints(...r))},"Get Coordinates")])):u("",!0),s.type!="location"||s.type!="autocomplete_state"?(n(),i("label",{key:7,for:s.name,class:g(["font-weight-bold",{required:s.required}]),textContent:_(s.label)},null,10,ce)):u("",!0)],64)):(n(),i(m,{key:1},[s.type=="autocomplete_common"?(n(),C(p,{key:0,question:s,suggestions:e.common_names,value:l.current_species.common_name,onSelected:a.commonNameSelected},null,8,["question","suggestions","value","onSelected"])):s.type=="autocomplete_scientific"?(n(),C(p,{key:1,question:s,suggestions:e.scientific_names,value:l.current_species.scientific_name,onSelected:a.scientificNameSelected},null,8,["question","suggestions","value","onSelected"])):u("",!0),s.type=="increment"?h((n(),i("input",{key:2,type:"number","onUpdate:modelValue":r=>l.current_species[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control w-75"},null,8,re)),[[f,l.current_species[s.name]]]):s.type=="textarea"?h((n(),i("textarea",{key:3,"onUpdate:modelValue":r=>l.current_species[s.name]=r,placeholder:`Enter ${s.name}`,class:"form-control"},null,8,ue)),[[f,l.current_species[s.name]]]):u("",!0),s.type!="autocomplete_common"&&s.type!="autocomplete_scientific"?(n(),i("label",{key:4,for:s.name,class:g(["font-weight-bold",{required:s.required}]),textContent:_(s.label)},null,10,de)):u("",!0),s.type=="increment"?(n(),i("div",_e,[o("button",{class:"btn btn-outline-success px-3 me-2",onClick:t[1]||(t[1]=r=>l.current_species.individuals++)},"+"),o("button",{class:"btn btn-outline-success px-3",onClick:t[2]||(t[2]=(...r)=>a.decreaseIndividuals&&a.decreaseIndividuals(...r))},"-")])):u("",!0)],64))]))),128))])):u("",!0)],64))),128)),o("div",me,[l.current_tab=="species_list"?(n(),i("button",{key:0,class:g(["btn btn-lg",a.current_species_completed?"btn-success":"btn-disabled"]),onClick:t[3]||(t[3]=(...c)=>a.addSpecies&&a.addSpecies(...c))},"Add Species",2)):u("",!0),o("button",{class:g(["btn btn-lg",a.form_completed?"btn-success":"btn-disabled"]),onClick:t[4]||(t[4]=(...c)=>a.submitForm&&a.submitForm(...c))},"Submit Form",2)])])])}const he=k(K,[["render",pe],["__scopeId","data-v-785daf4f"]]);const fe={name:"ButterflyCounts",components:{CountForm:he},data(){return{nav_links:[{label:"About",value:"about"},{label:"Add",value:"add"},{label:"Data",value:"data"}],current_nav:"add"}},methods:{navClick(e){this.current_nav=e.value}}},be={class:"container-fluid app-container"},ge={class:"tabs"},ye={class:"navbar fixed-bottom navbar-light border border-secondary bg-dark"},ve={class:"container-fluid"},Ce={class:"nav nav-tabs d-flex justify-content-around w-100"},ke=["onClick","textContent"];function Se(e,t,d,x,l,a){const p=w("count-form");return n(),i("div",be,[o("div",ge,[l.current_nav=="add"?(n(),C(p,{key:0})):u("",!0)]),o("nav",ye,[o("div",ve,[o("ul",Ce,[(n(!0),i(m,null,y(l.nav_links,c=>(n(),i("li",{class:"nav-item",key:c.value},[o("a",{class:g(["nav-link",l.current_nav==c.value?"active":""]),onClick:b=>a.navClick(c),textContent:_(c.label),href:"#"},null,10,ke)]))),128))])])])])}const xe=k(fe,[["render",Se],["__scopeId","data-v-01d867c5"]]),S=E({});S.component("butterfly-counts",xe);S.use(v);S.mount("#app");
