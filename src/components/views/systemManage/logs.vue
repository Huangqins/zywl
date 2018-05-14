<template>
  <div class="logs">
      <div style="padding:20px;">
        <Card :bordered="false" >
            <p slot="title" style="font-size:16px;"><Icon type="grid" style="margin-right:5px;font-size:18px;"></Icon>登陆日志</p>           
                <div style="padding:20px;">
                    <Card :bordered="false" >
                        <p slot="title">查询条件</p>              
                        <Form :model="formItem" :label-width="80">
                            <FormItem label="账号">
                            <Input v-model="formItem.input" placeholder="" style="width:300px;"></Input>
                            <Button type="primary" icon="ios-search">搜索</Button>
                            </FormItem> 
                        </Form>
                
                    </Card>
                </div>
                <div style="padding:20px;">
                    <Card :bordered="false" >
                        <!-- <p slot="title">日志列表</p>               -->
                        <!-- <Table height="400" :columns="columns1" :data="data2"></Table> -->
                        <page :columns="columns1" :data="data2" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" ></page>
                    </Card>
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

