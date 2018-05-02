<template>
  <div>
        <!-- <div class="wordClouds">
             <h2>漏洞文字云</h2>
             <cloud></cloud>
        </div> -->
        <!-- <div class="holeProportion">
              <chart width="350px" height="350px"  :option="optionHole" id="holeproportion"></chart>
        </div> -->
        <div style="clear:both;"></div>
        <!-- <div class="holeclassify">
            <h2>漏洞Top10榜单</h2>
            <span><Icon type="chevron-right"></Icon>目前已有XXX个漏洞进行排行</span>
            <div class="holeList">
            <ul>
                <li class="listOne">
                <span class="holeHeader">漏洞排行</span>
                <span class="holeHeader">漏洞名称</span>
                <span class="holeHeader">漏洞数量</span>
                </li>
                <li v-for="(item,index) in holes" :key="index">
                <span v-if="index===0"><img src="../../../../static/top1.png" ></span>
                <span v-else-if="index===1"><img src="../../../../static/top2.png" ></span>
                <span v-else-if="index===2"><img src="../../../../static/top3.png"/></span>
                <span v-else-if="index>=3">{{index}}</span>
                <span>{{item.holeName}}</span>
                <span>{{item.holeNum}}</span>
                </li>         
            </ul>
            </div>
        </div> -->
  </div>
</template>
<script>
import chart from "components/chart/chart";
// import cloud from "components/d3/wordCloud";
export default {
  components:{
      // cloud,
      chart
  },
  data(){
      return{
          //饼状图
    optionHole: {
        title: {
          text: "漏洞等级",
          x: "center",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["一级", "二级", "三级"],
          textStyle: {
            color: "#E4E5E5"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "一级", itemStyle: { color: "#DD4F43" } },
              { value: 310, name: "二级", itemStyle: { color: "#FFCE43" } },
              { value: 234, name: "三级", itemStyle: { color: "#41C23C" } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      //top10排行榜
      holes:[
        {
         holeName:"XSS",holeNum:"12"
        },
        {
         holeName:"WEB",holeNum:"10"
        },
        {
          holeName:"CSRF",holeNum:"9"
        },{
          holeName:"CSRF",holeNum:"8"
        },
        {
          holeName:"CSRF",holeNum:"7"
        },
        {
          holeName:"CSRF",holeNum:"6"
        },
        {
          holeName:"CSRF",holeNum:"5"
        },
        {
          holeName:"CSRF",holeNum:"4"
        },
        {
          holeName:"CSRF",holeNum:"3"
        },
        {
          holeName:"CSRF",holeNum:"2"
        },
        {
          holeName:"CSRF",holeNum:"1"
        }
      ],
      }
  }
}
</script>
<style scoped>
.wordClouds{
    float: left;
    color: #E4E5E5;
}
.holeProportion{
    float: right;
}
/* top10样式 */
.holeclassify {
  width: 100%;
  margin-right: 3px;
  color: #E4E5E5;
}
.holeclassify span{
  display: inline-block;
  height: 19px;
}
.holeList{
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
.holeList ul{
  width: 100%;
  height: auto;
  border: 1px solid #21262F;
}
.holeList ul li{
list-style-type: none;
height: 23px;
font-size: 12px;
line-height: 23px;
border-bottom: 1px solid #21262F;
}
.holeList ul li:nth-child(12){  
border:none;
}
.holeList ul li span{ 
width: 30%;
text-align: center;
}
.holeList ul li span img{
width:20px;
height:20px;
display: inline-block;
vertical-align: middle;
}
.listOne{
display: inline-block;
width: 100%;
}
</style>
