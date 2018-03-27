<template>
  <div>
       <Form :model="formItem" :label-width="80">
          <FormItem label="用户名">
            <Input v-model="formItem.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码">
            <Input v-model="formItem.password" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">注册</Button>
        </FormItem>
      </Form>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      formItem: {
        username: "",
        password: ""
      }
    };
  }
};
</script>
<style scoped>

</style>

