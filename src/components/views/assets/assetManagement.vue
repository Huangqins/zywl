<template>
  <div>
       <div  class="box_report" style="margin:10px 20px;padding:20px;width:97%">
            <Input v-model="value1" size="large" placeholder="搜索资产" style="width:200px"></Input>
            <Button type="primary" >搜索</Button>
            <Button type="primary" icon="compose" @click="assetsAdd">添加</Button>
            <Upload multiple  ref="upload" :show-upload-list="false"   :action="uploadUrl" :with-credentials="true" 
                accept="" name="excelFile" :headers="headers" style="display:inline-block"
                 :before-upload="handleUpload" >
                <Button type="primary" icon="ios-cloud-upload-outline">导入</Button>
            </Upload>
            <Button type="primary" icon="log-out">导出</Button>
        </div>
        <div class="secOne">
          <section class="box_report fright" >
            <h3 style="color:white;line-height:41px">资产分布区</h3>
            <div class="assetPort">
              <ul style="height:200px;">
                <li ><Icon type="record" style="color:pink;margin-right:8px"></Icon>资产总数:<span style="margin-left:10px;">{{ewewe}}</span></li>
                <li><Tree :data="ostype" show-checkbox multiple style="height:148px;overflow:auto"></Tree></li>
                <!-- <li><Tree :data="devtype" show-checkbox multiple></Tree></li>
                <li><Tree :data="ports" show-checkbox multiple></Tree></li> -->
                <!-- <li><Icon type="record" style="color:pink;margin-right:8px"></Icon>设备类型:<span style="margin-left:10px;">{{devtype}}</span></li>
                <li><Icon type="record" style="color:pink;margin-right:8px"></Icon>端口:<span style="margin-left:10px;">{{ports}}</span></li> -->
              </ul>
            </div>
          </section>
          <section class="box_report box_asset">
            <h3  style="color:white">区域资产分布</h3>
            <div class="Portasset">
              <ul>
                <li >
                   <Icon type="record" style="color:blue;font-size:34px;"></Icon> 
                   <p>A区 </p>
                   <p>121</p>
                </li>
                <li >
                   <Icon type="record" style="color:blue;font-size:34px;"></Icon> 
                   <p>B区 </p>
                   <p>999</p>
                </li>
                <li >
                   <Icon type="record" style="color:green;font-size:34px;"></Icon> 
                   <p>C区 </p>
                   <p>4545</p>
                </li>
                <li >
                   <Icon type="record" style="color:yellow;font-size:34px;"></Icon> 
                   <p>D区 </p>
                   <p>7878</p>
                </li>
                <li >
                   <Icon type="record" style="color:pink;font-size:34px;"></Icon> 
                   <p>E区 </p>
                   <p>343</p>
                </li>
                <li >
                   <Icon type="record" style="color:lightblue;font-size:34px;"></Icon> 
                   <p>F区 </p>
                   <p>456</p>
                </li>
              </ul>
            </div>
        </section>
        </div>
        <div  class="page" >
            <h3 style="color:white">资产列表</h3>
             <div class="assetRight_content">
                  <page :dblclick="dblclick" :columns="assets" :data="assetsList" :dataTotal="dataTotal" @dataLoad="dataLoad"  :loading="pageLoading" ></page>
              </div>
        </div>
      <Modals :width="width" :footer="footer"  :format="formatType" :data="dataType" :title="title" ref="formValidate" :ruleValidate="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
      <Modal v-model="seiverModal"  title="开放服务"  >
            <page :columns="serviceHeader" :data="serviceList"  ></page>
      </Modal>
      <!-- 资产导入 --> 
      <!-- <Modal v-model="assetAddModal"  title="资产导入"  :loading="assetAddLoading" @on-ok="assetImport">
         <Tabs value="name2">
          <TabPane label="手动导入" name="name1"></TabPane>
          <TabPane label="批量导入" name="name2">
            <Upload multiple  :action="uploadUrl" :with-credentials="true" accept="" name="excelFile" :headers="headers">
                <Button type="primary" icon="ios-cloud-upload-outline">上传资产</Button>
            </Upload>
            <Button type="primary" icon="iso-cloud-download-outline" >
                <a :href="href" download="资产导入模板">资产模板下载</a>
              </Button>
          </TabPane>
        </Tabs>
      </Modal> -->
      <!-- <Modal v-model="assetAddModal" title="资产导入">
          <div v-if="file !== null" >
            上传的文件: {{ file.name }}
          </div>
          <div slot="footer">
            <Button type="text" size="large">取消导入</Button>
            <Button type="primary" size="large"  :loading="assetAddLoading" @click="assetImport">确定导入</Button>
        </div>
      </Modal> -->
  </div>
</template>
<script>
import Modals from "components/Modal/modal";
import page from "components/page/page";
import assetAdd from "api/assetAdd";
import { mapGetters } from "vuex";
import message from "utils/message";
import assetsInfo from "api/assetsInfo";
import assetsDelete from "api/assetsDelete";
import assetsUpdate from "api/assetsUpdate";
import { getToken, getUserName } from "@/utils/auth";
import serviceInfo from "api/serviceInfo";
import assetclass from "api/assetClass";
import portSum from "api/portSum";
import assetArea from "api/assetArea";
import getArea from "api/getArea";

