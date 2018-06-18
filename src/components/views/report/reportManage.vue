<template>
    <div class="report">
         <Card :bordered="false" class="box_report">
            <Input v-model="value1" size="large" placeholder="搜索资产" style="width:200px"></Input>
            <Button type="primary" >搜索</Button>
            <Button type="primary" >添加</Button>
            <Button type="primary" >导入</Button>
            <Button type="primary" >导出</Button>
        </Card>
        <Card :bordered="false" class="box_report">
            <p slot="title" style="color:white">报告列表</p>
             <div class="assetRight_content">
                  <page :columns="reportassets" :data="reportList"  :loading="pageLoading"></page>
              </div>
        </Card>
    </div>
</template>
<script>
import page from "components/page/page";
import taskList from "api/taskList";
import exportPDF from "api/exportPDF";
import { getUserName } from "@/utils/auth";

const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080" : "";

export default {
  components: {
    page
  },
  name: "reportManage",
  data() {
    return {
      fileName: "",
      depart_name: "",
      value1: "",
      pageLoading: false,
      reportList: [
        {
          assets_name: "测试",
          reportName: "开始",
          creatuser: "王姣姣",
          port: "技术",
          creatTime: "12121",
          time: "4545454"
        }
      ],
      defaultPage: {
        area: 0,
        rows: 10,
        page: 1,
        userName: getUserName()
      },
      params: {},
      reportassets: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "任务名称",
          key: "target_name",
          align: "center"
        },
        {
          title: "报告名称",
          key: "pdf_name",
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
              h(
                "a",
                {
                  attrs: {
                    type: "application/pdf",
                    href: params.row.export_url
                      ? host + params.row.export_url
                      : null,
                    download: params.row.pdf_name ? params.row.pdf_name : false
                  },
                  style: {
                    backgroundColor: "#19be6b",
                    display: "inline-block",
                    marginBottom: "0",
                    fontWeight: "400",
                    textAlign: "center",
                    verticalAlign: "middle",
                    touchAction: "manipulation",
                    cursor: "pointer",
                    backgroundImage: "none",
                    border: "1px solid transparent",
                    whiteSpace: "nowrap",
                    lineHeight: "1.5",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: "3px",
                    marginRight: "5px"
                  }
                },
                "下载"
              ),

              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  on: {
                    click: () => {
                      if (params.row.export_url === "") {
                        this.$Modal.confirm({
                          title: "请输入报告名称",
                          render: h => {
                            return h("div", [
                              h(
                                "Input",
                                {
                                  props: {
                                    value: this.fileName,
                                    autofocus: true,
                                    placeholder: "请输入文件名"
                                  },
                                  style: {
                                    marginBottom: "15px"
                                  },
                                  on: {
                                    input: val => {
                                      this.fileName = val;
                                    }
                                  }
                                },
                                [
                                  h(
                                    "span",
                                    {
                                      slot: "prepend"
                                    },
                                    "报告名称"
                                  )
                                ]
                              ),
                              h(
                                "Input",
                                {
                                  props: {
                                    value: this.companyName,
                                    autofocus: true,
                                    placeholder: "请输入企业名"
                                  },
                                  on: {
                                    input: val => {
                                      this.companyName = val;
                                    }
                                  }
                                },
                                [
                                  h(
                                    "span",
                                    {
                                      slot: "prepend"
                                    },
                                    "企业名称"
                                  )
                                ]
                              )
                            ]);
                          },
                          onOk: () => {
                            exportPDF({
                              target_id: params.row.target_id,
                              target_name: this.fileName
                            }).then(res => {
                              if (res.result === 0) {
                                this._taskList(this.params);
                                this.$Message.success(`重新生成报告成功`);
                              } else {
                                this.$Message.error(`重新生成报告失败`);
                              }
                            });
                          }
                        });
                      }
                      //this._detail(params.row)
                    }
                  }
                },
                "重新生成"
              ),
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
      ]
    };
  },
  methods: {
    _taskList() {
      let paramsObj = Object.assign({}, this.params, { flag: 1 });
      taskList(paramsObj).then(res => {
        if (res.result === 0) {
          this.reportList = res.targets;
        }
      });
    }
  },
  created() {
    this.params = Object.assign({}, this.defaultPage, {
      userName: getUserName()
    });
    this._taskList(this.params);
  }
};
</script>
<style scoped>
.box_report {
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 20px;
}
</style>


