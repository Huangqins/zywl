<template>
  <div>
      <div class="entry" style="border:none;width:306px;"> 
      <Form :model="formItem" :label-width="60"  ref="formItem" :label-position="left">
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
          <FormItem  >
              <Input v-model="formItem.verifyCode"  placeholder="请输入验证码" style="width: 52%;" @on-enter="handleSubmit"/>
              <img width="80" height="32" style="float:right;margin-top:2px;" :src="codeSrc"  @click="changeImg">
          </FormItem>
          <FormItem class="login" style="text-align:center;">
            <Button type="primary" @click="cancle" style="text-align:center;float:left">注册</Button>
            <!-- 暂时隐藏注销按钮 -->
            <!-- <Button type="primary" @click="cancle" style="text-align:center;float:left">注销</Button> -->
            <Button type="primary" @click="handleSubmit" style="text-align:center;float:right">登陆</Button>
          </FormItem>    
     </Form>
   </div> 
    <div  id="header" class="entry whole">
           <div class="hero-logo-circles">
               <img src="../../assets/svg/1.svg" class="hero-logo-circle"/>
               <img src="../../assets/svg/2.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/3.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/4.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/5.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/6.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/7.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/8.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/9.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/10.svg" alt="" class="hero-logo-circle">
           </div>
       </div>
  </div>
</template>
<script>
import getIdentifyCode from "api/getIdentifyCode";
import message from "utils/message";

const host = process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";

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
            if (res.isAsset === 0) {
              this.$router.push({ path: "/welcome" });
            } else if (res.isAsset === 1) {
              this.$router.push({ path: "/sysinfo" });
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
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.whole {
  width: auto;
  padding: none;
  border: none;
  z-index: -9998;
}
#header {
  margin: 0 auto;
}
.hero-logo-circles {
  width: 366px;
  height: 366px;
  margin: auto;
  position: relative;
  margin-top: -55px;
  margin-left: 20px;
}
.hero-logo-circle {
  position: absolute;
  left: 0;
  top: 0;
  -webkit-animation: hero-logo-circle 1s linear infinite;
  animation: hero-logo-circle 1s linear infinite;
  will-change: transform;
  width: 400px;
}
.hero-logo-circle:nth-child(1) {
  animation-duration: 30s;
}
.hero-logo-circle:nth-child(2) {
  animation-duration: 40s;
}
.hero-logo-circle:nth-child(3) {
  animation-duration: 50s;
}
.hero-logo-circle:nth-child(4) {
  animation-duration: 60s;
}
.hero-logo-circle:nth-child(5) {
  animation-duration: 70s;
}
.hero-logo-circle:nth-child(6) {
  animation-duration: 80s;
}
.hero-logo-circle:nth-child(7) {
  animation-duration: 90s;
}
.hero-logo-circle:nth-child(8) {
  animation-duration: 100s;
}
.hero-logo-circle:nth-child(9) {
  animation-duration: 110s;
}
.hero-logo-circle:nth-child(10) {
  animation-duration: 110s;
}
@keyframes hero-logo-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ivu-btn-primary{
  background:rgba(45,140,240,0);
  border:1px solid #5D90BB;
}

</style>



