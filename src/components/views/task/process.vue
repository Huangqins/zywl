<template>
  <div>
    <div class="taskSchedule">
        <chart width="235px" height="235px" :option="option" id="completionRate" ref="completionRate"></chart>   
        <chart width="235px" height="235px" :option="optipnTwo" id="taskholeNum" ref="taskholeNum"></chart>  
        <chart width="235px" height="235px" :option="optipnThree" id="holeUtilization" ref='holeUtilization'></chart>      
    </div>
    <div class="clear"></div>
    <div class="line">
       <chart width="350px" height="230px" :option="linechart"  ref=""></chart>   
    </div>
    <div class="holetable">
       <page :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
    </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import page from "components/page/page";
import taskTargetInfo from "api/taskTargetInfo";
import { mapGetters } from "vuex";
import timeLine from "api/timeLine";
import lineChart from "api/lineChart";
import leaksInfo from "api/leaksInfo";
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let hours = now.getHours();
let minute = now.getMinutes();
let sec = now.getSeconds();
let times =
  year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + sec;
const levelSchema = {
  '4': '紧急风险',
  '3': '高风险',
  '2': '中风险',
  '1': '低风险',
  '0': '无风险'
}
export default {
  components: {
    chart,
    page
    // zhexiantu
  },
  data() {
    return {      
      width:"800px",
      loading: false,
      assetsList:[],
      total: 0,      
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      assetsColums: [
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
      id: "",
      taskInfo: [],
      timer: "",
      //折线图
      mock: "",
      linechartdata: [],
      linechart: {
        title: {
          text: "任务漏洞折线图",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "axis",
          // formatter: function(params) {
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return (
          //     date.getDate() +
          //     "/" +
          //     (date.getMonth() + 1) +
          //     "/" +
          //     date.getFullYear() +
          //     " : " +
          //     params.value[1]
          //   );
          // },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#E4E5E5"
            }
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "white"
            }
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            linechartdata: []
          }
        ]
      },
      //任务完成率
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}%", fontSize: 20 },
            data: [{ value: 0, name: "完成率" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      optipnTwo: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 20 },
            data: [{ value: 0, name: "任务漏洞量" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
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
            detail: { formatter: "{value}%", fontSize: 20 },
            data: [{ value: 30, name: "漏洞利用率" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    optipnThree() {
      setInterval(() => {
        this.optionthree.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optionthree;
    },
    ...mapGetters(["userName"])
  },
  mounted() {
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }
    var now = +new Date();
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 80; i++) {
      this.linechartdata.push(randomData());
    }
    // this.mock =  setInterval(() => {
    //   for (var i = 0; i < 5; i++) {
    //     this.linechartdata.shift();
    //     this.linechartdata.push(randomData());
    //   }
    //   this.linechart.series[0].linechartdata = this.linechartdata;

    //     this.$refs.linechart.refresh();

    // }, 1000);
  },
  created() {
    const params = { userName: this.userName, targetStruts: 0 };
    this._taskTargetInfo(params);
   
  },
  methods: {
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj);
      this._taskvulnList(params);     
    },
    
    //折线图
    _lineChart(params) {
      lineChart(params).then(res => {
        //  console.log(res)
      });
    },
    //任务完成情况
    async _taskTargetInfo(params) {
      let res = await taskTargetInfo(params);
      if (res.targets.length > 0) {
        this.taskInfo = res.targets;
        this.id = res.targets[0].target_id;
        const param = Object.assign({}, this.defaultPage,{targetId: this.id})
        this._taskvulnList(param);
        this.getLesks({ targetId: this.id })
        this._lineChart({ taskID: this.id, currentTime: this.times });
        this.option.series[0].data[0].value = Number(
          this.taskInfo[0].target_scaning
        ).toFixed(2);
        this.$refs.completionRate.refresh();
        this.$refs.taskholeNum.refresh();
        this.timer = setInterval(async () => {
          res = await taskTargetInfo(params);
          this.taskInfo = res.targets;
          // this.getLesks({ targetId: this.id })
          // this._lineChart({ taskID: this.id, currentTime: this.times });
          this.option.series[0].data[0].value = Number(
            this.taskInfo[0].target_scaning
          ).toFixed(2);
          this.$refs.completionRate.refresh();
          this.$refs.taskholeNum.refresh();
        }, 5000);
      }
    },
    _timeLine(params) {
      timeLine(params).then(res => {
        this.optipnTwo.series[0].data[0].value = res.vulnNum;
      });
    },
    getLesks(params) {
      leaksInfo(params).then(res => {
        this.optipnTwo.series[0].data[0].value = res.total
      });
    },
    //当前任务下的漏洞列表
    _taskvulnList(params){
      leaksInfo(params).then(res =>{
        //  console.log(res)
        this.assetsList=res.rows
        this.total = res.total;
      })
    },
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
.taskSchedule {
  color: #e4e5e5;
}
.taskSchedule div {
  float: left;
}
.line {
  width: 100%;
}
.clear {
  clear: both;
}
.holetable{
  width: 100%;
}
</style>
