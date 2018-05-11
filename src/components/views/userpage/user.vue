<template>
  <div class='logs'>
    <div style="padding:10px;">
      <Card>
                <p slot="title" style="font-size:16px;"><Icon type="person" style="margin-right:5px;"></Icon>个人信息</p>
                <Form :model="formItem" :label-width="80">
                  <FormItem label="用户名">
                  <Input v-model="formItem.userName"  style="width:300px;"/>
                  </FormItem> 
                  <FormItem label="邮箱">
                  <Input v-model="formItem.email"  style="width:300px;"/>
                  </FormItem>
                  <FormItem label="手机号">
                  <Input v-model="formItem.phone" style="width:300px;"/>
                   <Button  style="margin-left: 8px">获取验证码</Button>
                  </FormItem>                 
                  <FormItem label="真实姓名">
                  <!-- <span  style="width:300px;">{{trueName}}</span> -->
                  </FormItem> 
                  <FormItem label="身份证">
                  <!-- <span  placeholder="" style="width:300px;">{{IDCard}}</span> -->
                  </FormItem>
                  <FormItem label="公司">
                  <!-- <span  placeholder="" style="width:300px;">{{company}}</span> -->
                  </FormItem>
                   <FormItem label="登陆密码">
                  <span style="width:300px;font-size:14px;color:#fff;" @click="modal1 = true">修改密码</span>
                  </FormItem>
                  <FormItem>                      
                      <Button type="ghost" style="margin-left: 8px" @click="Reset">取消</Button>
                      <Button type="primary"  @click="handleSubmit('formItem')">提交</Button>
                  </FormItem>
                 </Form>
        </Card>
    </div>
        <Modal
        v-model="modal1"
        title="修改密码"
        :mask-closable="false"
        :closable="false"
        
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="passItem" :label-width="80">
                  <FormItem label="原密码">
                  <Input v-model="passItem.password"  style="width:300px;"/>
                  </FormItem> 
                  <FormItem label="新密码">
                  <Input v-model="passItem.new_password"  style="width:300px;"/>
                  </FormItem>
                  <FormItem label="确认密码">
                  <Input v-model="passItem.confirm_password"  style="width:300px;"/>
                  </FormItem>
        </Form>
    </Modal>
  </div>
</template>
<script>
import { getUserName } from "@/utils/auth";
export default {
  data(){
    return{
       modal1: false,
      formItem:{
         userName:'',
         email:'',
         phone:''
         },
      passItem:{
        password:'',
        new_password:'',
        confirm_password:''
      }
       
      
    }
  },
  methods: {
    handleSubmit(userName) {
      this.$refs[userName].validate(valid => {
        if (valid) {
          this.$Message.success("填写成功!");
        //   editPassword(this.formItem).then(res => {
        //     if (res.result === 0) {
        //       this.$router.push({ path: "/login" });
        //     }
        //   });
        // } else {
        //   this.$Message.error("Fail!");
         }
      });
    },
    Reset() {
       this.$refs.formItem.resetFields();
    },
    ok () {
        this.$Message.info('提交成功');
    },
    cancel () {
        this.$Message.info('已取消');
     }
  }
}
</script>
<style scoped>

</style>
