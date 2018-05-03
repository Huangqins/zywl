<template>
  <div>
      <div class="entry" style="border:none;width:180px;margin-top:10px;">
      <Form :model="formItem"  ref="formItem">
        <FormItem  prop="userName">
            <Input v-model="formItem.userName" placeholder="请输入用户名"/>
          </FormItem>
          <FormItem  prop="password">
              <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
          </FormItem>
          <!-- <FormItem label="手机号码" >
              <Input v-model="phone"  placeholder="请输入手机号" style="width: 65%"/>
              <Button type="error" @click="passCode" :disabled="passCodeSign" style="width: 34%">{{passCodeText}}</Button>
          </FormItem> -->
          <!-- <FormItem label="验证码" >
              <Input v-model="formItem.code"  placeholder="请填写手机验证码"/>
          </FormItem> -->
          <FormItem>
              <Input v-model="formItem.verifyCode"  placeholder="请输入验证码" style="width: 52%;" @on-enter="handleSubmit"/>
              <img width="80" height="32" style="float:right;margin-top:2px;" :src="codeSrc"  @click="changeImg">
          </FormItem>
          <FormItem class="login" style="text-align:center;">
            <Button type="ghost" @click="register" style="text-align:center;float:left">注册</Button>
            <!-- 暂时隐藏注销按钮 -->
            <!-- <Button type="primary" @click="cancle" style="text-align:center;float:left">注销</Button> -->
            <Button type="ghost" @click="handleSubmit" style="text-align:center;float:right">登陆</Button>
          </FormItem>
     </Form>
   </div>
    <div  class="entry circle-wrapper">
        <animation-circle></animation-circle>
       </div>
       <!-- <Modal
        v-model="registerModal"
        title="注册账号"
        width="335"
        @on-visible-change="cancel">
       <registers ref="register"></registers>
       <div slot="footer"></div>
    </Modal> -->
  </div>
</template>
<script>
import getIdentifyCode from "api/getIdentifyCode";
import message from "utils/message";
import animationCircle from "./animationCircle";
import registers from "./register";
import userTips from "api/userTips";
import { getUserName } from "@/utils/auth";

const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";

export default {
  name: "login",
  components: {
    animationCircle,
    registers
  },
  data() {
    return {
      registerModal: false,
      formItem: {
        userName: "",
        password: "",
        verifyCode: "",
        verifyCodeID: "",
        phone: 0
      },
      passCodeTime: 60,
      passCodeSign: false,
      passCodeText: "获取验证码",
      timer: "",
      imgCode: "",
      codeID: "",
      code: "",
      phoneCode: "",
      phone: "",
      codeSrc: ""
    };
  },
  computed: {
    passCodeDes() {}
  },
  created() {
    this.changeImg();
  },
  methods: {
    register() {
      this.refs.register.handleSubmit();
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$refs.register.handleReset();
    },
    changeImg() {
      getIdentifyCode(this.formItem).then(res => {
        const codeSrc =
          process.env.NODE_ENV === "development"
            ? host + `${res.code}`
            : host + `/ZY/${res.code}`;
        this.codeSrc = codeSrc;
        this.formItem.verifyCodeID = res.codeID;
      });
    },

    handleSubmit() {
      // 登录成功需要存储用户信息
      this.$store
        .dispatch("Login", this.formItem)
        .then(res => {
          if (res.result === 0) {
            if (res.isAsset === 0) {
              //无资产,欢迎页导入资产
              this.$router.push({ path: "/welcome" });
            } else if (res.isAsset === 1) {
              //有资产的情况
              const login_res = res;
              userTips({ userName: getUserName()}).then(res => {
                if (res.result === 0) {
                  //登陆成功有资产且有任务,默认显示任务调度页面
                  this.$router.push({
                    name: "assetSet",
                    params: {
                      firstLogin: login_res.firstLogin,//是否当然首次登陆
                      userTips: res,//下一页面判断任务是否结束
                    }
                  });
                } else if(res.result === -1) {
                  this.$Message.error({
                    content: '获取用户资产信息失败'
                  })
                } else if (res.result === 2) {
                  // 登陆成功有资产无任务,直接走到大首页
                  this.$router.push({ path: "/taskhomepage"});
                }
              });
            }
          } else if (res.result === 2) {
            message("error", "密码错误");
          } else if (res.result === 3) {
            message("error", "验证码错误");
          } else {
            message("error", "用户名不存在");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    passCode() {
      // 调用发送手机验证码,修改文字
      // 图片验证码,修改图片
      this.timer = setInterval(() => {
        this.passCodeStatus();
      }, 1000);
    },
    passCodeStatus() {
      if (this.passCodeTime === 0) {
        this.passCodeText = "获取验证码";
        this.passCodeSign = false;
        clearInterval(this.timer);
        this.passCodeTime = 60;
      } else {
        this.passCodeTime--;
        this.passCodeText = this.passCodeTime + "秒后重新获取";
        this.passCodeSign = true;
      }
    },
    register() {
      // this.registerModal = true;
      this.$router.push("/register");
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.circle-wrapper {
  margin: 0 auto;
  width: auto;
  padding: none;
  border: none;
  z-index: 1;
  animation-name: slideUp;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
}
@keyframes slideUp {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.ivu-modal-footer {
  border-top: none;
  padding: none;
}
</style>



