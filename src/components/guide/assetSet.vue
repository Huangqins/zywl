<template>
<div>

  <div class="entry">
       <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
       <FormItem label="任务名称">
            <Input v-model="formItem.taskName" placeholder="请输入"/>
       </FormItem>
          <FormItem label="扫描策略">
             <RadioGroup v-model="formItem.strategy">
              <Radio label="立即执行"></Radio>
              <Radio label="常规执行"></Radio>
             </RadioGroup>
          </FormItem>
          <FormItem label="开始时间" prop="startTime">
            <Row>
                <DatePicker type="datetime" placeholder="开始时间" style="width:420px;" :value="formItem.startTime"></DatePicker>
            </Row>
          </FormItem>
          <FormItem label="周期" prop="cycle">
            <Select v-model="formItem.cycle">
                <Option value="1">立即执行</Option>
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
export default {
  components:{
    
  },
  name: "assetSet",
  data() {
    return {
      formItem: {
        taskName: "",
        strategy: "常规执行",
        startTime: "",
        cycle: "1",
        assets: "",
        disabledGroup:"常规执行",
        AssetsUrl:"",
        assetsIp:""
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
    this._assetsInfo();
    // 
  },
  methods: {
    cancel() {
      //    跳到任务管理页面
      this.$router.push({ path: "/taskhomepage" });
    },
    //点击提交跳到首页
    goToIndex(assets) {
      this.$refs[assets].validate(valid => {
        if (valid) {
          this.$router.push({ path: "/taskexecution" });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    async _assetsInfo() {
      const res = await assetsInfo({ area: 1 });
      console.log(res);
    }
  }
};
</script>
<style scoped>

</style>