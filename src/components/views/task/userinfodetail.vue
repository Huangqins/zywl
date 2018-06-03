<template>
  <div class="vulndetail">
      <div class="whole">
         <Collapse v-model="value1">
            <div style="width:100%;height:100px;padding:10px 40px;">
              <h2>{{vuln_URL}}</h2>
               <!-- <span class="level" :style="{background: vulncolor[this.vuln_level]}" v-text="vulnlevel[this.vuln_level]"></span><span></span> -->
            </div>
            <Panel name="1" >
              风险信息
                <p slot="content"> {{vuln_useInfo}}</p>
            </Panel>
             <Panel name="2">
                利用详情
                <img slot="content" :src="image_path" style="height:500px;"/>
            </Panel>
          
            
       </Collapse>
         
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vuln_URL: "",
      vuln_useInfo:'',
      value1: [1,2],
      image_path:''
    
    };
  },
  created(){
      const params = this.$route.params;
      this.vuln_URL=params.vuln_URL
      this.vuln_useInfo=params.vuln_useInfo
      this.image_path=params.image_path
  },
  methods: {
    // vulnDetail() {
    //   const params = this.$route.params;
    //   vulnDetail(params).then(res => {
    //     let data = res.rows;
    //     this.vuln_name = data[0].vuln_name;
    //     this.vuln_level = data[0].vuln_level;
    //     this.kb_vuln_des = data[0].kb_vuln_des;
    //     this.kb_vuln_anly = data[0].kb_vuln_anly;
    //     this.kb_vuln_ref = data[0].kb_vuln_ref;
    //     this.vuln_detail=data[0].vuln_detail
    //   });
    // }
  }
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
