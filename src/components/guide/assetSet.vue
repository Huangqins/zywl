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
                  <page :columns="tasks" :data="tasksList"></page>
              </div>
          </section>
      </div>
      <Modals :format="format" :data="data" title="添加任务" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
  <!-- <div class="entry">
       <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
       <FormItem label="任务名称">
            <Input v-model="formItem.target_name" placeholder="请输入"/>
       </FormItem>
          <FormItem label="扫描策略">
             <Select v-model="formItem.target_teststra">
                <Option v-for="(item,index) in strategyRule" :key="index" :value="item.rule_key">{{item.rule_name}}</Option>
             </Select>
          </FormItem>  
          <template v-if="formItem.strategy==='depth'">        
          <FormItem label="账号"   >
            <Row>
                <Input v-model="formItem.taskName"  placeholder="请输入您所扫描地址的账号" style="width:420px;"  ></Input>
            </Row>
          </FormItem>
          <FormItem label="密码" >
            <Row>
                <Input v-model="formItem.taskName" type="password" placeholder="请输入您所扫描地址的密码" style="width:420px;"  ></Input>
            </Row>
          </FormItem>
          </template>
          <FormItem label="开始时间" prop="startTime">
            <Row>
                <DatePicker type="datetime" placeholder="开始时间" style="width:420px;"   v-model="formItem.target_starttime" ></DatePicker>
            </Row>
          </FormItem>
          <FormItem label="周期" prop="cycle">
            <Select v-model="formItem.target_cycle">
                <Option v-for="(item,index) in cycleRule" :key="index" :value="item.rule_key">{{item.rule_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="资产url">
              
            <Input v-model="formItem.target_url" placeholder="请输入"/>
          </FormItem>
          <FormItem label="资产ip">
              
                <Input v-model="formItem.target_ip" placeholder="请输入"/>
          </FormItem>
          <FormItem>
              <Button type="info" @click="cancel">取消</Button>
              <Button type="success" @click="goToIndex('formItem')" style="float: right">提交</Button>
          </FormItem>
      </Form>
  </div> -->
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

const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  name: "assetSet",
  components: {
    page,
    Modals
  },
  data() {
    return {
      loading: false,
      display: false,
      format: [
        { label: "任务名称", type: "input", prop: "target_name" },
        {
          label: "扫描策略",
          type: "select",
          prop: "target_teststra",
          option: [],
          key: "rule_key"
        },
        { label: "开始时间", type: "datetime", prop: "target_starttime" },
        {
          label: "周期",
          type: "select",
          prop: "target_cycle",
          option: [],
          key: "rule_key"
        },
        { label: "资产url", type: "input", prop: "target_url" },
        { label: "资产ip", type: "input", prop: "target_ip" }
      ],
      data: {
        target_name: "",
        target_teststra: "common",
        target_starttime: "",
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
            trigger: "change"
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
          title: "任务类型",
          key: "target_type",
          align: "center"
        },
        {
          title: "更新时间",
          key: "target_rftime",
          align: "center"
        },
        {
          title: "扫描进度",
          key: "target_scaning",
          align: "center",
          render: (h, params) => {
            return h('span',`${Number(params.row.target_scaning).toFixed(2)}%`)
          }
        },
        {
          title: "任务状态",
          key: "target_struts",
          align: "center"
        },
        {
          title: "测试人数",
          key: "target_testpop",
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
          title: "执行次数",
          key: "target_executions",
          align: "center"
        },
        {
          title: "任务操作人",
          key: "target_tast_oper",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tasksList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      params: {}
      // formItem: {
      //   target_name: "",
      //   target_teststra: "common",
      //   target_starttime: new Date(),
      //   target_cycle: "now",
      //   target_url: "",
      //   target_ip: "",
      //   userName: "",
      // },
      // strategyRule: [],
      // cycleRule: [],
      // ruleValidate: {
      //   assets: [
      //     {
      //       required: true,
      //       message: "请选择资产",
      //       trigger: "change"
      //     }
      //   ],
      //   cycle: [
      //     {
      //       required: true,
      //       message: "请选择周期",
      //       trigger: "change"
      //     }
      //   ]
      // }
    };
  },
  created() {
    
    //const params = this.$route.params;
    // this.formItem.assetsUrl = params.assetsUrl;
    // this.formItem.assetsIp = params.assetsIp;
    this._getRule(strategy);
    this._getRule(cycle);
    const param = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    console.log(getUserName());
    this._taskList(param);
  },

  methods: {
    //任务列表
    // _taskLists(param){
    //      taskList(param).then(res => {
    //        //this.tasksList=res.targets
    //      })
    // },
    async _taskList(params) {
      this.loading = true;
      const res = await taskList(params);
      if (res.result === 0) {
        this.loading = false;
        this.tasksList = res.targets;
        //this.total = res.total;
      }
    },
    taskAdd() {
      this.$refs.formValidate.open();
      this.data = {};
    },
    //提交
    asyncOK(data) {
      this.data.userName = getUserName()
      this.data.target_starttime = fomatterTime(this.data.target_starttime)
      assetsSet(data).then(res => {
        if (res.result === 0) {
          this.$refs.formValidate.close();
        }
      });
    },
    async _getRule(params) {
      const res = await getRule(params);
      if (res.result === 0) {
        if (params.flag === 1) {
          //  this.strategyRule = res.rules;
          this.format[1].option = res.rules.map(item => {
            return { value: item.rule_key, name: item.rule_name };
          });
          this.data.target_teststra = this.format[1].option[0].value;
        } else {
          this.format[3].option = res.rules.map(item => {
            return { value: item.rule_key, name: item.rule_name };
          });
          this.data.target_cycle = this.format[3].option.value;
        }
      }
    },
    cancel() {
      //    跳到任务管理页面
    },
    //点击提交跳到首页
    goToIndex(assets) {
      this.$refs[assets].validate(valid => {
        if (valid) {
          this.formItem.target_starttime = fomatterTime(
            this.formItem.target_starttime
          );
          this.formItem.userName = getUserName();
          assetsSet(this.formItem).then(res => {
            if (res.result === 0) {
              this.$router.push({ path: "/taskexecution" });
            } else if (res.result === -1) {
              this.$Message.error({
                content: "添加任务失败"
              });
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style scoped>

</style>