<template>
  <div class="table process">
    <div class="target_left" style="width:75%;float:left">
        <div class="taskSchedule" >
              <section style="margin:20px 10px 20px 80px;flex:1.5;">
                <div :class="{ radar: radar, radarCopy: radarCopy }"></div>
                <div class="radar_right">
                  <ul>
                    <li>任务名称: &nbsp; &nbsp;{{name}}</li>
                    <li>完成率: &nbsp; &nbsp;&nbsp; &nbsp;{{percentOption}}</li>
                    <li>开始时间: &nbsp; &nbsp;{{starttime}}</li>
                    <li>结束时间: &nbsp; &nbsp;{{endtime}}</li>
                    <li>历时: &nbsp; &nbsp;{{taskTime}}</li>
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
              </section>
            </div>
            <div class="timeProcess">
              <section>
                <chart  height="160px" width="95%" :option="linechart"  ref="linechart"></chart>
              </section>
            </div>
    </div>
    <div class="target_right" style="width:25%;float:left">
            <section class="newdata">
                <ul id="con1">                       
                    <li v-for="(item,index) in targetlogData" :key="index">                       
                      <div style="color:white;">{{item.operation_source}}</div>
                    </li>
                </ul>
            </section>
    </div>
<div style="clear:both"></div>
    <div class="secTwo">
       <Row>
        <Col span="6" >
           <Card class="ym" style="height:182px;overflow:auto;">
              <!-- <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                主机信息
              </p> -->
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index">
                      {{ item.target_info_name }}
                      <span v-if="item.target_info_des === 'up'">
                       <Icon type="checkmark-circled" ></Icon>
                      </span>
                      <span v-else-if="item.target_info_des === 'down'" >
                        <Icon type="close-circled" ></Icon>
                      </span>
                      <span v-else>
                        {{ item.target_info_des }} 
                      </span>
                  </li>
              <!-- </ul> -->
              <!-- <ul class="scrollUl"> -->
                  <li v-for="(item,index) in domain_info" :key="index" style="height:168px">                     
                      <span v-html="item.target_info_des" style="width:100%">                        
                      </span>
                  </li>
              <!-- </ul> -->
              <!-- <ul class="newList" style="max-height: 151px; overflow: auto;"> -->
                  <li v-for="(item,index) in hostListItem" :key="index" >
                      {{ item.target_info_name }}
                      <span style="color:#19A15F;margin-right:2px;">
                           {{ item.target_info_des }}
                      </span>
                  </li>
              <!-- </ul> -->
              <!-- <ul class="scrollUl"> -->
                <li>
                <div style="overflow:hidden">
                  <div style="width:40%;float:left;color:white;">应用服务:</div>
                  <div style="width:60%;float:left;">
                    <page class="vuletables"  :columns="portColums" :data="portList"  :width="Swidth" :height="Sheight"></page>
                  </div>
                  
                </div>
                </li>
              </ul>
          </Card>
        </Col>
        <Col span="6" >
          <Card class="ym">
              <!-- <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  域名信息
              </p> -->
              <!-- <ul class="scrollUl">
                  <li v-for="(item,index) in domain_info" :key="index">                     
                      <span v-html="item.target_info_des" style="width:100%">                        
                      </span>
                  </li>
              </ul> -->
          </Card>
        </Col>        
        <Col span="6" >
             <Card class="ym">
              <!-- <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 端口信息
              </p> -->
             
            </Card>
        </Col>        
        
        <Col span="6" >
             <Card style="height:182px">
              <!-- <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 发现新资源
              </p> -->
              <!-- <ul class="newList" style="max-height: 151px; overflow: auto;">
                  <li v-for="(item,index) in hostListItem" :key="index">
                      {{ item.target_info_name }}
                      <span style="color:#19A15F;margin-right:2px;">
                           {{ item.target_info_des }}
                      </span>
                  </li>
              </ul> -->

            </Card>
        </Col>
      </Row>     
    </div>
    <div class="holetable">
      <Row>  
        <Col span="6" >
           <Card  style="max-height:385px;">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                绵羊墙
              </p>
              <ul class="scrollUl" style="max-height:220px;padding:0px 12px;">
                  <li v-for="(item,index) in target_sensitive_info" :key="index">                     
                      <span style="width:100%">{{item}}</span>
                  </li>
              </ul>
          </Card>
        </Col>      
        
        <Col span="9" >
           <Card style="max-height:335px;">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                 风险信息
              </p>
              <page class="vuletables" :rowClassName="rowClassName" :height="tableHeight" :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
            
            </Card>
        </Col>
        <Col span="9" >
           <Card style="max-height:335px;">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                利用情况
              </p>
               <page :dblclick="dblclick" class="vuletables" style="background:#ce3939;" :height="tableHeight" :columns="userinfo" :data="userinfoList"  :loading="loading" :width="width"></page>
          </Card>
        </Col>
    </Row>
    </div>
      <Modal v-model="modal1"  title="Common Modal dialog box title" >
        <div class="socketMessage"></div>
        <div slot="footer">
           <div style="text-align:left">CMD <Input v-model="value1" size="small"  style="width:200px"></Input></div>   
        </div>
    </Modal>
  </div>
