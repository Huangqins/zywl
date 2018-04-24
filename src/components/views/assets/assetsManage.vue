<template>
<div>
    <div class="holeclassify">
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
    </div>
    <div>
      <page :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
    </div>
  </div>
</template>
<script>
import assetsInfo from "api/assetsInfo";
import topology from "components/chart/topology";
import page from "components/page/page";
export default {
  name: "assetsManage",
  components: {
    topology,
    page
  },
  data() {
    return {
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
      assetsList: [],
      width:"800px",
      assetsColums: [
        {
          title: "资产名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "ip",
          key: "assets_ip",
          align: "center"
        },
        {
          title: "端口",
          key: "assets_url",
          align: "center"
        },
        {
          title: "端口",
          key: "assets_network_ports",
          align: "center"
        },
        {
          title: "系统类型",
          key: "assets_os_type",
          align: "center"
        },
        {
          title: "资产重要度",
          key: "assets_important",
          align: "center"
        },
        {
          title: "创建人",
          key: "assets_creatuser",
          align: "center"
        }
      ],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      loading: false
    };
  },
  created() {
    this._assetsInfo(this.defaultPage);
  },
  methods: {
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _assetsInfo(params) {
      this.loading = true;
      const res = await assetsInfo(params);
      if (res.result === 0) {
        this.loading = false;
        this.assetsList = res.rows;
        this.total = res.total;
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
 /* top10样式 */
.holeclassify {
  width: 100%;
  margin-right: 3px;
  color: #E4E5E5;
  margin-bottom: 15px;
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

