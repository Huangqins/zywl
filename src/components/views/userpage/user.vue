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
                  <!-- <FormItem label="手机号">
                  <Input v-model="formItem.phone" style="width:300px;"/>
                   <Button  style="margin-left: 8px">获取验证码</Button>
                  </FormItem>                  -->
                  <FormItem label="真实姓名">
                  <span  style="width:300px;color:#fff">{{display.trueName}}</span>
                  </FormItem> 
                  <FormItem label="身份证">
                    <span  style="width:300px;color:#fff">{{display.IDCard}}</span>
                  </FormItem>
                  <FormItem label="公司">
                    <span  style="width:300px;color:#fff">{{display.company}}</span>
                  </FormItem>
                   <FormItem label="登陆密码">
                  <span style="width:300px;font-size:14px;color:#fff;" @click="modal1 = true">修改密码</span>
                  </FormItem>
                  <FormItem>                      
                      <Button type="ghost" style="margin-left: 8px" @click="Reset">取消</Button>
                      <Button type="primary"  @click="handleSubmit">提交</Button>
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
import { getToken, getUserName } from "@/utils/auth";
import userInfo from "api/userInfo";
import updateUser from "api/updateUser";

const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";

const href = host + "system/loadFile";
export default {
  data() {
    return {
      uploadUrl: location.origin + "/ZY/system/loadFile",
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      modal1: false,
      formItem: {
        userName: "",
        email: ""
        // phone: ""
      },
      display: {
        trueName: "",
        IDCard: "",
        company: ""
      },
      passItem: {
        password: "",
        new_password: "",
        confirm_password: ""
      },
      userInfos: {

      }
    };
  },
  created() {
    this._getUserInfo();
  },
  methods: {
    success(response) {
      console.log(response);
    },
    _getUserInfo() {
      userInfo().then(res => {
        this.userInfos = res.user;
        let { trueName, userName, email, IDCard, company } = res.user;
        this.formItem = { userName, email };
        this.display = { trueName, IDCard, company };
        console.log(res);
      });
    },
    handleSubmit() {
      let params = Object.assign({}, this.userInfos, this.formItem);
      updateUser(params).then(res => {
        if (res.result === 0) {
          this.$Message.info("修改成功");
          this._getUserInfo();
        } else {
          this.$Message.info("修改失败");
        }
      });
    },
    Reset() {
      this.$refs.formItem.resetFields();
    },
    ok() {
      this.$Message.info("提交成功");
    },
    cancel() {
      this.$Message.info("已取消");
    }
  }
};
</script>
<style scoped>

</style>
