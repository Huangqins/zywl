<template>
  <div>
      <div class="whole">  
              <Card class="card" >
                  <h2 slot="title" style="color:white;">请对资产进行任务添加</h2>
                  <Row>
                            <Form ref="handAdd" :model="formItem" :rules="rules" :label-width="40">
                               <FormItem prop="tassets_name" label="名称">
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
const strategy = { flag: 1 };
const cycle = { flag: 2 };
export default {
  name: "firstassetAdd",
  data() {
    return {
      formItem: {
        target_name: "",
        target_teststra: "common",
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
            message: "请选择资产",
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
    console.log(this.$route);
    this.formItem.target_url = params.target_url;
    this.formItem.target_ip = params.target_ip;
  },
  methods: {
    assetSubmit() {},
    asyncOK(formItem) {
      this.formItem.userName = getUserName();
      this.formItem.target_starttime = fomatterTime(this.formItem.target_starttime);
      this.loading = true;
      assetsSet(this.formItem).then(res => {
        if (res.result === 0) {
          this.loading = false;
          this.$router.push({path:"/taskexecution"})
        }
      });
    },
    async _getRule(params) {
      const res = await getRule(params);
      if (res.result === 0) {
        console.log(res);
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
