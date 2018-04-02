<template>
  <div>
   <section class="section1">
     <div class="taskSchedule">
       <h2>任务已执行:</h2>
       <chart width="266px" height="266px" :option="optipns"></chart>
       <div></div>
     </div>
     <div class="taskExtPicture"></div>
     <div class="holeclassify"></div>
   </section>
   <section class="section2">
           <div class="wordClouds"></div>
           <div class="holeProportion">
              <chart width="350px" height="350px"  :option="optionHole" id="holeproportion"></chart>
           </div>
           <div class="timeAxis"></div>
   </section>
   <section class="section3">     
    <Row>
        <Col span="12">
             <div class="holeright">
              <h2>漏洞列表</h2>
              <Table border :columns="columns1" :data="data1"  :loading="loading" @on-row-click="godetail" :row-class-name="rowClassName"></Table>
            </div>
        </Col>
        <Col span="11" offset="1">
          <h2>资产列表</h2>
          <Table border :columns="columns1" :data="data1"  :loading="loading" :row-class-name="rowClassName"></Table>
        </Col>
    </Row>
            
          
   </section>

  </div>
</template>
<script>
import chart from "components/chart/chart";
export default {
  name: "taskexecution",
  components: {
    chart
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
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      },
      optionHole: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" }
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
.section3 div {
  flex: 1;
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
  /* border-right: 0;
   border-left: 0; */
  border-bottom: 0;
  /* border-right: 0; */
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
</style>
