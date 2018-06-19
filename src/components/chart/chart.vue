<template>

<div>
    <div :id="id" :style="{width: width, height: height,margin: margin}"></div>
</div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    className: {
      type: String,
      default: "chart"
    },
    margin: {
      type: String,
      default: '0 auto'
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions(this.option);
    },
    setOptions(chartData) {
      this.chart.setOption(chartData);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

