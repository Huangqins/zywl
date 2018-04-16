<template>
  <div>
        <div class="timeAxis">
            <zhexiantu></zhexiantu>
        </div>
        <div class="list">
          <h2>漏洞列表</h2>
            <!-- <Table border :columns="columns1" :data="data1"></Table> -->
            <page :columns="columns"></page>
        </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import page from "components/page/page";
import assetsInfo from "api/assetsInfo";

export default {
  components: {
    chart,
    zhexiantu,
    page
  },
  created() {
    this._assetsInfo();
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          title: "漏洞名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "风险等级",
          key: "riskRating",
          align: "center"
        },
        {
          title: "发现时间",
          key: "time",
          align: "center"
        },
        {
          title: "利用情况",
          key: "utilization",
          align: "center"
        }
      ],
      data1: [
        {
          name: "John Brown",
          type: 18,
          riskRating: "3",
          time: "2016-10-03",
          utilization: "80%"
        },
        {
          name: "Jim Green",
          type: 24,
          riskRating: "3",
          time: "2016-10-01",
          utilization: "80%"
        },
        {
          name: "Joe Black",
          type: 30,
          riskRating: "4",
          time: "2016-10-02",
          utilization: "89%"
        },
        {
          name: "Joe Black",
          type: 30,
          riskRating: "4",
          time: "2016-10-02",
          utilization: "89%"
        }
      ]
    };
  },
  methods: {
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _assetsInfo() {
      const res = await assetsInfo({ area: 1 ,rows: 10, page: 1});
      console.log(res);
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
