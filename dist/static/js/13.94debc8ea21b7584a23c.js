webpackJsonp([13],{"41Qs":function(s,t,e){"use strict";t.a=function(s){var t=s.assets_name,e=s.assets_url,r=s.assets_ip,d=s.assets_network_ports,n=s.assets_network_type,o=s.assets_type,l=s.assets_important,i=s.assets_os_type,p=s.assets_manger,u=s.assets_creatuser,m=s.assets_desc,c=s.assets_detail,_=s.assets_hostname,h=s.assets_numbering;return Object(a.a)({method:"post",url:"/ZY/asset/addAssets",data:{assets_name:t,assets_url:e,assets_ip:r,assets_network_ports:d,assets_network_type:n,assets_type:o,assets_important:l,assets_os_type:i,assets_manger:p,assets_creatuser:u,assets_desc:m,assets_detail:c,assets_hostname:_,assets_numbering:h}})};var a=e("vLgD")},L9px:function(s,t){},thAI:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Dd8w"),r=e.n(a),d=e("41Qs"),n=e("NYxO"),o=e("tIHl"),l={data:function(){var s=this;return{password:"",handAddForm:{assetsName:"",assetsURL:"",assetsIp:"",assetsManger:"",assetsCreatUser:""},ruleValidate:{assetsName:[{required:!0,message:"任务名称必填",trigger:"blur"}],assetsURL:[{validator:function(t,e,a){""===e&&""===s.handAddForm.assetsIp?a(new Error("url及ip请至少填写一项")):a()},trigger:"blur"}],assetsIp:[{validator:function(t,e,a){""===e&&""===s.handAddForm.assetsURL?a(new Error("url及ip请至少填写一项")):a()},trigger:"blur"}],assetsManger:[{required:!0,message:"负责人必填",trigger:"blur"}]}}},computed:r()({},Object(n.b)(["userName"])),methods:{assetSubmit:function(){var s=this;this.handAddForm.assetsCreatUser=this.userName,Object(d.a)(this.handAddForm).then(function(t){0===t.result?(Object(o.a)("success","导入资产成功"),s.$router.push({name:"assetSet",params:{assetsUrl:s.handAddForm.assetsURL,assetsIp:s.handAddForm.assetsIp}})):-1===t.result?Object(o.a)("error","导入资产失败"):2===t.result&&Object(o.a)("error","导入资产重复")})}}},i={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"whole"},[e("Card",{staticClass:"card",attrs:{tyle:""}},[e("h2",{staticStyle:{color:"white"},attrs:{slot:"title"},slot:"title"},[s._v("请选择您的导入方式")]),s._v(" "),e("Row",[e("Tabs",{attrs:{animated:!1}},[e("Tab-pane",{attrs:{label:"手动导入"}},[e("Form",{ref:"handAdd",attrs:{model:s.handAddForm,rules:s.ruleValidate}},[e("FormItem",{attrs:{prop:"assetsName"}},[e("Input",{attrs:{type:"text",placeholder:"资产名称"},model:{value:s.handAddForm.assetsName,callback:function(t){s.$set(s.handAddForm,"assetsName",t)},expression:"handAddForm.assetsName"}})],1),s._v(" "),e("FormItem",{attrs:{prop:"assetsURL"}},[e("Input",{attrs:{type:"text",placeholder:"URL地址"},model:{value:s.handAddForm.assetsURL,callback:function(t){s.$set(s.handAddForm,"assetsURL",t)},expression:"handAddForm.assetsURL"}})],1),s._v(" "),e("FormItem",{attrs:{prop:"assetsIp"}},[e("Input",{attrs:{type:"text",placeholder:"IP"},model:{value:s.handAddForm.assetsIp,callback:function(t){s.$set(s.handAddForm,"assetsIp",t)},expression:"handAddForm.assetsIp"}})],1),s._v(" "),e("FormItem",{attrs:{prop:"assetsManger"}},[e("Input",{attrs:{type:"text",placeholder:"负责人"},model:{value:s.handAddForm.assetsManger,callback:function(t){s.$set(s.handAddForm,"assetsManger",t)},expression:"handAddForm.assetsManger"}})],1)],1)],1),s._v(" "),e("Tab-pane",{attrs:{label:"批量导入"}},[e("Upload",{attrs:{multiple:"",action:"*"}},[e("i-button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[s._v("导入文件")])],1)],1)],1),s._v(" "),e("Row",{staticClass:"primary",attrs:{type:"flex",align:"middle",justify:"center"}},[e("Col",[e("i-button",{attrs:{type:"primary"},on:{click:s.assetSubmit}},[s._v("提交")])],1)],1)],1)],1)],1)])},staticRenderFns:[]};var p=e("VU/8")(l,i,!1,function(s){e("L9px")},"data-v-4820d80a",null);t.default=p.exports}});