webpackJsonp([19],{"/nzj":function(n,t){},V2Dv:function(n,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=l("vLgD");var a={4:"紧急",3:"高",2:"中",1:"低",0:"无"},v={4:"#993333",3:"#DE5145",2:"#FAA732",1:"#23B7E5",0:"#27C24C"},s={data:function(){return{vulnlevel:a,vulncolor:v,value1:[1,2,3,4,5],vuln_name:"",vuln_level:"",kb_vuln_des:"",kb_vuln_anly:"",kb_vuln_ref:"",vuln_detail:""}},created:function(){this.vulnDetail()},methods:{vulnDetail:function(){var n,t,l,a=this,v=this.$route.params;(n=v,t=n.targetId,l=n.vulnId,Object(e.a)({method:"post",url:"/ZY/vuln/vulnSearch",data:{targetId:t,vulnId:l}})).then(function(n){var t=n.rows;a.vuln_name=t[0].vuln_name,a.vuln_level=t[0].vuln_level,a.kb_vuln_des=t[0].kb_vuln_des,a.kb_vuln_anly=t[0].kb_vuln_anly,a.kb_vuln_ref=t[0].kb_vuln_ref,a.vuln_detail=t[0].vuln_detail})}}},_={render:function(){var n=this,t=n.$createElement,l=n._self._c||t;return l("div",{staticClass:"vulndetail"},[l("div",{staticClass:"whole"},[l("Collapse",{model:{value:n.value1,callback:function(t){n.value1=t},expression:"value1"}},[l("div",{staticStyle:{width:"100%",height:"100px",padding:"10px 40px"}},[l("h2",[n._v(n._s(n.vuln_name))]),n._v(" "),l("span",{staticClass:"level",style:{background:n.vulncolor[this.vuln_level]},domProps:{textContent:n._s(n.vulnlevel[this.vuln_level])}}),l("span")]),n._v(" "),l("Panel",{attrs:{name:"1"}},[n._v("\n            风险描述\n              "),l("p",{attrs:{slot:"content"},slot:"content"},[n._v(" "+n._s(n.kb_vuln_des))])]),n._v(" "),l("Panel",{attrs:{name:"5"}},[n._v("\n              分类\n              "),l("p",{attrs:{slot:"content"},slot:"content"})]),n._v(" "),l("Panel",{attrs:{name:"2"}},[l("span",{staticStyle:{color:"red"}},[n._v("风险详情")]),n._v(" "),l("p",{attrs:{slot:"content"},domProps:{innerHTML:n._s(n.vuln_detail)},slot:"content"})]),n._v(" "),l("Panel",{attrs:{name:"3"}},[l("span",{staticStyle:{color:"red"}},[n._v("风险分析")]),n._v(" "),l("p",{attrs:{slot:"content"},slot:"content"},[n._v(n._s(n.kb_vuln_anly))])]),n._v(" "),l("Panel",{attrs:{name:"4"}},[n._v("\n            加固建议\n              "),l("p",{attrs:{slot:"content"},slot:"content"},[n._v(n._s(n.kb_vuln_ref))])])],1)],1)])},staticRenderFns:[]};var u=l("vSla")(s,_,!1,function(n){l("/nzj")},"data-v-74b5b6f2",null);t.default=u.exports}});