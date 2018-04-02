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
          <FormItem label="手机号码" >
              <Input v-model="formItem.phone"  placeholder="请输入手机号" style="width: 65%"/>
              <Button type="error" @click="passCode" :disabled="passCodeSign" style="width: 34%">{{passCodeText}}</Button>
          </FormItem>
          <FormItem label="验证码" >
              <Input v-model="formItem.code"  placeholder="请填写手机验证码"/>
          </FormItem>
          <FormItem class="login" style="text-align:center;">
            <Button type="primary" @click="handleSubmit" style="text-align:center;">确认登陆</Button>
          </FormItem>
     </Form>
  </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formItem: {
        userName: "",
        password: "",
        code: ""
      },
      passCodeTime: 60,
      passCodeSign: false,
      passCodeText: "获取验证码",
      timer: ''
    };
  },
  computed: {
    passCodeDes() {}
  },
  methods: {
    handleSubmit() {
      // 登录成功需要存储用户信息
      this.$store
        .dispatch("Login", this.formItem)
        .then(res => {
          if (res.result === 0) {
            this.$router.push({ path: "/welcome" });
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
        this.passCodeStatus()
     },1000)
    },
    passCodeStatus() {
      if (this.passCodeTime === 0) {
        this.passCodeText = "获取验证码";
        this.passCodeSign = false;
        clearInterval(this.timer);
        this.passCodeTime = 60;
      } else {
        this.passCodeTime--;
        this.passCodeText = this.passCodeTime + '秒后重新获取';
        this.passCodeSign = true;
      }
    }
  },
  destroyed() {
   clearInterval(this.timer)
  }
};
</script>




