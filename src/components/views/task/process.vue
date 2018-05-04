<template>
  <div>
    <div class="taskSchedule">
      <section>
        <chart width="235" height="235" :option="option" id="completionRate" ref="completionRate"></chart>
      </section>
      <section>
        <chart width="235" height="235" :option="optipnTwo" id="taskholeNum" ref="taskholeNum"></chart>
      </section> 
      <section> 
        <chart width="235" height="235" :option="optionthree" id="holeUtilization" ref='holeUtilization'></chart>
      </section>
    </div>
    <div class="clear"></div>
    <div class="secTwo">
      <section>
        <chart width="769" height="300" :option="linechart"  ref="linechart"></chart>
      </section>
       <section>
         <Card style="width:700px;margin-bottom:20px;margin:72px auto;">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  风险信息
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

    </div>
    <div class="holetable">
      <Row>
        <Col span="11">
         
          <Card style="width:630px;margin-left:140px;">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 发现主机
              </p>
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index">
                     {{ item.name }}
                      <span>
                          {{ item.rate }}
                      </span>
                  </li>
              </ul>
            </Card>
        </Col>
        <Col span="10"  offset="2">
          <page :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width" height=120></page>
        </Col>
        
      </Row>
      <Row :gutter="16">
        
        
      </Row>
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

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let hours = now.getHours();
let minute = now.getMinutes();
let sec = now.getSeconds();
let times =
  year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + sec;
const levelSchema = {
  "4": "紧急风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "无风险"
};
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";
export default {
  components: {
    chart,
    page
    // zhexiantu
  },
  data() {
    return {
      taskListItem: [
        {
          target_info_key: "target_name",
          target_info_name: "任务名称",
          target_info_des: 0
        },
        {
          target_info_key: "target_scaning",
          target_info_name: "任务执行进度",
          target_info_des: 2
        },
        {
          target_info_key: "target_startTime",
          target_info_name: "开始时间",
          target_info_des: 4
        },
        {
          target_info_key: "target_endTime",
          target_info_name: "结束时间",
          target_info_des: 4
        }
      ],
      formCustom: {},
      target_name: "",
      id: "",
      href: "",
      width: "500px",
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
      taskInfo: [],
      timer: "",
      //折线图
      mock: "",
      linechartdata: [],
      linechart: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
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
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {}
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
            detail: { formatter: "{value}", fontSize: 20 },
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
    ...mapGetters(["userName"])
  },
  created() {
    console.log(this.$route);
    let taskInfo = this.$route.params.targetInfo;
    taskInfo.target_startTime = fomatterTime(
      new Date(taskInfo.target_starttime.time)
    );
    taskInfo.target_endTime = taskInfo.target_endtime
      ? fomatterTime(new Date(taskInfo.target_endtime.time))
      : "";
    this.taskListItem.forEach(item => {
      item.target_info_des = taskInfo[item.target_info_key];
    });
    this._targetProgress();
    this._targetNum();
    this._targetLesk();
    this._urlUseRate();
    this.timer = setInterval(() => {
      this._targetProgress();
      this._targetNum();
      this._targetLesk();
      this._urlUseRate();
    }, 5000);
  },
  methods: {
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
          let scaning = res.target.target_scaning;
          // console.log(scaning)
          if (scaning == "10") {
            clearInterval(this.timer);
          }
          this.option.series[0].data[0].value = scaning;
          let temp = [];
          for (let i = 1; i <= scaning; i++) {
            temp.push(i);
          }
          //进度纵坐标
          this.linechart.series[0].data = temp;
          this.linechart.xAxis.data = res.target.target_rftime.split(",");
          this.$refs.linechart.refresh();
          this.$refs.completionRate.refresh();
        } else {
          this.option.series[0].data[0].value = 0;
          this.$refs.completionRate.refresh();
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
          this.optipnTwo.series[0].data[0].value = res.vulnNum;
          this.$refs.taskholeNum.refresh();
        } else {
          this.optipnTwo.series[0].data[0].value = 0;
          this.$refs.taskholeNum.refresh();
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
          this.optionthree.series[0].data[0].value = res.rate;
          this.$refs.holeUtilization.refresh();
        } else {
          this.optionthree.series[0].data[0].value = 0;
          this.$refs.holeUtilization.refresh();
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
  color: #FBFBFB;
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
  color: #FBFBFB;
  justify-content: space-around;
}
.taskSchedule section {
  flex: 1;
}
.secTwo {
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
}
.secTwo section{
  flex: 1;
  margin: 20px 60px;
}
.clear {
  clear: both;
}
.holetable {
  width: 100%;
  padding: 0 40px;
}
</style>
