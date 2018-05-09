<template>
<div>
    <div class="secOne">      
   
        <section >
                  <div class="vulnLevel">
                    <div class="levelRight">
                      <chart :option="options" width="190px" height="190px"></chart>
                    </div>
                    <div class="levelLeft">
                      <h4 class="levelTitle">风险级别</h4>
                      <div class="levelDescript">扫描器已经发现一个或多个高危类型的漏洞。恶意用户可以利用这些漏洞，并损害后台数据库和您的网站</div>
                    </div>
                  </div>
        </section >
        <section>
            <div class="hotPic">xxdfd</div>
        </section>
        <section class="holeclassify">                 
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
                        <span>{{item.name}}</span>
                        <span>{{item.vuln_total}}</span>
                        </li>
                    </ul>
                  </div>
                
        </section>
        
     </div>
     <!-- <div class="secTwo"> 
       <section></section>
       <section></section>
       <section></section>
     </div> -->
    <div class="List">
      <page :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
    </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import assetsInfo from "api/assetsInfo";
import topology from "components/chart/topology";
import page from "components/page/page";
import { getUserName } from "@/utils/auth";
import vulnTop from "api/vulnTop"
export default {
  name: "assetsManage",
  components: {
    topology,
    page,
    chart
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 335, name: "高风险" }]
          }
        ]
      },
      //top10排行榜
      holes: [
        // {
        //   holeName: "XSS",
        //   holeNum: "12"
        // },
        // {
        //   holeName: "WEB",
        //   holeNum: "10"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "9"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "8"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "7"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "6"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "5"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "4"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "3"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "2"
        // },
        // {
        //   holeName: "CSRF",
        //   holeNum: "1"
        // }
      ],
      assetsList: [],
      width: "800px",
      assetsColums: [
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
          title: "IP",
          key: "assets_ip",
          align: "center"
        },
        {
          title: "风险总数",
          key: "vuln_total",
          align: "center"
        },
        {
          title: "高风险",
          key: "vuln_high",
          align: "center"
        },
        {
          title: "中风险",
          key: "vuln_medium",
          align: "center"
        },
        {
          title: "低风险",
          key: "vuln_low",
          align: "center"
        },
        {
          title: "风险利用情况",
          key: "vuln_use",
          align: "center"
        }

        // {
        //   title: "创建人",
        //   key: "assets_creatuser",
        //   align: "center"
        // }
      ],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1,
        userName: getUserName()
      },
      loading: false
    };
  },
  created() {
    const params = Object.assign({}, this.defaultPage);
    this._assetsInfo(this.defaultPage);
    this.vulntop()
  },
  methods: {
    vulntop(){
      const params={ }
     vulnTop(params).then(res => {
        let data=res.lists
       this.holes=data
     }) 
    },
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _assetsInfo(params) {
      this.loading = true;
      const res = await assetsInfo(params);
      if (res.rows[0] === null) {
        this.loading = false;
        this.assetsList = [];
      } else {
        this.assetsList = res.rows;
        this.total = res.total;
        this.loading = false;
      }
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj);
      this._assetsInfo(params);
    }
  }
};
</script>

<style scoped>
.secOne {
  width: 100%;
  display: flex;
  color: #e4e5e5;
  flex-direction: row;
}
.secOne section {
  flex: 1;
  margin: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
}
.vulnLevel {
  padding: 15px;
  display: flex;
  align-items: center;
}
.levelRight {
  margin-right: 10px;
}
.levelLeft {
  flex: 1 1 auto;
  align-items: center;
}
.levelDescript {
  flex: 1 1 100%;
}
.levelTitle{
  flex: 1 1 100%;
  margin: 0 0 10px;
}
.holeclassify span {
  display: inline-block;
  height: 19px;
}
.secTwo{
  width: 100%;
  display: flex;
  color: #e4e5e5;
  height: 200px;
  flex-direction: row;
} 
.secTwo section{
  flex: 1;
  margin: 20px 60px;
  background: rgba(255, 255, 255, 0.1);
}
.List {
  width: 100%;
  margin-top: 20px;
}
.holeList {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
.holeList ul {
  width: 100%;
  height: auto;
  border: 1px solid #21262f;
}
.holeList ul li {
  list-style-type: none;
  height: 23px;
  font-size: 12px;
  line-height: 23px;
  border-bottom: 1px solid #21262f;
}
.holeList ul li:nth-child(12) {
  border: none;
}
.holeList ul li span {
  width: 30%;
  text-align: center;
}
.holeList ul li span img {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.listOne {
  display: inline-block;
  width: 100%;
}
</style>

