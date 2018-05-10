<template>
  <div>
          <div class="leaks">
            <section>
              <span class="better"></span>
              <div class="Num brown">
                <div class="vuln_num"> 
                </div>
               <div class="vuln_text">                  
                  <p>紧急风险</p>
                </div>
                </div>
            </section>
            <section>
              <span class="high"></span>
              <div class="Num red">
                <div class="vuln_num"> 
                </div>
               <div class="vuln_text">                  
                  <p>高风险</p>
                </div>
                </div>
            </section>
            <section>
              <span class="middle"></span>
              <div class="Num yell">
               <div  class="vuln_num">
                </div>
                <div class="vuln_text">                  
                  <p>中风险</p>
                </div>
                </div>
            </section>
            <section>
              <span class="low"></span>
              <div class="Num blu">
                <div  class="vuln_num">
                </div>
                <div class="vuln_text">                  
                  <p>低风险</p>
                </div>
              </div>
            </section>
            <section>
              <span class="prompt"></span>
              <div class="Num green">
                <div class="vuln_num"> 
                </div>
               <div class="vuln_text">                  
                  <p>提示风险</p>
                </div>
                </div>
            </section>
                 
          </div>
       <div class="leaksTwo">
          <section>
            <cloud :height=200></cloud>
          </section>
          <section>
             <chart width="505px" height="300px" :option="vulntypes" id="vulntype" ref="vulntype"></chart>
          </section>
          <section></section>
       </div>
       <div class="leaksThree">
          <section class="list">
              <page :columns="leaksColums" :data="leaksList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" ></page>
          </section>
          <section>
            <page :columns="leaksColums" :data="leaksList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" ></page>
          </section>

       </div>
        
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import page from "components/page/page";
import leaksInfo from "api/leaksInfo";
import vulnTotal from "api/vulnTotal";
import { getUserName } from "@/utils/auth";
import vulnLevel from "api/vulnLevel";
import cloud from "../../taskpage/cloud";
import vulntype from "api/vulntype";

