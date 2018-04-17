<template>
<div>
  <div class="entry">
    <!-- <div>
         <Row>
          <Col span="24">
              <Card>
                  <p slot="title">{{trueName}},您好！</p>
                  <p>您目前的资产有XXX个,主机XXX个,应用系统XXX个。</p>               
                  <p class="handle"><i-button type="success"  @click="nextFunction">确定</i-button></p>
                  
              </Card>
          </Col>
         </Row>
    </div> -->
    <!-- <div>
         <Row>
          <Col span="24">
              <Card>
                  <p slot="title">{{trueName}},您好！</p>
                  <p>欢迎使用智刃安全攻防平台,距您上次进行攻防测试已经过了XXX天XXX小时XXX分钟，建议进行测试的资产为XXX。</p>               
                  <p class="handle"><i-button type="success"  @click="nextFunction">确定</i-button></p>
                  
              </Card>
          </Col>
         </Row>
    </div> -->
    <div>
         <Row>
          <Col span="24">
              <Card style="background:rgba(18,62,101,0.7);border:1px solid #51B3DA;">
                  <p slot="title" style="color:white;">{{trueName}},您好！</p>
                  <p>欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。</p>
                  <p>是否要进行安全测试？</p>
                  <p class="handle"><i-button type="error" @click="goHomePage" class="cancel">取消</i-button><i-button type="success"  @click="goAssetSet">确定</i-button></p>
              </Card>
          </Col>
         </Row>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        
    };
  },  
  computed: {
    ...mapGetters(["trueName"])
  },
  methods: {
    goHomePage() {
      this.$router.push({ path: "/taskhomepage" });
    },
    nextFunction(){
    this.$router.push({ path: "/taskhomepage" });
    },
    goAssetSet(){
    this.$router.push({ path: "/assetSet" });
    }
  }
};
</script>
<style scoped>
.go {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.handle{
    display: flex;
    justify-content: flex-end;
}

.cancel{
    margin-right: 10px;
}
</style>
