<template>
<div>

  <div class="entry">
       <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
       <FormItem label="任务名称">
            <Input v-model="formItem.taskName" placeholder="请输入"/>
       </FormItem>
          <FormItem label="扫描策略">
             <Select v-model="formItem.strategy">
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
            <Select v-model="formItem.cycle">
                <Option v-for="(item,index) in cycleRule" :key="index" :value="item.rule_key">{{item.rule_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="资产url">
              
            <Input v-model="formItem.assetsUrl" placeholder="请输入"/>
          </FormItem>
          <FormItem label="资产ip">
              
                <Input v-model="formItem.assetsIp" placeholder="请输入"/>
          </FormItem>
          <FormItem>
              <Button type="info" @click="cancel">取消</Button>
              <Button type="success" @click="goToIndex('formItem')" style="float: right">提交</Button>
          </FormItem>
      </Form>
  </div>
  </div>
</template>
<script>
import assetsInfo from "api/assetsInfo";
import assetsSet from "api/assetsSet";
import { getUserName } from "@/utils/auth";
import getRule from "api/getRule";
const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  name: "assetSet",
  components: {},
  data() {
    return {
      formItem: {
        taskName: "",
        strategy: "0",
        startTime: "",
        cycle: "0",
        disabledGroup: "常规执行",
        assetsUrl: "",
        assetsIp: "",
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
      this.formItem.startTime = date;
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