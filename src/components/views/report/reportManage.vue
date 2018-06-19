<template>
    <div>
         <section class="box_report">
            <Input v-model="value1" size="large" placeholder="搜索资产" style="width:200px"></Input>
            <Button type="primary" >搜索</Button>
            <Button type="primary" >添加</Button>
        </section>
        <section class="box_report">
            <h3 style="color:white">报告列表</h3>
              <div class="assetRight_content">
                  <page :columns="reportassets" :data="reportList"  :loading="pageLoading" width="100%"></page>
              </div>
        </section>
    </div>
</template>
<script>
import page  from "components/page/page";
export default {
  components: {
    page
  },
  name: 'reportManage',
  data() {
      return {
          value1:'',
          pageLoading:false,
          reportList:[
              {
                  assets_name:"测试",
                  reportName:'开始',
                  creatuser:'王姣姣',
                  port:"技术",
                  creatTime:'12121',
                  time:'4545454'
              }
          ],
        reportassets: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "任务名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "报告名称",
          key: "reportName",
          align: "center"
        },
        {
          title: "创建人",
          key: "creatuser",
          align: "center"
        },
        {
          title: "所属部门",
          key: "port",
          align: "center"
        },
        {
          title: "创建时间",
          key: "creatTime",
          align: "center"
        },
        {
          title: "最近下载时间",
          key: "time",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.data = Object.assign({}, this.data, params.row);
                    // 打开
                    // (this.footer = true), (this.modalStatus = 0);
                    // this.$refs.formValidate.open();
                  }
                }
              },"下载"),

              h("Button", {
                props: {
                  size: "small"
                },
                on: {
                  click: () => {
                    this.dataCopy = Object.assign({}, this.data, params.row);
                    this.modalStatus = 1;
                    this.footer = false;
                    this.title = "详情";
                    this.$refs.formValidate.open();
                    //this._detail(params.row)
                  }
                }
              },"重新生成"),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "trash-a"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.remove({ assets_id: params.row.assets_id });
                  }
                }
              })
            ]);
          }
        }
      ],
      }
  }
}
</script>
<style scoped>
.box_report {
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 20px;
    padding: 10px;
    width: 100%;
   
}
.assetRight_content{
  margin-top: 10px;
}
</style>


