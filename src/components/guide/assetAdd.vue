<template>
<div>
  <div class="whole">  
              <Card class="card" tyle="">
                  <h2 slot="title" style="color:white;">请选择您的导入方式</h2>
                  <Row>
                    <Tabs  :animated="false">
                        <Tab-pane label="手动导入">
                            <!-- <span>
                                <Input v-model="password" placeholder="请输入初始资产信息（IP段/域名）"/>
                            </span>  -->
                            <Form ref="handAdd" :model="handAddForm" :rules="ruleValidate">
                               <FormItem prop="assetsName">
                                    <Input type="text" v-model="handAddForm.assetsName" placeholder="资产名称"></Input>
                                </FormItem>
                                <FormItem prop="assetsURL">
                                    <Input type="text" v-model="handAddForm.assetsURL" placeholder="URL地址"></Input>
                                </FormItem>
                                 <FormItem prop="assetsIp">
                                    <Input type="text" v-model="handAddForm.assetsIp" placeholder="IP"></Input>
                                </FormItem>
                                <!-- <FormItem>
                                    <Input type="text" v-model="handAddForm.assetsPort" placeholder="端口"></Input>
                                </FormItem>
                                <FormItem>
                                    <Input type="text" v-model="handAddForm.assetsProto" placeholder="通讯协议"></Input>
                                </FormItem>
                                <FormItem >
                                    <Input type="text" v-model="handAddForm.assetsServers" placeholder="开放服务信息"></Input>
                                </FormItem>
                               <FormItem >
                                    <Input type="text" v-model="handAddForm.assetsRegion" placeholder="所属区域"></Input>
                                </FormItem>
                                <FormItem>
                                    <Input type="text" v-model="handAddForm.assetsType" placeholder="资产类型"></Input>
                                </FormItem>
                                 <FormItem >
                                    <Input type="text" v-model="handAddForm.assetsImportant" placeholder="资产重要度"></Input>
                                </FormItem>
                                <FormItem >
                                    <Input type="text" v-model="handAddForm.assetsOS" placeholder="OS类型"></Input>
                               </FormItem> -->
                                <FormItem prop="assetsManger">
                                    <Input type="text" v-model="handAddForm.assetsManger" placeholder="负责人"></Input>
                                </FormItem>
                            </Form>
                        </Tab-pane>
                        <Tab-pane label="批量导入">             
                            <Upload  multiple  action="*">
                            <i-button type="ghost" icon="ios-cloud-upload-outline">导入文件</i-button>
                            </Upload>           
                        </Tab-pane>        
                    </Tabs>
                    <Row class="primary" type="flex" align='middle' justify="center" >
                        <Col >
                            <i-button type="primary"  @click="assetSubmit">提交</i-button> 
                        </Col>
                    </Row>
                  </Row>                 
              </Card> 
  </div>
</div>
</template>
<script>
import assetAdd from "api/assetAdd";
import { mapGetters } from "vuex";
import message from "utils/message";

export default {
  data() {
    const assetsUrlPass = (rule, value, callback) => {
      if (value === "" && this.handAddForm.assetsIp === "") {
        callback(new Error("url及ip请至少填写一项"));
      } else {
        callback();
      }
    };

    const assetsIpPass = (rule, value, callback) => {
      if (value === "" && this.handAddForm.assetsURL === "") {
        callback(new Error("url及ip请至少填写一项"));
      } else {
        callback();
      }
    };
    return {
      password: "",
      handAddForm: {
        assetsName: "",
        assetsURL: "",
        assetsIp: "",
        assetsManger: '',
        assetsCreatUser: ""
      },
      ruleValidate: {
        assetsName: [
          { required: true, message: "任务名称必填", trigger: "blur" }
        ],
        assetsURL: [{ validator: assetsUrlPass, trigger: "blur" }],
        assetsIp: [{ validator: assetsIpPass, trigger: "blur" }],
        assetsManger: [
          { required: true, message: "负责人必填", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  methods: {
    assetSubmit() {
      // this.$router.push({ path: "/sysInfo" });
      this.handAddForm.assetsCreatUser = this.userName;
      assetAdd(this.handAddForm).then(res => {
        if (res.result === 0) {
          message("success", "导入资产成功");
          this.$router.push({
            name: "assetSet",
            params: {
              assetsUrl: this.handAddForm.assetsURL,
              assetsIp: this.handAddForm.assetsIp
            }
          });
        } else if (res.result === -1) {
          message("error", "导入资产失败");
        } else if (res.result === 2) {
          message("error", "导入资产重复");
        }
      });
    }
  }
};
</script>
<style scoped>
.whole {
  width: 410px;
  height: auto;
  margin: 100px auto 0px auto;
  font-family: sans-serif;
}
.header {
  height: 40px;
  margin-bottom: 5px;
  line-height: 40px;
  font-size: 26px;
}
.ivu-tabs .ivu-tabs-tabpane {
  margin-bottom: 8px;
}
.ivu-btn-ghost:hover {
  color: white;
}
.card {
  background: rgba(46, 59, 93, 0.1);
  border: 1px solid #3889d9;
  color: white;
}
</style>
       