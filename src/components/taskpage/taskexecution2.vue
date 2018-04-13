<template>
  <div>
      <div class="header"></div>
      <div class="content">
            <div class="content-left">
                <section>

                </section>
                <section></section>
                <section></section>
                
            </div>
            <div class="content-center">
                <ul>
                    <li class="brain"><router-link to="/taskexecution2/holecloud">文字云</router-link></li>
                    <li class="brain">列表</li>
                    <li class="brain">资产拓补图</li>
                    <li class="brain"><router-link to="/taskexecution2/process">任务执行</router-link></li>        
                </ul>
            </div>
            <div class="content-right">
                 <router-view></router-view>                
            </div>
      </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import cloud from "components/d3/wordCloud";
import zhexiantu from "./zhexiantu";
export default {
  name: "taskexecution",
  components: {
    chart,
    cloud,
    zhexiantu
  },
  data() {
    return {
      //资产列表
      loading: false,
      columns1: [
        {
          title: "漏洞名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "风险等级",
          key: "riskRating",
          align: "center"
        },
        {
          title: "发现时间",
          key: "time",
          align: "center"
        },
        {
          title: "利用情况",
          key: "utilization",
          align: "center"
        }
      ],
      assetsList: [],
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}%", fontSize: 18 },
            data: [{ value: 50, name: "完成率" }],
            title: { color: "#fff", fontSize: 12 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#41C23C"], [0.8, "#FFCE44"], [1, "#DD4C40"]]
              }
            }
          }
        ]
      },
      holes:[
        {
         holeName:"XSS",holeNum:"12"
        },
        {
         holeName:"WEB",holeNum:"10"
        },
        {
          holeName:"CSRF",holeNum:"9"
        },{
          holeName:"CSRF",holeNum:"8"
        },
        {
          holeName:"CSRF",holeNum:"7"
        },
        {
          holeName:"CSRF",holeNum:"6"
        },
        {
          holeName:"CSRF",holeNum:"5"
        },
        {
          holeName:"CSRF",holeNum:"4"
        },
        {
          holeName:"CSRF",holeNum:"3"
        },
        {
          holeName:"CSRF",holeNum:"2"
        },
        {
          holeName:"CSRF",holeNum:"1"
        }
      ],
      optionHole: {
        title: {
          text: "漏洞等级",
          x: "center",
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["一级", "二级", "三级"],
          textStyle: {
            color: "white"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "一级", itemStyle: { color: "#DD4F43" } },
              { value: 310, name: "二级", itemStyle: { color: "#FFCE43" } },
              { value: 234, name: "三级", itemStyle: { color: "#41C23C" } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    }
  },
  computed: {
    optipns() {
      setInterval(() => {
        this.option.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.option;
    }
  }
};
</script>
<style scoped>
.header {
  height: 35px;
  width: 100%;
  background: rgba(65, 67, 79);
  margin-bottom: 66px;
}
.content {
  display: flex;
}
.content ul li {
  list-style-type: none;
}
.content ul li a{
    color:white;
}
.content ul li a:hover{
    color:#3C9DC7;
}
.content div {
  flex-grow: 1;
  padding: 10px;
}
.content-center {
  width: auto;
}
.content-center ul {
  display: block;
  height: 500px;
  width: 150px;
}
.content-center li.brain {
  margin-top: 10px;
  font-size: 16px;
  line-height: 50px;
}
.content-center ul li {
  height: 15%;
  padding: 14px 18px 14px 24px;
  border-left: 2px solid #2e596a;
  /* border-left:2px solid red; */
}
.content-right {
  width: 77%;
  background:rgba(46,89,106,0.3);
  margin: 10px 30px 0 0px;
}
.content-right ul li {
  float: left;
}
.ivu-table .demo-table-info-row td {
  background-color: rgba(18, 62, 101);
  color: #fff;
}
/* top10排行榜 */
.holeList{
  width: 100%;
  height: 100%;
}
.holeList ul{
  width: 100%;
  height: auto;
  border: 1px solid #3C9DC7;
}
.holeList ul li{
list-style-type: none;
height: 23px;
font-size: 12px;
line-height: 23px;
border-bottom: 1px solid #3C9DC7;
}
.holeList ul li:nth-child(12){  
border:none;
}
.listOne{
display: inline-block;
width: 100%;
}
.holeList ul li span{ 
width: 30%;
text-align: center;
}
.holeList ul li span img{
width:20px;
height:20px;
display: inline-block;
vertical-align: middle;
}
.holeHeader{
  font-size: 14px;
  font-weight: bold;
}
</style>
