<template>
  <div>
   <section class="section1">
     <div class="taskSchedule">
       <h2>任务已执行:</h2>
       <chart width="400px" height="400px" :option="optipns"></chart>
       <div></div>
     </div>
     <div class="taskExtPicture"></div>
     <div class="holeclassify"></div>
   </section>
   <section class="section2">
           <div class="wordClouds"></div>
           <div class="holeProportion">
              <chart width="400px" height="400px" :option="optionHole" id="holeproportion"></chart>
           </div>
           <div class="timeAxis"></div>
   </section>
   <section class="section3">
          <div class="holeList"></div>
          <div class="assetList"></div>
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
  height: 600px;
  display: flex;
}
.section2 div {
  flex: 1;
}
.holeProportion {
  height: 600px;
}
</style>
