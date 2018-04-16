<template>
<div>

  <div class="entry">
       <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
       <FormItem label="任务名称">
            <Input v-model="formItem.taskName" placeholder="请输入"/>
       </FormItem>
          <FormItem label="扫描策略">
             <RadioGroup v-model="formItem.strategy">
              <Radio label= 0></Radio>
              <Radio label= 1></Radio>
             </RadioGroup>
          </FormItem>
          <FormItem label="开始时间" prop="startTime">
            <Row>
                <DatePicker type="datetime" placeholder="开始时间" style="width:420px;"  @on-change="timeChange"></DatePicker>
            </Row>
          </FormItem>
          <FormItem label="周期" prop="cycle">
            <Select v-model="formItem.cycle">
                <Option value="0">立即执行</Option>
                <Option value="2">每天</Option>
                <Option value="3">每月</Option>
                <Option value="4">每年</Option>               
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
export default {
  name: "assetSet",
  components: {},
  data() {
    return {
      formItem: {
        taskName: "",
        strategy: 0,
        startTime: "",
        cycle: 0,
        disabledGroup: "常规执行",
        assetsUrl: "",
        assetsIp: "",
        userName: ""
      },

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
  },
  methods: {
    timeChange(date) {
      this.formItem.startTime = date
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
              this.$router.push({path: '/taskexecution'})
            } else if (res.result === -1) {
              this.$Message.error({
                content: '添加任务失败'
              })
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