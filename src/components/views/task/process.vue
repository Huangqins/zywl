<template>
  <div>
    <div class="taskSchedule">
        <chart width="235px" height="235px" :option="option" id="completionRate" ref="completionRate"></chart>   
        <chart width="235px" height="235px" :option="optipnTwo" id="taskholeNum" ref="taskholeNum"></chart>  
        <chart width="235px" height="235px" :option="optipnThree" id="holeUtilization" ref='holeUtilization'></chart>      
    </div>
    <zhexiantu></zhexiantu>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import taskTargetInfo from "api/taskTargetInfo";
import { mapGetters } from "vuex";
import timeLine from "api/timeLine";
import { fomatterTime } from '@/utils/tool';
export default {
  components: {
    chart,
    zhexiantu
  },
  data() {
    return {
      id:"",
      taskInfo: [],
      timer: '',
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
            data: [{ value: 0, name: "完成率" }],
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
      optipnTwo: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 18 },
            data: [{ value: 0, name: "任务漏洞量" }],
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
      }
    };
  },
  computed: {
    
    // optipnTwo() {
    //   setInterval(() => {
    //     this.optiontwo.series[0].data[0].value =
    //       (Math.random() * 100).toFixed(2) - 0;
    //   }, 2000);
    //   return this.optiontwo;
    // },
    optipnThree() {
      setInterval(() => {
        this.optionthree.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.optionthree;
    },
    ...mapGetters(["userName"])
  },
  created() {
    const params = { userName: this.userName, targetStruts: 0 };
    this._taskTargetInfo(params);
    
  },
  methods: {
    async _taskTargetInfo(params) {
      let res = await taskTargetInfo(params);
      if (res.targets.length > 0) {
         this.taskInfo = res.targets;
      this.id = res.targets[0].target_id
      // this._timeLine({taskID: this.id,currentTime: fomatterTime(new Date())});
       this._timeLine({taskID: this.id});
      this.option.series[0].data[0].value = Number(this.taskInfo[0].target_scaning).toFixed(2);
      this.$refs.completionRate.refresh()
      this.$refs.taskholeNum.refresh()
      this.timer = setInterval(async () => {
        res = await taskTargetInfo(params);
        this.taskInfo = res.targets; 
        this._timeLine({taskID: this.id});
        this.option.series[0].data[0].value = Number(this.taskInfo[0].target_scaning).toFixed(2);
        this.$refs.completionRate.refresh()
        this.$refs.taskholeNum.refresh()
      }, 5000);
      }
    },
     _timeLine(params){
     timeLine(params).then(res => {
       this.optipnTwo.series[0].data[0].value = res.vulnNum
     })
    }
  },
  destroyed() {
    clearInterval(this.timer)
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
</style>
