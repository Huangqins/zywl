<template>
  <div>
        <div class="All">
            <section class="item">
                <div class="itemlist">
                    <section class="holeStatus">
                        <p>漏洞状态</p>
                        <div class="holeimg">
                            <!--<img src="../../assets/hole.jpg" >-->
                        </div>

                        <div class="riskRating">
                            高风险
                        </div>
                    </section>
                    <section class="resultPicture">
                       <p>漏洞后果截图</p>
                       <div class="ristPicture">
                           <li v-for="(item, index) in pictureList" :key="index"><img :src="item.src"/></li>
                       </div>
                    </section>
                </div>
            </section>
            <section class="item">
                <div class="hole">
                    <section class="hList Description">
                        <Row>
                            <Col span="24">
                                <Card style="background:rgba(18,62,101,0.7);border:1px solid #51B3DA;">
                                    <p slot="title" style="color:white;font-size:25px">漏洞描述</p>
                                    <p>欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。</p>
                                    <p>是否要进行安全测试？</p>

                                </Card>
                            </Col>
                        </Row>
                    </section>
                    <section class="hList methods">
                        <Row>
                            <Col span="24">
                                <Card style="background:rgba(18,62,101,0.7);border:1px solid #51B3DA;">
                                    <p slot="title" style="color:white;font-size:25px">漏洞方法</p>
                                    <p>欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。</p>
                                    <p>是否要进行安全测试？</p>

                                </Card>
                            </Col>
                        </Row>
                    </section>
                    <section class="hList repairPlan">
                        <Row>
                            <Col span="24">
                                <Card style="background:rgba(18,62,101,0.7);border:1px solid #51B3DA;">
                                    <p slot="title" style="color:white;font-size:25px">修复方案</p>
                                    <p>欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。</p>
                                    <p>是否要进行安全测试？</p>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </div>
            </section>

        </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            pictureList:[
                {
                    src:"../../static/hole2.jpg"
                },
                {
                    src:"../../static/hole2.jpg"
                },
                {
                    src:"../../static/hole2.jpg"
                },
                {
                    src:"../../static/hole2.jpg"
                },
                {
                    src:"../../static/hole2.jpg"
                },
                {
                    src:"../../static/hole2.jpg"
                },


            ]
        }
    },
  created() {

  }
}
</script>
<style scoped>
.All{
   flex-direction:column;
   display: flex;
}
.All .item{
  padding:10px;
}
.holeStatus{
    width: 200px;
    height: 200px;
    float: left;
    color: white;
    padding: 5px;
    margin-right: 10px;
}
.holeStatus p{
    font-size: 25px;
}
.holeimg{
    width: 90px;
    height: 100px;
    float: left;
}
.holeimg img{
   width: auto;
   height: auto;
   max-width:100%;
   max-height:100%;
   display:inline-block;

}
.resultPicture{
    font-size:25px;
    margin-left:200px;
    height: 200px;
}
.ristPicture li{
    list-style-type: none;
    width:100px;
    height:100px;
    display: inline-block;
    margin:5px 20px 5px 5px;
    border-radius: 50%;
    }
.ristPicture li img{
    width:100px;
    height:100px;
    border-radius: 50%;

    cursor: pointer;
    transition: all 0.6s;
}
.ristPicture li img:hover{
     transform: scale(1.4);
}
.resultPicture .ristPicture{
    width: auto;
    height: 100px;
}
.resultPicture .ristPicture div{
   width:180px;
   height:100px;
   margin: 5px;
   float: right;
}
.hole{
    width: 100%;
    display: flex;
    font-size: 25px;
}
.hole .hList{
    flex:1;
    padding: 5px;
}
.riskRating{
    width: 95px;
    margin-left:5px;
    background:rgba(255,0,0,0.7);
    height: 95px;
    float: right;
    border:1px solid #AA0000;
    border-radius: 60%;
    font-size: 16px;
    text-align: center;
    line-height: 95px;
}
.ivu-card-head p, .ivu-card-head-inner{
    font-weight: 200;
    height: 25px;
    line-height: 25px;
}
</style>
