webpackJsonp([11],{"7Nmy":function(t,e,a){"use strict";e.a=function(t){var e=t.area,a=t.rows,r=t.page;return Object(s.a)({method:"post",url:"/ZY/asset/assetsInfo",data:{area:e,rows:a,page:r}})};var s=a("vLgD")},R9Aj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("7Nmy");var s=a("vLgD");var r=a("TIfe"),o={name:"assetSet",components:{},data:function(){return{formItem:{taskName:"",strategy:"0",startTime:"",cycle:"0",disabledGroup:"常规执行",assetsUrl:"",assetsIp:"",userName:""},ruleValidate:{assets:[{required:!0,message:"请选择资产",trigger:"change"}],cycle:[{required:!0,message:"请选择周期",trigger:"change"}]}}},created:function(){var t=this.$route.params;this.formItem.assetsUrl=t.assetsUrl,this.formItem.assetsIp=t.assetsIp},methods:{timeChange:function(t){this.formItem.startTime=t},cancel:function(){},goToIndex:function(t){var e=this;this.$refs[t].validate(function(t){var a,o,m,l,n,c,i,u;t?(e.formItem.userName=Object(r.b)(),(a=e.formItem,o=a.taskName,m=a.strategy,l=a.cycle,n=a.userName,c=a.startTime,i=a.assetsUrl,u=a.assetsIp,Object(s.a)({method:"post",url:"/ZY/task/addTask",data:{taskName:o,strategy:m,cycle:l,userName:n,startTime:c,assetsUrl:i,assetsIp:u}})).then(function(t){0===t.result?e.$router.push({path:"/taskexecution"}):-1===t.result&&e.$Message.error({content:"添加任务失败"})})):e.$Message.error("Fail!")})}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"entry"},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":80,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"任务名称"}},[a("Input",{attrs:{placeholder:"请输入"},model:{value:t.formItem.taskName,callback:function(e){t.$set(t.formItem,"taskName",e)},expression:"formItem.taskName"}})],1),t._v(" "),a("FormItem",{attrs:{label:"扫描策略"}},[a("RadioGroup",{model:{value:t.formItem.strategy,callback:function(e){t.$set(t.formItem,"strategy",e)},expression:"formItem.strategy"}},[a("Radio",{attrs:{label:"0"}},[t._v("立即扫描")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("常规扫描")])],1)],1),t._v(" "),a("FormItem",{attrs:{label:"开始时间",prop:"startTime"}},[a("Row",[a("DatePicker",{staticStyle:{width:"420px"},attrs:{type:"datetime",placeholder:"开始时间"},on:{"on-change":t.timeChange}})],1)],1),t._v(" "),a("FormItem",{attrs:{label:"周期",prop:"cycle"}},[a("Select",{model:{value:t.formItem.cycle,callback:function(e){t.$set(t.formItem,"cycle",e)},expression:"formItem.cycle"}},[a("Option",{attrs:{value:"0"}},[t._v("立即执行")]),t._v(" "),a("Option",{attrs:{value:"2"}},[t._v("每天")]),t._v(" "),a("Option",{attrs:{value:"3"}},[t._v("每月")]),t._v(" "),a("Option",{attrs:{value:"4"}},[t._v("每年")])],1)],1),t._v(" "),a("FormItem",{attrs:{label:"资产url"}},[a("Input",{attrs:{placeholder:"请输入"},model:{value:t.formItem.assetsUrl,callback:function(e){t.$set(t.formItem,"assetsUrl",e)},expression:"formItem.assetsUrl"}})],1),t._v(" "),a("FormItem",{attrs:{label:"资产ip"}},[a("Input",{attrs:{placeholder:"请输入"},model:{value:t.formItem.assetsIp,callback:function(e){t.$set(t.formItem,"assetsIp",e)},expression:"formItem.assetsIp"}})],1),t._v(" "),a("FormItem",[a("Button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("Button",{staticStyle:{float:"right"},attrs:{type:"success"},on:{click:function(e){t.goToIndex("formItem")}}},[t._v("提交")])],1)],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(o,m,!1,function(t){a("thKw")},"data-v-93cdfaf2",null);e.default=l.exports},thKw:function(t,e){}});
//# sourceMappingURL=11.fdef745aad954e3dec78.js.map