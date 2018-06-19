<template>
    <div class="updateM">
        <Card :bordered="false" class="box_tip">
           <p ><span>注意:</span>您距离上次版本升级已有xxx天。为了保证您在使用程序的稳定性和获得最新漏洞的扫描能力，请您及时升级！</p>
        </Card>
         <Card :bordered="false" class="box_tip box-card">
           <div class="box_update">
               <ul>
                   <li>离线升级包下载地址:<a >#</a></li>
                   <li><Button size="small" class="but">立即升级</Button></li>
                   <li><Button size="small" class="but">离线升级</Button></li>                 
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
export default {
    
}
</script>
<style scoped>
.updateM ul li{
   list-style: none;
   text-align: center;
}
.box_tip{
    width: 100%;
    padding: 5px;
    margin: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
}
.box_tip p{
    color: indianred;    
}
.box_tip span{
    color: white;
    display:inline-block;
    margin-right: 3px;
}
.but{
    margin:0px 20px;
}
.box_update {
    /* height: 30px; */
}
.box_update ul{
    color: white;
}
.box_update ul li{
   list-style: none;
   display: inline;
   line-height: 44px;
   text-align: right;
   margin-right:60px;

}
.box_update ul li a{
    margin-left:5px;
}
.box_manage{
    color: white;
}
.box_manage a{
    color:#FF9595;
}
</style>
