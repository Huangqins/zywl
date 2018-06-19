<template>
  <div>
      <div class="whole">
          <!-- <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="assetsAdd">添加</Button>
                 <Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="excelFile" :headers="headers" :show-upload-list="false" style="display:inline-block">
                    <Button type="primary" icon="ios-cloud-upload-outline">导入</Button>
                 </Upload>
                <Button type="primary" icon="log-out">导出</Button>
              </div>
              <div class="assetRight_pro">
                <section>
                   <chart width="500px" height="260px" :option="options" ref="firstChart"></chart>
                </section>
                <section>
                  <chart width="440px" height="260px" :option="optionOne" id="optionOne" ref="secondChart"></chart>
                </section>
                
              </div>
              <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="pageLoading"> </page>
              </div>
          </section> -->
        <Card :bordered="false" class="box_report">
            <Input v-model="value1" size="large" placeholder="搜索资产" style="width:200px"></Input>
            <Button type="primary" >搜索</Button>
            <Button type="primary" @click="assetsAdd">添加</Button>
            <Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="excelFile" :headers="headers" :show-upload-list="false" style="display:inline-block">
                    <Button type="primary" icon="ios-cloud-upload-outline">导入</Button>
            </Upload>
            <Button type="primary" icon="log-out">导出</Button>
        </Card>
        <Card :bordered="false" class="box_report pic">
          <ul>
            <li>
                <chart width="700px" height="260px" :option="options" ref="firstChart"></chart>
            </li>
            <li>
                <chart width="440px" height="260px" :option="optionOne" id="optionOne" ref="secondChart"></chart>
            </li>
          </ul>  

        </Card>
        <Card :bordered="false" class="box_report" style="height:428px">
            <p slot="title" style="color:white">知识列表</p>
            <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="pageLoading"> </page>
            </div>
        </Card>
      </div>
      <Modals :width="width" :format="formatType" :data="dataType" :title="title" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading" :footer="footer"></Modals>
    <!--<Modal></Modal>-->
  </div>
</template>
<script>
import Modals from "components/Modal/modal";
import page from "components/page/page";
import { mapGetters } from "vuex";
import message from "utils/message";
import kbinfo from "api/kbinfo";
import kbAdd from "api/kbAdd";
import kbUpdate from "api/kbUpdate";
import kbDelete from "api/kbDelete";
import vulntype from "api/vulntype";
import vulnlevelcount from "api/vulnlevelcount";
import Modal from "../../Modal/modal";
import chart from "components/chart/chart";
import { getToken, getUserName } from "@/utils/auth";