const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";
const href = host + "/excel/asset.xlsx";

export default {
  components: {
    page,
    Modals
  },
  data() {
    const addUrlValidate = (rule, value, callback) => {
      if (!value && !this.data.assets_ip) {
        callback(new Error("url或者ip请至少填写一项"));
      } else {
        callback();
      }
    };

    const addIpValidate = (rule, value, callback) => {
      if (!value && !this.data.assets_url) {
        callback(new Error("url或者ip请至少填写一项"));
      } else {
        callback();
      }
    };
    return {
      ewewe: "",
      os: "",
      devtype: "",
      ports: "",
      value1: "",
      seiverModal: false,
      uploadStatus: false,
      file: null,
      loadingStatus: false,
      headers: { token: getToken(), userName: getUserName() },
      href: href,
      uploadUrl: location.origin + "/ZY/asset/assetsImport",
      assetAddModal: false,
      assetAddLoading: false,
      pageLoading: false,
      loading: false,
      title: "新增资产",
      formValidate: false,
      width: 90,
      ostype: [
        {
          title: "",
          expand: false,
          children: [
            {
              title: "操作系统",
              expand: false,
              children: [
                // {
                //   title: "leaf 1-1-1"
                // },
                // {
                //   title: "leaf 1-1-2"
                // }
              ]
            },
            {
              title: "设备类型",
              expand: false,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            },
            {
              title: "端口",
              expand: false,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      format: [
        { label: "资产名称", type: "input", prop: "assets_name" },
        { label: "资产URL", type: "input", prop: "assets_url" },
        { label: "资产IP", type: "input", prop: "assets_ip" },
        // { label: "端口", type: "input", prop: "assets_port" },
        // { label: "通讯协议", type: "input", prop: "assets_proto" },
        // { label: "开放服务信息", type: "input", prop: "assets_servers" },
        {
          label: "所属区域",
          type: "select",
          prop: "assets_region",
          option: []
        },
        { label: "资产类型", type: "input", prop: "assets_type" },
        { label: "资产重要度", type: "input", prop: "assets_important" },
        // { label: "OS类型", type: "input", prop: "assets_os" },
        { label: "负责人", type: "input", prop: "assets_manger" }
      ],
      data: {
        assets_name: "",
        assets_url: "",
        assets_ip: "",
        assets_port: "",
        assets_proto: "",
        assets_servers: "",
        assets_region: "",
        regions: [],
        assets_type: "",
        assets_important: "",
        assets_os: "",
        assets_manger: "",
        assets_creatuser: ""
      },
      dataCopy: {},
      modalStatus: 0,
      footer: true,
      rules: {
        assets_name: [
          {
            required: true,
            message: "请填写资产名",
            trigger: "blur"
          }
        ],
        assets_url: [{ validator: addUrlValidate, trigger: "blur" }],
        assets_ip: [{ validator: addIpValidate, trigger: "blur" }]
      },
      serviceHeader: [
        {
          title: "服务名称",
          key: "service_name",
          align: "center"
        },
        {
          title: "端口",
          key: "port",
          align: "center"
        },
        {
          title: "协议",
          key: "protocol",
          align: "center"
        },

        {
          title: "状态",
          key: "state",
          align: "center"
        },
        {
          title: "服务信息",
          key: "info",
          align: "center"
        }
      ],
      serviceList: [],
      value: "",

      assets: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "资产名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "资产链接",
          key: "assets_url",
          align: "center"
        },
        {
          title: "资产IP",
          key: "assets_ip",
          align: "center"
        },

        {
          title: "操作系统",
          key: "assets_os_type",
          align: "center"
        },
        {
          title: "虚拟机",
          key: "assets_vm",
          align: "center"
        },
        {
          title: "所属区域",
          key: "",
          align: "center"
        },

        {
          title: "设备类型",
          key: "",
          align: "center"
        },
        {
          title: "开放服务",
          key: "service_num",
          align: "center",
          cellClassName: {
            service_num: "demo-table-info-cell-age"
          }
        },
        {
          title: "负责人",
          key: "assets_manger",
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
                    // 打开
                    (this.footer = true), (this.modalStatus = 0);
                    this.$refs.formValidate.open();
                  }
                }
              }),

              h("Button", {
                props: {
                  size: "small",
                  icon: "social-buffer"
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
              }),
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
      display: false,
      assetsList: [],
      defaultPage: {
        area: 0,
        rows: 10,
        page: 1
      },
      dataTotal: 0,
      params: {}
    };
  },
  computed: {
    ...mapGetters(["userName"]),
    formatType() {
      return this.modalStatus === 0 ? this.format : this.formatCopy;
    },
    dataType() {
      return this.modalStatus === 0 ? this.data : this.dataCopy;
    }
  },
  created() {
    this.params = Object.assign({}, this.defaultPage);
    this._assetsInfo(this.params);
    this._assetclass();
    this._portSum();
    this._assetArea();
    this._getArea();

    // this._serviceInfo()
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
    handleUpload(file) {
      this.file = file;
      this.$Modal.confirm({
        content: `您将上传的文件:${file.name},是否确定上传?`,
        loading: true,
        onOk: () => {
          this.$refs.upload.post(file);
          setTimeout(() => {
            this.$Modal.remove();
            this._assetsInfo(this.params);
          }, 200);
        },
        onCancel: () => {}
      });
      return false;
    },
    upload() {},

    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._assetsInfo(this.params);
    },
    _assetclass() {
      this.pageLoading = true;
      assetclass({ flag: 1 }).then(res => {
        this.ostype[0].children[0].children = res.lists.map(item => {
          return {
            title: `${item.assets_hostname}:${item.assets_os_type}`
          };
        });
      });
      assetclass({ flag: 2 }).then(res => {
        this.ostype[0].children[1].children = res.lists.map(item => {
          return {
            title: `${item.assets_hostname}:${item.assets_os_type}`
          };
        });
      });
    },
    //端口
    _portSum() {
      portSum({}).then(res => {
        this.ostype[0].children[2].children = res.lists.map(item => {
          return {
            title: `${item.port}:${item.assets_ip}`
          };
        });
      });
    },
    //区域资产分布
    _assetArea() {
      assetArea({}).then(res => {});
    },
    //添加资产时选择的区域
    _getArea() {
      getArea({}).then(res => {
        let list = res.areas;
        list.forEach(item => {
          // this.options.legend.data.push(item.type_name);
          // this.options.series[0].data.push({
          //   value: item.target_task_num,
          //   name: item.type_name
          // });
        });
      });
    },
    _assetsInfo(params) {
      this.pageLoading = true;
      assetsInfo(params).then(res => {
        this.assetsList = res.rows;
        this.ewewe = this.dataTotal = res.total;
        this.pageLoading = false;
      });
    },
    dblclick(row) {
      if (row.service_num === 0) {
        this.seiverModal = false;
      } else {
        this.seiverModal = true;
        let params = row.assets_id;
        serviceInfo({ assets_id: params }).then(res => {
          this.serviceList = res.lists;
        });
      }
    },

    assetsAdd() {
      this.$refs.formValidate.open();
      this.data = {};
      this.modalStatus = 0;
    },
    //提交
    asyncOK(data) {
      if (data.assets_id) {
        this.data.assets_creatuser = this.userName;
        this.loading = true;
        assetsUpdate(data).then(res => {
          if (res.result === 0) {
            this._assetsInfo(this.params);
            this.loading = false;
            this.$refs.formValidate.close();
          } else if (res.result === 2) {
            this.$Message.warning({
              content: "资产已存在"
            });
            this.loading = false;
          }
        });
      } else {
        this.data.assets_creatuser = this.userName;
        this.loading = true;
        assetAdd(data).then(res => {
          if (res.result === 0) {
            this._assetsInfo(this.params);
            this.loading = false;
            this.$refs.formValidate.close();
          } else if (res.result === 2) {
            this.$Message.warning({
              content: "资产已存在"
            });
            this.loading = false;
          } else {
            this.$Message.error({
              content: "资产添加失败"
            });
          }
        });
      }
    },
    //删除
    remove(data) {
      assetsDelete(data).then(res => {
        if (res.result === 0) {
          this._assetsInfo(this.params);
        }
      });
    }
  }
};
</script>
<style scoped>
.demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.secOne {
  overflow: hidden;
  margin: 0 20px;
}
.secOne section {
  width: 49%;
  float: left;
  box-sizing: border-box;
}
.secOne .fright {
  margin-right: 10px;
}
.box_report {
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0px;
  padding: 10px;
  overflow: hidden;
}
.aflet {
  box-sizing: border-box;
  width: 37%;
  float: left;
  margin-right: 16px;
}
.box_asset {
  width: 50%;
}
.Portasset {
  margin-top: 20px;
}
.assetPort ul li {
  list-style: none;
  color: white;
}
.Portasset ul li {
  list-style: none;
  color: white;
  margin-left: 10px;
  width: 14%;
  height: 200px;
  display: inline-block;
  text-align: center;
}
.Portasset ul li p {
  line-height: 42px;
}
.whole {
  width: 100%;
}
.assetRight {
  float: left;
  width: 100%;
  height: auto;
}
.assetRight_nav {
  width: 100%;
  height: 280px;
  display: flex;
  flex-flow: row;
  margin-bottom: 20px;
}
.assetRight_nav section {
  flex: 1;
  margin: 20px 60px;
  background: #cccccc;
}
.assetRight_content {
  margin-top: 10px;
  width: 97%;
}
.assetRight_header {
  width: 100%;
  height: 100px;
  padding: 25px;
  margin-top: 20px;
  background: rgba(25, 38, 48, 0.1);
}
.ivu-btn .ivu-btn-primary {
  margin-left: 5px;
}
.page {
  width: 97%;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 20px;
  padding: 15px;
  height: 420px;
}
</style>
