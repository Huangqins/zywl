<template>
<div>
   <div class="secOne">
            <section class="box_report fright" >
              <div style="width:69%;float:left">
                <h3 style="color:white">熵值图</h3>
                <chart :option="optionLine"  width="400px" height="360px" margin="margin-left:60px;" style="float:left;"></chart>
              </div>
              
              <div class="asset_vulntNum">
                <p>以资产为维度的风险数</p>
                <div>80%<br>风险度</div>
                <div>{{health}}%<br>资产健康度</div>
              </div>
            </section>
            <section  class="box_report" style="width:50%;height:400px" >
                <h3 style="color:white">风险等级变化趋势</h3>
                <div>
                 <DatePicker type="month" :value="vulnLevelST" style="width: 100px"></DatePicker>
                至
                 <DatePicker type="month" :value="vulnLevelET"  style="width: 100px"></DatePicker>
               </div> 
                <chart :option="moreLine"  width="400px" height="300px" id="level" ></chart>
            </section>
    </div>
    <div class="secTwo">
            <section class="box_report fright" style="height:440px">
               <h3 style="color:white">年重大风险跟踪</h3> 
               <div>
                 <DatePicker type="month" :value="yearStartTime" style="width: 100px"></DatePicker>
                至
                 <DatePicker type="month" :value="yearEndTime"  style="width: 100px"></DatePicker>
               </div>              
                 <chart :option="risk"  width="400px" height="300px" id="risk"></chart>                            
            </section>
           <section class="box_report fright" style="height:440px;">
              <h3 style="color:white">漏洞历史变化对比</h3>
               <div>
                 <DatePicker type="month" :value="startTime" style="width: 100px"></DatePicker>
                至
                 <DatePicker type="month" :value="endTime"  style="width: 100px"></DatePicker>
               </div> 
               <chart :option="history"  width="400px" height="300px" id="history"></chart>
              
           </section>
           <section  class="box_report" style="width:32%">
              <h3  style="color:white">资产分类风险变化</h3>           
                <chart :option="assetType"  width="400px" height="400px" id="assetType"></chart>
            
           </section>
    </div>          
     
</div>
    
</template>
<script>
import echarts from "echarts";
import chart from "components/chart/chart";
import assetsInfo from "api/assetsInfo";
import topology from "components/chart/topology";
import page from "components/page/page";
import { getUserName } from "@/utils/auth";
import vulnTop from "api/vulnTop";
import vulnAssetsTotal from "api/vulnAssetsTotal";
import vulnHistoryTotal from "api/vulnHistoryTotal";
import vulnHighTotal from "api/vulnHighTotal";
import vulnLevelTotal from "api/vulnLevelTotal";
import assetHealth from "api/assetHealth";

var data = [];

