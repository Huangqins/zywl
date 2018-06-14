webpackJsonp([17],{IWVB:function(e,r){},xGMU:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("vLgD");var a=function(e){var r=e.userName,t=e.password,a=e.email,s=e.phone,m=e.trueName,n=e.IDCard,u=e.company;return Object(o.a)({url:"/ZY/user/userRegister.do",method:"post",data:{userName:r,password:t,email:a,phone:s,trueName:m,IDCard:n,company:u}})};var s={name:"register",components:{},data:function(){var e=this;return{formItem:{userName:"",password:"",confirm_password:"",email:"",phone:"",trueName:"",IDCard:"",company:""},ruleValidate:{userName:[{required:!0,validator:function(r,t,a){var s,m,n=new RegExp(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/);t?n.test(t)?(s=e.formItem,m=s.userName,Object(o.a)({method:"post",url:"/ZY/user/checkUserName",data:{userName:m}})).then(function(e){1===e.result?a(new Error("您申请的用户名已存在")):a()}):a(new Error("请输入合法用户名")):a(new Error("请输入您的用户名"))},trigger:"blur",pattern:/\s+/g}],password:[{validator:function(r,t,o){t.replace(/\s+/g,"")?(""!==e.formItem.confirm_password&&e.$refs.formItem.validateField("confirm_password"),o()):o(new Error("请输入您的密码"))},required:!0,trigger:"blur"}],confirm_password:[{validator:function(r,t,o){t.replace(/\s+/g,"")?t!==e.formItem.password?o(new Error("两个输入框的密码不一致!")):o():o(new Error("请再次输入您的密码"))},required:!0,trigger:"blur"}],email:[{required:!0,message:"请输入您的邮箱",trigger:"blur"},{type:"email",message:"邮箱格式错误",trigger:"blur"}],phone:[{validator:function(e,r,t){var o=new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);r?o.test(r)?t():t(new Error("请输入合法的手机号")):t(new Error("请输入您的手机号"))},required:!0,trigger:"blur"}],trueName:[{required:!0,validator:function(e,r,t){var o=new RegExp(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/);r?o.test(r)?t():t(new Error("请输入合法的真实姓名")):t(new Error("请输入您的真实姓名"))},trigger:"blur"}],IDCard:[{required:!0,validator:function(e,r,t){r?/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(r)?t():t(new Error("请输入合法身份证号")):t(new Error("请输入您的身份证号"))},trigger:"blur"}]}}},methods:{handleSubmit:function(e){var r=this;this.$refs[e].validate(function(e){e?(r.$Message.success("填写成功!"),a(r.formItem).then(function(e){0===e.result&&r.$router.push({path:"/login"})})):r.$Message.error("Fail!")})},goToLogin:function(){this.$router.push({path:"/login"})},handleReset:function(){this.$refs.formItem.resetFields()}}},m={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"entry"},[t("Form",{ref:"formItem",staticStyle:{border:"none"},attrs:{model:e.formItem,rules:e.ruleValidate}},[t("FormItem",{attrs:{prop:"userName"}},[t("Input",{attrs:{placeholder:"请输入用户名"},model:{value:e.formItem.userName,callback:function(r){e.$set(e.formItem,"userName",r)},expression:"formItem.userName"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"password"}},[t("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formItem.password,callback:function(r){e.$set(e.formItem,"password",r)},expression:"formItem.password"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"confirm_password"}},[t("Input",{attrs:{type:"password",placeholder:"请输入确认密码"},model:{value:e.formItem.confirm_password,callback:function(r){e.$set(e.formItem,"confirm_password",r)},expression:"formItem.confirm_password"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"email"}},[t("Input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.formItem.email,callback:function(r){e.$set(e.formItem,"email",r)},expression:"formItem.email"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"phone"}},[t("Input",{attrs:{placeholder:"请输入手机号"},model:{value:e.formItem.phone,callback:function(r){e.$set(e.formItem,"phone",r)},expression:"formItem.phone"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"trueName"}},[t("Input",{attrs:{placeholder:"请输入真实姓名"},model:{value:e.formItem.trueName,callback:function(r){e.$set(e.formItem,"trueName",r)},expression:"formItem.trueName"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"IDCard"}},[t("Input",{attrs:{placeholder:"请输入身份证号"},model:{value:e.formItem.IDCard,callback:function(r){e.$set(e.formItem,"IDCard",r)},expression:"formItem.IDCard"}})],1),e._v(" "),t("FormItem",[t("Input",{attrs:{placeholder:"请输入公司"},model:{value:e.formItem.company,callback:function(r){e.$set(e.formItem,"company",r)},expression:"formItem.company"}})],1),e._v(" "),t("FormItem",[t("Button",{attrs:{type:"info"},on:{click:function(r){e.handleSubmit("formItem")}}},[e._v("注册账号")]),e._v(" "),t("Button",{staticStyle:{float:"right"},attrs:{type:"success"},on:{click:e.handleReset}},[e._v("重置")])],1)],1)],1)},staticRenderFns:[]};var n=t("vSla")(s,m,!1,function(e){t("IWVB")},"data-v-bf2a3bec",null);r.default=n.exports}});