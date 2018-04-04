<template>
  <div id="container"></div>
</template>
<script>
export default {
  name: "zhexiantu",
  data() {
    return {
      chart: "",
      data: [],
      option: {
        title: {
          text: "动态数据 + 时间坐标轴"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: this.data
          }
        ]
      }
    };
  },
  mounted() {
   
    for (var i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }
    setInterval(() => {
      for (var i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

    //   this.chart.setOption({
    //     series: [
    //       {
    //         data: this.data
    //       }
    //     ]
    //   });
    this.option.series[0].data = this.data
    this.init();
    }, 2000);
     
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById("container"));
      this.chart.setOption(this.option);
    },
    randomData() {
      var now = new Date();
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }
  }
};
</script>
 
<style>

</style>
