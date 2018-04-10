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
                            <Form ref="handAdd" :model="handAddForm"  :label-width="90">
                               <FormItem label="资产名称">
                                    <Input type="text" v-model="handAddForm.assetsName"></Input>
                                </FormItem>
                                <FormItem label="URL地址">
                                    <Input type="text" v-model="handAddForm.assetsURL"></Input>
                                </FormItem>
                                 <FormItem label="IP">
                                    <Input type="text" v-model="handAddForm.assetsIP"></Input>
                                </FormItem>
                                <FormItem label="端口">
                                    <Input type="text" v-model="handAddForm.assetsPort"></Input>
                                </FormItem>
                                <FormItem label="通讯协议">
                                    <Input type="text" v-model="handAddForm.assetsProto"></Input>
                                </FormItem>
                                <FormItem label="开放服务信息">
                                    <Input type="text" v-model="handAddForm.assetsServers"></Input>
                                </FormItem>
                               <FormItem label="所属区域">
                                    <Input type="text" v-model="handAddForm.assetsRegion"></Input>
                                </FormItem>
                                <FormItem label="资产类型">
                                    <Input type="text" v-model="handAddForm.assetsType"></Input>
                                </FormItem>
                                 <FormItem label="资产重要度">
                                    <Input type="text" v-model="handAddForm.assetsImportant"></Input>
                                </FormItem>
                                <FormItem label="OS类型">
                                    <Input type="text" v-model="handAddForm.assetsOS"></Input>
                                </FormItem>
                                <FormItem label="负责人">
                                    <Input type="text" v-model="handAddForm.assetsManger"></Input>
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
    return {
      password: "",
      handAddForm: {
        assetsName: "",
        assetsURL: "",
        assetsIP: "",
        assetsPort: "",
        assetsProto: "",
        assetsServers: "",
        assetsRegion: "",
        assetsType: "",
        assetsImportant: "",
        assetsOS: "",
        assetsManger: "",
        assetsCreatUser: ""
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
        } else if (res.result === -1) {
          message("error", "导入资产失败");
        }
      });
    }
  }
};
</script>
<style scoped>
.whole{
    width:525px;
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
.card{
background:rgba(46,59,93,0.1);
border:1px solid #3889D9;
color:white;
-moz-box-shadow:-5px 4px 20px #3889D9, 1px 4px 20px #3889D9, 4px 1px 20px #3889D9, -2px -1px 20px #3889D9;
 -webkit-box-shadow:-5px 4px 20px #3889D9, 1px 4px 20px #3889D9, 4px 1px 20px #3889D9, -2px -1px 20px #3889D9;
 box-shadow:-5px 4px 20px #3889D9, 1px 4px 20px #3889D9, 4px 1px 20px #3889D9, -2px -1px 20px #3889D9;
}
</style>
       