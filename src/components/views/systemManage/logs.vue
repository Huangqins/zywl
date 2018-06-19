<template>
  <div class="logs">
      <div style="padding:20px;">
        <Card :bordered="false" class="box_report">
            <span style="color:white;"><Icon type="flag" style="font-size:26px;margin-right:5px"></Icon>状态:管理员</span>
            <span style="text-align:center">
            <Input v-model="value1" size="large" placeholder="" style="width:200px;margin-left:10px;"></Input>
            <Button type="primary" >搜索</Button>
            </span>
        </Card>
        <Card :bordered="false" class="box_report">
            <p slot="title" style="color:white">日志列表</p>
             <div class="assetRight_content">
                  <page :columns="columns1" :data="data2"  :loading="pageLoading" height="400"></page>
              </div>
        </Card>
    </div>
  </div>
</template>
<script>
import page from "components/page/page";
import logs from "api/logs";
import fomatterTime from "@/utils/tool";

export default {
  components: {
    page
  },
  data() {
    return {
      value1:'',
      pageLoading:false,
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      total: 0,
      loading: false,
      formItem: {
        input: ""
      },
      columns1: [
        {
          title: "账号",
          key: "login_log_name",
          align: "center"
        },
        {
          title: "登陆状态",
          key: "login_log_status",
          align: "center"
        },
        {
          title: "时间",
          key: "login_log_time",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.login_log_time.time))
            );
          }
        }
      ],
      data2: []
    };
  },
  created() {
    this.logs();
  },
  methods: {
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage);
    },
    logs() {
      const params = Object.assign({}, this.defaultPage);
      logs(params).then(res => {
        let data = res.rows;
        data.forEach(item => {
            if(item.login_log_status==="0"){
               item.login_log_status="成功"
            }else{
                 item.login_log_status="失败"
            }
        });
        this.data2 = data;
      });
    }
  }
};
</script>

<style scoped>
.box_report {
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 20px;
   
}
</style>
