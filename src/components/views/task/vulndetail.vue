<template>
  <div class="vulndetail">
      <div class="whole">
         <Collapse v-model="value1">
            <div style="width:100%;height:100px;padding:10px 40px;">
              <h2>{{vuln_name}}</h2>
               <span class="level" :style="{background: vulncolor[this.vuln_level]}" v-text="vulnlevel[this.vuln_level]"></span><span></span>
            </div>
            <Panel name="1" >
              风险描述
                <p slot="content"> {{kb_vuln_des}}</p>
            </Panel>
            <Panel name="5">
                分类
                <p slot="content"></p>
            </Panel>
            <Panel name="2">
                <span style="color:red">风险详情</span>
                <p slot="content" v-html="vuln_detail" ></p>
            </Panel>
            <Panel name="3" >
                <span style="color:red">风险分析</span>
                <p slot="content">{{kb_vuln_anly}}</p>
            </Panel>
            <Panel name="4">
              加固建议
                <p slot="content">{{kb_vuln_ref}}</p>
            </Panel>
            
       </Collapse>
         
      </div>
  </div>
</template>
<script>
import vulnDetail from "api/vulnDetail";
const vulnlevel = {
  "4": "紧急",
  "3": "高",
  "2": "中",
  "1": "低",
  "0": "无"
};
const vulncolor = {
  "4": "#993333",
  "3": "#DE5145",
  "2": "#FAA732",
  "1": "#23B7E5",
  "0": "#27C24C"
};
export default {
  data() {
    return {
      vulnlevel: vulnlevel,
      vulncolor: vulncolor,
      value1: [1, 2, 3, 4, 5],
      vuln_name: "",
      vuln_level: "",
      kb_vuln_des: "",
      kb_vuln_anly: "",
      kb_vuln_ref: "",
      vuln_detail:''
    };
  },
  created() {
    this.vulnDetail();
  },
  methods: {
    vulnDetail() {
      const params = this.$route.params;
      vulnDetail(params).then(res => {
        let data = res.rows;
        this.vuln_name = data[0].vuln_name;
        this.vuln_level = data[0].vuln_level;
        this.kb_vuln_des = data[0].kb_vuln_des;
        this.kb_vuln_anly = data[0].kb_vuln_anly;
        this.kb_vuln_ref = data[0].kb_vuln_ref;
        this.vuln_detail=data[0].vuln_detail
      });
    }
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
