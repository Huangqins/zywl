<template>
  <div>
       <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formItem">
          <FormItem label="用户名" prop="username">
            <Input v-model="formItem.username" placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="密码" prop="password">
              <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
          </FormItem>
          <FormItem label="确认密码" prop="confirm_password">
              <Input v-model="formItem.confirm_password" type="password" placeholder="请输入确认密码"/>
          </FormItem>
          <FormItem label="邮箱" prop="email">
              <Input v-model="formItem.email" placeholder="请输入邮箱"/>
          </FormItem>
          <FormItem label="手机号" prop="phone">
              <Input v-model="formItem.phone" placeholder="请输入手机号"/>
          </FormItem>
          <FormItem label="真实姓名" prop="trueName">
              <Input v-model="formItem.trueName" placeholder="请输入真实姓名"/>
          </FormItem>
          <FormItem label="身份证号" prop="IDCard">
              <Input v-model="formItem.IDCard" placeholder="请输入身份证号"/>
          </FormItem>
          <FormItem label="公司">
              <Input v-model="formItem.company" placeholder="请输入公司"/>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
              <Button type="ghost" @click="handleReset('formItem')">重置</Button>
          </FormItem>
      </Form>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    const validatePass = (rule, value, callback) => {
      const val = value.replace(/\s+/g, "");
      if (!val) {
        callback(new Error("请输入您的密码"));
      } else {
        if (this.formItem.confirm_password !== "") {
          // 对第二个密码框单独验证
          this.$refs.formItem.validateField("confirm_password");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      const val = value.replace(/\s+/g, "");
      if (!val) {
        callback(new Error("请再次输入您的密码"));
      } else if (value !== this.formItem.password) {
        callback(new Error("两个输入框的密码不一致!"));
      } else {
        callback();
      }
    };
    const validateIdcard = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!value) {
        callback(new Error("请输入您的身份证号"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入合法身份证号"));
      } else {
        callback();
      }
    };
    const validateuesrName = (rule, value, callback) => {
      const reg = new RegExp(
        /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/
      );
      if (!value) {
        callback(new Error("请输入您的用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入合法用户名"));
      } else {
        callback();
      }
    };
    const validatetrueName = (rule, value, callback) => {
      const reg = new RegExp(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/);
      if (!value) {
        callback(new Error("请输入您的真实姓名"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入合法的真实姓名"));
      } else {
        callback();
      }
    };
    const validatephone = (rule, value, callback) => {
      const reg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
      if (!value) {
        callback(new Error("请输入您的手机号"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入合法的手机号"));
      } else {
        callback();
      }
    };
    return {
      formItem: {
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        phone: "",
        trueName: "",
        IDCard: "",
        company: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            validator: validateuesrName,
            trigger: "blur",
            pattern: /\s+/g
          }
        ],
        password: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur"
          }
        ],
        confirm_password: [
          {
            validator: validatePassCheck,
            required: true,
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        phone: [
          {
            validator: validatephone,
            required: true,
            trigger: "blur"
          }
        ],
        trueName: [
          { required: true, validator: validatetrueName, trigger: "blur" }
        ],
        IDCard: [
          {
            required: true,
            validator: validateIdcard,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(username) {
      this.$refs[username].resetFields();
    }
  }
};
</script>
<style scoped>

</style>

