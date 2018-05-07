<template>
  <chart id="percent" width="235px" height="235px" :option="option"></chart>
</template>
<script>
import chart from "components/chart/chart";
let percent = 0;
export default {
  components: {
    chart
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      option: {
        title: {
          text: "80%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: "16"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "60%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 10, name: "1" },
              { value: 10, name: "1" },
              { value: 10, name: "1" },
              { value: 10, name: "1" },
              { value: 10, name: "1" },
              { value: 10, name: "1" },
              { value: 0, name: "1" },
              { value: 0, name: "1" },
              { value: 0, name: "1" },
              { value: 30, name: "2", itemStyle: {
                color: '#ccc'
              }}
            ]
          }
        ]
      }
    };
  }
};
</script>
