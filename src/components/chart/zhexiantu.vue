<template>
   <div>
     <chart :option="option" ref="chart" height="350px" width="400px" id="wjj"></chart>
   </div>
</template>

<script>
import chart from "components/chart/chart";
export default {
  name: "zhexiantu",
  components: {
    chart
  },
  data() {
    return {
      data: [],
      option: {
        title: {
          text: "动态数据 + 时间坐标轴",
          textStyle:{
            color:"#E4E5E5"
          }
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
          },
          axisLine: {
            lineStyle: {
                color: '#E4E5E5'
          }
        }

        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
                color: 'white'
          }
        }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    function randomData() {
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
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 80; i++) {
      this.data.push(randomData());
    };    
    setInterval(() => {
      for (var i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(randomData());
      }
      this.option.series[0].data = this.data;
      this.$refs.chart.refresh();
    }, 1000);
  },
  methods: {}
};
</script>

