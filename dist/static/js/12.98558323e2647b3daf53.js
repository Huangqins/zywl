webpackJsonp([12],{"E+WR":function(e,s){},IOwU:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=t("Dd8w"),r=t.n(o),a=t("vLgD");var m=t("NYxO"),n={name:"editpassword",data:function(){return{formItem:{password:"",oldPassword:"",confirmNewPassword:"",token:"",userName:""}}},computed:r()({},Object(m.b)(["token","userName"])),methods:{save:function(){var e,s,t,o,r;this.formItem.token=this.token,this.formItem.userName=this.userName,(e=this.formItem,s=e.token,t=e.userName,o=e.password,r=e.oldPassword,Object(a.a)({method:"post",url:"/ZY/user/updatePassword",data:{token:s,userName:t,password:o,oldPassword:r}})).then(function(e){console.log(e)})},cancel:function(){}}},d={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("div",{staticClass:"welcome"},[t("Form",{ref:"formItem",attrs:{model:e.formItem,"label-width":80}},[t("FormItem",{attrs:{label:"旧密码",prop:"oldPassword"}},[t("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.oldPassword,callback:function(s){e.$set(e.formItem,"oldPassword",s)},expression:"formItem.oldPassword"}})],1),e._v(" "),t("FormItem",{attrs:{label:"新密码",prop:"password"}},[t("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.password,callback:function(s){e.$set(e.formItem,"password",s)},expression:"formItem.password"}})],1),e._v(" "),t("FormItem",{attrs:{label:"确认新密码",prop:"confirmNewPassword"}},[t("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.confirmNewPassword,callback:function(s){e.$set(e.formItem,"confirmNewPassword",s)},expression:"formItem.confirmNewPassword"}})],1),e._v(" "),t("FormItem",{staticClass:"handle"},[t("Button",{staticClass:"save",attrs:{type:"error"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),t("Button",{staticClass:"save",attrs:{type:"success"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var l=t("VU/8")(n,d,!1,function(e){t("E+WR")},"data-v-e3f629e8",null);s.default=l.exports}});
//# sourceMappingURL=12.98558323e2647b3daf53.js.map