</template>
<script>
import Modals from "components/Modal/modal";
import chart from "components/chart/chart";
import page from "components/page/page";
// import taskTargetInfo from "api/taskTargetInfo";
import { mapGetters } from "vuex";
import timeLine from "api/timeLine";
import leaksInfo from "api/leaksInfo";
import targetProgress from "api/targetProgress";
import getTargetLog from "api/TargetLog";
import vulnUseInfo from "api/VulnUseInfo";
import urlUseRate from "api/urlUseRate";
import fomatterTime from "@/utils/tool";
import getAssetsHost from "api/getAssetsHost";
import getServiceList from "api/serviceList";
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
export function formatTime(timestamp) {
  let sec = 1000, // 秒
    min = sec * 60, // 分
    hour = min * 60, // 时
    day = hour * 24, // 天
    days = Math.floor(timestamp / day),
    hours = Math.floor((timestamp - days * day) / hour),
    mins = Math.floor((timestamp - (days * day + hours * hour)) / min),
    secs = Math.floor(
      (timestamp - (days * day + hours * hour + mins * min)) / sec
    );
  return `${days}天${hours}小时${mins}分钟${secs}秒`;
}
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080" : "";
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
    percentChart,
    Modals
    // zhexiantu
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(to);
      console.log("路由已切换");
      this.getDataAll();
      clearInterval(this.timer);
    }
  },
  data() {
    return {
      value1: "",
      Swidth:"100",
      Sheight:'200',
      footer: false,
      modal1: false,
      radar: true,
      display: false,
      starttime: "",
      name: "",
      percentOption: "",
      endtime: "",
      taskTime: "",
      tableHeight: "219",
      percent: 0, //伪进度最大为9
      scaning: 0, //任务阶段
      targetlogData: [],
      portColums: [ 
        {
          title: "端口",
          key: "port",
          width:70
        } ,      
        {
          title: "服务名称",
          key: "service_name",
          width:110
        },
        
      ],
      portList:[],
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
        // {
        //   target_info_key: "target_name",
        //   target_info_name: "任务名称",
        //   target_info_des: 0
        // },
        {
          target_info_key: "target_url",
          target_info_name: "任务目标",
          target_info_des: 0
        },
        {
          target_info_key: "target_ip",
          target_info_name: "IP地址",
          target_info_des: 0
        },
        {
          target_info_key: "discern_info",
          target_info_name: "识别技术",
          target_info_des: 0
        },
        {
          target_info_key: "response_info",
          target_info_name: "可响应",
          target_info_des: 0
        }
        // {
        //   target_info_key: "application_service",
        //   target_info_name: "应用服务",
        //   target_info_des: 0
        // }
      ],
      //域名信息
      domain_info: [
        {
          target_info_key: "target_domain_info",
          target_info_name: "域名信息",
          target_info_des: ""
        }
      ],
      //端口信息
      target_port_info: [
        {
          target_info_key: "port",
          target_info_name: "端口",
          target_info_des: ""
        },
        {
          target_info_key: "assets_ip",
          target_info_name: "IP",
          target_info_des: ""
        },
        {
          target_info_key: "service_name",
          target_info_name: "服务医生",
          target_info_des: ""
        },
        {
          target_info_key: "create_time",
          target_info_name: "创建时间",
          target_info_des: ""
        },
        {
          target_info_key: "protocol",
          target_info_name: "协议",
          target_info_des: ""
        },
        {
          target_info_key: "port",
          target_info_name: "端口",
          target_info_des: ""
        },
        {
          target_info_key: "info",
          target_info_name: "技术",
          target_info_des: ""
        },
        {
          target_info_key: "state",
          target_info_name: "状态",
          target_info_des: ""
        },
        {
          target_info_key: "update_time",
          target_info_name: "更新时间",
          target_info_des: ""
        }
      ],
      portinfoCopy: [],
      //敏感信息
      target_sensitive_info: [
        // {
        //   target_info_key: "sensitive_info",
        //   target_info_name: "",
        //   target_info_des: ""
        // }
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
      assetsColums: [
        // {
        //   title: "风险名称",
        //   key: "vuln_name",
        //   align: "left"
        // },
        {
          title: "风险类型",
          key: "kb_vuln_class",
          align: "left",
          width: 90
        },
        {
          title: "类型",
          key: "type",
          align: "left",
          width: 90
        },
        {
          title: "参数",
          key: "arg",
          align: "left",
          width: 90
        },
        {
          title: "风险等级",
          key: "vuln_level",
          align: "center",
          width: 85,
          render: (h, params) => {
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
          width: 165,
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
          width: 60,
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
      userinfo: [
        {
          title: "漏洞链接",
          key: "vuln_URL",
          align: "left"
        },
        {
          title: "操作",
          align: "center",
          width: 60,
          render: (h, params) => {
            // console.log(params.row.image_path);
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "search"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "userinfodetail",
                      params: {
                        target_id: params.row.target_id,
                        image_path: (params.row.image_path =
                          params.row.image_path === ""
                            ? ""
                            : host + params.row.image_path),
                        vuln_useInfo: params.row.vuln_useInfo,
                        vuln_URL: params.row.vuln_URL
                      }
                    });
                  }
                }
              })
            ]);
          }
        }
      ],
      userinfoList: [],
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
    // const storage = window.localStorage;
    // let taskInfo = {};
    // if (this.$route.params.targetInfo) {
    //   storage.setItem(
    //     "taskInfo",
    //     JSON.stringify(this.$route.params.targetInfo)
    //   );
    // }
    // taskInfo = JSON.parse(storage.getItem("taskInfo"));
    // taskInfo.target_startTime = fomatterTime(
    //   new Date(taskInfo.target_starttime.time)
    // );
    // this.starttime = fomatterTime(new Date(taskInfo.target_starttime.time));
    // this.name = taskInfo.target_name;
    // taskInfo.target_endTime = taskInfo.target_endtime
    //   ? fomatterTime(new Date(taskInfo.target_endtime.time))
    //   : "";
    // this.endtime = taskInfo.target_endTime;
    // this.taskListItem.forEach(item => {
    //   item.target_info_des = taskInfo[item.target_info_key];
    // });
    this.getDataAll();
  },
  methods: {
    dblclick(row) {
      this.modal1 = true;
      console.log(row);
    },
    getDataAll() {
      this._targetProgress();
      this._targetNum();
      this._targetLesk();
      this._urlUseRate();
      this._getAssetsHost();
      this._vulnUseInfo();
      this._getTargetLog();          
      this._getServiceList()
      this.timer = setInterval(() => {
        // this._targetProgress();
        this._targetNum();
        this._targetLesk();
        this._urlUseRate();
        this._getAssetsHost();
        this._vulnUseInfo();
        
      }, 10000);
      this.timers = setInterval(() => {
        this._getTargetLog();
        this._targetProgress();
      }, 1000);
    },
    rowClassName(row) {
      return "demo-table-error-row";
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj);
    },
    //任务日志列表
    _getTargetLog() {
      let params = 0;
      if (this.$route.params.target_id) {
        params = { target_id: this.$route.params.target_id };
      } else {
        console.log(this.$route);
      }
      getTargetLog(params).then(res => {
        let data = res.targets;
        this.targetlogData = data;
      });
    },
    //风险利用情况
    _vulnUseInfo(params, next) {
      let param = 0;
      if (this.$route.params.target_id) {
        param = { target_id: this.$route.params.target_id };
      } else {
        console.log(this.$route);
      }
      vulnUseInfo(param).then(res => {
        this.userinfoList = res.vulns;
        if (next) {
          this.$router.push({
            name: "userinfodetail",
            params: {
              image_path: res.vulns[0].image_path,
              vuln_useInfo: res.vulns[0].vuln_useInfo,
              vuln_id: res.vulns[0].vuln_id
            }
          });
        }
      });
    },
    /**
     * 任务执行进度
     * params: target_id 来源$route.query.target_id
     */
    _targetProgress() {
      let params = 0;
      if (this.$route.params.target_id) {
        params = { target_id: this.$route.params.target_id };
      } else {
        console.log(this.$route);
      }
      targetProgress(params).then(res => {
        if (res.result === 0) {
          let scaning;
          if (res.target.target_scaning.length > 1) {
            scaning = res.target.target_scaning.split(",");
          } else {
            scaning = [];
          }
          let s = "";
          let target_struts = res.target.target_struts;
          let target_rftime = res.target.target_rftime;
          this.name = res.target.target_name;
          this.taskTime = formatTime(
            (res.target.target_endtime
              ? res.target.target_endtime.time
              : new Date().getTime()) - res.target.target_starttime.time
          );
          this.endtime = res.target.target_endtime = res.target.target_endtime
            ? fomatterTime(new Date(res.target.target_endtime.time))
            : "";

          this.starttime = res.target.target_starttime = res.target
            .target_starttime
            ? fomatterTime(new Date(res.target.target_starttime.time))
            : "";
          if (target_struts === "1") {
            this.percentOption = `100%`;
            this.radar = false;
            clearInterval(this.timers);
            clearInterval(this.timer);
            this.timer = null;
          } else if (target_struts === "-2") {
            this.$Message.error(`目标进度确立失败`);
            this.percentOption = `0%`;
            this.radar = false;
            clearInterval(this.timers);
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
              symbolOffset: [0, "-50%"],
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
          //域名信息
          this.domain_info.forEach(item => {
            item.target_info_des = res.target[item.target_info_key];
          });
          //主机信息
          this.taskListItem.forEach(item => {
            item.target_info_des = res.target[item.target_info_key];
          });
          //敏感信息
          this.target_sensitive_info = res.target.sensitive_info.split("<br/>");
          //端口信息
          // this.target_port_info.forEach(item => {
          //   let temp = "";
          //   item.target_info_des = res.target[item.target_info_key];
          //   temp = item.target_info_des.split("</br>");
          //   item.target_info_des = temp
          //     .map(i => {
          //       if (i.indexOf("open") > 0) {
          //         return `<span style='background: #19A15F;display:inline-block;width:100%;margin-bottom:4px;'>${i}</span>`;
          //       } else if (i.indexOf("filtered") > 0) {
          //         return `<span style='background:#FFCE43;display:inline-block;width:100%;margin-bottom:4px;'>${i}</span>`;
          //       } else if (i.indexOf("close") > 0) {
          //         return `<span style='background:red;display:inline-block;width:100%;margin-bottom:4px;'>${i}</span>`;
          //       }
          //     })
          //     .join("</br>");
          // });
        } else {
          this.option.series[0].data[0].value = 0;
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

    //服务信息
    _getServiceList(){
      let params={
        assets_id:this.$route.params.assets_id
      }
      getServiceList(params).then(res=>{
        let list=res.lists  
        this.portList = list; 
        })
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
          this.assetsList.forEach(item => {
            if (item.vuln_detail.indexOf('</br>') > 0) {
               let li = item.vuln_detail.split("</br>");
              //  console.log(li)
               let type , arg ;
                li.forEach(item => {
                  // console.log(item.indexOf('类型'))
                  if (item.indexOf('类型') > -1) {
                    // console.log(item)
                    type = item
                  } else if(item.indexOf('参数')> -1) {
                    arg = item
                  }
               })
              item.type = type.slice(3);
              item.arg = arg.slice(3);
            }
            // console.log(li[1],li[2])
          });
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
        } else {
          this.vuln_rate = 0 + "%";
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
  beforeRouteEnter(to, from, next) {
    if (to.params.targetInfo) {
      to.meta.title = to.params.targetInfo.target_name;
    } else {
      to.meta.title = to.meta.title;
    }
    // if (!to.params.targetInfo.target_name) {
    //   to.meta.title = to.meta.title;
    // } else {
    //   to.meta.title = to.params.targetInfo.target_name;
    // }

    next();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timers);
  }
};
</script>
<style scoped>
.socketMessage {
  margin-top: 20px;
}
.process .ivu-table-tbody tr {
  background-color: #fcd576;
}

/* top10排行榜样式 header*/
#box {
  overflow: hidden;
  padding-left: 30px;
  border: 1px solid black;
  transition: all 0.5s;
}
.anim {
  transition: all 0.5s;
}
#con1 li {
  list-style: none;
  line-height: 24px;
  height: 24px;
  padding: 5px 8px 5px 8px;
}
.vulnList {
  width: 100%;
  height: 270px;
}
.vulnList ul {
  width: 100%;
  height: auto;
}
.vulnList ul li {
  list-style: none;
  height: 23px;
  font-size: 12px;
  line-height: 23px;
}
.vulnList ul li:nth-child(12) {
  border: none;
}
.vulnList ul li span {
  text-align: center;
  color: #fbfbfb;
}
.vulnList ul li span:nth-child(1) {
  width: 53%;
}
.vulnList ul li span:nth-child(2) {
  width: 35%;
}
.vulnList ul li span:nth-child(3) {
  width: 10%;
}
.newdata {
  height: 254px;
  border: 1px solid #e4e5e5;
  margin-top: 20px;
  border-radius: 3px;
  margin-right: 10px;
  margin-left: 10px;
}
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
.table .holetable .newList {
  max-height: 214px;
  overflow: auto;
  padding: 0px 8px 4px 8px;
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
  margin: 20px 10px 20px 10px;
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
.secTwo {
  color: white;
}

.secTwo  ul li {
  list-style: none;
}
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
  /* width: 95%; */
  margin: 22px 10px;
}
.scrollUl {
  max-height: 145px;
  overflow: auto;
}
.scrollUl ul li {
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

.ivu-table .demo-table-error-row td {
  background-color: red;
  color: #fff;
}
</style>
