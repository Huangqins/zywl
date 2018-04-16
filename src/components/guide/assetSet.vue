<template>
<div>

  <div class="entry">
       <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
       <FormItem label="任务名称">
           <Select v-model="formItem.taskName" filterable>
                <Option v-for="item in formItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
       </FormItem>
          <FormItem label="扫描策略">
            <Input v-model="formItem.strategy" placeholder="请输入"/>
          </FormItem>
          <FormItem label="开始时间" prop="startTime">
            <Row>
                <DatePicker type="datetime" placeholder="Select date and time" style="width:420px;" :value="formItem.startTime"></DatePicker>
            </Row>
          </FormItem>
          <FormItem label="周期" prop="cycle">
            <Select v-model="formItem.cycle">
                <Option value="beijing">一年</Option>
                <Option value="shanghai">三个月</Option>
                <Option value="shenzhen">最近一周</Option>
            </Select>
          </FormItem>
          <FormItem label="资产url">
               <Select v-model="formItem.AssetsUrl" filterable>
                <Option v-for="item in formItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="资产ip">
               <Select v-model="formItem.AssetsIp" filterable>
                <Option v-for="item in formItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
        strategy: "",
        startTime: "",
        cycle: "",
        assets: "",
        cityList: [ ]
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
    // background: rgba(45, 140, 240, 0);
    // border: 1px solid #5D90BB;
    // color: #fff;
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