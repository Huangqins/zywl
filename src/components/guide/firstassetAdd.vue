<template>
  <div>
      <div class="whole">
              <Card class="card" >
                  <h2 slot="title" style="color:white;">任务添加</h2>
                  <Row>
                            <Form ref="handAdd" :model="formItem" :rules="rules" :label-width="10">
                               <FormItem prop="target_name">
                                    <Input type="text" v-model="formItem.target_name" placeholder="任务名称"></Input>
                                </FormItem>
                                <FormItem >
                                    <Select v-model="formItem.target_teststra" placeholder="扫描策略">
                                      <Option v-for="item in strategyRule" :value="item.rule_key" :key="item.rule_key">{{ item.rule_name }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem >
                                    <DatePicker type="datetime" placeholder="开始时间" v-model="formItem.target_starttime"></DatePicker>
                                </FormItem>
                                <FormItem prop="target_cycle">
                                    <Select v-model="formItem.target_cycle" placeholder="扫描周期">
                                      <Option v-for="item in cycleRule" :value="item.rule_key" :key="item.rule_key">{{ item.rule_name }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem prop="target_url">
                                    <Input type="text" v-model="formItem.target_url" placeholder="资产URL"></Input>
                                </FormItem>
                                 <FormItem prop="assets_ip">
                                    <Input type="text" v-model="formItem.target_ip" placeholder="资产IP"></Input>
                                </FormItem>
                            </Form>

                    <Row class="primary" type="flex" align='middle' justify="center" >
                        <Col >
                            <i-button type="primary"  @click="cancel" class="button">取消</i-button>
                            <i-button type="primary"  @click="asyncOK">提交</i-button>
                        </Col>
                    </Row>
                  </Row>
              </Card>
  </div>
</div>
</template>
<script>
import getRule from "api/getRule";
import assetsSet from "api/assetsSet";
import fomatterTime from "@/utils/tool";
import { getUserName } from "@/utils/auth";
import taskList from "api/taskList";

const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  name: "firstassetAdd",
  data() {
    return {
      formItem: {
        target_name: "",
        target_teststra: "medium",
        target_starttime: new Date(),
        target_cycle: "now",
        target_url: "",
        target_ip: "",
        userName: ""
      },
      strategyRule: [],
      cycleRule: [],
      rules: {
        target_name: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this._getRule(strategy);
    this._getRule(cycle);
    const params = this.$route.params;
    this.formItem.target_url = params.target_url;
    this.formItem.target_ip = params.target_ip;
  },
  methods: {
    _taskList(params) {
      taskList(params).then(res => {
        if (res.result === 0) {
          this.$router.push({
                  name: "process",
                  params: {
                    targetInfo: res.targets[0],
                    target_id: res.targets[0].target_id
                }
            });
        } else {
          this.$Message.error(`添加错误`)
        }      
      })
    },
    cancel(){
      this.$router.push({path:"/homepage"})//点击取消跳到大首页
    },
    asyncOK(formItem) {
      this.formItem.userName = getUserName();
      this.formItem.target_starttime = fomatterTime(this.formItem.target_starttime);
      this.loading = true;
      assetsSet(this.formItem).then(res => {
        if (res.result === 0) {
          this.loading = false;
          this._taskList({
             area: 0,
             rows: 10,
             page: 1,
             userName: getUserName()
          });
        } else if (res.result === 0) {
          this.$Message.error({
            content: '资产添加有误或资产不存在'
          })
        }
      });
    },
    async _getRule(params) {
      const res = await getRule(params);
      if (res.result === 0) {
        if (params.flag === 1) {
          this.strategyRule = res.rules;
        } else {
          this.cycleRule = res.rules;
        }
      }
    }
  }
};
</script>
<style scoped>
.button{
margin-right: 50px;
}
.whole {
  width: 410px;
  height: auto;
  margin: 100px auto 0px auto;
  font-family: sans-serif;
}
.header {
  height: 40px;
  margin-bottom: 5px;
  line-height: 40px;
  font-size: 26px;
}
.ivu-tabs .ivu-tabs-tabpane {
  margin-bottom: 8px;
}
.ivu-btn-ghost:hover {
  color: white;
}
.card {
  background: rgba(46, 59, 93, 0.1);
  border: 1px solid #3889d9;
  color: white;
}
</style>
