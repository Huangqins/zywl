<template>
  <div class="entry">
     <Form :model="formItem" :label-width="80"  ref="formItem">
        <FormItem label="用户名" prop="username">
            <Input v-model="formItem.username" placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="密码" prop="password">
              <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
          </FormItem>
          <FormItem label="验证码" >
            
          </FormItem>
          <FormItem >
            <Button type="primary" @click="handleSubmit('formItem')">确认登陆</Button>
          </FormItem>
     </Form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formItem: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
      handleSubmit(){}
  }
};
</script>
<style scoped>

</style>


