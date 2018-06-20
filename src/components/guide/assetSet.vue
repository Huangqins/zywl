<template>
<div>
        <div class="targetOne">
            <ul>
              <li>
                <div class="bg targetSum">{{target_task_num}}</div>
                <p>任务总量</p>
              </li>
              <li>
                <div class="bg executed">{{task_over}}</div>
                <p>已执行数</p>
              </li>
              <li>
                <div class="bg waiting">{{flag}}</div>
                <p>待执行数</p>
              </li>
              <li>
                <chart width="300px" height="160px" :option="options"></chart>
                
              </li>
            </ul>
        </div>
        <div class="whole logs asset">
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px;"/>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="taskAdd">添加</Button>
              </div>
              <div class="assetRight_contentt">
                <Card>
                  <p slot="title" style="font-size:16px;">任务状态</p>
                  <page :columns="tasks" :data="tasksList" :dataTotal="dataTotal" @dataLoad="dataLoad" :loading="pageLoading" ></page>
                </Card>
              </div>
               <!-- <div class="assetRight_content">
                <Card>
                  <p slot="title" style="font-size:16px;">周期任务</p>
                  <page :columns="loadingtasks" :data="loadingtasksList" :dataTotal="dataTotals" @dataLoad="dataLoads" :loading="pagesLoading" ></page>
                  </Card>
                </div> -->
          </section>
        </div>
      <Modals :format="format" :data="data" title="添加任务" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading" :ruleValidate="rules"></Modals>
      <Modal v-model="modalDeleter" width="360"  :mask-closable="false" >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p style="font-size:17px;">是否确认删除？</p>
          
        </div>
        <div slot="footer">
            <Button    :loading="modal_loading" @click="cancel">取消</Button>
            <Button type="error"  :loading="modal_loading" @click="taskDelete({ target_id })">删除</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import assetsInfo from "api/assetsInfo";
import assetsSet from "api/assetsSet";
import { getUserName } from "@/utils/auth";
import chart from "components/chart/chart";
import page from "components/page/page";
import getRule from "api/getRule";
import fomatterTime from "@/utils/tool";
import Modals from "components/Modal/modal";
import taskList from "api/taskList";
import exportPDF from "api/exportPDF";
import getAssetURL from "api/getAssetURL";
import deleteTask from "api/deleteTask";
import testType from "api/testType";
import targetTotal from "api/targetTotal";

