<template>
<div>
  <div class="entry">  
              <Card style="background:rgba(18,62,101,0.7);border:1px solid #51B3DA;color:white">
                  <h2 slot="title" style="color:white;">请选择您的导入方式</h2>
                  <Row>
                    <Tabs  :animated="false">
                        <Tab-pane label="手动导入">
                            <span>
                                <Input v-model="password" placeholder="请输入初始资产信息（IP段/域名）"/>
                            </span> 
                        </Tab-pane>
                        <Tab-pane label="批量导入">             
                            <Upload  multiple  action="*">
                            <i-button type="ghost" icon="ios-cloud-upload-outline">导入文件</i-button>
                            </Upload>           
                        </Tab-pane>        
                    </Tabs> 
        
                    <Row class="primary" type="flex" align='middle' justify="center" >
                        <Col >
                            <i-button type="primary" @click="assetSubmit">提交</i-button> 
                        </Col>
                        
                    </Row>
                  </Row>  
                  
              </Card>
     
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      password: ""
    };
  },
  methods:{
      assetSubmit(){
           this.$router.push({ path: '/sysInfo' })
      }
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  margin-bottom: 5px;
  line-height: 40px;
  font-size: 26px;
}
.ivu-tabs .ivu-tabs-tabpane{
  margin-bottom: 8px;
}
.ivu-btn-ghost:hover{
  color: white;
}
</style>
