<template>
  <div>
   <section class="section1">
     <div class="taskSchedule">
       <h2>任务已执行:</h2>
       <chart width="400px" height="400px" :option="option"></chart>
     </div>
     <div class="taskExtPicture"></div>
     <div class="holeclassify"></div>
   </section>
   <section class="section2">
           <div class="wordClouds"></div>
           <div class="holeProportion">

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
            data: [{ value: 9, name: "完成率" }]
          }
        ]
      }
    };
  },
  computed: {
    optipns() {

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
.section2{
  width: 100%;
  height: 600px;
  display: flex;
}
.section2 div{
  flex: 1;
}
.holeProportion{
  height: 600px;
}
</style>
