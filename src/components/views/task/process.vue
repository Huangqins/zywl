<template>
  <div class="table">
    <div class="taskSchedule" >
      <section style="margin:20px 10px 20px 80px;">
        <div :class="{ radar: radar, radarCopy: radarCopy }"></div>
        <div class="radar_right">
          <ul>
            <li>任务名称:{{name}}</li>
            <li>完成率:{{percentOption}}</li>
            <li>开始时间:{{starttime}}</li>
            <li>结束时间:{{endtime}}</li>
          </ul>
        </div>
        <!-- <chart width="235px" height="235px" :option="option" id="completionRate" ref="completionRate"></chart> -->
        <!-- <percent-chart :option="percentOption"></percent-chart> -->
      </section>
      <section class="circle">
        <!-- <chart width="235px" height="235px" :option="optipnTwo" id="taskholeNum" ref="taskholeNum"></chart> -->
        <span class="middle"></span>
        <div class="Num yell">
          <div  class="vuln_num">
            {{vuln_Num}}
          </div>
          <div class="vuln_text">
            <p>任务漏洞量</p>
          </div> 
          </div>
      </section>
      <section class="circle">
        <span class="low"></span>
        <div class="Num blu" >
          <div class="vuln_num">
             {{vuln_rate}}
          </div>
          <div class="vuln_text">漏洞利用率</div>
        </div>
        <!-- <chart width="235px" height="235px" :option="optionthree" id="holeUtilization" ref='holeUtilization'></chart> -->
      </section>
    </div>
    <div class="timeProcess">
      <section>
        <chart  height="160px" width="100%" :option="linechart"  ref="linechart"></chart>
      </section>
    </div>
    <div class="secTwo">
       <Row>
        <Col span="11" >
           <Card class="ym">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                任务信息
              </p>
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index">
                      {{ item.target_info_name }}
                      <span>
                          {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
          </Card>
        </Col>
        <Col span="13" >
          <Card class="ym">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  域名信息
              </p>
              <ul class="scrollUl">
                  <li v-for="(item,index) in domain_info" :key="index">                     
                      <span v-html="item.target_info_des">                        
                      </span>
                  </li>
              </ul>
          </Card>
        </Col>
      </Row>
      <!-- <section>
          <Card >
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                任务信息
              </p>
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index">
                      {{ item.target_info_name }}
                      <span>
                          {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
          </Card>
      </section>
      <section>
          <Card >
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  域名信息
              </p>
              <ul class="scrollUl">
                  <li v-for="(item,index) in domain_info" :key="index">
                     
                      <span v-html="item.target_info_des">
                        
                      </span>
                  </li>
              </ul>
          </Card>
      </section> -->
    </div>
    <div class="holetable">
      <Row>
        <Col span="11" >
             <Card style="min-height:240px">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 发现主机
              </p>
              <ul>
                  <li v-for="(item,index) in hostListItem" :key="index">
                      {{ item.target_info_name }}
                      <span style="color:red;">
                           {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
            </Card>
        </Col>
        <Col span="13" >
           <Card >
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 风险信息
              </p>
                <page class="table" :rowClassName="rowClassName" :height="tableHeight" :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
            
            </Card>
        </Col>
    </Row>
      <!-- <section>
        <Card>
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 发现主机
              </p>
              <ul>
                  <li v-for="(item,index) in hostListItem" :key="index">
                      {{ item.target_info_name }}
                      <span style="color:red;">
                           {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
        </Card>
      </section>
      <section class="task">
          <Card >
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 风险信息
              </p>
                <page class="table" max-height="100px" :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
            
            </Card>
      </section> -->
    </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import page from "components/page/page";
// import taskTargetInfo from "api/taskTargetInfo";
import { mapGetters } from "vuex";
import timeLine from "api/timeLine";
import leaksInfo from "api/leaksInfo";
import targetProgress from "api/targetProgress";
import urlUseRate from "api/urlUseRate";
import fomatterTime from "@/utils/tool";
import getAssetsHost from "api/getAssetsHost";
import percentChart from "./percentChart";
import ld from "./ld.css";

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let hours = now.getHours();
let minute = now.getMinutes();
let sec = now.getSeconds();
let times =
  year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + sec;
// const levelSchema = {
//   "4": "紧急风险",
//   "3": "高风险",
//   "2": "中风险",
//   "1": "低风险",
//   "0": "无风险"
// };
const levelSchema = {
  "4": "assets/4.png",
  "3": "assets/3.png",
  "2": "assets/2.png",
  "1": "assets/1.png",
  "0": "assets/0.png"
};
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";

const task_status = {
  "0": "任务发起",
  "1": "目标确立",
  "2": "信息收集",
  "3": "威胁建模",
  "4": "漏洞分析",
  "5": "渗透攻击",
  "6": "定点攻击",
  "7": "漏洞利用",
  "8": "系统提权",
  "9": "敏感信息获取",
  "10": "报告生成",
  "11": "任务进度"
};
export default {
  components: {
    chart,
    page,
    percentChart
    // zhexiantu
  },
  data() {
    return {
      radar: true,
      starttime: "",
      name: "",
      percentOption: "",
      endtime: "",
      tableHeight:"246",
      percent: 0, //伪进度最大为9
      scaning: 0, //任务阶段
      percentOption: {
        title: {
          text: "0%",
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
            radius: ["80%", "100%"],
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
              { value: 0, name: "1" },
              {
                value: 0,
                name: "2",
                itemStyle: {
                  color: "#ccc"
                }
              }
            ]
          }
        ]
      },
      vuln_Num: "",
      vuln_rate: "",
      taskListItem: [
        {
          target_info_key: "target_name",
          target_info_name: "任务名称",
          target_info_des: 0
        },
        {
          target_info_key: "target_url",
          target_info_name: "任务目标",
          target_info_des: 0
        },
        {
          target_info_key: "target_oa",
          target_info_name: "操作系统",
          target_info_des: 0
        },
        {
          target_info_key: "target_t",
          target_info_name: "识别技术",
          target_info_des: 0
        },
        {
          target_info_key: "target_s",
          target_info_name: "可响应",
          target_info_des: 0
        }
      ],
      domain_info: [
        {
          target_info_key: "target_domain_info",
          target_info_name: "域名信息",
          target_info_des: ""
        }
      ],
      hostListItem: [],
      formCustom: {},
      target_name: "",
      id: "",
      href: "",
      width: "400px",
      loading: false,
      assetsList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      taskInfos: [
        {
          title: "任务名称",
          key: "name"
        },
        {
          title: "任务状态",
          key: "age"
        },
        {
          title: "开始时间",
          key: "date"
        },
        {
          title: "结束时间",
          key: "date"
        }
      ],
      taskInfoes: [
        {
          title: "url",
          key: "name"
        },
        {
          title: "利用时间",
          key: "date"
        }
      ],
      taskInfoesList: [
        {
          name: "John Brown",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          date: "2016-10-03"
        }
      ],
      taskInfosList: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      assetsColums: [
        {
          title: "风险名称",
          key: "vuln_name",
          align: "left",
          
        },
        {
          title: "风险类型",
          key: "kb_vuln_class",
          align: "left",
          width:140
        },
        {
          title: "风险等级",
          key: "vuln_level",
          align: "center",
          width: 100,
          render: (h, params) => {
            console.log(params)
            return h("img", {
              attrs: {
                src: require(`assets/${params.row.vuln_level}.png`),
                width: "48px",
                height: "6px"
              }
            });
          }
        },
        {
          title: "发现时间",
          key: "vuln_ftime",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.vuln_ftime.time))
            );
          }

        },
        {
          title: "操作",
          align: "center",
          width: 50,
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "search"
                },
                on: {
                  click: () => {
                    // console.log(params.row)
                    this.$router.push({
                      name: "vulndetail",
                      params: {
                        targetId: this.$route.params.target_id,
                        vulnId: params.row.vuln_id
                      }
                    });
                  }
                }
              })
            ]);
          }
        }
      ],
      taskInfo: [],
      timer: "",
      //折线图
      mock: "",
      linechartdata: [],
      linechart: {
        grid: {
          left: 10,
          right: 60,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
          },
          formatter: params => {
            return `${task_status[params[0].data.valueIndex]}
                          </br>
                           ${params[0].name}
                          `;
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {
          type: "category",
          nameTextStyle: {
            width: 200
          },
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            },
            interval: 0,
            rotate: 20
          }
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      },
      //任务完成率
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: {
              formatter: function(value) {
                return task_status[value];
              },
              fontSize: 20
            },
            data: [{ value: 0, name: "执行阶段" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      },
      optipnTwo: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}", fontSize: 20 },
            data: [{ value: 0, name: "任务漏洞量" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
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
            detail: { formatter: "{value}%", fontSize: 20 },
            data: [{ value: 0, name: "漏洞利用率" }],
            title: { color: "#E4E5E5", fontSize: 12 },
            splitLine: { show: false },
            axisTick: { show: false },
            pointer: { show: false },
            axisLabel: { show: false, distance: 0 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#66AB31"], [0.8, "#1A9348"], [1, "#21B4D2"]]
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userName"]),
    radarCopy() {
      return !this.radar;
    }
  },
  created() {
    const storage = window.localStorage;
    let taskInfo = {};
    if (this.$route.params.targetInfo) {
      storage.setItem(
        "taskInfo",
        JSON.stringify(this.$route.params.targetInfo)
      );
    }
    taskInfo = JSON.parse(storage.getItem("taskInfo"));
    taskInfo.target_startTime = fomatterTime(
      new Date(taskInfo.target_starttime.time)
    );
    this.name = taskInfo.target_name;

    taskInfo.target_endTime = taskInfo.target_endtime
      ? fomatterTime(new Date(taskInfo.target_endtime.time))
      : "";
    this.endtime = taskInfo.target_endTime;
    this.starttime = fomatterTime(new Date(taskInfo.target_starttime.time));
    this.taskListItem.forEach(item => {
      item.target_info_des = taskInfo[item.target_info_key];
    });
    this._targetProgress();
    this._targetNum();
    this._targetLesk();
    this._urlUseRate();
    this._getAssetsHost();
    this.timer = setInterval(() => {
      this._targetProgress();
      this._targetNum();
      this._targetLesk();
      this._urlUseRate();
      this._getAssetsHost();
    }, 5000);
  },
  methods: {
    rowClassName (row) {
      console.log(row)
       
           return 'demo-table-error-row';
        
     },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj);
    },
    /**
     * 任务执行进度
     * params: target_id 来源$route.query.target_id
     */
    _targetProgress() {
      const params = { target_id: this.$route.params.target_id };
      targetProgress(params).then(res => {
        if (res.result === 0) {
          let scaning;
          if (res.target.target_scaning.length > 1) {
            scaning = res.target.target_scaning.split(",");
          } else {
            scaning = [];
          }
          let target_struts = res.target.target_struts;
          let target_rftime = res.target.target_rftime;
          if (target_struts === "1") {
            this.percentOption = `100%`;
            this.radar = false;
            clearInterval(this.timer);
          } else if (target_struts === "-2") {
            this.$Message.error(`目标进度确立失败`);
            this.percentOption = `0%`;
            this.radar = false;
            clearInterval(this.timer);
          } else {
            this.radar = true;
            this.percentOption = `${scaning.length * 5}%`;
          }
          this.option.series[0].data[0].value = scaning;
          let temp = [];
          let scaningCopy = scaning;
          scaningCopy.unshift("0");
          scaning.forEach((item, index) => {
            temp.push({
              value: task_status["11"],
              valueIndex: item,
              symbolOffset: [0, "-70%"],
              symbolSize: 30,
              symbol: "image://" + require(`./svg/${item}.svg`)
            });
          });
          //进度纵坐标
          this.linechart.series[0].data = temp;
          let ret = [];
          target_rftime.split(",").forEach((item, index) => {
            ret.push(fomatterTime(new Date(Number(item))));
          });
          this.linechart.xAxis.data = ret;
          this.$refs.linechart.refresh();
          // this.$refs.completionRate.refresh();
          this.domain_info.forEach(item => {
            item.target_info_des = res.target[item.target_info_key];
          });
        } else {
          this.option.series[0].data[0].value = 0;
          // this.$refs.completionRate.refresh();
        }
      });
    },
    /*
    * 任务漏洞数量
    * params: taskID 来源$route.query.target_id
    * */
    _targetNum() {
      const params = { target_id: this.$route.params.target_id };
      timeLine(params).then(res => {
        if (res.result === 0) {
          this.vuln_Num = res.vulnNum;
          // this.$refs.taskholeNum.refresh();
        } else {
          this.vuln_Num = 0;
          // this.$refs.taskholeNum.refresh();
        }
      });
    },
    /*
  * 资产风险检测列表
  * params: targetId 来源$route.query.target_id
  * */
    _targetLesk() {
      const params = { targetId: this.$route.params.target_id };
      leaksInfo(params).then(res => {
        if (res.result === 0) {
          this.assetsList = res.rows;
          // this.domain_info.forEach(item => {
          //   item.target_info_des = taskInfo[item.target_info_key];
          // });
        }
      });
    },

    /**
     * 漏洞利用率
     * params:
     */
    _urlUseRate() {
      const params = { target_id: this.$route.params.target_id };
      urlUseRate(params).then(res => {
        if (res.result === 0) {
          this.vuln_rate = res.rate + "%";
          // this.$refs.holeUtilization.refresh();
        } else {
          this.vuln_rate = 0 + "%";
          // this.$refs.holeUtilization.refresh();
        }
      });
    },
    // 发现主机
    _getAssetsHost() {
      const params = { target_id: this.$route.params.target_id };
      getAssetsHost(params).then(res => {
        if (res.result === 0) {
          this.hostListItem = [];
          if (res.rows && res.rows.length > 0) {
            res.rows.forEach(item => {
              this.hostListItem.push({
                target_info_key: "assets_url",
                target_info_name: `${item.assets_url}`,
                target_info_des: "已发现目标"
              });
            });
          }
        }
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
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
.ivu-card-head {
  padding: 6px 16px;
}
.ivu-card-extra {
  top: 7px;
}
.ivu-card-body ul li span {
  float: right;
}
.ivu-card-head p {
  color: #fbfbfb;
}
.ivu-card {
  background: transparent;
}
.ivu-card-body ul li {
  list-style: none;
}
.ivu-input {
  text-align: right;
}
.taskSchedule {
  /* color: #e4e5e5; */
  display: flex;
  flex-direction: row;
  color: #fbfbfb;
  justify-content: space-around;
}
.circle {
  border: 1px solid #e4e5e5;
  border-radius: 3px;
  margin: 20px 100px 20px;
}
.taskSchedule section {
  flex: 1;
  height: 100px;
  font-size: 16px;
}
.taskSchedule section p {
  font-size: 13px;
}
.taskSchedule span {
  display: block;
  width: 36%;
  text-align: center;
  height: 100%;
  float: left;
}
.timeProcess {
  display: flex;
  padding: 0 50px;
}
.timeProcess section {
  width: 100%;
}
/* .secTwo {
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
}
.secTwo section {
  flex: 1;
  margin: 0px 20px;
} */
.clear {
  clear: both;
}
/* .holetable {
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
} */
/* .holetable section {
  margin: 0px 20px;
  flex: 1;
} */
.ivu-card-body li {
  color: #fbfbfb;
}
.ivu-card {
  width: 95%;
  margin: 22px auto;
}
.scrollUl {
  max-height: 169px;
  overflow: auto;
}
.scrollUl ul li{
  margin: 5px 0;
}
.high {
  background: red;
}
.Num {
  width: 64%;
  float: right;
  font-size: 26px;
  font-weight: 700;
  /* padding-top:18px;  */
}
.middle {
  background: #ffd572;
}
.low {
  background: #95dcf2;
}
.red {
  color: red;
}
.yell {
  color: #ffd572;
}
.blu {
  color: #95dcf2;
}
.radar_right {
  float: left;
  padding: 15px 0;
  margin-left: 15px;
}
.radar_right ul li {
  list-style: none;
  font-size: 14px;
  line-height: 30px;
}
.ivu-table .demo-table-error-row td{
        background-color: red;
        color: #fff;
}
</style>
