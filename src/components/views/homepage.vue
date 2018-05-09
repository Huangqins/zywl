<template>
  <div>
      <section class="secOne">
            <div class="Aipicture">
                 <span class="Aipicture_text">资源监控</span>
                 <span class="pictrue"><img src="../../assets/ai.jpg"/></span>
            </div>
            <div class="stylebook">
                 <span class="Aipicture_text">样本量</span>
                 <span style="display:block;width:100%;height:100px;"><img src="../../assets/num.jpg"/></span>
            </div>
            <div class="attack">
                 <span class="Aipicture_text">攻击Pyload</span>
                 <span class="pictrue" >
                    <chart  :option="options"></chart>
                 </span>
            </div>
            <div class="asset">
                <span class="Aipicture_text">资产情况</span>
                <span class="pictrue" >
                 <Table :columns="assets" :data="assetsData" :height="200" ></Table>
                </span>
            </div>              
      </section>
      <section class="secTwo">
            <div class="attackPic">
              <span style="background-color:#212636;font-size:20px;text-align:center;height:56px;line-height:56px;display:block;">攻击流向图</span>
              <force :width="width"></force>
            </div>            
            <div class="preload" style="width:100%;">
               <span class="Aipicture_text">预载信息工具集</span>
               <Table :columns="assets" :data="assetsData" :height="600" ></Table>      
             </div> 
      </section>
      <section class="secThree">
          
              <ul>
                <li>
                    <span class="Aipicture_text">互联网风险情况</span>
                    <Table :columns="assets" :data="assetsData" :height="200" ></Table>
                </li>
                <li>
                    <span class="Aipicture_text">外部安全资源</span>
                    <Table :columns="assets" :data="assetsData" :height="200" ></Table>
                </li>
                <li>
                    <span class="Aipicture_text">主机风险情况</span>
                    <Table :columns="vulns" :data="vulnsData" :height="400" ></Table>  
                </li>
              </ul>
      </section>
  </div>
</template>

<script>
import force from "components/chart/force";
import chart from "components/chart/chart";
import assetsInfo from "api/assetsInfo";
import { getUserName } from "@/utils/auth";
import leaksInfo from "api/leaksInfo";
export default {
  components: {
    force,
    chart
  },
  data() {
    return {
      assets: [
        //
        {
          title: "资产名称",
          key: "assets_name"
        },
        {
          title: "资产URL",
          key: "assets_url"
        },
        {
          title: "风险总数",
          key: "vuln_total"
        },
        {
          title: "风险利用情况",
          key: "vuln_use"
        }
      ],
      assetsData: [ ],
      vulns:[
        {
          title: "风险名称",
          key: "vuln_name"
        },
        {
          title: "风险等级",
          key: "vuln_level"
        },
        {
          title: "风险利用情况",
          key: "vuln_use"
        }
      ],
      vulnsData:[],
      width: "576px",
      widths: 300,
      options: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      },
       defaultPage: {
        area: 1,
        rows: 10,
        page: 1,
        userName: getUserName()
      },

    };
  },
  mounted(){
    this.assetsInfo(this.defaultPage)
    this.leaksInfo()
  },
  methods:{
    //资产列表
    assetsInfo(params){
     assetsInfo(params).then(res=>{
       let data=res.rows
       this.assetsData=data
      console.log(res)
     }    
    )},
    //风险列表
    leaksInfo(){
      let params={userName:getUserName()}
     leaksInfo(params).then(res=>{
       let data=res.rows
       this.vulnsData=data
      console.log(res)
     }    
    )},


  }

};
</script>
<style scoped>
.secOne {
  width: 32%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 0px 10px 0px;
  box-sizing: border-box;
}
.secTwo {
  width: 35%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 15px 10px 15px;
  box-sizing: border-box;
}
.secThree {
  width: 30%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 0px 10px 0px;
  box-sizing: border-box;
}
.secOne_left span {
  display: block;
}
.Aipicture {
  /* width: 480px; */
  height: 300px;
  border: 1px solid #2b4e6f;
  padding: 8px;
  margin: 0 0px 10px 0px;
}
.Aipicture_text {
  font-size: 18px;
}
.pictrue {
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
}
.pictrue img {
  width: 100%;
  display: block;
  height: 255px;
}
.stylebook {
  /* width: 480px; */
  height: 100px;
  border: 1px solid #2b4e6f;
  padding: 8px;
  margin: 0 0px 10px 0px;
}
.attack {
  /* width: 480px; */
  height: 300px;
  border: 1px solid #2b4e6f;
  padding: 8px;
  margin: 0 0px 10px 0px;
}
.attack span {
  display: block;
}
.asset {
  height: 300px;
  border: 1px solid #2b4e6f;
  padding: 8px;
  margin: 0 0px 10px 0px;
}
.attackPic {
  border: 1px solid #2b4e6f;
}
.preload {
  margin-top: 10px;
  border: 1px solid #2b4e6f;
}
.secThree ul {
  width: 100%;
}
.secThree ul li {
  list-style: none;
  width: 100%;
  max-height: 442px;
  border: 1px solid #2b4e6f;
  margin-bottom:10px;
}

</style>
