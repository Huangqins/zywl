<template>
  <div>
      <!-- <topology height="300px" width="600px"></topology> -->
      <!-- <Table border  :columns="assetsColums" :data="assetsList"  :row-class-name="rowClassName" height="200"></Table> -->
<page :columns="assetsColums" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading"></page>
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
      assetsList: [],
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


