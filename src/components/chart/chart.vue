<template>
<div>
    <div :id="id" :style="{width: width, height: height,margin: '0 auto'}"></div>
</div>
</template>
<script>
  import { debounce } from "@/utils";

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
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '400px'
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.chart.setOption(val);
      }
    }
  },
  mounted() {
    this.init();
    this.resize();
    let sideBar = document.getElementsByClassName('ivu-layout-sider')[0];
    sideBar.addEventListener('transitionend', () => {
      this.chart.resize();
    })
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    },
    refresh() {
       this.chart.setOption(this.option);
    },
    resize() {
      window.addEventListener('resize', () => {
        this.chart.resize();
      })
    }
  }
};
</script>

