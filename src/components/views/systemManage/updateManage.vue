<template>
    <div class="updateM">
        <Card :bordered="false" class="box_tip">
           <p ><span>注意:</span>您距离上次版本升级已有90天。为了保证您在使用程序的稳定性和获得最新漏洞的扫描能力，请您及时升级！</p>
        </Card>
         <Card :bordered="false" class="box_tip box-card">
           <div class="box_update">
               <ul>
                   <li>离线升级包下载地址:<a >http://ppwww.cio.com</a></li>
                   <li><Button size="small" class="but">立即升级</Button></li>
                   <li> <Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="version" :headers="headers" :show-upload-list="false" style="display:inline-block" :on-success="loadFileSuccess">
                            <Button type="text" icon="ios-cloud-upload-outline" style="color:white;font-size:14px">离线升级</Button>
                          </Upload></li>                 
               </ul>
               <div style="height:20px">
                   <ul>
                    <li><span>漏洞库版本:</span>1122212121</li>
                    <li><span>漏洞库发布日期:</span>2018年05月23日</li>
                   </ul> 
               </div>
               
              
           </div>
        </Card>
        <Card :bordered="false" class="box_tip box_manage">
            <h4>管理</h4>
             <Row style="margin:0px 100px;">
                <Col span="6">
                    <ul>
                        <li><Icon type="record" style="font-size:38px" ></Icon></li>
                        <li>升级包管理</li>
                        <li><a>查看维护升级包文件</a></li>
                    </ul>
                </Col>
                <Col span="6">
                    <ul>
                        <li><Icon type="ios-flower" style="font-size:38px"></Icon></li>
                        <li>升级日志</li>
                        <li><a>查看历史升级的版本与时间</a></li>
                    </ul>
                </Col>
                <!-- <Col span="6">col-6</Col>
                <Col span="6">col-6</Col> -->
            </Row>
        </Card>
    </div>
</template>
<script>
import { getToken, getUserName } from "@/utils/auth";
import updateOffline from "api/updateOffline";

export default {
  data() {
    return {
      uploadUrl: location.origin + "/ZY/system/updateVersion",
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      }
    };
  },
  methods: {
    loadFileSuccess(res) {
      if (res.result === 0) {
        this.$Message.success("离线升级成功");
      } else if (res.result === 1) {
        this.$Message.error("登录过期");
      } else {
        this.$Message.error("离线升级失败");
      }
    }
  }
};
</script>
<style scoped>
.updateM ul li {
  list-style: none;
  text-align: center;
}
.box_tip {
  width: 100%;
  padding: 5px;
  margin: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
}
.box_tip p {
  color: indianred;
}
.box_tip span {
  color: white;
  display: inline-block;
  margin-right: 3px;
}
.but {
  margin: 0px 20px;
}
.box_update {
  height: 30px;
}
.box_update ul {
  color: white;
}
.box_update ul li {
  /* width: 300px; */
  list-style: none;
  display: inline;
  text-align: right;
  margin-right: 60px;
}
.box_update ul li a {
  margin-left: 5px;
}
.box_manage {
  color: white;
}
.box_manage a {
  color: #ff9595;
}
</style>
