<template>
  <div>
    <div style="width:100%;overflow:hidden;">
        <div class="box_report aside">     
          <h3 style="color:white">漏洞Top10排行榜</h3>
          <section class="holeList" style="height:255px;">
                    <ul>
                        <li class="listOne">
                          <span class="holeHeader" style="font-family:sans-serif">漏洞排行</span>
                          <span class="holeHeader">漏洞名称</span>
                          <span class="holeHeader">漏洞数量</span>
                        </li>
                        <li v-for="(item,index) in holes" :key="index">
                        <span v-if="index===0"><img :src="image_One" ></span>
                        <span v-else-if="index===1"><img :src="image_Two" ></span>
                        <span v-else-if="index===2"><img :src="image_Three"/></span>
                        <span v-else>{{index + 1}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.vuln_total}}</span>
                        </li>
                    </ul>
          </section>
        </div>
        <div class="box_report rightaside">    
           <!-- <h3 style="color:white">没啥</h3>  -->
          <section style="width:40%;">
            <div class="assetPic">
              <p style="text-align:center">当前风险数</p>
              <p style="text-align:center">{{total}}</p>
            </div>             
             <ul>
               <li>
                 <Icon type="alert-circled" style="font-size:28px;float:left;margin-right:8px;color:white"> </Icon>
                 <p>极高风险</p>
                 <p>{{most}}</p>
                 </li>
               <li>
                 <Icon type="alert-circled" style="font-size:28px;float:left;margin-right:8px;color:white"> </Icon>
                 <p>高风险</p>
                 <p>{{high}}</p>
               </li>
               <li>
                <Icon type="alert-circled" style="font-size:28px;float:left;margin-right:8px;color:white"> </Icon>
                 <p>中风险</p>
                 <p>{{middle}}</p>
               </li>
               <li>
                 <Icon type="alert-circled" style="font-size:28px;float:left;margin-right:8px;color:white"> </Icon>
                 <p>低风险</p>
                 <p>{{low}}</p>
                </li>   
                <li>
                 <Icon type="alert-circled" style="font-size:28px;float:left;margin-right:8px;color:white"> </Icon>
                 <p>极低风险</p>
                 <p>{{litter}}</p>
                </li>          

             </ul>
          </section>
          <section class="repaid">
            <ul>              
              <li style="width:49%">
                <p>平均修复率</p>
                <div class="repaid_num">{{repair}}</div>
              </li>
              <li style="width:49%">
                <p>平均修复周期</p>
                <div class="repaid_num">{{cycle}}</div>
              </li>
              <li style="width:49%">
                <p>已处理风险数</p>
                <div class="repaid_num">{{handle}}</div>
              </li>
              <li style="width:49%">
                <p>待修复风险数</p>
                <div class="repaid_num">{{pending}}</div>
              </li>             

            </ul>
          </section>
        </div>
    </div>     
        <div class="leaksThree" style="height:428px">
          <h3 style="color:white;margin-bottom:5px;">风险列表</h3>
           <page :columns="leaksColums" :data="leaksList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" ></page>           
        </div>
        
        
  </div>
