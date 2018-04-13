<template>
  <div>
        <div class="timeAxis">
            <zhexiantu></zhexiantu>
        </div>
        <div class="list">
          <h2>漏洞列表</h2>
            <Table border :columns="columns1" :data="data1"  :loading="loading" @on-row-click="godetail" :row-class-name="rowClassName" ></Table>
        </div>
  </div>
</template>
<script>
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
export default {
  components:{
    chart,
    zhexiantu
  },
  data(){
    return{
      loading: false,
      columns1: [
        {
          title: "漏洞名称",
          key: "name",
          align:"center"
        },
        {
          title: "类型",
          key: "type",
          align:"center"
        },                                    
        {
          title: "风险等级",
          key: "riskRating",
          align:"center"
        },
        {
          title: "发现时间",
          key: "time",
          align:"center"
        },
        {
          title: "利用情况",
          key: "utilization",
          align:"center"
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
      ],
    }
  },
  methods: {
    godetail() {},
    rowClassName(row, index) {
      return "demo-table-info-row";
    }
  },
}
</script>

<style scoped>
.list{
  width: 100%;
}
.timeAxis{
  width: 50%;
}
.timeAxis h2{
  height: auto;
  float: right;
}
</style>
