<template>
  <div>
        <div class="timeAxis">
          <div class="taskSchedule">
            <chart width="235px" height="235px" :option="options"></chart>       
            <chart width="235px" height="235px" :option="optionTwo" id="optionTwo"></chart>      
            <chart width="235px" height="235px" :option="optionThree" id="optionThree"></chart>     
          </div>
         
        </div>
        <div class="clear"></div>
        <div class="list">
          <h2>漏洞列表</h2>
            <page :columns="leaksColums" :data="leaksList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" ></page>
        </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import page from "components/page/page";
import leaksInfo from "api/leaksInfo";
import { getUserName } from "@/utils/auth";
import vulnLevel from "api/vulnLevel";

const levelSchema = {
  '4': '紧急风险',
  '3': '高风险',
  '2': '中风险',
  '1': '低风险',
  '0': '无风险'
}
export default {
  name: 'leaks',
  components: {
    chart,
    zhexiantu,
    page
  },
  
  computed: {
    options() {
      setInterval(() => {
        this.option.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.option;
    },
    optionTwo() {
      setInterval(() => {
        this.optiontwo.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optiontwo;
    },
    optionThree() {
      setInterval(() => {
        this.optionthree.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optionthree;
    },
  },
  data() {
    return {
      taskID:'',
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
            data: [{ value: 90, name: "一级漏洞" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine:{ show:false},
            axisTick:{show:false},
            axisLabel:{show:false,distance:0},
            pointer:{length:"30%",show:true,width:4},
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      optiontwo: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}%", fontSize: 18 },
            data: [{ value: 60, name: "二级漏洞" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine:{ show:false},
            axisTick:{show:false},
            axisLabel:{show:false,distance:0},
            pointer:{length:"30%",show:true,width:4},
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
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
            detail: { formatter: "{value}%", fontSize: 18 },
            data: [{ value: 20, name: "三级漏洞" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine:{ show:false},
            axisTick:{show:false},
            axisLabel:{show:false,distance:0},
            pointer:{length:"30%",show:true,width:4},
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
          title: "漏洞名称",
          key: "vuln_name",
          align: "center"
        },
        {
          title: "漏洞类型",
          key: "vuln_type",
          align: "center"
        },
        {
          title: "漏洞等级",
          key: "vuln_level",
          align: "center",
          render: (h, params) => {
            return h('span',
              `${levelSchema[params.row.vuln_level]}`
            )
          }
        },
        {
          title: "payload",
          key: "vuln_Payload",
          align: "center"
        },
        {
          title: "操作人",
          key: "vuln_oper",
          align: "center"
        }
      ],
      leaksList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      loading: false
    };
  },
  created() {
    this.taskID = this.$route.params.taskID
    const params = Object.assign({}, this.defaultPage,{userName: getUserName(),taskID: this.taskID})
    this._leaksInfo(params);
 
    // this._vulnLevel({taskID:})
  },
  methods: {
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
      const params = Object.assign({}, this.defaultPage, paramsObj, {userName: getUserName()});
      
      this._leaksInfo(params);
    }
  }
};
</script>

<style scoped>
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
.taskSchedule div{
  float: left;
}
.clear{
  clear: both;
}
</style>