// const levelSchema = {
//   "4": { style: "#FF33CC", class: "vuln", ex: "#FF3399" },
//   "3": { style: "#e60012", class: "vuln", ex: "#FF6666" },
//   "2": { style: "#b2976a", class: "vuln", ex: "#666699" },
//   "1": { style: "#aaa", class: "vuln", ex: "#6699CC" },
//   "0": { style: "#bbb", class: "vuln", ex: "#66FFCC" }
// };
const levelSchema = {
  "4": "紧急风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "无风险"
};
export default {
  name: "leaks",
  components: {
    chart,
    zhexiantu,
    page,
    cloud
  },

  computed: {
    // options() {
    //   setInterval(() => {
    //     this.option.series[0].data[0].value =
    //       (Math.random() * 100).toFixed(2) - 0;
    //   }, 2000);
    //   return this.option;
    // },
    // optionTwo() {
    //   setInterval(() => {
    //     this.optiontwo.series[0].data[0].value =
    //       (Math.random() * 100).toFixed(2) - 0;
    //   }, 2000);
    //   return this.optiontwo;
    // },
    // optionThree() {
    //   setInterval(() => {
    //     this.optionthree.series[0].data[0].value =
    //       (Math.random() * 100).toFixed(2) - 0;
    //   }, 2000);
    //   return this.optionthree;
    // }
  },
  data() {
    return {
      taskID: "",
      high: "",
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 18 },
            data: [{ value: 0, name: "高风险" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false, distance: 0 },
            pointer: { length: "30%", show: true, width: 4 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      vulntypes: {
        title: {
          text: "风险类型",
          left: "center",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: [],
          textStyle:{
            color:"#fbfbfb"
          }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["32%", "50%"],
            selectedMode: "single",
            data: [],
            label: {
              formatter: function(params) {
                // console.log(params);
                return params.value;
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      optionthree: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 18 },
            data: [{ value: 0, name: "低风险" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false, distance: 0 },
            pointer: { length: "30%", show: true, width: 4 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      loading: false,
      leaksColums: [
        {
          title: "风险名称",
          key: "vuln_name",
          align: "center"
        },
        {
          title: "风险类型",
          key: "vuln_type",
          align: "center"
        },
        {
          title: "风险等级",
          key: "vuln_level",
          align: "center",
          render: (h, params) => {
            return h("span", `${levelSchema[params.row.vuln_level]}`);
          }
        },
        {
          title: "payload",
          key: "vuln_Payload",
          align: "center"
        }
      ],
      leaksList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      loading: false
    };
  },
  created() {
    // this.taskID = this.$route.params.taskID;
    const params = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    this._leaksInfo(params);
    this._vulnTotal();
    
    // this._vulnLevel({taskID:})
  },
  mounted() {
    this.vulntype();  
  },
  methods: {
    //风险类型饼状图
    vulntype() {
      let params = { flag: 1 };
      this.$refs.vulntype.showLoading();
      vulntype(params).then(res => {
        if (res.result === 0) {
          this.$refs.vulntype.hideLoading();
          let list = res.list;
          list.forEach(item => {
            // this.vulntypes.legend.data = item.vuln_type_name;
            this.vulntypes.series[0].data.push({
              value: item.kb_vuln_vnum,
              name: item.vuln_type_name
            });
            this.vulntypes.legend.data.push(item.vuln_type_name);
          });
        } else {
        }
      });
    },
    _vulnTotal() {
      vulnTotal({ target_id: "" }).then(res => {
        //
        // this.option.series[0].data[0].value
        if (res.result === 0) {
          res.vulns.forEach(item => {
            if (item.vuln_level === "1") {
              this.high = item.vuln_total;
              // this.$refs.chartOne.refresh();
            } else if (item.vuln_level === "2") {
              // this.optionTwo.series[0].data[0].value = item.vuln_total;
              // this.$refs.chartTwo.refresh();
            } else if (item.vuln_level === "3") {
              // this.optionThree.series[0].data[0].value = item.vuln_total;
              // this.$refs.chartThree.refresh();
            } else {
              //  提示风险
            }
          });
        }
        console.log(res);
      });
    },
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _leaksInfo(params) {
      this.loading = true;
      const res = await leaksInfo(params);
      if (res.result === 0) {
        this.loading = false;
        this.leaksList = res.rows;
        this.total = res.total;
      }
    },
    async _vulnLevel(params) {
      this.loading = true;
      const res = await vulnLevel(params);
      // if (res.result === 0) {
      //   this.loading = false;
      //   this.leaksList = res.rows;
      //   this.total = res.total;
      // }
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj, {
        userName: getUserName()
      });

      this._leaksInfo(params);
    }
  }
};
</script>

<style>
.vuln_num {
  width: 100%;
  height: 50px;
  line-height: 68px;
  text-align: center;
}
.vuln_text {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 13px;
}
.list {
  width: 100%;
  color: #e4e5e5;
}
.timeAxis {
  width: 100%;
}
.timeAxis h2 {
  height: auto;
  float: right;
}
.leaks {
  display: flex;
  flex-direction: row;
  color: seashell;
  justify-content: space-around;
}
.leaks section {
  flex: 1;
  margin: 20px 50px;
  border: 1px solid #e4e5e5;
  border-radius: 4px;
  height: 100px;
  font-size: 16px;
  text-align: center;
}
.leaks span {
  display: block;
  width: 36%;
  text-align: center;
  height: 100%;
  float: left;
}
.leaksTwo {
  display: flex;
  flex-direction: row;
}
.leaksTwo section {
  flex: 1;
  margin: 40px 50px;
}
.leaksThree {
  width: 100%;
}
.leaksThree section {
  width: 45%;
  margin: 40px 20px;
  float: left;
}
.Num {
  width: 64%;
  float: right;
  font-size: 26px;
  font-weight: 700;
}
.better {
  background: brown;
}
.brown {
  color: brown;
}
.high {
  background-color: #e60012;
}
.red {
  color: red;
}
.middle {
  background: #faa732;
}
.low {
  background: #95dcf2;
}

.yell {
  color: #faa732;
}
.blu {
  color: #95dcf2;
}
.prompt {
  background: #27c24c;
}
.green {
  color: #27c24c;
}
.list .vuln {
  width: 14px;
  height: 5px;
  display: inline-block;
  margin: 0 2px;
}
</style>