</template>
<script>
import chart from "components/chart/chart";
import page from "components/page/page";
import leaksInfo from "api/leaksInfo";
import vulnTotal from "api/vulnTotal";
import { getUserName } from "@/utils/auth";
import vulnLevel from "api/vulnLevel";
import cloud from "../../taskpage/cloud";
import vulntype from "api/vulntype";
import vulnWordClouds from "api/vulnWordClouds";
import getVulnInfo from "api/getVulnInfo";
import fomatterTime from "@/utils/tool";
import vulnTop from "api/vulnTop";
import repairRate from "api/repairRate";
import repairVuln from "api/repairVuln";
const levelSchema = {
  "4": "极高风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "极低风险"
};
export default {
  name: "leaks",
  components: {
    chart,
    page,
    cloud
  },
  data() {
    return {
      total:'',
      repair:'',
      cycle:'',
      handle:'',
      pending:'',
      most:0,
      high: 0,
      middle: 0,
      low: 0,
      litter:0,
      image_One:require("static/top1.png"),
      image_Two:require("static/top2.png"),
      image_Three:require("static/top3.png"),
      holes:'',
      name:'',
      vuln_total:'',
      taskID: "",
     
      prompt: "",
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 18 },
            data: [{ value: 0, name: "高风险" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false, distance: 0 },
            pointer: { length: "30%", show: true, width: 4 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      vulntypes: {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: [],
          textStyle: {
            color: "#fbfbfb"
          }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["32%", "50%"],
            selectedMode: "single",
            data: [],
            label: {
              formatter: function(params) {
                return params.value;
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      optionthree: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 18 },
            data: [{ value: 0, name: "低风险" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false, distance: 0 },
            pointer: { length: "30%", show: true, width: 4 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      loading: false,
      leaksColums: [
        {
          title: "风险名称",
          key: "vuln_name",
          align: "center"
        },
        {
          title: "风险类型",
          key: "vuln_type",
          align: "center"
        },
        {
          title: "风险等级",
          key: "vuln_level",
          align: "center",
          width: 85,
          render: (h, params) => {
            return h("span", `${levelSchema[params.row.vuln_level]}`);
          }
        },
        {
          title: "owasp分类",
          key: "kb_vuln_class",
          align: "center"
        },
        {
          title: "风险IP",
          key: "vuln_IP",
          align: "center"
        },
        {
          title: "发现时间",
          key: "vuln_ftime",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.vuln_ftime.time))
            );
          }
        },
        {
          title: "修复时间",
          key: "",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                   
                  }
                }
              },"已修复"),

              h("Button", {
                props: {
                  size: "small",
                },
                on: {
                  click: () => {
                    this.ignore({assets_id: params.row.assets_id})
                   
                  }
                }
              },"忽略")
            ]);
          }
        }

      ],
      leaksList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      loading: false,
      cloudWords: []
    };
  },
  created() {
    // this.taskID = this.$route.params.taskID;
    const params = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    this._leaksInfo(params);
    this._vulnTotal();
    this._repairRate()
    // this._vulnWordClouds();
    // this._vulnLevel({taskID:})
  },
  mounted() {
    // this.vulntype();
    this.vulntop();
  },
  methods: {
    //修复区域
    _repairRate() {
      repairRate({}).then(res => {
         console.log(res)
         this.repair=res.repair;
         this.cycle=res.cycle;
         this.handle=res.handle;
         this.pending=res.pending
      })
    },
    //风险修复
    _repairVuln() {
      repairVuln({}).then(res => {
         
         
      })
    },
    //top10排行榜
    vulntop() {
      const params = {};
      vulnTop(params).then(res => {
        let data = res.lists;
        this.holes = data;
        let length = 10 - data.length;
        if (data.length < 10) {
          for (let i = 0; i < length ; i++) {
            this.holes.push({})
          }
        }
      });
    },
    _vulnTotal() {
      vulnTotal({}).then(res => {
        //
        // this.option.series[0].data[0].value
        if (res.result === 0) {
          res.vulns.forEach(item => {
            if (item.vuln_level === "4") {
              this.most = item.vuln_total;
              // this.$refs.chartOne.refresh();
            } else if (item.vuln_level === "3") {
              this.high = item.vuln_total;
              // this.optionTwo.series[0].data[0].value = item.vuln_total;
              // this.$refs.chartTwo.refresh();
            } else if (item.vuln_level === "2") {
              this.middle = item.vuln_total;
              // this.optionThree.series[0].data[0].value = item.vuln_total;
              // this.$refs.chartThree.refresh();
            } else if (item.vuln_level === "1") {
              this.low = item.vuln_total;
            } else if (item.vuln_level === "0") {
              this.litter = item.vuln_total;
            }
          });
        }
      });
    },
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _leaksInfo(params) {
      this.loading = true;
      const res = await leaksInfo(params);
      if (res.result === 0) {
        this.loading = false;
        
        this.leaksList = res.rows;
        this.leaksList.forEach(item => {
          item.vuln_IP = item.vuln_IP.substr(2,(item.vuln_IP.length-4))
        })
        this.total = res.total;
      }
    },
    async _vulnLevel(params) {
      this.loading = true;
      const res = await vulnLevel(params);
      // if (res.result === 0) {
      //   this.loading = false;
      //   this.leaksList = res.rows;
      //   this.total = res.total;
      // }
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj, {
        userName: getUserName()
      });

      this._leaksInfo(params);
    }
  }
};
</script>

<style>
.assetPic{
  height: 124px;
}
.box_report {
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 20px; 
  width: 100%; 
  padding:10px;
}
.aside {
  width: 30%;
  float: left;
}
.rightaside{
  width: 65%;
  float: left;
}
.rightaside section{
  width: 58%;
  margin-right:10px;
  float: left;
  padding:20px;
}
.rightaside section ul li{
  list-style: none;
  display: inline-block;
  width:32%;
  padding:10px;
}
.rightaside section ul li p{
 text-align: center;
}
.repaid ul li{
   list-style: none;
   text-align: center;
}
.repaid_num{
  width: 60px;
  height: 60px;
  line-height: 60px;
  color:white;
  background: pink;
  border-radius: 50%;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;

}
.box_report p{
  color: white;  
}
/* top10排行榜样式 header*/
.holeList span {
  display: inline-block;
  height: 19px;
}
/* top10排行榜样式 end*/
.vuln_num {
  width: 100%;
  height: 50px;
  line-height: 68px;
  text-align: center;
}
.vuln_text {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 13px;
}
.list {
  width: 100%;
  color: #e4e5e5;
}
.timeAxis {
  width: 100%;
}
.timeAxis h2 {
  height: auto;
  float: right;
}
.leaks {
  display: flex;
  flex-direction: row;
  color: seashell;
  justify-content: space-around;
}
.leaks section {
  flex: 1;
  margin: 20px 50px;
  border: 1px solid #e4e5e5;
  border-radius: 4px;
  height: 100px;
  font-size: 16px;
  text-align: center;
}
.leaks span {
  display: block;
  width: 36%;
  text-align: center;
  height: 100%;
  float: left;
}
.leaksTwo {
  display: flex;
  flex-direction: row;
}
.leaksTwo section {
  flex: 1;
  margin: 40px 50px;
}
.leaksThree {
  width: 97%;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 20px; 
  padding: 15px;
}
.Num {
  width: 64%;
  float: right;
  font-size: 26px;
  font-weight: 700;
}
.better {
  background: brown;
}
.brown {
  color: brown;
}
.high {
  background-color: #e60012;
}
.red {
  color: red;
}
.middle {
  background: #faa732;
}
.low {
  background: #95dcf2;
}

.yell {
  color: #faa732;
}
.blu {
  color: #95dcf2;
}
.prompt {
  background: #27c24c;
}
.green {
  color: #27c24c;
}
.list .vuln {
  width: 14px;
  height: 5px;
  display: inline-block;
  margin: 0 2px;
}
</style>
