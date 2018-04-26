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
              <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="pageLoading"> </page>
              </div>
          </section>
      </div>
      <Modals :width="width" :format="format" :data="data" :title="title" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
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
const levelSchema = {
  "4": "紧急风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "无风险"
};
export default {
  components: {
    page,
    Modals
  },
  data() {
    return {
      pageLoading: false,
      loading: false,
      title: "新建",
      formValidate: false,
      width:110,
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
        { label: "漏洞类型", type: "input", prop: "kb_vuln_type" },
        { label: "漏洞分类", type: "input", prop: "kb_vuln_class" }
        
      ],
      data: {
        kb_vuln_name: "",
        kb_vuln_cve: "",
        kb_vuln_vnum: "",
        kb_vuln_level: "",
        kb_vuln_port:"",
        kb_vuln_tool:"",
        kb_vuln_atme:"",
        kb_vuln_veme:"",
        kb_vuln_payload:"",
        kb_vuln_type: "",
        kb_vuln_class:""
      },
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
          title: "漏洞名称",
          key: "kb_vuln_name",
          align: "center"
        },
        {
          title: "CVE/CNVD编码",
          key: "kb_vuln_cve",
          align: "center"
        },
        {
          title: "漏洞编号",
          key: "kb_vuln_vnum",
          align: "center"
        },
        {
          title: "漏洞级别",
          key: "kb_vuln_level",
          align: "center",
          render: (h, params) => {
            return h("span", `${levelSchema[params.row.kb_vuln_level]}`);
          }
        },
        {
          title: "漏洞端口",
          key: "kb_vuln_port",
          align: "center"
        },
        {
          title: "漏洞类型",
          key: "kb_vuln_type",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
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
                      this.$refs.formValidate.open();
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this._kbDelete(params.row)
                      // this.remove(params.index);
                      // console.log(params)
                    }
                  }
                },
                "删除"
              )
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
      params: {}
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  created() {
    this.params = Object.assign({}, this.defaultPage, { area: 0 });
    this._kbinfo(this.params);
  },
  methods: {
    assetsAdd() {
      this.$refs.formValidate.open();
      this.data = {};
    },
    //提交
    asyncOK(data) {
      if (data.kb_vuln_id) {
        this._kbUpdate(data);
      } else {
        this._kbAdd(data);
      }
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
      // this.loading = false;
      kbUpdate(data).then(res => {
        if (res.result === 0) {
          this.$refs.formValidate.close();
          this._kbinfo(this.params);
          // this.loading = false;
        } else if (res.result === -1) {
          this.$Notice.error({
            title: "返回信息",
            desc: "修改失败",
            duration: 2
          });
          // this.loading = false;
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
  }
};
</script>
<style scoped>
.whole {
  width: 100%;
  color: #e4e5e5;
}
.assetRight {
  float: left;
  width: 100%;
  height: auto;
}
.assetRight_header {
  width: 100%;
  height: 100px;
  padding: 25px;
  margin-top: 20px;
  background: rgba(25, 38, 48,0.1);
}
.ivu-btn .ivu-btn-primary {
  margin-left: 5px;
}
</style>
