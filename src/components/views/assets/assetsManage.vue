<template>
<div>

    <!-- <div class="secOne">   
        <section >
                  <div class="vulnLevel">
                    <div class="levelRight">
                      <chart :option="options" width="190px" height="190px" ref="chart" id="circle"></chart>
                    </div>
                    <div class="levelLeft">
                      <h4 class="levelTitle">风险级别</h4>
                      <div class="levelDescript">扫描器已经发现一个或多个高危类型的漏洞。恶意用户可以利用这些漏洞，并损害后台数据库和您的网站</div>
                    </div>
                  </div>
                   <chart :option="optionLine" width="100%" height="250px" ref="chart" id="circleTwo"></chart>
        </section >
        <section>
            <div class="hotPic">
              <chart :option="option"  width="450px" height="410px"></chart>
            </div>
        </section>
        <section class="holeclassify">                 
                  <div class="holeList">
                    <ul>
                        <li class="listOne">
                          <span class="holeHeader">漏洞排行</span>
                          <span class="holeHeader">漏洞名称</span>
                          <span class="holeHeader">漏洞数量</span>
                        </li>
                        <li v-for="(item,index) in holes" :key="index">
                        <span v-if="index===0"><img src="../../../../static/top1.png" ></span>
                        <span v-else-if="index===1"><img src="../../../../static/top2.png" ></span>
                        <span v-else-if="index===2"><img src="../../../../static/top3.png"/></span>
                        <span v-else>{{index + 1}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.vuln_total}}</span>
                        </li>
                    </ul>
                  </div>
        </section>
     </div> -->
     <div class="all">
       <ul>
          <li style="width:52%;">
              <Card :bordered="false" class="box_report" style="overflow:hidden;">
              <p slot="title" style="color:white">熵值图</p>
              <div>
                <chart :option="optionLine"  width="400px" height="360px" margin="margin-left:60px;" style="float:left;"></chart>
              </div>
              <div class="asset_vulntNum">
                <p>以资产为维度的风险数</p>
                <div>80%<br>风险度</div>
                <div>90%<br>资产健康度</div>
              </div>

              </Card>
          </li>
          <li style="width:47%">
            <Card :bordered="false" class="box_report" style="overflow:hidden;">
                <p slot="title" style="color:white">风险等级变化趋势</p>
                <chart :option="moreLine"  width="400px" height="360px" id="level" ></chart>
              </Card>
          </li>
          <li>
           <Card :bordered="false" class="box_report">
               <p slot="title" style="color:white">年重大风险跟踪</p>
               <div>
                 <chart :option="risk"  width="400px" height="340px" id="risk"></chart>
               </div>
                
           </Card>
          </li>
          <li>
           <Card :bordered="false" class="box_report">
              <p slot="title" style="color:white">漏洞历史变化对比</p>
              <div>
                <chart :option="history"  width="400px" height="340px" id="history"></chart>
              </div>
           </Card>
          </li>
          <li>
           <Card :bordered="false" class="box_report">
              <p slot="title" style="color:white">资产分类风险变化</p>
              <div>
                <chart :option="assetType"  width="400px" height="340px" id="assetType"></chart>
              </div>
           </Card>
          </li>   

       </ul>
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
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告"],
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问"],
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
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
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
      history: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告"],
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
      assetType: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告"],
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

  methods: {
    vulntop() {
      const params = {};
      vulnTop(params).then(res => {
        let data = res.lists;
        this.holes = data;
        let length = 10 - data.length;
        for (let i = 0; i < length; i++) {
          this.holes.push({});
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
.all ul li {
  list-style: none;
  display: inline-block;
  width: 33%;
}
.asset_vulntNum {
  width: 140px;
  color: white;
  float: left;
  margin-left: 100px;
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
.box_report {
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 20px;
}
.vulnLevel {
  /* padding: 15px; */
  display: flex;
  align-items: center;
}
.levelRight {
  margin-right: 10px;
}
.levelLeft {
  flex: 1 1 auto;
  align-items: center;
}
.levelDescript {
  flex: 1 1 100%;
}
.levelTitle {
  flex: 1 1 100%;
  margin: 0 0 10px;
}

.secTwo {
  width: 100%;
  display: flex;
  color: #e4e5e5;
  height: 200px;
  flex-direction: row;
}
.secTwo section {
  flex: 1;
  margin: 20px 60px;
  background: rgba(255, 255, 255, 0.1);
}
.List {
  width: 100%;
  margin-top: 20px;
}
.holeclassify span {
  display: inline-block;
  height: 19px;
}
</style>

