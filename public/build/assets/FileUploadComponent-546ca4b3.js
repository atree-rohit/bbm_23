import{m as u,a as c,_ as m,c as d,b as s,t as f,d as p,o as r}from"./_plugin-vue_export-helper-d6d83bcb.js";const _={name:"FileUploadComponent",props:{folder:{type:String,default:"uploaded_files"},upload_file:{type:Boolean,default:!1}},emits:["uploaded_file_id","file_selected"],data(){return{name:"",file:"",success:"",submitting_form:this.upload_file,element:null}},computed:{...u({user:e=>e.auth.user})},watch:{upload_file(e){e&&(this.submitting_form=!0,this.formSubmit())}},methods:{onChange(e){this.$emit("file_selected",!0),this.element=e,this.file=e.target.files[0]},formSubmit(){if(this.element==null){this.$emit("uploaded_file_id",null),this.submitting_form=!1;return}this.element.preventDefault();let e=this;const t={headers:{"content-type":"multipart/form-data"}};let i=new FormData;i.append("file",this.file),i.append("user_id",this.user.id),i.append("folder",this.folder),c.post("/fileupload",i,t).then(o=>{e.success=o.data.success,this.$emit("uploaded_file_id",o.data),this.submitting_form=!1}).catch(o=>{e.output=o,this.submitting_form=!1})}}},h={class:"container"},g={class:"row justify-content-center"},b={class:"col-md-12"},y={class:"card"},S={class:"card-body"},v={key:0,class:"alert alert-success"};function C(e,t,i,o,n,a){return r(),d("div",h,[s("div",g,[s("div",b,[s("div",y,[s("div",S,[n.success!=""?(r(),d("div",v,f(n.success),1)):p("",!0),s("form",{onSubmit:t[1]||(t[1]=(...l)=>a.formSubmit&&a.formSubmit(...l)),enctype:"multipart/form-data"},[s("input",{type:"file",class:"form-control",onChange:t[0]||(t[0]=(...l)=>a.onChange&&a.onChange(...l))},null,32)],32)])])])])])}const B=m(_,[["render",C]]);export{B as F};
