webpackJsonp([14],{"0vtz":function(e,t){},IOwU:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("Dd8w"),r=s.n(o),a=s("vLgD");var m=s("NYxO"),n={name:"editpassword",data:function(){return{formItem:{password:"",oldPassword:"",confirmNewPassword:"",token:"",userName:""}}},computed:r()({},Object(m.b)(["token","userName"])),methods:{save:function(){var e,t,s,o,r;this.formItem.token=this.token,this.formItem.userName=this.userName,(e=this.formItem,t=e.token,s=e.userName,o=e.password,r=e.oldPassword,Object(a.a)({method:"post",url:"/ZY/user/updatePassword",data:{token:t,userName:s,password:o,oldPassword:r}})).then(function(e){console.log(e)})},cancel:function(){}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"welcome"},[s("Form",{ref:"formItem",attrs:{model:e.formItem,"label-width":80}},[s("FormItem",{attrs:{label:"旧密码",prop:"oldPassword"}},[s("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.oldPassword,callback:function(t){e.$set(e.formItem,"oldPassword",t)},expression:"formItem.oldPassword"}})],1),e._v(" "),s("FormItem",{attrs:{label:"新密码",prop:"password"}},[s("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.password,callback:function(t){e.$set(e.formItem,"password",t)},expression:"formItem.password"}})],1),e._v(" "),s("FormItem",{attrs:{label:"确认新密码",prop:"confirmNewPassword"}},[s("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.confirmNewPassword,callback:function(t){e.$set(e.formItem,"confirmNewPassword",t)},expression:"formItem.confirmNewPassword"}})],1),e._v(" "),s("FormItem",{staticClass:"handle"},[s("Button",{staticClass:"save",attrs:{type:"error"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),s("Button",{staticClass:"save",attrs:{type:"success"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var l=s("VU/8")(n,d,!1,function(e){s("0vtz")},"data-v-e3f629e8",null);t.default=l.exports}});