export default {
  name: "assetsManage",
  components: {
    topology,
    page,
    chart
  },
  
  data() {
    return {
      startTime:'2018-04-01',
      endTime:'2018-06-31',
      yearStartTime:'2018-04-01',
      yearEndTime:"2018-06-31",
      vulnLevelST:'2018-04-01',
      vulnLevelET:'2018-06-31',
      health:'',
      optionLine: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          textStyle: {
            color: "#ffffff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      moreLine: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          textStyle: {
            color: "#ffffff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [
          {
            type: "line",
            data: []
          }
        ]
      },
      risk: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销"],
          textStyle: {
            color: "#ffffff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [
          {
            type: "line",
            data: []
          }
        ]
      },
      history: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          textStyle: {
            color: "#ffffff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [   
          {
            data: [],
            type: "line"
          }
             ]
      },
      assetType: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          textStyle: {
            color: "#ffffff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      },
      //top10排行榜
      holes: [],
      assetsList: [],
      width: "800px",
      total: 0,
      loading: false,
      defaultPage: {
        assets_zone: 0,
        rows: 10,
        page: 1
      }
    };
  },
  mounted() {
    const params = Object.assign({}, this.defaultPage);
    this._assetsInfo(params);
    this.vulntop();
  },
  created() {
    this._vulnAssetsTotal();
    this._vulnHistoryTotal();
    this._vulnHighTotal()
    this._vulnLevelTotal()    
    this._assetHealth()
  },
  methods: {
    vulntop() {
      vulnTop({}).then(res => {
        let data = res.lists;
        this.holes = data;
        let length = 10 - data.length;
        for (let i = 0; i < length; i++) {
          this.holes.push({});
        }
      });
    },
    //资产分类风险变化
    _vulnAssetsTotal() {
      vulnAssetsTotal({}).then(res => {
        if (res.result === 0) {
          let list = res.lists;
          list.forEach(item => {
            this.assetType.xAxis.data.push(item.vuln_code);
            this.assetType.legend.data.push(item.vuln_code);
            this.assetType.series[0].data.push({
              value: item.vuln_Num,
              name: item.vuln_code
            });
          });
        }
      });
    },
    //漏洞历史变化
    _vulnHistoryTotal() {
      vulnHistoryTotal({startTime:this.startTime,endTime:this.endTime}).then(res => {
        if (res.result === 0) {
          let list = res.lists;
          list.forEach(item => {
            this.history.xAxis.data.push(item.vuln_name);
            this.history.legend.data.push(item.vuln_name);
            this.history.series[0].data.push({
              value: item.vuln_total,
              name: item.vuln_name
            });
          });
        }
      });
    },
    //重大风险变化
    _vulnHighTotal() {
      vulnHighTotal({startTime:this.yearStartTime,endTime:this.yearEndTime}).then(res => {
        if (res.result === 0) {
          let list = res.lists;
          list.forEach(item => {
            this.risk.xAxis.data.push(item.vuln_name);
            this.risk.legend.data.push(item.vuln_name);
            this.risk.series[0].data.push({
              value: item.vuln_total,
              name: item.vuln_name
            });
          });
        }
      });
    },
    //风险等级变化
    _vulnLevelTotal() {
      vulnLevelTotal({startTime:this.yearStartTime,endTime:this.yearEndTime}).then(res => {
        if (res.result === 0) {
          let list = res.lists;
          list.forEach(item => {
            this.moreLine.xAxis.data.push(item.vuln_name);
            this.moreLine.legend.data.push(item.vuln_name);
            this.moreLine.series[0].data.push({
              value: item.kb_vuln_level,
              name: item.vuln_name
            });
          });
        }
      });
    },
    //资产健康度
    _assetHealth() {
      assetHealth({}).then(res => {       
        this.health = res.health;        
      });
    },
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _assetsInfo(params) {
      this.loading = true;
      const res = await assetsInfo(params);
      if (res.rows[0] === null) {
        this.loading = false;
        this.assetsList = [];
      } else {
        this.assetsList = res.rows;
        res.rows.forEach(item => {
          data.push([item.vuln_total, item.vuln_use, item.assets_name]);
        });
        this.optionLine.xAxis.data = res.rows.map(item => {
          return item.assets_name;
        });
        this.optionLine.series[0].data = res.rows.map(item => {
          return item.vuln_total;
        });
        this.total = res.total;
        this.loading = false;
      }
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj);
      this._assetsInfo(params);
    }
  }
};
</script>
<style scoped>
.box_report {
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0px;
  padding: 10px;
  overflow: hidden;
}
.secOne {
  overflow: hidden;
  margin: 0 20px;
}
.secOne section {
  width: 49%;
  float: left;
  box-sizing: border-box;
}
.secOne .fright {
  margin-right: 10px;
}
.secTwo {
  overflow: hidden;
  margin: 0 20px;
}
.secTwo section {
  width: 33%;
  float: left;
  box-sizing: border-box;
}
.secTwo .fright {
  margin-right: 10px;
}
.asset_vulntNum {
  width: 30%;
  color: white;
  float: left;
  text-align: center;
  /* margin-left:100px; */
}
.asset_vulntNum div {
  width: 95px;
  height: 95px;
  padding: 22px 0;
  border-radius: 50%;
  background: red;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
}
</style>

