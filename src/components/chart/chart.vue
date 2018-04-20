<template>
<div>
    <div :id="id" :style="style"></div>
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
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
      };
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

