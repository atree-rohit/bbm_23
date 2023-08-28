import{g as f,m as h,_ as m,r as n,c as a,b as e,F as r,j as g,k as o,o as i,t as _,p as b,i as v,f as y,s as w}from"./_plugin-vue_export-helper-7d2ea893.js";import{P as k}from"./Partners-a682b178.js";import{D as B}from"./DistrictCoordinators-134c45d6.js";import{F as x}from"./Footer-e9db03ee.js";import"./FileUploadComponent-47907c1c.js";import"./indexRollupNext-89f6c8fa.js";/* empty css                        */const A=f({name:"About",components:{Partners:k,DistrictCoordinators:B,Footer:x},data(){return{paragraphs:["Big Butterfly Month is a citizen science initiative dedicated to celebrating and conserving butterflies. Our mission is to unite butterfly enthusiasts, students, families, and nature lovers in contributing valuable data that enhances our understanding of these delicate wonders of nature. By participating in butterfly walks, submitting observations, and engaging in various activities, you become an integral part of our journey to safeguard butterflies and their habitats.","At Big Butterfly Month, we believe in the power of community and collaboration. We actively seek partnerships with educational institutions, nature clubs, wildlife organizations, and local communities to organize awareness programs, workshops, and events focused on butterfly conservation and citizen science. By building a strong community of participants and allies, we can amplify our impact and foster a collective passion for preserving butterfly populations throughout India.","Citizen scientists can upload their observations and engage with experts and fellow enthusiasts. This process empowers contributors, offering feedback and guidance to hone butterfly identification skills and build confidence. The platforms also serve as valuable learning tools, inspiring individuals to actively participate in butterfly conservation initiatives and nurturing a deeper appreciation for these magnificent creatures.","Join us on this exciting journey of discovery and conservation! Together, we can make a difference for butterflies, ensuring a brighter future for these enchanting insects and the ecosystems they inhabit. Your participation and support are vital in advancing our cause, and we eagerly anticipate celebrating the beauty and significance of butterflies with you during Big Butterfly Month and beyond."]}},computed:{...h({user:t=>t.auth.user,all_data:t=>t.resources.all_data})},mounted(){},methods:{gotoLink(t){window.open(t,"_blank")}}}),C=t=>(b("data-v-a433bc04"),t=t(),v(),t),F=C(()=>e("div",{class:"header d-flex px-2"},[e("div",{class:"h1"},"About Us")],-1)),z={class:"main-container m-1"},I={class:"section paragraphs-container"},S=["textContent"],$={class:"section"},j={class:"section"};function D(t,T,L,N,P,V){const c=n("partners"),d=n("district-coordinators"),u=n("Footer");return i(),a(r,null,[F,e("div",z,[e("div",I,[(i(!0),a(r,null,g(t.paragraphs,(p,l)=>(i(),a("p",{key:l,class:"section-text fs-5",textContent:_(p)},null,8,S))),128))]),e("div",$,[o(c)]),e("div",j,[o(d)])]),o(u)],64)}const M=m(A,[["render",D],["__scopeId","data-v-a433bc04"]]),s=y({});s.component("about",M);s.use(w);s.mount("#app");