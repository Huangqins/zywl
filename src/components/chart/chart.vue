<template>
<div>
    <div :id="id" :style="{width: width + 'px', height: height + 'px',margin: '0 auto'}"></div>
</div>
</template>
<script>
export default {
  name: "chart",
  data() {
    return {
      chart: ""
    };
  },
  props: {
    id: {
      type: String,
      default: "canvas"
    },
    height: {
      type: [Number,String],
      default: 300
    },
    width: {
      type: [Number,String],
      default: 400
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    },
    refresh() {
       this.chart.setOption(this.option);
    }
  }
};
</script>

