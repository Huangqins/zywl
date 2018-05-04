<template>
  <div>
      <div class="whole">
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="assetsAdd">添加</Button>
                <Button type="primary" icon="log-in">导入</Button>
                <Button type="primary" icon="log-out">导出</Button>
              </div>
              <div class="assetRight_nav"></div>
              <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList" :dataTotal="dataTotal" @dataLoad="dataLoad"  :loading="pageLoading"></page>
              </div>
          </section>
      </div>
      <Modals :width="width" :footer="footer"  :format="formatType" :data="dataType" :title="title" ref="formValidate" :ruleValidate="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
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

export default {
  components: {
    page,
    Modals
  },
  data() {
    const addUrlValidate = (rule, value, callback) => {
      if(!value && !this.data.assets_ip) {
        callback(new Error('url或者ip请至少填写一项'));
      } else {
        callback()
      }
    };

    const addIpValidate = (rule, value, callback) => {
      if(!value && !this.data.assets_url) {
        callback(new Error('url或者ip请至少填写一项'));
      } else {
        callback()
      }
    };
    return {
      pageLoading: false,
      loading: false,
      title: "新建",
      formValidate: false,
      width: 90,
      format: [
        { label: "资产名称", type: "input", prop: "assets_name" },
        { label: "资产URL", type: "input", prop: "assets_url" },
        { label: "资产IP", type: "input", prop: "assets_ip" },
        { label: "端口", type: "input", prop: "assets_port" },
        { label: "通讯协议", type: "input", prop: "assets_proto" },
        { label: "开放服务信息", type: "input", prop: "assets_servers" },
        { label: "所属区域", type: "input", prop: "assets_region" },
        { label: "资产类型", type: "input", prop: "assets_type" },
        { label: "资产重要度", type: "input", prop: "assets_important" },
        { label: "OS类型", type: "input", prop: "assets_os" },
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
        assets_url: [
          { validator: addUrlValidate, trigger: 'blur' }
        ],
        assets_ip: [
          { validator: addIpValidate, trigger: 'blur' }
        ]
      },
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
          title: "资产URL",
          key: "assets_url",
          align: "center"
        },
        {
          title: "资产IP",
          key: "assets_ip",
          align: "center"
        },
        // {
        //   title: "创建人",
        //   key: "assets_creatuser",
        //   align: "center"
        // },
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
    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._assetsInfo(this.params);
    },
    _assetsInfo(params) {
      this.pageLoading = true;
      assetsInfo(params).then(res => {
        this.assetsList = res.rows;
        this.dataTotal = res.total;
        this.pageLoading = false;
      });
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
  margin-bottom: 20px;
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
</style>
