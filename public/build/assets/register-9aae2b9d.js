<<<<<<<< HEAD:public/build/assets/register-9aae2b9d.js
import{e as c,a as d,_ as p,c as m,b as s,w as n,v as i,t as u,h as _,o as f,f as h,s as w}from"./_plugin-vue_export-helper-2b3bbbef.js";const g={name:"register",data(){return{user:{name:"",email:"",password:"",password_confirmation:"",user_type:"user"},processing:!1}},methods:{...c({signIn:"auth/login"}),async register(){this.processing=!0,await d.post("/register",this.user).then(r=>{this.signIn(),window.location.href=window.location.origin+"/login"}).catch(r=>{console.log(r,this.user),alert(r)}).finally(()=>{this.processing=!1})}}},b={class:"container h-100"},v={class:"row h-100 align-items-center"},y={class:"col-12 col-md-6 offset-md-3"},x={class:"card shadow sm"},E={class:"card-body"},V=s("h1",{class:"text-center"},"Register",-1),P=s("hr",null,null,-1),N={class:"form-group col-12"},U=s("label",{for:"name",class:"font-weight-bold"},"Name",-1),k={class:"form-group col-12"},A=s("label",{for:"email",class:"font-weight-bold"},"Email",-1),B={class:"form-group col-12"},R=s("label",{for:"password",class:"font-weight-bold"},"Password",-1),D={class:"form-group col-12"},I=s("label",{for:"password_confirmation",class:"font-weight-bold"},"Confirm Password",-1),S={class:"col-12 mb-2"},T=["disabled"],j=s("div",{class:"col-12 text-center"},[s("label",null,[_("Already have an account? "),s("a",{href:"./login"},"Login Now!")])],-1);function C(r,o,M,q,e,l){return f(),m("div",b,[s("div",v,[s("div",y,[s("div",x,[s("div",E,[V,P,s("form",{action:"javascript:void(0)",onSubmit:o[4]||(o[4]=(...t)=>l.register&&l.register(...t)),class:"row",method:"post"},[s("div",N,[U,n(s("input",{type:"text",name:"name","onUpdate:modelValue":o[0]||(o[0]=t=>e.user.name=t),id:"name",placeholder:"Enter name",class:"form-control"},null,512),[[i,e.user.name]])]),s("div",k,[A,n(s("input",{type:"text",name:"email","onUpdate:modelValue":o[1]||(o[1]=t=>e.user.email=t),id:"email",placeholder:"Enter Email",class:"form-control"},null,512),[[i,e.user.email]])]),s("div",B,[R,n(s("input",{type:"password",name:"password","onUpdate:modelValue":o[2]||(o[2]=t=>e.user.password=t),id:"password",placeholder:"Enter Password",class:"form-control"},null,512),[[i,e.user.password]])]),s("div",D,[I,n(s("input",{type:"password_confirmation",name:"password_confirmation","onUpdate:modelValue":o[3]||(o[3]=t=>e.user.password_confirmation=t),id:"password_confirmation",placeholder:"Enter Password",class:"form-control"},null,512),[[i,e.user.password_confirmation]])]),s("div",S,[s("button",{type:"submit",disabled:e.processing,class:"btn btn-primary btn-block"},u(e.processing?"Please wait":"Register"),9,T)]),j],32)])])])])])}const L=p(g,[["render",C]]),a=h({});a.component("register",L);a.use(w);a.mount("#app");
========
import{e as c,a as d,_ as p,c as m,b as s,w as n,v as i,t as u,h as _,o as f,f as h,s as w}from"./_plugin-vue_export-helper-b0ae1e6c.js";const g={name:"register",data(){return{user:{name:"",email:"",password:"",password_confirmation:"",user_type:"user"},processing:!1}},methods:{...c({signIn:"auth/login"}),async register(){this.processing=!0,await d.post("/register",this.user).then(r=>{this.signIn(),window.location.href=window.location.origin+"/login"}).catch(r=>{console.log(r,this.user),alert(r)}).finally(()=>{this.processing=!1})}}},b={class:"container h-100"},v={class:"row h-100 align-items-center"},y={class:"col-12 col-md-6 offset-md-3"},x={class:"card shadow sm"},E={class:"card-body"},V=s("h1",{class:"text-center"},"Register",-1),P=s("hr",null,null,-1),N={class:"form-group col-12"},U=s("label",{for:"name",class:"font-weight-bold"},"Name",-1),k={class:"form-group col-12"},A=s("label",{for:"email",class:"font-weight-bold"},"Email",-1),B={class:"form-group col-12"},R=s("label",{for:"password",class:"font-weight-bold"},"Password",-1),D={class:"form-group col-12"},I=s("label",{for:"password_confirmation",class:"font-weight-bold"},"Confirm Password",-1),S={class:"col-12 mb-2"},T=["disabled"],j=s("div",{class:"col-12 text-center"},[s("label",null,[_("Already have an account? "),s("a",{href:"./login"},"Login Now!")])],-1);function C(r,o,M,q,e,l){return f(),m("div",b,[s("div",v,[s("div",y,[s("div",x,[s("div",E,[V,P,s("form",{action:"javascript:void(0)",onSubmit:o[4]||(o[4]=(...t)=>l.register&&l.register(...t)),class:"row",method:"post"},[s("div",N,[U,n(s("input",{type:"text",name:"name","onUpdate:modelValue":o[0]||(o[0]=t=>e.user.name=t),id:"name",placeholder:"Enter name",class:"form-control"},null,512),[[i,e.user.name]])]),s("div",k,[A,n(s("input",{type:"text",name:"email","onUpdate:modelValue":o[1]||(o[1]=t=>e.user.email=t),id:"email",placeholder:"Enter Email",class:"form-control"},null,512),[[i,e.user.email]])]),s("div",B,[R,n(s("input",{type:"password",name:"password","onUpdate:modelValue":o[2]||(o[2]=t=>e.user.password=t),id:"password",placeholder:"Enter Password",class:"form-control"},null,512),[[i,e.user.password]])]),s("div",D,[I,n(s("input",{type:"password_confirmation",name:"password_confirmation","onUpdate:modelValue":o[3]||(o[3]=t=>e.user.password_confirmation=t),id:"password_confirmation",placeholder:"Enter Password",class:"form-control"},null,512),[[i,e.user.password_confirmation]])]),s("div",S,[s("button",{type:"submit",disabled:e.processing,class:"btn btn-primary btn-block"},u(e.processing?"Please wait":"Register"),9,T)]),j],32)])])])])])}const L=p(g,[["render",C]]),a=h({});a.component("register",L);a.use(w);a.mount("#app");
>>>>>>>> count-app:public/build/assets/register-1171cb1b.js
