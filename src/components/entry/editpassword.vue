<template>
  <div>
      <div class="welcome">
        <Form :model="formItem" :label-width="80"  ref="formItem">
            <FormItem label="旧密码" prop="oldPassword">
                <Input v-model="formItem.oldPassword" type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="新密码" prop="password">
                <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="确认新密码" prop="confirmNewPassword">
                <Input v-model="formItem.confirmNewPassword" type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem class="handle">
                <Button type="error" @click="cancel" class="save">取消</Button>
                <Button type="success" @click="save" class="save">保存</Button>
            </FormItem>
        </Form>
      </div>
  </div>
</template>
<script>
import changePassWord from "api/changePassWord";
import { mapGetters } from 'vuex'

export default {
  name: "editpassword",
  data() {
    return {
      formItem: {
        password: "",
        oldPassword: "",
        confirmNewPassword: "",
        token: "",
        userName: ""
      }
    };
  },
  computed: {
      ...mapGetters([
          'token',
          'userName'
      ])
  },
  methods: {
    save() {
        // console.log(this.token)
      this.formItem.token = this.token;
      this.formItem.userName = this.userName;
      changePassWord(this.formItem).then(res => {
        console.log(res);
      });
    },
    cancel() {}
  }
};
</script>
<style scoped>
.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 410px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
.handle {
  display: flex;
  justify-content: center;
}
</style>
