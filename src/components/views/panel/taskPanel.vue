<template>
  <div>
      <chart width="600px" height="600px" :option="option"></chart>
  </div>
</template>
<script>
import chart from "components/chart/chart";

export default {
  name: "taskPanel",
  components: {
    chart
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      }
    };
  }
};
</script>
<style>

</style>


