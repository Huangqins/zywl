webpackJsonp([9],{IucB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("bOdI"),s=a.n(n),i=a("Dd8w"),o=a.n(i),r=a("NYxO"),l=a("StQU"),c=a("SNFI"),u=a("9Fqg"),m=a("TIfe"),d=a("rMqN"),f=a("BTaQ"),h=s()({name:"taskexecution",components:{chart:l.a,cloud:c.a,zhexiantu:u.default},computed:{},mounted:function(){},created:function(){var t=this,e={userName:this.userName,targetStruts:0};Object(d.a)(e).then(function(e){0===e.result&&(t.taskID=e.targets[0].target_id)})},data:function(){return{taskID:0,loading:!1,columns1:[{title:"漏洞名称",key:"name",align:"center"},{title:"类型",key:"type",align:"center"},{title:"风险等级",key:"riskRating",align:"center"},{title:"发现时间",key:"time",align:"center"},{title:"利用情况",key:"utilization",align:"center"}],assetsList:[],option:{tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"业务指标",type:"gauge",radius:"85%",detail:{formatter:"{value}%",fontSize:18},data:[{value:50,name:"完成率"}],title:{color:"#fff",fontSize:12},axisLine:{lineStyle:{color:[[.2,"#41C23C"],[.8,"#FFCE44"],[1,"#DD4C40"]]}}}]},holes:[{holeName:"XSS",holeNum:"12"},{holeName:"WEB",holeNum:"10"},{holeName:"CSRF",holeNum:"9"},{holeName:"CSRF",holeNum:"8"},{holeName:"CSRF",holeNum:"7"},{holeName:"CSRF",holeNum:"6"},{holeName:"CSRF",holeNum:"5"},{holeName:"CSRF",holeNum:"4"},{holeName:"CSRF",holeNum:"3"},{holeName:"CSRF",holeNum:"2"},{holeName:"CSRF",holeNum:"1"}],optionHole:{title:{text:"漏洞等级",x:"center",textStyle:{color:"white"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["一级","二级","三级"],textStyle:{color:"white"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"一级",itemStyle:{color:"#DD4F43"}},{value:310,name:"二级",itemStyle:{color:"#FFCE43"}},{value:234,name:"三级",itemStyle:{color:"#41C23C"}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}}},beforeRouteEnter:function(t,e,a){"/login"===e.fullPath&&f.Modal.confirm({title:"您好,"+Object(m.b)(),content:1===t.params.firstLogin?"欢迎使用智刃安全攻防平台,距您上次进行攻防测试已经过了XXX天XXX小时XXX分钟，建议进行测试的资产为XXX":"欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。\n    是否要进行安全测试？",onOk:function(){1===t.params.firstLogin?a():a("/assets/assetsManage")},onCancel:function(){0===t.params.firstLogin?a("/taskhomepage"):a()}}),a()},beforeRouteLeave:function(t,e,a){f.Modal.remove(),a()},methods:{godetail:function(){},rowClassName:function(t,e){return"demo-table-info-row"},gotaskadd:function(){this.$router.push({path:"/assetSet"})}}},"computed",o()({},Object(r.b)(["trueName"]),{optipns:function(){var t=this;return setInterval(function(){t.option.series[0].data[0].value=(100*Math.random()).toFixed(2)-0},2e3),this.option}})),v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"whole"},[a("div",{staticClass:"content"},[a("div",{staticClass:"content-left dynamic"},[a("section",{staticClass:"dynamicPic"},[a("router-view",{staticClass:"wordClouds",attrs:{name:"left"}}),t._v(" "),t._m(0)],1)]),t._v(" "),a("div",{staticClass:"content-center"},[a("ul",[a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution/holecloud"}},[t._v("文字云")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution"}},[t._v("任务执行")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:{name:"leaks",params:{taskID:t.taskID}}}},[t._v("漏洞列表")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("router-link",{attrs:{to:"/taskexecution/assetsManage"}},[t._v("资产拓补图")])],1),t._v(" "),a("li",{staticClass:"brain"},[a("span",{on:{click:function(e){t.gotaskadd()}}},[t._v("任务添加")])])])]),t._v(" "),a("div",{staticClass:"content-right"},[a("router-view")],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"floor"},[e("span",{staticClass:"ring light"}),this._v(" "),e("span",{staticClass:"ring three"},[e("span",{staticClass:"spinnable"})]),this._v(" "),e("span",{staticClass:"ring one"},[e("span",{staticClass:"spinnable"})]),this._v(" "),e("span",{staticClass:"ring two"},[e("span",{staticClass:"spinnable"})])])}]};var p=a("VU/8")(h,v,!1,function(t){a("j3hA")},"data-v-32ab57b2",null);e.default=p.exports},SNFI:function(t,e,a){"use strict";var n=a("vwbq"),s=a("NobO"),i={name:"cloud",data:function(){return{cloud:""}},mounted:function(){var t=n.scaleOrdinal(n.schemeCategory10),e=s().size([350,350]).words(["Hello","world","normally","you","want","more","words","than","this"].map(function(t){return{text:t,size:10+90*Math.random(),test:"haha"}})).padding(5).rotate(function(){return 2*Math.random()*90}).font("Impact").fontSize(function(t){return t.size}).on("end",function(a){n.select("#vis").append("svg").attr("width",e.size()[0]).attr("height",e.size()[1]).append("g").attr("transform","translate("+e.size()[0]/2+","+e.size()[1]/2+")").selectAll("text").data(a).enter().append("text").style("font-size",function(t){return t.size+"px"}).style("font-family","Impact").style("fill",function(e,a){return t(a)}).attr("text-anchor","middle").attr("transform",function(t){return"translate("+[t.x,t.y]+")rotate("+t.rotate+")"}).text(function(t){return t.text})});e.start()}},o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{id:"vis"}})])}]},r=a("VU/8")(i,o,!1,null,null,null);e.a=r.exports},j3hA:function(t,e){},rMqN:function(t,e,a){"use strict";e.a=function(t){var e=t.userName,a=t.targetStruts;return Object(n.a)({method:"post",url:"/ZY/task/targetInfo",data:{userName:e,targetStruts:a}})};var n=a("vLgD")}});