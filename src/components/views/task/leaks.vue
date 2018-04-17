<template>
  <div>
        <div class="timeAxis">
            <zhexiantu></zhexiantu>
        </div>
        <div class="list">
          <h2>漏洞列表</h2>
            <!-- <Table border :columns="columns1" :data="data1"></Table> -->
            <page :columns="leaksColums" :data="leaksList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading"></page>
        </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import page from "components/page/page";
import leaksInfo from "api/leaksInfo";
import { getToken } from "@/utils/auth";

export default {
  components: {
    chart,
    zhexiantu,
    page
  },
  created() {
    this._leaksInfo(Object.assign({}, this.defaultPage,{token: getToken()}));
  },
  data() {
    return {
      loading: false,
      leaksColums: [
        {
          title: "漏洞名称",
          key: "vuln_name",
          align: "center"
        },
        {
          title: "漏洞类型",
          key: "vuln_type",
          align: "center"
        },
        {
          title: "漏洞等级",
          key: "vuln_level",
          align: "center"
        },
        {
          title: "漏洞端口",
          key: "vuln_Port",
          align: "center"
        },
        {
          title: "操作人",
          key: "vuln_oper",
          align: "center"
        }
      ],
      leaksList: [],
      total: 0,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      loading: false
    };
  },
  methods: {
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _leaksInfo(params) {
      this.loading = true;
      const res = await leaksInfo(params);
      if (res.result === 0) {
        this.loading = false;
        this.leaksList = res.rows;
        this.total = res.total;
      }
      // console.log(res);
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj, {token: getToken()});
      // console.log()
      this._leaksInfo(params);
    }
  }
};
</script>

<style scoped>
.list {
  width: 100%;
  color: #e4e5e5;
}
.timeAxis {
  width: 50%;
}
.timeAxis h2 {
  height: auto;
  float: right;
}
</style>
