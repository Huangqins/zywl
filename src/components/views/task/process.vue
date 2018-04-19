<template>
  <div>
    <div class="taskSchedule">
        <chart width="235px" height="235px" :option="optipns" id="completionRate"></chart>   
        <chart width="235px" height="235px" :option="optipnTwo" id="taskholeNum"></chart>  
        <chart width="235px" height="235px" :option="optipnThree" id="holeUtilization"></chart>      
    </div>
    <zhexiantu></zhexiantu>
  </div>
</template>
<script>

import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
export default {
  components: {
    chart,
    zhexiantu
  },
  data() {
    return {
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
            data: [{ value: 90, name: "完成率" }],
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
            data: [{ value: 50, name: "任务漏洞量" }],
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
            data: [{ value: 30, name: "漏洞利用率" }],
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
      }
    };
  },
  computed: {
    optipns() {
      setInterval(() => {
        this.option.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.option;
    },
    optipnTwo() {
      setInterval(() => {
        this.optiontwo.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optiontwo;
    },
    optipnThree() {
      setInterval(() => {
        this.optionthree.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optionthree;
    }
  }
};
</script>
<style scoped>
.taskSchedule{
  color: #E4E5E5;
}
.taskSchedule div{
  float: left;
}
</style>
