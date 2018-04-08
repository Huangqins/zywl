<template>
  <div>
   <section class="section1">
     <div class="taskSchedule">
       <h2>任务已执行:</h2>
       <chart width="266px" height="266px" :option="optipns"></chart>
       
     </div>
     <div class="taskExtPicture"></div>
     <div class="holeclassify">
      <h2>漏洞Top10榜单</h2>
      <span><Icon type="chevron-right"></Icon>目前已有XXX个漏洞进行排行</span>
      <div class="holeList">
       <ul>
         <li class="listOne">
           <span class="holeHeader">漏洞排行</span>
           <span class="holeHeader">漏洞名称</span>
           <span class="holeHeader">漏洞数量</span>
         </li>
         <li v-for="(item,index) in holes" :key="index">
           <span v-if="index===0"><img src="../../../static/top1.png" ></span>
           <span v-else-if="index===1"><img src="../../../static/top2.png" ></span>
           <span v-else-if="index===2"><img src="../../../static/top3.png"/></span>
           <span v-else-if="index>=3">{{index}}</span>
           <span>{{item.holeName}}</span>
           <span style="">{{item.holeNum}}</span>
           </li>
         
       </ul>
      </div>
     </div>
   </section>
   <section class="section2">
           <div class="wordClouds">
             <h2>漏洞文字云:</h2>
             <cloud></cloud>
           </div>
           <div class="holeProportion">
              <chart width="450px" height="400px"  :option="optionHole" id="holeproportion"></chart>
           </div>
           <div class="timeAxis">
             <h2 >时间轴折线图</h2>
            <zhexiantu></zhexiantu>
           </div>
   </section>
   <section class="section3">  
        <div style="width:45%" class="list">
          <h2>漏洞列表</h2>
            <Table border  :columns="columns1" :data="data1"  :loading="loading" @on-row-click="godetail" :row-class-name="rowClassName"></Table>
        </div>
       <div  style="width:45%" class="list">
          <h2>资产列表</h2>
          <Table border :columns="columns1" :data="data1"  :loading="loading" :row-class-name="rowClassName"></Table>
      </div>    
   </section>
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
      loading: false,
      columns1: [
        {
          title: "漏洞名称",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "风险等级",
          key: "riskRating"
        },
        {
          title: "发现时间",
          key: "time"
        },
        {
          title: "利用情况",
          key: "utilization"
        }
      ],
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
      data1: [
        {
          name: "John Brown",
          type: 18,
          riskRating: "3",
          time: "2016-10-03",
          utilization: "80%"
        },
        {
          name: "Jim Green",
          type: 24,
          riskRating: "3",
          time: "2016-10-01",
          utilization: "80%"
        },
        {
          name: "Joe Black",
          type: 30,
          riskRating: "4",
          time: "2016-10-02",
          utilization: "89%"
        },
        {
          name: "Joe Black",
          type: 30,
          riskRating: "4",
          time: "2016-10-02",
          utilization: "89%"
        }
      ],
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }],
            title: { color: "#fff" },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#41C23C"], [0.8, "#FFCE44"], [1, "#DD4C40"]]
              }
            }
          }
        ]
      },
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
          data: ["高", "中", "低"],
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
              { value: 335, name: "高", itemStyle: { color: "#DD4F43" } },
              { value: 310, name: "中", itemStyle: { color: "#FFCE43" } },
              { value: 234, name: "低", itemStyle: { color: "#41C23C" } }
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
      },

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
 <style >
.section1 {
  display: flex;
}
.taskSchedule {
  width: 400px;
}
.taskExtPicture {
  flex: 1;
}
.holeclassify {
  width: 400px;
  margin-right: 3px;
}
.section2 {
  width: 100%;
  display: flex;
}
.section2 div {
  flex: 1;
}
.section3 {
  display: flex;
}
.section3 .list {
  flex: 1;
  margin: 5px;
  padding: 5px;
}
.ivu-table .demo-table-info-row td {
  background-color: rgba(18, 62, 101);
  color: #fff;
}
.ivu-table-header th {
  background-color: rgba(18, 62, 101);
  color: #fff;
}
.ivu-table-border td,
.ivu-table-border th {
  border-right: 1px solid rgb(81, 179, 218);
}
.ivu-table-wrapper {
  border: 1px solid rgb(81, 179, 218);
  border-bottom: 0;
}
.ivu-table td,
.ivu-table th {
  border-bottom: 1px solid rgb(81, 179, 218);
}
.ivu-table::before {
  background-color: transparent;
}
.ivu-table::after {
  background-color: transparent;
}
.ivu-table-body {
  overflow: hidden;
}
canvas {
  color: #fff !important;
}
.holeclassify span{
  display: inline-block;
  height: 19px;
}
.ivu-icon{
  margin-right: 4px;
}
.holeList{
  width: 100%;
  height: 100%;
}
.holeList ul{
  width: 100%;
  height: auto;
  border: 1px solid #0F5B95;
}
.holeList ul li{
list-style-type: none;
height: 23px;
font-size: 12px;
line-height: 23px;
}
.listOne{
display: inline-block;
width: 100%;
border-bottom: 2px solid #0F5B95;
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
.timeAxis h2{
  /* width: 400px; */
  height: auto;
  float: right;
}
</style>
