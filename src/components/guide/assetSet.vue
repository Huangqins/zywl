<template>
<div>
  <div class="whole">
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px;"/>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="taskAdd">添加</Button>
              </div>
              <div class="assetRight_content">
                  <page :columns="tasks" :data="tasksList" :dataTotal="dataTotal" @dataLoad="dataLoad" :loading="pageLoading" ></page>
              </div>
          </section>
          <!-- <a :href="href" download ref="download"></a> -->
      </div>
      <Modals :format="format" :data="data" title="添加任务" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading" :ruleValidate="rules"></Modals>
  </div>
</template>
<script>
import assetsInfo from "api/assetsInfo";
import assetsSet from "api/assetsSet";
import { getUserName } from "@/utils/auth";
import page from "components/page/page";
import getRule from "api/getRule";
import fomatterTime from "@/utils/tool";
import Modals from "components/Modal/modal";
import taskList from "api/taskList";
import exportPDF from "api/exportPDF";
import getAssetURL from "api/getAssetURL";
import deleteTask from "api/deleteTask";
const strategy = { flag: 1 };
const cycle = { flag: 2 };
//添加任务验证
const taskStatus = {
  "0": "进行中",
  "1": "已完成",
  "-2": "失败"
};

export default {
  components: {
    page,
    Modals
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
      fileName: "",
      href: "",
      pageLoading: false,
      loading: false,
      display: false,
      format: [
        { label: "任务名称", type: "input", prop: "target_name" },
        {
          label: "扫描策略",
          type: "select",
          prop: "target_teststra",
          option: []
        },
        { label: "开始时间", type: "datetime", prop: "target_starttime" },
        {
          label: "周期",
          type: "select",
          prop: "target_cycle",
          option: []
        },
        { label: "资产url", type: "select", prop: "target_url", option: [] },
        { label: "资产ip", type: "select", prop: "target_ip", option: [] }
      ],
      data: {
        target_name: "",
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
          render: (h, params) => {
            return h("span", taskStatus[params.row.target_struts]);
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
                  icon: "pause"
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
                  type: "primary",
                  size: "small",
                  icon: "play"
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
                      ? location.origin + "/ZY" + params.row.export_url
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
                    this.taskDelete(params.row);
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
      dataTotal: 0,
      params: {},
      urlIpMap: {}
    };
  },
  created() {
    this._getAssetURL();
    const params = this.$route.params;
    this.data.target_url = params.target_url;
    this.data.target_ip = params.target_ip;
    this._getRule(strategy);
    this._getRule(cycle);
    this.params = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    this._taskList(this.params);
  },
  methods: {
    _taskList(params, next) {
      this.pageLoading = true;
      taskList(params).then(res => {
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
    taskAdd() {
      this.$refs.formValidate.open();
    },

    taskDelete(params) {
      deleteTask(params).then(res => {
        if (res.result === 0) {
          this.$Message.success(`删除成功`);
          this._taskList(this.params);
        } else {
          this.$Message.error(`删除失败`);
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
          this._taskList(this.params,true);
        } else if (res.result === 2) {
          this.$Message.error({
            content: "资产填写有误或资产不存在"
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
          this.format[3].option = res.rules.map(item => {
            return { value: item.rule_key, name: item.rule_name };
          });
        }
      }
    },
    //请勿删掉
    // goToIndex(assets) {
    //   this.$refs[assets].validate(valid => {
    //     if (valid) {
    //       this.formItem.target_starttime = fomatterTime(
    //         this.formItem.target_starttime
    //       );
    //       this.formItem.userName = getUserName();
    //       assetsSet(this.formItem).then(res => {
    //         if (res.result === 0) {
    //           this.$router.push({ path: "/taskexecution" });
    //         } else if (res.result === -1) {
    //           this.$Message.error({
    //             content: "添加任务失败"
    //           });
    //         }
    //       });
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // }
    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._taskList(this.params);
    },
    /*
    * 任务列表根据任务Id点击跳转到任务执行
    * */
    // rowClick(data) {
    //   console.log(data)
    //   this.$router.push({ path: '/taskexecution/process', query: { target_id:data.row.target_id}})
    // },
    /**
     * 资产添加列表url/ip下拉数据
     *
     */
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
