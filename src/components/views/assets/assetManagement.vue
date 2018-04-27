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
      <Modals :width="width" :format="format" :data="data" :title="title" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
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
    return {
      pageLoading: false,
      loading: false,
      title: "新建",
      formValidate: false,
      width:90,
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
        assets_port:"",
        assets_proto:"",
        assets_servers:"",
        assets_region:"",
        assets_type:"",
        assets_important:"",
        assets_os:"",
        assets_manger: "",
        assets_creatuser: ""
      },
      rules: {
        assetsName: [
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
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: 'edit'
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
                }
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "trash-a"
                  },
                  on: {
                    click: () => {
                      this.remove({ assets_id: params.row.assets_id });
                    }
                  }
                }
              )
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
    ...mapGetters(["userName"])
  },
  created() {
    this.params = Object.assign({}, this.defaultPage);
    this._assetsInfo(this.params);
  },
  methods: {
    dataLoad(paramsObj) {
      this.params = Object.assign({}, this.defaultPage, paramsObj);
      this._assetsInfo(this.params);
    },
    _assetsInfo(params) {
      this.pageLoading=true;
      assetsInfo(params).then(res => {        
        this.assetsList = res.rows;
        this.dataTotal = res.total;
        this.pageLoading=false;
      });
    },
    assetsAdd() {
      this.$refs.formValidate.open();
      this.data = {};
    },
    //提交
    asyncOK(data) {
      if (data.assets_id) {
        this.data.assets_creatuser = this.userName
        assetsUpdate(data).then(res => {
          if (res.result === 0) {
            this._assetsInfo(this.params);
            this.$refs.formValidate.close();
          }
        });
      } else {
        this.data.assets_creatuser = this.userName
        assetAdd(data).then(res => {
          if (res.result === 0) {
            this._assetsInfo(this.params);
            this.$refs.formValidate.close();
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
.assetRight_nav{
  width: 100%;
  height: 280px;
  margin-bottom:20px;
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
