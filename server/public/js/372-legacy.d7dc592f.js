"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[372],{9372:function(t,e,r){r.r(e),r.d(e,{default:function(){return o}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"Article"}},[t._m(0),t._l(t.articleList,(function(e){return r("article",[r("img",{attrs:{src:""+t.urlBase+e.cover,alt:""}}),r("div",{staticClass:"right"},[r("p",{staticClass:"title"},[t._v(t._s(e.title))]),r("p",{staticClass:"content"},[t._v(t._s(e.des))]),r("div",[r("span",[t._v("1111")]),r("router-link",{attrs:{to:"/article/"+e._id}},[t._v("阅读全文")])],1)])])}))],2)},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("article",{staticClass:"hello"},[r("h2",[t._v("欢迎来到我的文章页~")])])}],i=r(6198),s=(r(8975),{name:"Article",data:function(){return{articleList:[],url:r(4492)}},created:function(){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios({method:"get",url:"/art/all"});case 2:r=e.sent,a=r.data,console.log(a.data),t.articleList=a.data;case 6:case"end":return e.stop()}}),e)})))()}}),c=s,l=r(1001),u=(0,l.Z)(c,a,n,!1,null,"6fa9ddf6",null),o=u.exports},4492:function(t,e,r){t.exports=r.p+"img/1.8b1dd717.jpg"}}]);
//# sourceMappingURL=372-legacy.d7dc592f.js.map