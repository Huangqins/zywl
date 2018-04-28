<template>
<div>
  <div class="whole">
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="taskAdd">添加</Button>
              </div>
              <div class="assetRight_content">
                  <page :columns="tasks" :data="tasksList" :dataTotal="dataTotal" @dataLoad="dataLoad" :loading="pageLoading" @rowClick="rowClick"></page>
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

const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  // name: "assetSet",
  components: {
    page,
    Modals
  },
  data() {
    return {
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
        { label: "资产url", type: "select", prop: "target_url",option: []},
        { label: "资产ip", type: "select", prop: "target_ip", option: []}
      ],
      data: {
        target_name: "",
        target_teststra: "common",
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
        ]
      },
      value: "",
      tasks: [
        {
          title: "任务名称",
          key: "target_name",
          align: "center"
        },
        {
          title: "扫描进度",
          key: "target_scaning",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              `${Number(params.row.target_scaning).toFixed(2)}%`
            );
          }
        },
        {
          title: "任务状态",
          key: "target_struts",
          align: "center"
        },
        {
          title: "开始时间",
          key: "target_starttime",
          align: "center",
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
          align: "center"
        },
        {
          title: "创建人",
          key: "target_tast_oper",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon:"trash-a"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                }
              ),
              h(
                "a",
                {
                  attrs: {
                    type: 'application/pdf'
                  },
                  on: {
                    click: ev => {
                      if (params.row.export_url === "") {
                        exportPDF(params.row).then(res => {
                          if (res.result === 0) {
                            ev.target.download = params.row.target_name;
                            ev.target.href = location.origin + "/ZY" + res.path;
                            ev.target.innerText = "下载";
                          }
                        });
                      } else {
                        ev.target.download = params.row.target_name;
                        ev.target.href =
                          location.origin + "/ZY" + params.row.export_url;
                      }
                    }
                  }
                },
                params.row.export_url === "" ? "生成" : "下载"
              )
            ]);
          }
        }
      ],
      tasksList: [],
      defaultPage: {
        area: 0,
        rows: 10,
        page: 1
      },
      dataTotal: 0,
      params: {}
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
    _taskList(params) {
      this.pageLoading = true;
      taskList(params).then(res => {
        if (res.result === 0) {
          this.pageLoading = false;
          this.tasksList = res.targets;
          this.dataTotal = res.total;
        }
      });
    },
    taskAdd() {
      this.$refs.formValidate.open();
    },
    taskDelete() {},
    //提交
    asyncOK(data) {
      this.data.userName = getUserName();
      this.data.target_starttime = fomatterTime(this.data.target_starttime);
      this.loading = true;
      assetsSet(data).then(res => {
        if (res.result === 0) {
          this.loading = false;
          this.$refs.formValidate.close();
          this.$router.push({ path: "/taskexecution" });
          this._taskList(this.params);
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
    rowClick(data) {
      console.log(data)
      this.$router.push({ path: '/taskexecution/process', query: { target_id:data.row.target_id}})
    },
  /**
   * 资产添加列表url/ip下拉数据
   *
   */
    _getAssetURL() {
      const params = { username: getUserName() }
    getAssetURL(params).then(res => {
      this.format[4].option = res.lists.map(item => {
        return { value: item.assets_url, name: item.assets_url };
      })
      this.format[5].option = res.lists.map(item => {
        return { value: item.assets_ip, name: item.assets_ip };
      })
    })
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
  background: rgba(25, 38, 48,0.1);
}
</style>