const levelSchema = {
  "4": "紧急风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "无风险"
};
// 风险级别颜色
const vuln_level_color = {
 "4": "#993333",
  "3": "#DE5145",
  "2": "#FAA732",
  "1": "#23B7E5",
  "0": "#27C24C"
}
export default {
  components: {
    Modal,
    page,
    Modals,
    chart
  },
  data() {
    return {
      value1:'',
      uploadUrl:  location.origin + "/ZY/kb/importExcel",
      headers: {
        token: getToken(), 
        userName: getUserName()
      },
      options: {
        title: {
          text: '漏洞类型:',        
          left: '10',
          top:"-5",
          // left: "center",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          // orient: "vertical",
          left: 100,
          // top: 20,
          // bottom: 20,
          data: [],
          textStyle:{
            color:"#fbfbfb"
          }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "60%"],
            selectedMode: "single",
            data: [],
            label:{
              formatter: function(params) {
                return params.value;
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      optionOne: {
        title: {
          text: '风险类型占比:',        
          left: '',
          top:"-4",
          // left: "center",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          // orient: "vertical",
          left: 125,
          // top: 20,
          // bottom: 20,
          data: [],
          textStyle:{
            color:"#fbfbfb"
          }
        },
        label:{
              formatter: function(params) {
                return params.value;
              }
            },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      optionTwo: {
        title: {
          left: "center",
          textStyle: {
            color: "#E4E5E5"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: [],
          textStyle:{
            color:"#fbfbfb"
          }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "幽州",
                label: {
                  normal: {
                    rich: {
                      title: {
                        color: "#eee",
                        align: "center"
                      },
                      abg: {
                        backgroundColor: "#333",
                        width: "100%",
                        align: "right",
                        height: 25,
                        borderRadius: [4, 4, 0, 0]
                      },
                      weatherHead: {
                        color: "#333",
                        height: 24,
                        align: "left"
                      },
                      hr: {
                        borderColor: "#777",
                        width: "100%",
                        borderWidth: 0.5,
                        height: 0
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "left"
                      },
                      valueHead: {
                        color: "#333",
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "center"
                      },
                      rate: {
                        width: 40,
                        align: "right",
                        padding: [0, 10, 0, 0]
                      },
                      rateHead: {
                        color: "#333",
                        width: 40,
                        align: "center",
                        padding: [0, 10, 0, 0]
                      }
                    }
                  }
                }
              },
              { value: 535, name: "跨站脚本" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      footer: true,
      pageLoading: false,
      loading: false,
      title: "新建",
      formValidate: false,
      width: 110,
      format: [
        { label: "漏洞名称", type: "input", prop: "kb_vuln_name" },
        { label: "CVE/CNVD编码", type: "input", prop: "kb_vuln_cve" },
        { label: "漏洞编号", type: "input", prop: "kb_vuln_vnum" },
        { label: "漏洞级别", type: "input", prop: "kb_vuln_level" },
        { label: "漏洞端口", type: "input", prop: "kb_vuln_port" },
        { label: "利用工具", type: "input", prop: "kb_vuln_tool" },
        { label: "攻击方法", type: "input", prop: "kb_vuln_atme" },
        { label: "验证手段", type: "input", prop: "kb_vuln_veme" },
        { label: "攻击Payload", type: "input", prop: "kb_vuln_payload" },
        { label: "漏洞类型", type: "input", prop: "vuln_type_name" },
        { label: "漏洞分类", type: "input", prop: "kb_vuln_class" },
        { label: "风险描述", type: "textarea", prop: "kb_vuln_des" },
        { label: "修复方案", type: "textarea", prop: "kb_vuln_anly" }
      ],
      formatCopy: [],
      data: {
        kb_vuln_name: "",
        kb_vuln_cve: "",
        kb_vuln_vnum: "",
        kb_vuln_level: "",
        kb_vuln_port: "",
        kb_vuln_tool: "",
        kb_vuln_atme: "",
        kb_vuln_veme: "",
        kb_vuln_payload: "",
        vuln_type_name: "",
        kb_vuln_class: "",
        kb_vuln_des: "",
        kb_vuln_anly: ""
      },
      dataCopy: {},
      rules: {
        kb_vuln_name: [
          {
            required: true,
            message: "请填写资产名",
            trigger: "blur"
          }
        ]
      },
      value: "",
      assets: [
        {
          title: "风险编号",
          key: "kb_vuln_vnum",
          align: "center"
        },
        {
          title: "风险名称",
          key: "kb_vuln_name",
          align: "center"
        },
        {
          title: "CVE/CNVD编码",
          key: "kb_vuln_cve",
          align: "center"
        },
        {
          title: "风险级别",
          key: "kb_vuln_level",
          align: "center",
          render: (h, params) => {
            return h("span", `${levelSchema[params.row.kb_vuln_level]}`);
          }
        },
        {
          title: "利用端口",
          key: "kb_vuln_port",
          align: "center"
        },
        {
          title: "风险类型",
          key: "vuln_type_name",
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
                  size: "small",
                  icon: "edit"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.data = Object.assign({}, this.data, params.row);
                    this.data.kb_vuln_level = `${
                      levelSchema[params.row.kb_vuln_level]
                    }`;
                    this.modalStatus = 0;
                    this.footer = true;
                    this.title = "修改";
                    // 打开
                    this.$refs.formValidate.open();
                  }
                }
              }),
              h("Button", {
                props: {
                  size: "small",
                  icon: "social-buffer"
                },                
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.dataCopy = Object.assign({}, this.data, params.row);
                    this.dataCopy.kb_vuln_level = `${
                      levelSchema[params.row.kb_vuln_level]
                    }`;
                    this.modalStatus = 1;
                    this.footer = false;
                    this.title = "详情";
                    this.$refs.formValidate.open();
                    //this._detail(params.row)
                  }
                }
              }),
              
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "trash-a"
                },
                on: {
                  click: () => {
                    this._kbDelete(params.row);
                    // this.remove(params.index);
                    // console.log(params)
                  }
                }
              }),
            ]);
          }
        }
      ],
      display: false,
      assetsList: [],
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1
      },
      total: 0,
      params: {},
      modalStatus: 0
    };
  },
  computed: {
    formatType() {
      return this.modalStatus === 0 ? this.format : this.formatCopy;
    },
    dataType() {
      return this.modalStatus === 0 ? this.data : this.dataCopy;
    },
    ...mapGetters(["userName"])
  },
  mounted() {
       this.vulntype();
       this.vulnlevelcount();
  },
  created() {
    this.params = Object.assign({}, this.defaultPage, { area: 0 });
    this._kbinfo(this.params);
    const temp = JSON.parse(JSON.stringify(this.format));
    const dataCopy = JSON.parse(JSON.stringify(this.data));
    this.dataCopy = Object.assign({}, dataCopy, {
      kb_vuln_des: "",
      kb_vuln_anly: ""
    });
    temp.forEach(item => {
      item.type = "div";
    });
    this.formatCopy = temp;
  },
  methods: {
    assetsAdd() {
      this.footer = true;
      this.title = "新建";
      this.modalStatus = 0;
      this.$refs.formValidate.open();
    },
    //提交
    asyncOK(data) {
      if (data.kb_vuln_id) {
        this._kbUpdate(data);
      } else {
        this._kbAdd(data);
      }
    },
    //风险类型饼状图
    vulntype() {
      let params = { flag: 1 };
      // console.log(this.$refs.firstChart)
      // this.$refs.firstChart.showLoading()
      vulntype(params).then(res => {
        if (res.result === 0) {
          // this.$refs.firstChart.hideLoading()
          let list = res.list;
          list.forEach(item => {
            this.options.legend.data.push(
              item.kb_vuln_class
            )
            this.options.series[0].data.push({
              value: item.kb_vuln_vnum,
              name: item.kb_vuln_class
            
            });
          });
        } else {
        }
      });
    },
    //风险级别饼状图
    vulnlevelcount() {
      let params = { flag: 2 };
      // this.$refs.secondChart.showLoading();
      vulnlevelcount(params).then(res => {
        if (res.result === 0) {
          let list = res.list;
          list.forEach(item => {
            this.optionOne.legend.data.push(levelSchema[item.kb_vuln_level]);
            this.optionOne.series[0].data.push({
              value: item.kb_vuln_vnum,
              name: levelSchema[item.kb_vuln_level],
              itemStyle: {
                color: vuln_level_color[item.kb_vuln_level]
              }
            });
          });
          // this.$refs.secondChart.hideLoading();
        } else {
        }
      });
    },
    _kbAdd(data) {
      this.loading = true;
      kbAdd(data).then(res => {
        if (res.result === 0) {
          this.$refs.formValidate.close();
          this._kbinfo(this.params);
          this.loading = false;
        } else {
          this.$refs.formValidate.open();
        }
      });
    },
    _kbUpdate(data) {
      kbUpdate(data).then(res => {
        if (res.result === 0) {
          this.$refs.formValidate.close();
          this._kbinfo(this.params);
        } else if (res.result === -1) {
          this.$Notice.error({
            title: "返回信息",
            desc: "修改失败",
            duration: 2
          });
          this.$refs.formValidate.open();
        }
      });
    },
    _kbDelete(data) {
      kbDelete(data).then(res => {
        if (res.result === 0) {
          this._kbinfo(this.params);
        }
      });
    },
    _kbinfo(params) {
      this.pageLoading = true;
      kbinfo(params).then(res => {
        if (res.result === 0) {
          this.assetsList = res.rows;
          this.total = res.total;
          this.pageLoading = false;
        }
      });
    },
    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._kbinfo(this.params);
    }
    //  详情显示
    // _detail(data) {

    // }
  }
};
</script>
<style scoped>
.box_report {
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 20px;
   
}
.pic ul li{
  display: inline-block;
  width: 47%;
}
.whole {
  width: 100%;
  color: #e4e5e5;
}
.assetRight {
  float: left;
  width: 100%;
  height: auto;
}
.assetRight_pro {
  width: 100%;
  height: 280px;
  display: flex;
  margin-bottom: 20px;
}
.assetRight_pro section {
  flex: 1;
  margin: 20px 60px;
}
.assetRight_header {
  width: 100%;
  height: auto;
  padding: 25px;
  background: rgba(25, 38, 48, 0.1);
}
.assetRight_pro div {
  float: left;
}
.assetRight_pro div:nth-child(2) {
  margin: 0 20px;
}
.ivu-btn .ivu-btn-primary {
  margin-left: 5px;
}
</style>
