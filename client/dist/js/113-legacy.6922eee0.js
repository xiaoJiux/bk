"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[113],{3113:function(t,e,r){r.r(e),r.d(e,{default:function(){return d}});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.doc.title?r("div",{attrs:{id:"xxArticle"}},[r("h1",[t._v(t._s(t.doc.title))]),r("p",{staticClass:"author-time"},[t._v(" 作者："+t._s(t.doc.author.username)+" 时间："+t._s(t._f("fmtTime")(t.doc.time))+" ")]),r("div",{ref:"mdToHTML",attrs:{id:"article-content"}})]):t._e()},a=[],s=r(6198),i=(r(8975),{name:"xxArticle",data:function(){return{doc:{}}},watch:{$route:function(){this.refresh()}},methods:{refresh:function(){var t=this;return(0,s.Z)(regeneratorRuntime.mark((function e(){var r,n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.$route.params.id,e.next=3,t.$axios({method:"get",url:"/art/id",params:{id:r}});case 3:return n=e.sent,t.doc=n.data.data,e.t0=t,e.next=8,t.doc.src;case 8:return e.t1=e.sent,e.t2={method:"get",url:e.t1},e.next=12,e.t0.$axios.call(e.t0,e.t2);case 12:a=e.sent,s=a.data,console.log(s),t.$refs.mdToHTML.innerHTML="",editormd.markdownToHTML("article-content",{markdown:s,toc:!0,emoji:!0,taskList:!0,tex:!0,flowChart:!0,sequenceDiagram:!0});case 17:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.refresh()}}),o=i,c=r(1001),u=(0,c.Z)(o,n,a,!1,null,"2e678952",null),d=u.exports}}]);
//# sourceMappingURL=113-legacy.6922eee0.js.map