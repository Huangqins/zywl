webpackJsonp([10],{muUp:function(s,t){},tIHl:function(s,t,e){"use strict";t.a=function(s,t){return a.Message[s]({content:""+t,top:50,duration:3})};var a=e("BTaQ");e.n(a)},thAI:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Dd8w"),r=e.n(a),d=e("vLgD");var o=e("NYxO"),n=e("tIHl"),l={data:function(){return{password:"",handAddForm:{assetsName:"",assetsURL:"",assetsIp:"",assetsPort:"",assetsProto:"",assetsServers:"",assetsRegion:"",assetsType:"",assetsImportant:"",assetsOS:"",assetsManger:"",assetsCreatUser:""}}},computed:r()({},Object(o.b)(["userName"])),methods:{assetSubmit:function(){var s,t,e,a,r,o,l,m,p,c,u,i,h,F=this;this.handAddForm.assetsCreatUser=this.userName,(s=this.handAddForm,t=s.assetsName,e=s.assetsURL,a=s.assetsIP,r=s.assetsPort,o=s.assetsProto,l=s.assetsServers,m=s.assetsRegion,p=s.assetsType,c=s.assetsImportant,u=s.assetsOS,i=s.assetsManger,h=s.assetsCreatUser,Object(d.a)({method:"post",url:"/ZY/asset/addAssets",data:{assetsName:t,assetsURL:e,assetsIP:a,assetsPort:r,assetsProto:o,assetsServers:l,assetsRegion:m,assetsType:p,assetsImportant:c,assetsOS:u,assetsManger:i,assetsCreatUser:h}})).then(function(s){0===s.result?(Object(n.a)("success","导入资产成功"),F.$router.push({name:"assetSet",params:{assetsUrl:F.handAddForm.assetsURL,assetsIp:F.handAddForm.assetsIp}})):-1===s.result?Object(n.a)("error","导入资产失败"):2===s.result&&Object(n.a)("error","导入资产重复")})}}},m={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"whole"},[e("Card",{staticClass:"card",attrs:{tyle:""}},[e("h2",{staticStyle:{color:"white"},attrs:{slot:"title"},slot:"title"},[s._v("请选择您的导入方式")]),s._v(" "),e("Row",[e("Tabs",{attrs:{animated:!1}},[e("Tab-pane",{attrs:{label:"手动导入"}},[e("Form",{ref:"handAdd",attrs:{model:s.handAddForm}},[e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"资产名称"},model:{value:s.handAddForm.assetsName,callback:function(t){s.$set(s.handAddForm,"assetsName",t)},expression:"handAddForm.assetsName"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"URL地址"},model:{value:s.handAddForm.assetsURL,callback:function(t){s.$set(s.handAddForm,"assetsURL",t)},expression:"handAddForm.assetsURL"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"IP"},model:{value:s.handAddForm.assetsIp,callback:function(t){s.$set(s.handAddForm,"assetsIp",t)},expression:"handAddForm.assetsIp"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"端口"},model:{value:s.handAddForm.assetsPort,callback:function(t){s.$set(s.handAddForm,"assetsPort",t)},expression:"handAddForm.assetsPort"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"通讯协议"},model:{value:s.handAddForm.assetsProto,callback:function(t){s.$set(s.handAddForm,"assetsProto",t)},expression:"handAddForm.assetsProto"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"开放服务信息"},model:{value:s.handAddForm.assetsServers,callback:function(t){s.$set(s.handAddForm,"assetsServers",t)},expression:"handAddForm.assetsServers"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"所属区域"},model:{value:s.handAddForm.assetsRegion,callback:function(t){s.$set(s.handAddForm,"assetsRegion",t)},expression:"handAddForm.assetsRegion"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"资产类型"},model:{value:s.handAddForm.assetsType,callback:function(t){s.$set(s.handAddForm,"assetsType",t)},expression:"handAddForm.assetsType"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"资产重要度"},model:{value:s.handAddForm.assetsImportant,callback:function(t){s.$set(s.handAddForm,"assetsImportant",t)},expression:"handAddForm.assetsImportant"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"OS类型"},model:{value:s.handAddForm.assetsOS,callback:function(t){s.$set(s.handAddForm,"assetsOS",t)},expression:"handAddForm.assetsOS"}})],1),s._v(" "),e("FormItem",[e("Input",{attrs:{type:"text",placeholder:"负责人"},model:{value:s.handAddForm.assetsManger,callback:function(t){s.$set(s.handAddForm,"assetsManger",t)},expression:"handAddForm.assetsManger"}})],1)],1)],1),s._v(" "),e("Tab-pane",{attrs:{label:"批量导入"}},[e("Upload",{attrs:{multiple:"",action:"*"}},[e("i-button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[s._v("导入文件")])],1)],1)],1),s._v(" "),e("Row",{staticClass:"primary",attrs:{type:"flex",align:"middle",justify:"center"}},[e("Col",[e("i-button",{attrs:{type:"primary"},on:{click:s.assetSubmit}},[s._v("提交")])],1)],1)],1)],1)],1)])},staticRenderFns:[]};var p=e("VU/8")(l,m,!1,function(s){e("muUp")},"data-v-0c685082",null);t.default=p.exports}});
//# sourceMappingURL=10.2fd48b834e03cad0421b.js.map