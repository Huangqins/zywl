<template>
  <div>
      <Table border  :columns="assetsColums" :data="assetsList"  :row-class-name="rowClassName"></Table>

  </div>
</template>
<script>
import assetsInfo from "api/assetsInfo";
export default {
  name: "assetsManage",
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
      ]
    };
  },
  created() {
    this._assetsInfo();
  },
  methods: {
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    async _assetsInfo() {
      const params = { area: 1 };
      const res = await assetsInfo(params);
      if (res.result === 0) {
        this.assetsList = res.list;
      }
    }
  }
};
</script>


