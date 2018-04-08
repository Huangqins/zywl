<template>
  <div>
      <div class="entry">
     <Form :model="formItem" :label-width="80"  ref="formItem">
        <FormItem label="用户名" prop="userName">
            <Input v-model="formItem.userName" placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="密码" prop="password">
              <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
          </FormItem>
          <!-- <FormItem label="手机号码" >
              <Input v-model="phone"  placeholder="请输入手机号" style="width: 65%"/>
              <Button type="error" @click="passCode" :disabled="passCodeSign" style="width: 34%">{{passCodeText}}</Button>
          </FormItem> -->
          <!-- <FormItem label="验证码" >
              <Input v-model="formItem.code"  placeholder="请填写手机验证码"/>
          </FormItem> -->
          <FormItem label="验证码" >
              <Input v-model="formItem.verifyCode"  placeholder="请输入验证码" style="width: 45%;" />
              <img width="200" height="38" style="float:right;" :src="codeSrc"  @click="changeImg">
          </FormItem>
          <FormItem class="login" style="text-align:center;">
            <Button type="primary" @click="handleSubmit" style="text-align:center;">确认登陆</Button>
          </FormItem>    
     </Form>
  </div>
  </div>
</template>
<script>
import getIdentifyCode from "api/getIdentifyCode";
import message from "utils/message";
const host =
  process.env.NODE_ENV === "development"
    ? "http://192.168.10.104:8080/ZY/"
    : "";

export default {
  name: "login",
  data() {
    return {
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
    console.log(host);
  },
  methods: {
    changeImg() {
      getIdentifyCode(this.formItem).then(res => {
        this.codeSrc = host + `${res.code}`;
        this.formItem.verifyCodeID = res.codeID;
      });
    },
    handleSubmit() {
      // 登录成功需要存储用户信息
      this.$store
        .dispatch("Login", this.formItem)
        .then(res => {
          if (res.result === 0) {
            this.$router.push({ path: "/welcome" });
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
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>




