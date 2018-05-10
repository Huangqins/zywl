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
                    <chart :option="options"></chart>
                 </span>
            </div>
            <div class="asset">
                <!-- <span class="Aipicture_text">资产情况</span> -->
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
            <div class="preload" >
               <span class="Aipicture_text">预载信息工具集</span>
               <Table :columns="assets" :data="assetsData" :height="600" ></Table>      
             </div> 
      </section>
      <section class="secThree">
                    <section class="holeList">
                    <ul>
                        <li class="listOne">
                          <span class="holeHeader">漏洞排行</span>
                          <span class="holeHeader">漏洞名称</span>
                          <span class="holeHeader">漏洞数量</span>
                        </li>
                        <li v-for="(item,index) in holes" :key="index">
                        <span v-if="index===0"><img src="../../../static/top1.png" ></span>
                        <span v-else-if="index===1"><img src="../../../static/top2.png" ></span>
                        <span v-else-if="index===2"><img src="../../../static/top3.png"/></span>
                        <span v-else-if="index>=3">{{index}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.vuln_total}}</span>
                        </li>
                    </ul>
                  </section>
                    <!-- <Table :columns="assets" :data="assetsData" :height="200" ></Table> -->
               
                <section>
                    <!-- <span class="Aipicture_text">外部安全资源</span> -->
                    <chart :option="vulntypePic" width="550px" height="350px" id="vulnPic"></chart>
               </section>
                <section>
                    <!-- <span class="Aipicture_text">主机风险情况</span> -->
                    <Table :columns="vulns" :data="vulnsData" :height="400" ></Table>  
                </section>
      </section>
  </div>
</template>

<script>
import force from "components/chart/force";
import chart from "components/chart/chart";
import assetsInfo from "api/assetsInfo";
import { getUserName } from "@/utils/auth";
import leaksInfo from "api/leaksInfo";
import vulnTop from "api/vulnTop";
import vulntype from "api/vulntype";
import fomatterTime from "@/utils/tool";
const levelSchema = {
  "4": "紧急风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "无风险"
};
export default {
  components: {
    force,
    chart
  },
  data() {
    return {
      vulntypePic: {
        tooltip: {},
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: []
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
          {}
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [],
                name: "风险总数分布雷达图"
              }
            ]
          }
        ]
      },
      assets: [
        {
          title: "资产名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "资产名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "资产URL",
          key: "assets_url",
          align: "center"
        },
        {
          title: "风险总数",
          key: "vuln_total",
          align: "center"
        },
      ],
      assetsData: [],
      vulns: [
        {
          title: "风险发现时间",
          key: "vuln_ftime",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.vuln_ftime.time))
            );
          }
        },
        {
          title: "风险等级",
          key: "vuln_level",
          align: "center",
          render:(h,params) => {
            return h(
                 "span",
                  `${levelSchema[params.row.vuln_level]}`
            )
          }
        }
      ],
      vulnsData: [],
      width: "576px",
      widths: 300,
      options: {
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            formatter: function(item) {
            },
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
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: [],
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
      //top10排行榜
      holes: []
    };
  },
  mounted() {
    this.assetsInfo(this.defaultPage);
    this.leaksInfo();
    this.vulntop();
    this.vulntype();
  },
  methods: {
    //资产列表
    assetsInfo(params) {
      assetsInfo(params).then(res => {
        let data = res.rows;
        this.assetsData = data;
        this.assetsData.forEach(item => {
          this.options.xAxis.data.push(item.assets_name);
          this.options.series[0].data.push(item.vuln_use);
        });
      });
    },
    //风险列表
    leaksInfo() {
      let params = { userName: getUserName() };
      leaksInfo(params).then(res => {
        let data = res.rows;
        this.vulnsData = data;
      });
    },
    //top10排行榜
    vulntop() {
      const params = {};
      vulnTop(params).then(res => {
        let data = res.lists;
        this.holes = data;
      });
    },
    //风险类型
    vulntype() {
      let params = { flag: 1 };
      // this.$refs.vulntypePic.showLoading();
      vulntype(params).then(res => {
        if (res.result === 0) {
          // this.$refs.vulntype.hideLoading();
          let list = res.list;
          let numList = [];
           this.vulntypePic.radar.indicator = []
          numList = list.map(item => {
            return Number(item.kb_vuln_vnum);
          });
          list.forEach(item => {
            this.vulntypePic.legend.data.push(item.vuln_type_name);
            this.vulntypePic.series[0].data[0].value.push(
              Number(item.kb_vuln_vnum)
            );
            this.vulntypePic.radar.indicator.push({
              max: Math.max.apply(null, numList),
              name: item.vuln_type_name
            });
          });
        }
      });
    }
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
  width: 30%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 15px 10px 15px;
  box-sizing: border-box;
}
.attackPic {
  border: 1px solid #2b4e6f;
}
.preload {
  width: 100%;
  margin-top: 10px;
  border: 1px solid #2b4e6f;
}
.secThree {
  width: 35%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 0px 10px 0px;
  box-sizing: border-box;
}
.secThree section {
  margin-top: 10px;
  border: 1px solid #2b4e6f;
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
/* top10排行榜样式 header*/
.secThree span {
  display: inline-block;
  height: 19px;
}
/* top10排行榜样式 end*/
</style>