const strategy = { flag: 1 };
const cycle = { flag: 2 };
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080" : "";
//添加任务验证
const taskStatus = {
  "0": "进行中",
  "1": "已完成",
  "-2": "失败"
};
const taskcycle = {
  now: "立即",
  day: "每天",
  month: "每月",
  year: "每年"
};
const cl = {
  medium: "常规策略",
  high: "深度策略"
};
export default {
  components: {
    page,
    Modals,
    chart
  },
  watch: {
    "data.target_url"(val) {
      this.data.target_ip = this.urlIpMap[val];
    }
  },
  data() {
    const addUrlValidate = (rule, value, callback) => {
      if (!value && !this.data.target_ip) {
        callback(new Error("url或者ip请至少填写一项"));
      } else {
        callback();
      }
    };

    const addIpValidate = (rule, value, callback) => {
      if (!value && !this.data.target_url) {
        callback(new Error("url或者ip请至少填写一项"));
      } else {
        callback();
      }
    };
    return {
      flag:'',
      task_over:"",
      target_task_num:'',
      modalDeleter: false,
      modal_loading: false,
      fileName: "",
      href: "",
      pageLoading: false,
      pagesLoading: false,
      loading: false,
      display: false,
      height: "355px",
      format: [
        { label: "任务名称", type: "input", prop: "target_name" },
        {
          label: "策略",
          type: "select",
          prop: "target_teststra",
          option: []
        },
        {
          label: "周期",
          type: "select",
          prop: "target_cycle",
          option: []
        },
        {
          label: "测试类型",
          type: "select",
          prop: "area_name",
          option: []
        },
        { label: "开始时间", type: "datetime", prop: "target_starttime" },
        { label: "资产url", type: "select", prop: "target_url", option: [] },
        { label: "资产ip", type: "select", prop: "target_ip", option: [] }
      ],
  options : {
    title : {
        text: '测试类型',
        textStyle: {
            color: "white",
            fontSize:"16"
          },
         y:'bottom',
         x:"center"
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'right',
        y : 'bottom',
        orient: 'vertical',
        data:['rose1','rose2','rose3','rose4','rose5'],
        textStyle:{
            color:"#fbfbfb"
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 60],
            center : ['50%', '40%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[  ]
        },
    ]
  },
      data: {
        target_name: "渗透测试+" + fomatterTime(new Date()),
        target_teststra: "medium",
        target_starttime: new Date(),
        target_cycle: "now",
        target_url: "",
        target_ip: "",
        userName: getUserName()
      },
      rules: {
        target_name: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ],
        target_url: [{ validator: addUrlValidate, trigger: "change" }],
        target_ip: [{ validator: addIpValidate, trigger: "change" }]
      },
      value: "",
      loadingtasksList: [],
      loadingtasks: [
        {
          title: "任务名称",
          key: "target_name",
          align: "center",
          width: 250
        },
        {
          title: "任务状态",
          key: "target_struts",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("span", taskStatus[params.row.target_struts]);
          }
        },
        {
          title: "任务目标",
          key: "target_url",
          align: "center"
        },
        {
          title: "周期",
          key: "target_cycle",
          align: "center",
          width: 60,
          render: (h, params) => {
            return h("span", taskcycle[params.row.target_cycle]);
          }
        },
        {
          title: "策略",
          key: "target_teststra",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("span", cl[params.row.target_teststra]);
          }
        },
        {
          title: "开始时间",
          key: "target_starttime",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.target_starttime.time))
            );
          }
        },
        {
          title: "结束时间",
          key: "target_endtime",
          align: "center",
          width: 200,
          render: (h, params) => {
            if (params.row.target_endtime) {
              return h(
                "span",
                fomatterTime(new Date(params.row.target_endtime.time))
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "报告名称",
          key: "pdf_name",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "stop"
                },

                on: {
                  click: () => {
                    this.$router.push({
                      name: "process",
                      params: {
                        targetInfo: params.row,
                        target_id: params.row.target_id
                      }
                    });
                  }
                }
              }),
              h(
                "a",
                {
                  attrs: {
                    type: "application/pdf",
                    href: params.row.export_url
                      ? host + params.row.export_url
                      : null,
                    download: params.row.pdf_name ? params.row.pdf_name : false
                  },
                  style: {
                    backgroundColor: "#19be6b",
                    display: "inline-block",
                    marginBottom: "0",
                    fontWeight: "400",
                    textAlign: "center",
                    verticalAlign: "middle",
                    touchAction: "manipulation",
                    cursor: "pointer",
                    backgroundImage: "none",
                    border: "1px solid transparent",
                    whiteSpace: "nowrap",
                    lineHeight: "1.5",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: "3px",
                    marginLeft: "5px"
                  },
                  on: {
                    click: ev => {
                      if (params.row.export_url === "") {
                        this.$Modal.confirm({
                          title: "请输入报告名称",
                          render: h => {
                            return h("Input", {
                              props: {
                                value: this.fileName,
                                autofocus: true,
                                placeholder: "请输入文件名"
                              },
                              on: {
                                input: val => {
                                  this.fileName = val;
                                }
                              }
                            });
                          },
                          onOk: () => {
                            exportPDF({
                              target_id: params.row.target_id,
                              target_name: this.fileName
                            }).then(res => {
                              if (res.result === 0) {
                                this._taskList(this.params);
                                ev.target.innerText = "下载";
                              } else {
                                ev.target.innerText = "生成";
                              }
                            });
                          }
                        });
                      }
                    }
                  }
                },
                params.row.export_url === "" ? "生成" : "下载"
              ),
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "search"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "process",
                      params: {
                        targetInfo: params.row,
                        target_id: params.row.target_id
                      }
                    });
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "trash-a"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.target_id = params.row.target_id;
                    this.modalDeleter = true;
                  }
                }
              })
            ]);
          }
        }
      ],
      tasks: [
        {
          title: "任务名称",
          key: "target_name",
          align: "center",
          width: 250
        },
        {
          title: "任务状态",
          key: "target_struts",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("span", taskStatus[params.row.target_struts]);
          }
        },
        {
          title: "任务目标",
          key: "target_url",
          align: "center"
        },
        {
          title: "周期",
          key: "target_cycle",
          align: "center",
          width: 60,
          render: (h, params) => {
            return h("span", taskcycle[params.row.target_cycle]);
          }
        },
        {
          title: "策略",
          key: "target_teststra",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("span", cl[params.row.target_teststra]);
          }
        },
        {
          title: "开始时间",
          key: "target_starttime",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.target_starttime.time))
            );
          }
        },
        {
          title: "结束时间",
          key: "target_endtime",
          align: "center",
          width: 200,
          render: (h, params) => {
            if (params.row.target_endtime) {
              return h(
                "span",
                fomatterTime(new Date(params.row.target_endtime.time))
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "报告名称",
          key: "pdf_name",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "stop"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "process",
                      params: {
                        targetInfo: params.row,
                        target_id: params.row.target_id
                      }
                    });
                  }
                }
              }),
              h(
                "a",
                {
                  attrs: {
                    type: "application/pdf",
                    href: params.row.export_url
                      ? host + params.row.export_url
                      : null,
                    download: params.row.pdf_name ? params.row.pdf_name : false
                  },
                  style: {
                    backgroundColor: "#19be6b",
                    display: "inline-block",
                    marginBottom: "0",
                    fontWeight: "400",
                    textAlign: "center",
                    verticalAlign: "middle",
                    touchAction: "manipulation",
                    cursor: "pointer",
                    backgroundImage: "none",
                    border: "1px solid transparent",
                    whiteSpace: "nowrap",
                    lineHeight: "1.5",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: "3px",
                    marginLeft: "5px"
                  },
                  on: {
                    click: ev => {
                      if (params.row.export_url === "") {
                        this.$Modal.confirm({
                          render: h => {
                            return h("div", [
                              h(
                                "Input",
                                {
                                  props: {
                                    value: this.fileName,
                                    autofocus: true,
                                    placeholder: "请输入文件名"
                                  },
                                  style: {
                                    marginBottom: '15px'
                                  },
                                  on: {
                                    input: val => {
                                      this.fileName = val;
                                    }
                                  }
                                },
                                 [
                                  h(
                                    "span",
                                    {
                                      slot: "prepend"
                                    },
                                    "报告名称"
                                  )
                                ],
                                
                              ),
                              h(
                                "Input",
                                {
                                  props: {
                                    value: this.companyName,
                                    autofocus: true,
                                    placeholder: "请输入企业名"
                                  },
                                  on: {
                                    input: val => {
                                      this.companyName = val;
                                    }
                                  }
                                },
                                [
                                  h(
                                    "span",
                                    {
                                      slot: "prepend"
                                    },
                                    "企业名称"
                                  )
                                ]
                              )
                            ]);
                          },
                          onOk: () => {
                            exportPDF({
                              target_id: params.row.target_id,
                              target_name: this.fileName
                            }).then(res => {
                              this.fileName = ''
                              this.companyName = ''
                              if (res.result === 0) {
                                this._taskList(this.params);
                                ev.target.innerText = "下载";
                              }else if (res.result === 2) {
                                this.$Message.info(`无数据`)
                              } else {
                                ev.target.innerText = "生成";
                              }
                            });
                          }
                        });
                      }
                    }
                  }
                },
                params.row.export_url === "" ? "生成" : "下载"
              ),
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "search"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "process",
                      params: {
                        targetInfo: params.row,
                        target_id: params.row.target_id
                      }
                    });
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "trash-a",
                  disabled: params.row.target_struts === '1' ? true : false
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.target_id = params.row.target_id;
                    this.modalDeleter = true;
                  }
                }
              })
            ]);
          }
        }
      ],
      tasksList: [],
      defaultPage: {
        area: 0,
        rows: 10,
        page: 1,
        userName: getUserName()
      },
      defaultPageTask: {
        area: 0,
        rows: 10,
        page: 1,
        userName: getUserName()
      },
      paramsTask: {},
      dataTotal: 0,
      dataTotals: 0,
      params: {},
      urlIpMap: {},
      target_id: ""
    };
  },
  created() {
    this._getAssetURL();
    // const params = this.$route.params;
    // this.data.target_url = params.target_url;
    // this.data.target_ip = params.target_ip;
    this._getRule(strategy);
    this._getRule(cycle);
    this._testType();
    this._targetTotal();
    this.params = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    this.paramsTask = Object.assign({}, this.defaultPageTask, {
      userName: getUserName()
    });
    this._taskList(this.params);
   
    this._taskListLong(this.paramsTask);
  },
  methods: {   
    //测试类型饼状图 
     _testType() {
      testType({}).then(res => {       
      let list = res.targets;
      list.forEach(item => {
            this.options.legend.data.push(
              item.type_name
            )
            this.options.series[0].data.push({
              value: item.target_task_num,
              name: item.type_name
            
            });
          });
      });
    },
    //任务总数和待执行任务数
    _targetTotal() {
      // this.pageLoading = true;
      targetTotal({}).then(res => {
        let list=res.targets
        this.flag =list[0].flag ;
        this.task_over=(list[0].target_task_num)-(list[0].flag);
        this.target_task_num =list[0].target_task_num ;
      // flag,
      // task_over,
      // target_task_num,
       
      });
    },
    _taskList(params, next) {
      let paramsObj = Object.assign({}, params, { flag: 1 });
      this.pageLoading = true;
      taskList(paramsObj).then(res => {
        if (res.result === 0) {
          if (next) {
            this.$router.push({
              name: "process",
              params: {
                targetInfo: res.targets[0],
                target_id: res.targets[0].target_id
              }
            });
          }
          this.pageLoading = false;
          this.tasksList = res.targets;
          this.dataTotal = res.total;
        }
      });
    },
    _taskListLong(params, next) {
      this.pagesLoading = true;
      let paramsObj = Object.assign({}, params, { flag: 2 });
      taskList(paramsObj).then(res => {
        if (res.result === 0) {
          if (next) {
            this.$router.push({
              name: "process",
              params: {
                targetInfo: res.targets[0],
                target_id: res.targets[0].target_id
              }
            });
          }
          this.pagesLoading = false;
          this.loadingtasksList = res.targets;
          this.dataTotals = res.total;
        }
      });
    },
    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._taskList(this.params);
    },
    dataLoads(paramsObj) {
      this.paramsTask = Object.assign({}, this.defaultPageTask, paramsObj);
      this._taskListLong(this.paramsTask);
    },
    taskAdd() {
      this.$refs.formValidate.open();
    },
    cancel() {
      this.modalDeleter = false;
    },
    taskDelete(params) {
      deleteTask(params).then(res => {
        if (res.result === 0) {
          this.$Message.success(`删除成功`);
          this.modalDeleter = false;
          this._taskList(this.params);
          this._taskListLong(this.params);
        } else {
          this.$Message.error(`删除失败`);
          this.modalDeleter = false;
        }
      });
    },
    //提交
    asyncOK(data) {
      this.data.userName = getUserName();
      this.data.target_starttime = fomatterTime(this.data.target_starttime);
      this.loading = true;
      assetsSet(data).then(res => {
        if (res.result === 0) {
          this.loading = false;
          this.$refs.formValidate.close();
          // this.$router.push({ path: "/taskexecution" });
          this._taskList(this.params, true);
        } else if (res.result === 2) {
          this.$Message.error({
            content: "资产填写有误或资产不存在"
          });
          this.loading = false;
        } else if (res.result === -1) {
           this.$Message.error({
            content: "添加任务失败"
          });
           this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
    async _getRule(params) {
      const res = await getRule(params);
      if (res.result === 0) {
        if (params.flag === 1) {
          this.format[1].option = res.rules.map(item => {
            return { value: item.rule_key, name: item.rule_name };
          });
        } else {
          this.format[2].option = res.rules.map(item => {
            return { value: item.rule_key, name: item.rule_name };
          });
        }
      }
    },

    _getAssetURL() {
      const params = { username: getUserName() };
      getAssetURL(params).then(res => {
        this.urlIpMap = {};
        this.format[4].option = res.lists.map(item => {
          this.urlIpMap[item.assets_url] = item.assets_ip;
          return { value: item.assets_url, name: item.assets_url };
        });
        this.format[5].option = res.lists.map(item => {
          return { value: item.assets_ip, name: item.assets_ip };
        });
      });
    }
  }
};
</script>
<style scoped>
.targetOne{
  overflow: hidden;
  padding:20px;  
}
.targetOne ul li{
  width:20%;
  text-align: center;
  float: left;  
  list-style: none;
  margin: 0 auto;
  color: black;
}
.targetOne ul li p{
  color: white;
}
.bg{
  width: 120px;
  height: 120px;  
  text-align: center;
  border-radius: 50%;
  margin: 0 auto;
  font-size: 24px;
  line-height: 120px;
  margin-bottom: 10px;
}
.targetSum{
  border:2px solid #6AD67A;
  background: #D5FFE2;
}
.executed{
  border:2px solid #FFECC1;
  background: #FAF3CF;
}
.waiting{
  border:2px solid #DFFDC3;
  background: #E7F5DA;
}
.assetRight_content {
  margin-top: 30px;
}
.whole {
  width: 100%;
  color: #e4e5e5;
}
.assetRight {
  float: left;
  width: 100%;
  height: auto;
}
.assetRight_header {
  width: 100%;
  height: auto;
  padding: 25px;
  background: rgba(25, 38, 48, 0.1);
}
</style>
