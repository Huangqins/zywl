webpackJsonp([12],{HRKt:function(t,e,a){"use strict";e.a=function(t){var e=t.userName,a=t.rows,o=t.page,i=t.taskId,s=t.targetId;return Object(n.a)({url:"/ZY/vuln/vulnSearch",method:"post",data:{userName:e,rows:a,page:o,taskId:i,targetId:s}})};var n=a("vLgD")},JDaQ:function(t,e){},YYqV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),i=a("exGp"),s=a.n(i),r=a("woOf"),l=a.n(r),u=a("bOdI"),c=a.n(u),d=a("StQU"),h=a("9Fqg"),p=a("sxu/"),v=a("HRKt"),f=a("TIfe"),g=a("vLgD");var w={4:"紧急风险",3:"高风险",2:"中风险",1:"低风险",0:"无风险"},m={name:"leaks",components:{chart:d.a,zhexiantu:h.default,page:p.a},computed:{options:function(){var t=this;return setInterval(function(){t.option.series[0].data[0].value=(100*Math.random()).toFixed(2)-0},2e3),this.option},optionTwo:function(){var t=this;return setInterval(function(){t.optiontwo.series[0].data[0].value=(100*Math.random()).toFixed(2)-0},2e3),this.optiontwo},optionThree:function(){var t=this;return setInterval(function(){t.optionthree.series[0].data[0].value=(100*Math.random()).toFixed(2)-0},2e3),this.optionthree}},data:function(){return c()({taskID:"",option:{tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"业务指标",type:"gauge",radius:"85%",detail:{formatter:"{value}%",fontSize:18},data:[{value:90,name:"一级漏洞"}],title:{color:"#E4E5E5",fontSize:12},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1,distance:0},pointer:{length:"30%",show:!0,width:4},axisLine:{lineStyle:{color:[[.2,"#66AB31"],[.8,"#1A9348"],[1,"#21B4D2"]]}}}]},optiontwo:{tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"业务指标",type:"gauge",radius:"85%",detail:{formatter:"{value}%",fontSize:18},data:[{value:60,name:"二级漏洞"}],title:{color:"#E4E5E5",fontSize:12},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1,distance:0},pointer:{length:"30%",show:!0,width:4},axisLine:{lineStyle:{color:[[.2,"#66AB31"],[.8,"#1A9348"],[1,"#21B4D2"]]}}}]},optionthree:{tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"业务指标",type:"gauge",radius:"85%",detail:{formatter:"{value}%",fontSize:18},data:[{value:20,name:"三级漏洞"}],title:{color:"#E4E5E5",fontSize:12},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1,distance:0},pointer:{length:"30%",show:!0,width:4},axisLine:{lineStyle:{color:[[.2,"#66AB31"],[.8,"#1A9348"],[1,"#21B4D2"]]}}}]},loading:!1,leaksColums:[{title:"漏洞名称",key:"vuln_name",align:"center"},{title:"漏洞类型",key:"vuln_type",align:"center"},{title:"漏洞等级",key:"vuln_level",align:"center",render:function(t,e){return t("span",""+w[e.row.vuln_level])}},{title:"payload",key:"vuln_Payload",align:"center"},{title:"操作人",key:"vuln_oper",align:"center"}],leaksList:[],total:0,defaultPage:{area:1,rows:10,page:1}},"loading",!1)},created:function(){this.taskID=this.$route.params.taskID;var t=l()({},this.defaultPage,{userName:Object(f.b)(),taskID:this.taskID});this._leaksInfo(t)},methods:{godetail:function(){},rowClassName:function(t,e){return"demo-table-info-row"},_leaksInfo:function(t){var e=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.loading=!0,a.next=3,Object(v.a)(t);case 3:0===(n=a.sent).result&&(e.loading=!1,e.leaksList=n.rows,e.total=n.total);case 5:case"end":return a.stop()}},a,e)}))()},_vulnLevel:function(t){var e=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.loading=!0,a.next=3,void 0,o=t.taskID,Object(g.a)({method:"post",url:"/ZY/task/vulnTotal",data:{taskID:o}});case 3:n=a.sent,console.log(n);case 5:case"end":return a.stop()}var o},a,e)}))()},dataLoad:function(t){var e=l()({},this.defaultPage,t,{userName:Object(f.b)()});this._leaksInfo(e)}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"timeAxis"},[a("div",{staticClass:"taskSchedule"},[a("chart",{attrs:{width:"235px",height:"235px",option:t.options}}),t._v(" "),a("chart",{attrs:{width:"235px",height:"235px",option:t.optionTwo,id:"optionTwo"}}),t._v(" "),a("chart",{attrs:{width:"235px",height:"235px",option:t.optionThree,id:"optionThree"}})],1)]),t._v(" "),a("div",{staticClass:"clear"}),t._v(" "),a("div",{staticClass:"list"},[a("h2",[t._v("漏洞列表")]),t._v(" "),a("page",{attrs:{columns:t.leaksColums,data:t.leaksList,dataTotal:t.total,loading:t.loading},on:{dataLoad:t.dataLoad}})],1)])},staticRenderFns:[]};var x=a("VU/8")(m,k,!1,function(t){a("JDaQ")},"data-v-2b8799bc",null);e.default=x.exports}});