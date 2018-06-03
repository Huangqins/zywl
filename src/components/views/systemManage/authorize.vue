<template>
  <div class="authorize-container">
       <Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="license" :headers="headers" :show-upload-list="false" style="display:inline-block;margin-bottom:5px" :on-success="success"	>
                <Button type="primary" icon="ios-cloud-upload-outline">导入授权文件</Button>
        </Upload>
       <Card class="ym">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                授权信息
              </p>
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index">
                      {{ item.target_info_name }}
                      <span>
                          {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
          </Card>
  </div>
</template>
<script>
import { getToken, getUserName } from "@/utils/auth";
import getSystemInfo from "api/getSystemInfo";
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";

const href = host + "system/loadFile";
export default {
  data() {
    return {
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      uploadUrl: location.origin + "/ZY/system/loadFile",
      taskListItem: [
        {
          target_info_key: "isTry",
          target_info_name: "授权类型:",
          target_info_des: 0
        },
        {
          target_info_key: "username",
          target_info_name: "授权用户:",
          target_info_des: 0
        },
        {
          target_info_key: "device",
          target_info_name: "授权设备码:",
          target_info_des: 0
        },
        // {
        //   target_info_key: "hardware",
        //   target_info_name: "硬件码:",
        //   target_info_des: 0
        // },
        {
          target_info_key: "version",
          target_info_name: "序列号:",
          target_info_des: 0
        },
         {   
          target_info_key: "userNum",
          target_info_name: "可管理资源数:",
          target_info_des: 0
        },
        {
          target_info_key: "endTime",
          target_info_name: "授权截止时间:",
          target_info_des: 0
        },
        {
          target_info_key: "startTime",
          target_info_name: "授权签发时间:",
          target_info_des: 0
        }
      ]
    }
  },
  mounted(){
    this._getSystemInfo()
  },
  methods: {
    success(res) {
      if (res.result === 0) {
        this.$Message.info("文件上传成功");
      } else if (res.result === -1) {
        this.$Message.error("文件上传失败");
      } else {
        this.$Message.error(
          "上传文件已过期或者已达到限额，请获取最新证书后上传"
        )
      }
    },
    _getSystemInfo(){
    getSystemInfo().then(res =>{
      if(res.result==="2"){
        this.$Message.error("文件不存在")
      }else if(res.result==="2"){
        this.$Message.error("授权到期")
      }else{
        let data=res;   
        data.isTry=data.isTry==="0"?"试用":"正式";
        let remain="";
        remain=data.userNum-data.useNum
        data.userNum="总共"+data.userNum+",已使用"+data.useNum+',剩余'+remain+"可用"
        this.taskListItem.forEach(item => {
          item.target_info_des = data[item.target_info_key];
        });
      }
       
    })
  }
  },  
  
};
</script>
<style scoped>
.authorize-container {
    margin-top: 50px;
}
.ivu-card-body ul li {
  list-style: none;
}
</style>


