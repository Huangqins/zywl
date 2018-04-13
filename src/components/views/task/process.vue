<template>
  <div>
    <div class="taskSchedule">
       <h2>任务已执行</h2>
       <chart width="235px" height="235px" :option="optipns"></chart>       
    </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
export default {
  components: {
    chart
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
            data: [{ value: 50, name: "完成率" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#41C23C"], [0.8, "#FFCE44"], [1, "#DD4C40"]]
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
    }
  }
};
</script>
<style scoped>
.taskSchedule{
  color: #E4E5E5;
}
</style>
