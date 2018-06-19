<template>
  <div class="authorize-container">
        <Card :bordered="false" class="box_auth">
            <p slot="title">授权信息</p>
            <div class="license_informa">
              <ul>
                   <li>目前状态:试用授权</li>
                   <li>到期时间:2018年08月23日</li>
                   <li><Icon type="ios-search"></Icon><a style="color:#4E76AB" @click="modal1 = true">查看授权详情</a></li>               
               </ul>
            </div>              
        </Card>
        <Card :bordered="false" class="box_auth">
            <p slot="title">授权操作</p>
            <Row style="margin:0px 100px;">
                <Col span="6">
                    <ul style="text-align: center;">
                        <li><Icon type="record" style="font-size:38px" ></Icon></li>
                        <li>激活授权</li>
                        <li><Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="license" :headers="headers" :show-upload-list="false" style="display:inline-block;margin-bottom:5px" :on-success="success"	>
                <Button type="text" style="color:white;font-size:14px">适用于首次导入授权文件</Button></Upload> </li>
                    </ul>
                </Col>
                <Col span="6">
                    <ul style="text-align: center;">
                        <li><Icon type="ios-flower" style="font-size:38px"></Icon></li>
                        <li>更新授权</li>
                        <li><a>适用于激活后更新授权</a></li>
                    </ul>
                </Col>
            </Row>
        </Card>
        <Card :bordered="false" class="box_auth">
            <p slot="title">操作流程</p>
            <div>
              <ul>
                <li>1.通过“授权”向导，导入授权文件，获得激活申请文件;</li>
                <li>2.获得申请文件，发送到北京智与未来信息技术有限公司，获得激活文件;</li>
                <li>3.将“激活文件”通过激活向导进行导入，即可完成导入。</li>
              </ul>
            </div>
        </Card>
        <Modal class="ym" v-model="modal1" @on-ok="ok"  @on-cancel="cancel">
              <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                授权信息
              </p>
              <ul>
                  <li v-for="(item,index) in taskListItem" :key="index" style="list-style:none">
                      {{ item.target_info_name }}
                      <span>
                          {{ item.target_info_des }}
                      </span>
                  </li>
              </ul>
        </Modal>
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
      modal1:false,
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

    ok () {
                this.$Message.info('Clicked ok');
    },
    cancel () {
                this.$Message.info('Clicked cancel');
    },
        

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
.box_auth{
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 20px;
    color: white;
}
.box_auth p{
  color: white;
}
.authorize-container {
    margin-top: 50px;
}

.ivu-card-body ul li {
  list-style: none;
  
}
.license_informa ul li{
  display: inline;
  margin-right:45px; 
  
}
</style>


