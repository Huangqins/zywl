webpackJsonp([9],{IucB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("bOdI"),i=a.n(n),s=a("Dd8w"),o=a.n(s),l=a("NYxO"),r=a("StQU"),c=a("SNFI"),u=a("9Fqg"),m=i()({name:"taskexecution",components:{chart:r.a,cloud:c.a,zhexiantu:u.default},computed:{},mounted:function(){},data:function(){return{loading:!1,columns1:[{title:"漏洞名称",key:"name",align:"center"},{title:"类型",key:"type",align:"center"},{title:"风险等级",key:"riskRating",align:"center"},{title:"发现时间",key:"time",align:"center"},{title:"利用情况",key:"utilization",align:"center"}],assetsList:[],option:{tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"业务指标",type:"gauge",radius:"85%",detail:{formatter:"{value}%",fontSize:18},data:[{value:50,name:"完成率"}],title:{color:"#fff",fontSize:12},axisLine:{lineStyle:{color:[[.2,"#41C23C"],[.8,"#FFCE44"],[1,"#DD4C40"]]}}}]},holes:[{holeName:"XSS",holeNum:"12"},{holeName:"WEB",holeNum:"10"},{holeName:"CSRF",holeNum:"9"},{holeName:"CSRF",holeNum:"8"},{holeName:"CSRF",holeNum:"7"},{holeName:"CSRF",holeNum:"6"},{holeName:"CSRF",holeNum:"5"},{holeName:"CSRF",holeNum:"4"},{holeName:"CSRF",holeNum:"3"},{holeName:"CSRF",holeNum:"2"},{holeName:"CSRF",holeNum:"1"}],optionHole:{title:{text:"漏洞等级",x:"center",textStyle:{color:"white"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["一级","二级","三级"],textStyle:{color:"white"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"一级",itemStyle:{color:"#DD4F43"}},{value:310,name:"二级",itemStyle:{color:"#FFCE43"}},{value:234,name:"三级",itemStyle:{color:"#41C23C"}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}}},methods:{godetail:function(){},rowClassName:function(t,e){return"demo-table-info-row"}}},"computed",o()({},Object(l.b)(["trueName"]),{optipns:function(){var t=this;return setInterval(function(){t.option.series[0].data[0].value=(100*Math.random()).toFixed(2)-0},2e3),this.option}})),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"whole"},[a("div",{staticClass:"header"}),t._v(" "),a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("div",{staticClass:"content-center"},[a("ul",[a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution/holecloud"}},[t._v("文字云")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution/leaks"}},[t._v("漏洞列表")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution/assetsManage"}},[t._v("资产拓补图")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution"}},[t._v("任务执行")])],1)])]),t._v(" "),a("div",{staticClass:"content-right"},[a("router-view")],1)]),t._v(" "),a("div",{staticClass:"card"})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-left dynamic"},[e("section"),this._v(" "),e("section",{staticClass:"dynamicPic"},[e("div",{staticClass:"floor"},[e("span",{staticClass:"ring light"}),this._v(" "),e("span",{staticClass:"ring three"},[e("span",{staticClass:"spinnable"})]),this._v(" "),e("span",{staticClass:"ring one"},[e("span",{staticClass:"spinnable"})]),this._v(" "),e("span",{staticClass:"ring two"},[e("span",{staticClass:"spinnable"})])])]),this._v(" "),e("section")])}]};var h=a("VU/8")(m,d,!1,function(t){a("M0Gm")},"data-v-657eab67",null);e.default=h.exports},M0Gm:function(t,e){},SNFI:function(t,e,a){"use strict";var n=a("vwbq"),i=a("NobO"),s={name:"cloud",data:function(){return{cloud:""}},mounted:function(){var t=n.scaleOrdinal(n.schemeCategory10),e=i().size([350,350]).words(["Hello","world","normally","you","want","more","words","than","this"].map(function(t){return{text:t,size:10+90*Math.random(),test:"haha"}})).padding(5).rotate(function(){return 2*Math.random()*90}).font("Impact").fontSize(function(t){return t.size}).on("end",function(a){n.select("#vis").append("svg").attr("width",e.size()[0]).attr("height",e.size()[1]).append("g").attr("transform","translate("+e.size()[0]/2+","+e.size()[1]/2+")").selectAll("text").data(a).enter().append("text").style("font-size",function(t){return t.size+"px"}).style("font-family","Impact").style("fill",function(e,a){return t(a)}).attr("text-anchor","middle").attr("transform",function(t){return"translate("+[t.x,t.y]+")rotate("+t.rotate+")"}).text(function(t){return t.text})});e.start()}},o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{id:"vis"}})])}]},l=a("VU/8")(s,o,!1,null,null,null);e.a=l.exports}});
//# sourceMappingURL=9.2817c0e2ae61fa08489c.js.map