<template>
<div>
  <div class="whole">
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="assetsAdd">添加</Button>
              </div>  
              <div class="assetRight_content">
                  <page :columns="tasks" :data="tasksList"></page>
              </div>
          </section>
      </div>
      <Modals :format="format" :data="data" :title="title" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
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
                <DatePicker type="datetime" placeholder="开始时间" style="width:420px;"  @on-change="timeChange"></DatePicker>
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
const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  name: "assetSet",
  components: {
    page
  },
  data() {
    return {
      format: [
        { label: "任务名称", type: "input", prop: "target_name" },
        { label: "发起人", type: "input", prop: "target_user" },
        { label: "任务类型", type: "input", prop: "target_type" }
      ],
      data:{
        target_name:"",
        target_user:"",
        target_type:""
        },
      tasks: [
        {
          title: "任务名称",
          key: "target_name",
          align: "center"
        },
        {
          title: "发起人",
          key: "target_user",
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
          align: "center"
        },
        {
          title: "进行的操作",
          key: "target_scaning_content",
          align: "center"
        },
        {
          title: "操作人",
          key: "target_oper",
          align: "center"
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
          align: "center"
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
          title: "测试策略",
          key: "target_teststra",
          align: "center"
        },
        {
          title: "目标情况",
          key: "target_state",
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
                    click: () => {  }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tasksList:[],
      formItem: {
        target_name: "",
        target_teststra: "common",
        target_starttime: "",
        target_cycle: "now",
        target_url: "",
        target_ip: "",
        userName: "",
      },
      strategyRule: [],
      cycleRule: [],
      ruleValidate: {
        assets: [
          {
            required: true,
            message: "请选择资产",
            trigger: "change"
          }
        ],
        cycle: [
          {
            required: true,
            message: "请选择周期",
            trigger: "change"
          }
        ]
        //   startTime:[{
        //        required: true,type:'string', message: '请选择开始时间', trigger: 'change'
        //   }]
      }
    };
  },
  created() {
    const params = this.$route.params;
    this.formItem.assetsUrl = params.assetsUrl;
    this.formItem.assetsIp = params.assetsIp;
    this._getRule(strategy);
    this._getRule(cycle);
  },

  methods: {
    async _getRule(params) {
      const res = await getRule(params);
      if (res.result === 0) {
        if (params.flag === 1) {
          this.strategyRule = res.rules;
           this.formItem.strategy = this.strategyRule[0].rule_key
        } else {
          this.cycleRule = res.rules;
          this.formItem.cycle = this.cycleRule[0].rule_key
        }
      }
    },
    timeChange(date) {
      this.formItem.target_starttime = date;
    },
    cancel() {
      //    跳到任务管理页面
    },
    //点击提交跳到首页
    goToIndex(assets) {
      this.$refs[assets].validate(valid => {
        if (valid) {
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