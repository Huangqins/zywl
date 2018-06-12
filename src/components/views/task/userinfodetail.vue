<template>
  <div class="vulndetail">
      <div class="whole">
         <Collapse v-model="value1">
            <div style="width:100%;height:57px;padding:10px 40px;">
              <h2>{{userInfo.vuln_URL}}</h2>              
            </div>
            <Panel name="1" >
              风险信息
                <p slot="content"> {{userInfo.vuln_useInfo}}</p>
            </Panel>
             <Panel name="2">
                利用详情
                <img slot="content" :src="userInfo.image_path" style="height:660px;"/>
            </Panel>
          
            
       </Collapse>
         
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: [1,2],
      userInfo: null
    };
  },
  created(){
      const params = this.$route.params;
      const storage = window.localStorage;
      if (Object.keys(this.$route.params).length !== 0) {
        storage.setItem(
          "userInfo",
          JSON.stringify(this.$route.params)
        );
      }
      this.userInfo = JSON.parse(storage.getItem('userInfo'))
  },
  beforeDestroy() {
    window.localStorage.removeItem('userInfo')
  },
  methods: {  }
};
</script>
<style scoped>
.ivu-collapse {
  background: transparent;
}
.whole {
  width: 100%;
  padding: 10px 20px;
  color: #fbfbfb;
}
.whole p{
  font-size: 15px;
}
.whole h2 {
  margin-bottom: 10px;
}
.level {
  display: inline-block;
  padding: 5px 8px;
  text-align: center;
  border-radius: 3px;
}
</style>
