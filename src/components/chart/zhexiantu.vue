<template>
   <div>
     <div :option="option" ref="chart" :style="style" id="wjj"></div>
   </div>
</template>

<script>
import chart from "components/chart/chart";
export default {
  name: "zhexiantu",
  components: {
    chart
  },
  props:{
    id:{
      type:String,
      default:""
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    }    

  },
  data() {
    return {
      mock:'',
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
  // 离开组件注销定时器，避免出错
  destroyed() {
    clearInterval(this.mock)
  },
  mounted() {
  //   function randomData() {
  //     now = new Date(+now + oneDay);
  //     value = value + Math.random() * 21 - 10;
  //     return {
  //       name: now.toString(),
  //       value: [
  //         [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
  //         Math.round(value)
  //       ]
  //     };
  //   }
  //   var now = +new Date(1997, 9, 3);
  //   var oneDay = 24 * 3600 * 1000;
  //   var value = Math.random() * 1000;
  //   for (var i = 0; i < 80; i++) {
  //     this.data.push(randomData());
  //   };    
  //  this.mock =  setInterval(() => {
  //     for (var i = 0; i < 5; i++) {
  //       this.data.shift();
  //       this.data.push(randomData());
  //     }
  //     this.option.series[0].data = this.data;

  //       this.$refs.chart.refresh();
      
  //   }, 1000);
  },
  computed: {
     style() {
      return {
        height: this.height,
        width: this.width,
      };
    }
  }
};
</script>

