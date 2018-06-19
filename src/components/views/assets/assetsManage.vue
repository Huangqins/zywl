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
                <div>90%<br>资产健康度</div>
              </div>
            </section>
            <section  class="box_report" style="width:50%">
                <h3 style="color:white">风险等级变化趋势</h3>
                <chart :option="moreLine"  width="400px" height="360px" id="level" ></chart>
            </section>
    </div>
    <div class="secTwo">
            <section class="box_report fright">
               <h3 style="color:white">年重大风险跟踪</h3>
               
                 <chart :option="risk"  width="400px" height="400px" id="risk"></chart>
                            
            </section>
           <section class="box_report fright">
              <h3 style="color:white">漏洞历史变化对比</h3>
              
                <chart :option="history"  width="400px" height="400px" id="history"></chart>
              
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
      optionLine: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告'],
            textStyle:{
              color:"#ffffff"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }

        },
        series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
        ]
      },
     moreLine : {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问'],
                textStyle:{
                  color:"#ffffff"
                 }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                axisLine:{
                lineStyle:{
                  color:"#ffffff"
                }
              }
            },
            yAxis: {
                type: 'value',
                axisLine:{
                  lineStyle:{
                  color:"#ffffff"
                 }
                }
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                }
            ]
        },
        risk: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销'],
            textStyle:{
              color:"#ffffff"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }

        },
        series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
        ]
      },
      history: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告'],
            textStyle:{
              color:"#ffffff"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }

        },
        series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
        ]
      },
      assetType: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告'],
            textStyle:{
              color:"#ffffff"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:"#ffffff"
              }
            }

        },
        series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
        ]
      },
      //top10排行榜
      holes: [],
      assetsList: [],
      width: "800px",
      total: 0,
      loading: false
    };
  },
  mounted() {
    const params = Object.assign({}, this.defaultPage);
    this._assetsInfo(this.defaultPage);
    this.vulntop();
  },

  methods: {
    vulntop() {
      const params = {};
      vulnTop(params).then(res => {
        let data = res.lists;
        this.holes = data;
        let length = 10 - data.length
        for (let i = 0 ; i< length; i++) {
          this.holes.push({})
        }
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
          return item.assets_name
        })
        this.optionLine.series[0].data = res.rows.map(item => {
          return item.vuln_total
        })
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
.secOne{
  overflow: hidden;
  margin:0 20px;
}
.secOne section{
  width: 49%;
  float: left;  
  box-sizing: border-box;
}
 .secOne .fright{
  margin-right:10px;
}
.secTwo{
  overflow: hidden;
  margin:0 20px;
}
.secTwo section{
  width: 33%;
  float: left;  
  box-sizing: border-box;
}
 .secTwo .fright{
  margin-right:10px;
}
.asset_vulntNum {
  width:30%;
  color: white;
  float: left;  
  text-align: center;
  /* margin-left:100px; */

}
.asset_vulntNum div{
   width: 95px;
   height: 95px;
   padding:22px 0;
   border-radius: 50%;
   background: red;
   text-align: center;
   margin: 0 auto;
   margin-top:40px
}

</style>

