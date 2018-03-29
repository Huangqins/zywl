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
          <FormItem label="验证码" >
            
          </FormItem>
          <FormItem >
            <Button type="primary" @click="handleSubmit">确认登陆</Button>
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
        password: ""
      }
    };
  },
  methods: {
    handleSubmit() {
        // 登录成功需要存储用户信息
        this.$store.dispatch('Login', this.formItem).then((res) => {
          // console.log(res)
            // this.$router.push({ path: '/welcome' })
        }).catch((err) => {
            console.log(err)
        })
    }
  }
};
</script>



