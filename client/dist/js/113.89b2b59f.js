"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[113],{3113:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.doc.title?a("div",{attrs:{id:"xxArticle"}},[a("h1",[t._v(t._s(t.doc.title))]),a("p",{staticClass:"author-time"},[t._v(" 作者："+t._s(t.doc.author.username)+" 时间："+t._s(t._f("fmtTime")(t.doc.time))+" ")]),a("div",{ref:"mdToHTML",attrs:{id:"article-content"}})]):t._e()},r=[],s={name:"xxArticle",data(){return{doc:{}}},watch:{$route:function(){this.refresh()}},methods:{async refresh(){let t=this.$route.params.id,e=await this.$axios({method:"get",url:"/art/id",params:{id:t}});this.doc=e.data.data;let{data:a}=await this.$axios({method:"get",url:await this.doc.src});console.log(a),this.$refs.mdToHTML.innerHTML="",editormd.markdownToHTML("article-content",{markdown:a,toc:!0,emoji:!0,taskList:!0,tex:!0,flowChart:!0,sequenceDiagram:!0})}},mounted(){this.refresh()}},o=s,n=a(1001),c=(0,n.Z)(o,i,r,!1,null,"2e678952",null),d=c.exports}}]);
//# sourceMappingURL=113.89b2b59f.js.map